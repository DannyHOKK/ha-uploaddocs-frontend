// PrivateRoute.js
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = () => {
    const userToken = localStorage.getItem("userToken");
    const userDetails = localStorage.getItem("userDetails");
    // Check if the user is logged in

    if (userDetails === null) {
      return false;
    }
    return !!userToken; // Return true if userToken exists, false otherwise
  };

  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
