//******* importing third party modules or packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// importing config files
import connectDb from './config/db.js';

// importing routes
import authRoute from './config/routes/auth-route.js';
import categoryRoute from './config/routes/category-route.js';
import addressRoute from './config/routes/address-route.js';
import jobPostRoute from './config/routes/job-post-route.js';
import imageUploadRoute from './config/routes/image-upload-route.js';
import reviewRoute from './config/routes/review-route.js';
import walletRoute from './config/routes/wallet-route.js';
import findJobRoute from './config/routes/find-nearest-route.js';
import paymentRoute from './config/routes/payment-route.js';
import transactionRoute from './config/routes/transaction-route.js';
import notificationRoute from './config/routes/notification-route.js';

const app = express();
dotenv.config();
const port= process.env.PORT || 3040;

//application level middleware 
app.use(express.json()); // Parse incoming JSON bodies
app.use(cors());  //to avoide cors error

//api for users 
app.use('/api/auth',authRoute);

//api for address 
app.use('/api/address',addressRoute);

// //api for service category 
app.use('/api/category',categoryRoute);

//api for job post 
app.use('/api/job',jobPostRoute);

//api for find near job;
app.use('/api/nearby/job',findJobRoute);

//api for image upload 
app.use('/api/image', imageUploadRoute);

//api for rating and review 
app.use('/api/review',reviewRoute);

//api for wallet 
app.use('/api/wallet',walletRoute);

//api for payment
app.use('/api/payment', paymentRoute);

//api for transaction 
app.use('/api/transaction', transactionRoute);

//api for notification
app.use('/api/notification', notificationRoute);


app.listen(port,()=>{
    connectDb();
    console.log('Server is running on port',port);
    
});
