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
  "fort-lauderdale": {
    id: "fort-lauderdale",
    cityName: "Fort Lauderdale",
    state: "FL",
    metaTitle: "Sign Company Fort Lauderdale FL | Custom Signs & Banners | Nano Signs",
    title: "Fort Lauderdale Sign Company & Print Shop",
    description: "Fort Lauderdale's premier commercial sign company — Nano Signs. Custom storefront signs, LED displays, banner printing, neon signs & vehicle wraps serving Fort Lauderdale, Oakland Park & all of Broward County. Call (305) 967-1005 for a free quote.",
    heroSubtitle: "Premier Commercial Signage & Wide-Format Printing for Fort Lauderdale Businesses",
    heroImage: "/images/hero-signs.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs is the leading sign company and commercial print provider serving Fort Lauderdale and all of Broward County. Conveniently located at 4567 Powerline Rd (also known as 4567 NW 9th Ave) on the Fort Lauderdale / Oakland Park commercial corridor, we provide turnkey signage design, in-house fabrication, permitting assistance, and certified structural installation.

From Las Olas Boulevard restaurants and downtown corporate offices to commercial industrial parks across Broward County, we manufacture high-performance signage engineered to meet South Florida High-Velocity Hurricane Zone (HVHZ) building codes and resist intense coastal sun, heat, and humidity.

Our Fort Lauderdale sign shop handles projects of any scale — from individual architectural storefront channel letters and illuminated LED monument signs to fleet vehicle lettering, trade show displays, and next-day vinyl banners.`,
    services: [
      { name: "Custom Business Signs", href: "/custom-signs" },
      { name: "Storefront Channel Letters", href: "/custom-signs/channel-letters" },
      { name: "LED Display Signs", href: "/led-display-signs" },
      { name: "Custom Neon Signs", href: "/neon-signs" },
      { name: "Vinyl Banner Printing", href: "/custom-banners" },
      { name: "Vehicle Wraps & Decals", href: "/custom-decals" },
      { name: "Trade Show Displays", href: "/trade-show" },
      { name: "Real Estate & Yard Signs", href: "/custom-signs" },
      { name: "Custom Advertising Flags", href: "/custom-flags" },
      { name: "Commercial Marketing Printing", href: "/marketing-materials" },
    ],
    faqs: [
      {
        q: "Where is Nano Signs located in relation to Fort Lauderdale?",
        a: "Nano Signs is located at 4567 Powerline Rd (also designated as 4567 NW 9th Ave), Fort Lauderdale / Oakland Park, FL 33309. We are conveniently situated right on the main commercial corridor minutes from downtown Fort Lauderdale, I-95, and Commercial Blvd."
      },
      {
        q: "What types of custom signs do you manufacture for Fort Lauderdale businesses?",
        a: "We manufacture all types of commercial signage including exterior channel letters, illuminated LED monument signs, dimensional acrylic logos, commercial aluminum signs, vinyl banners, vehicle fleet wraps, and trade show displays."
      },
      {
        q: "Do you offer on-site sign installation in Fort Lauderdale and Broward County?",
        a: "Yes. Our licensed and insured installation crews handle on-site sign installation throughout Fort Lauderdale, Oakland Park, Pompano Beach, Hollywood, Plantation, Boca Raton, and all surrounding South Florida cities."
      },
      {
        q: "How fast can I get a quote for my Fort Lauderdale sign project?",
        a: "You can request a free quote online at nano-signs.com/get-a-quote or call our local team directly at (305) 967-1005. Most quotes are prepared with line-item estimates within 4 business hours."
      }
    ]
  },
  "oakland-park": {
    id: "oakland-park",
    cityName: "Oakland Park",
    state: "FL",
    metaTitle: "Sign Shop Oakland Park FL | Custom Signs, Banners & Printing | Nano Signs",
    title: "Oakland Park Sign Shop & Production Facility",
    description: "Oakland Park's local sign shop and manufacturing hub — Nano Signs at 4567 Powerline Rd (4567 NW 9th Ave). Custom signs, banners, LED displays & neon signs with next-day local pickup. Call (305) 967-1005.",
    heroSubtitle: "Your Local Sign Shop & Direct Manufacturing Facility on Powerline Rd, Oakland Park FL",
    heroImage: "/images/hero-signs.jpg",
    schemaType: "LocalBusiness",
    bodyContent: `Nano Signs operates its primary South Florida production plant and customer showroom at 4567 Powerline Rd (also designated as 4567 NW 9th Ave), Oakland Park, FL 33309 — serving Oakland Park, Fort Lauderdale, and the greater Broward County metropolitan area.

By manufacturing directly in our Oakland Park facility, we eliminate middleman markups and offer rapid turnaround times — including same-day and 24-hour rush production on trade show displays, banners, and construction signs.

Visit our local showroom Monday through Friday to examine physical material samples (such as marine-grade aluminum, cast acrylic, LED neon modules, and stay-flat vinyl) and consult directly with our pre-press designers.`,
    services: [
      { name: "Custom Business Signs", href: "/custom-signs" },
      { name: "Banner Printing Oakland Park", href: "/custom-banners" },
      { name: "LED Display Signs", href: "/led-display-signs" },
      { name: "Custom Neon Signs", href: "/neon-signs" },
      { name: "Vehicle Lettering & Magnets", href: "/vehicle-signs" },
      { name: "Custom Flags & Teardrop Banners", href: "/custom-flags" },
      { name: "Trade Show Booth Displays", href: "/trade-show" },
      { name: "A-Frame Sidewalk Signs", href: "/custom-signs/a-frame-signs" },
      { name: "Coroplast Yard Signs", href: "/custom-signs" },
      { name: "Sign Supplies & Hardware", href: "/signs-supply" },
    ],
    faqs: [
      {
        q: "Where is your Oakland Park sign shop located?",
        a: "Our shop and production facility is located at 4567 Powerline Rd (4567 NW 9th Ave), Fort Lauderdale / Oakland Park, FL 33309. We are open Monday through Friday, 9:00 AM to 6:00 PM for client consultations and order pickups."
      },
      {
        q: "Can I inspect sign and banner material samples in person?",
        a: "Yes! Walk-ins are always welcome at our Oakland Park showroom to view illuminated LED signs, neon colors, and sample print materials before placing an order."
      },
      {
        q: "What is the typical turnaround time for orders placed at your Oakland Park shop?",
        a: "Standard production turnaround is 2 to 4 business days. Same-day and next-day rush options are available for banners, poster prints, and job-site signage."
      },
      {
        q: "How can I contact the Oakland Park shop for a custom quote?",
        a: "Submit your artwork and dimensions online at nano-signs.com/get-a-quote or call our local team at (305) 967-1005."
      }
    ]
  },
  "florida-led-signs": {
    id: "florida-led-signs",
    cityName: "Florida",
    state: "FL",
    metaTitle: "LED Signs Florida | Programmable LED Displays & Neon Signs | Nano Signs",
    title: "Florida LED Sign Company & Programmable Displays",
    description: "Top-rated LED sign company serving Florida statewide from our Fort Lauderdale / Oakland Park facility. Programmable LED displays, neon signs & digital billboards. Call (305) 967-1005.",
    heroSubtitle: "Commercial-Grade LED Signs & Programmable Displays Engineered for Florida Weather",
    heroImage: "/images/hero-signs.jpg",
    schemaType: "Service",
    bodyContent: `Nano Signs is Florida's trusted source for programmable electronic message centers (EMCs), full-color outdoor LED display signs, and custom neon lighting. Headquartered in Broward County, we manufacture, ship, and install commercial digital signage across the entire state of Florida.

All exterior LED displays engineered by Nano Signs feature IP65 weatherproof enclosures and high-output SMD modules (6,000 to 8,500 Nits) designed to cut through bright Florida daylight and endure tropical storm wind loads.

From retail storefronts and car dealerships along the coast to educational campuses and worship centers statewide, our programmable displays provide effortless remote cloud control and real-time scheduling.`,
    services: [
      { name: "Programmable LED Scrolling Signs", href: "/led-display-signs" },
      { name: "Outdoor LED Digital Billboards", href: "/led-display-signs" },
      { name: "Indoor High-Res LED Video Walls", href: "/led-display-signs" },
      { name: "Custom Neon Signs", href: "/neon-signs" },
      { name: "Illuminated Channel Letters", href: "/custom-signs/channel-letters" },
      { name: "Wholesale LED Display Modules", href: "/signs-supply" },
    ],
    faqs: [
      {
        q: "Do you ship and install programmable LED signs across Florida?",
        a: "Yes, we ship and support programmable LED signs and modular panels across Florida, with direct certified installation throughout Broward, Miami-Dade, and Palm Beach counties."
      },
      {
        q: "Are your outdoor LED signs rated for Florida hurricanes and heat?",
        a: "Yes, our outdoor cabinets feature IP65 waterproof gaskets, convective airflow cooling, and heavy-gauge aluminum structural frames engineered to meet Florida Building Code wind load criteria."
      },
      {
        q: "How do I program and update my LED sign message?",
        a: "Every programmable LED sign from Nano Signs connects via Wi-Fi, Ethernet, or Cloud 4G LTE, allowing you to update scrolling text, schedules, and animations from your smartphone or desktop browser."
      }
    ]
  }
};
