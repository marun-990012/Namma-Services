import express from 'express';
import { checkSchema } from 'express-validator';
import userController from '../../app/controllers/user-controller.js';
import authentication from '../../app/middlewares/user-authentication.js';
import authorization from '../../app/middlewares/user-authorization.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';
import { idValidationSchema } from '../../app/validators/id-validation-schema.js';
import { userRegisterValidation,
         userLoginValidation, 
         emailVerificationValidation,
         forgotPasswordValidation, 
         resetPasswordValidation,
         ImageUploadValidation,
         updateProfileValidation,
         updateAddressValidation} from '../../app/validators/user-validation-schema.js';


const authRoute = express.Router();

//api's for users 
authRoute.post('/register',checkSchema(userRegisterValidation),inputValidator,userController.register);
authRoute.post('/verify',checkSchema(emailVerificationValidation),inputValidator,userController.verfiyEmail);
authRoute.post('/forgot/paswword',checkSchema(forgotPasswordValidation),inputValidator,userController.forgotPassword);
authRoute.post('/reset/paswword',checkSchema(resetPasswordValidation),inputValidator,userController.resetPassword);
authRoute.post('/login-otp',userController.loginOtp);
authRoute.post('/login',checkSchema(userLoginValidation),inputValidator,userController.login);
authRoute.get('/user',authentication,userController.list);
authRoute.get('/service-providers',authentication,userController.fetchServiceProviders);
authRoute.get('/work-providers',authentication,userController.fetchWorkProviders);
authRoute.get('/account',authentication,userController.account);
authRoute.put('/update-profile-image',authentication,checkSchema(ImageUploadValidation),inputValidator,userController.updateProfileImage);
authRoute.post('/upload-images',authentication,userController.uploadPhotos);
authRoute.put('/update-profile',authentication,checkSchema(updateProfileValidation),inputValidator,userController.updateProfile);
authRoute.delete('/account/:id',authentication,checkSchema(idValidationSchema),inputValidator,userController.remove);
authRoute.get('/request/list',authentication,authorization(['admin']),userController.requestedUsers);
authRoute.put('/request/approve/reject/:id',authentication,authorization(['admin']),checkSchema(idValidationSchema),inputValidator,userController.approveUser);
authRoute.get('/rejected/list',authentication,authorization(['admin']),userController.rejectedUsers);



export default authRoute;
