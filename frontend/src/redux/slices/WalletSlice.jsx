import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchWallet = createAsyncThunk('/wallet/fetchWallet',async()=>{
    try {
        const response = await axiosInstance.get('/wallet/find',{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data || { message : "error while fetching address"})
    }
});

// Thunk for creating a Razorpay order
export const createOrder = createAsyncThunk("wallet/createOrder",async (amount, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/payment/order", { amount }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data.data)
      return response.data.data; // Return Razorpay order data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order creation failed");
    }
  }
);

// Thunk for verifying payment
export const verifyPayment = createAsyncThunk("wallet/verifyPayment",async ({ response, amount }, { rejectWithValue }) => {
    try {
      const verify = await axiosInstance.post("/payment/verify", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        amount,
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log(verify.data);

      return verify.data;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response?.data || "Verification failed");
    }
  }
);

const walletSlice = createSlice({
    name:'wallet',
    initialState: {
      wallet:null,
      orderData: null,
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
        
        //create razorpay order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //verify payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
        state.wallet=action.payload.wallet;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    }
});

export default walletSlice.reducer;



