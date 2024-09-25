import React from "react";
import { Navigate } from "react-router-dom";

// Создайте функцию, чтобы проверить, залогинен ли пользователь
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Замените эту логику на проверку аутентификации
};

// Создайте защищенный маршрут
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Если пользователь не залогинен, перенаправить на страницу логина
    return <Navigate to="/login" />;
  }
  // Если пользователь залогинен, отобразить компонент
  return children;
};

export default ProtectedRoute;
