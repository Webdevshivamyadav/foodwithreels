import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

// Floating Food Shapes Component
function FoodItem({ type, initialPosition, color, scale }) {
  return (
    <motion.mesh
      initial={{ x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] }}
      animate={{ x: 0, y: [0, 0.5, 0], z: [0, -0.5, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" }}
    >
      {type === "burger" && <boxGeometry args={[scale, scale * 0.5, scale]} />}
      {type === "pizza" && <coneGeometry args={[scale * 0.5, scale, 32]} />}
      {type === "drink" && <cylinderGeometry args={[scale * 0.3, scale * 0.3, scale, 32]} />}
      <meshStandardMaterial color={color} />
    </motion.mesh>
  );
}

export default function WelcomePage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-orange-500 via-yellow-400 to-red-500 flex flex-col items-center justify-center overflow-hidden">

      {/* 3D Canvas */}
      <div className="w-full h-96 sm:h-[500px]">
        <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Floating Food Items */}
          <FoodItem type="burger" initialPosition={[-5, 1, 0]} color="#f97316" scale={1} />
          <FoodItem type="pizza" initialPosition={[5, 0.5, -2]} color="#facc15" scale={1} />
          <FoodItem type="drink" initialPosition={[-6, -0.5, 1]} color="#14b8a6" scale={0.8} />
          <FoodItem type="burger" initialPosition={[6, 1.5, -1]} color="#f43f5e" scale={1} />
          <FoodItem type="pizza" initialPosition={[-7, -1, 0]} color="#22c55e" scale={1} />

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 transform -translate-y-1/2 text-center px-4 w-full"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-white drop-shadow-2xl"
        >
          🍔 FoodWithReels
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl mt-6 text-white drop-shadow-lg font-semibold"
        >
          Share, Explore & Enjoy Food Moments in Short Reels!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 30px rgba(255,255,255,0.8)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mt-10 bg-white text-orange-500 font-bold px-8 py-4 rounded-full shadow-xl text-xl sm:text-2xl"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}
