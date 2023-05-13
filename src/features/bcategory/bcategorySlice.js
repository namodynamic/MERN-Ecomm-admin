import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

export const getBcategories = createAsyncThunk(
  "blogcategory/get-bcategories",
  async (user, thunkAPI) => {
    try {
      return await bcategoryService.getBcategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBcategory = createAsyncThunk(
  "blogcategory/create-category",
  async (bcategoryData, thunkAPI) => {
    try {
      return await bcategoryService.createBcategory(bcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  bcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  messgae: "",
};
export const bcategorySlice = createSlice({
  name: "bcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBcategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bcategories = action.payload;
      })
      .addCase(getBcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBcategory = action.payload;
      })
      .addCase(createBcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bcategorySlice.reducer;
