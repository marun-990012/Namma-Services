import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const imageUpload = createAsyncThunk('/image/imageUpload',async(fileData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/image/upload',fileData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data ||{ message : "error while image upload"});
    }
})
const imageUploadSlice = createSlice({
    name:'image',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder

        .addCase(imageUpload.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(imageUpload.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(imageUpload.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default imageUploadSlice.reducer;