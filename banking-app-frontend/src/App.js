import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [userEmail, setUserEmail] = useState(null);

  const handleLogin = (email) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token on logout
    setUserEmail(null);
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={userEmail ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={userEmail ? (
            <Dashboard email={userEmail} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  );
};

export default App;
