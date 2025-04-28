import express from 'express';
import configureDb from './config/db.js';
const app = express();
const port=3040;
configureDb();

// app.post('/register')
app.listen(port,()=>{
    console.log('Server is running on port',port);
});