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
    locationText:
      "Our ceremony and reception will be held at Fattoria Terranova, a working farm, hotel and restaurant situated in the beautiful Sorrento hills, featuring a swimming pool and garden areas with wonderful views of the Bay of Naples, Vesuvius, and Capri island.\n\nAll the food served is grown on the farm, which also produces its own olive oil and limoncello from the region's famous Sorrento lemons.\n\nYou can find more details on their website: ",
    websiteLink: "fattoriaterranova.it",
  },
  pl: {
    rsvp: "Potwierdzenie obecności",
    travel: "Podróż",
    accommodation: "Nocleg",
    itinerary: "Plan wydarzeń",
    location: "Lokalizacja",
    comingSoon: "Informacje w odpowiednim czasie..",
    locationText:
      "Nasza ceremonia ślubna i przyjęcie weselne odbędą się w Fattoria Terranova – gospodarstwie agroturystycznym z restauracją, basenem i terenami ogrodowymi, położonym na pięknych wzgórzach Sorrento, z których roztaczają się oszałamiające widoki na Zatokę Neapolitańską, Wezuwiusza i wyspę Capri.\n\nWszystkie dania serwowane w restauracji powstają z lokalnych produktów, a gospodarstwo wytwarza nawet własną oliwę z oliwek i limoncello ze słynnych cytryn z Sorrento!\n\nWięcej szczegółów znajdziecie na ich stronie internetowej: ",
    websiteLink: "fattoriaterranova.it",
  },
  hu: {
    rsvp: "Visszajelzés",
    travel: "Utazás",
    accommodation: "Szállás",
    itinerary: "Program",
    location: "Helyszín",
    comingSoon: "Hamarosan...",
    locationText:
      "A szertartást és a fogadást a Fattoria Terranovában tartjuk, egy étteremként is működő gazdaságban a gyönyörű Sorrento-i dombokon, ahonnan csodálatos kilátás nyílik a Nápolyi-öbölre, a Vezúvra és Capri szigetére.\n\nA vendégek rendelkezésére áll az úszómedence és a kert is. Minden felszolgált étel a farmon termesztett alapanyagokból készül, sőt, a gazdaság saját olívaolajat és limoncello-t is készít a híres Sorrento-i citromból!\n\nTovábbi részletek a weboldalukon: ",
    websiteLink: "fattoriaterranova.it",
  },
};

const hasAccommodationMessage = (guestCode) => {
  const validCodes = [
    "IL2026",
    "HG2026",
    "AT2026",
    "SZ2026",
    "ZZ2026",
    "KR2026",
    "GB2026",
    "TM2026",
    "ER2026",
    "PT2026",
    "MK2026",
    "WS2026",
    "AD2026",
    "AG2026",
    "CT2026",
    "WD2026",
    "KL2026",
    "SM2026",
  ];
  return validCodes.includes(guestCode);
};

const AccommodationMessage = ({ guestCode }) => {
  const messages = {
    IL2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    HG2026: (
      <div>
        <p>
          Az egyik VIP vendégünkként mi intézzük a hétvégi szállásodat és velünk
          fogsz megszállni a Villa Terranovában június 25-től (csütörtök) június
          29-ig (hétfő). Csak azt szeretnénk, ha pihennél, velünk ünnepelnél, és
          csodás emlékeket szereznél.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Villa Terranova
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 25 (csütörtök). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 29 (hétfő). délelőtt 11
          óráig
        </p>
      </div>
    ),
    AT2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    SZ2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    ZZ2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    KR2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    GB2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    TM2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    ER2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    PT2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    MK2026: (
      <p>
        W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
        towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
        ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku 26
        czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście odpoczęli,
        wspaniale się z nami bawili i zabrali ze sobą niezapomniane wspomnienia.
        Więcej szczegółów logistycznych odnośnie kwestii zakwaterowania
        prześlemy w odpowiednim czasie
      </p>
    ),
    WS2026: (
      <p>
        W wyrazie naszej głębokiej wdzięczności i radości że chcesz nam
        towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Cię właściwie
        ugościć. Dlatego zapewniamy dla Ciebie nocleg na cały weekend od piątku
        26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byś odpoczęła,
        wspaniale się z nami bawiła i zabrała ze sobą niezapomniane wspomnienia.
        Więcej szczegółów logistycznych odnośnie kwestii zakwaterowania
        prześlemy w odpowiednim czasie
      </p>
    ),
    AD2026: (
      <p>
        W wyrazie naszej głębokiej wdzięczności i radości że chcesz nam
        towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Cię właściwie
        ugościć. Dlatego zapewniamy dla Ciebie nocleg na cały weekend od piątku
        26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byś odpoczął,
        wspaniale się z nami bawił i zabrał ze sobą niezapomniane wspomnienia.
        Więcej szczegółów logistycznych odnośnie kwestii zakwaterowania
        prześlemy w odpowiednim czasie
      </p>
    ),
    AG2026: (
      <p>
        W wyrazie naszej głębokiej wdzięczności i radości że chcesz nam
        towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Cię właściwie
        ugościć. Dlatego zapewniamy dla Ciebie nocleg na cały weekend od piątku
        26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byś odpoczęła,
        wspaniale się z nami bawiła i zabrała ze sobą niezapomniane wspomnienia.
        Więcej szczegółów logistycznych odnośnie kwestii zakwaterowania
        prześlemy w odpowiednim czasie
      </p>
    ),
    CT2026: (
      <p>
        W wyrazie naszej głębokiej wdzięczności i radości że chcesz nam
        towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Cię właściwie
        ugościć. Dlatego zapewniamy dla Ciebie nocleg na cały weekend od piątku
        26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byś odpoczęła,
        wspaniale się z nami bawiła i zabrała ze sobą niezapomniane wspomnienia.
        Więcej szczegółów logistycznych odnośnie kwestii zakwaterowania
        prześlemy w odpowiednim czasie
      </p>
    ),
    WD2026: (
      <p>
        W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
        towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
        ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku 26
        czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście odpoczęli,
        wspaniale się z nami bawili i zabrali ze sobą niezapomniane wspomnienia.
        Więcej szczegółów logistycznych odnośnie kwestii zakwaterowania
        prześlemy w odpowiednim czasie
      </p>
    ),
    KL2026: (
      <p>
        W wyrazie naszej głębokiej wdzięczności i radości że chcesz nam
        towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Cię właściwie
        ugościć. Dlatego zapewniamy dla Ciebie nocleg na cały weekend od piątku
        26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byś odpoczęła,
        wspaniale się z nami bawiła i zabrała ze sobą niezapomniane wspomnienia.
        Więcej szczegółów logistycznych odnośnie kwestii zakwaterowania
        prześlemy w odpowiednim czasie
      </p>
    ),
    SM2026: (
      <div>
        <p>
          As one of our VIPs, we will be taking care of your accommodation and
          you will be staying with us in Villa Terranova, from Thursday, 25th
          June 2026 to Monday, 29th June 2026. All we want is for you to relax,
          celebrate with us, and create wonderful memories.
        </p>
        <br />
        <p>
          <strong>Room:</strong> Villa Terranova
        </p>
        <br />
        <p>
          <strong>Check-in:</strong> 25th June 2026 (Thursday), from 2 PM
        </p>
        <br />
        <p>
          <strong>Check-out:</strong> 29th June 2026 (Monday), until 11 AM
        </p>
      </div>
    ),
  };

  return messages[guestCode] || null;
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
            {translations[language].locationText
              .split("\n\n")
              .map((paragraph, index) => (
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
            <img
              src="/wedding2026/assets/fattoria/1.jpg"
              alt="Fattoria Terranova"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/fattoria/2.jpg"
              alt="Fattoria Terranova"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/fattoria/3.jpg"
              alt="Fattoria Terranova"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/fattoria/4.jpg"
              alt="Fattoria Terranova"
              className="gallery-image"
            />
          </div>
        </div>
      </div>
      <div className="section">
        <h2>{translations[language].travel}</h2>
        <p>{translations[language].comingSoon}</p>
      </div>
      <div className="section">
        <h2>{translations[language].accommodation}</h2>
        <AccommodationMessage guestCode={guestCode} />
        {(guestCode === "HG2026" || guestCode === "SM2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/villa_terranova.jpg"
              alt="Villa Terranova"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/soggiorno.jpg"
              alt="Soggiorno"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105133.jpg"
              alt="Villa Terranova Interior"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Villa Terranova Interior"
              className="gallery-image"
            />
          </div>
        )}
        {!hasAccommodationMessage(guestCode) && (
          <p>{translations[language].comingSoon}</p>
        )}
      </div>
      <div className="section">
        <h2>{translations[language].itinerary}</h2>
        <p>{translations[language].comingSoon}</p>
      </div>
    </div>
  );
};

export default GuestPage;
