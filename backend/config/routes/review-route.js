import express from 'express';
import { checkSchema } from 'express-validator';
import authorization from '../../app/middlewares/user-authorization.js';
import authentication from '../../app/middlewares/user-authentication.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';
import reviewRatingController from '../../app/controllers/review-controller.js';
import { idValidationSchema,reviewIdValidation } from '../../app/validators/id-validation-schema.js';
import { reviewRatingValidation,updateReviewValidation } from '../../app/validators/review-rating-validation-schema.js';

const reviewRoute = express.Router();

// api's for review and rating
reviewRoute.post('/create/',authentication,authorization(['work-provider']),checkSchema(reviewRatingValidation),inputValidator,reviewRatingController.create);
reviewRoute.delete('/delete/:id/:reviewid',authentication,checkSchema(reviewIdValidation),inputValidator,reviewRatingController.removeReview);
reviewRoute.put('/update/:id/:reviewid',authentication,authorization(['work-provider']),checkSchema(updateReviewValidation),checkSchema(idValidationSchema),inputValidator,reviewRatingController.updateReview);
reviewRoute.get('/list/:id',authentication,reviewRatingController.list);
reviewRoute.post('/like/:id',authentication,reviewRatingController.like);

export default reviewRoute;