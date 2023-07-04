import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./layout/navbar/navbar";
import LoginRegister from "./views/LoginRegister";

function App() {
  const isLoggedIn = () => {
    // Check if the user is logged in
    const userToken = localStorage.getItem("userToken");
    return !!userToken; // Return true if userToken exists, false otherwise
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
              isLoggedIn() ? <Navigate to="/login" /> : <LoginRegister />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
