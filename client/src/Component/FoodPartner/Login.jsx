import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// ✅ Import custom hook
import { useAuthFoodPartner } from "../../context/FoodPartnerContext/AuthFoodPartner";

export default function Login({ onSignupClick }) {
  const { login } = useAuthFoodPartner();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login logic
    if (email && password) {
      login({ email });
      toast.success("Logged in successfully ✅");
    } else {
      toast.error("Please enter email and password ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Food Partner Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <ToastContainer />
      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={onSignupClick}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
