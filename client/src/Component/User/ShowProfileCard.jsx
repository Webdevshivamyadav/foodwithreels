import React, { useEffect, useState } from 'react'
import { Settings, Grid, Bookmark, Heart, Axis3D } from 'lucide-react'
import Logout from './Logout'

import BottomMenu from './BottomMenu'
import { useParams } from 'react-router'
import {useDispatch} from 'react-redux'
import { followThunk, unfollowThunk } from '../../features/followandunfollowSlice'
import api from '../../api/api'
const ShowProfileCard = () => {
  const { id,type } = useParams()
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(2) // default Reels
  const [logout, setLogout] = useState(true)
  const [likePost, setLikePost] = useState([])
  const [followbtn,setfollowbtn] = useState(false);
  let incressfollower=0;
  const [user, setUser] = useState({
    name: '',
    email: '',
    follower: '',
    following: '',
    profile: ''
  })

  const toggleLogout = () => setLogout(!logout)

  useEffect(() => {
    
    fetchUserLikedPost(id)
  }, [id])


  const handlefollow = (id,type) =>{
  console.log(id,type)
  dispatch(followThunk({id,type}))
  setfollowbtn(true)
  incressfollower+=1;
  }

  const handleUnfollow = (id,type) =>{
    dispatch(unfollowThunk({id,type}))
    setfollowbtn(false)
  }

  const fetchUserLikedPost = async (id) => {
    if (!id) return console.log('user id not valid')
    console.log('id from fetch', id)
    try {
      
      const res = await api.get(`/users/showProfileCardUser?id=${id}`);
      console.log(res)
      setUser({
        
        name: res.data.user.name || '',
        email: res.data.user.email || '',
        follower: res.data.user.follower,
        following: res.data.user.following,
        profile:res.data.user.profile
      })
      const response = await api.get(`/users/likedpost?id=${id}`)
      const items = response.data.fetchliked.map((item) => item.food)
      setLikePost(items)

      const fetchIsAlredyFollowed = await api.get(`/users/fetchIsAlredyFollowed?profileId=${id}`);
      if(fetchIsAlredyFollowed.data.isfollowed){
        setfollowbtn(true);
      }
      console.log(fetchIsAlredyFollowed)
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-6">
      {/* Logout modal */}
      {!logout && <Logout />}

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md px-4">
        <h2 className="text-xl font-semibold truncate">{user.name || user.email}</h2>
        <Settings
          className="h-6 w-6 text-white cursor-pointer hover:text-gray-400 transition"
          onClick={toggleLogout}
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6 w-full max-w-md px-4">
        <img
          src={user.profile || '/default-profile.png'}
          alt="profile"
          className="w-28 h-28 rounded-full border-2 border-gray-600 object-cover shadow-md"
        />
        <h3 className="text-xl font-semibold mt-3">{user.name || user.email}</h3>
        <p className="text-sm text-gray-400">@dev.shivamyadav</p>

        <p className="text-sm mt-2 text-center text-gray-300">
          💻 Full-Stack Web Developer | Building Modern Web Apps 🚀
        </p>

        {/* Stats */}
        <div className="flex justify-around w-full mt-6 text-center bg-gray-800 rounded-lg py-3 shadow-inner">
          <div>
            <h4 className="font-semibold text-lg">54</h4>
            <p className="text-sm text-gray-400">Posts</p>
          </div>
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
         {!followbtn ? (
          <button
            onClick={()=>handlefollow(id,type)}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-500 transition-all shadow-md"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={()=>handleUnfollow(id,type)}
            className="flex-1 bg-red-600 text-white rounded-lg py-2 font-semibold hover:bg-red-500 transition-all shadow-md"
          >
            Unfollow
          </button>
        )}
          
          <button className="flex-1 bg-gray-700 rounded-lg py-2 font-semibold hover:bg-gray-600 transition shadow-md">
            Share Profile
          </button>
        </div>
      </div>

      

      {/* Posts Section Tabs */}
      <div className="border-t border-gray-700 mt-8 w-full max-w-md">
        <div className="flex justify-around py-3">
          <Heart className="h-6 w-6 text-white cursor-pointer hover:text-red-500 transition" />
        </div>
      </div>

      {/* Liked Posts Grid */}
      <div className="grid grid-cols-3 gap-[2px] w-full max-w-md mt-2">
        {likePost.length > 0 ? (
          likePost.map((post, index) => (
            <video
              key={index}
              src={post.videoUrl}
              alt="post"
              className="w-full h-50 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
              controls
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-400 py-10">No liked posts yet.</p>
        )}
      </div>
      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default ShowProfileCard
