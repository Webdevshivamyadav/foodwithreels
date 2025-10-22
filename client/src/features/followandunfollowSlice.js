import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from '../api/api'

// 🟩 Follow Thunk
export const followThunk = createAsyncThunk(
  'follow/followUser',
  async ({id,type}, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/users/follow?id=${id}&type=${type}`,
        {},
        
      )
      
      return response.data
    } catch (err) {
     
      return rejectWithValue(err.response?.data || { message: 'Something went wrong' })
    }
  }
)

// 🔴 Unfollow Thunk
export const unfollowThunk = createAsyncThunk(
  'follow/unfollowUser',
  async ({id,type}, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/users/unfollow?id=${id}&type=${type}`,
        {},
        { withCredentials: true }
      )
      return response.data
    } catch (err) {
      
      return rejectWithValue(err.response?.data || { message: 'Something went wrong' })
    }
  }
)

const initialState = {
  follower: [],
  loading: false,
  error: '',
}

const followSlice = createSlice({
  name: 'followSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FOLLOW
    builder.addCase(followThunk.pending, (state) => {
      state.loading = true
    
    })
    builder.addCase(followThunk.fulfilled, (state, action) => {
      state.loading = false
      state.follower = action.payload
     
      state.error = null
    })
    builder.addCase(followThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    // UNFOLLOW
    builder.addCase(unfollowThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(unfollowThunk.fulfilled, (state, action) => {
      state.loading = false
      state.follower = action.payload
      state.error = null
    })
    builder.addCase(unfollowThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.message
      
    })
  },
})

export default followSlice.reducer
