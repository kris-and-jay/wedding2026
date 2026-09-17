import React from "react";
import PhotoUpload from "./PhotoUpload";
import PhotoGallery from "./PhotoGallery";

const translations = {
  en: {
    introTitle: "Our wedding memories",
    introText:
      "Thank you for celebrating with us! Share your photos and videos from the weekend, and browse the gallery for professional shots and guest memories.",
    uploadTitle: "Upload your memories",
    galleryTitle: "Gallery",
  },
  pl: {
    introTitle: "Nasze wspomnienia ze ślubu",
    introText:
      "Dziękujemy, że byliście z nami! Podzielcie się swoimi zdjęciami i filmami z weekendu oraz przeglądajcie galerie ze zdjęciami od fotografów i wspomnieniami gości.",
    uploadTitle: "Prześlijcie swoje wspomnienia",
    galleryTitle: "Galeria",
  },
  hu: {
    introTitle: "Az esküvő pillanatai",
    introText:
      "Köszönjük, hogy velünk ünnepeltetek! Osszátok meg a hétvége során készített fotóitokat és videóitokat, és böngésszetek a galériában a profi és vendég fotók között.",
    uploadTitle: "Töltsétek fel az esküvőről készült fotóitokat és videóitokat",
    galleryTitle: "Galéria",
  },
};

const GuestPage = ({ language, guestCode }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="guest-page">
      <div className="section">
        <h2>{t.introTitle}</h2>
        <p className="guest-intro-text">{t.introText}</p>
        <div className="wedding-video-embed">
          <iframe
            src="https://www.youtube.com/embed/uWJIQTdCtFk?si=PWQRf8Ba_iMvP0Uc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="section">
        <h2>{t.uploadTitle}</h2>
        <PhotoUpload language={language} guestCode={guestCode} />
      </div>

      <div className="section">
        <h2>{t.galleryTitle}</h2>
        <PhotoGallery language={language} />
      </div>
    </div>
  );
};

export default GuestPage;
