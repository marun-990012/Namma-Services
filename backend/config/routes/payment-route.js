import express from 'express';
import { checkSchema } from 'express-validator';
import authentication from '../../app/middlewares/user-authentication.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';
import paymentController from '../../app/controllers/payment-controller.js';
import { paymentOrderValidation,paymentVerificationValidation } from '../../app/validators/payment-validation-schema.js';

const paymentRoute = express.Router();

// api's for payment
paymentRoute.post('/order', authentication,checkSchema(paymentOrderValidation),inputValidator,paymentController.order);
paymentRoute.post('/verify',authentication,checkSchema(paymentVerificationValidation),inputValidator,paymentController.verify);

export default paymentRoute;