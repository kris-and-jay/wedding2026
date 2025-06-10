import React, { useState } from "react";
import "./App.css";
import GuestPage from "./components/GuestPage";

const translations = {
  en: {
    title: "Justyna & Krisztian - Sorrento, 27th June 2026",
    subtitle:
      "We are so excited that you'll be joining us on our special day! Please, enter your unique code to view all the relevant information for the wedding",
    enterCode: "Enter your code",
    submit: "Submit",
    language: "Language",
    invalidCode: "Invalid code. Please try again.",
  },
  pl: {
    title: "Justyna & Krisztian - Sorrento, 27 czerwca 2026",
    subtitle:
      "Jesteśmy bardzo podekscytowani, że dołączysz do nas w ten wyjątkowy dzień! Prosimy, wprowadź swój unikalny kod, aby zobaczyć wszystkie istotne informacje dotyczące ślubu",
    enterCode: "Wprowadź swój kod",
    submit: "Potwierdź",
    language: "Język",
    invalidCode: "Nieprawidłowy kod. Spróbuj ponownie.",
  },
  hu: {
    title: "Justyna & Krisztian - Sorrento, 2026. június 27.",
    subtitle:
      "Nagyon örülünk, hogy csatlakozol hozzánk ezen a különleges napon! Kérjük, add meg az egyedi kódodat, hogy megtekinthesd az esküvővel kapcsolatos összes fontos információt",
    enterCode: "Add meg a kódodat",
    submit: "Beküldés",
    language: "Nyelv",
    invalidCode: "Érvénytelen kód. Kérjük, próbáld újra.",
  },
};

// Guest codes and their corresponding languages
const guestLanguages = {
  // Hungarian guests
  IL2026: "hu", // Ildiko
  HG2026: "hu", // Hugi
  AT2026B: "hu", // Ati
  SZ2026: "hu", // Szilvi
  ZZ2026: "hu", // Zaza
  KR2026: "hu", // Karina
  GB2026: "hu", // Gabi
  TM2026: "hu", // Tomi
  ER2026: "hu", // Era
  PT2026: "hu", // Peti
  AG2026B: "hu", // Agi

  // Polish guests
  MK2026: "pl", // Monika
  AD2026: "pl", // Adam
  WS2026: "pl", // Wiesia
  AG2026: "pl", // Aga
  AT2026: "pl", // Auntie Teresa
  UD2026: "pl", // Uncle Darek
  AM2026: "pl", // Aunti Monia
  KL2026: "pl", // Klaudia
  PL2026: "pl", // Paulina
  KS2026: "pl", // Kasia
  SD2026: "pl", // Sandra

  // English guests (default)
  YN2026: "en", // Yann
  GA2026: "en", // Gaia
  PR2026: "en", // Pierre
  SM2026: "en", // Sam
};

function App() {
  const [language, setLanguage] = useState("en");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
  const [guestLanguage, setGuestLanguage] = useState("en");

  const handleSubmit = (e) => {
    e.preventDefault();
    const upperCode = code.toUpperCase().trim();
    console.log("Submitted code:", upperCode);
    console.log("Is valid code:", guestLanguages[upperCode]);

    if (guestLanguages[upperCode]) {
      console.log("Setting guest language to:", guestLanguages[upperCode]);
      setError("");
      setIsValidCode(true);
      setGuestLanguage(guestLanguages[upperCode]);
    } else {
      console.log("Invalid code");
      setError(translations[language].invalidCode);
      setIsValidCode(false);
    }
  };

  console.log("Current state:", { isValidCode, guestLanguage, code });

  if (isValidCode) {
    console.log("Rendering GuestPage with language:", guestLanguage);
    return <GuestPage language={guestLanguage} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="language-selector">
          <button
            className={`language-button ${language === "en" ? "active" : ""}`}
            onClick={() => setLanguage("en")}
          >
            <img
              src="https://flagcdn.com/w80/gb.png"
              alt="English"
              className="flag-icon"
            />
            <span>English</span>
          </button>
          <button
            className={`language-button ${language === "pl" ? "active" : ""}`}
            onClick={() => setLanguage("pl")}
          >
            <img
              src="https://flagcdn.com/w80/pl.png"
              alt="Polski"
              className="flag-icon"
            />
            <span>Polski</span>
          </button>
          <button
            className={`language-button ${language === "hu" ? "active" : ""}`}
            onClick={() => setLanguage("hu")}
          >
            <img
              src="https://flagcdn.com/w80/hu.png"
              alt="Magyar"
              className="flag-icon"
            />
            <span>Magyar</span>
          </button>
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
