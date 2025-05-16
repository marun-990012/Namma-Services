import express from 'express';
import { checkSchema } from 'express-validator';
import authentication from '../../app/middlewares/user-authentication.js';
import jobPostController from '../../app/controllers/job-post-controller.js';
import { jobPostValidation, jobRequestValidation,sendMessageValidation, sendMessageReplyValidation,considerationValidation,selectServiceProviderValidation } from '../../app/validators/job-post-validation-schema.js';
import { idValidationSchema } from '../../app/validators/id-validation-schema.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';
import authorization from '../../app/middlewares/user-authorization.js';

const jobPostRoute = express.Router();

jobPostRoute.post('/create',authentication,authorization(['work-provider']),checkSchema(jobPostValidation),inputValidator,jobPostController.create);
jobPostRoute.get('/list',authentication,jobPostController.list);
jobPostRoute.get('/show/:id',authentication,checkSchema(idValidationSchema),jobPostController.show);
jobPostRoute.get('/my-posts',authentication,jobPostController.myJobPosts);
jobPostRoute.put('/update/:id',authentication,authorization(['work-provider']),checkSchema(jobPostValidation),checkSchema(idValidationSchema),inputValidator,jobPostController.updatePost);
jobPostRoute.delete('/delete/:id',authentication,authorization(['work-provider']),checkSchema(idValidationSchema),inputValidator,jobPostController.remove);
jobPostRoute.post('/request/:id',authentication,authorization(['service-provider']),checkSchema(jobRequestValidation),checkSchema(idValidationSchema),inputValidator,jobPostController.jobRequest);
jobPostRoute.post('/message/:id',authentication,authorization(['service-provider']),checkSchema(sendMessageValidation),checkSchema(idValidationSchema),inputValidator,jobPostController.sendMessage);
jobPostRoute.post('/reply/:id',authentication,authorization(['work-provider']),checkSchema(sendMessageReplyValidation),checkSchema(idValidationSchema),inputValidator,jobPostController.sendReply);
jobPostRoute.post('/consideration/:id',authentication,authorization(['work-provider']),checkSchema(considerationValidation),checkSchema(idValidationSchema),inputValidator,jobPostController.consideration);
jobPostRoute.delete('/consideration/:id',authentication,authorization(['work-provider']),checkSchema(considerationValidation),checkSchema(idValidationSchema),inputValidator,jobPostController.removeConsideration);
jobPostRoute.post('/select/:id',authentication,authorization(['work-provider']),checkSchema(selectServiceProviderValidation),checkSchema(idValidationSchema),inputValidator,jobPostController.selectServiceProvider);
jobPostRoute.post('/complete/:id',authentication,authorization(['work-provider']),checkSchema(idValidationSchema),inputValidator,jobPostController.complete);

export default jobPostRoute;