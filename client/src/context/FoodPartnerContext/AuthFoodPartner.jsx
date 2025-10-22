// authFoodPartner.js
import { createContext, useState } from "react";

import api from "../../api/api";

export const AuthFoodPartner = createContext();

export const AuthFoodPartnerProvider = ({ children }) => {
  const [foodPartner, setfoodPartner] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = async (credentials) => {
    try {
      const response = await api.post(
        "/foodPartners/login",
        credentials
        
      );

      if (response.status === 200) {
        
        sessionStorage.setItem("foodPartner",JSON.stringify(response.data.foodPartner))
        setfoodPartner(response.data.foodPartner);
        setIsAuthenticated(true);
       
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const registerFoodPartner = async (user) => {
    try {
      const response = await api.post(
        "/foodPartners/register",
        user
       
      );
       
      if (response.status === 201) {
        setfoodPartner(response.data.foodPartner);
        setIsAuthenticated(true);
        sessionStorage.setItem("foodPartner",JSON.stringify(response.data.foodPartner))
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

 

  return (
    <AuthFoodPartner.Provider
      value={{
        foodPartner,
        isAuthenticated,
        login,
        setfoodPartner,
        setIsAuthenticated,
        registerFoodPartner,
      }}
    >
      {children}
    </AuthFoodPartner.Provider>
  );
};
