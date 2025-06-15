import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import walletController from '../../app/controllers/wallet-controller.js';

const walletRoute = express.Router();

//api for wallet 
walletRoute.post('/create',authentication,walletController.createWallet);
walletRoute.post('/deduct/coin',authentication,walletController.deductCoin);
walletRoute.get('/find',authentication,walletController.find);

export default walletRoute;