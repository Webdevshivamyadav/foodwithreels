import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { AuthFoodPartner } from "../../context/FoodPartnerContext/authFoodPartner";

export default function Login({ onSignupClick }) {
  const navigate = useNavigate();
  const { login} = useContext(AuthFoodPartner); 
  
  const [user, setUser] = useState({ email: "", password: "" });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.warn("Please fill all fields!");
      return;
    }

    const res = await login(user); 
    if (res.success) {
      toast.success("Login successful!");
      navigate("/FoodPartnerDashboard");
    } else {
      toast.error( "Login failed!");
    }
  };

  return (
    <div className="bg-white border border-gray-300 w-full max-w-sm p-8 flex flex-col items-center rounded-lg shadow-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-red-500">🍴 Food Reels</h1>

      <form onSubmit={handleSubmit} className="w-full">
        <input
          name="email"
          onChange={handleForm}
          value={user.email}
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
        />
        <input
          name="password"
          onChange={handleForm}
          value={user.password}
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
        />
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
        >
          Log In
        </button>
      </form>

      <div className="flex items-center my-4 w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="bg-white border border-gray-300 w-full p-4 mt-4 text-center rounded-lg shadow-sm">
        <p className="text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onSignupClick}
            className="text-red-500 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>

    </div>
  );
}
