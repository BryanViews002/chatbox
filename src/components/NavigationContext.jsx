import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Add navigation hook

  const login = () => {
    setIsAuthenticated(true);
    navigate("/chat"); // Navigate to the ChatBox after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Navigate back to the Welcome Page
  };

  return (
    <NavigationContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  return useContext(NavigationContext);
};
