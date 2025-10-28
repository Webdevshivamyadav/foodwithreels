import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router";
import BottomMenu from "../../Component/User/BottomMenu";
import BackButton from "../../Component/User/Backbutton";

export default function Welcome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white relative overflow-hidden">
     
      {/* 🎥 Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')] bg-cover bg-center blur-sm"
      />

      {/* 🌟 Logo + Name */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center z-10"
      >
        <div className="text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 text-transparent bg-clip-text">
          Foodi Reels
        </div>
        <p className="mt-2 text-gray-300 text-sm font-medium tracking-wide">
          Taste. Watch. Enjoy.
        </p>
      </motion.div>

      {/* 🍔 Animated Food Image */}
      <motion.img
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
        alt="Food Icon"
        className="w-28 h-28 mt-10 drop-shadow-[0_0_25px_rgba(255,165,0,0.6)] z-10"
      />

      {/* 🚀 Start Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => navigate("/users/reels")}
        className="mt-14 flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg z-10"
      >
        <Play className="w-5 h-5" />
        Start Watching
      </motion.button>

      {/* 👇 Bottom Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 text-gray-400 text-xs"
      >
        Powered by <span className="text-orange-400 font-semibold">@dev.shivamyadav</span>
      </motion.p>
       {/* <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} /> */}
       
    </div>
  );
}
