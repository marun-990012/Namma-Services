import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchTransactionHistory = createAsyncThunk('transactions/fetchTransactionHistory',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/transaction/history',{headers:{Authorization:localStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "error while fetching transaction history");
    }
});

export const fetchRevenue = createAsyncThunk('transactions/fetchRevenue',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/transaction/revenue',{headers:{Authorization:localStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "error while fetching transaction history");
    }
})

const transactionSlice = createSlice({
    name:"transactions",
    initialState:{
        histories:[],
        revenue:0
    },
    extraReducers: (builder)=>{
        builder

        //fetch transaction history
        .addCase(fetchTransactionHistory.pending,(state,action)=>{

        })

        .addCase(fetchTransactionHistory.fulfilled,(state,action)=>{
            state.histories = action.payload;
        })

        .addCase(fetchTransactionHistory.rejected,(state,action)=>{
            
        })


        .addCase(fetchRevenue.pending,(state,action)=>{

        })

        .addCase(fetchRevenue.fulfilled,(state,action)=>{
            state.revenue = action.payload;
        })

        .addCase(fetchRevenue.rejected,(state,action)=>{
            
        })
    }
});

export default transactionSlice.reducer;