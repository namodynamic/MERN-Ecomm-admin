import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async (user, thunkAPI) => {
    try {
      return await pcategoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  pcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  messgae: "",
};
export const pcategorySlice = createSlice({
  name: "pcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pcategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default pcategorySlice.reducer;
