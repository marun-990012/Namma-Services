import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";


// Thunk for creating a Razorpay order
export const createOrder = createAsyncThunk("wallet/createOrder",async (amount, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/payment/order", { amount }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data.data; // Return Razorpay order data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order creation failed");
    }
  }
);

// Thunk for verifying payment
export const verifyPayment = createAsyncThunk("wallet/verifyPayment",async ({ response, amount,paymentType ,jobId,userId }, { rejectWithValue }) => {
    try {
      const verify = await axiosInstance.post("/payment/verify", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        amount,
        paymentType,
        jobId,
        userId
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      return verify.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Verification failed");
    }
  }
);

const paymentSlice = createSlice({
    name:'wallet',
    initialState: {
      orderData: null,
      verified: false,
      loading:false,
      error:null
   },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
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

export default paymentSlice.reducer;



