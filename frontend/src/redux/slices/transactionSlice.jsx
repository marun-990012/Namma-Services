import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchTransactionHistory = createAsyncThunk('transactions/fetchTransactionHistory',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/transaction/history',{headers:{Authorization:localStorage.getItem('token')}});

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || "error while fetching transaction history");
    }
})

const transactionSlice = createSlice({
    name:"transactions",
    initialState:{
        histories:[],
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
    }
});

export default transactionSlice.reducer;