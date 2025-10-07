import React from "react";
import RSVPForm from "./RSVPForm";
import TravelSection from "./TravelSection";

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
    "YN2026",
    "GA2026",
    "PR2026",
    "AGI2026",
    "KS2026",
    "PL2026",
    "SD2026",
  ];
  return validCodes.includes(guestCode);
};

const AccommodationMessage = ({ guestCode }) => {
  const messages = {
    IL2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Stanza 1 (Deluxe Room)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
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
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Limone (Suite)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
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
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Stanza 2
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    GB2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Mirto (Junior Suite)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
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
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Mirto (Junior Suite)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    PT2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Stanza 3
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
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
    YN2026: (
      <p>
        Fattoria Terranova has reserved a block of rooms until 31 December 2025
        for our wedding guests. You can book one of these directly with them.
        Please mention “Justyna + Krisz wedding 27.06.2026” when making your
        reservation to receive a discounted rate.
        <br />
        <br />
        Email info@fattoriaterranova.it or Whatsapp (+39) 081 533 02 34.
      </p>
    ),
    GA2026: (
      <p>
        Fattoria Terranova has reserved a block of rooms until 31 December 2025
        for our wedding guests. You can book one of these directly with them.
        Please mention “Justyna + Krisz wedding 27.06.2026” when making your
        reservation to receive a discounted rate.
        <br />
        <br />
        Email info@fattoriaterranova.it or Whatsapp (+39) 081 533 02 34.
      </p>
    ),
    PR2026: (
      <p>
        Fattoria Terranova has reserved a block of rooms until 31 December 2025
        for our wedding guests. You can book one of these directly with them.
        Please mention “Justyna + Krisz wedding 27.06.2026” when making your
        reservation to receive a discounted rate.
        <br />
        <br />
        Email info@fattoriaterranova.it or Whatsapp (+39) 081 533 02 34.
      </p>
    ),
    AGI2026: (
      <p>
        A Fattoria Terranova fenntartja a rendelkezésre álló szobákat 2025.
        december 31-ig a vendégeink számára. Közvetlenül náluk foglalhattok ezek
        közül egyet. Foglaláskor említsétek meg, hogy az esemény amire érkeztek
        "Justyna + Krisz wedding 27.06.2026", hogy kedvezményes árat kapjatok.
        <br />
        <br />
        Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
      </p>
    ),
    KS2026: (
      <p>
        Fattoria Terranova zarezerwowała dla naszych gości pulę pokoi do 31
        grudnia 2025 r. Możecie je zarezerwować kontaktując się bezpośrednio z
        hotelem. Przy rezerwacji, prosimy o powołanie się na „Justyna/Krisz
        wedding”, aby otrzymać zniżkę.
        <br />
        <br />
        Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
        <br />
        <br />
        Możecie również sprawdzić popularne platformy rezerwacyjne, aby znaleźć
        inne opcje zakwaterowania w odległości pieszej od Fattoria Terranova.
      </p>
    ),
    PL2026: (
      <p>
        Fattoria Terranova zarezerwowała dla naszych gości pulę pokoi do 31
        grudnia 2025 r. Możecie je zarezerwować kontaktując się bezpośrednio z
        hotelem. Przy rezerwacji, prosimy o powołanie się na „Justyna/Krisz
        wedding”, aby otrzymać zniżkę.
        <br />
        <br />
        Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
        <br />
        <br />
        Możecie również sprawdzić popularne platformy rezerwacyjne, aby znaleźć
        inne opcje zakwaterowania w odległości pieszej od Fattoria Terranova.
      </p>
    ),
    SD2026: (
      <p>
        Fattoria Terranova zarezerwowała dla naszych gości pulę pokoi do 31
        grudnia 2025 r. Możecie je zarezerwować kontaktując się bezpośrednio z
        hotelem. Przy rezerwacji, prosimy o powołanie się na „Justyna/Krisz
        wedding”, aby otrzymać zniżkę.
        <br />
        <br />
        Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
        <br />
        <br />
        Możecie również sprawdzić popularne platformy rezerwacyjne, aby znaleźć
        inne opcje zakwaterowania w odległości pieszej od Fattoria Terranova.
      </p>
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
        <TravelSection language={language} guestCode={guestCode} />
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
        {guestCode === "IL2026" && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/delux_room/Camera-Superior-1-1.jpg"
              alt="Stanza 1"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/Camera-Superior-2.jpg"
              alt="Stanza 1"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(16).jpg"
              alt="Garden"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(17).jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {guestCode === "AT2026" && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_112808.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_112628.jpg"
              alt="Limone"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_112643.jpg"
              alt="Limone"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113009.jpg"
              alt="Limone"
              className="gallery-image"
            />
          </div>
        )}
        {(guestCode === "KR2026" || guestCode === "PT2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/double_standard/20191008_132011.jpg"
              alt="Stanza"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/double_standard/20191008_132228.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(16).jpg"
              alt="Garden"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {(guestCode === "GB2026" || guestCode === "ER2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/junior_suites/superior_room_(43).jpg"
              alt="Mirto"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113612.jpg"
              alt="Mirto"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113515.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Terrace"
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
