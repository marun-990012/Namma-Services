import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchAddress = createAsyncThunk('/address/fetchAddress',async()=>{
    try {
        const response = await axiosInstance.get('/address/find',{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data || { message : "error while fetching address"})
    }
});

export const updateAddress = createAsyncThunk('/address/updateAddress',async(formData)=>{
    try {
        const response = await axiosInstance.put('/address/update',formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data || { message : "error while updating address"})
    }
});

const addressSlice = createSlice({
    name:'address',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch user address
        .addCase(fetchAddress.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchAddress.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(fetchAddress.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


         //update address
        .addCase(updateAddress.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(updateAddress.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(updateAddress.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default addressSlice.reducer;



