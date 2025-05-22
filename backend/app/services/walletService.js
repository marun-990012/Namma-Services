// services/walletService.js
import Wallet from "../models/wallet-model.js";

//add coins in wallet
export const addCoinsInWallet = async (userId, amount) => {
  const coinsToAdd = Math.floor(amount / 10); // 1 coin = Rs.10

  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new Error("Wallet not found");
  }

  wallet.coins += coinsToAdd;
  await wallet.save();

  return wallet;
};


//deduct coins from wallet
export const deductCoin = async (userId) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) throw new Error("Wallet not found");

  if (wallet.coins < 1) throw new Error("Insufficient coins");

  wallet.coins -= 1;
  await wallet.save();

  return wallet;
};