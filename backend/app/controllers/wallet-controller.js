import Wallet from "../models/wallet-model.js";
import walletRoute from "../../config/routes/wallet-route.js";

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
  
walletController.find = async(req,res)=>{
  try {
    const wallet = await Wallet.findOne({userId:req.userId});
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    return res.json(wallet);
  } catch (error) {
    console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
  }
}

export default walletController;