import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstancs";

export const createServiceCategory = createAsyncThunk('/services/createServiceCategory',async(formData,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post('/category/create',formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
});

export const listCategories = createAsyncThunk('/services/listCategories',async(_,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.get('/category/list',{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});

export const deleteCategory = createAsyncThunk('/services/deleteCategory',async(id,{rejectWithValue})=>{
    try{
        const response = await axiosInstance.delete(`/category/delete/${id}`,{headers:{
            Authorization:localStorage.getItem('token')
        }});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);

    }
});


export const updateCategory = createAsyncThunk('/services/updateCategory',async({id,formData},{rejectWithValue})=>{
    try{
        const response = await axiosInstance.put(`/category/update/${id}`,formData,{headers:{Authorization:localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
const serviceCategorySlice = createSlice({
    name:"services",
    initialState:{
        data:[],
        loading:false,
        error:null, 
    },
    extraReducers:(builder)=>{
        builder
        //create category
        .addCase(createServiceCategory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(createServiceCategory.fulfilled,(state,action)=>{
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
        })

        .addCase(createServiceCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //list categories 
        .addCase(listCategories.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(listCategories.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(listCategories.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
        //delete category
        .addCase(deleteCategory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(deleteCategory.fulfilled,(state,action)=>{
            // const index = state.data.findIndex((cat)=>{
            //     return cat._id == action.payload._id;
            // });
            state.data = state.data.filter((category)=>{
                return category._id != action.payload._id;
            });
            state.loading = false;
            state.error = null;
        })

        .addCase(deleteCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        //update category
        .addCase(updateCategory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(updateCategory.fulfilled,(state,action)=>{
            const index = state.data.findIndex((cat)=>{
                return cat._id == action.payload._id;
            });
            state.data[index] = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(updateCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default serviceCategorySlice.reducer;