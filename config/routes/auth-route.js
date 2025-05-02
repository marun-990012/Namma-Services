import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import createAdmin from '../../app/middlewares/admin-create-middleware.js';
import userController from '../../app/controllers/user-controller.js';

const authRoute = express.Router();


//api for users 9
authRoute.post('/register',createAdmin(),userController.register);
authRoute.post('/login',userController.login);
authRoute.get('/user',userController.list);
authRoute.get('/account',authentication,userController.account);
authRoute.put('/update-profile-image/:id',authentication,userController.updateProfileImage);
authRoute.put('/update-profile/:id',authentication,userController.updateProfile);
authRoute.post('/upload-images/:id',authentication,userController.uploadPhotos);
authRoute.put('/address/:id',userController.updateAddress); //not done
authRoute.delete('/account/:id',authentication,userController.remove);


export default authRoute;
