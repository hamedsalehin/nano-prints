export interface LocationPageConfig {
  id: string;
  cityName: string;
  state: string;
  title: string;
  metaTitle: string;
  description: string;
  heroSubtitle: string;
  heroImage: string;
  schemaType: string;
  services: { name: string; href: string }[];
  bodyContent: string;
  faqs: { q: string; a: string }[];
}

export const LOCATIONS_REGISTRY: Record<string, LocationPageConfig> = {
  "oakland-park": {
    id: "oakland-park",
    cityName: "Oakland Park",
    state: "FL",
    metaTitle: "Sign Shop Oakland Park FL | Custom Signs, Banners & Printing | Nano Signs",
    title: "Oakland Park Sign Shop & Print Company",
    description: "Oakland Park's local sign shop — Nano Signs at 4567 Powerline Rd. Custom signs, banner printing, business signs, LED displays & neon signs. Next-day turnaround. Call 305-967-1005 for a free quote.",
    heroSubtitle: "Your Local Sign Shop on Powerline Rd, Oakland Park FL",
    heroImage: "/images/hero_image_main.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs is Oakland Park's local sign company and print shop, located at 4567 Powerline Rd, Fort Lauderdale FL 33309 — right on the Oakland Park border. We serve businesses across Oakland Park and all of Broward County with same-week turnaround on all orders.

Whether you need custom business signs, banner printing, LED display signs, or neon signs for your storefront, our team of local sign makers and print professionals delivers premium quality at competitive prices.

We are a full-service sign shop serving Oakland Park, Fort Lauderdale, Pompano Beach, Deerfield Beach, Plantation, and all surrounding Broward County cities. Our wide-format UV printing equipment produces vivid, weather-resistant signs that hold up against the South Florida heat, humidity, and sun.`,
    services: [
      { name: "Custom Business Signs", href: "/custom-signs" },
      { name: "Banner Printing Oakland Park", href: "/custom-banners" },
      { name: "LED Display Signs", href: "/led-display-signs" },
      { name: "Neon Signs", href: "/neon-signs" },
      { name: "Vehicle Wraps & Decals", href: "/custom-decals" },
      { name: "Custom Flags & Feather Banners", href: "/custom-flags" },
      { name: "Trade Show Displays", href: "/trade-show" },
      { name: "Real Estate Signs", href: "/custom-signs" },
      { name: "Yard Signs & Coroplast Signs", href: "/custom-signs" },
      { name: "Marketing Materials & Printing", href: "/marketing-materials" },
    ],
    faqs: [
      {
        q: "Where is Nano Signs located near Oakland Park?",
        a: "Nano Signs is located at 4567 Powerline Rd, Fort Lauderdale, FL 33309 — right on the Oakland Park border. We are open Monday–Friday 9am–6pm. Walk-ins welcome for quotes and order pickups."
      },
      {
        q: "Do you offer banner printing in Oakland Park FL?",
        a: "Yes! Banner printing is one of our most popular services. We print vinyl banners, mesh banners, and fabric banners in any custom size. Most orders are ready within 1–3 business days."
      },
      {
        q: "What types of business signs do you make for Oakland Park businesses?",
        a: "We make all types of custom business signs including aluminum signs, coroplast yard signs, foam board signs, acrylic signs, dibond signs, real estate signs, directional signs, and LED illuminated signs."
      },
      {
        q: "How fast is your turnaround for sign orders?",
        a: "Most standard sign and banner orders in Oakland Park are ready in 1–3 business days. Rush same-day and next-day options are available — call us at 305-967-1005 to check availability."
      },
      {
        q: "Do you install signs in Oakland Park and Broward County?",
        a: "Yes, we offer professional sign installation throughout Oakland Park, Fort Lauderdale, Pompano Beach, Deerfield Beach, Plantation, and all of Broward County. Contact us for installation pricing."
      },
      {
        q: "Can I get a free quote for custom signs in Oakland Park?",
        a: "Absolutely. You can get a free, no-obligation quote online at nano-signs.com/get-a-quote or call us directly at 305-967-1005. We typically respond to quote requests within a few hours."
      }
    ]
  },
  "fort-lauderdale": {
    id: "fort-lauderdale",
    cityName: "Fort Lauderdale",
    state: "FL",
    metaTitle: "Sign Company Fort Lauderdale FL | Custom Signs & Banners | Nano Signs",
    title: "Fort Lauderdale Sign Company",
    description: "Fort Lauderdale's trusted sign company — Nano Signs. Custom signs, LED signs, banner printing, neon signs & vehicle wraps. Serving all of Fort Lauderdale, Oakland Park & Broward County. Call 305-967-1005.",
    heroSubtitle: "Fort Lauderdale's Premier Sign Company & Print Shop",
    heroImage: "/images/hero_image_main.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs is the go-to sign company for Fort Lauderdale businesses. Located just minutes away in Fort Lauderdale on Powerline Road, we serve the entire Fort Lauderdale area with custom signage, banner printing, LED signs, and commercial printing.

From downtown Fort Lauderdale restaurants and retail shops to Las Olas Boulevard boutiques and Broward Boulevard commercial clients — we produce high-quality custom signs built to withstand Florida's outdoor conditions.

Our Fort Lauderdale sign services include full design support, professional installation, and rush turnaround options. Whether you need one banner or 500 yard signs, we handle every project with local care and precision.`,
    services: [
      { name: "Custom Signs Fort Lauderdale", href: "/custom-signs" },
      { name: "LED Signs Fort Lauderdale", href: "/led-display-signs" },
      { name: "Banner Printing Fort Lauderdale", href: "/custom-banners" },
      { name: "Neon Signs Fort Lauderdale", href: "/neon-signs" },
      { name: "Vehicle Wraps Fort Lauderdale", href: "/custom-decals" },
      { name: "Digital Signage Fort Lauderdale", href: "/led-display-signs" },
      { name: "Trade Show Displays", href: "/trade-show" },
      { name: "Real Estate Signs", href: "/custom-signs" },
      { name: "Custom Flags", href: "/custom-flags" },
      { name: "Business Cards & Marketing Materials", href: "/marketing-materials" },
    ],
    faqs: [
      {
        q: "Do you serve Fort Lauderdale as a sign company?",
        a: "Yes, Nano Signs is Fort Lauderdale's trusted local sign company. We're located in Fort Lauderdale (minutes from Fort Lauderdale) and serve clients throughout the entire Fort Lauderdale area and Broward County."
      },
      {
        q: "What custom signs can you make for Fort Lauderdale businesses?",
        a: "We produce all types of custom signs for Fort Lauderdale businesses: storefront signs, interior signs, LED illuminated signs, channel letters, foam signs, aluminum signs, vinyl banners, window graphics, vehicle wraps, and more."
      },
      {
        q: "Do you offer LED signs in Fort Lauderdale?",
        a: "Yes! We specialize in LED display signs and programmable LED signs for Fort Lauderdale businesses. LED signs dramatically increase visibility and can be changed anytime. We handle design, production, and installation."
      },
      {
        q: "Can you install signs at my Fort Lauderdale location?",
        a: "Yes, our experienced installation team handles sign installations throughout Fort Lauderdale, Fort Lauderdale, Oakland Park, Pompano Beach, Plantation, Deerfield Beach, and all of Broward County."
      },
      {
        q: "How do I get a sign quote for my Fort Lauderdale business?",
        a: "You can request a free quote online at nano-signs.com/get-a-quote, email us, or call 305-967-1005. We provide fast, detailed quotes typically within a few hours during business hours."
      },
      {
        q: "Do you offer digital signage in Fort Lauderdale?",
        a: "Yes, we provide digital signage and programmable LED display solutions for Fort Lauderdale businesses, restaurants, hotels, and retail stores. Digital signs let you update your message anytime remotely."
      }
    ]
  },
  "florida-led-signs": {
    id: "florida-led-signs",
    cityName: "Florida",
    state: "FL",
    metaTitle: "LED Signs Florida | Programmable LED Displays & Neon Signs | Nano Signs",
    title: "Florida LED Sign Company & Programmable Displays",
    description: "Top-rated LED sign company serving Florida. Programmable LED displays, neon signs & digital signage for businesses statewide. Based in Fort Lauderdale, Broward County. Call 305-967-1005.",
    heroSubtitle: "High-Quality LED Signs & Programmable Displays Across Florida",
    heroImage: "/images/hero_image_main.jpg",
    schemaType: "Service",
    bodyContent: `Nano Signs is Florida's trusted source for programmable LED signs, LED display signs, and neon signs. Based in Fort Lauderdale (Broward County), we ship and install LED signage throughout Florida.

Our LED signs are built for Florida's harsh outdoor conditions — UV-resistant, weatherproof, and engineered for longevity in the South Florida heat and humidity. From small business LED channel letters to large outdoor LED billboards, we design, produce, and install custom LED signage for any application.

We serve businesses in Miami-Dade, Broward, Palm Beach, and throughout Florida with competitive LED sign pricing, full design services, and professional installation.`,
    services: [
      { name: "Programmable LED Signs", href: "/led-display-signs" },
      { name: "Outdoor LED Display Signs", href: "/led-display-signs" },
      { name: "Indoor LED Displays", href: "/led-display-signs" },
      { name: "Neon Signs Florida", href: "/neon-signs" },
      { name: "LED Channel Letters", href: "/custom-signs" },
      { name: "Digital Signage Florida", href: "/led-display-signs" },
    ],
    faqs: [
      {
        q: "Do you ship LED signs across Florida?",
        a: "Yes, we build and deliver premium programmable LED signs to businesses throughout Florida including Miami, Fort Lauderdale, Boca Raton, West Palm Beach, Orlando, Tampa, and beyond."
      },
      {
        q: "What types of LED signs do you make for Florida businesses?",
        a: "We produce programmable LED signs, outdoor LED display signs, indoor LED screens, LED neon flex signs, LED channel letters, and custom LED displays for any Florida business."
      },
      {
        q: "Do you install LED signs in Florida?",
        a: "Yes, we offer professional LED sign installation throughout Broward County, Miami-Dade, and Palm Beach County. For statewide installations, we partner with local certified electricians."
      }
    ]
  },

  // ── Product-focused landing pages ──────────────────────────────────────────

  "sign-shop": {
    id: "sign-shop",
    cityName: "Fort Lauderdale",
    state: "FL",
    metaTitle: "Sign Shop Near Me | Fort Lauderdale & Fort Lauderdale FL | Nano Signs",
    title: "Sign Shop in Fort Lauderdale & Fort Lauderdale FL",
    description: "Looking for a sign shop near you in Fort Lauderdale or Fort Lauderdale FL? Nano Signs is your local full-service sign shop — custom signs, banners, LED signs & printing. Call 305-967-1005.",
    heroSubtitle: "Your Local Full-Service Sign Shop in Broward County",
    heroImage: "/images/hero_image_main.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs is the premier sign shop serving Fort Lauderdale, Fort Lauderdale, and all of Broward County. Located at 4567 Powerline Rd in Fort Lauderdale FL, our sign shop produces custom signage for businesses of every size — from single-location retail stores to large commercial contractors.

Our full-service sign shop handles everything in-house: design, production, finishing, and installation. We operate wide-format UV flatbed printers, cutting plotters, and digital printing equipment that delivers professional-grade results on time and on budget.

Whether you're a real estate agent needing yard signs, a restaurant looking for a neon sign, or a retail store needing a full storefront sign package — our Fort Lauderdale sign shop is your one-stop solution for all signage needs in South Florida.`,
    services: [
      { name: "Custom Business Signs", href: "/custom-signs" },
      { name: "Vinyl Banners & Mesh Banners", href: "/custom-banners" },
      { name: "LED Display Signs", href: "/led-display-signs" },
      { name: "Neon Signs", href: "/neon-signs" },
      { name: "Yard Signs & Coroplast Signs", href: "/custom-signs" },
      { name: "Roll-Up & Retractable Banners", href: "/custom-banners" },
      { name: "Window Graphics & Decals", href: "/custom-decals" },
      { name: "Vehicle Wraps & Magnets", href: "/custom-decals" },
      { name: "Trade Show Displays", href: "/trade-show" },
      { name: "Marketing Materials & Printing", href: "/marketing-materials" },
    ],
    faqs: [
      {
        q: "Is there a sign shop near me in Fort Lauderdale or Fort Lauderdale?",
        a: "Yes! Nano Signs is located at 4567 Powerline Rd, Fort Lauderdale FL 33309 — minutes from Fort Lauderdale, Pompano Beach, and Deerfield Beach. Walk-ins are welcome Monday–Friday 9am–6pm."
      },
      {
        q: "What can a sign shop make for my business?",
        a: "Our sign shop produces custom outdoor signs, indoor signs, vinyl banners, LED signs, neon signs, yard signs, vehicle wraps, window graphics, trade show displays, and all types of marketing print materials."
      },
      {
        q: "How quickly can a sign shop complete my order?",
        a: "Most sign orders at Nano Signs are ready in 1–3 business days. Rush same-day and next-day production is available. Call 305-967-1005 to check current availability for urgent orders."
      },
      {
        q: "Does your sign shop offer design services?",
        a: "Yes, our sign shop includes in-house graphic design. If you have a logo or artwork, we'll prepare it for print. If you need a design from scratch, our designers can create one for you at a competitive rate."
      },
      {
        q: "Does the sign shop install signs?",
        a: "Yes, we offer professional sign installation throughout Fort Lauderdale, Fort Lauderdale, Oakland Park, Pompano Beach, Plantation, Deerfield Beach, and surrounding Broward County cities."
      },
      {
        q: "How do I get a quote from your sign shop?",
        a: "You can request a free quote online, call us at 305-967-1005, or walk in to our Fort Lauderdale sign shop at 4567 Powerline Rd. We typically turn quotes around within a few hours."
      }
    ]
  },

  "neon-led-signs": {
    id: "neon-led-signs",
    cityName: "Fort Lauderdale",
    state: "FL",
    metaTitle: "Neon LED Signs Fort Lauderdale & Fort Lauderdale FL | Custom Neon | Nano Signs",
    title: "Custom Neon & LED Signs in Fort Lauderdale FL",
    description: "Custom neon LED signs for businesses & décor in Fort Lauderdale, Fort Lauderdale, Oakland Park & Broward County FL. Flex neon signs, LED neon, classic neon looks. Fast turnaround. Call 305-967-1005.",
    heroSubtitle: "Stunning Custom Neon & LED Signs for South Florida Businesses",
    heroImage: "/images/hero_image_main.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs creates custom neon LED signs and traditional-style neon signs for businesses, restaurants, bars, retail stores, and home décor throughout Fort Lauderdale, Fort Lauderdale, and South Florida.

Our LED neon flex signs replicate the warm, vibrant glow of classic glass neon at a fraction of the cost — with lower energy consumption, longer lifespan, and zero fragile glass tubes. We produce custom neon signs in any color, font, shape, or size to match your brand perfectly.

From restaurant neon signs and bar neon signs to wedding neon signs and retail display neon signs — we design and manufacture every piece in-house with fast Fort Lauderdale-area turnaround. Indoor and outdoor rated options available.`,
    services: [
      { name: "Custom LED Neon Signs", href: "/neon-signs" },
      { name: "Restaurant Neon Signs", href: "/neon-signs" },
      { name: "Bar & Nightclub Neon Signs", href: "/neon-signs" },
      { name: "Wedding & Event Neon Signs", href: "/neon-signs" },
      { name: "Retail Store Neon Signs", href: "/neon-signs" },
      { name: "Outdoor LED Signs", href: "/led-display-signs" },
      { name: "Custom Sign Shapes", href: "/neon-signs" },
      { name: "LED Display Signs", href: "/led-display-signs" },
    ],
    faqs: [
      {
        q: "Do you make neon LED signs in Fort Lauderdale?",
        a: "Yes! Nano Signs produces custom neon LED signs for Fort Lauderdale, Fort Lauderdale, and all of Broward County. We make LED flex neon signs that look exactly like classic glass neon but last much longer."
      },
      {
        q: "What is the difference between LED neon and traditional neon signs?",
        a: "LED neon flex signs use flexible LED strips coated in silicone to replicate the neon glow. They are more energy-efficient, shatterproof, lighter, and less expensive than traditional glass neon tubes — with the same visual impact."
      },
      {
        q: "Can I get a custom neon sign in any color or shape?",
        a: "Yes! We produce custom neon LED signs in virtually any color, font, design, or shape. If you can sketch it or describe it, we can make it. Perfect for logos, quotes, names, and decorative signs."
      },
      {
        q: "How much does a custom neon LED sign cost in Fort Lauderdale?",
        a: "Custom neon LED sign pricing depends on size, complexity, and quantity. Small neon signs typically start around $169. Get a free instant quote online or call 305-967-1005 for a custom price."
      },
      {
        q: "Are your neon LED signs suitable for outdoor use?",
        a: "Yes, we offer both indoor and outdoor-rated LED neon signs. Outdoor neon signs are weatherproof and UV-resistant — important for South Florida's sun and humidity."
      },
      {
        q: "How long does it take to make a custom neon sign?",
        a: "Standard custom neon LED signs are ready in 3–7 business days. Rush production may be available — call 305-967-1005 to discuss your timeline."
      }
    ]
  },

  "programmable-led-signs": {
    id: "programmable-led-signs",
    cityName: "Fort Lauderdale",
    state: "FL",
    metaTitle: "Programmable LED Signs Fort Lauderdale FL | LED Display Signs | Nano Signs",
    title: "Programmable LED Signs & Digital Displays — Fort Lauderdale FL",
    description: "Custom programmable LED signs & digital display signs for businesses in Fort Lauderdale, Fort Lauderdale, Oakland Park & Broward County FL. Update your message anytime. Free quote: 305-967-1005.",
    heroSubtitle: "Programmable LED Signs & Digital Signage for South Florida Businesses",
    heroImage: "/images/hero_image_main.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs supplies and installs programmable LED signs and digital display signs for businesses throughout Fort Lauderdale, Fort Lauderdale, and Broward County, Florida.

Programmable LED signs let you change your message, promotions, and announcements in real time — from your phone, tablet, or computer. They are the most effective way to capture attention and communicate with customers passing by your business location.

We carry a full range of programmable LED sign options: single-line and multi-line scrolling LED signs, full-color LED matrix displays, outdoor LED billboard signs, and interior digital menu boards. All units are commercial-grade, weatherproof (for outdoor use), and come with user-friendly software for easy content updates.

Our team handles site surveys, permitting assistance, installation, and training for all programmable LED sign installations across Fort Lauderdale, Oakland Park, Pompano Beach, Plantation, Hollywood, and surrounding cities.`,
    services: [
      { name: "Programmable LED Scrolling Signs", href: "/led-display-signs" },
      { name: "Full-Color LED Display Signs", href: "/led-display-signs" },
      { name: "Outdoor LED Billboard Signs", href: "/led-display-signs" },
      { name: "Indoor LED Display Boards", href: "/led-display-signs" },
      { name: "Digital Menu Boards", href: "/led-display-signs" },
      { name: "LED Sign Installation Fort Lauderdale", href: "/led-display-signs" },
      { name: "LED Signs for Restaurants", href: "/led-display-signs" },
      { name: "LED Signs for Retail Stores", href: "/led-display-signs" },
    ],
    faqs: [
      {
        q: "What are programmable LED signs?",
        a: "Programmable LED signs are electronic display signs that you can update remotely via software, an app, or a USB stick. They let you change text, images, and animations anytime — perfect for promotions, hours, menus, and announcements."
      },
      {
        q: "Do you sell programmable LED signs in Fort Lauderdale?",
        a: "Yes, Nano Signs supplies and installs programmable LED signs throughout Fort Lauderdale, Fort Lauderdale, Oakland Park, Pompano Beach, Plantation, Deerfield Beach, and all of Broward County, FL."
      },
      {
        q: "How much do programmable LED signs cost?",
        a: "Programmable LED sign pricing varies by size, resolution, and features. Small indoor scrolling signs start around $300. Outdoor full-color LED displays vary widely based on dimensions. Call 305-967-1005 for a free quote."
      },
      {
        q: "Can programmable LED signs be used outdoors in Florida?",
        a: "Yes! Our outdoor programmable LED signs are weatherproof, UV-stabilized, and rated for South Florida's intense heat, humidity, and sun exposure. They maintain vibrant brightness even in direct sunlight."
      },
      {
        q: "Do you install programmable LED signs in Fort Lauderdale?",
        a: "Yes, our experienced team handles complete programmable LED sign installation in Fort Lauderdale and throughout Broward County. We also provide training so you can easily update your sign content."
      },
      {
        q: "What businesses benefit most from programmable LED signs?",
        a: "Restaurants, gas stations, car dealerships, retail stores, churches, schools, and any business on a high-traffic road benefit greatly from programmable LED signs. They dramatically increase visibility and foot traffic."
      }
    ]
  },

  "roll-up-banners": {
    id: "roll-up-banners",
    cityName: "Fort Lauderdale",
    state: "FL",
    metaTitle: "Roll Up Banners & Retractable Banners Fort Lauderdale FL | Nano Signs",
    title: "Roll-Up Banners & Retractable Banners — Fort Lauderdale & Fort Lauderdale FL",
    description: "Custom roll-up banners & retractable banner stands in Fort Lauderdale & Fort Lauderdale FL. Trade show banners, step-and-repeat, pop-up displays. Fast print & delivery. Call 305-967-1005.",
    heroSubtitle: "Professional Roll-Up & Retractable Banner Printing in South Florida",
    heroImage: "/images/hero_image_main.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs prints and assembles premium roll-up banners and retractable banner stands for businesses, trade shows, events, and promotions throughout Fort Lauderdale, Fort Lauderdale, and Broward County, Florida.

Our roll-up banners (also called retractable banners or pull-up banners) are the most popular portable display solution for trade shows, conferences, retail promotions, and event marketing. They set up in seconds, roll back into a compact carry case, and are reusable for years.

We offer a wide selection of roll-up banner sizes — standard 33" x 78", wide 47" x 78", and custom sizes — with high-resolution print on premium durable media. Our banner stands come in economy, standard, and premium models to fit every budget.

Same-week turnaround available for most orders. Perfect for upcoming trade shows, grand openings, product launches, and any event where you need a professional, eye-catching display.`,
    services: [
      { name: "Standard Roll-Up Banners 33\" x 78\"", href: "/trade-show" },
      { name: "Wide Retractable Banners 47\" x 78\"", href: "/trade-show" },
      { name: "Premium Retractable Banner Stands", href: "/trade-show" },
      { name: "Outdoor Retractable Banners", href: "/trade-show" },
      { name: "Step-and-Repeat Banners", href: "/custom-banners" },
      { name: "Trade Show Display Packages", href: "/trade-show" },
      { name: "Feather & Teardrop Flags", href: "/custom-flags" },
      { name: "Pop-Up Display Backdrops", href: "/trade-show" },
    ],
    faqs: [
      {
        q: "Do you print roll-up banners in Fort Lauderdale or Fort Lauderdale?",
        a: "Yes! Nano Signs prints custom roll-up banners and retractable banner stands in Fort Lauderdale FL, with same-week delivery throughout Fort Lauderdale and Broward County. Walk in or order online."
      },
      {
        q: "What sizes do your roll-up banners come in?",
        a: "We offer standard 33\" x 78\", wide 47\" x 78\", and fully custom sizes. We also print replacement graphics for existing banner stands — just bring in your stand or tell us the dimensions."
      },
      {
        q: "What are roll-up banners used for?",
        a: "Roll-up banners are perfect for trade shows, conferences, retail promotions, grand openings, real estate open houses, school events, medical offices, and anywhere you need a portable, professional display."
      },
      {
        q: "How quickly can you print a roll-up banner?",
        a: "Most roll-up banner orders in Fort Lauderdale are ready in 1–3 business days. Rush next-day production is often available — call 305-967-1005 for urgent orders before your trade show or event."
      },
      {
        q: "What material are your roll-up banners printed on?",
        a: "We print on premium 13oz vinyl or tear-resistant polyester media depending on the application. All banners use UV-resistant inks for vibrant, long-lasting color. Indoor and outdoor-rated options available."
      },
      {
        q: "Can I get a free quote for a roll-up banner?",
        a: "Absolutely. Visit nano-signs.com/get-a-quote, call 305-967-1005, or walk in to our Fort Lauderdale shop at 4567 Powerline Rd. We'll give you a same-day quote."
      }
    ]
  }
};

