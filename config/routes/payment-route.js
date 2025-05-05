import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import paymentController from '../../app/controllers/payment-controller.js';

const paymentRoute = express.Router();
paymentRoute.post('/order', authentication,paymentController.order);
paymentRoute.post('/verify',authentication,paymentController.verify);

export default paymentRoute;