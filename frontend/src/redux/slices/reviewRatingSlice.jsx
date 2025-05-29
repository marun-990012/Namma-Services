import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const createReview = createAsyncThunk('/reviews/createReview',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/review/create',formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data || { message : "error while create review"})
    }
});



export const fetchReviews = createAsyncThunk('/reviews/fetchReviews',async(id,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/review/list/${id}`,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data || { message : "error while fetching reviews"})
    }
});


export const likeReview = createAsyncThunk('/reviews/likeReview',async(id,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/review/like/${id}`,{},{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data || { message : "error while fetching reviews"})
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

        // fetch reviews
        .addCase(fetchReviews.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchReviews.fulfilled,(state,action)=>{
            state.reviews = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(fetchReviews.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }) 


        // like reviews
        .addCase(likeReview.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(likeReview.fulfilled,(state,action)=>{
            const index = state.reviews.findIndex((review)=>{
                return review._id == action.payload._id;
            });

            state.reviews.splice(index,1,action.payload);
            // state.reviews = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(likeReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }) 

    }
});

export default reviewRatingSlice.reducer;



