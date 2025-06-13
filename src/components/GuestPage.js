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
    locationText: "Our ceremony and reception will be held at Fattoria Terranova, a working farm and restaurant in the beautiful Sorrento hills, with wonderful views of the Bay of Naples, Vesuvius, and Capri.\n\nGuests are welcome to enjoy the swimming pool and garden areas. All the food served is grown on the farm, which also produces its own olive oil and limoncello from the region's famous Sorrento lemons.\n\nYou can find more details on their website: ",
    websiteLink: "fattoriaterranova.it",
  },
  pl: {
    rsvp: "Potwierdzenie obecności",
    travel: "Podróż",
    accommodation: "Zakwaterowanie",
    itinerary: "Plan wydarzeń",
    location: "Lokalizacja",
    comingSoon: "Wkrótce...",
    locationText: "Nasza ceremonia i przyjęcie odbędą się w Fattoria Terranova – gospodarstwie z restauracją, położonym na pięknych wzgórzach Sorrento, z których roztaczają się wspaniałe widoki na Zatokę Neapolitańską, Wezuwiusza i Capri.\n\nGoście będą mogli korzystać z basenu oraz terenów ogrodowych. Wszystkie serwowane dania powstają z lokalnych produktów, a gospodarstwo wytwarza nawet własną oliwę z oliwek i limoncello ze słynnych cytryn z Sorrento!\n\nWięcej szczegółów znajdą na ich stronie internetowej: ",
    websiteLink: "fattoriaterranova.it",
  },
  hu: {
    rsvp: "Visszajelzés",
    travel: "Utazás",
    accommodation: "Szállás",
    itinerary: "Program",
    location: "Helyszín",
    comingSoon: "Hamarosan...",
    locationText: "A szertartást és a fogadást a Fattoria Terranovában tartjuk, egy étteremként is működő gazdaságban a gyönyörű Sorrento-i dombokon, ahonnan csodálatos kilátás nyílik a Nápolyi-öbölre, a Vezúvra és Capri szigetére.\n\nA vendégek rendelkezésére áll az úszómedence és a kert is. Minden felszolgált étel a farmon termesztett alapanyagokból készül, sőt, a gazdaság saját olívaolajat és limoncello-t is készít a híres Sorrento-i citromból!\n\nTovábbi részletek a weboldalukon: ",
    websiteLink: "fattoriaterranova.it",
  },
};

const GuestPage = ({ language, guestCode }) => {
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
