import React, { useState } from "react";
import PhoneMockup from "../../Component/FoodPartner/PhoneMockup";
import Login from "../../Component/FoodPartner/Login";
import Signup from "../../Component/FoodPartner/Signup";

export default function BecomeFoodPartner() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50">
    
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <PhoneMockup />
      </div>
      
      {/* Right Side */}
      <div className="w-full md:w-1/3 flex flex-col items-center p-6">
        {!isSignup ? (
          <Login onSignupClick={() => setIsSignup(true)} />
        ) : (
          <Signup onLoginClick={() => setIsSignup(false)} />
        )} 
      </div>
    </div>
    </>
  );
}
