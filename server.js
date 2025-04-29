import express from 'express';
import configureDb from './config/db.js';
import userController from './app/controllers/user-controller.js';
import serviceCategoryController from './app/controllers/service-category-controller.js';
import jobPostController from './app/controllers/job-post-controller.js';

import createAdmin from './app/middlewares/admin-create-middleware.js';
// import adminCreate from './app/middlewares/admin-create-middleware.js';

const app = express();
const port=3040;
configureDb();

// Parse JSON bodies
app.use(express.json());

app.post('/register',createAdmin(),userController.register);
app.post('/login',userController.login);
app.get('/user',userController.list);

app.post('/category',serviceCategoryController.create);
app.get('/category',serviceCategoryController.list);
app.put('/category/:id',serviceCategoryController.update);

app.post('/jobpost',jobPostController.create);
app.get('/jobposts',jobPostController.list);
app.listen(port,()=>{
    console.log('Server is running on port',port);
});