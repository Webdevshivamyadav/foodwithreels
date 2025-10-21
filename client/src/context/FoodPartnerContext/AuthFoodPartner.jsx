import React, { createContext, useContext, useState } from "react";

// ✅ Create context
const AuthFoodPartnerContext = createContext();

// ✅ Provider component
export const AuthFoodPartnerProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthFoodPartnerContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthFoodPartnerContext.Provider>
  );
};

// ✅ Custom hook to use context
export const useAuthFoodPartner = () => {
  return useContext(AuthFoodPartnerContext);
};
