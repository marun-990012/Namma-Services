import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const createReview = createAsyncThunk('/reviews/createReview',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/review/create',formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data || { message : "error while fetching address"})
    }
});


const reviewRatingSlice = createSlice({
    name:'reviews',
    initialState: {
      reviews:[],
      review:null,
      loading:false,
      error:null
   },
    reducers:{},
    extraReducers:(builder)=>{
        builder

        //create review
        .addCase(createReview.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(createReview.fulfilled,(state,action)=>{
            state.review = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(createReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })   

    }
});

export default reviewRatingSlice.reducer;



