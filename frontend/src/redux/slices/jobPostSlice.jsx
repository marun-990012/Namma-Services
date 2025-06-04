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

export const deleteJobPost = createAsyncThunk('/jobs/deleteJobPost',async(id,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.delete(`/job/delete/${id}`,{headers:{Authorization:localStorage.getItem('token')}});
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

export const findNearestJobs = createAsyncThunk(
  '/jobs/findNearestJobs',
  async ({ lat, lng, serviceType }, { rejectWithValue }) => {
    console.log(serviceType,lat,lng)
    try {
      const response = await axiosInstance.get('/nearby/job/find', {
        params: {
          lat,
          lng,
          serviceCategory: serviceType, // assuming this is the category ID
        },
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);


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


// Thunk to check if a service provider is working on a job
export const checkIfWorking = createAsyncThunk('jobs/checkIfWorking',async (userId, {rejectWithValue}) => {
    console.log(userId)
    try {
      const response = await axiosInstance.get(`/job/active/${userId}`,{headers:{Authorization:localStorage.getItem('token')}});
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const considerServiceProvider = createAsyncThunk('/jobs/considerServiceProvider',async({id,serviceProviderId},{rejectWithValue})=>{
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


export const withdrawConsider = createAsyncThunk('/jobs/withdrawConsider',async({id,serviceProviderId},{rejectWithValue})=>{
    try{
        const response = await axiosInstance.delete(`/job/consideration/${id}`, {
        data: { serviceProvider: serviceProviderId },
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
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


export const sendMessage = createAsyncThunk('/jobs/sendMessage',async({id,formData},{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post(`/job/message/${id}`,formData,{headers:{
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


export const fetchJobList = createAsyncThunk('/jobs/fetchJobList',async(_,{rejectWithValue})=>{
    // console.log(formData)
    try{
        const response = await axiosInstance.get('/job/list',{headers:{
            Authorization:localStorage.getItem('token')}});
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
        isWorking:false
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


        //delete job post
        .addCase(deleteJobPost.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(deleteJobPost.fulfilled,(state,action)=>{
            state.data = state.data.filter((post)=>{
                return post._id !== action.payload._id;
            });
            
            state.loading = false;
            state.error = null;
        })

        .addCase(deleteJobPost.rejected,(state,action)=>{
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

        //check working status
        .addCase(checkIfWorking.pending, (state) => {
             state.loading = true;
        })
       .addCase(checkIfWorking.fulfilled, (state, action) => {
            state.loading = false;
            state.isWorking = action.payload.activeJobExists;
        })
       .addCase(checkIfWorking.rejected, (state, action) => {
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


        //withdraw consider
        .addCase(withdrawConsider.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        
        .addCase(withdrawConsider.fulfilled,(state,action)=>{
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
        
        .addCase(withdrawConsider.rejected,(state,action)=>{
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


        //send message
        .addCase(sendMessage.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        
        .addCase(sendMessage.fulfilled,(state,action)=>{
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
        
        .addCase(sendMessage.rejected,(state,action)=>{
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


        //list jobs
        .addCase(fetchJobList.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        
        .addCase(fetchJobList.fulfilled,(state,action)=>{
             state.data = action.payload;
             state.loading = false;
             state.error = null;
        })
        
        .addCase(fetchJobList.rejected,(state,action)=>{
             state.loading = false;
             state.error = action.payload;
        })


        
    }
});

export default jobPostSlice.reducer;