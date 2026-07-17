export interface LocationPageConfig {
  id: string;
  cityName: string;
  state: string;
  title: string;
  description: string;
  heroSubtitle: string;
  heroImage: string;
  schemaType: string;
  services: string[];
  faqs: { q: string; a: string }[];
}

export const LOCATIONS_REGISTRY: Record<string, LocationPageConfig> = {
  "oakland-park": {
    id: "oakland-park",
    cityName: "Oakland Park",
    state: "FL",
    title: "Oakland Park, FL — Custom Signs & Banners",
    description: "Premium custom signs, banners, and programmable LED displays in Oakland Park, FL. Get a quote today for your business storefront.",
    heroSubtitle: "Your Local Sign Shop in Oakland Park",
    heroImage: "/images/hero_image_main.jpg", // Placeholder
    schemaType: "LocalBusiness",
    services: ["Custom Signs", "Banners", "LED Displays", "Neon Signs", "Vehicle Wraps"],
    faqs: [
      {
        q: "Do you install signs in Oakland Park?",
        a: "Yes, we provide full-service sign installation for businesses throughout Oakland Park and Broward County."
      },
      {
        q: "What types of custom banners do you make?",
        a: "We manufacture high-quality vinyl and fabric banners perfect for both indoor and outdoor use in the Oakland Park area."
      }
    ]
  },
  "fort-lauderdale": {
    id: "fort-lauderdale",
    cityName: "Fort Lauderdale",
    state: "FL",
    title: "Fort Lauderdale Sign Company",
    description: "Expert sign company serving Fort Lauderdale. We specialize in custom signage, banners, programmable LED signs, and neon.",
    heroSubtitle: "Fort Lauderdale's Premier Sign Company",
    heroImage: "/images/hero_image_main.jpg", // Placeholder
    schemaType: "LocalBusiness",
    services: ["Custom Signs", "Banners", "LED Displays", "Neon Signs", "Vehicle Wraps"],
    faqs: [
      {
        q: "Do you serve the entire Fort Lauderdale area?",
        a: "Yes, our sign company serves all of Fort Lauderdale, providing high-quality custom signs and installation."
      },
      {
        q: "Can you create LED signs for my Fort Lauderdale business?",
        a: "Absolutely. We specialize in programmable LED signs and displays to help your business stand out."
      }
    ]
  },
  "florida-led-signs": {
    id: "florida-led-signs",
    cityName: "Florida",
    state: "FL",
    title: "Florida LED Sign Company & Programmable Displays",
    description: "Top-rated LED sign company serving Florida. Get custom programmable LED displays for Arlington, Estero, and statewide.",
    heroSubtitle: "High-Quality LED Signs Across Florida",
    heroImage: "/images/hero_image_main.jpg", // Placeholder
    schemaType: "Service",
    services: ["Programmable LED Signs", "Indoor LED Displays", "Outdoor LED Billboards"],
    faqs: [
      {
        q: "Do you ship LED signs across Florida?",
        a: "Yes, we build and deliver premium programmable LED signs to businesses throughout Florida."
      }
    ]
  }
};
