import express from 'express';
import { check, checkSchema } from 'express-validator';
import authentication from '../../app/middlewares/user-authentication.js';
import createAdmin from '../../app/middlewares/admin-create-middleware.js';
import userController from '../../app/controllers/user-controller.js';
import { userRegisterValidation,
         userLoginValidation, 
         emailVerificationValidation,
         forgotPasswordValidation, 
         resetPasswordValidation,
         ImageUploadValidation,
         updateProfileValidation,
         updateAddressValidation} from '../../app/validators/user-validation-schema.js';
import { idValidationSchema } from '../../app/validators/id-validation-schema.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';

const authRoute = express.Router();


//api for users 12
authRoute.post('/register',checkSchema(userRegisterValidation),inputValidator,userController.register);
authRoute.post('/verify',checkSchema(emailVerificationValidation),inputValidator,userController.verfiyEmail);
authRoute.post('/forgot/paswword',checkSchema(forgotPasswordValidation),inputValidator,userController.forgotPassword);
authRoute.post('/reset/paswword',checkSchema(resetPasswordValidation),inputValidator,userController.resetPassword);
authRoute.post('/login-otp',userController.loginOtp);
authRoute.post('/login',checkSchema(userLoginValidation),inputValidator,userController.login);
authRoute.get('/user',userController.list);
authRoute.get('/account',authentication,userController.account);
authRoute.put('/update-profile-image/:id',authentication,checkSchema(ImageUploadValidation),checkSchema(idValidationSchema),inputValidator,userController.updateProfileImage);
authRoute.post('/upload-images/:id',authentication,checkSchema(ImageUploadValidation),checkSchema(idValidationSchema),inputValidator,userController.uploadPhotos);
authRoute.put('/update-profile/:id',authentication,checkSchema(updateProfileValidation),checkSchema(idValidationSchema),inputValidator,userController.updateProfile);
authRoute.put('/address/:id',authentication,checkSchema(updateAddressValidation),checkSchema(idValidationSchema),inputValidator,userController.updateAddress); 
authRoute.delete('/account/:id',authentication,userController.remove);


export default authRoute;
