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
    carOptionTitle: "Autóval utazás",
    carOptionDescription:
      "Autóval utazás részletei hamarosan elérhetőek lesznek.",
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
        <div className="car-option-content">
          <h5>{translations[language].carOptionTitle}</h5>
          <p>{translations[language].carOptionDescription}</p>
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
  }, [guestCode]);

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
      <div className="flights-container">
        <div className="route-header">
          <h3>
            {translations[language].route}: {currentRoute.origin} →{" "}
            {currentRoute.destination}
          </h3>
          <span className="route-codes">
            ({currentRoute.originCode} → {currentRoute.destinationCode})
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
                href={`https://www.kiwi.com/en/search/results/budapest-hungary/naples-italy/2026-06-26/2026-06-28?adults=1&currency=huf`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-all-button"
              >
                {translations[language].showAllOptions}
              </a>
            </div>
          </div>
        )}

        {/* Alternative Travel Options for Hungarian guests only */}
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

  return (
    <div className="travel-section">
      <h2>{translations[language].travelTitle}</h2>
      {renderFlights()}
    </div>
  );
};

export default TravelSection;
