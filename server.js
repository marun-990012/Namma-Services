import express from 'express';
import configureDb from './config/db.js';
import userController from './app/controllers/user-controller.js'
const app = express();
const port=3040;
configureDb();

app.post('/register',userController.register);
app.listen(port,()=>{
    console.log('Server is running on port',port);
});