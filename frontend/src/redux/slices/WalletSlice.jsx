import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchWallet = createAsyncThunk('/wallet/fetchWallet',async()=>{
    try {
        const response = await axiosInstance.get('/wallet/find',{headers:{Authorization:localStorage.getItem('token')}});
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || { message : "error while fetching address"})
    }
});

const walletSlice = createSlice({
    name:'wallet',
    initialState: {
      wallet:null,
      verified: false,
      loading:false,
      error:null
   },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch wallet
        .addCase(fetchWallet.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchWallet.fulfilled,(state,action)=>{
            state.wallet = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(fetchWallet.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })   
    }
});

export default walletSlice.reducer;



