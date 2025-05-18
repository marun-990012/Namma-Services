import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchServiceProviders = createAsyncThunk('/users/fetchServiceProviders',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/auth/service-providers',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});


const userSlice = createSlice({
    name:"users",
    initialState:{
        data:[],
        loading:false,
        error:null, 
    },
    extraReducers:(builder)=>{
        builder
        
        //list service Providers 
        .addCase(fetchServiceProviders.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchServiceProviders.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(fetchServiceProviders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
          
    }
});

export default userSlice.reducer;