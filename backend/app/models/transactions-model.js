import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const transactionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  purpose: {
    type: String,
    enum: ['wallet_topup', 'salary_payment', 'debit_wallet', 'refund'],
  },
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    default: 'pending',
  },
  paymentGatewayId: {
    type: String,
    default: null,
  },
  amount: {
    type: Number,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    default: undefined
  },
  date:String
}, { timestamps: true });


// Pre-save hook to format and set transaction Date
transactionSchema.pre("save", function (next) {
  if (!this.date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-GB', options); // e.g., "28 May 2025"
    this.date = formattedDate;
  }
  next();
});

const Transaction = model('Transaction', transactionSchema);
export default Transaction;
