import express from 'express';

import findNearestJobController from '../../app/controllers/find-nearest-job-controller.js';

const findJobRoute = express.Router();

findJobRoute.get('/find',findNearestJobController.nearestJob);
export default findJobRoute;