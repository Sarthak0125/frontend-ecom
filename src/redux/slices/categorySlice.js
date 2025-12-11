import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosClient";

export const fetchCategories = createAsyncThunk(
    "category/fetchAll",
    async(_,thunkAPI) => {
        try {
            const {data} = await api.get("/category");
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const createCategory = createAsyncThunk(
    "category/create",
    async (name,thunkAPI) => {
        try {
            const {data} = await api.post("/category", {name});
            return data;
        }catch (error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const updateCategory = createAsyncThunk(
    "category/update",
    async ({id,name}, thunkAPI) => {
        try{
            const  {data} = await api.put(`/category/${id}`, {name});
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "category/delete",
    async(id, thunkAPI) => {
        try{
            await api.delete(`/category/${id}`)
            return id;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

const categorySlice = createSlice({
    name: "category",
    initialState:{
        categories: [],
        isLoading: false,
        error: null,
    },
    reducers:{},

    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending,(state) => {
            state.isLoading = true;
        }).addCase(fetchCategories.fulfilled,(state,action) => {
            state.isLoading = false;
            state.categories = action.payload;
        }).addCase(fetchCategories.rejected, (state) => {
            state.loading = false;
            state.error = action.payload; 
        }).addCase(createCategory.fulfilled,(state,action) => {
            // state.isLoading = false,
            state.categories.push(action.payload)
        }).addCase(updateCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex(
              (c) => c._id === action.payload._id
            );
            state.categories[index] = action.payload;
          }).addCase(deleteCategory.fulfilled, (state, action) => {
             state.categories.filter((c) => c._id !== action.payload) 
          })
    }
})
export default categorySlice.reducer