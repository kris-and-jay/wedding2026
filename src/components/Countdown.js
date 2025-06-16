import React, { useState, useEffect } from "react";

const translations = {
  en: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  pl: {
    days: "Dni",
    hours: "Godzin",
    minutes: "Minut",
    seconds: "Sekund",
  },
  hu: {
    days: "Nap",
    hours: "Óra",
    minutes: "Perc",
    seconds: "Másodperc",
  },
};

const Countdown = ({ language = "en" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2026-06-27T16:30:00");

    const calculateTimeLeft = () => {
      const difference = weddingDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-grid">
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.days}</span>
          <span className="countdown-label">{translations[language].days}</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.hours}</span>
          <span className="countdown-label">
            {translations[language].hours}
          </span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.minutes}</span>
          <span className="countdown-label">
            {translations[language].minutes}
          </span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.seconds}</span>
          <span className="countdown-label">
            {translations[language].seconds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
