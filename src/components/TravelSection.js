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

const TravelSection = ({ language, guestCode }) => {
  const [currentRoute, setCurrentRoute] = useState(getRouteConfig(guestCode));
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

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
        setApiError(null);
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
          setApiError(error.message);
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
