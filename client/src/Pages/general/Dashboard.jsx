import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  MessageCircle,
  Share2,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LikeButton from "../../Component/User/LikedButton";
import BottomMenu from "../../Component/User/BottomMenu";
import Comment from "../../Component/User/Commet";
import { useNavigate } from "react-router";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function FoodReelsDashboard() {
  const [activeTab, setActiveTab] = useState(2);
  const [reels, setReels] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const [comment, setComment] = useState([]);
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    FetchItem();
  }, []);

  const FetchItem = async () => {
    try {
      const response = await api.get("/foodItem/foodItems");
      const reelsData = response.data.FoodItems || [];
      const shuffledReels = [...reelsData].sort(() => Math.random() - 0.8);

      const reelsWithProfiles = await Promise.all(
        shuffledReels.map(async (reel) => {
          if (!reel.PartnerId) return reel;
          try {
            const res = await api.get(
              `/users/FetchFoodPartner?id=${reel.PartnerId}`
            );
            return {
              ...reel,
              posterName: res.data.FoodPartner.name,
              posterContact: res.data.FoodPartner.phone,
              posterProfileImage: res.data.FoodPartner.profileUrl,
              posterType: res.data.FoodPartner.type,
            };
          } catch {
            return reel;
          }
        })
      );
      setReels(reelsWithProfiles);
    } catch (err) {
      console.log("Error fetching items:", err.message);
    }
  };

  // Auto play/pause when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const video = videoRefs.current[index];
          if (video) {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, [reels]);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const handleShowPosterProfile = (id, type) => {
    navigate(`/users/posterProfile/${id}/${type}`);
  };

  const showCommentBox = async (reel) => {
    setSelectedReel(reel);
    setShowComments(true);
    try {
      const getComment = await api.get(
        `/users/getAllComments?foodItemId=${reel._id}`
      );
      setComment(getComment.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCartItem = (id) => {
    navigate(`/users/cart/id=${id}`);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setTimeout(async () => {
        const response = await api.post("/users/addComment", {
          foodItemId: selectedReel._id,
          content: newComment,
        });
        toast.success("Comment added successfully ✅");
        setLoading(false);
        setNewComment("");
        setComment((prev) => [...prev, response.data.comment]);
        setShowComments(false);
        setSelectedReel(null);
      }, 3000);
    } catch (err) {
      console.log("Error submitting comment:", err);
    }
  };

  // Fullscreen handler 
  const handleFullscreenToggle = () => {
    const el = document.getElementById("reel-container");
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <div className="flex justify-center items-center bg-black h-screen w-full overflow-hidden">
      {/* ✅ Main Reels Container */}
      <div
        id="reel-container"
        className="relative h-screen w-full md:w-[400px] overflow-y-scroll snap-y snap-mandatory bg-black text-white no-scrollbar rounded-2xl border border-gray-800 shadow-2xl"
      >
        {/* Fullscreen Button (always visible) */}
        <button
          onClick={handleFullscreenToggle}
          className="absolute top-4 right-4 z-50 bg-black/60 p-3 rounded-full hover:bg-black/80 transition"
        >
          {isFullscreen ? (
            <Minimize2 className="text-white" size={22} />
          ) : (
            <Maximize2 className="text-white" size={22} />
          )}
        </button>

        {reels.map((reel, index) => (
          <div
            key={reel._id}
            className="h-screen w-full flex items-center justify-center relative snap-start"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={reel.videoUrl}
              className="h-full w-full object-cover"
              loop
              data-index={index}
              onClick={() => togglePlay(index)}
            />

            {/* Poster Info */}
            <div
              className="absolute top-4 left-4 flex items-center gap-3"
              onClick={() =>
                handleShowPosterProfile(reel.PartnerId, reel.posterType)
              }
            >
              <img
                src={reel.posterProfileImage}
                alt={reel.posterName || "User"}
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
              />
              <div className="flex flex-col justify-around">
                <span className="text-white text-lg font-semibold">
                  {reel.posterName}
                </span>
                <span className="text-white text-sm font-semibold">
                  {reel.posterContact}
                </span>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="absolute right-4 bottom-40 flex flex-col gap-6 items-center">
              <LikeButton
                foodId={reel._id}
                reelId={reel._id}
                initialCount={reel.Likecount || 0}
                initiallyLiked={reel.userHasLiked || false}
              />
              <button
                onClick={() => showCommentBox(reel)}
                className="hover:scale-110 transition flex flex-col items-center"
              >
                <MessageCircle className="h-8 w-8 text-white" />
                <p className="text-sm">{reel.comments || "0"}</p>
              </button>
              <button className="hover:scale-110 transition flex flex-col items-center">
                <Share2 className="h-8 w-8 text-white" />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 w-[89%] px-4 py-6 text-white mb-13">
              <h2 className="text-2xl font-bold">
                {reel.title || "Delicious Dish"}
              </h2>
              <p className="text-sm text-gray-200 mt-2 line-clamp-2 ml-1">
                {reel.description ||
                  "Tasty and fresh meal prepared by our top food partners."}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleCartItem(reel._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-medium transition"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* --- Comment Modal --- */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex justify-center items-end z-50"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="w-full md:w-[420px] h-[70%] bg-white dark:bg-gray-900 rounded-t-3xl p-4 flex flex-col overflow-hidden"
              >
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Comments
                  </h2>
                  <button onClick={() => setShowComments(false)}>
                    <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto mt-3 space-y-3 pr-2">
                  {comment.map((c) => (
                    <Comment
                      key={c._id}
                      user={c.userId.name}
                      time={c.createdAt}
                      text={c.content}
                      avatar={c.userId.profileUrl}
                    />
                  ))}
                </div>

                <form>
                  <div className="border-t mb-3 border-gray-200 dark:border-gray-800 pt-3 flex items-center gap-3">
                    <img
                      src={user.profileUrl}
                      alt="user"
                      className="w-9 h-9 rounded-full"
                    />
                    <input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 text-sm"
                    />
                    <button
                      onClick={handleSubmitComment}
                      type="submit"
                      className="text-blue-500 text-sm font-semibold hover:text-blue-600"
                    >
                      {loading ? "Posting..." : "Post"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Menu */}
        <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
