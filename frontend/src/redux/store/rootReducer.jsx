import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import authReducer from '../slices/authSlice';
import walletReducer from '../slices/WalletSlice';
import paymentReducer from '../slices/paymentSlice';
import jobPostReducer from '../slices/jobPostSlice';
import profileReducer from '../slices/profileSlice';
import addressReducer from '../slices/profileAddressSlice';
import imageUploadReduces from '../slices/imageUploadSlice';
import transactionReducer from '../slices/transactionSlice';
import notificationReducer from '../slices/notificationSlice';
import reviewRatingReducer from '../slices/reviewRatingSlice';
import serviceCategoryReducer from '../slices/serviceCategorySlice';
// import all your slices here

const appReducer = combineReducers({
          auth:authReducer,
          services:serviceCategoryReducer,
          profile:profileReducer,
          image:imageUploadReduces,
          address:addressReducer,
          jobs:jobPostReducer,
          users:userReducer,
          wallet:walletReducer,
          review:reviewRatingReducer,
          payment:paymentReducer,
          transactions:transactionReducer,
          notifications:notificationReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem("token"); // optional here
    return undefined; // resets all slices to initial state
  }
  return appReducer(state, action);
};


export default rootReducer;
