// Flight API Service
// This service provides methods to interact with flight search APIs
// Uses real Kiwi API for Hungarian guests, mock data for others

import axios from "axios";

// Configuration for different APIs
const API_CONFIG = {
  // Kiwi.com API via RapidAPI
  kiwi: {
    baseUrl: "https://kiwi-com-cheap-flights.p.rapidapi.com",
    apiKey: "5476089c0fmsh13c007164d5429dp166b37jsnb066c6dfa828",
    endpoints: {
      roundTrip: "/round-trip",
    },
  },
};

class FlightApiService {
  constructor() {
    this.currentApi = "kiwi";
  }

  // Attempt to normalize display city names from various sources
  normalizeCityName(name) {
    if (!name || typeof name !== "string") return "";
    const n = name.toLowerCase();
    if (/poznan|poznań/.test(n)) return "Poznań";
    if (/warsaw|warszawa/.test(n)) return "Warsaw";
    if (/katowice/.test(n)) return "Katowice";
    if (/gdansk|gdańsk/.test(n)) return "Gdańsk";
    if (/wroclaw|wrocław/.test(n)) return "Wrocław";
    if (/naples|napoli/.test(n)) return "Naples";
    if (/rome|roma/.test(n)) return "Rome";
    // Try to extract first token for airport names like "Naples International Airport"
    const firstWord = name.split(/[,\s-]+/)[0];
    if (firstWord && firstWord.length >= 3) {
      return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    }
    return name;
  }

  // Set the API to use
  setApi(apiName) {
    this.currentApi = apiName;
  }

  // Get flights for a specific route
  async getFlights(
    origin,
    destination,
    departureDate,
    returnDate = null,
    passengers = 1,
    guestCode = null,
    options = {}
  ) {
    try {
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

      const isPolishGuest =
        typeof guestCode === "string" &&
        guestCode.toUpperCase().startsWith("PL");

      // French guests
      const frenchGuests = ["PR2026", "YN2026"];

      // Portuguese guest
      const portugueseGuests = ["GA2026"];

      // UK guests from Manchester
      const manchesterGuests = ["HG2026", "SM2026"];

      if (
        hungarianGuests.includes(guestCode) &&
        origin.toUpperCase() === "BUD"
      ) {
        try {
          return await this.searchKiwiRapidAPI(
            origin,
            destination,
            departureDate,
            returnDate,
            passengers,
            {
              locale: "hu",
            }
          );
        } catch (error) {
          console.error(
            "Kiwi API failed, falling back to coming soon message:",
            error
          );
          // Fall through to coming soon message
        }
      }

      // French guests with real flight data from Paris to Naples
      if (frenchGuests.includes(guestCode)) {
        try {
          const sourceCities = options.sourceCities || "City:paris_fr";
          const destinationCities =
            options.destinationCities || "City:naples_it";
          return await this.searchKiwiRapidAPI(
            origin,
            destination,
            departureDate,
            returnDate,
            passengers,
            {
              sourceCities,
              destinationCities,
              currency: options.currency || "eur",
              locale: options.locale || "en",
              isFrenchSearch: true,
            }
          );
        } catch (error) {
          console.error(
            "Kiwi API failed for French guests, falling back to coming soon:",
            error
          );
          // Fall through to coming soon message
        }
      }

      // Portuguese guest with real flight data from Lisbon to Naples
      if (portugueseGuests.includes(guestCode)) {
        try {
          const sourceCities = options.sourceCities || "City:lisbon_pt";
          const destinationCities =
            options.destinationCities || "City:naples_it";
          return await this.searchKiwiRapidAPI(
            origin,
            destination,
            departureDate,
            returnDate,
            passengers,
            {
              sourceCities,
              destinationCities,
              currency: options.currency || "eur",
              locale: options.locale || "en",
              isPortugueseSearch: true,
            }
          );
        } catch (error) {
          console.error(
            "Kiwi API failed for Portuguese guest, falling back to coming soon:",
            error
          );
          // Fall through to coming soon message
        }
      }

      // UK guests from Manchester with real flight data
      if (manchesterGuests.includes(guestCode)) {
        try {
          const sourceCities = options.sourceCities || "City:manchester_gb";
          const destinationCities =
            options.destinationCities || "City:naples_it";
          return await this.searchKiwiRapidAPI(
            origin,
            destination,
            departureDate,
            returnDate,
            passengers,
            {
              sourceCities,
              destinationCities,
              currency: options.currency || "gbp",
              locale: options.locale || "en",
              isManchesterSearch: true,
            }
          );
        } catch (error) {
          console.error(
            "Kiwi API failed for Manchester guests, falling back to coming soon:",
            error
          );
          // Fall through to coming soon message
        }
      }

      // Polish guests with real flight data from multiple source/destination cities
      if (isPolishGuest) {
        try {
          const sourceCities =
            options.sourceCities ||
            "City:poznan_pl,City:warsaw_pl,City:katowice_pl,City:gdansk_pl,City:wroclaw_pl,City:berlin_de";
          const destinationCities =
            options.destinationCities || "City:naples_it,City:rome_it";
          return await this.searchKiwiRapidAPI(
            origin,
            destination,
            departureDate,
            returnDate,
            passengers,
            {
              sourceCities,
              destinationCities,
              currency: options.currency || "pln",
              locale: "pl",
              isPolishSearch: true,
            }
          );
        } catch (error) {
          console.error(
            "Kiwi API failed for Polish guests, falling back to coming soon:",
            error
          );
          // Fall through to coming soon message
        }
      }

      // If explicit multi-city options are provided, perform search regardless of guest code
      if (options && (options.sourceCities || options.destinationCities)) {
        try {
          const sourceCities = options.sourceCities || "City:budapest_hu";
          const destinationCities =
            options.destinationCities || "City:naples_it";
          return await this.searchKiwiRapidAPI(
            origin,
            destination,
            departureDate,
            returnDate,
            passengers,
            {
              sourceCities,
              destinationCities,
              currency: options.currency,
              locale: options.locale || "en",
            }
          );
        } catch (error) {
          console.error(
            "Kiwi API failed for multi-city options, falling back to coming soon:",
            error
          );
          // Fall through to coming soon message
        }
      }

      // Use "coming soon" message for other guests
      return await this.getComingSoonFlights(
        origin,
        destination,
        departureDate,
        returnDate,
        passengers
      );
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Fallback to coming soon message on error
      return await this.getComingSoonFlights(
        origin,
        destination,
        departureDate,
        returnDate,
        passengers
      );
    }
  }

  // Coming soon message for guests without flight data yet
  async getComingSoonFlights(
    origin,
    destination,
    departureDate,
    returnDate,
    passengers
  ) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      preferredFlights: [],
      alternativeFlights: [],
      comingSoon: true,
      message:
        "Flight information for this route will be available soon. Please check back later or contact us for assistance.",
    };
  }

  // Kiwi.com API via RapidAPI implementation
  async searchKiwiRapidAPI(
    origin,
    destination,
    departureDate,
    returnDate,
    passengers,
    extra = {}
  ) {
    const config = API_CONFIG.kiwi;

    if (!config.apiKey) {
      throw new Error("Kiwi API key not configured");
    }

    const selectedCurrency = (extra.currency || "huf").toLowerCase();
    const locale = extra.locale || "en"; // Default to English if no locale specified

    const params = {
      source: extra.sourceCities || "City:budapest_hu",
      destination: extra.destinationCities || "City:naples_it",
      currency: selectedCurrency,
      adults: passengers,
      transportTypes: "FLIGHT",
      contentProviders: "FLIXBUS_DIRECTS,FRESH,KAYAK,KIWI",
      limit: 20,
      locale: locale,
      inboundDepartureDateStart: `${returnDate}T00:00:00`,
      inboundDepartureDateEnd: `${returnDate}T23:59:59`,
      outboundDepartureDateStart: `${departureDate}T00:00:00`,
      outboundDepartureDateEnd: `${departureDate}T23:59:59`,
    };

    // Add direct flight only parameters for Portuguese guest
    if (extra.isPortugueseSearch) {
      params.allowChangeInboundDestination = "false";
      params.allowChangeInboundSource = "false";
      params.allowChangeOutboundDestination = "false";
      params.allowChangeOutboundSource = "false";
      params.enableSelfTransfer = "false";
      console.log("Portuguese search: Adding direct flight only parameters", params);
    }

    const options = {
      method: "GET",
      url: `${config.baseUrl}${config.endpoints.roundTrip}`,
      params: params,
      headers: {
        "x-rapidapi-key": config.apiKey,
        "x-rapidapi-host": "kiwi-com-cheap-flights.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      const searchData = response.data;
      const parsed = this.parseKiwiRapidAPIResults(
        searchData,
        selectedCurrency,
        extra
      );
      return parsed;
    } catch (error) {
      console.error("Kiwi API error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      throw error;
    }
  }

  // Parse Kiwi RapidAPI results
  parseKiwiRapidAPIResults(data, currency = "huf", context = {}) {
    try {
      const preferredFlights = [];
      const alternativeFlights = [];
      const allFlights = [];

      // Check for subscription error
      if (data && data.message && data.message.includes("not subscribed")) {
        console.error("Kiwi API subscription error:", data.message);
        throw new Error("API subscription required");
      }

      // Handle the actual response structure from Kiwi API
      let flights = [];

      if (data && data.itineraries && Array.isArray(data.itineraries)) {
        flights = data.itineraries;
        console.log("Full API response:", data);
        // Log the structure of the first flight to understand the data format
        if (flights.length > 0) {
          console.log("First flight structure:", flights[0]);
          if (
            flights[0].outbound &&
            flights[0].outbound.sectorSegments &&
            flights[0].outbound.sectorSegments.length > 0
          ) {
            console.log(
              "Outbound segment structure:",
              flights[0].outbound.sectorSegments[0]
            );
          }
          if (
            flights[0].inbound &&
            flights[0].inbound.sectorSegments &&
            flights[0].inbound.sectorSegments.length > 0
          ) {
            console.log(
              "Inbound segment structure:",
              flights[0].inbound.sectorSegments[0]
            );
          }
        }
      } else if (data && data.data && Array.isArray(data.data)) {
        flights = data.data;
      } else if (data && Array.isArray(data)) {
        flights = data;
      } else if (data && data.results && Array.isArray(data.results)) {
        flights = data.results;
      } else if (data && data.flights && Array.isArray(data.flights)) {
        flights = data.flights;
      }

      flights.forEach((flight, index) => {
        // Extract data from the complex Kiwi API response structure
        const outbound = flight.outbound;
        const inbound = flight.inbound;
        const price = flight.price;
        const bookingOptions = flight.bookingOptions;

        // Get the first booking option for the booking URL
        const bookingUrl =
          bookingOptions &&
          bookingOptions.edges &&
          bookingOptions.edges.length > 0
            ? `https://www.kiwi.com${bookingOptions.edges[0].node.bookingUrl}`
            : "#";

        // Extract outbound flight details
        const outboundSegment =
          outbound &&
          outbound.sectorSegments &&
          outbound.sectorSegments.length > 0
            ? outbound.sectorSegments[0].segment
            : null;

        // Extract inbound flight details
        const inboundSegment =
          inbound && inbound.sectorSegments && inbound.sectorSegments.length > 0
            ? inbound.sectorSegments[inbound.sectorSegments.length - 1].segment // Get the last segment (final destination)
            : null;

        // Extract inbound flight details for return journey
        const inboundFirstSegment =
          inbound && inbound.sectorSegments && inbound.sectorSegments.length > 0
            ? inbound.sectorSegments[0].segment
            : null;

        // Check if both outbound and inbound are direct flights (single segment)
        const isDirectOutbound =
          outbound &&
          outbound.sectorSegments &&
          outbound.sectorSegments.length === 1;
        const isDirectInbound =
          inbound &&
          inbound.sectorSegments &&
          inbound.sectorSegments.length === 1;
        const isDirectFlight = isDirectOutbound && isDirectInbound;

        // Extract city names using the exact paths provided
        const safeGet = (...vals) =>
          vals.find((v) => typeof v === "string" && v.trim().length > 0) || "";

        // For outbound flights: source and destination cities
        const outboundSourceRaw = safeGet(
          outboundSegment?.source?.station?.city?.name,
          outboundSegment?.source?.airport?.city?.name,
          outboundSegment?.source?.city?.name,
          outboundSegment?.source?.name,
          outboundSegment?.source?.code
        );
        const outboundDestinationRaw = safeGet(
          outboundSegment?.destination?.station?.city?.name,
          outboundSegment?.destination?.airport?.city?.name,
          outboundSegment?.destination?.city?.name,
          outboundSegment?.destination?.name,
          outboundSegment?.destination?.code
        );

        // For inbound flights: source and destination cities
        const inboundFirstSourceRaw = safeGet(
          inboundFirstSegment?.source?.station?.city?.name,
          inboundFirstSegment?.source?.airport?.city?.name,
          inboundFirstSegment?.source?.city?.name,
          inboundFirstSegment?.source?.name,
          inboundFirstSegment?.source?.code
        );
        const inboundFinalDestinationRaw = safeGet(
          inboundSegment?.destination?.station?.city?.name,
          inboundSegment?.destination?.airport?.city?.name,
          inboundSegment?.destination?.city?.name,
          inboundSegment?.destination?.name,
          inboundSegment?.destination?.code
        );

        const outboundSourceCity = this.normalizeCityName(outboundSourceRaw);
        const outboundDestinationCity = this.normalizeCityName(
          outboundDestinationRaw
        );
        const inboundFirstSourceCity = this.normalizeCityName(
          inboundFirstSourceRaw
        );
        const inboundFinalDestinationCity = this.normalizeCityName(
          inboundFinalDestinationRaw
        );

        // Debug logging for city names
        console.log(`Flight ${index} city names:`, {
          outboundSourceRaw,
          outboundDestinationRaw,
          inboundFirstSourceRaw,
          inboundFinalDestinationRaw,
          outboundSourceCity,
          outboundDestinationCity,
          inboundFirstSourceCity,
          inboundFinalDestinationCity,
        });

        const outboundSourceCode =
          outboundSegment?.source?.airport?.code ||
          outboundSegment?.source?.code ||
          "";
        const outboundDestinationCode =
          outboundSegment?.destination?.airport?.code ||
          outboundSegment?.destination?.code ||
          "";
        const inboundFirstSourceCode =
          inboundFirstSegment?.source?.airport?.code ||
          inboundFirstSegment?.source?.code ||
          "";
        const inboundFinalDestinationCode =
          inboundSegment?.destination?.airport?.code ||
          inboundSegment?.destination?.code ||
          "";

        const isPoznanToNaplesOutbound =
          /poznan/i.test(outboundSourceCity) &&
          /naples|napoli/i.test(outboundDestinationCity);
        const isNaplesToPoznanInbound =
          /naples|napoli/i.test(inboundFirstSourceCity) &&
          /poznan/i.test(inboundFinalDestinationCity);

        const flightData = {
          id: `kiwi_${index}`,
          // Outbound flight details
          airline: outboundSegment
            ? outboundSegment.carrier.name
            : "Unknown Airline",
          departure: outboundSegment
            ? this.formatTime(outboundSegment.source.localTime)
            : "00:00",
          arrival: outboundSegment
            ? this.formatTime(outboundSegment.destination.localTime)
            : "00:00",
          duration: outbound
            ? this.formatDurationFromSeconds(outbound.duration)
            : "0h 0m",
          date: outboundSegment
            ? outboundSegment.source.localTime.split("T")[0]
            : "2026-06-26",
          // Inbound flight details
          returnAirline: inboundFirstSegment
            ? inboundFirstSegment.carrier.name
            : "Unknown Airline",
          returnDeparture: inboundFirstSegment
            ? this.formatTime(inboundFirstSegment.source.localTime)
            : "00:00",
          returnArrival: inboundSegment
            ? this.formatTime(inboundSegment.destination.localTime)
            : "00:00",
          returnDuration: inbound
            ? this.formatDurationFromSeconds(inbound.duration)
            : "0h 0m",
          returnDate: inboundSegment
            ? inboundSegment.destination.localTime.split("T")[0]
            : "2026-06-28",
          // Common details
          price: price
            ? this.formatPrice(price.amount, currency.toUpperCase())
            : "Price N/A",
          priceValue: price ? parseFloat(price.amount) : Infinity, // For sorting
          bookingUrl: bookingUrl,
          isDirect: isDirectFlight,
          // Polish prioritization flags
          outboundSourceCity,
          outboundDestinationCity,
          inboundFirstSourceCity,
          inboundFinalDestinationCity,
          outboundSourceCode,
          outboundDestinationCode,
          inboundFirstSourceCode,
          inboundFinalDestinationCode,
          plPoznanNaplesPriority:
            isPoznanToNaplesOutbound || isNaplesToPoznanInbound,
        };

        // Add all flights to a temporary array for sorting
        allFlights.push(flightData);
      });

      // Filter for direct flights only and create ideal combinations
      if (allFlights.length > 0) {
        // Filter to only direct flights
        const directFlights = allFlights.filter((flight) => flight.isDirect);

        if (directFlights.length === 0) {
          // Fallback to all flights if no direct flights found
          directFlights.push(...allFlights);
        }

        // For Polish guests, prioritize Poznań↔Naples routes at the top
        const prioritizedDirectFlights = directFlights.sort((a, b) => {
          const aPriority = a.plPoznanNaplesPriority ? 1 : 0;
          const bPriority = b.plPoznanNaplesPriority ? 1 : 0;
          return bPriority - aPriority;
        });

        // Create ideal flight combinations
        let idealCombinations = this.createIdealFlightCombinations(
          prioritizedDirectFlights
        );

        // For Polish searches, ensure earliest outbound is included (but not ahead of best timing)
        if (context && context.isPolishSearch) {
          const earliest = [...prioritizedDirectFlights].sort(
            (a, b) =>
              this.parseTimeToMinutes(a.departure) -
              this.parseTimeToMinutes(b.departure)
          )[0];
          if (
            earliest &&
            !idealCombinations.find((f) => f.id === earliest.id)
          ) {
            idealCombinations.push({
              ...earliest,
              combinationType: "earliest_departure",
              score: Number.MAX_SAFE_INTEGER - 1,
            });
          }
        }

        // Ensure Best Timing appears first if present
        const bestIdx = idealCombinations.findIndex(
          (f) =>
            f.combinationType === "best_timing" ||
            f.combinationType === "best_timing_and_cheapest"
        );
        if (bestIdx > 0) {
          const [best] = idealCombinations.splice(bestIdx, 1);
          idealCombinations.unshift(best);
        }

        // Select the best combinations
        preferredFlights.push(...idealCombinations.slice(0, 2));

        // Add remaining direct flights as alternatives
        prioritizedDirectFlights.forEach((flight) => {
          if (!preferredFlights.find((pf) => pf.id === flight.id)) {
            alternativeFlights.push(flight);
          }
        });
      }

      return {
        preferredFlights,
        alternativeFlights,
      };
    } catch (error) {
      console.error("Error parsing Kiwi API results:", error);
      return {
        preferredFlights: [],
        alternativeFlights: [],
      };
    }
  }

  // Create ideal flight combinations with specific timing requirements
  createIdealFlightCombinations(flights) {
    if (flights.length === 0) return [];

    const combinations = [];

    // Strategy 1: Best Timing - outbound lands close to 2pm, return leaves close to 3pm
    const bestTimingFlight = this.findBestTimingFlight(flights);
    const cheapestFlight = this.findCheapestFlight(flights);

    if (bestTimingFlight) {
      // Check if best timing and cheapest are the same flight
      const isSameFlight = bestTimingFlight.id === cheapestFlight?.id;
      const combinationType = isSameFlight
        ? "best_timing_and_cheapest"
        : "best_timing";

      combinations.push({
        ...bestTimingFlight,
        combinationType: combinationType,
        score: this.calculateTimingScore(bestTimingFlight),
      });
    }

    // Strategy 2: Cheapest Connection - overall cheapest option (only if different from best timing)
    if (cheapestFlight && cheapestFlight.id !== bestTimingFlight?.id) {
      combinations.push({
        ...cheapestFlight,
        combinationType: "cheapest_connection",
        score: this.calculatePriceScore(cheapestFlight),
      });
    }

    // Sort combinations with strong preference for arrivals before 14:00
    const isBeforeTwo = (flight) => {
      const mins = this.parseTimeToMinutes(flight.arrival);
      return mins > 0 && mins <= 14 * 60;
    };
    return combinations.sort((a, b) => {
      const aBefore = isBeforeTwo(a);
      const bBefore = isBeforeTwo(b);
      if (aBefore && !bBefore) return -1;
      if (!aBefore && bBefore) return 1;
      return b.score - a.score;
    });
  }

  // Find the flight with best timing (outbound lands close to 2pm, return leaves close to 3pm)
  findBestTimingFlight(flights) {
    if (flights.length === 0) return null;

    // Target times: outbound arrival at 2pm (1400), return departure at 3pm (1500)
    const targetOutboundArrival = 1400; // 2:00 PM
    const targetReturnDeparture = 1500; // 3:00 PM

    let bestFlight = null;
    let bestScore = -Infinity;

    flights.forEach((flight) => {
      const outboundArrivalTime = this.parseTimeToMinutes(flight.arrival);
      const outboundDepartureTime = this.parseTimeToMinutes(flight.departure);
      const returnDepartureTime = this.parseTimeToMinutes(
        flight.returnDeparture
      );

      // Calculate timing score
      let score = 0;

      // Strong preference for arrivals before 2pm (14:00)
      if (outboundArrivalTime <= targetOutboundArrival) {
        // Before 2pm gets massive bonus - closer to 2pm is better
        const outboundDiff = Math.abs(
          outboundArrivalTime - targetOutboundArrival
        );
        score += 2000 + Math.max(0, 100 - outboundDiff); // 2000+ base bonus
      } else {
        // After 2pm gets heavily penalized - especially late evening arrivals
        const outboundDiff = Math.abs(
          outboundArrivalTime - targetOutboundArrival
        );
        if (outboundArrivalTime >= 2000) {
          // After 8 PM arrival
          score -= 1000; // Heavy penalty for late evening arrivals
        }
        score += Math.max(-500, 50 - outboundDiff); // Can go negative
      }

      // Return departure scoring (prefer close to 3pm, then later, then earlier)
      const returnDiff = Math.abs(returnDepartureTime - targetReturnDeparture);
      // Ensure any flight after 3pm always outranks any flight before 3pm
      // by applying a large group bonus for after-3pm departures.
      const afterThreePmBonus =
        returnDepartureTime >= targetReturnDeparture ? 1000 : 0;
      if (returnDepartureTime >= targetReturnDeparture) {
        // 3pm or later - higher score for closer to 3pm
        score += afterThreePmBonus + Math.max(0, 100 - returnDiff);
      } else {
        // Before 3pm - lower score (no group bonus)
        score += Math.max(0, 50 - returnDiff);
      }

      // Outbound departure morning bonus (prefer 06:00–10:00, peak at ~08:00)
      const morningStart = 6 * 60;
      const morningEnd = 10 * 60;
      if (
        outboundDepartureTime >= morningStart &&
        outboundDepartureTime <= morningEnd
      ) {
        const targetMorning = 8 * 60;
        const morningDiff = Math.abs(outboundDepartureTime - targetMorning);
        score += Math.max(0, 200 - morningDiff / 2); // Increased bonus
      }

      // Heavy penalty for late evening departures (after 8 PM)
      if (outboundDepartureTime >= 2000) {
        // 8 PM
        score -= 500; // Heavy penalty for late evening departures
      }

      if (score > bestScore) {
        bestScore = score;
        bestFlight = flight;
      }
    });

    return bestFlight;
  }

  // Find the cheapest flight
  findCheapestFlight(flights) {
    if (flights.length === 0) return null;

    return flights.reduce((cheapest, current) => {
      return current.priceValue < cheapest.priceValue ? current : cheapest;
    });
  }

  // Find the second best flight (excluding the best timing flight)
  findSecondBestFlight(flights, excludeFlight) {
    if (flights.length <= 1) return null;

    // Sort by timing score and find the second best
    const targetOutboundArrival = 1400; // 2:00 PM
    const targetReturnDeparture = 1500; // 3:00 PM

    const flightsWithScores = flights
      .filter((flight) => flight.id !== excludeFlight.id)
      .map((flight) => {
        const outboundArrivalTime = this.parseTimeToMinutes(flight.arrival);
        const returnDepartureTime = this.parseTimeToMinutes(
          flight.returnDeparture
        );

        let score = 0;

        // Outbound arrival scoring
        const outboundDiff = Math.abs(
          outboundArrivalTime - targetOutboundArrival
        );
        if (outboundArrivalTime <= targetOutboundArrival) {
          score += Math.max(0, 100 - outboundDiff);
        } else if (outboundArrivalTime <= 1500) {
          score += Math.max(0, 50 - outboundDiff);
        } else {
          score += Math.max(0, 25 - outboundDiff);
        }

        // Return departure scoring
        const returnDiff = Math.abs(
          returnDepartureTime - targetReturnDeparture
        );
        if (returnDepartureTime >= targetReturnDeparture) {
          score += Math.max(0, 100 - returnDiff);
        } else {
          score += Math.max(0, 50 - returnDiff);
        }

        return { flight, score };
      })
      .sort((a, b) => b.score - a.score);

    return flightsWithScores.length > 0 ? flightsWithScores[0].flight : null;
  }

  // Parse time string (HH:MM) to minutes since midnight
  parseTimeToMinutes(timeString) {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Calculate timing score for best timing flights
  calculateTimingScore(flight) {
    const targetOutboundArrival = 1400; // 2:00 PM
    const targetReturnDeparture = 1500; // 3:00 PM

    const outboundArrivalTime = this.parseTimeToMinutes(flight.arrival);
    const outboundDepartureTime = this.parseTimeToMinutes(flight.departure);
    const returnDepartureTime = this.parseTimeToMinutes(flight.returnDeparture);

    let score = 200; // Base score for being direct

    // Strong preference for arrivals before 2pm (14:00)
    if (outboundArrivalTime <= targetOutboundArrival) {
      // Before 2pm gets massive bonus - closer to 2pm is better
      const outboundDiff = Math.abs(
        outboundArrivalTime - targetOutboundArrival
      );
      score += 2000 + Math.max(0, 100 - outboundDiff); // 2000+ base bonus
    } else {
      // After 2pm gets heavily penalized - especially late evening arrivals
      const outboundDiff = Math.abs(
        outboundArrivalTime - targetOutboundArrival
      );
      if (outboundArrivalTime >= 2000) {
        // After 8 PM arrival
        score -= 1000; // Heavy penalty for late evening arrivals
      }
      score += Math.max(-500, 50 - outboundDiff); // Can go negative
    }

    // Outbound departure morning bonus (prefer 06:00–10:00, peak at ~08:00)
    const morningStart = 6 * 60;
    const morningEnd = 10 * 60;
    if (
      outboundDepartureTime >= morningStart &&
      outboundDepartureTime <= morningEnd
    ) {
      const targetMorning = 8 * 60;
      const morningDiff = Math.abs(outboundDepartureTime - targetMorning);
      score += Math.max(0, 200 - morningDiff / 2); // Increased bonus
    }

    // Heavy penalty for late evening departures (after 8 PM)
    if (outboundDepartureTime >= 2000) {
      // 8 PM
      score -= 500; // Heavy penalty for late evening departures
    }

    // Return departure scoring
    const returnDiff = Math.abs(returnDepartureTime - targetReturnDeparture);
    // Apply a strong group bonus to guarantee any after-3pm beats any before-3pm
    const afterThreePmBonus =
      returnDepartureTime >= targetReturnDeparture ? 1000 : 0;
    if (returnDepartureTime >= targetReturnDeparture) {
      score += afterThreePmBonus + Math.max(0, 100 - returnDiff);
    } else {
      score += Math.max(0, 50 - returnDiff);
    }

    return score;
  }

  // Calculate price score for cheapest flights
  calculatePriceScore(flight) {
    return Math.max(0, 100000 - flight.priceValue) / 100;
  }

  // Calculate a score for flight combinations
  calculateFlightScore(flight, type) {
    let score = 0;

    // Base score for being direct
    if (flight.isDirect) score += 100;

    // Time-based scoring
    const departureTime = parseInt(flight.departure.replace(":", ""));
    const returnTime = parseInt(flight.returnDeparture.replace(":", ""));

    switch (type) {
      case "earliest":
        // Earlier departure gets higher score (6 AM = 600, 12 PM = 1200)
        score += Math.max(0, 1200 - departureTime) / 10;
        break;
      case "latest":
        // Later return gets higher score
        score += returnTime / 10;
        break;
      case "best_price":
        // Lower price gets higher score
        score += Math.max(0, 100000 - flight.priceValue) / 1000;
        break;
      case "best_overall":
        // Balanced scoring for overall best
        score += Math.max(0, 1200 - departureTime) / 20; // Early departure bonus
        score += returnTime / 20; // Late return bonus
        score += Math.max(0, 100000 - flight.priceValue) / 2000; // Price bonus
        break;
      default:
        // Default scoring for other types
        score += Math.max(0, 100000 - flight.priceValue) / 2000;
        break;
    }

    return score;
  }

  // Helper method to format time
  formatTime(timeString) {
    if (!timeString) return "00:00";
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch (error) {
      return "00:00";
    }
  }

  // Helper method to format duration
  formatDuration(durationString) {
    if (!durationString) return "0h 0m";
    try {
      // Parse duration string (e.g., "PT2H30M" or "2h 30m")
      const match = durationString.match(/(\d+)H(\d+)?M?/);
      if (match) {
        const hours = match[1];
        const minutes = match[2] || "0";
        return `${hours}h ${minutes}m`;
      }
      return durationString;
    } catch (error) {
      return "0h 0m";
    }
  }

  // Helper method to format duration from seconds
  formatDurationFromSeconds(seconds) {
    if (!seconds) return "0h 0m";
    try {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return "0h 0m";
    }
  }

  // Helper method to format price
  formatPrice(price, currency) {
    if (!price) return "Price N/A";
    try {
      const currencySymbol = currency === "HUF" ? "Ft" : currency || "HUF";
      // Remove decimal points and round to nearest whole number
      const roundedPrice = Math.round(parseFloat(price));
      return `${roundedPrice} ${currencySymbol}`;
    } catch (error) {
      return "Price N/A";
    }
  }

  // Get airport codes for a city
  async getAirportCodes(city) {
    // This could be implemented to search for airport codes
    // For now, return common codes
    const commonCodes = {
      budapest: "BUD",
      warsaw: "WAW",
      london: "LHR",
      naples: "NAP",
      rome: "FCO",
      milan: "MXP",
    };

    return commonCodes[city.toLowerCase()] || city.toUpperCase();
  }
}

// Export singleton instance
const flightApiService = new FlightApiService();
export default flightApiService;
