// Route Configuration for Wedding Guests
// This file manages the mapping between guest codes and their preferred travel routes

export const routeConfig = {
  // Hungarian guests - Budapest to Naples
  IL2026: {
    origin: "Budapest",
    originCode: "BUD",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
  },

  // Polish guests - Poland to Italy (multi-city)
  PL2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  MK2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  AD2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  WS2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  AG2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  CT2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  WD2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  CM2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  KL2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  PL2026_2: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  KS2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },
  SD2026: {
    origin: "Poland",
    originCode: "PL",
    destination: "Italy",
    destinationCode: "IT",
    preferredFlights: [],
    alternativeFlights: [],
  },

  AT2026: {
    origin: "Budapest",
    originCode: "BUD",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
  },

  KR2026: {
    origin: "Budapest",
    originCode: "BUD",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
  },

  GB2026: {
    origin: "Budapest",
    originCode: "BUD",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
  },

  ER2026: {
    origin: "Budapest",
    originCode: "BUD",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
  },

  PT2026: {
    origin: "Budapest",
    originCode: "BUD",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
  },

  AGI2026: {
    origin: "Budapest",
    originCode: "BUD",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
  },

  // Default route for guests without specific configuration
  default: {
    origin: "Your City",
    originCode: "XXX",
    destination: "Naples",
    destinationCode: "NAP",
    preferredFlights: [],
    alternativeFlights: [],
    message: "Please contact us for personalized travel recommendations",
  },
};

// Helper function to get route configuration for a guest code
export const getRouteConfig = (guestCode) => {
  return routeConfig[guestCode] || routeConfig.default;
};

// Helper function to get all available routes
export const getAllRoutes = () => {
  return Object.entries(routeConfig)
    .filter(([key, route]) => key !== "default")
    .map(([key, route]) => ({
      guestCode: key,
      ...route,
    }));
};

// Helper function to check if a guest code has a specific route
export const hasSpecificRoute = (guestCode) => {
  return guestCode in routeConfig && guestCode !== "default";
};

// Wedding dates configuration
export const weddingDates = {
  ceremony: "2026-06-27",
  arrival: "2026-06-26", // Recommended arrival date
  departure: "2026-06-28", // Recommended departure date
  accommodation: {
    checkIn: "2026-06-26",
    checkOut: "2026-06-28",
  },
};

// Airport information for Naples
export const naplesAirport = {
  name: "Naples International Airport",
  code: "NAP",
  fullName: "Aeroporto Internazionale di Napoli",
  location: "Naples, Italy",
  distanceFromVenue: "45 km", // Distance to Fattoria Terranova
  transferTime: "45-60 minutes",
};
// Popular airlines serving Naples
export const popularAirlines = [
  {
    name: "Ryanair",
    website: "https://ryanair.com",
    lowCost: true,
  },
  {
    name: "Wizz Air",
    website: "https://wizzair.com",
    lowCost: true,
  },
  {
    name: "EasyJet",
    website: "https://easyjet.com",
    lowCost: true,
  },
  {
    name: "Alitalia",
    website: "https://alitalia.com",
    lowCost: false,
  },
  {
    name: "Lufthansa",
    website: "https://lufthansa.com",
    lowCost: false,
  },
  {
    name: "British Airways",
    website: "https://britishairways.com",
    lowCost: false,
  },
];
