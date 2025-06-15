import dotenv from 'dotenv';
dotenv.config()
import Razorpay from "razorpay";
export const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,          //your Razorpay KEY ID
    key_secret: process.env.RAZORPAY_SECRET      // your Razorpay SECRET
  });
