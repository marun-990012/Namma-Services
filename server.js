//******* importing third party modules or packages
import express from 'express';

// importing config files
import configureDb from './config/db.js';
import upload from './config/multerConfig.js';

//importing controllers
import userController from './app/controllers/user-controller.js';
import serviceCategoryController from './app/controllers/service-category-controller.js';
import jobPostController from './app/controllers/job-post-controller.js';
import mediaController from './app/controllers/media-upload-controller.js';
import reviewRatingController from './app/controllers/rating-controller.js';

//importing middlewares
import createAdmin from './app/middlewares/admin-create-middleware.js';
import authenticateUser from './app/middlewares/user-authentication.js';
import authorizeUser from './app/middlewares/user-authorization.js';


const app = express();
const port=3040;
configureDb();

//application level middleware 
app.use(express.json()); // Parse incoming JSON bodies

//api for users 9
app.post('/register',createAdmin(),userController.register);
app.post('/login',userController.login);
app.get('/user',userController.list);
app.get('/account',authenticateUser,userController.account);
app.put('/update-profile-image/:id',authenticateUser,userController.updateProfileImage);
app.put('/update-profile/:id',authenticateUser,userController.updateProfile);
app.post('/upload-images/:id',authenticateUser,userController.uploadPhotos);
app.put('/address/:id',userController.updateAddress); //not done
app.delete('/account/:id',authenticateUser,userController.remove);

//api for service category 4
app.post('/category',serviceCategoryController.create);
app.get('/category',serviceCategoryController.list);
app.put('/category/:id',serviceCategoryController.update);
app.delete('/category/:id',authenticateUser,authorizeUser(['admin']),serviceCategoryController.remove);

//api for job post 8
app.post('/jobpost',authenticateUser,jobPostController.create);
app.get('/jobposts',jobPostController.list);
app.get('/my-job-posts',authenticateUser,jobPostController.myJobPosts);
app.put('/jobpost/:id',authenticateUser,jobPostController.updatePost);
app.delete('/jobpost/:id',authenticateUser,jobPostController.remove);
app.post('/jobreq/:id',jobPostController.jobRequest);
app.post('/message/:id',jobPostController.sendMessage);
app.post('/reply/:id',jobPostController.sendMessage);

//api for image upload 1
app.post('/upload', upload.single('file'),mediaController.uploadImage);

//api for rating and review 4
app.post('/review/',reviewRatingController.create);
app.post('/more-review/:id',reviewRatingController.moreReview);
app.delete('/remove-review/:id/:reviewid',reviewRatingController.removeReview);
app.put('/update-review/:id/:reviewid',reviewRatingController.updateReview);

app.listen(port,()=>{
    console.log('Server is running on port',port);
});