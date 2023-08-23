import React, { useEffect, useState, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
  Navigate,
} from "react-router-dom";
import LoginRegister from "./views/LoginRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalProfile from "./views/PersonalProfile";
import UploadDocs from "./views/UploadDocs";
import HaNavbar from "./layout/navbar/navbar";
import PrivateRoute from "./views/privateRoute";
import EditProfile from "./views/EditProfile";

function App() {
  const isLoggedIn = () => {
    const userToken = localStorage.getItem("userToken");
    const userDetails = localStorage.getItem("userDetails");
    // Check if the user is logged in
    if (userDetails === null) {
      return false;
    }
    return !!userToken; // Return true if userToken exists, false otherwise
  };

  useEffect(() => {
    if (localStorage.getItem("loginAlert") === "true") {
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
        <Fragment>
          <HaNavbar />
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/" element={<PersonalProfile />} />
              <Route path="/userDetails" element={<PersonalProfile />} />
              <Route path="/uploadDocs" element={<UploadDocs />} />
              <Route path="/editProfile" element={<EditProfile />} />
            </Route>
            <Route
              path="/login"
              element={isLoggedIn() ? <Navigate to="/" /> : <LoginRegister />}
            />

            {/* <Route
            exact
            path="/"
            element={
              localStorage.getItem("userDetails") ? (
                <Navigate to="/userDetails" />
              ) : (
                <Navigate to="/login" element={<LoginRegister />} />
              )
            }
          /> */}

            {/* <Route
            path="/login"
            element={
              isLoggedIn() ? (
                <Navigate to="/" />
              ) : (
                (AuthService.SignOut(), (<LoginRegister />))
              )
            }
          />

          <Route
            path="/"
            element={
              isLoggedIn() ? (
                <Navigate to="/userDetails" />
              ) : (
                (AuthService.SignOut(), (<LoginRegister />))
              )
            }
          /> */}

            {/* Handle other routes or redirections here */}
            <Route
              path="/*"
              element={<Navigate to="/userDetails" />} // Redirect to userDetails for unknown routes
            />
          </Routes>
        </Fragment>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
