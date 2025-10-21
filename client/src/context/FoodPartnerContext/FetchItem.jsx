import React, { createContext, useState } from "react";

import api from "../../api/api";


 const FetchItemContext = createContext();

export const FetchItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  
  const fetchFoodItems = async (_id) => {
   
    if (!_id) {
      console.warn("Food partner not found or not logged in");
      return;
    }

    try {
      const response = await api.get(
        `/foodPartners/FetchPartnerItem?_id=${_id}`,
       
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

export default FetchItemContext;
