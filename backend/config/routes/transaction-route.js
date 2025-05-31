import transactionController from "../../app/controllers/transaction-controller.js";
import express from 'express';

import authentication from '../../app/middlewares/user-authentication.js';

const transactionRoute = express.Router();

transactionRoute.get('/history',authentication,transactionController.history);

export default transactionRoute;
