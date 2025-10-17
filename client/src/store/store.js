import {configureStore} from '@reduxjs/toolkit'
import authSlice  from '../features/authSlice'
import followSlice from '../features/followandunfollowSlice'
export const store = configureStore({
  reducer:{
     auth:authSlice,
     followandUnfollow:followSlice,
  }
})
 
export default store
