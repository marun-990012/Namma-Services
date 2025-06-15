import express from 'express';
import { checkSchema } from 'express-validator';
import authorization from '../../app/middlewares/user-authorization.js';
import authentication from '../../app/middlewares/user-authentication.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';
import { idValidationSchema } from '../../app/validators/id-validation-schema.js';
import serviceCategoryController from "../../app/controllers/service-category-controller.js";
import { serviceCategoryValidation,serviceUpdateValidation } from '../../app/validators/service-category-validation-schema.js';

const categoryRoute = express.Router();

//api's for service category 
categoryRoute.post('/create',authentication,authorization(['admin']),checkSchema(serviceCategoryValidation),inputValidator,serviceCategoryController.create);
categoryRoute.get('/list',authentication,serviceCategoryController.list);
categoryRoute.put('/update/:id',authentication,authorization(['admin']),checkSchema(serviceUpdateValidation),checkSchema(idValidationSchema),inputValidator,serviceCategoryController.update);
categoryRoute.delete('/delete/:id',authentication,authorization(['admin']),serviceCategoryController.remove);


export default categoryRoute;
