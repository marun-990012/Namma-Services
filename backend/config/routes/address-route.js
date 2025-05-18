import express from 'express';
import { checkSchema } from 'express-validator';
import authentication from '../../app/middlewares/user-authentication.js';
import authorization from '../../app/middlewares/user-authorization.js';
import addressController from '../../app/controllers/address-controller.js';
import { addressValidation } from '../../app/validators/address-validation-schema.js';
import { idValidationSchema } from '../../app/validators/id-validation-schema.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';


const addressRoute = express.Router();

//api for address 3
// addressRoute.post('/create',authentication,authorization(["work-provider","service-provider"]),checkSchema(addressValidation),inputValidator,addressController.createAddress);
addressRoute.put('/update',authentication,authorization(["work-provider","service-provider"]),checkSchema(addressValidation),inputValidator,addressController.updateAddress);
addressRoute.get('/find',authentication,addressController.find);
addressRoute.get('/list',authentication,addressController.listAddress);

export default addressRoute;