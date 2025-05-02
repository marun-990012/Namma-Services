import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import reviewRatingController from '../../app/controllers/rating-controller.js';

const reviewRoute = express.Router();

reviewRoute.post('/create/',reviewRatingController.create);
reviewRoute.post('/add/:id',reviewRatingController.moreReview);
reviewRoute.delete('/delete/:id/:reviewid',reviewRatingController.removeReview);
reviewRoute.put('/update/:id/:reviewid',reviewRatingController.updateReview);

export default reviewRoute;