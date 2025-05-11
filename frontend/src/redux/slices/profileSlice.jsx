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
})
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
    }
});

export default profileSlice.reducer;



