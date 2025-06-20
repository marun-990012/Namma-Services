import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const userRegister = createAsyncThunk('auth/register',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/auth/register',formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data ||{ message : "Regirtration failed"})
    }
});

export const emailVerify = createAsyncThunk('auth/emailVerify',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/auth/verify',formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data ||{ message : "Email verification failed"})
    }
});

export const loginOtp = createAsyncThunk('/auth/loginOtp',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/auth/login-otp',formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data ||{ message : "otp send failed"})
    }
});

export const userLogin = createAsyncThunk('/auth/userLogin',async(formData,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post('/auth/login',formData);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('isLoggedIn',true);
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data ||{ message : "Login failed. Please try again"});
    }
});


export const forgotPassword = createAsyncThunk('/auth/forgotPassword',async(formData,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post('/auth/forgot/paswword',formData);
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data ||{ message : "Login failed. Please try again"});
    }
});

export const resetPassword = createAsyncThunk('/auth/resetPassword',async(formData,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post('/auth/reset/paswword',formData);
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data ||{ message : "Login failed. Please try again"});
    }
});

const authSlice = createSlice({
    name:'auth',
    initialState:{
        data:[],
        loading:false,
        error:null,
        isLoggedIn:false
    },
    extraReducers:(builder)=>{
        builder

        //user registration
        .addCase(userRegister.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(userRegister.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
        })

        .addCase(userRegister.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        })


        //email verification
        .addCase(emailVerify.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(emailVerify.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
        })

        //email verification
        .addCase(loginOtp.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(loginOtp.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
        })

        .addCase(loginOtp.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        })

         //user login
         .addCase(userLogin.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(userLogin.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = true;
        })

        .addCase(userLogin.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false;
            state.isLoggedIn = false;
        });
    },

    reducers: {
            logout: (state,action) => {
              state.data = [];
              state.isLoggedIn = false
              localStorage.removeItem("token");
            },
        },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;