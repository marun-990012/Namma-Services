import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import serviceCategoryReducer from '../slices/serviceCategorySlice';
import profileReducer from '../slices/profileSlice';
import imageUploadReduces from '../slices/imageUploadSlice';
import addressReducer from '../slices/profileAddressSlice';
import jobPostReducer from '../slices/jobPostSlice';
import userReducer from '../slices/userSlice';
import walletReducer from '../slices/WalletSlice';
import paymentReducer from '../slices/paymentSlice';
import reviewRatingReducer from '../slices/reviewRatingSlice';


const store = configureStore({
    reducer:{
        auth:authReducer,
        services:serviceCategoryReducer,
        profile:profileReducer,
        image:imageUploadReduces,
        address:addressReducer,
        jobs:jobPostReducer,
        users:userReducer,
        wallet:walletReducer,
        payment:paymentReducer,
        review:reviewRatingReducer
    }
});

export default store;