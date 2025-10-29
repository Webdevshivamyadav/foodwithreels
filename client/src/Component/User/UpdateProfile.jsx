import React from "react";
import { useState } from "react";
import BottomMenu from "./BottomMenu";
import BackButton from "./Backbutton";
import api from "../../api/api";
import { toast } from "react-toastify";
const UpdateProfile = () => {
      const [activeTab,setActiveTab]= useState('')
      const user = JSON.parse(sessionStorage.getItem('user'));
      const [newUser, setNewUser] = useState({
        id:user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      })
      
      const  updateUser =async (newUser) =>{
        try{
         const res = await api.put("/users/updateUser",newUser);
  
         toast.success(res.data.message)
        }catch(err){
          toast.error(err.res.data.message);
          
        }
      }

      const handleSubmit = (e) =>{
         e.preventDefault();
         console.log(newUser)
         updateUser(newUser)
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1D37] via-[#0C2E60] to-[#081A33] p-6">
       
      <div className="w-full max-w-lg bg-white/10 h-[100%] backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
      <div className="text-white">
      <BackButton /></div>
        <h1 className="text-3xl font-semibold text-center mb-8 tracking-wide">
          Update Profile
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1 font-medium opacity-80">Full Name</label>
            <input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium opacity-80">Email Address</label>
            <input
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium opacity-80">Phone Number</label>
            <input
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
           
          </div>

          <button
            onClick={handleSubmit}
            type="button"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </div>
  );
};

export default UpdateProfile;
