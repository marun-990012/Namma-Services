// import {configureStore} from '@reduxjs/toolkit';
// import userReducer from '../slices/userSlice';
// import authReducer from '../slices/authSlice';
// import walletReducer from '../slices/WalletSlice';
// import paymentReducer from '../slices/paymentSlice';
// import jobPostReducer from '../slices/jobPostSlice';
// import profileReducer from '../slices/profileSlice';
// import addressReducer from '../slices/profileAddressSlice';
// import imageUploadReduces from '../slices/imageUploadSlice';
// import transactionReducer from '../slices/transactionSlice';
// import notificationReducer from '../slices/notificationSlice';
// import reviewRatingReducer from '../slices/reviewRatingSlice';
// import serviceCategoryReducer from '../slices/serviceCategorySlice';


// const store = configureStore({
//     reducer:{
//         auth:authReducer,
//         services:serviceCategoryReducer,
//         profile:profileReducer,
//         image:imageUploadReduces,
//         address:addressReducer,
//         jobs:jobPostReducer,
//         users:userReducer,
//         wallet:walletReducer,
//         review:reviewRatingReducer,
//         payment:paymentReducer,
//         transactions:transactionReducer,
//         notifications:notificationReducer
//     }
// });

// export default store;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // optional: avoids some redux-toolkit warnings
    }),
});

export default store;
