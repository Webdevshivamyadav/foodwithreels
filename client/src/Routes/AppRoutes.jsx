import React, { lazy } from "react";
import { Routes, Route } from "react-router";
const Home = lazy(() => import("../Pages/general/Home"));
const Dashboard = lazy(() => import("../Pages/general/Dashboard"));
const BecomeFoodPartner = lazy(() => import("../Pages/general/BecomeFoodPartner"));
const FoodReelsDashboard = lazy(() => import("../Pages/general/FoodPartnerDashboard"));
const Profile = lazy(() => import("../Component/User/Profile"));
const SearchProfile = lazy(() => import("../Component/User/SearchProfile"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const ShowProfileCard = lazy(() => import("../Component/User/ShowProfileCard"));
const PosterProfile = lazy(() => import("../Component/User/PosterProfile"));
const WelcomePage = lazy(() => import("../Pages/general/Welcome"));
const CartPage = lazy(() => import("../Pages/general/Cart"));
const Address = lazy(() => import("../Component/User/Address"));
const Myorder = lazy(() => import("../Pages/general/Myorder"));
const Comment = lazy(() => import("../Component/User/Commet"));
const Welcome = lazy(() => import("../Pages/general/Welcome"));
const UpdateProfile = lazy(() => import("../Component/User/UpdateProfile"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/*" element={<Home />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/searchProfile"
        element={
          <ProtectedRoute>
            <SearchProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/showProfileCard/:id/:type"
        element={
          <ProtectedRoute>
            <ShowProfileCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/posterProfile/:id/:type"
        element={
          <ProtectedRoute>
            <PosterProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/cart/:id"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/adress"
        element={
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/myorder"
        element={
          <ProtectedRoute>
            <Myorder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/comment/"
        element={
          <ProtectedRoute>
            <Comment />
          </ProtectedRoute>
        }
      />
      <Route path="/user/update" element={<UpdateProfile />} />
      <Route path="/BecomeFoodPartner" element={<BecomeFoodPartner />} />
      <Route path="/FoodPartnerDashboard" element={<FoodReelsDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
