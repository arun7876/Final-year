import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "./firebase";

import Login from "./pages/login";
import Register from "./Components/Register";
import Home from "./pages/Home";
import SymptomSelection from "./pages/SymptomSelection";
import PredictionResult from "./pages/PredictionResult";
import Chatbot from "./pages/Chatbot";
import DoctorRecommendation from "./pages/DoctorRecommendation";

import Layout from "./Components/layout";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading authentication...</div>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
      <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />

      {/* Protected Routes WITH DASHBOARD LAYOUT */}
      <Route
        path="/home"
        element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Home user={user} onLogout={handleLogout} />
            </Layout>
          ) : <Navigate to="/login" />
        }
      />

      <Route
        path="/symptoms"
        element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <SymptomSelection />
            </Layout>
          ) : <Navigate to="/login" />
        }
      />

      <Route
        path="/prediction"
        element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <PredictionResult />
            </Layout>
          ) : <Navigate to="/login" />
        }
      />

      <Route
        path="/chatbot"
        element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Chatbot />
            </Layout>
          ) : <Navigate to="/login" />
        }
      />

      <Route
        path="/doctor"
        element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <DoctorRecommendation />
            </Layout>
          ) : <Navigate to="/login" />
        }
      />

    </Routes>
  );
}

export default App;
