import React, { createContext, useContext, useState } from "react";
import axios from "axios";


export const FetchItemContext = createContext();

export const FetchItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  
  const fetchFoodItems = async (_id) => {
   
    if (!_id) {
      console.warn("Food partner not found or not logged in");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/foodPartners/FetchPartnerItem?_id=${_id}`,
        { withCredentials: true }
      );
      setItems(response.data.items || []);
      
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  return (
    <FetchItemContext.Provider value={{ items, fetchFoodItems }}>
      {children}
    </FetchItemContext.Provider>
  );
};

export const useFetchItems = () => useContext(FetchItemContext);
