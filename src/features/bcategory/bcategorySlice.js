import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      });
  },
});

export default bcategorySlice.reducer;
