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
      "Dziękujemy, że byliście z nami! Podzielcie się swoimi zdjęciami i filmami z weekendu oraz przeglądajcie galerię ze zdjęciami profesjonalnymi i wspomnieniami gości.",
    uploadTitle: "Prześlijcie swoje wspomnienia",
    galleryTitle: "Galeria",
  },
  hu: {
    introTitle: "Az esküvőnk emlékei",
    introText:
      "Köszönjük, hogy velünk ünnepeltetek! Osszátok meg a hétvégi fotóitokat és videóitokat, és böngésszetek a galériában a profi képek és vendég emlékek között.",
    uploadTitle: "Töltsétek fel az emlékeiteket",
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
