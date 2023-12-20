import React, { useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
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
import DocsList from "./views/DocsList";
import UserList from "./views/UserList";
import "./App.css";
import BookingSystem from "./views/bookingSystem/BookingSystem";
import BookingPage from "./views/bookingSystem/BookingPage";

function App() {
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

  const checkAuthenticated = () => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      return true;
    } else {
      return false;
    }
  };

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
              <Route path="" element={<PersonalProfile />} />
              <Route path="uploadDocs" element={<UploadDocs />} />
              <Route path="bookingSystem" element={<BookingSystem />} />
              <Route path="bookingPage" element={<BookingPage />} />
              <Route path="docsList" element={<DocsList />} />
              <Route path="userList" element={<UserList />} />
              <Route path="userDetails" element={<PersonalProfile />} />
              <Route path="userDetails/editProfile" element={<EditProfile />} />
            </Route>
            <Route
              path="login"
              element={
                checkAuthenticated() ? <Navigate to="/" /> : <LoginRegister />
              }
            />

            <Route
              path="/*"
              element={<Navigate to="userDetails" />} // Redirect to userDetails for unknown routes
            />
          </Routes>
        </Fragment>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
