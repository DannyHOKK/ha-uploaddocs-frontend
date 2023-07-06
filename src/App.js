import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./layout/navbar/navbar";
import LoginRegister from "./views/LoginRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalProfile from "./views/PersonalProfile";

function App() {
  const isLoggedIn = () => {
    const userToken = localStorage.getItem("userToken");
    // Check if the user is logged in
    return !!userToken; // Return true if userToken exists, false otherwise
  };

  useEffect(() => {
    console.log(localStorage.getItem("loginAlert"));
    if (localStorage.getItem("loginAlert") === "true") {
      console.log("success");
      notifyLogin();
      localStorage.setItem("loginAlert", false);
    } else if (localStorage.getItem("logoutAlert") === "true") {
      notifyLogout();
      localStorage.setItem("logoutwAlert", false);
    }
  }, []);

  const notifyLogin = () => {
    toast.success("Login Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyLogout = () => {
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn() ? <Navigate to="/" /> : <LoginRegister />}
          />
          <Route
            path="/"
            element={
              isLoggedIn() ? <Navigate to="/userDetails" /> : <LoginRegister />
            }
          />
          <Route path="/userDetails" element={<PersonalProfile />} />
        </Routes>
      </Router>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
