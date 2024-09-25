import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import FormPage from "./FormPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/forms" element={<FormPage />} /> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms"
          element={
            <ProtectedRoute>
              <FormPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
