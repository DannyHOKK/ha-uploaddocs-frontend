// PrivateRoute.js
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const checkAuthenticated = () => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      return true;
    } else if (localStorage.getItem("isAuthenticated") === false) {
      return false;
    }
  };

  return checkAuthenticated() ? <Outlet /> : <Navigate to="/introduction" />;
};

export default PrivateRoute;
