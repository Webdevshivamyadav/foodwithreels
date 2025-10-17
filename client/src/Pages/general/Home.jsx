import React, { useState } from "react";
import PhoneMockup from "../../Component/User/PhoneMockup";
import LoginBox from "../../Component/User/LoginBox";
// import SignupBox from "../../Component/User/SignUpBox";
import SignupBox from "../../Component/User/SignupBox";

export default function HomePage() {
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
          <LoginBox onSignupClick={() => setIsSignup(true)} />
        ) : (
          <SignupBox onLoginClick={() => setIsSignup(false)} />
        )}
      </div>
    </div>
    </>
  );
}
