import React, { useState, useEffect } from "react";
import { getRouteConfig } from "../config/routeConfig";
import flightApiService from "../services/flightApi";

const translations = {
  en: {
    travelTitle: "Travel Information",
    preferredFlights: "Recommended Flights",
    alternativeFlights: "Alternative Options",
    departure: "Departure",
    arrival: "Arrival",
    duration: "Duration",
    price: "Price",
    airline: "Airline",
    bookNow: "Book Now",
    loading: "Loading flight information...",
    noFlights: "No flights available for this route",
    route: "Route",
    outboundFlight: "Outbound Flight",
    returnFlight: "Return Flight",
    bestTimingAndCheapest: "Best Timing & Cheapest",
    bestTiming: "Best Timing",
    cheapestConnection: "Cheapest Connection",
    earliestDeparture: "Earliest Departure",
    latestReturn: "Latest Return",
    bestPrice: "Best Price",
    bestOverall: "Best Overall",
    alternative: "Alternative",
    recommended: "Recommended",
    showAllOptions: "View All Options",
    comingSoon: "Coming Soon",
    comingSoonMessage:
      "Flight information for this route will be available soon. Please check back later or contact us for assistance.",
  },
  pl: {
    travelTitle: "Informacje o podróży",
    preferredFlights: "Polecane loty",
    alternativeFlights: "Opcje alternatywne",
    departure: "Wylot",
    arrival: "Przylot",
    duration: "Czas trwania",
    price: "Cena",
    airline: "Linia lotnicza",
    bookNow: "Zarezerwuj teraz",
    loading: "Ładowanie informacji o lotach...",
    noFlights: "Brak dostępnych lotów na tej trasie",
    route: "Trasa",
    outboundFlight: "Lot wylotowy",
    returnFlight: "Lot powrotny",
    bestTimingAndCheapest: "Najlepszy czas i najtańszy",
    bestTiming: "Najlepszy czas",
    cheapestConnection: "Najtańsze połączenie",
    earliestDeparture: "Najwcześniejszy wylot",
    latestReturn: "Najpóźniejszy powrót",
    bestPrice: "Najlepsza cena",
    bestOverall: "Najlepszy ogólnie",
    alternative: "Alternatywa",
    recommended: "Polecane",
    showAllOptions: "Zobacz wszystkie opcje",
    comingSoon: "Wkrótce",
    comingSoonMessage:
      "Informacje o lotach na tej trasie będą dostępne wkrótce. Sprawdź ponownie później lub skontaktuj się z nami po pomoc.",
  },
  hu: {
    travelTitle: "Utazási információk",
    preferredFlights: "Ajánlott járatok",
    alternativeFlights: "Alternatív lehetőségek",
    departure: "Indulás",
    arrival: "Érkezés",
    duration: "Időtartam",
    price: "Ár",
    airline: "Légitársaság",
    bookNow: "Foglalás",
    loading: "Járat információk betöltése...",
    noFlights: "Nincsenek elérhető járatok ezen az útvonalon",
    route: "Útvonal",
    outboundFlight: "Odaút",
    returnFlight: "Visszaút",
    bestTimingAndCheapest: "Legjobb időzítés és legolcsóbb",
    bestTiming: "Legjobb időzítés",
    cheapestConnection: "Legolcsóbb kapcsolat",
    earliestDeparture: "Legkorábbi indulás",
    latestReturn: "Legkésőbbi visszaút",
    bestPrice: "Legjobb ár",
    bestOverall: "Legjobb összességében",
    alternative: "Alternatíva",
    recommended: "Ajánlott",
    showAllOptions: "Összes opció megtekintése",
    comingSoon: "Hamarosan",
    comingSoonMessage:
      "A járat információk hamarosan elérhetőek lesznek. Próbáld újra később, vagy lépj kapcsolatba velünk további segítségért.",
    alternativeTravelOptions: "Alternatív utazási lehetőségek",
    trainOption: "Vonat",
    carOption: "Autó",
    clickForMoreInfo: "Kattints a további információkért",
    trainOption1:
      "1. opció: a Bécs-Olaszország Nightjet hálókocsival - biztonságos, kényelmes, időhatékony",
    trainOption2: "2. opció: Velencei éjszakázással - kényelmes és festői",
    trainOption3:
      "3. opció: Bécsben éjszakázással - ugyanaz mint az 1. opció, de éjszakai megállóval",
    carOption1: "1. opció: Velencei éjszakázással - festői és kényelmes",
    carOption2: "2. opció: Bolognai éjszakázással - központi és gasztronómiai",
    carOption3: "3. opció: Firenzei éjszakázással - művészeti és kulturális",
    carRoute1Title: "1. lépés: Utazás Budapestről Velencébe",
    carRoute1Details:
      "Indulás Budapestről reggel 8:00-kor, érkezés Velencébe délután 15:00-kor. Az út 700 km és körülbelül 7 óra vezetést igényel. Az útvonal: Budapest → M7 autópálya → Szlovénia → Olaszország → Velence. A Velencei lagúna látványa lenyűgöző.",
    carRoute1Price:
      "Az útiköltség: üzemanyag ~80€, autópálya díjak ~45€, matrica ~15€. Összesen: ~140€",
    carRoute1Tips:
      "Velence autómentes város, parkolj a Tronchetto vagy Piazzale Roma parkolóban.",
    carRoute2Title: "2. lépés: Utazás Velencéből Nápolyba",
    carRoute2Details:
      "Indulás Velencéből reggel 9:00-kor, érkezés Nápolyba délután 16:00-kor. Az út 726 km és körülbelül 7 óra vezetést igényel. Az útvonal: Velence → A4 autópálya → Bologna → A1 autópálya → Firenze → Róma → Nápoly.",
    carRoute2Price:
      "Az útiköltség: üzemanyag ~85€, autópálya díjak ~50€. Összesen: ~135€",
    carRoute2Tips:
      "Az A1 Autostrada del Sole a legjobb útvonal Olaszországon keresztül. Tervezz szüneteket Bologna és Firenze mellett.",
    carVeniceHotel:
      "Hotel Antiche Figure - 3 csillagos szálloda a Santa Lucia pályaudvar közelében",
    carVeniceHotelDetails:
      "A Hotel Antiche Figure egy kényelmes 3 csillagos szálloda a Santa Lucia pályaudvar közelében. Tiszta szobák, ingyenes WiFi és barátságos személyzet. A szobák 80-150€ között mozognak éjszakánként.",
    carVeniceHotelBooking:
      "www.hotelantichefigure.it vagy +39 041 275 9486. Kiváló ár-érték arány Velencében.",
    carBolognaRoute1Title: "1. lépés: Utazás Budapestről Bolognába",
    carBolognaRoute1Details:
      "Indulás Budapestről reggel 7:00-kor, érkezés Bolognába délután 14:00-kor. Az út 650 km és körülbelül 7 óra vezetést igényel. Az útvonal: Budapest → M7 → Szlovénia → Olaszország → Bologna. Bologna Olaszország kulináris fővárosa.",
    carBolognaRoute1Price:
      "Az útiköltség: üzemanyag ~75€, autópálya díjak ~40€, matrica ~15€. Összesen: ~130€",
    carBolognaRoute1Tips:
      "Bologna központi helyzetű, ideális megálló Nápolyba vezető úton. A város híres a tortellini és mortadella készítéséről.",
    carBolognaRoute2Title: "2. lépés: Utazás Bolognából Nápolyba",
    carBolognaRoute2Details:
      "Indulás Bolognából reggel 10:00-kor, érkezés Nápolyba délután 15:00-kor. Az út 470 km és körülbelül 5 óra vezetést igényel. Az útvonal: Bologna → A1 autópálya → Firenze → Róma → Nápoly.",
    carBolognaRoute2Price:
      "Az útiköltség: üzemanyag ~60€, autópálya díjak ~35€. Összesen: ~95€",
    carBolognaRoute2Tips:
      "Az A1 autópálya Bologna és Nápoly között közvetlen kapcsolatot biztosít. Tervezz szünetet Firenzénél.",
    carBolognaHotel:
      "Hotel Metropolitan - 4 csillagos szálloda a városközpontban",
    carBolognaHotelDetails:
      "A Hotel Metropolitan egy modern 4 csillagos szálloda Bologna központjában. Kényelmes szobák, étterem és wellness központ. A szobák 90-180€ között mozognak éjszakánként.",
    carBolognaHotelBooking:
      "www.hotelmetropolitan.com vagy +39 051 229 393. Központi elhelyezkedés, jó ár-érték arány.",
    carFlorenceRoute1Title: "1. lépés: Utazás Budapestről Firenzébe",
    carFlorenceRoute1Details:
      "Indulás Budapestről reggel 6:00-kor, érkezés Firenzébe délután 13:00-kor. Az út 600 km és körülbelül 7 óra vezetést igényel. Az útvonal: Budapest → M7 → Szlovénia → Olaszország → Firenze. Firenze a reneszánsz bölcsője.",
    carFlorenceRoute1Price:
      "Az útiköltség: üzemanyag ~70€, autópálya díjak ~35€, matrica ~15€. Összesen: ~120€",
    carFlorenceRoute1Tips:
      "Firenze művészeti és kulturális kincsekkel teli város. Ideális megálló a reneszánsz művészetek megtekintésére.",
    carFlorenceRoute2Title: "2. lépés: Utazás Firenzéből Nápolyba",
    carFlorenceRoute2Details:
      "Indulás Firenzéből reggel 11:00-kor, érkezés Nápolyba délután 16:00-kor. Az út 470 km és körülbelül 5 óra vezetést igényel. Az útvonal: Firenze → A1 autópálya → Róma → Nápoly.",
    carFlorenceRoute2Price:
      "Az útiköltség: üzemanyag ~60€, autópálya díjak ~35€. Összesen: ~95€",
    carFlorenceRoute2Tips:
      "Az A1 autópálya Firenze és Nápoly között közvetlen kapcsolatot biztosít. Tervezz szünetet Rómánál.",
    carFlorenceHotel:
      "Hotel Machiavelli Palace - 3 csillagos szálloda a városközpontban",
    carFlorenceHotelDetails:
      "A Hotel Machiavelli Palace egy kellemes 3 csillagos szálloda Firenze központjában, a pályaudvar közelében. Tiszta szobák, ingyenes WiFi, reggeli és barátságos személyzet. A szobák 90-160€ között mozognak éjszakánként.",
    carFlorenceHotelBooking:
      "www.hotelmachiavelli.it vagy +39 055 216 622. Központi elhelyezkedés.",
    carTollsInfo: "Autópálya díjak és matrica",
    carTollsSlovenia:
      "<strong>Szlovénia:</strong> Matrica szükséges (7 napos: 15€, 1 hónapos: 30€)",
    carTollsItaly:
      "<strong>Olaszország:</strong> Autópálya díjak kasszánál (A1: ~35€, A4: ~15€)",
    carBorderInfo: "Határátlépések",
    carBorderSchengen:
      "Magyarország, Szlovénia és Olaszország a Schengen övezet része - útlevél nélküli utazás",
  },
};

const FlightCard = ({
  flight,
  isPreferred = false,
  flightType = null,
  language = "en",
}) => {
  const getFlightTypeLabel = () => {
    if (flightType === "best_timing_and_cheapest")
      return translations[language].bestTimingAndCheapest;
    if (flightType === "best_timing") return translations[language].bestTiming;
    if (flightType === "cheapest_connection")
      return translations[language].cheapestConnection;
    if (flightType === "earliest")
      return translations[language].earliestDeparture;
    if (flightType === "latest") return translations[language].latestReturn;
    if (flightType === "best_price") return translations[language].bestPrice;
    if (flightType === "best_overall")
      return translations[language].bestOverall;
    if (flightType === "second_best") return translations[language].alternative;
    return translations[language].recommended;
  };

  return (
    <div className={`flight-card ${isPreferred ? "preferred" : ""}`}>
      <div className="flight-header">
        <div className="airline-info">
          <span className="airline">
            {flight.airline} - {flight.returnAirline}
          </span>
          {isPreferred && (
            <span className="preferred-badge">{getFlightTypeLabel()}</span>
          )}
        </div>
        <div className="price">{flight.price}</div>
      </div>

      {/* Outbound Flight */}
      <div className="flight-section">
        <h5>
          {translations[language].outboundFlight} - {flight.airline}
        </h5>
        {flight.outboundSourceCity && flight.outboundDestinationCity && (
          <div className="city-route">
            {flight.outboundSourceCity} → {flight.outboundDestinationCity}
          </div>
        )}
        <div className="flight-details">
          <div className="time-info">
            <div className="departure">
              <span className="time">{flight.departure}</span>
              <span className="label">{translations[language].departure}</span>
            </div>
            <div className="duration">{flight.duration}</div>
            <div className="arrival">
              <span className="time">{flight.arrival}</span>
              <span className="label">{translations[language].arrival}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inbound Flight */}
      <div className="flight-section">
        <h5>
          {translations[language].returnFlight} - {flight.returnAirline}
        </h5>
        {flight.inboundFirstSourceCity &&
          flight.inboundFinalDestinationCity && (
            <div className="city-route">
              {flight.inboundFirstSourceCity} →{" "}
              {flight.inboundFinalDestinationCity}
            </div>
          )}
        <div className="flight-details">
          <div className="time-info">
            <div className="departure">
              <span className="time">{flight.returnDeparture}</span>
              <span className="label">{translations[language].departure}</span>
            </div>
            <div className="duration">{flight.returnDuration}</div>
            <div className="arrival">
              <span className="time">{flight.returnArrival}</span>
              <span className="label">{translations[language].arrival}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flight-actions">
        <a
          href={flight.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="book-button"
        >
          {translations[language].bookNow}
        </a>
      </div>
    </div>
  );
};

const TrainOptions = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const trainOptions = {
    hu: {
      option1: {
        title:
          "1. opció: a Bécs-Olaszország Nightjet hálókocsival - biztonságos, kényelmes, időhatékony",
        step1: {
          title: "1. lépés: Utazás Budapestről Bécsbe osztrák railjet vonattal",
          details:
            "Indulj a 15:40-es railjet vonattal Budapest Keleti pályaudvarról, amely 18:20-kor érkezik Bécs Hauptbahnhof-ra. A railjet vonatok étteremkocsival, minden ülésnél konnektorokkal és ingyenes WiFi-vel is rendelkeznek. Az 1. osztályon és business osztályon a pincér rendelést is felvesz és kiszolgálja az utasokat a helyükön.",
          price:
            "Az árak 19,90€-tól kezdődnek a 2. osztályon, 29,90€ az 1. osztályon vagy 44,90€ a business osztályon (prémium 1. osztály). Az árak változnak, ugyanúgy mint a repülőjegyek, ezért foglalj időben.",
          booking:
            "Foglalj erre a vonatra a www.thetrainline.com oldalon (könnyű használat, €, £ vagy $, nemzetközi bankkártyák nem problémásak, kis foglalási díj. A foglalás 6 hónappal előre elérhető). Vagy foglalhatsz a www.mavcsoport.hu oldalán is (MAV-nál csak 60 nappal előre nyílik meg a foglalás).",
        },
        step2: {
          title:
            "2. lépés: Utazás Bécsből Olaszországba Nightjet hálókocsi vonattal",
          details:
            "A Nightjet minden este 19:18-kor indul Bécs Hauptbahnhof-ról, foglalj arra a részre, ami Bologna Centrale-re 05:38-kor, Firenze Campo di Marte-re 06:48-kor és Róma Tiburtina-ra 10:05-kor érkezik. Szállj át vagy Bolognában vagy Rómában a tovább utazáshoz Nápolyba. A Nightjet Bolognába, Firenzébe és Rómába egy új generációs vonat 1 és 2 ágyas hálókocsikkal zuhanyzóval és WC-vel, vagy 4 ágyas hálókocsikkal, egyéni mini kabinokkal és hagyományos ülésekkel.",
          price:
            "Az új generációs Nightjet árai 59,90€-tól kezdődnek mini kabinban vagy 4 ágyas hálókocsiban, 109,90€ 2 ágyas hálókocsiban vagy 159,90€ egyágyas hálókocsiban. Az árak változnak, mint a repülőjegyek, ezért foglalj időben.",
          booking:
            "Foglalj erre a vonatra a www.thetrainline.com oldalon (€, £ vagy $, nemzetközi bankkártyák nem problémásak, kis foglalási díj) vagy az Osztrák Államvasutak saját oldalán www.oebb.at (ugyanazok az árak, bonyolultabb, €-ban). A foglalás 6 hónappal előre nyílik meg.",
        },
        step3: {
          title: "3. lépés: Továbbutazás Rómából Nápolyba",
          details:
            "Külön foglalható a www.thetrainline.com oldalon (könnyű használat, angol helyneveket is felismer, kis foglalási díj) vagy a www.italiarail.com oldalon (könnyű használat, angol helyneveket is felismer, a kis foglalási díjat visszafizetik, ha emailt küldesz nekik a seat61@italiarail.com címre a PNR-rel) vagy az Olasz Államvasutak saját oldalán www.trenitalia.com (bonyolultabb használat, olasz nyelvű helyneveket igényel).",
          note: "Javaslom hogy hagyj legalább egy órát a nightjet érkezése és bármely további vonat között. Az olasz vonatok 4 hónappal előre nyílnak meg foglalásra.",
        },
      },
      option2: {
        title: "2. opció: Velencei éjszakázással - kényelmes és festői",
        step1: {
          title: "1. lépés: Utazás Budapestről Bécsbe railjet vonattal",
          details:
            "Indulj Budapest Keleti pályaudvarról 07:40-kor, érkezés Bécs Hauptbahnhof-ra 10:20-kor. Az osztrák railjet vonat étteremkocsival, minden ülésnél konnektorokkal és ingyenes WiFi-vel is rendelkezik.",
          price:
            "Az árak 19,90€-tól kezdődnek a 2. osztályon, 29,90€ az 1. osztályon vagy 44,90€ a business osztályon (prémium 1. osztály). Az árak változnak, mint a repülőjegyek, ezért foglalj időben.",
          booking:
            "Foglalj erre a vonatra a www.thetrainline.com oldalon, a legkönnyebb használat, €, £ vagy $, kis foglalási díj, a foglalás 6 hónappal előre nyílik meg. Vagy foglalhatsz a www.mavcsoport.hu oldalán is, bonyolultabb, csak 60 nappal előre nyílik meg a foglalás.",
        },
        step2: {
          title: "2. lépés: Utazás Bécsből Velencébe railjet vonattal",
          details:
            "Indulás Bécs Hauptbahnhof-ról 12:24-kor, érkezés Velence Santa Lucia-ra 20:04-kor. Ez a vonat a gyönyörűen festői UNESCO világörökségi Semmering vasútvonalat használja Bécstől Grazig, egy igazi élmény. Az légkondicionált osztrák railjet vonat étteremkocsival, minden ülésnél konnektorokkal és ingyenes WiFi-vel is rendelkezik. az 1. osztályon és business osztályon a pincér rendelést is felvesz és kiszolgálja az utasokat a helyükön.",
          price:
            "Az árak 28,30€-tól kezdődnek a 2. osztályon, 56,60€ az 1. osztályon vagy 71,60€ a business osztályon (prémium 1. osztály). Az árak változnak, mint a repülőjegyek, ezért foglalj időben.",
          booking:
            "Foglalj erre a vonatra a www.thetrainline.com oldalon (könnyű használat, €, £ vagy $, nemzetközi bankkártyák nem problémásak, kis foglalási díj) vagy az Osztrák Államvasutak oldalán www.oebb.at (€-ban, ugyanazok az árak). A foglalás 6 hónappal előre nyílik meg.",
        },
        step3: {
          title: "3. lépés: Másnap vonattal Velencéből Nápolyba",
          details:
            "Indulás vonattal Velence Santa Lucia pályaudvarról Nápolyba. Nézd meg a menetrendet és vedd meg a jegyeket a www.thetrainline.com oldalon (legkönnyebb használat, €, £ vagy $, külföldi kártyák nem problémásak, kis foglalási díj) vagy a Trenitalia www.trenitalia.com oldalán (€-ban, bonyolultabb, ugyanazok az árak). A foglalás 6 hónappal előre nyílik meg.",
        },
      },
      option3: {
        title:
          "3. opció: Bécsben éjszakázással - ugyanaz mint az 1. opció, de éjszakai megállóval",
        day1: {
          title: "1. nap: Utazás Budapestről Bécsbe railjet vonattal",
          details:
            "Indulás Budapest Keleti pályaudvarról 17:40-kor, érkezés Bécs Hauptbahnhof-ra 20:20-kor. Vagy foglalj egy korábbi vonatot hogy több időd legyen Bécsben. A railjet vonatok étteremkocsival, minden ülésnél konnektorokkal és ingyenes WiFi-vel is rendelkeznek.",
          price:
            "Az árak 19,90€-tól kezdődnek a 2. osztályon, 29,90€ az 1. osztályon vagy 44,90€ a business osztályon (prémium 1. osztály). Az árak változnak, mint a repülőjegyek, ezért foglalj időben.",
          booking:
            "Foglalj a www.thetrainline.com oldalon, legkönnyebb használat, €, £ vagy $, kis foglalási díj, a foglalás 6 hónappal előre nyílik meg. Foglalhatsz az Osztrák Államvasutak www.oebb.at oldalán is (ugyanazok az árak, €-ban) vagy a www.mavcsoport.hu oldalán, bonyolultabb, forintban, csak 60 nappal előre nyílik meg a foglalás.",
        },
        day2: {
          title:
            "2. nap: Utazás Bécsből Velencébe majd Nápolyba railjet vonattal",
          details:
            "Indulás Bécs Hauptbahnhof-ról 06:24-kor, érkezés Velence Santa Lucia-ra 14:14-kor majd Velence Santa Lucia pályaudvarról Nápolyba. Korai indulás, de ez a vonat a csodálatosan festői UNESCO világörökségi Semmering útvonalon halad Ausztrián keresztül Grazon, ülj hátra és élvezd az utat. Van étteremkocsi, minden ülésnél konnektorok és ingyenes WiFi. Az 1. osztályon és business osztályon a pincér rendelést is felvesz és kiszolgálja az utasokat a helyükön.",
          price:
            "Az árak 28,30€-tól kezdődnek a 2. osztályon, 56,60€ az 1. osztályon vagy 71,60€ a business osztályon (prémium 1. osztály). Az árak változnak, mint a repülőjegyek.",
          booking:
            "Foglalj erre a vonatra a www.thetrainline.com oldalon (könnyű használat, €, £ vagy $, kis foglalási díj) vagy az Osztrák Államvasutak www.oebb.at oldalán (bonyolultabb, €-ban, ugyanazok az árak). A foglalás 6 hónappal előre nyílik meg.",
        },
      },
    },
  };

  const options = trainOptions[language] || trainOptions.hu;

  return (
    <div className="train-options">
      <div
        className="train-option-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
      >
        <h4>{translations[language].trainOption}</h4>
        <span className="click-hint">
          {translations[language].clickForMoreInfo}
        </span>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="train-options-content">
          <div className="train-option">
            <h5>{options.option1.title}</h5>
            <div className="train-step">
              <h6>{options.option1.step1.title}</h6>
              <p>{options.option1.step1.details}</p>
              <p>
                <strong>Ár:</strong> {options.option1.step1.price}
              </p>
              <p>
                <strong>Foglalás:</strong> {options.option1.step1.booking}
              </p>
            </div>
            <div className="train-step">
              <h6>{options.option1.step2.title}</h6>
              <p>{options.option1.step2.details}</p>
              <p>
                <strong>Ár:</strong> {options.option1.step2.price}
              </p>
              <p>
                <strong>Foglalás:</strong> {options.option1.step2.booking}
              </p>
            </div>
            <div className="train-step">
              <h6>{options.option1.step3.title}</h6>
              <p>{options.option1.step3.details}</p>
              <p>
                <strong>Megjegyzés:</strong> {options.option1.step3.note}
              </p>
            </div>
          </div>

          <div className="train-option">
            <h5>{options.option2.title}</h5>
            <div className="train-step">
              <h6>{options.option2.step1.title}</h6>
              <p>{options.option2.step1.details}</p>
              <p>
                <strong>Ár:</strong> {options.option2.step1.price}
              </p>
              <p>
                <strong>Foglalás:</strong> {options.option2.step1.booking}
              </p>
            </div>
            <div className="train-step">
              <h6>{options.option2.step2.title}</h6>
              <p>{options.option2.step2.details}</p>
              <p>
                <strong>Ár:</strong> {options.option2.step2.price}
              </p>
              <p>
                <strong>Foglalás:</strong> {options.option2.step2.booking}
              </p>
            </div>
            <div className="train-step">
              <h6>{options.option2.step3.title}</h6>
              <p>{options.option2.step3.details}</p>
            </div>
          </div>

          <div className="train-option">
            <h5>{options.option3.title}</h5>
            <div className="train-step">
              <h6>{options.option3.day1.title}</h6>
              <p>{options.option3.day1.details}</p>
              <p>
                <strong>Ár:</strong> {options.option3.day1.price}
              </p>
              <p>
                <strong>Foglalás:</strong> {options.option3.day1.booking}
              </p>
            </div>
            <div className="train-step">
              <h6>{options.option3.day2.title}</h6>
              <p>{options.option3.day2.details}</p>
              <p>
                <strong>Ár:</strong> {options.option3.day2.price}
              </p>
              <p>
                <strong>Foglalás:</strong> {options.option3.day2.booking}
              </p>
            </div>
          </div>

          <div className="source-info">
            <p>
              <strong>Forrás:</strong>{" "}
              <a
                href="https://www.seat61.com/international-trains/trains-from-Budapest.htm#Budapest-Italy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Seat61.com - Trains from Budapest
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const CarOption = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="car-option">
      <div
        className="car-option-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
      >
        <h4>{translations[language].carOption}</h4>
        <span className="click-hint">
          {translations[language].clickForMoreInfo}
        </span>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="train-options-content">
          {/* Option 1: Venice */}
          <div className="train-option">
            <h5>{translations[language].carOption1}</h5>
            <div className="train-step">
              <h6>{translations[language].carRoute1Title}</h6>
              <p>{translations[language].carRoute1Details}</p>
              <p>
                <strong>Ár:</strong> {translations[language].carRoute1Price}
              </p>
              <p>
                <strong>Tippek:</strong> {translations[language].carRoute1Tips}
              </p>
            </div>
            <div className="train-step">
              <h6>{translations[language].carRoute2Title}</h6>
              <p>{translations[language].carRoute2Details}</p>
              <p>
                <strong>Ár:</strong> {translations[language].carRoute2Price}
              </p>
              <p>
                <strong>Tippek:</strong> {translations[language].carRoute2Tips}
              </p>
            </div>
            <div className="train-step">
              <h6>{translations[language].carVeniceHotel}</h6>
              <p>{translations[language].carVeniceHotelDetails}</p>
              <p>
                <strong>Foglalás:</strong>{" "}
                {translations[language].carVeniceHotelBooking}
              </p>
            </div>
          </div>

          {/* Option 2: Bologna */}
          <div className="train-option">
            <h5>{translations[language].carOption2}</h5>
            <div className="train-step">
              <h6>{translations[language].carBolognaRoute1Title}</h6>
              <p>{translations[language].carBolognaRoute1Details}</p>
              <p>
                <strong>Ár:</strong>{" "}
                {translations[language].carBolognaRoute1Price}
              </p>
              <p>
                <strong>Tippek:</strong>{" "}
                {translations[language].carBolognaRoute1Tips}
              </p>
            </div>
            <div className="train-step">
              <h6>{translations[language].carBolognaRoute2Title}</h6>
              <p>{translations[language].carBolognaRoute2Details}</p>
              <p>
                <strong>Ár:</strong>{" "}
                {translations[language].carBolognaRoute2Price}
              </p>
              <p>
                <strong>Tippek:</strong>{" "}
                {translations[language].carBolognaRoute2Tips}
              </p>
            </div>
            <div className="train-step">
              <h6>{translations[language].carBolognaHotel}</h6>
              <p>{translations[language].carBolognaHotelDetails}</p>
              <p>
                <strong>Foglalás:</strong>{" "}
                {translations[language].carBolognaHotelBooking}
              </p>
            </div>
          </div>

          {/* Option 3: Florence */}
          <div className="train-option">
            <h5>{translations[language].carOption3}</h5>
            <div className="train-step">
              <h6>{translations[language].carFlorenceRoute1Title}</h6>
              <p>{translations[language].carFlorenceRoute1Details}</p>
              <p>
                <strong>Ár:</strong>{" "}
                {translations[language].carFlorenceRoute1Price}
              </p>
              <p>
                <strong>Tippek:</strong>{" "}
                {translations[language].carFlorenceRoute1Tips}
              </p>
            </div>
            <div className="train-step">
              <h6>{translations[language].carFlorenceRoute2Title}</h6>
              <p>{translations[language].carFlorenceRoute2Details}</p>
              <p>
                <strong>Ár:</strong>{" "}
                {translations[language].carFlorenceRoute2Price}
              </p>
              <p>
                <strong>Tippek:</strong>{" "}
                {translations[language].carFlorenceRoute2Tips}
              </p>
            </div>
            <div className="train-step">
              <h6>{translations[language].carFlorenceHotel}</h6>
              <p>{translations[language].carFlorenceHotelDetails}</p>
              <p>
                <strong>Foglalás:</strong>{" "}
                {translations[language].carFlorenceHotelBooking}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="train-step">
            <h6>{translations[language].carTollsInfo}</h6>
            <p
              dangerouslySetInnerHTML={{
                __html: translations[language].carTollsSlovenia,
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: translations[language].carTollsItaly,
              }}
            />
          </div>

          <div className="train-step">
            <h6>{translations[language].carBorderInfo}</h6>
            <p>{translations[language].carBorderSchengen}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const TravelSection = ({ language, guestCode }) => {
  const [currentRoute, setCurrentRoute] = useState(getRouteConfig(guestCode));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFlights = async () => {
      // Hungarian guests with real flight data
      const hungarianGuests = [
        "IL2026",
        "AT2026",
        "KR2026",
        "GB2026",
        "ER2026",
        "PT2026",
        "AGI2026",
      ];

      // UK guests (edge cases)
      const ukGuests = ["SD2026"];
      
      // UK guests from Manchester
      const manchesterGuests = ["HG2026", "SM2026"];
      
      // French guests
      const frenchGuests = ["PR2026", "YN2026"];
      
      // Portuguese guest
      const portugueseGuests = ["GA2026"];
      
      const isPolishGuest =
        (language === "pl" ||
          (typeof guestCode === "string" &&
            guestCode.toUpperCase().startsWith("PL"))) &&
        guestCode !== "SD2026"; // SD2026 is a UK guest, not Polish

      if (hungarianGuests.includes(guestCode)) {
        setIsLoading(true);
        try {
          const flights = await flightApiService.getFlights(
            "BUD",
            "NAP",
            "2026-06-26", // Back to original wedding dates
            "2026-06-28", // Back to original wedding dates
            1,
            guestCode
          );

          // Update the route with real flight data or coming soon message
          setCurrentRoute((prevRoute) => ({
            ...prevRoute,
            origin: "Poland",
            originCode: "PL",
            destination: "Italy",
            destinationCode: "IT",
            preferredFlights: flights.preferredFlights || [],
            alternativeFlights: flights.alternativeFlights || [],
            comingSoon: flights.comingSoon || false,
            message: flights.message || null,
          }));
        } catch (error) {
          console.error("Error loading flights:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (frenchGuests.includes(guestCode)) {
        setIsLoading(true);
        try {
          const flights = await flightApiService.getFlights(
            "FR",
            "IT",
            "2026-06-26",
            "2026-06-28",
            1,
            guestCode,
            {
              sourceCities:
                "City:paris_fr",
              destinationCities: "City:naples_it",
              currency: "eur",
            }
          );

          setCurrentRoute((prevRoute) => ({
            ...prevRoute,
            origin: "France",
            originCode: "FR",
            destination: "Italy",
            destinationCode: "IT",
            preferredFlights: flights.preferredFlights || [],
            alternativeFlights: flights.alternativeFlights || [],
            comingSoon: flights.comingSoon || false,
            message: flights.message || null,
          }));
        } catch (error) {
          console.error("Error loading flights:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (portugueseGuests.includes(guestCode)) {
        setIsLoading(true);
        try {
          const flights = await flightApiService.getFlights(
            "PT",
            "IT",
            "2026-06-26",
            "2026-06-28",
            1,
            guestCode,
            {
              sourceCities:
                "City:lisbon_pt",
              destinationCities: "City:naples_it",
              currency: "eur",
            }
          );

          setCurrentRoute((prevRoute) => ({
            ...prevRoute,
            origin: "Portugal",
            originCode: "PT",
            destination: "Italy",
            destinationCode: "IT",
            preferredFlights: flights.preferredFlights || [],
            alternativeFlights: flights.alternativeFlights || [],
            comingSoon: flights.comingSoon || false,
            message: flights.message || null,
          }));
        } catch (error) {
          console.error("Error loading flights:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (manchesterGuests.includes(guestCode)) {
        setIsLoading(true);
        try {
          const flights = await flightApiService.getFlights(
            "UK",
            "IT",
            "2026-06-25",
            "2026-06-29",
            1,
            guestCode,
            {
              sourceCities:
                "City:manchester_gb",
              destinationCities: "City:naples_it",
              currency: "gbp",
            }
          );

          setCurrentRoute((prevRoute) => ({
            ...prevRoute,
            origin: "United Kingdom",
            originCode: "UK",
            destination: "Italy",
            destinationCode: "IT",
            preferredFlights: flights.preferredFlights || [],
            alternativeFlights: flights.alternativeFlights || [],
            comingSoon: flights.comingSoon || false,
            message: flights.message || null,
          }));
        } catch (error) {
          console.error("Error loading flights:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (isPolishGuest) {
        setIsLoading(true);
        try {
          const flights = await flightApiService.getFlights(
            "PL",
            "IT",
            "2026-06-26",
            "2026-06-28",
            1,
            guestCode,
            {
              sourceCities:
                "City:poznan_pl,City:warsaw_pl,City:katowice_pl,City:gdansk_pl,City:wroclaw_pl,City:berlin_de",
              destinationCities: "City:naples_it,City:rome_it",
              currency: "pln",
            }
          );

          setCurrentRoute((prevRoute) => ({
            ...prevRoute,
            preferredFlights: flights.preferredFlights || [],
            alternativeFlights: flights.alternativeFlights || [],
            comingSoon: flights.comingSoon || false,
            message: flights.message || null,
          }));
        } catch (error) {
          console.error("Error loading flights:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (ukGuests.includes(guestCode)) {
        // For UK guests, show coming soon message (edge case)
        setCurrentRoute((prevRoute) => ({
          ...prevRoute,
          origin: "United Kingdom",
          originCode: "UK",
          destination: "Italy",
          destinationCode: "IT",
          preferredFlights: [],
          alternativeFlights: [],
          comingSoon: true,
          message:
            "Flight information for this route will be available soon. Please check back later or contact us for assistance.",
        }));
      } else {
        // For non-Hungarian guests, show coming soon message
        setCurrentRoute((prevRoute) => ({
          ...prevRoute,
          preferredFlights: [],
          alternativeFlights: [],
          comingSoon: true,
          message:
            "Flight information for this route will be available soon. Please check back later or contact us for assistance.",
        }));
      }
    };

    loadFlights();
  }, [guestCode, language]);

  const renderFlights = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <p>{translations[language].loading}</p>
        </div>
      );
    }

    return renderFlightsContent();
  };

  const renderFlightsContent = () => {
    return (
      <div className="flights-container">
        {/* Flight Section */}
        {(() => {
          // Check if this is a "coming soon" response
          if (currentRoute.comingSoon) {
            return (
              <div className="coming-soon">
                <h3>{translations[language].comingSoon}</h3>
                <p>{translations[language].comingSoonMessage}</p>
              </div>
            );
          }

          const hasFlights =
            currentRoute.preferredFlights.length > 0 ||
            currentRoute.alternativeFlights.length > 0;

          if (!hasFlights) {
            return (
              <div className="no-flights">
                <p>{translations[language].noFlights}</p>
              </div>
            );
          }

          return (
            <>
              <div className="route-header">
                <h3>
                  {translations[language].route}:{" "}
                  {(() => {
                    // Check for Manchester guests first (even if language is Hungarian)
                    if (currentRoute.originCode === "UK" || guestCode === "HG2026" || guestCode === "SM2026") {
                      if (language === "hu") {
                        return "Manchester → Nápoly";
                      }
                      return "Manchester → Naples";
                    }
                    if (language === "hu") {
                      return "Budapest → Nápoly";
                    }
                    if (language === "pl") {
                      return "Polska → Włochy";
                    }
                    if (language === "en" && (currentRoute.originCode === "FR")) {
                      return "Paris → Naples";
                    }
                    if (language === "en" && (currentRoute.originCode === "PT")) {
                      return "Lisbon → Naples";
                    }
                    return `${currentRoute.origin} → ${currentRoute.destination}`;
                  })()}
                </h3>
                <span className="route-codes">
                  {(() => {
                    // Check for Manchester guests first (even if language is Hungarian)
                    if (currentRoute.originCode === "UK" || guestCode === "HG2026" || guestCode === "SM2026") {
                      return "(MAN → NAP)";
                    }
                    if (language === "hu") {
                      return "(BUD → NAP)";
                    }
                    if (language === "pl") {
                      return "(PL → IT)";
                    }
                    if (language === "en" && (currentRoute.originCode === "FR")) {
                      return "(CDG/ORY → NAP)";
                    }
                    if (language === "en" && (currentRoute.originCode === "PT")) {
                      return "(LIS → NAP)";
                    }
                    return `(${currentRoute.originCode} → ${currentRoute.destinationCode})`;
                  })()}
                </span>
              </div>

              {currentRoute.preferredFlights.length > 0 && (
                <div className="flight-section">
                  <h4>{translations[language].preferredFlights}</h4>
                  <div className="flight-grid">
                    {currentRoute.preferredFlights
                      .slice(0, 2)
                      .map((flight, index) => (
                        <FlightCard
                          key={flight.id}
                          flight={flight}
                          isPreferred={true}
                          flightType={
                            flight.combinationType ||
                            (index === 0 ? "earliest" : "latest")
                          }
                          language={language}
                        />
                      ))}
                  </div>

                  {/* View All Options Button */}
                  <div className="view-all-options">
                    <a
                      href={(() => {
                        const isPolishGuestLink =
                          (language === "pl" ||
                            (typeof guestCode === "string" &&
                              guestCode.toUpperCase().startsWith("PL"))) &&
                          guestCode !== "SD2026"; // SD2026 is a UK guest, not Polish
                        const isFrenchGuestLink = ["PR2026", "YN2026"].includes(guestCode);
                        const isPortugueseGuestLink = ["GA2026"].includes(guestCode);
                        const isManchesterGuestLink = ["HG2026", "SM2026"].includes(guestCode);
                        if (isPolishGuestLink) {
                          return `https://www.kiwi.com/en/search/results/poznan-poland,warsaw-poland,katowice-poland,gdansk-poland,wroclaw-poland,berlin-germany/naples-italy,rome-italy/2026-06-26/2026-06-28?adults=1&currency=pln`;
                        }
                        if (isFrenchGuestLink) {
                          return `https://www.kiwi.com/en/search/results/paris-france/naples-italy/2026-06-26/2026-06-28?adults=1&currency=eur`;
                        }
                        if (isPortugueseGuestLink) {
                          return `https://www.kiwi.com/en/search/results/lisbon-portugal/naples-italy/2026-06-26/2026-06-28?adults=1&currency=eur`;
                        }
                        if (isManchesterGuestLink) {
                          return `https://www.kiwi.com/en/search/results/manchester-united-kingdom/naples-italy/2026-06-25/2026-06-29?adults=1&currency=gbp`;
                        }
                        return `https://www.kiwi.com/en/search/results/budapest-hungary/naples-italy/2026-06-26/2026-06-28?adults=1&currency=huf`;
                      })()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-all-button"
                    >
                      {translations[language].showAllOptions}
                    </a>
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
    );
  };

  // Check if this is a Hungarian guest
  const hungarianGuests = [
    "IL2026",
    "AT2026",
    "KR2026",
    "GB2026",
    "ER2026",
    "PT2026",
    "AGI2026",
  ];
  const isHungarianGuest = hungarianGuests.includes(guestCode);

  return (
    <div className="travel-section">
      <h2>{translations[language].travelTitle}</h2>
      {renderFlights()}

      {/* Alternative Travel Options for Hungarian guests only - Always shown */}
      {isHungarianGuest && language === "hu" && (
        <div className="alternative-travel-section">
          <h4>{translations[language].alternativeTravelOptions}</h4>
          <div className="alternative-options-grid">
            <TrainOptions language={language} />
            <CarOption language={language} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelSection;
