import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name:'users',
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        
    }
});



