import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import jobPostController from '../../app/controllers/job-post-controller.js';

const jobPostRoute = express.Router();

jobPostRoute.post('/create',authentication,jobPostController.create);
jobPostRoute.get('/list',jobPostController.list);
jobPostRoute.get('/my-posts',authentication,jobPostController.myJobPosts);
jobPostRoute.put('/update/:id',authentication,jobPostController.updatePost);
jobPostRoute.delete('/delete/:id',authentication,jobPostController.remove);
jobPostRoute.post('/request/:id',jobPostController.jobRequest);
jobPostRoute.post('/message/:id',jobPostController.sendMessage);
jobPostRoute.post('/reply/:id',jobPostController.sendReply);
jobPostRoute.post('/consideration/:id',jobPostController.consideration);
jobPostRoute.delete('/consideration/:id',jobPostController.removeConsideration);
jobPostRoute.post('/select/:id',jobPostController.selectServiceProvider);
jobPostRoute.post('/complete/:id',jobPostController.complete);

export default jobPostRoute;