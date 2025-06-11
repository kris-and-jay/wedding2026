import React from "react";
import RSVPForm from "./RSVPForm";

const translations = {
  en: {
    rsvp: "RSVP",
    travel: "Travel",
    accommodation: "Accommodation",
    itinerary: "Itinerary",
    comingSoon: "Coming soon...",
  },
  pl: {
    rsvp: "Potwierdzenie obecności",
    travel: "Podróż",
    accommodation: "Zakwaterowanie",
    itinerary: "Plan wydarzeń",
    comingSoon: "Wkrótce...",
  },
  hu: {
    rsvp: "Visszajelzés",
    travel: "Utazás",
    accommodation: "Szállás",
    itinerary: "Program",
    comingSoon: "Hamarosan...",
  },
};

const GuestPage = ({ language, guestCode }) => {
  console.log("GuestPage rendered with language:", language);
  return (
    <div className="guest-page">
      <div className="section">
        <h2>{translations[language].rsvp}</h2>
        <RSVPForm language={language} guestCode={guestCode} />
      </div>
      <div className="section">
        <h2>{translations[language].travel}</h2>
        <p>{translations[language].comingSoon}</p>
      </div>
      <div className="section">
        <h2>{translations[language].accommodation}</h2>
        <p>{translations[language].comingSoon}</p>
      </div>
      <div className="section">
        <h2>{translations[language].itinerary}</h2>
        <p>{translations[language].comingSoon}</p>
      </div>
    </div>
  );
};

export default GuestPage;
