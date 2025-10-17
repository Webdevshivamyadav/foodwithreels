import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, MessageCircle, Share2 } from 'lucide-react'
import axios from 'axios'
import LikeButton from '../../Component/User/LikedButton'
import BottomMenu from '../../Component/User/BottomMenu' // import bottom menu
import { useNavigate } from 'react-router'


export default function FoodReelsDashboard() {
  // const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(2) // default Reels
  const videoRefs = useRef([])
  const [reels, setReels] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    FetchItem()
  }, [])
  

  const FetchItem = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/foodItem/foodItems', {
        withCredentials: true
      })

      const reelsData = response.data.FoodItems || []
      const shuffledReels = [...reelsData].sort(() => Math.random() - 0.8)
      // setReels(shuffledReels);
      // fetch poster profile
      const reelsWithProfiles = await Promise.all(
        shuffledReels.map(async (reel) => {
          if (!reel.PartnerId) return reel
          try {
            const res = await axios.get(
              `http://localhost:3000/api/users/FetchFoodPartner?id=${reel.PartnerId}`,
              { withCredentials: true }
            )
            
            return {
              ...reel,
              posterName: res.data.FoodPartner.name,
              posterContact: res.data.FoodPartner.phone,
              posterProfileImage:res.data.FoodPartner.profileUrl,
              posterType:res.data.FoodPartner.type,
            }
          } catch {
            return reel
          }
        })
      )
      
      setReels(reelsWithProfiles)
      console.log(reelsWithProfiles)
      
    } catch (err) {
      console.log('Error fetching items:', err.message)
    }
  }

  // Intersection observer to play/pause videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index)
          const video = videoRefs.current[index]
          if (video) {
            if (entry.isIntersecting) {
              // setActiveIndex(index);
              video.play().catch(() => {})
            } else {
              video.pause()
            }
          }
        })
      },
      { threshold: 0.6 }
    )

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => observer.disconnect()
  }, [reels])

  const togglePlay = (index) => {
    const video = videoRefs.current[index]
    if (!video) return
    if (video.paused) {
      video.play()
      // setActiveIndex(index);
    } else {
      video.pause()
    }
  }
 
const handleShowPosterProfile = (id,type) =>{
  navigate(`/users/posterProfile/${id}/${type}`)
}
  return (
    <div className="h-screen w-full  md:w-[300px] overflow-y-scroll snap-y snap-mandatory bg-black text-white no-scrollbar relative">
      
     {reels.map((reel, index) => (
  <div
    key={reel._id}
    className="h-screen w-full flex items-center justify-center relative snap-start"
  >
    {/* Video */}
    <video
      ref={(el) => (videoRefs.current[index] = el)}
      src={reel.videoUrl}
      className="h-full w-full object-cover"
      loop
      data-index={index}
      onClick={() => togglePlay(index)}
    />

    {/* Top Profile */}
    <div className="absolute top-4 left-4 flex items-center gap-3">
      <img
        src={reel.posterProfileImage}
        alt={reel.posterName || 'User'}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex flex-col justify-around mb-4">
        <span className="text-white text-xl font-semibold">
          {reel.posterName}
        </span>
        <span className="text-white text-sm font-semibold">
          {reel.posterContact}
        </span>
      </div>
    </div>

    {/* Sidebar Icons */}
    <div className="absolute right-4 bottom-40 flex flex-col gap-6 items-center">
      <LikeButton
        foodId={reel._id}
        reelId={reel._id}
        initialCount={reel.Likecount || 0}
        initiallyLiked={reel.userHasLiked || false}
      />
      <button className="hover:scale-110 transition flex flex-col items-center">
        <MessageCircle className="h-8 w-8 text-white" />
        <p className="text-sm">{reel.comments || '0'}</p>
      </button>
      <button 
      className="hover:scale-110 transition flex flex-col items-center">
        <Share2 className="h-8 w-8 text-white" />
      </button>
    </div>

    {/* --- Bottom Detail Section --- */}
    <div className="absolute bottom-0 left-0 w-[50%]  px-4 py-6 text-white mb-13 ">
      <h2 className="text-2xl font-bold">
        {reel.title || 'Delicious Dish'}
      </h2>

      <p className="text-sm text-gray-200 mt-2 line-clamp-2 ml-1">
        {reel.description ||
          'Tasty and fresh meal prepared by our top food partners.'}
      </p>

      
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handleShowPosterProfile(reel.PartnerId,reel.posterType)}
          className="bg-green-500 mr-8 hover:bg-green-600 text-white px-7 py-3 rounded-xl font-medium transition"
        >
          Visit Store
        </button>
      </div>
    </div>
  </div>
))}


      {/* Bottom Menu */}
      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
