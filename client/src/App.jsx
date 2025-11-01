import React, { useEffect, useState } from 'react'
import AppRoutes from './Routes/AppRoutes'
import './index.css'
import { ToastContainer, Bounce } from 'react-toastify'
import { useLocation } from 'react-router'
import LoadingSpinner from './Component/User/LoadingSpinner'

const App = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500) 
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {loading && <LoadingSpinner />}
      <AppRoutes />
    </>
  )
}

export default App
