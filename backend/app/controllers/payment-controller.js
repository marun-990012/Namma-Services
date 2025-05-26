import { razorpayInstance } from "../../config/razorpayConfig.js";
import crypto from 'crypto';
import Payment from "../models/paymentSchema.js";
import Wallet from "../models/wallet-model.js";
import { addCoinsInWallet } from "../services/walletService.js";
import { completeJob } from "../helpers/completJob.js";


const paymentController = {};

paymentController.order = (req, res) => {
  const { amount } = req.body; // Amount is in INR, but we need it in paisa (multiply by 100)
  console.log('order')
  try {
    const options = {
      amount: amount * 100, // Convert amount to paisa (1 INR = 100 paisa)
      currency: 'INR',
      receipt: `rcptid_${Date.now()}`,
      notes: {
        note1: 'This is a test payment'
      }
    };

    // Create order on Razorpay
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error while creating order' });
      }

      console.log('order created')
      return res.json({
        data: order // Send the order data to frontend
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


paymentController.verify = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount,paymentType,jobId } = req.body;
  // console.log(req.userId,jobId)

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Step 1: Construct the sign string
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Step 2: Generate the expected signature using the key secret
    const expectedSignature = crypto
      .createHmac('sha256', "5DrtcuKEVGGvv0L57aPiAi8A")  // Use your Razorpay secret key here
      .update(sign.toString())
      .digest('hex');

    // Step 3: Compare expected signature with Razorpay's signature
    if (expectedSignature === razorpay_signature) {
      // Signature matched, payment is verified
      console.log('verified')
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId: req.userId,
        amount :amount / 100
      });

      // Save payment details in the database
      await payment.save();

      if(paymentType=='wallet'){
        const wallet = await addCoinsInWallet(req.userId, amount);
        return res.json({ success: true, message: 'Payment verified successfully', wallet:wallet});
      }

      if(paymentType=='salary'){
        const jobComplet = await completeJob({jobId, userId: req.userId });
        return res.json({ success: true, message: 'Payment verified successfully', jobPost:jobComplet});
      }

    } else {
      // Signature mismatch, authentication failed
      return res.status(400).json({ error: 'Payment verification failed, signature mismatch' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default paymentController;