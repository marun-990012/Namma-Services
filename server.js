//******* importing third party modules or packages
import express from 'express';

//config file
import configureDb from './config/db.js';
import upload from './config/multerConfig.js';

//importing controllers
import userController from './app/controllers/user-controller.js';
import serviceCategoryController from './app/controllers/service-category-controller.js';
import jobPostController from './app/controllers/job-post-controller.js';
import mediaController from './app/controllers/media-upload-controller.js';

//importing middlewares
import createAdmin from './app/middlewares/admin-create-middleware.js';
import authenticateUser from './app/middlewares/user-authentication.js';


const app = express();
const port=3040;
configureDb();

// Parse JSON bodies
app.use(express.json());

app.post('/register',createAdmin(),userController.register);
app.post('/login',userController.login);
app.get('/user',userController.list);
app.get('/account',authenticateUser,userController.account);


app.post('/category',serviceCategoryController.create);
app.get('/category',serviceCategoryController.list);
app.put('/category/:id',serviceCategoryController.update);

app.post('/jobpost',authenticateUser,jobPostController.create);
app.get('/jobposts',jobPostController.list);
app.get('/my-job-posts',authenticateUser,jobPostController.myJobPosts);

app.post('/upload', upload.single('file'),mediaController.uploadImage);

app.listen(port,()=>{
    console.log('Server is running on port',port);
});