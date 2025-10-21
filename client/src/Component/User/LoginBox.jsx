import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router' // ✅ Correct import
import { useDispatch, useSelector } from 'react-redux'
import { auththunk } from '../../features/authSlice'

export default function UserLogin({ onSignupClick }) {
  const dispatch = useDispatch()
  const { loading, status, data, error } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // 🔹 Local state for user input
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // 🔹 Local state for validation errors
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  // ✅ Validation Function
  const validateLogin = () => {
    let newErrors = {}
    let isValid = true

    // Email validation
    if (!user.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    // Password validation
    if (!user.password.trim()) {
      newErrors.password = 'Password is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // ✅ Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' })) // clear field error
  }

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateLogin()) {
      dispatch(auththunk(user))
    }
  }

  // ✅ Store user data after successful login
  useEffect(() => {
    if (data) {
      sessionStorage.setItem('user', JSON.stringify(data))
    }
  }, [data])

  // ✅ Redirect on successful login
  useEffect(() => {
    if (status === 'ok') {
      navigate('/')
    }
  }, [status, navigate])

  // ✅ Loader UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-300 w-full p-8 flex flex-col items-center rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-red-500">🍴 Food Reels</h1>
      <h2 className="text-lg font-semibold mb-2">Welcome Back!</h2>
      <p className="text-gray-500 text-sm mb-6">Login to continue</p>

      {/* LOGIN FORM */}
      <form onSubmit={handleSubmit} className="w-full">
        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-400`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-400`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
        >
          Log In
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center my-4 w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Become Partner */}
      <Link to={'/BecomeFoodPartner'} className="text-xs text-blue-400 hover:underline mt-1">
        Become a Food Partner
      </Link>

      {/* Sign Up link */}
      <div className="bg-white border border-gray-300 w-full p-4 mt-4 text-center rounded-lg shadow-sm">
        <p className="text-sm">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={onSignupClick}
            className="text-red-500 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
