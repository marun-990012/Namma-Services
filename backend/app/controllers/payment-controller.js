import crypto from 'crypto';
import Payment from "../models/paymentSchema.js";
import { completeJob } from "../helpers/completJob.js";
import Transaction from "../models/transactions-model.js";
import { addCoinsInWallet } from "../services/walletService.js";
import { razorpayInstance } from "../../config/razorpayConfig.js";


const paymentController = {};

paymentController.order = (req, res) => {
  const { amount } = req.body; // Amount is in INR, but we need it in paisa (multiply by 100)
 
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
        return res.status(500).json({ error: 'Internal server error while creating order' });
      }
      return res.json({
        data: order // Send the order data to frontend
      });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


paymentController.verify = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, paymentType, jobId,userId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)  // Use env var
      .update(sign)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {

      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId: req.userId,
        amount: amount / 100,
      });
      await payment.save();

      const transactionData = {
        paymentGatewayId: razorpay_payment_id,
        amount,
        status: 'success',
      };

      if (paymentType === 'wallet') {
        const wallet = await addCoinsInWallet(req.userId, amount);
        transactionData.user =  req.userId;
        transactionData.purpose = 'wallet_topup';
        const transaction = new Transaction(transactionData);
        await transaction.save();
        return res.json({ success: true, message: 'Payment verified successfully', wallet });
      }

      if (paymentType === 'salary') {
        const jobComplet = await completeJob({ jobId, userId: req.userId });
        transactionData.user = userId;
        transactionData.purpose = 'salary_payment';
        transactionData.jobId = jobId;
        const transaction = new Transaction(transactionData);
        await transaction.save();
        return res.json({ success: true, message: 'Payment verified successfully', jobPost: jobComplet });
      }

      return res.status(400).json({ error: 'Invalid payment type' });
    } else {
      return res.status(400).json({ error: 'Payment verification failed, signature mismatch' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export default paymentController;