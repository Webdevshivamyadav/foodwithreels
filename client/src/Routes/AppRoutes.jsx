import React from 'react'
import {Routes, Route,Router} from 'react-router'

import Home from '../Pages/general/Home'
import Dashboard from '../Pages/general/Dashboard'
import BecomeFoodPartner from '../Pages/general/BecomeFoodPartner'
import FoodReelsDashboard from '../Pages/general/FoodPartnerDashboard'
import Profile from '../Component/User/Profile'
import SearchProfile from '../Component/User/SearchProfile'
import ProtectedRoute from './ProtectedRoute'
import ShowProfileCard from '../Component/User/ShowProfileCard'
import PosterProfile from '../Component/User/PosterProfile'
import WelcomePage from '../Pages/general/Welcome'
import CartPage from '../Pages/general/Cart'

const AppRoutes = () => {
  return (
     
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/*' element={<Home/>}/>
            <Route path='/welcome' element={<WelcomePage />}/>
            <Route path='/user/dashboard' element={
              <ProtectedRoute>
               <Dashboard/>
              </ProtectedRoute>
              }
              />
            <Route path="/user/profile"   element={<Profile />} />
            <Route path='/user/searchProfile' element={<SearchProfile />} />
            <Route path="/user/showProfileCard/:id/:type" element={<ShowProfileCard />} />
            <Route path="/users/posterProfile/:id/:type" element={<PosterProfile /> }/>
            <Route  path ='/users/cart' element={<CartPage />}/>
            {/* For food Partner */}

            <Route path='/BecomeFoodPartner' element={<BecomeFoodPartner/>} />
            <Route path='/FoodPartnerDashboard' element={<FoodReelsDashboard/>}/>
        </Routes>
        
     )
}

export default AppRoutes