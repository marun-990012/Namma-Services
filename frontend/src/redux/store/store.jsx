import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import serviceCategoryReducer from '../slices/serviceCategorySlice';
import profileReducer from '../slices/profileSlice';
import imageUploadReduces from '../slices/imageUploadSlice';


const store = configureStore({
    reducer:{
        auth:authReducer,
        services:serviceCategoryReducer,
        profile:profileReducer,
        image:imageUploadReduces
    }
});

export default store;