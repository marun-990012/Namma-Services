import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice';
import profileReducer from './slices/profileSlice';
// import all your slices here

const appReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
  profile: profileReducer,
  // add all slices here
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // This will reset the entire store to its initial states
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
