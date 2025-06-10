import React, { useState } from "react";
import "./App.css";

const translations = {
  en: {
    title: "Justyna & Krisztian - Sorrento, 26th June 2026",
    subtitle:
      "We are so excited that you'll be joining us on our special day! Please, enter your unique code to view all the relevant information for the wedding",
    enterCode: "Enter your code",
    submit: "Submit",
    language: "Language",
  },
  pl: {
    title: "Justyna & Krisztian - Sorrento, 26 czerwca 2026",
    subtitle:
      "Jesteśmy bardzo podekscytowani, że dołączysz do nas w ten wyjątkowy dzień! Prosimy, wprowadź swój unikalny kod, aby zobaczyć wszystkie istotne informacje dotyczące ślubu",
    enterCode: "Wprowadź swój kod",
    submit: "Potwierdź",
    language: "Język",
  },
  hu: {
    title: "Justyna & Krisztian - Sorrento, 2026. június 26.",
    subtitle:
      "Nagyon örülünk, hogy csatlakozol hozzánk ezen a különleges napon! Kérjük, add meg az egyedi kódodat, hogy megtekinthesd az esküvővel kapcsolatos összes fontos információt",
    enterCode: "Add meg a kódodat",
    submit: "Beküldés",
    language: "Nyelv",
  },
};

function App() {
  const [language, setLanguage] = useState("en");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement code validation and navigation
    console.log("Submitted code:", code);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="language-selector">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="pl">Polski</option>
            <option value="hu">Magyar</option>
          </select>
        </div>

        <h1>{translations[language].title}</h1>
        <p className="subtitle">{translations[language].subtitle}</p>

        <form onSubmit={handleSubmit} className="code-form">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={translations[language].enterCode}
            className="code-input"
          />
          <button type="submit" className="submit-button">
            {translations[language].submit}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </header>
    </div>
  );
}

export default App;
