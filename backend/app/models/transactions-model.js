import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const transactionSchema = new Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
  },
  type: {
    type: String,
    enum: ['buy', 'spend', 'tip', 'bonus'],
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
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'success',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);
export default Transaction;
