import Transaction from "../models/transactions-model.js";

const transactionController = {};

transactionController.history = async (req,res)=>{
    console.log('transactions')
    try {
        const transaction = await Transaction.find({user:req.userId});

        return res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default transactionController;