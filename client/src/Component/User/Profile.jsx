import React, { useEffect, useState, useRef } from "react";
import { Settings, Bookmark, Heart } from "lucide-react";
import Logout from "./Logout";
import BottomMenu from "./BottomMenu";
import BackButton from "./Backbutton";
import api from "../../api/api";
import { useNavigate } from "react-router";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(2); // default Reels
  const [logout, setLogout] = useState(true);
  const [likePost, setLikePost] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    follower: "",
    following: "",
    profile: "",
  });

  const toggleLogout = () => setLogout(!logout);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser({
        userId: storedUser.id,
        name: storedUser.name || "",
        email: storedUser.email || "",
        follower: storedUser.follower,
        following: storedUser.following,
        profile: storedUser.profileUrl,
      });
    }
    fetchUserLikedPost();
  }, []);

  const fetchUserLikedPost = async () => {
    const { id } = JSON.parse(sessionStorage.getItem("user"));
    if (!id) return console.log("user id not valid");
    try {
      const response = await api.get(`/users/likedpost?id=${id}`);
      const items = response.data.fetchliked.map((item) => item.food);
      setLikePost(items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-6">
      {/* Logout modal */}
      {!logout && <Logout />}

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md px-4">
        <BackButton />
        <h2 className="text-xl font-semibold truncate">
          {user.name || user.email}
        </h2>
        <Settings
          className="h-6 w-6 text-white cursor-pointer hover:text-gray-400 transition"
          onClick={toggleLogout}
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6 w-full max-w-md px-4">
        <img
          src={user.profile || "/default-profile.png"}
          alt="profile"
          className="w-28 h-28 rounded-full border-2 border-gray-600 object-cover shadow-md"
        />
        <h3 className="text-xl font-semibold mt-3">
          {user.name || user.email}
        </h3>

        {/* Stats */}
        <div className="flex justify-around w-full mt-6 text-center bg-gray-800 rounded-lg py-3 shadow-inner">
          <div>
            <h4 className="font-semibold text-lg">{user.follower}</h4>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">{user.following}</h4>
            <p className="text-sm text-gray-400">Following</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5 w-full max-w-sm">
          <button
            onClick={() => navigate("/user/update")}
            className="flex-1 bg-blue-600 rounded-lg py-2 font-semibold hover:bg-blue-500 transition shadow-md"
          >
            Edit Profile
          </button>
          <button className="flex-1 bg-gray-700 rounded-lg py-2 font-semibold hover:bg-gray-600 transition shadow-md">
            Share Profile
          </button>
        </div>
      </div>

      {/* Posts Section Tabs */}
      <div className="border-t border-gray-700 mt-8 w-full max-w-md">
        <div className="flex justify-around py-3">
          <Heart className="h-6 w-6 text-white cursor-pointer hover:text-red-500 transition" />
          <Bookmark className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition" />
        </div>
      </div>

      {/* Liked Posts Grid */}
      <div className="grid grid-cols-3 gap-[2px] w-full max-w-md mt-2">
        {likePost.length > 0 ? (
          likePost.map((post, index) => (
            <VideoItem key={index} post={post} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-400 py-10">
            No liked posts yet.
          </p>
        )}
      </div>

      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Profile;

/* -------------------------------
   VideoItem Component (Play/Pause)
-------------------------------- */
const VideoItem = ({ post }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      onClick={handleVideoClick}
    >
      <video
        ref={videoRef}
        src={post.videoUrl}
        className="w-full h-50 object-cover hover:scale-105 transition-transform duration-200"
        controls={false}
        playsInline
        preload="metadata"
      />

      {/* Overlay Play Icon */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </div>
  );
};
