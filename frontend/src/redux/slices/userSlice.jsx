import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchServiceProviders = createAsyncThunk('/users/fetchServiceProviders',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/auth/service-providers',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data);

    }
});

export const fetchWorkProvider = createAsyncThunk('/users/fetchWorkProvider',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/auth/work-providers',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data);

    }
});


export const requestedUsers = createAsyncThunk('/users/requestedUsers',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/auth/request/list',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data);

    }
});



export const rejectedUsers = createAsyncThunk('/users/rejectedUsers',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/auth/rejected/list',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data)
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data);

    }
});


export const approveAndReject = createAsyncThunk('/users/approveAndReject',async({status,id},{rejectWithValue})=>{
    console.log(status)
    try{
        const response = await axiosInstance.put(`/auth/request/approve/reject/${id}`,{status},{headers:{
            Authorization:localStorage.getItem('token')
        }});
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data);

    }
});


const userSlice = createSlice({
    name:"users",
    initialState:{
        data:[],
        workProviders:[],
        users:[],
        loading:false,
        error:null, 
    },
    extraReducers:(builder)=>{
        builder
        
        //list service Providers 
        .addCase(fetchServiceProviders.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchServiceProviders.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(fetchServiceProviders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


         //list work Providers 
        .addCase(fetchWorkProvider.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchWorkProvider.fulfilled,(state,action)=>{
            state.workProviders = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(fetchWorkProvider.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


         //list requested users
        .addCase(requestedUsers.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(requestedUsers.fulfilled,(state,action)=>{
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(requestedUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


         //list requested users
        .addCase(rejectedUsers.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(rejectedUsers.fulfilled,(state,action)=>{
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(rejectedUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

         //approve and reject user
        .addCase(approveAndReject.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(approveAndReject.fulfilled, (state, action) => {
        // Remove user from the requested list after approval or rejection
            state.users = state.users.filter(user => user._id !== action.payload._id);
            state.loading = false;
            state.error = null;
        })

        .addCase(approveAndReject.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
          
    }
});

export default userSlice.reducer;