import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const listCategories = createAsyncThunk('/services/listCategories',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/category/list',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
})

const serviceCategorySlice = createSlice({
    name:"services",
    initialState:{
        data:[],
        loading:false,
        error:null, 
    },
    extraReducers:(builder)=>{
        builder
        .addCase(listCategories.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(listCategories.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(listCategories.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
    }
});

export default serviceCategorySlice.reducer;