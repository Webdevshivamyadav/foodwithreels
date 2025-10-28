import React from "react";
import { Home, Search, Video, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router";

export default function BottomMenu({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  // Handle navigation and tab activation
  const handleNavigation = (tabName, index, path) => {
    setActiveTab(index);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-gray-700 flex justify-around items-center py-2 z-50 md:w-[500px] md:mx-auto md:left-0 md:right-0 md:rounded-lg md:border md:border-gray-700 md:mb-2">
      {/* Home */}
      <button
        onClick={() => handleNavigation("welcome", 0, "/welcome")}
        className={`flex flex-col items-center justify-center transition ${
          activeTab === 0 ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </button>

      {/* Search */}
      <button
        onClick={() => handleNavigation("serachProfile", 1, "/user/searchProfile")}
        className={`flex flex-col items-center justify-center transition ${
          activeTab === 1 ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        <Search className="h-6 w-6" />
        <span className="text-xs">Search</span>
      </button>

      {/* Reels */}
      <button
        onClick={() => handleNavigation("Reels", 2, "/user/dashboard")}
        className={`flex flex-col items-center justify-center transition ${
          activeTab === 2 ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        <Video className="h-6 w-6" />
        <span className="text-xs">Reels</span>
      </button>

      {/* Shop */}
      <button
        onClick={() => handleNavigation("/users/myorder", 3, "/users/myorder")}
        className={`flex flex-col items-center justify-center transition ${
          activeTab === 3 ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        <ShoppingBag className="h-6 w-6" />
        <span className="text-xs">Shop</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => handleNavigation("/user/profile", 4, "/user/profile")}
        className={`flex flex-col items-center justify-center transition ${
          activeTab === 4 ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        <User className="h-6 w-6" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
}
