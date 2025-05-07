import { model, Schema } from "mongoose"

const paymentSchema = new Schema(
    {
        razorpay_order_id:String,
        razorpay_payment_id:String,
        razorpay_signiture:String,
        date:{
            type:Date,
            default:Date.now
        },
        amount:Number,
        userId:Schema.Types.ObjectId
    }
)

const Payment = model('Payment',paymentSchema);
export default Payment;