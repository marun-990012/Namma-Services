import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import findNearestJobController from '../../app/controllers/find-nearest-job-controller.js';

const findJobRoute = express.Router();

//api for find nearest work
findJobRoute.get('/find/',authentication,findNearestJobController.nearestJob);
export default findJobRoute;