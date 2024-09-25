import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import forms from "./assets/forms.png";

function HomePage() {
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetch("http://localhost:8000/api/homepage/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Ошибка:", error));

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!data) {
    return <div>Загрузка...</div>;
  }

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="home-page">
      <div className="container">
        <Link to="/forms">
          <img src={forms} alt="" className="forms-icon" />
        </Link>
        <h1>{data.greeting}</h1>
        <p>{data.date}</p>
        <p>Текущее время: {formattedTime}</p>
        <p>{data.weather}</p>
      </div>
    </div>
  );
}

export default HomePage;
