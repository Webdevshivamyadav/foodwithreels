import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'

import { AuthFoodPartner } from '../../context/FoodPartnerContext/AuthFoodPartner'

export default function Signup({ onLoginClick }) {
  const navigate = useNavigate()
  const { registerFoodPartner } = useContext(AuthFoodPartner)

  const [user, setUser] = useState({
    name: '',
    shopName: '',
    email: '',
    password: '',
    phone: '',
    profileUrl: ''
  })
  const [profileImage, setProfileImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  const handleForm = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setProfileImage(null)
      setPreviewUrl('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user.name || !user.shopName || !user.email || !user.password || !user.phone) {
      toast.warn('Please fill all fields!')
      return
    }
    try {
      // Prepare form data for image upload
      const formData = new FormData()
      formData.append('name', user.name)
      formData.append('shopName', user.shopName)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('phone', user.phone)
      if (profileImage) {
        formData.append('profileImage', profileImage)
      }
      // registerFoodPartner should accept FormData for image upload
      const res = await registerFoodPartner(formData)
      if (res.success) {
        toast.success('Account created successfully!')
        navigate('/FoodPartnerDashboard')
      } else {
        toast.error(res.message || 'Something went wrong!')
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong!')
    }
  }

  return (
    <div className="bg-white border border-gray-300 w-full p-8 flex flex-col items-center rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-red-500">🍴 Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full flex flex-col items-center"
      >
        {/* Profile Picture Section - Modern & Professional */}
        <div className="flex flex-col items-center w-full mb-6">
          <div className="relative mb-2">
            <div className="w-28 h-28 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden shadow-md">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1 1 8.25 9a3.75 3.75 0 0 1 7.5 0ZM4.5 19.25v-.5A4.75 4.75 0 0 1 9.25 14h5.5a4.75 4.75 0 0 1 4.75 4.75v.5"
                  />
                </svg>
              )}
            </div>
            <label
              htmlFor="profileImageUpload"
              className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 cursor-pointer shadow-lg transition duration-150 border-2 border-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 1 1-4-4 2.828 2.828 0 0 1 4 4ZM19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7"
                />
              </svg>
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <span className="text-xs text-gray-500">
            {previewUrl ? 'Profile Preview' : 'Upload Profile Picture'}
          </span>
        </div>
        {/* ...existing code for other fields... */}
        <input
          onChange={handleForm}
          value={user.name}
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-red-400"
        />
        <input
          onChange={handleForm}
          value={user.shopName}
          name="shopName"
          type="text"
          placeholder="Shop Name"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-red-400"
        />
        <input
          onChange={handleForm}
          value={user.email}
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-red-400"
        />
        <input
          onChange={handleForm}
          value={user.password}
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-red-400"
        />
        <input
          onChange={handleForm}
          value={user.phone}
          name="phone"
          type="text"
          placeholder="Ex- +91..."
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-red-400"
        />
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition mb-2"
        >
          Sign Up
        </button>
      </form>
      {/* Back to login */}
      <div className="bg-white border border-gray-300 w-full p-4 mt-4 text-center rounded-lg shadow-sm">
        <p className="text-sm">
          Already have an account?{' '}
          <button onClick={onLoginClick} className="text-red-500 font-semibold hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}
