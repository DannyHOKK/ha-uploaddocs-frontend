// AuthContext.js
import React, { createContext, useContext } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (user) => {
    // Add logic to handle user login and set isAuthenticated to true

    try {
      const res = await AuthService.loginUser(user);

      if (res.data.code === 0) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("loginAlert", true);
        window.location.reload();
      } else {
        return res.data.msg; // Return the message
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // Handle error if needed
      return "An error occurred during login";
    }
  };

  const logout = () => {
    // Add logic to handle user logout and set isAuthenticated to false
    AuthService.SignOut();
    localStorage.setItem("isAuthenticated", false);
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
