import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import { ToastContainer, toast } from 'react-toastify';
import api from "../api/api";



export const auththunk = createAsyncThunk(
  "fetch/user",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/users/login",
        user
        
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const sotreduser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
const initialState = {
  data: sotreduser,
  loading: false,
  error: "",
  status:"",
  isauth:!!sotreduser,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(auththunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(auththunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.status = 'ok';
        state.isauth = true;
      })
      .addCase(auththunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
