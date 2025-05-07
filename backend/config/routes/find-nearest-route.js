import express from 'express';

import findNearestJobController from '../../app/controllers/find-nearest-job-controller.js';
import authentication from '../../app/middlewares/user-authentication.js';

const findJobRoute = express.Router();

findJobRoute.get('/find/',authentication,findNearestJobController.nearestJob);
export default findJobRoute;