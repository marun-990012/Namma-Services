import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import transactionController from "../../app/controllers/transaction-controller.js";

const transactionRoute = express.Router();

// api's for transactions
transactionRoute.get('/history',authentication,transactionController.history);
transactionRoute.get('/revenue',authentication,transactionController.totalRevenue);

export default transactionRoute;
