import React, { useState } from "react";
import "./FormPage.css";
import home from "./assets/home.png";
import { Link } from "react-router-dom";

function FormPage() {
  const [greetingText, setGreetingText] = useState("");
  const [translateText, setTranslateText] = useState("");
  const [jokeText, setJokeText] = useState("");

  const handleGreetingSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/form/submit_greeting/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: greetingText }),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message));
  };

  const handleTranslateSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/form/translate_text/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: translateText }),
    })
      .then((response) => response.json())
      .then((data) => alert(`Перевод: ${data.translatedText}`));
  };

  const handleJokeSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/form/submit_joke/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: jokeText }),
    })
      .then((response) => response.json())
      .then((data) => alert(data.joke));
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <Link to="/">
          <img src={home} alt="" className="home-icon" />
        </Link>
        <h2>Форма приветствия (введите слово "привет")</h2>
        <form onSubmit={handleGreetingSubmit}>
          <input
            type="text"
            value={greetingText}
            onChange={(e) => setGreetingText(e.target.value)}
          />
          <button type="submit">Отправить</button>
        </form>

        <h2>Форма перевода</h2>
        <form onSubmit={handleTranslateSubmit}>
          <input
            type="text"
            value={translateText}
            onChange={(e) => setTranslateText(e.target.value)}
          />
          <button type="submit">Отправить</button>
        </form>

        <h2>Форма анекдота (введите слово "анекдот")</h2>
        <form onSubmit={handleJokeSubmit}>
          <input
            type="text"
            value={jokeText}
            onChange={(e) => setJokeText(e.target.value)}
          />
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
