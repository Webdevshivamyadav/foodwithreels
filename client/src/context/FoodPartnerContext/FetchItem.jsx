// FetchItemContext.js
import React, { createContext, useState } from 'react'
import api from '../../api/api'

const FetchItemContext = createContext()

export const FetchItemProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchFoodItems = async (_id) => {
    if (!_id) {
      console.warn('Food partner ID not provided or not logged in.')
      setError('Food partner ID missing')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await api.get(`/foodPartners/FetchPartnerItem?_id=${_id}`)
      setItems(response.data.items || [])
    } catch (err) {
      console.error('Error fetching food items:', err)
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FetchItemContext.Provider value={{ items, fetchFoodItems, loading, error }}>
      {children}
    </FetchItemContext.Provider>
  )
}

export default FetchItemContext
