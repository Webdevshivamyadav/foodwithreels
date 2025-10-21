import React from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api/api';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post('/users/logout', {}, { withCredentials: true }); // ✅ include cookies
      console.log(response);
      toast.success(response.data.message || "Logged out successfully ✅");

      // Clear sessionStorage
      sessionStorage.clear();

      // Attempt to delete non-HttpOnly cookies (JS only)
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

      // Navigate to home
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Logout failed ❌");
    }
  };

  return (
    <div className="bg-white text-black h-20 w-30 absolute right-2 top-15 rounded-2xl shadow-md flex items-center justify-center transition-all duration-300">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
      >
        Logout
      </button>
      <ToastContainer />
    </div>
  );
};

export default Logout;
