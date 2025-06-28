// import { combineReducers } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice';
// import jobReducer from './slices/jobSlice';
// import profileReducer from './slices/profileSlice';
// // import all your slices here

// const appReducer = combineReducers({
//   user: userReducer,
//   jobs: jobReducer,
//   profile: profileReducer,
//   // add all slices here
// });

// const rootReducer = (state, action) => {
//   if (action.type === 'LOGOUT') {
//     // This will reset the entire store to its initial states
//     state = undefined;
//   }
//   return appReducer(state, action);
// };

// export default rootReducer;


// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import authReducer from '../slices/authSlice';
import walletReducer from '../slices/WalletSlice';
import paymentReducer from '../slices/paymentSlice';
import jobPostReducer from '../slices/jobPostSlice';
import profileReducer from '../slices/profileSlice';
import addressReducer from '../slices/profileAddressSlice';
import imageUploadReducer from '../slices/imageUploadSlice';
import transactionReducer from '../slices/transactionSlice';
import notificationReducer from '../slices/notificationSlice';
import reviewRatingReducer from '../slices/reviewRatingSlice';
import serviceCategoryReducer from '../slices/serviceCategorySlice';

// Combine all reducers
const appReducer = combineReducers({
  auth: authReducer,
  services: serviceCategoryReducer,
  profile: profileReducer,
  image: imageUploadReducer,
  address: addressReducer,
  jobs: jobPostReducer,
  users: userReducer,
  wallet: walletReducer,
  review: reviewRatingReducer,
  payment: paymentReducer,
  transactions: transactionReducer,
  notifications: notificationReducer,
});

// Root reducer with logout reset support
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined; // Reset all slices to initialState
  }
  return appReducer(state, action);
};

export default rootReducer;
