import React from "react";
import RSVPForm from "./RSVPForm";

const translations = {
  en: {
    rsvp: "RSVP",
    travel: "Travel",
    accommodation: "Accommodation",
    itinerary: "Itinerary",
    location: "Location",
    comingSoon: "Coming soon...",
    locationText: "The ceremony and reception will be hosted at Fattoria Terranova, a working farm and restaurant on the beatiful Sorrento hills, with views to the Bay of Naples, Vesuvius, and various islands including Capri.\n\nThere is a swimming pool with sun loungers, multiple garden areas and activities and all food served is grown locally. They even produce their own olive oil and lemoncello from the famous Sorrento lemons!\n\nMore details on their website: ",
    websiteLink: "fattoriaterranova.it",
  },
  pl: {
    rsvp: "Potwierdzenie obecności",
    travel: "Podróż",
    accommodation: "Zakwaterowanie",
    itinerary: "Plan wydarzeń",
    location: "Lokalizacja",
    comingSoon: "Wkrótce...",
    locationText: "Ceremonia i przyjęcie odbędą się w Fattoria Terranova, działającej farmie i restauracji na pięknych wzgórzach Sorrento, z widokiem na Zatokę Neapolitańską, Wezuwiusz i różne wyspy, w tym Capri.\n\nNa miejscu znajduje się basen z leżakami, liczne ogrody i atrakcje, a wszystkie serwowane potrawy są uprawiane lokalnie. Produkują nawet własną oliwę z oliwek i limoncello ze słynnych cytryn z Sorrento!\n\nWięcej szczegółów na ich stronie internetowej: ",
    websiteLink: "fattoriaterranova.it",
  },
  hu: {
    rsvp: "Visszajelzés",
    travel: "Utazás",
    accommodation: "Szállás",
    itinerary: "Program",
    location: "Helyszín",
    comingSoon: "Hamarosan...",
    locationText: "Az esküvő és a vacsora a Fattoria Terranovában lesz, ami egy működő farm és étterem a gyönyörű Sorrento dombjain, kilátással a Nápolyi-öbölre, a Vezúvra és különböző szigetekre, köztük Caprira.\n\nVan egy medencéjük napozóágyakkal, több kertes liget és mindenféle elfoglaltság. Minden felszolgált ételt helyben termesztett alapanyagokból főznek. Még saját olívaolajat és limoncellót is készítenek a híres sorrentói citromból!\n\nTovábbi részletek a weboldalukon: ",
    websiteLink: "fattoriaterranova.it",
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
        <h2>{translations[language].location}</h2>
        <div className="location-content">
          <div className="location-text">
            {translations[language].locationText.split('\n\n').map((paragraph, index) => (
              <p key={index}>
                {paragraph}
                {index === 2 && (
                  <a 
                    href="https://www.fattoriaterranova.it" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    {translations[language].websiteLink}
                  </a>
                )}
              </p>
            ))}
          </div>
          <div className="location-gallery">
            <img src="/wedding2026/assets/fattoria/1.jpg" alt="Fattoria Terranova" className="gallery-image" />
            <img src="/wedding2026/assets/fattoria/2.jpg" alt="Fattoria Terranova" className="gallery-image" />
            <img src="/wedding2026/assets/fattoria/3.jpg" alt="Fattoria Terranova" className="gallery-image" />
            <img src="/wedding2026/assets/fattoria/4.jpg" alt="Fattoria Terranova" className="gallery-image" />
          </div>
        </div>
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
