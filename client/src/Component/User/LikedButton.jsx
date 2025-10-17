import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";

const LikeButton = ({ foodId, initialCount = 0 }) => {
   
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  // ✅ Check if user has already liked when component loads
 useEffect(() => {
  const checkLikedStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/foodItem/likeStatus?id=${foodId}`,
        { withCredentials: true }
      );
      setLiked(res.data.hasLiked);
    } catch (err) {
      console.error(err);
    }
  };

  checkLikedStatus();
}, [foodId]);
 

  // ✅ Handle like/unlike click
  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/foodItem/like?id=${foodId}`,
        {},
        { withCredentials: true }
      );

      const hasLiked = response.data.hasLiked;
      setLiked(hasLiked);
      setCount((prev) => (hasLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleLike} className="hover:scale-110 transition">
        <Heart
          className={`h-8 w-8 transition-all ${
            liked ? "text-red-500 fill-red-500" : "text-white"
          }`}
        />
      </button>
      <p className="text-sm text-white">{count}</p>
    </div>
  );
};

export default LikeButton;
