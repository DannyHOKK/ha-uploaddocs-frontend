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
import Emtpy from "./views/Emtpy";

function App() {
  const isLoggedIn = () => {
    // Check if the user is logged in
    const userToken = localStorage.getItem("userToken");
    return !!userToken; // Return true if userToken exists, false otherwise
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      notifyLogin(userDetails.username);
    }
  }, []);

  const notifyLogin = (username) => {
    toast.success("Login Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
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
            element={
              isLoggedIn() ? (
                (notifyLogin(), (<Navigate to="/" />))
              ) : (
                <LoginRegister />
              )
            }
          />

          <Route path="/userDetails" element={<PersonalProfile />} />
          <Route
            path="/"
            element={
              isLoggedIn() ? <Navigate to="/userDetails" /> : <LoginRegister />
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
