// authFoodPartner.js
import { createContext, useState } from "react";
import api from "../../api/api";

const AuthFoodPartner = createContext();

export const AuthFoodPartnerProvider = ({ children }) => {
  // Initialize from sessionStorage for persistence
  const [foodPartner, setFoodPartner] = useState(() => {
    const saved = sessionStorage.getItem("foodPartner");
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem("foodPartner"));

  // LOGIN
  const login = async (credentials) => {
    try {
      const response = await api.post("/foodPartners/login", credentials);

      if (response.status === 200) {
        const partner = response.data.foodPartner;
        setFoodPartner(partner);
        setIsAuthenticated(true);
        sessionStorage.setItem("foodPartner", JSON.stringify(partner));
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // REGISTER
  const registerFoodPartner = async (user) => {
    try {
      const response = await api.post("/foodPartners/register", user);

      if (response.status === 201) {
        const partner = response.data.foodPartner;
        setFoodPartner(partner);
        setIsAuthenticated(true);
        sessionStorage.setItem("foodPartner", JSON.stringify(partner));
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // LOGOUT
  const logout = () => {
    sessionStorage.removeItem("foodPartner");
    setFoodPartner(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthFoodPartner.Provider
      value={{
        foodPartner,
        isAuthenticated,
        login,
        registerFoodPartner,
        logout,
        setFoodPartner,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthFoodPartner.Provider>
  );
};

export default AuthFoodPartner;
