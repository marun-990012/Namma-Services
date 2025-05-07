import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const transactionSchema = new Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
  },
  type: {
    type: String,
    enum: ['buy', 'spend', 'refund', 'tip', 'bonus'],
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    default: null
  }
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);
export default Transaction;
