import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      alert("Ошибка входа");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Войти</button>
        </form>
        <p>
          Нет аккаунта?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Зарегистрируйтесь
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
