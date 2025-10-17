import React from "react";
import Banner1 from "../../assest/FoodPartner/Banner1.jpg"
import Banner2 from "../../assest/FoodPartner/Banner2.jpg"
import Banner3 from "../../assest/FoodPartner/Banner4.jpg"
export default function PhoneMockup() {
  return (
    <div className="w-[320px] h-[640px] bg-black rounded-3xl shadow-2xl border-8 border-gray-900 overflow-hidden relative">
      <div className="absolute inset-0 flex flex-col">
        <img
          src={Banner1}
          alt="food reel"
          className="w-full h-1/3 object-cover"
        />
        <img
          src={Banner2}
          alt="food reel"
          className="w-full h-1/3 object-cover"
        />
        <img
          src={Banner3}
          alt="food reel"
          className="w-full h-1/3 object-cover"
        />
      </div>
    </div>
  );
}
