import React from "react";
import logo from "../../assest/Users/326.gif"; 

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
      
        <img
          
          src={logo}
          alt="Logo"
          className="w-14 h-14 rounded-full object-contain animate-pulse"
        />

        
        <p className="mt-4 text-blue-600 text-sm font-semibold tracking-wide animate-bounce">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
