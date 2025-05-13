import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const fetchAccount = createAsyncThunk('/profile/fetchAccount',async()=>{
    try {
        const response = await axiosInstance.get('/auth/account',{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data ||{ message : "error while fetching account"})
    }
});

export const updateProfileImage = createAsyncThunk('/profile/updateProfileImage',async(imageUrl,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.put('/auth/update-profile-image',imageUrl,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data ||{ message : "error while updating profile image"})
    }
});

export const updateProfile = createAsyncThunk('/profile/updateProfile',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.put('/auth/update-profile',formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data ||{ message : "error while updating profile"})
    }
});


export const uploadWorkImages = createAsyncThunk('/profile/uploadWorkImages',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/auth/upload-images',formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data ||{ message : "error while updating profile"})
    }
});

const profileSlice = createSlice({
    name:'profile',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch user account
        .addCase(fetchAccount.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchAccount.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(fetchAccount.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

         //update profile image
        .addCase(updateProfileImage.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(updateProfileImage.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(updateProfileImage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //update profile data
        .addCase(updateProfile.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //upload work releted images
        .addCase(uploadWorkImages.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(uploadWorkImages.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(uploadWorkImages.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default profileSlice.reducer;



