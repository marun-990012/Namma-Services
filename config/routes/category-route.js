import express from 'express';
import serviceCategoryController from "../../app/controllers/service-category-controller.js";
import authentication from '../../app/middlewares/user-authentication.js';
import authorization from '../../app/middlewares/user-authorization.js';

const categoryRoute = express.Router();

//api for service category 4
categoryRoute.post('/create',serviceCategoryController.create);
categoryRoute.get('/list',serviceCategoryController.list);
categoryRoute.put('/update/:id',serviceCategoryController.update);
categoryRoute.delete('/delete/:id',authentication,authorization(['admin']),serviceCategoryController.remove);


export default categoryRoute;
