import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginRegister from "./views/LoginRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalProfile from "./views/PersonalProfile";
import UploadDocs from "./views/UploadDocs";
import HaNavbar from "./layout/navbar/navbar";

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
    }
    if (localStorage.getItem("logoutAlert") === "true") {
      notifyLogout();
      localStorage.setItem("logoutAlert", false);
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
        <HaNavbar />
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn() ? <Navigate to="/" /> : <LoginRegister />}
          />
          <Route
            path="/"
            element={
              isLoggedIn() ? <Navigate to="/uploadDocs" /> : <LoginRegister />
            }
          />
          <Route path="/userDetails" element={<PersonalProfile />} />
          <Route path="/uploadDocs" element={<UploadDocs />} />
        </Routes>
      </Router>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
