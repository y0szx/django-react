import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      alert("Ошибка регистрации");
    }
  };

  return (
    <div className="register-page">
      <div className="login-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <button type="submit">Зарегистрироваться</button>
        </form>
        <p>
          Есть аккаунт?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Войдите
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
