import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const createJobPost = createAsyncThunk('/jobs/createJobPost',async(formData,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post('/job/create',formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
});

export const listJobPosts = createAsyncThunk('/jobs/listJobPosts',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/job/my-posts',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});

export const findNearestJobs = createAsyncThunk('/jobs/findNearestJobs',async({lat,lng},{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get(`/nearby/job/find?lat=${lat}&lng=${lng}`,{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});

export const showJobPostDetail = createAsyncThunk('/jobs/showJobPostDetail',async(id,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get(`/job/show/${id}`,{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});


export const sendJobRequest = createAsyncThunk('/jobs/sendJobRequest',async({id,formData},{rejectWithValue})=>{
    // console.log('thunk',id)
    // console.log('thunk',formData)
    try{
        const response = await axiosInstance.post(`/job/request/${id}`,formData,{headers:{
            Authorization:localStorage.getItem('token')
        }});
        // console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});

export const considerServiceProvider = createAsyncThunk('/jobs/considerServiceProvider',async({id,serviceProviderId},{rejectWithValue})=>{
    // console.log('thunk',id)
    // console.log('thunk',serviceProviderIds)
    try{
        const response = await axiosInstance.post(`/job/consideration/${id}`,{serviceProvider:serviceProviderId},{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});

export const selectServiceProvider = createAsyncThunk('/jobs/selectServiceProvider',async({id,selectedServiceProviderId},{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post(`/job/select/${id}`,{serviceProvider:selectedServiceProviderId},{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});

export const replyToServiceProvider = createAsyncThunk('/jobs/replyToServiceProvider',async({id,formData},{rejectWithValue})=>{
    console.log(formData)
    try{
        const response = await axiosInstance.post(`/job/reply/${id}`,formData,{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});

const jobPostSlice = createSlice({
    name:"jobs",
    initialState:{
        data:[],
        job:{},
        loading:false,
        error:null, 
    },
    extraReducers:(builder)=>{
        builder
        //create job post
        .addCase(createJobPost.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(createJobPost.fulfilled,(state,action)=>{
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
        })

        .addCase(createJobPost.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //list jobposts 
        .addCase(listJobPosts.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(listJobPosts.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(listJobPosts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
        //list nearest jobs 
        .addCase(findNearestJobs.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(findNearestJobs.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(findNearestJobs.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        //show job post details
        .addCase(showJobPostDetail.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(showJobPostDetail.fulfilled,(state,action)=>{
            state.job = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(showJobPostDetail.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        //send job request
        .addCase(sendJobRequest.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        
        .addCase(sendJobRequest.fulfilled,(state,action)=>{
             const index = state.data.findIndex((post)=>{
             return post._id == action.payload._id;
             });
             if (index !== -1) {
             state.data[index] = action.payload;
             }
             state.job = action.payload;
             state.loading = false;
             state.error = null;
        })
        
        .addCase(sendJobRequest.rejected,(state,action)=>{
             state.loading = false;
             state.error = action.payload;
        })


        //consider service provider
        .addCase(considerServiceProvider.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        
        .addCase(considerServiceProvider.fulfilled,(state,action)=>{
             const index = state.data.findIndex((post)=>{
             return post._id == action.payload._id;
             });
             if (index !== -1) {
             state.data[index] = action.payload;
             }
             state.job = action.payload;
             state.loading = false;
             state.error = null;
        })
        
        .addCase(considerServiceProvider.rejected,(state,action)=>{
             state.loading = false;
             state.error = action.payload;
        })


        //select service provider
        .addCase(selectServiceProvider.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        
        .addCase(selectServiceProvider.fulfilled,(state,action)=>{
             const index = state.data.findIndex((post)=>{
             return post._id == action.payload._id;
             });
             if (index !== -1) {
             state.data[index] = action.payload;
             }
             state.job = action.payload;
             state.loading = false;
             state.error = null;
        })
        
        .addCase(selectServiceProvider.rejected,(state,action)=>{
             state.loading = false;
             state.error = action.payload;
        })


        //reply to service provider
        .addCase(replyToServiceProvider.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        
        .addCase(replyToServiceProvider.fulfilled,(state,action)=>{
             const index = state.data.findIndex((post)=>{
             return post._id == action.payload._id;
             });
             if (index !== -1) {
             state.data[index] = action.payload;
             }
             state.job = action.payload;
             state.loading = false;
             state.error = null;
        })
        
        .addCase(replyToServiceProvider.rejected,(state,action)=>{
             state.loading = false;
             state.error = action.payload;
        })
        
    }
});

export default jobPostSlice.reducer;