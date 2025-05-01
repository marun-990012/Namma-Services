import Wallet from "../models/wallet-model.js";

const walletController = {};

walletController.createWallet = async(req,res)=>{
    try{
        const wallet = await Wallet.create({userId:req.userId});
        return res.status(201).json(wallet);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


walletController.addCoin = async (req, res) => {
    try {
      const { amountPaid } = req.body; // e.g., 20
      if (!amountPaid || typeof amountPaid !== "number" || amountPaid <= 0) {
        return res.status(400).json({ error: "Invalid amount paid" });
      }
  
      const coinsToAdd = Math.floor(amountPaid / 10); // 1 coin = Rs.10
  
      const wallet = await Wallet.findOne({ userId: req.userId });
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }
  
      wallet.coins += coinsToAdd;
      await wallet.save();
  
      return res.status(201).json(wallet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };



  //deduct coins controller
  walletController.deductCoin = async (req, res) => {
    try {
      const wallet = await Wallet.findOne({ userId: req.userId });
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }
  
      if (wallet.coins < 1) {
        return res.status(400).json({ error: "Insufficient coins" });
      }
  
      wallet.coins -= 1;
      await wallet.save();
  
      return res.status(200).json(wallet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  


export default walletController;