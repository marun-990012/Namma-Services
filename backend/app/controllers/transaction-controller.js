import mongoose from 'mongoose';
import Transaction from "../models/transactions-model.js";

const transactionController = {};

transactionController.history = async (req,res)=>{
    try {
        const transaction = await Transaction.find({user:req.userId}).sort({ createdAt: -1 });
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}



transactionController.totalRevenue = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(req.userId), // Ensure it's an ObjectId
          purpose: 'salary_payment',
          status: 'success',
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalRevenue = result[0]?.total || 0;
    return res.status(200).json({ totalRevenue });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export default transactionController;