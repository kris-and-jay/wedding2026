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
    guestCode = null
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
            passengers
          );
        } catch (error) {
          console.error(
            "Kiwi API failed, falling back to coming soon message:",
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
    passengers
  ) {
    const config = API_CONFIG.kiwi;

    if (!config.apiKey) {
      throw new Error("Kiwi API key not configured");
    }

    const options = {
      method: "GET",
      url: `${config.baseUrl}${config.endpoints.roundTrip}`,
      params: {
        source: "City:budapest_hu",
        destination: "City:naples_it",
        currency: "huf",
        adults: passengers,
        transportTypes: "FLIGHT",
        contentProviders: "FLIXBUS_DIRECTS,FRESH,KAYAK,KIWI",
        limit: 20,
        inboundDepartureDateStart: `${returnDate}T00:00:00`,
        inboundDepartureDateEnd: `${returnDate}T23:59:59`,
        outboundDepartureDateStart: `${departureDate}T00:00:00`,
        outboundDepartureDateEnd: `${departureDate}T23:59:59`,
      },
      headers: {
        "x-rapidapi-key": config.apiKey,
        "x-rapidapi-host": "kiwi-com-cheap-flights.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      const searchData = response.data;

      return this.parseKiwiRapidAPIResults(searchData);
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
  parseKiwiRapidAPIResults(data) {
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
          price: price ? this.formatPrice(price.amount, "HUF") : "Price N/A",
          priceValue: price ? parseFloat(price.amount) : Infinity, // For sorting
          bookingUrl: bookingUrl,
          isDirect: isDirectFlight,
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

        // Create ideal flight combinations
        const idealCombinations =
          this.createIdealFlightCombinations(directFlights);

        // Select the best combinations
        preferredFlights.push(...idealCombinations.slice(0, 2));

        // Add remaining direct flights as alternatives
        directFlights.forEach((flight) => {
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

    // Sort combinations by score (higher is better)
    return combinations.sort((a, b) => b.score - a.score);
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
      const returnDepartureTime = this.parseTimeToMinutes(
        flight.returnDeparture
      );

      // Calculate timing score
      let score = 0;

      // Outbound arrival scoring (prefer close to 2pm, then earlier, then after 3pm)
      const outboundDiff = Math.abs(
        outboundArrivalTime - targetOutboundArrival
      );
      if (outboundArrivalTime <= targetOutboundArrival) {
        // Earlier or on time - higher score for closer to 2pm
        score += Math.max(0, 100 - outboundDiff);
      } else if (outboundArrivalTime <= 1500) {
        // Between 2pm and 3pm - lower score
        score += Math.max(0, 50 - outboundDiff);
      } else {
        // After 3pm - lowest score
        score += Math.max(0, 25 - outboundDiff);
      }

      // Return departure scoring (prefer close to 3pm, then later, then earlier)
      const returnDiff = Math.abs(returnDepartureTime - targetReturnDeparture);
      if (returnDepartureTime >= targetReturnDeparture) {
        // 3pm or later - higher score for closer to 3pm
        score += Math.max(0, 100 - returnDiff);
      } else {
        // Before 3pm - lower score
        score += Math.max(0, 50 - returnDiff);
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
    const returnDepartureTime = this.parseTimeToMinutes(flight.returnDeparture);

    let score = 200; // Base score for being direct

    // Outbound arrival scoring
    const outboundDiff = Math.abs(outboundArrivalTime - targetOutboundArrival);
    if (outboundArrivalTime <= targetOutboundArrival) {
      score += Math.max(0, 100 - outboundDiff);
    } else if (outboundArrivalTime <= 1500) {
      score += Math.max(0, 50 - outboundDiff);
    } else {
      score += Math.max(0, 25 - outboundDiff);
    }

    // Return departure scoring
    const returnDiff = Math.abs(returnDepartureTime - targetReturnDeparture);
    if (returnDepartureTime >= targetReturnDeparture) {
      score += Math.max(0, 100 - returnDiff);
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
