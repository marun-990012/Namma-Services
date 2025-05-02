import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import addressController from '../../app/controllers/address-controller.js';

const addressRoute = express.Router();

//api for address 2
addressRoute.post('/create',authentication,addressController.createAddress);
addressRoute.put('/update/:id',authentication,addressController.updateAddress);

export default addressRoute;