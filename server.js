import express from 'express';
import configureDb from './config/db.js';
import userController from './app/controllers/user-controller.js'

const app = express();
const port=3040;
configureDb();

// Parse JSON bodies
app.use(express.json());

app.post('/register',userController.register);
app.post('/login',userController.login);
app.listen(port,()=>{
    console.log('Server is running on port',port);
});