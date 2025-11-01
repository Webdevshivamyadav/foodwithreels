import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
  const { isauth } = useSelector((state) => state.auth)
  if (!isauth) {
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
