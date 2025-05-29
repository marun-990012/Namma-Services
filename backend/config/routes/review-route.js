import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import authorization from '../../app/middlewares/user-authorization.js';
import reviewRatingController from '../../app/controllers/review-controller.js';
import { reviewRatingValidation,moreReviewValidation,updateReviewValidation } from '../../app/validators/review-rating-validation-schema.js';
import { idValidationSchema,reviewIdValidation } from '../../app/validators/id-validation-schema.js';
import inputValidator from '../../app/helpers/input-validation-helper.js';
import { checkSchema } from 'express-validator';

const reviewRoute = express.Router();

reviewRoute.post('/create/',authentication,authorization(['work-provider']),checkSchema(reviewRatingValidation),inputValidator,reviewRatingController.create);
reviewRoute.post('/add/:id',authentication,authorization(['work-provider']),checkSchema(moreReviewValidation),checkSchema(idValidationSchema),inputValidator,reviewRatingController.moreReview);
reviewRoute.delete('/delete/:id/:reviewid',authentication,checkSchema(reviewIdValidation),inputValidator,reviewRatingController.removeReview);
reviewRoute.put('/update/:id/:reviewid',authentication,authorization(['work-provider']),checkSchema(updateReviewValidation),checkSchema(idValidationSchema),inputValidator,reviewRatingController.updateReview);
reviewRoute.get('/list/:id',authentication,reviewRatingController.list);
reviewRoute.post('/like/:id',authentication,reviewRatingController.like);

export default reviewRoute;