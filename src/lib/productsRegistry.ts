// import { ledProducts } from "./ledProducts";
import { ProductPageConfig } from "@/components/SignProductPage";

export interface RegistryProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  hoverImage?: string;
  price: string;
  badge?: string;
  config: ProductPageConfig;
}

export interface RegistryCategory {
  title: string;
  description: string;
  heroImage: string;
  tabletHeroImage?: string;
  mobileHeroImage?: string;
  heroSubtitle?: string;
  breadcrumbLabel?: string;
  products: RegistryProduct[];
  categoryDescriptionText?: string;
  categorySecondaryImage?: string;
  faqs?: { q: string; a: string }[];
  reviewRating?: string;
  reviewCount?: string;
  reviewQuote?: string;
}

export const PRODUCTS_REGISTRY = {
  "neon-signs": {
    title: "Neon Signs",
    breadcrumbLabel: "Neon Signs",
    heroSubtitle: "Vibrant. Custom. Built to Last.",
    description: "Design premium, bespoke illuminated neon displays for business backdrops, storefronts, and offices.",
    heroImage: "/images/products/neon/nano-signs-good-vibes-neon-canada.webp",
    tabletHeroImage: "/images/products/neon/nano-signs-good-vibes-neon-canada.webp",
    mobileHeroImage: "/images/products/neon/nano-signs-good-vibes-neon-canada.webp",
    reviewRating: "4.9",
    reviewCount: "184",
    reviewQuote: "Absolutely perfect. Bright, flawless, and arrived earlier than expected!",
    categoryDescriptionText: "<h2>Custom Neon LED Signs: Brighten Your Space</h2><p>Create a vibrant, customized atmosphere for your business storefront, wedding backdrop, home décor, or events. At Nano Signs, we specialize in high-quality <strong>LED Neon Signs</strong> that offer the timeless, classic glow of traditional glass neon, but with modern durability and energy efficiency.</p><h3>Custom vs. Pre-made Neon Signs</h3><p>Choose from our extensive collection of pre-made, ready-to-ship neon designs like our popular 'Good Vibes Only' and 'Let\\'s Party' signs, perfect for instant room upgrades. Or, bring your unique vision to life with our <strong>Custom Neon Sign</strong> service. We can fabricate any logo, phrase, or design into a brilliant LED masterpiece tailored to your exact specifications.</p><h3>LED Neon vs. Traditional Glass Neon</h3><p>Why choose LED? Our modern LED neon signs are shatterproof, cool to the touch, and consume up to 80% less energy than traditional glass neon. They are lightweight, easy to install, and come with adjustable brightness settings, giving you the perfect glow without the high maintenance or safety concerns of traditional gas-filled glass tubes.</p><h3>Pricing & Installation</h3><p>We offer competitive pricing on all our neon signs, with pre-made options starting as low as $139.00. Every sign comes complete with a transparent acrylic backing, a power adapter, and a simple mounting kit for effortless installation. Shop our collection below or contact us today for a custom quote!</p>",
    products: [
      { id: "good-vibes-only", name: "Neon LED Good Vibes Only",
        description: "Brighten up your space with this highly inspirational and motivational neon LED sign. Perfect for homes, offices, and studios.", image: "/images/products/neon/nano-signs-good-vibes-neon-canada.webp", price: "$169.00", badge: "Popular" },
      { id: "lets-party", name: "Neon LED Let's Party",
        description: "Set the perfect mood for your next event or venue with this vibrant Bar & Party neon LED sign. Ideal for nightlife and home bars.", image: "/images/products/neon/nano-signs-lets-party-neon-canada.webp", price: "$189.00", badge: "Popular" },
      { id: "game-on", name: "Neon LED Game On",
        description: "Level up your gaming room aesthetic with this striking neon LED sign. Designed specifically for gamers and streaming setups.", image: "/images/products/neon/nano-signs-game-controller-neon-canada.webp", price: "$159.00", badge: "Popular" },
      { id: "dream-big", name: "Neon LED Dream Big",
        description: "Brighten up your space with this highly inspirational and motivational neon LED sign. Perfect for homes, offices, and studios.", image: "/images/products/neon/nano-signs-dream-big-neon-canada.webp", price: "$149.00", badge: "Popular" },
      { id: "bar-open", name: "Neon LED Bar Open",
        description: "Set the perfect mood for your next event or venue with this vibrant Bar & Party neon LED sign. Ideal for nightlife and home bars.", image: "/images/products/neon/nano-signs-bar-neon-canada.webp", price: "$179.00", badge: "Popular" },
      { id: "hustle", name: "Neon LED Hustle",
        description: "Brighten up your space with this highly inspirational and motivational neon LED sign. Perfect for homes, offices, and studios.", image: "/images/products/neon/nano-signs-hustle-neon-canada.webp", price: "$139.00", badge: "Popular" },
      { id: "open-24-7", name: "Neon LED Open 24/7",
        description: "Attract more foot traffic and let customers know you're open with this eye-catching commercial business neon LED sign.", image: "/images/products/neon/nano-signs-open-neon-canada.webp", price: "$169.00", badge: "Popular" },
      { id: "stay-wild", name: "Neon LED Stay Wild",
        description: "Brighten up your space with this highly inspirational and motivational neon LED sign. Perfect for homes, offices, and studios.", image: "/images/products/neon/nano-signs-stay-wild-neon-canada.webp", price: "$159.00", badge: "Popular" },
      { id: "love-her-wild", name: "Neon LED Love Her Wild",
        description: "Add a touch of modern elegance and warm ambiance to your living space with this beautiful home decor neon LED sign.", image: "/images/products/neon/nano-signs-love-wild-neon-canada.webp", price: "$179.00", badge: "Popular" },
      { id: "glow-getter", name: "Neon LED Glow Getter",
        description: "Brighten up your space with this highly inspirational and motivational neon LED sign. Perfect for homes, offices, and studios.", image: "/images/products/neon/nano-signs-glow-getter-neon-canada.webp", price: "$149.00", badge: "Popular" },
      { id: "man-cave", name: "Neon LED Man Cave",
        description: "Add a touch of modern elegance and warm ambiance to your living space with this beautiful home decor neon LED sign.", image: "/images/products/neon/nano-signs-man-cave-neon-canada.webp", price: "$169.00", badge: "Popular" },
      { id: "adventure-awaits", name: "Neon LED Adventure Awaits",
        description: "Add a touch of modern elegance and warm ambiance to your living space with this beautiful home decor neon LED sign.", image: "/images/products/neon/nano-signs-adventure-neon-canada.webp", price: "$179.00", badge: "Popular" }
    ].map(p => ({
      ...p,
      config: {
        title: p.name,
        subtitle: p.description,
        breadcrumb: "Neon Signs",
        breadcrumbHref: "/neon-signs",
        promoText: "PREMIUM QUALITY NEON SIGNS",
        image: p.image,
        ratingCount: "25",
        ratingScore: "4.9",
        sizes: [
          { label: "Standard Size", value: "standard", basePrice: parseFloat(p.price.replace("$", "")) }
        ],
        selects: [
          {
            label: "Color",
            options: [
              { label: "Pink", value: "pink", priceAdder: 0 },
              { label: "Blue", value: "blue", priceAdder: 0 },
              { label: "Warm White", value: "warm-white", priceAdder: 0 }
            ]
          }
        ],
        qtyDiscount: "",
        keyFeatures: ["Energy efficient LED", "Shatterproof silicone", "Includes mounting kit", "1 Year Warranty"],
        useCases: ["Home decor", "Parties", "Bedrooms", "Storefronts"],
        specs: [{ key: "Material", value: "LED flex neon" }, { key: "Lifespan", value: "50,000 hours" }, { key: "Power", value: "12V adapter included" }],
        faqs: [],
        reviews: [],
        ctaHeading: "Ready to glow?",
        ctaLabel: "Add to Cart"
      }
    }))
  },
  "custom-banners": {
    title: "Custom Banners",
    breadcrumbLabel: "Custom Banners",
    heroSubtitle: "Maximum Visibility. Rapid Turnaround. Built to Last.",
    description:
      "Premium printed banners for every event. Whether you need rugged outdoor vinyl or sleek retractable displays, we deliver the perfect branding solution.",
    heroImage: "/images/products/main-page/banners_hero_image-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/banners_hero_image-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/banners_hero_image-toronto-printing-ca.webp",
    reviewRating: "4.9",
    reviewCount: "2,680",
    reviewQuote:
      "Absolutely stunning print quality—the colors pop perfectly and the materials are super durable. Arrived lightning fast!",
    categoryDescriptionText:
      "Explore our comprehensive range of high-definition custom banners. From weatherproof vinyl and wind-resistant mesh for construction fences to luxurious fabric backdrops and portable roll-up stands, Nano Signs delivers it all. Every banner is produced in-house using advanced printing technology and UV-resistant inks.",
    categorySecondaryImage:
      "/images/products/main-page/banners_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "How do vinyl and fabric banners differ?",
        a: "Vinyl is a heavy-duty, waterproof material perfect for exterior use. Fabric provides an elegant, glare-free finish suited for trade shows and indoor events, plus it can be washed.",
      },
      {
        q: "Are mounting grommets included?",
        a: "Absolutely. We install durable brass grommets along the edges of our vinyl and fabric banners at no additional cost for effortless mounting.",
      },
      {
        q: "Can I use roll-up banners outside?",
        a: "Roll-up stands are intended for indoor environments. While they can survive briefly outside on calm days, their lightweight base makes them susceptible to wind.",
      },
    ],
    products: [
      {
        id: "vinyl-banners",
        name: "Vinyl Banners",
        description: "Rugged, weatherproof banners perfect for any environment. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/vinyl_banner-toronto-printing-ca.webp",
        price: "Starting at $45.00",
        badge: "Most Popular",
        config: {
          title: "Custom Vinyl Banners",
          subtitle:
            "Heavy-duty, weather-resistant vinyl prints finished with your choice of grommets or pole pockets.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF ALL VINYL BANNERS - FAST SHIPPING",
          image: "/images/products/main-page/vinyl_banner-toronto-printing-ca.webp",
          ratingCount: "1,530",
          ratingScore: "4.8",
          sizes: [
            { label: "2' x 4' Small Banner", value: "24x48", basePrice: 40.19 },
            {
              label: "3' x 6' Standard Banner",
              value: "36x72",
              basePrice: 90.99,
            },
            { label: "4' x 8' Large Banner", value: "48x96", basePrice: 160 },
            { label: "Custom Size", value: "custom", basePrice: 0 },
          ],
          selects: [
            {
              label: "Material Style",
              options: [
                {
                  label: "13oz Standard Gloss Vinyl",
                  value: "13oz_gloss",
                  priceAdder: 0,
                },
                {
                  label: "15oz Premium Matte Vinyl",
                  value: "15oz_matte",
                  priceAdder: 5.0,
                },
              ],
            },
            {
              label: "Finishing Option",
              options: [
                {
                  label: "No Grommets",
                  value: "no_grommets",
                  priceAdder: 0,
                },
                {
                  label: " 4 Grommets (Every corner)",
                  value: "grommets",
                  priceAdder: 4,
                },
                {
                  label: "3-inch Pole Pockets",
                  value: "pockets",
                  priceAdder: 0,
                  priceMultiplier: 1.2,
                },
              ],
            },
          ],
          qtyDiscount: "Save up to 15% on bulk banner orders",
          keyFeatures: [
            "Waterproof & UV resistant",
            "Heat-welded hems for extra strength",
            "Vibrant full-color digital printing",
          ],
          useCases: [
            "Storefront advertising",
            "Outdoor events",
            "Grand openings",
            "Sponsorship banners",
          ],
          specs: [
            { key: "Material", value: "13oz or 15oz flexible PVC vinyl" },
            { key: "Print Resolution", value: "1440 DPI High Definition" },
            {
              key: "Outdoor Lifespan",
              value: "3-5 years in standard conditions",
            },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Ready to design your banner?",
        },
      },
      {
        id: "fabric-banners",
        name: "Fabric Banners",
        description: "Wrinkle-resistant dye-sublimation polyester with a matte look. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/fabric_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 64.39",
        badge: "Premium",
        config: {
          title: "Custom Fabric Banners",
          subtitle:
            "High-end dye-sub printed graphics on washable knit fabric.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF LUXURY FABRIC BANNERS",
          image: "/images/products/main-page/fabric_banner-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/fabric_banner-toronto-printing-ca.webp",
            "/images/products/gallery/fabric_banner_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/fabric_banner_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/fabric_banner_use_1-toronto-printing-ca.webp",
          ],
          ratingCount: "980",
          ratingScore: "4.9",
          sizes: [
            { label: "2' x 6' Small Banner", value: "24x72", basePrice: 65.39 },
            {
              label: "3' x 8' Standard Banner",
              value: "36x96",
              basePrice: 104.99,
            },
            { label: "4' x 8' Large Banner", value: "48x96", basePrice: 132.99 },
          ],
          selects: [
            {
              label: "Fabric Material",
              options: [
                {
                  label: "Premium Dye-Sub Polyester",
                  value: "polyester",
                  priceAdder: 0,
                  description:
                    "Vibrant dye-sublimation on wrinkle-resistant, washable polyester.",
                },
                {
                  label: "Satin Fabric",
                  value: "satin",
                  priceAdder: 12.0,
                  description:
                    "Luxurious sheen with rich, deep colors. Ideal for upscale events.",
                },
                {
                  label: "Velvet Fabric",
                  value: "velvet",
                  priceAdder: 20.0,
                  description:
                    "Premium velvet texture for an elegant, high-end look.",
                },
              ],
            },
            {
              label: "Banner Stand Hardware",
              options: [
                { label: "No Stand", value: "none", priceAdder: 0 },
                { label: "X-Banner Stand", value: "x_stand", priceAdder: 35.0 },
                { label: "L-Banner Stand", value: "l_stand", priceAdder: 55.0 },
              ],
            },
          ],
          qtyDiscount: "Bulk savings apply",
          keyFeatures: [
            "Wrinkle-resistant knit polyester",
            "Dye-sub infused ink (never cracks or peels)",
            "Machine washable and reusable",
          ],
          useCases: [
            "Lobbies & offices",
            "Trade show backdrops",
            "Press releases",
            "Upscale retail window displays",
          ],
          specs: [
            { key: "Material", value: "100% Knit Polyester Fabric" },
            { key: "Printing Type", value: "Dye-Sublimation Heat Transfer" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Elevate your indoor displays",
        },
      },
      {
        id: "mesh-banners",
        name: "Mesh Banners",
        description: "Perforated vinyl that allows wind to pass through, ideal for fences. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/mesh_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 60.19",
        badge: "Wind-Resistant",
        config: {
          title: "Custom Mesh Banners",
          subtitle:
            "Breathable perforated mesh vinyl designed to let wind pass freely, ideal for outdoor enclosures.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF ALL MESH FENCE BANNERS",
          image: "/images/products/main-page/mesh_banner-toronto-printing-ca.webp",
          ratingCount: "680",
          ratingScore: "4.8",
          sizes: [
            {
              label: "2' x 6' Small Fence Banner",
              value: "24x72",
              basePrice: 60.19,
            },
            {
              label: "3' x 8' Standard Fence Banner",
              value: "36x96",
              basePrice: 90.99,
            },
            {
              label: "4' x 8' Large Fence Banner",
              value: "48x96",
              basePrice: 118.99,
            },
          ],
          selects: [
            {
              label: "Material Style",
              options: [
                {
                  label: "8oz Perforated Wind Mesh Vinyl",
                  value: "8oz_mesh",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Bulk pricing available for large construction and boundary orders",
          keyFeatures: [
            "70/30 air flow pass-through design",
            "Reduces wind load stress on fences",
            "Metal brass grommets included",
          ],
          useCases: [
            "Construction sites",
            "Sports field fences",
            "Scaffolding signs",
            "High-wind zones",
          ],
          specs: [{ key: "Material", value: "8oz PVC Mesh Vinyl" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Order your breathable fence banner",
        },
      },
      {
        id: "pole-banners",
        name: "Pole Banners",
        description:
          "Twin-sided boulevard banners featuring integrated pockets for lamppost mounting.",
        image: "/images/products/main-page/pole_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 41.99",
        config: {
          title: "Custom Pole Banners",
          subtitle:
            "Commercial-grade, dual-sided street banners engineered with mounting sleeves for urban light poles.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF STREET & BOULEVARD POLE BANNERS",
          image: "/images/products/main-page/pole_banner-toronto-printing-ca.webp",
          ratingCount: "210",
          ratingScore: "4.7",
          sizes: [
            {
              label: '18" x 36" Small Pole Banner',
              value: "36x18",
              basePrice: 41.99,
            },
            {
              label: '24" x 48" Standard Pole Banner',
              value: "48x24",
              basePrice: 69.99,
            },
            {
              label: '30" x 60" Large Pole Banner',
              value: "60x30",
              basePrice: 111.99,
            },
          ],
          selects: [
            {
              label: "Material Strength",
              options: [
                {
                  label: "18oz Double-Sided Blockout Vinyl",
                  value: "18oz_blockout",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Municipal discounts available for bulk avenue orders",
          keyFeatures: [
            "Opaque 18oz blockout material stops light penetration",
            "Printed on both sides",
            "Durable mounting sleeves",
          ],
          useCases: [
            "Main street lamppost decorations",
            "University campus wayfinding",
            "Seasonal city events",
          ],
          specs: [
            { key: "Material", value: "18oz Blockout Vinyl" },
            { key: "Finishing", value: '3" flat pole pockets on top & bottom' },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Enhance your streetscape",
        },
      },
      {
        id: "breakaway-banners",
        name: "Breakaway Banners",
        description: "Tear-away sports entrance banners featuring a reusable hook-and-loop center. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/breakaway_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 48.99",
        config: {
          title: "Custom Breakaway Banners",
          subtitle:
            "Dynamic team run-through banners built with a split center for dramatic field entrances.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF SCHOOL SPIRIT BREAKAWAYS",
          image: "/images/products/main-page/breakaway_banner-toronto-printing-ca.webp",
          ratingCount: "135",
          ratingScore: "4.8",
          sizes: [
            {
              label: "8' x 10' Run-Through Banner",
              value: "96x120",
              basePrice: 139.99,
            },
            {
              label: "10' x 12' Giant Team Banner",
              value: "120x144",
              basePrice: 209.99,
            },
          ],
          selects: [
            {
              label: "Pole Handles Finishing",
              options: [
                {
                  label: "Top/Bottom and Side Pole Pockets",
                  value: "sleeves",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Booster club pricing tiers available",
          keyFeatures: [
            "Reusable hook-and-loop center seam",
            "Vibrant school prints",
            "Heavy-duty matte blockout vinyl fabric",
          ],
          useCases: [
            "Football team stadium entry",
            "Pep rallies",
            "High school sports events",
          ],
          specs: [
            {
              key: "Velcro Seams",
              value: "Double stitched hook-and-loop strip center",
            },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Supercharge your team's entrance",
        },
      },
      {
        id: "vertical-banners",
        name: "Vertical Banners",
        description: "Tall hanging displays tailored for narrow columns and hallway spaces. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/vertical_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 27.99",
        config: {
          title: "Custom Vertical Banners",
          subtitle:
            "Elegant portrait-oriented banners perfectly sized for architectural columns, tight retail spaces, and entryways.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF VERTICAL SIGNS & BANNERS",
          image: "/images/products/main-page/vertical_banner-toronto-printing-ca.webp",
          ratingCount: "290",
          ratingScore: "4.7",
          sizes: [
            {
              label: "2' x 6' Vertical Banner",
              value: "72x24",
              basePrice: 27.99,
            },
            {
              label: "3' x 8' Large Vertical Banner",
              value: "96x36",
              basePrice: 48.99,
            },
          ],
          selects: [
            {
              label: "Lamination",
              options: [
                {
                  label: "High Gloss Lamination",
                  value: "gloss",
                  priceAdder: 0,
                },
                {
                  label: "Velvet Matte Finish",
                  value: "matte",
                  priceAdder: 3.5,
                },
              ],
            },
          ],
          qtyDiscount: "Volume tiers starting at 5+ banners",
          keyFeatures: [
            "Space-efficient design",
            "Reinforced corner grommets included",
            "Indoor and outdoor weather-safe",
          ],
          useCases: [
            "Storefront entrance pillars",
            "Indoor corridor directions",
            "Trade show stand fillers",
          ],
          specs: [{ key: "Orientation", value: "Strict vertical layout" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Create pillar-mounted banners",
        },
      },
      {
        id: "roll-up-banners",
        name: "Retractable / Roll-Up Banners",
        description: "Lightweight and instantly deployable roll-up stands for trade shows, retail displays, and exhibitions. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/retractable_roll_up_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 124.60",
        badge: "Best Seller",
        config: {
          title: "Retractable / Roll-Up Banners",
          subtitle:
            "Self-contained retractable display system that deploys instantly for on-the-go marketing.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF RETRACTABLE ROLL-UP BANNERS",
          image: "/images/products/main-page/retractable_roll_up_banner-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/retractable_roll_up_banner-toronto-printing-ca.webp",
            "/images/products/gallery/retractable_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/retractable_use_2-toronto-printing-ca.webp",
            "/images/products/gallery/retractable_use_3-toronto-printing-ca.webp",
          ],
          ratingCount: "1240",
          ratingScore: "4.9",
          sizes: [
            {
              label: '33" x 80" Standard Stand Size',
              value: "33x80",
              basePrice: 109,
            },
            {
              label: '46" x 80" Vertical Size',
              value: "46x80",
              basePrice: 250,
            },
          ],
          selects: [
            {
              label: "Stand Option",
              options: [
                {
                  label: "Standard Silver Cassette Stand",
                  value: "standard_stand",
                  priceAdder: 0,
                },
                {
                  label: "Black Standard Plus Stand",
                  value: "black_plus",
                  priceAdder: 40.5,
                },
                {
                  label: "Professional Luxury Stand",
                  value: "professional",
                  priceAdder: 30,
                },
              ],
            },
          ],
          qtyDiscount: "Bulk discounts starting at 2 or more banners",
          bulkDiscounts: [
            { minQty: 2, discountPercent: 5 },
            { minQty: 5, discountPercent: 10 },
            { minQty: 10, discountPercent: 15 },
            { minQty: 25, discountPercent: 20 },
          ],
          keyFeatures: [
            "Sturdy aluminum base container",
            "Padded carrying case included",
            "Setup in under 60 seconds",
            "Anti-curl curl-free polyester film",
          ],
          useCases: [
            "Trade show booths",
            "Corporate lobbies",
            "Retail announcements",
            "Presentations",
          ],
          specs: [
            { key: "Weight", value: "Approximately 7-10 lbs including stand" },
            { key: "Display Size", value: '79" x 33" (Standard) or 80" x 46" (Large)' },
            {
              key: "Hardware",
              value: "Anodized aluminum body with fold-out feet",
            },
          ],
          description: `Elevate your business presence at conventions, retail spaces, and corporate events with our elite Retractable Roll-Up Stands. These self-contained exhibition displays represent the pinnacle of portable advertising, fusing rugged reliability with effortless assembly and striking aesthetics. 

Each unit is delivered fully assembled, housing your bespoke graphics safely within a protective aluminum base. Deployment is incredibly rapid—just raise the telescopic mast, extract the graphic panel, and secure it. From temporary promotional kiosks to permanent lobby directories, these stands deliver enduring performance.

We manufacture these displays using an advanced anti-curl, block-out polyester substrate. This specialized material completely stops edge curling and prevents background light from washing out your design, guaranteeing a crisp, professional look in any lighting environment. With our rapid turnaround times, you'll always be prepared for your next show.

Advantages of our Roll-Up Systems:
- Superior Anti-Curl Substrate: Engineered to hang perfectly flat without bowing.
- Heavy-Duty Cassette: Anodized aluminum base with fold-out stabilizing feet for reliable outdoor and indoor standee stability.
- Effortless Portability: A padded travel carrying case is included with every order, making transportation a breeze.
- Dynamic Visual Impact: High-resolution UV printing at 1440 DPI delivers vivid, fade-resistant colors that stand out across crowded halls.`,
          faqs: [
            {
              q: "What is the setup process for a pull-up banner?",
              a: "Assembly is effortless. Simply fold out the base feet, insert the telescopic mast, and pull the graphic upward to hook it onto the top. You'll be ready in seconds.",
            },
            {
              q: "Which substrate is printed on?",
              a: "We utilize an elite anti-curl polyester with an opaque blockout backing. This guarantees a flawlessly flat display while preventing rear illumination from washing out your artwork.",
            },
            {
              q: "Can I swap the graphics later?",
              a: "While possible, changing the print requires accessing the tension spring mechanism inside the base. For optimal results, we suggest ordering a complete new unit.",
            },
            {
              q: "How do standard and luxury models differ?",
              a: "Standard units rely on swing-out feet for balance. Our luxury professional models feature an elegant, heavy teardrop base that stands firmly without exposed feet.",
            },
            {
              q: "Are these rated for outdoor use?",
              a: "These stands are engineered for indoor environments. Wind can easily catch the large graphic panel and topple the unit. For outdoor displays, consider our feather flags or A-frames.",
            },
          ],
          reviews: [
            {
              author: "Marcus K., Event Director",
              rating: 5,
              text: "Incredible hardware and print fidelity. The blockout material genuinely prevents curling, and the assembly takes seconds!",
            },
            {
              author: "Sarah J., Retail Manager",
              rating: 5,
              text: "Absolute lifesaver! Arrived exactly when we needed it for our new product launch, and the vivid colors draw customers right in.",
            },
            {
              author: "David T., Startup Founder",
              rating: 5,
              text: "Flawless trade show display. We've hauled this unit across the country to multiple expos and the retracting spring is still strong.",
            },
          ],
          ctaHeading: "Launch your portable promotion",
        },
      },
      {
        id: "x-banner-stands",
        name: "X-Banner Stands",
        description: "Ultra-lightweight tension frames paired with grommeted display prints. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/x_banner_stand-toronto-printing-ca.webp",
        price: "Starting at CAD 69.99",
        config: {
          title: "X-Frame Banner Stands",
          subtitle:
            "Economical free-standing graphics supported by flexible fiberglass tension arms.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF BUDGET X-BANNER DISPLAYS",
          image: "/images/products/main-page/x_banner_stand-toronto-printing-ca.webp",
          ratingCount: "385",
          ratingScore: "4.7",
          sizes: [
            {
              label: '24" x 63" Small X-Stand',
              value: "63x24",
              basePrice: 69.99,
            },
            {
              label: '31" x 70" Large X-Stand',
              value: "70x31",
              basePrice: 97.99,
            },
          ],
          selects: [
            {
              label: "Frame Assembly",
              options: [
                {
                  label: "Include Fiberglass X-Stand & Carrying Bag",
                  value: "full_kit",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Saves up to 15% on bulk packages",
          keyFeatures: [
            "Lightweight carbon-fiberglass frame legs",
            "Super easy backdrop replacements",
            "4 grommeted corners attach to pegs",
          ],
          useCases: [
            "Product marketing roll-outs",
            "Retail storefronts",
            "Special church events",
            "Expositions",
          ],
          specs: [{ key: "Material", value: "13oz Matte PVC Vinyl" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Cost-effective standing displays",
        },
      },
      {
        id: "step-and-repeat-banners",
        name: "Backdrop Banners",
        description: "Perfect for step-and-repeat photography, VIP entryways, and media walls. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/backdrop_banners-toronto-printing-ca.webp",
        price: "Starting at CAD 204.39",
        badge: "Event Ready",
        config: {
          title: "Backdrop Banners",
          subtitle:
            "Massive seamless backwalls engineered for high-profile events and corporate photography.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF STEP AND REPEAT PRESS WALLS",
          image: "/images/products/main-page/backdrop_banners-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/backdrop_banners-toronto-printing-ca.webp",
            "/images/products/gallery/step_repeat_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/step_repeat_use_2-toronto-printing-ca.webp",
            "/images/products/gallery/step_repeat_use_3-toronto-printing-ca.webp",
          ],
          ratingCount: "430",
          ratingScore: "4.8",
          sizes: [
            {
              label: "8' x 8' Square Backdrop",
              value: "96x96",
              basePrice: 249,
            },
            {
              label: "10' x 10' Large Backdrop",
              value: "120x120",
              basePrice: 299,
            },
          ],
          selects: [
            {
              label: "Hardware",
              options: [
                { label: "Banner Only (No Hardware)", value: "none", priceAdder: 0 },
                { label: "Include Adjustable Backdrop Stand", value: "stand", priceAdder: 150 }
              ]
            },
            {
              label: "Material",
              options: [
                { label: "13oz Blockout Matte banner Vinyl", value: "vinyl", priceAdder: 0 },
                { label: "Premium Fabric Material", value: "fabric", priceAdder: 120 }
              ]
            }
          ],
          qtyDiscount: "Event planner package discounts available",
          keyFeatures: [
            "Large seamless backdrops",
            "Pole pockets on top & bottom for mounting",
            "Glariess matte finish ensures clear photography",
          ],
          useCases: [
            "Press conferences",
            "Red carpet arrivals",
            "Wedding photo booths",
            "Corporate events",
          ],
          specs: [{ key: "Material", value: "15oz Blockout Matte Vinyl" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Create your logo background backdrop",
        },
      },
      {
        id: "tabletop-retractable-banners",
        name: "Tabletop Retractables",
        description: "Compact pull-up displays tailored for point-of-sale desks and reception areas. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/tabletop_retractable-toronto-printing-ca.webp",
        price: "Starting at CAD 41.99",
        config: {
          title: "Tabletop Retractable Mini Pull-Up Banners",
          subtitle:
            "Desktop-sized retractable units ideal for close-up marketing and service counters.",
          breadcrumb: "Banners",
          breadcrumbHref: "/custom-banners",
          promoText: "20% OFF TABLETOP RETRACTABLE DISPLAYS",
          image: "/images/products/main-page/tabletop_retractable-toronto-printing-ca.webp",
          ratingCount: "420",
          ratingScore: "4.8",
          sizes: [
            {
              label: '11.75" x 16.5" A3 Size Mini Stand',
              value: "17x11.75",
              basePrice: 55.99,
            },

          ],
          selects: [
            {
              label: "Base Housing",
              options: [
                {
                  label: "Miniature Silver Aluminum Base",
                  value: "mini_silver",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Volume counter-top rates starting at 10+",
          keyFeatures: [
            "Fits compact desk spaces",
            "Retracts into a tiny housing for travel",
            "Smooth banner film ensures high detail readability",
          ],
          useCases: [
            "Counter checkout promotions",
            "Hotel registration desks",
            "Restaurant menus",
            "Job fair table displays",
          ],
          specs: [
            {
              key: "Print Film",
              value: "8mil thick smooth polypropylene film",
            },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Maximize register branding",
        },
      },
    ],
  },
  "custom-flags": {
    title: "Custom Flags",
    breadcrumbLabel: "Custom Flags",
    heroSubtitle: "Weatherproof. High-Visibility. Cost-Effective.",
    description:
      "Seize roadside attention with towering custom flags. Exceptionally effective for retail storefronts, auto dealers, and outdoor festivals.",
    heroImage: "/images/products/main-page/nano_hero_flag_section-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/nano_hero_flag_section-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/nano_hero_flag_section-toronto-printing-ca.webp",
    reviewRating: "4.8",
    reviewCount: "1,920",
    reviewQuote:
      "These flags transformed our street presence! The colors are incredibly rich, and the hardware easily withstands harsh Canadian weather.",
    categoryDescriptionText:
      "Amplify your physical foot traffic with our towering outdoor advertising flags. Engineered to survive heavy wind loads and UV exposure, our flags are printed on advanced knit polyester for striking single or double-sided visuals. Each kit can be paired with premium carbon-fiber poles and various sturdy base mounts.",
    categorySecondaryImage: "/images/products/main-page/flags_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "What types of custom flags do you offer?",
        a: "We provide an extensive selection of promotional flags including feather, teardrop, and rectangular designs.",
      },
      {
        q: "Can I customize both the design and size of my flag?",
        a: "Yes! Our online design tools let you fully customize your flag’s artwork, and we offer a variety of sizes to match your intended use whether it’s for outdoor promotions, indoor displays, or handheld use.",
      },
      {
        q: "What accessories are available for displaying custom flags?",
        a: "We carry a full line of accessories, including outdoor base kits, auger and drive-over bases, indoor flag stands, telescopic handheld poles, spinner poles, and adjustable aluminum brackets to suit any display environment.",
      },
      {
        q: "Are your custom flags suitable for both indoor and outdoor use?",
        a: "Yes! Our custom flags are made with high-quality, durable materials that perform well outdoors in various weather conditions. They're also great for indoor settings like trade shows, storefronts, lobbies, and events. With a wide selection of bases and mounting options, you can easily display your flag wherever you need it.",
      },
      {
        q: "Do your flags come with hardware or do I need to purchase that separately?",
        a: "Many of our flags have optional hardware bundles, but accessories like bases and poles are typically sold separately so you can mix and match based on your needs. Be sure to check the product description for bundling options.",
      },
      {
        q: "Do you offer design assistance for custom flags?",
        a: "Yes! You can start from scratch, use one of our templates, or upload your own artwork. If you need help, our customer support team is happy to assist with setup and design tips.",
      },
    ],
    products: [
      {
        id: "feather-flags",
        name: "Feather Flags",
        description: "Dynamic wind-driven sail flags engineered to capture roadside attention. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/feather_flag-toronto-printing-ca.webp",
        price: "Starting at CAD 80.00",
        badge: "Best Seller",
        config: {
          title: "Custom Feather Flags",
          subtitle:
            "Towering promotional flutter flags crafted from heavy-duty mesh fabric, ready for outdoor mounting.",
          breadcrumb: "Flags",
          breadcrumbHref: "/custom-flags",
          promoText: "20% OFF ALL ADVERTISING FLAGS - SHIPS NEXT DAY",
          image: "/images/products/main-page/feather_flag-toronto-printing-ca.webp",
          ratingCount: "820",
          ratingScore: "4.8",
          sizes: [
            { label: "10 feet", value: "10ft", basePrice: 175 },
            { label: "12 feet", value: "12ft", basePrice: 215 },
            { label: "15 feet", value: "15ft", basePrice: 265 },
          ],
          selects: [
            {
              label: "Options",
              options: [
                { label: "Single-Sided printed", value: "single", priceAdder: 0 },
                { label: "Double-Sided printed", value: "double", sizePriceAdders: { "10ft": 60, "12ft": 55, "15ft": 70 } }
              ]
            }
          ],
          toggleGroups: [
            {
              label: "Print Direction",
              options: [
                {
                  id: "single",
                  label: "Single-Sided (Show through)",
                  priceAdder: 0,
                  description: "Design printed on one side, mirrored on back.",
                },
                {
                  id: "double",
                  label: "Double-Sided (Three layers)",
                  priceAdder: 150.00,
                  sizePriceAdders: {
                    "9ft": 150.00,
                    "10ft": 150.00,
                    "13ft": 160.00,
                    "16ft": 160.00,
                  },
                  description:
                    "Two separate prints with blocker liner in between.",
                },
              ],
            },
          ],
          qtyDiscount: "Save up to 10% on bulk quantities",
          keyFeatures: [
            "Fluttering wind-resistant design",
            "Dye-sublimation high-contrast printing",
            "Flexible fiberglass poles",
            "Carrying bag included",
          ],
          useCases: [
            "Business storefronts",
            "Grand openings",
            "Car dealerships",
            "Outdoor sporting events",
          ],
          specs: [
            { key: "Material", value: "110g Knit Polyester" },
            {
              key: "Pole Material",
              value: "Premium carbon-fiberglass telescoping poles",
            },
            { key: "DPI", value: "720 DPI High density print" },
            { key: "Wind Rating", value: "Up to 30 MPH wind gusts" },
          ],
          faqs: [
            {
              q: "Do these flags rotate in the wind?",
              a: "Yes, our flagpole hardware includes a rotating spindle that allows the flag to pivot 360 degrees to face the oncoming breeze.",
            },
            {
              q: "How long do feather flags last outdoors?",
              a: "With normal day-to-day weather, outdoor flag fabrics last about 6 to 12 months. We recommend taking them inside during severe storms.",
            },
          ],
          reviews: [
            {
              author: "Marcus G.",
              rating: 5,
              text: "Excellent height and print resolution. Brought people in for our bakery open house immediately!",
            },
          ],
          ctaHeading: "Ready to capture passing traffic?",
        },
      },
      {
        id: "teardrop-flags",
        name: "Teardrop Flags",
        description:
          "Distinctive drop-shaped banners engineered to maintain full graphic tension without wind.",
        image: "/images/products/main-page/teardrop_flag-toronto-printing-ca.webp",
        price: "Starting at CAD 49.68",
        config: {
          title: "Custom Teardrop Flags",
          subtitle:
            "Eye-catching curved sail flags that guarantee your branding remains visible and legible at all times.",
          breadcrumb: "Flags",
          breadcrumbHref: "/custom-flags",
          promoText: "20% OFF ALL TEARDROP FLAGS",
          image: "/images/products/main-page/teardrop_flag-toronto-printing-ca.webp",
          ratingCount: "432",
          ratingScore: "4.7",
          sizes: [
            { label: "10 feet", value: "10ft", basePrice: 180 },
            { label: "13 feet", value: "13ft", basePrice: 230 },
            { label: "15 feet", value: "15ft", basePrice: 260 },
          ],
          selects: [
            {
              label: "Options",
              options: [
                { label: "Single-Sided printed", value: "single", priceAdder: 0 },
                { label: "Double-Sided printed", value: "double", sizePriceAdders: { "10ft": 50, "13ft": 50, "15ft": 70 } }
              ]
            }
          ],
          qtyDiscount: "Bulk discounts available",
          keyFeatures: [
            "Stiff teardrop loop structure",
            "Resists flapping noises",
            "Great for indoor trade shows",
            "Durable outdoor knit polyester",
          ],
          useCases: [
            "Corporate events",
            "Store entrances",
            "Sports tournaments",
            "Lobbies",
          ],
          specs: [
            { key: "Material", value: "110g Knit Polyester" },
            { key: "Pole Structure", value: "Flexible composite fiber poles" },
          ],
          faqs: [
            {
              q: "Why choose a teardrop flag?",
              a: "Teardrop flags remain fully tensioned, meaning your branding doesn't wrinkle or fold away even when there is no wind.",
            },
          ],
          reviews: [
            {
              author: "Samantha L.",
              rating: 5,
              text: "The print colors are very rich. Easy to assemble, and looks extremely professional.",
            },
          ],
          ctaHeading: "Command attention with teardrop banners",
        },
      },
      {
        id: "straight-flags",
        name: "Straight Flags",
        description: "Traditional vertical rectangle flags providing maximum printable surface area. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/straight_flag-toronto-printing-ca.webp",
        price: "Starting at CAD 54.37",
        config: {
          title: "Custom Straight Flags",
          subtitle:
            "Bold rectangular upright flags engineered for dominant roadside marketing.",
          breadcrumb: "Flags",
          breadcrumbHref: "/custom-flags",
          promoText: "20% OFF STRAIGHT ADVERTISING FLAGS",
          image: "/images/products/main-page/straight_flag-toronto-printing-ca.webp",
          ratingCount: "295",
          ratingScore: "4.7",
          sizes: [
            { label: "10 feet", value: "10ft", basePrice: 230 },
            { label: "13 feet", value: "13ft", basePrice: 290 },
            { label: "15 feet", value: "15ft", basePrice: 320 },
          ],
          selects: [
            {
              label: "Options",
              options: [
                { label: "Single-Sided printed", value: "single", priceAdder: 0 },
                { label: "Double-Sided printed", value: "double", sizePriceAdders: { "10ft": 70, "13ft": 60, "15ft": 70 } }
              ]
            }
          ],
          qtyDiscount: "Volume discounts apply",
          keyFeatures: [
            "Max advertising real estate",
            "Strong steel frames",
            "Double stitched hems",
          ],
          useCases: ["Auto dealerships", "Real estate sites", "Festivals"],
          specs: [{ key: "Material", value: "110g Knit Polyester" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Configure your vertical flag",
        },
      },
      {
        id: "flags",
        name: "Standard Flags",
        description:
          "Traditional grommeted horizontal flags designed for standard pole mounting and wall displays.",
        image: "/images/products/main-page/flags-toronto-printing-ca.webp",
        price: "Starting at $175.00",
        config: {
          title: "Standard Custom Flags",
          subtitle:
            "Showcase your brand emblem on architectural flagpoles or interior installations.",
          breadcrumb: "Flags",
          breadcrumbHref: "/custom-flags",
          promoText: "20% OFF CUSTOM HANGING FLAGS",
          image: "/images/products/main-page/flags-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/flags-toronto-printing-ca.webp",
            "/images/products/gallery/flag_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/flag_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/flag_use_1-toronto-printing-ca.webp",
          ],
          ratingCount: "612",
          ratingScore: "4.8",
          sizes: [
            {
              label: "3' x 5' Standard Flag",
              value: "36x60",
              basePrice: 60.43,
            },
            { label: "2' x 3' Small Flag", value: "24x36", basePrice: 40.43 },
            { label: "4' x 6' Large Flag", value: "48x72", basePrice: 80.43 },
          ],
          selects: [
            {
              label: "Finishing Option",
              options: [
                {
                  label: "Metal Brass Grommets on Left",
                  value: "grommets",
                  priceAdder: 0,
                },
                {
                  label: "3-inch Pole Sleeve",
                  value: "sleeve",
                  priceAdder: 5.0,
                },
              ],
            },
          ],
          qtyDiscount: "Buy in bulk and save",
          keyFeatures: [
            "Heavy duty canvas header",
            "Rust-proof brass grommets",
            "Lightweight polyester mesh flys easily",
          ],
          useCases: [
            "Business flags",
            "Schools and clubs",
            "Personal/residential poles",
          ],
          specs: [{ key: "Material", value: "115g Polyester Mesh" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Produce your traditional custom flag",
        },
      },
      {
        id: "pennant-flags",
        name: "Pennant Flags",
        description:
          "Classic triangle pennants utilized for collegiate sports and decorative banners.",
        image: "/images/products/main-page/pennant_flag-toronto-printing-ca.webp",
        price: "Starting at CAD 51.11",
        config: {
          title: "Custom Pennant Flags",
          subtitle:
            "Sharp triangular banners built for athletic booster clubs and festive retail atmospheres.",
          breadcrumb: "Flags",
          breadcrumbHref: "/custom-flags",
          promoText: "20% OFF SPIRIT PENNANTS",
          image: "/images/products/main-page/pennant_flag-toronto-printing-ca.webp",
          ratingCount: "140",
          ratingScore: "4.7",
          sizes: [
            {
              label: "3' x 5' Triangle Pennant",
              value: "36x60",
              basePrice: 51.11,
            },
          ],
          selects: [
            {
              label: "Finishing",
              options: [
                { label: "Grommets", value: "grommets", priceAdder: 0 },
                { label: "Pole Sleeve", value: "sleeve", priceAdder: 5.0 },
              ],
            },
          ],
          qtyDiscount: "Bulk school discounts available",
          keyFeatures: [
            "Unique triangular shape",
            "Vibrant dye-sub printing",
            "Indoor/outdoor versatile",
          ],
          useCases: [
            "School gymnasiums",
            "Sports team tailgates",
            "Promotional strings",
          ],
          specs: [{ key: "Material", value: "Knit Polyester" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Design custom spirit pennants",
        },
      },
    ],
  },
  "vehicle-signs": {
    title: "Custom Vehicle Signs",
    breadcrumbLabel: "Vehicle Signs",
    heroSubtitle: "Transform Your Commute Into Marketing.",
    description:
      "Convert your fleet into moving advertisements. Accelerate brand awareness with localized car magnets, window stickers, and branded plates.",
    heroImage: "/images/products/main-page/magnet_hero_image-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/magnet_hero_image-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/magnet_hero_image-toronto-printing-ca.webp",
    reviewRating: "4.9",
    reviewCount: "2,150",
    reviewQuote:
      "These magnetic auto signs are exceptionally reliable. They hold tight on the highway and the vibrant finish grabs attention everywhere.",
    categoryDescriptionText:
      "Capitalize on urban traffic with our robust vehicle advertising products. We supply everything required to brand your auto fleet, including highway-rated magnetic signs, weather-proof bumper stickers, and custom metal license plates. Engineered using premium calendered vinyl and heavy-duty magnetic substrates, our automotive signs resist UV fading and withstand severe weather.",
    categorySecondaryImage: "/images/products/main-page/vehicle_signs_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "Can I mount magnets on aluminum car doors?",
        a: "No, magnetic sheeting only bonds to ferrous steel. We strongly advise testing your vehicle's panel with a standard fridge magnet prior to ordering.",
      },
      {
        q: "Is it safe to remove auto decals later?",
        a: "Absolutely. You can cleanly lift our vinyl by warming it with a heat gun or hairdryer, ensuring your OEM paint remains untouched.",
      },
    ],
    products: [
      {
        id: "bumper-stickers",
        name: "Bumper Stickers",
        description: "Durable bumper decals designed for automotive bumpers and rear windshields. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/bumper_sticker-toronto-printing-ca.webp",
        price: "Starting at CAD 2.24",
        config: {
          title: "Custom Bumper Stickers",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Tough promotional auto stickers manufactured with weatherproof, fade-resistant vinyl.",
          breadcrumb: "Vehicle Signs",
          breadcrumbHref: "/vehicle-signs",
          promoText: "25% OFF BUMPER STICKERS",
          image: "/images/products/main-page/bumper_sticker-toronto-printing-ca.webp",
          ratingCount: "850",
          ratingScore: "4.8",
          sizes: [
            {
              label: '3" x 10" Rectangle Bumper Sticker',
              value: "3x10",
              basePrice: 2.24,
            },
            { label: '4" x 4" Circle Sticker', value: "4x4", basePrice: 3.49 },
          ],
          selects: [
            {
              label: "Finish Options",
              options: [
                {
                  label: "High Gloss Protective UV",
                  value: "gloss",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Bulk packs save up to 80% per sticker",
          keyFeatures: [
            "Premium 4mil vinyl layer",
            "Waterproof and car-wash safe",
            "Easy bubble-free application",
          ],
          useCases: [
            "Business giveaways",
            "School spirit labels",
            "Political campaigns",
          ],
          specs: [
            { key: "Material", value: "4mil calendered white gloss vinyl" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Order automotive decals",
        },
      },
      {
        id: "license-plates",
        name: "License Plates",
        description: "aluminum vanity plates engineered for front vehicle mounting. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/license_plate-toronto-printing-ca.webp",
        price: "Starting at CAD 13.72",
        config: {
          title: "Custom License Plates",
          subtitle:
            "Corrosion-resistant metal auto tags featuring standard pre-cut mounting slots.",
          breadcrumb: "Vehicle Signs",
          breadcrumbHref: "/vehicle-signs",
          promoText: "25% OFF ALUMINUM AUTO PLATES",
          image: "/images/products/main-page/license_plate-toronto-printing-ca.webp",
          ratingCount: "192",
          ratingScore: "4.7",
          sizes: [
            {
              label: '6" x 12" Standard Vehicle Size',
              value: "6x12",
              basePrice: 43.72,
            },
          ],
          selects: [
            {
              label: "Plate Mounting Hole Layout",
              options: [
                {
                  label: "Standard 4 Mounting Slots",
                  value: "slots",
                  priceAdder: 10,
                },
              ],
            },
          ],
          qtyDiscount: "Save on fleet auto plaques",
          keyFeatures: [
            "Rust-free aluminum sheeting",
            "Vibrant colors baked onto metal",
            "Pre-drilled mounting holes",
          ],
          useCases: [
            "Front vanity plates",
            "Company branding",
            "Novelty gifts",
          ],
          specs: [{ key: "Material", value: '0.040" thick Aluminum' }],
          faqs: [],
          reviews: [],
          ctaHeading: "Create your custom auto tag",
        },
      },
      {
        id: "magnetic-signs",
        name: "Magnetic Car Signs",
        description:
          "Heavyweight removable car magnets engineered for rapid installation and removal on automotive doors.",
        image: "/images/products/main-page/vehicle_magnets-toronto-printing-ca.webp",
        price: "Starting at CAD 4.99",
        badge: "Most Popular",
        config: {
          title: "Magnetic Car Signs & Removable Car Magnets",
          subtitle:
            "Professional-grade 30mil magnetic vehicle signs guaranteed to hold fast at freeway speeds.",
          breadcrumb: "Vehicle Signs",
          breadcrumbHref: "/vehicle-signs",
          promoText: "25% OFF MAGNETIC CAR SIGNS & MAGNETS",
          image: "/images/products/main-page/vehicle_magnets-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/vehicle_magnets-toronto-printing-ca.webp",
            "/images/products/gallery/magnet_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/magnet_use_2-toronto-printing-ca.webp",
            "/images/products/gallery/magnet_use_3-toronto-printing-ca.webp",
          ],
          ratingCount: "1530",
          ratingScore: "4.9",
          sizes: [
            { label: '6" x 12"', value: "6x12", basePrice: 18.99 },
            { label: '12" x 18"', value: "12x18", basePrice: 20.99 },
            { label: '12" x 24"', value: "12x24", basePrice: 25.99 },
            { label: '18" x 24"', value: "18x24", basePrice: 28.99 }
          ],
          selects: [
            {
              label: "Corner Style",
              options: [
                {
                  label: "Square Corners",
                  value: "square",
                  priceAdder: 0,
                  description: "Traditional sharp-cut rectangular magnet.",
                },
                {
                  label: "Rounded Corners (Aerodynamic)",
                  value: "rounded",
                  priceAdder: 0,
                  priceMultiplier: 1.5,
                  description: "Prevents wind drag lifting on highway speeds.",
                },

              ],
            },
          ],
          qtyDiscount: "Bulk discounts starting at 2 or more magnets",
          keyFeatures: [
            "High-quality 30mil thick magnetic sheeting",
            "Rounded corners prevent highway peel",
            "UV resistant inks",
            "Glossy protective laminations",
          ],
          useCases: [
            "Delivery vans",
            "Real estate agent vehicles",
            "Contractors and technicians",
            "Personal cars used for corporate",
          ],
          specs: [
            { key: "Thickness", value: "30mil Magnetic material" },
            { key: "Coating", value: "Gloss UV Protective Finish" },
            { key: "Max Speed Rating", value: "Tested up to 80 MPH" },
          ],
          faqs: [
            {
              q: "Will this magnet stick to aluminum doors?",
              a: "No, magnets only stick to steel doors. Please verify your vehicle door panels with a kitchen magnet before purchasing.",
            },
            {
              q: "How often should I clean the magnet?",
              a: "We recommend removing and wiping down the magnet and car panel weekly to prevent moisture buildup.",
            },
          ],
          reviews: [
            {
              author: "Steve H.",
              rating: 5,
              text: "These magnets are thick and do not slide off even in highway storms. Printing is crisp.",
            },
          ],
          ctaHeading: "Start marketing on the go",
        },
      },
      {
        id: "car-door-decals",
        name: "Car Door Decals",
        description: "Adhesive door decals for car bodies. Resilient semi-permanent marketing. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/car_door_decal-toronto-printing-ca.webp",
        price: "Starting at CAD 23.86",
        config: {
          title: "Car Door Decals",
          subtitle:
            "Expert-grade semi-permanent adhesive branding decals for truck and car door panels.",
          breadcrumb: "Vehicle Signs",
          breadcrumbHref: "/vehicle-signs",
          promoText: "25% OFF SEMI-PERMANENT DOOR DECALS",
          image: "/images/products/main-page/car_door_decal-toronto-printing-ca.webp",
          ratingCount: "320",
          ratingScore: "4.7",
          sizes: [
            {
              label: '12" x 18" Small Door Decal',
              value: "12x18",
              basePrice: 43.86,
            },
            {
              label: '18" x 24" Standard Door Decal',
              value: "18x24",
              basePrice: 64.99,
            },
          ],
          selects: [
            {
              label: "Vinyl Option",
              options: [
                {
                  label: "Opaque Adhesive Gloss Vinyl",
                  value: "opaque",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Volume discounts on door pairs",
          keyFeatures: [
            "High performance calendered vinyl",
            "Weather-resistant and UV laminated",
            "Semi-permanent solid adhesion",
          ],
          useCases: [
            "Corporate logos",
            "Regulation USDOT numbers",
            "Contractor branding",
          ],
          specs: [{ key: "Material", value: "4mil High-performance Vinyl" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Brand your fleet vehicles",
        },
      },
      {
        id: "car-window-decals",
        name: "Car Window Decals",
        description:
          "Rear and side window adhesive graphics, available in transparent and opaque materials.",
        image: "/images/products/main-page/car_window_decal-toronto-printing-ca.webp",
        price: "Starting at CAD 23.86",
        config: {
          title: "Car Window Decals",
          subtitle:
            "Highly visible rear window adhesive decals. Ideal for glass surfaces.",
          breadcrumb: "Vehicle Signs",
          breadcrumbHref: "/vehicle-signs",
          promoText: "25% OFF WINDOW ADHESIVE DECALS",
          image: "/images/products/main-page/car_window_decal-toronto-printing-ca.webp",
          ratingCount: "285",
          ratingScore: "4.8",
          sizes: [
            {
              label: '12" x 18" Small Window Decal',
              value: "12x18",
              basePrice: 23.86,
            },
            {
              label: '18" x 24" Medium Window Decal',
              value: "18x24",
              basePrice: 34.99,
            },
          ],
          selects: [
            {
              label: "Material Style",
              options: [
                {
                  label: "Opaque White Backing Vinyl",
                  value: "opaque",
                  priceAdder: 0,
                },
                {
                  label: "Clear Transparent Window Vinyl",
                  value: "clear",
                  priceAdder: 4.5,
                },
              ],
            },
          ],
          qtyDiscount: "Volume savings apply",
          keyFeatures: [
            "Window safe adhesive backing",
            "Vivid inks pop on transparent base",
            "Rain and rear-wiper proof",
          ],
          useCases: [
            "Rear window advertisement",
            "Store hours",
            "Reg numbers on windows",
          ],
          specs: [
            { key: "Material", value: "4mil window-form adhesive vinyl" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Make your rear window sell",
        },
      },
    ],
  },
  "trade-show": {
    title: "Tradeshow Displays",
    breadcrumbLabel: "Tradeshow",
    description:
      "Get trade show ready with products that make your brand command attention. Table covers, step and repeats, and stands.",
    heroImage: "/images/products/main-page/tradeshow_hero_image-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/tradeshow_hero_image-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/tradeshow_hero_image-toronto-printing-ca.webp",
    heroSubtitle: "Where First Impressions Get Noticed.",
    reviewRating: "4.9",
    reviewCount: "3,240",
    reviewQuote:
      "The table cover and pop-up backdrop banner printed beautifully! Setup took seconds and our logo colors matched perfectly.",
    categoryDescriptionText:
      "Your tradeshow booth should do more than fill space, it should tell your brand story. With a full range of customizable displays, signage, and print materials, we help you make every event count. From table covers to backdrops, banners to business cards, our products are designed to build cohesion, attract attention, and drive engagement. Whether you're setting up for a local fair or a national expo, we've got everything you need to show up strong and stay top of mind.",
    categorySecondaryImage: "/images/products/main-page/trade_show_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "Can I customize designs with my logo and brand colors?",
        a: "Yes! All of our tradeshow products are fully customizable with your logo, brand colors, messaging, and graphics. You can upload your own artwork or use our easy online design tools. Need help? Our expert-grade design team is here to assist, whether you need a quick layout fix or a fully design, we’ve got you covered. 1-800-330-9622",
      },
      {
        q: "Do you offer portable and easy-to-set-up display options?",
        a: "Yes! Many of our products; like retractable banners, pop up displays, and tabletop signage; are lightweight, portable, and quick to assemble, making setup and teardown fast and stress-free.",
      },
      {
        q: "How long does it take to receive my order?",
        a: "Production and shipping times vary depending on the product and customization, but most orders ship within a few corporate days. Expedited options are available at checkout.",
      },
      {
        q: "What should I include in my tradeshow booth setup?",
        a: "A well-rounded booth typically includes branded table covers, vertical signage like banners or displays, informational handouts (such as postcards or business cards), and high-impact elements like tents or backdrops for visibility.",
      },
      {
        q: "What if I need help choosing the right products for my event?",
        a: "Our team is here to help! If you're not sure which products best suit your booth space, goals, or budget, our event specialists can walk you through options and make recommendations based on your needs. 1-800-330-9622",
      },
    ],
    products: [
      {
        id: "tablecloths",
        name: "Tablecloths",
        description:
          "Transform any standard folding table into a highly expert-grade promotional display with our Tablecloths. Printed using advanced dye-sublimation on high-quality 300D polyester twill, these covers feature a vivid, scratch-resistant print that won't crack or peel. They are completely machine washable, flame-retardant (meeting NFPA 701 safety certifications), and designed to stay wrinkle-free throughout long events. Available in standard 6ft and 8ft sizes in both 4-sided (closed back) and 3-sided (open back) configurations for convenient under-table storage access.",
        image: "/images/products/main-page/tablecloths-toronto-printing-ca.webp",
        price: "Starting at $200.00",
        badge: "Best Seller",
        config: {
          title: "Tablecloths",
          subtitle:
            "Dye-sublimation printed fabric table cloths that drape perfectly over display tables.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF PERSONALIZED TABLECLOTHS - SHIPS NEXT DAY",
          image: "/images/products/main-page/tablecloths-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/tablecloths-toronto-printing-ca.webp",
            "/images/products/gallery/tablecloth_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/tablecloth_use_2-toronto-printing-ca.webp",
            "/images/products/gallery/tablecloth_use_3-toronto-printing-ca.webp",
          ],
          ratingCount: "680",
          ratingScore: "4.9",
          sizes: [
            { label: "6 feet", value: "6ft", basePrice: 200 },
            { label: "8 feet", value: "8ft", basePrice: 225 }
          ],
          selects: [
            {
              label: "Options",
              options: [
                { label: "3 sided", value: "3sided", priceAdder: 0 },
                { label: "4 sided", value: "4sided", sizePriceAdders: { "6ft": 40, "8ft": 35 } }
              ]
            }
          ],
          qtyDiscount: "Volume discounts on bulk promotional items",
          keyFeatures: [
            "100% Wrinkle-resistant polyester fabric",
            "Fully hemmed finished edges",
            "Scratch resistant dye-sub print",
            "Machine washable",
          ],
          useCases: [
            "Job fairs",
            "Trade show booths",
            "School orientations",
            "Craft shows & market stalls",
          ],
          specs: [
            { key: "Material", value: "300D Polyester Twill" },
            {
              key: "Flame Retardant",
              value: "Meets NFPA 701 fire safety rating",
            },
            { key: "Care", value: "Machine washable, tumble dry low" },
          ],
          faqs: [
            {
              q: "Is the material flame retardant?",
              a: "Yes, our table fabrics are treated to meet standard trade show safety fire certifications.",
            },
          ],
          reviews: [
            {
              author: "Emily T.",
              rating: 5,
              text: "Excellent washability! Spillages from coffee wiped right off, and it didn't wrinkle.",
            },
          ],
          ctaHeading: "Elevate your booth display",
        },
      },
      {
        id: "table-runners",
        name: "Table Runners",
        description:
          "For a adaptable, portable, and budget-friendly branding solution, our Table Runners are the perfect choice. Drape one over a plain solid-colored tablecloth to instantly elevate your booth's look without the cost of a full tablecloth. Made from resilient 300D polyester twill with optional liquid-repellent coatings, our table runners roll down flat, fit easily in any travel bag, and wash clean in the machine. Choose from multiple standard widths to display your company logo prominently.",
        image: "/images/products/main-page/table_runner-toronto-printing-ca.webp",
        price: "Starting at CAD 39.99",
        badge: "Budget-Friendly",
        config: {
          title: "Table Runners",
          subtitle:
            "Add branding to any plain tablecloth with a printed twill table runner.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF TABLE RUNNERS - SHIPS NEXT DAY",
          image: "/images/products/main-page/table_runner-toronto-printing-ca.webp",
          ratingCount: "540",
          ratingScore: "4.8",
          sizes: [
            { label: "3 x 7 feet", value: "3x7", basePrice: 135 },
            { label: "4 x 7 feet", value: "4x7", basePrice: 165 },
            { label: "5 x 7 feet", value: "5x7", basePrice: 195 }
          ],
          qtyDiscount: "Volume discounts on promotional items",
          keyFeatures: [
            "Adds modular branding to any setup",
            "NFPA 701 certified flame retardant",
            "Machine washable",
          ],
          useCases: ["Job recruiting", "Farmers markets", "Check-in desks"],
          specs: [{ key: "Material", value: "300D Polyester Twill" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Ready to design table runners?",
        },
      },
      {
        id: "fitted-tablecloths",
        name: "Fitted Tablecloths",
        description:
          "Give your display tables a clean, sharp, box-tailored look with Fitted Tablecloths. Personalized-tailored to slip perfectly over standard 6ft and 8ft rectangular tables, these covers stay securely in place without hanging or pooling on the floor, making them excellent for busy exterior venues or expert-grade recruiting events. Constructed from flame-retardant 300D knit polyester twill, they are machine-washable, wrinkle-resistant, and built to withstand repeated setups.",
        image: "/images/products/main-page/fitted_tablecloth-toronto-printing-ca.webp",
        price: "Starting at CAD 109.99",
        config: {
          title: "Fitted Tablecloths",
          subtitle:
            "Box-style tablecloths tailored to standard 6ft and 8ft display tables.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF TAILORED FITTED TABLE COVERS",
          image:
            "/images/products/main-page/fitted_tablecloth-toronto-printing-ca.webp",
          ratingCount: "310",
          ratingScore: "4.8",
          sizes: [
            { label: "6 feet", value: "6ft", basePrice: 255 },
            { label: "8 feet", value: "8ft", basePrice: 295 }
          ],
          selects: [
            {
              label: "Options",
              options: [
                { label: "Single-Sided printed", value: "single", priceAdder: 0 }
              ]
            }
          ],
          qtyDiscount: "Bulk event pricing applies",
          keyFeatures: [
            "Box-tailored structure stays secure",
            "NFPA 701 fire certified",
            "Machine washable",
          ],
          useCases: ["Conventions", "Summits", "Job fairs"],
          specs: [{ key: "Material", value: "300D Knit Polyester" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Tailor your booth layout",
        },
      },
      {
        id: "round-tablecloths",
        name: "Round Tablecloths",
        description:
          "Elevate your round banquet, registry, or cocktail tables with our Round Tablecloths. Specially hemmed for standard circular table sizes, they drape elegantly to the floor in a seamless design. Using full-spectrum dye-sublimation printing, your colors, patterns, and logos will appear bright and clear, providing a high-quality aesthetic for weddings, evening galas, corporate fundraisers, and hotel lobbies.",
        image: "/images/products/main-page/round_tablecloth-toronto-printing-ca.webp",
        price: "Starting at CAD 129.99",
        config: {
          title: "Round Tablecloths",
          subtitle:
            "Full color dye-sublimated tablecloths engineered for circular highboy and banquet tables.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF PERSONALIZED ROUND TABLECLOTHS",
          image: "/images/products/main-page/round_tablecloth-toronto-printing-ca.webp",
          ratingCount: "195",
          ratingScore: "4.7",
          sizes: [
            {
              label: '30" Round Table Throw',
              value: "30_round",
              basePrice: 129.99,
            },
            {
              label: '60" Circular Banquet Cover',
              value: "60_round",
              basePrice: 179.99,
            },
            {
              label: '72" Large Circular Cover',
              value: "72_round",
              basePrice: 219.99,
            },
          ],
          selects: [
            {
              label: "Drape Drop Type",
              options: [
                {
                  label: "Full Floor Length Drop",
                  value: "floor",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Volume discounts for banquet halls and events",
          keyFeatures: [
            "Seamless round draping",
            "Dye-sublimation full spectrum print",
            "Flame certified fabric",
          ],
          useCases: ["Cocktail hours", "Weddings", "Gala banquets"],
          specs: [{ key: "Material", value: "300D Polyester" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Decorate round tables",
        },
      },
      {
        id: "stretch-tablecloths",
        name: "Stretch Tablecloths",
        description:
          "Achieve a sleek, modern, and high-impact look with our contoured Stretch Tablecloths. Made from an elastic polyester-spandex blend, these covers stretch tightly over your table frame and secure into place using reinforced rubber leg pockets, preventing any flapping or shifting in windy exterior conditions. The tight tension naturally pulls out all folds and wrinkles, ensuring a perfectly smooth, expert-grade surface for tech conferences, exterior festivals, and modern brand exhibitions.",
        image: "/images/products/main-page/stretch_tablecloth-toronto-printing-ca.webp",
        price: "Starting at CAD 129.99",
        config: {
          title: "Stretch Tablecloths (Spandex Style)",
          subtitle:
            "Elastic stretch tablecloths contouring tightly to rectangular event tables. Modern and wrinkle-free.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF CONTOURED SPANDEX DISPLAYS",
          image:
            "/images/products/main-page/stretch_tablecloth-toronto-printing-ca.webp",
          ratingCount: "290",
          ratingScore: "4.9",
          sizes: [
            { label: "6 feet", value: "6ft", basePrice: 265 },
            { label: "8 feet", value: "8ft", basePrice: 305 }
          ],
          selects: [
            {
              label: "Options",
              options: [
                { label: "Single-Sided printed", value: "single", priceAdder: 0 }
              ]
            }
          ],
          qtyDiscount: "Spandex volume levels apply",
          keyFeatures: [
            "Wrinkle-free stretch spandex material",
            "Hook-under pockets keep cover locked down",
            "Ultra modern contours",
          ],
          useCases: [
            "Exterior windy venues",
            "Tech trade conventions",
            "Modern product roll-outs",
          ],
          specs: [
            { key: "Material", value: "Polyester-Spandex Elastic Blend" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Go modern with stretch spandex",
        },
      },
      {
        id: "pop-up-displays",
        name: "Pop-Up Displays",
        description:
          "Make a massive impression on the trade show floor with our high-quality Fabric Pop-Up Displays. Featuring a lightweight accordion-style aluminum frame that snaps open in under two minutes, this backdrop utilizes a large, high-definition tension fabric graphic that attaches securely around the perimeter with industrial-strength hook-and-loop velcro. It packs down into a compact trolley bag with rolling wheels for effortless travel and setup.",
        image: "/images/products/main-page/pop_up_display-toronto-printing-ca.webp",
        price: "Starting at $780.00",
        config: {
          title: "Fabric Pop-Up Displays",
          subtitle:
            "Collapsible aluminum accordion frame with printed tension fabric screen cover.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF ALL POP-UP EVENT DISPLAYS",
          image: "/images/products/main-page/pop_up_display-toronto-printing-ca.webp",
          ratingCount: "430",
          ratingScore: "4.8",
          sizes: [
            { label: "8 x 8 feet", value: "8x8", basePrice: 780 },
            { label: "10 x 7.5 feet", value: "10x7.5", basePrice: 920 }
          ],
          selects: [
            {
              label: "Options",
              options: [
                { label: "Premium Pop-Up Frame + Carry Case", value: "premium", priceAdder: 0 },
                { label: "Replacement Fabric only", value: "replacement", sizePriceAdders: { "8x8": -420, "10x7.5": -500 } },

              ]
            }
          ],
          qtyDiscount: "Exposition vendor rates apply",
          keyFeatures: [
            "Sets up in 2 minutes",
            "Wrinkle-resistant heavy knit stretch fabric",
            "Travel-friendly transport wheels bag",
          ],
          useCases: [
            "Exhibitions",
            "Major expos",
            "Stage presentations",
            "Press announcements",
          ],
          specs: [
            { key: "Frame Structure", value: "Accordion-style aluminum tubes" },
            { key: "Fabric Attach", value: "Hook-and-loop velcro perimeter" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Dominate the show floor",
        },
      },
      {
        id: "step-and-repeat-banner",
        name: "Backdrop Banners",
        description:
          "Create the perfect photo opportunity at red carpets, press conferences, weddings, and corporate summits with our Step & Repeat Banners. Designed to display repeated logos in a clean grid layout, the glare-free matte finish of our industrial-strength blockout vinyl ensures beautiful, flash-friendly photography. The package comes with an optional adjustable backdrop stand and top/bottom pole pockets for fast mounting.",
        image: "/images/products/main-page/backdrop_banners-toronto-printing-ca.webp",
        price: "Starting at $330.00",
        badge: "Event Ready",
        config: {
          title: "Backdrop Banners",
          subtitle:
            "Expert-grade background banners for press walls, photo shoots, and red carpets.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF STEP AND REPEAT PRESS WALLS",
          image:
            "/images/products/main-page/backdrop_banners-toronto-printing-ca.webp",
          ratingCount: "430",
          ratingScore: "4.8",
          sizes: [
            {
              label: "8' x 8' Square Backdrop",
              value: "96x96",
              basePrice: 249,
            },
            {
              label: "10' x 10' Large Backdrop",
              value: "120x120",
              basePrice: 299,
            },
          ],
          selects: [
            {
              label: "Hardware",
              options: [
                { label: "Banner Only (No Hardware)", value: "none", priceAdder: 0 },
                { label: "Include Adjustable Backdrop Stand", value: "stand", priceAdder: 150 }
              ]
            },
            {
              label: "Material",
              options: [
                { label: "15oz Blockout Matte Vinyl", value: "vinyl", priceAdder: 0 },
                { label: "Premium Fabric Material", value: "fabric", priceAdder: 120 }
              ]
            }
          ],
          qtyDiscount: "Event planner package discounts available",
          keyFeatures: [
            "Large seamless backdrops",
            "Pole pockets on top & bottom for mounting",
            "Anti-glare matte finish ensures clear photography",
          ],
          useCases: [
            "Press conferences",
            "Red carpet arrivals",
            "Wedding photo booths",
            "Corporate events",
          ],
          specs: [{ key: "Material", value: "15oz Blockout Matte Vinyl" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Create your logo background backdrop",
        },
      },
      {
        id: "retractable-banners",
        name: "Retractable Banner",
        description:
          "Our Retractable Banners (Roll Up Stands) are the ultimate standalone banner display for trade shows, retail checkouts, and office lobbies. The banner graphic pulls up from an anodized aluminum base stand in seconds and secures with a vertical support rod. Each kit includes a padded carrying bag, making transport and setup incredibly simple. Manufactured using high-quality curl-resistant polyester film or standard 13oz vinyl to maintain a clean, flat presentation.",
        image: "/images/products/main-page/retractable_roll_up_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 89.00",
        badge: "Most Popular",
        config: {
          title: "Retractable Banners (Roll Up)",
          subtitle:
            "Portable stand and pre-installed banner, rolls up in seconds for easy transport.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF RETRACTABLE ROLL-UP BANNERS",
          image:
            "/images/products/main-page/retractable_roll_up_banner-toronto-printing-ca.webp",
          ratingCount: "1240",
          ratingScore: "4.9",
          sizes: [
            {
              label: '33" x 80" Standard Stand Size',
              value: "33x80",
              basePrice: 89.00,
            },
            {
              label: '46" x 80" Vertical Size',
              value: "46x80",
              basePrice: 250.00,
            },
          ],
          selects: [
            {
              label: "Stand Option",
              options: [
                {
                  label: "Standard Silver Cassette Stand",
                  value: "standard_stand",
                  priceAdder: 0,
                },
                {
                  label: "Professional Luxury Stand",
                  value: "professional",
                  priceAdder: 19.5,
                },
              ],
            },
          ],
          qtyDiscount: "Bulk discounts starting at 2 or more banners",
          bulkDiscounts: [
            { minQty: 2, discountPercent: 5 },
            { minQty: 5, discountPercent: 10 },
            { minQty: 10, discountPercent: 15 },
            { minQty: 25, discountPercent: 20 },
          ],
          keyFeatures: [
            "Sturdy aluminum base container",
            "Padded carrying case included",
            "Setup in under 60 seconds",
            "Anti-curl curl-free polyester film",
          ],
          useCases: [
            "Trade show booths",
            "Corporate lobbies",
            "Retail announcements",
            "Presentations",
          ],
          specs: [
            { key: "Weight", value: "Approximately 7-10 lbs including stand" },
            { key: "Display Size", value: '79" x 33" (Standard) or 80" x 46" (Large)' },
          ],
          description: `Maximize your brand visibility at trade shows, retail storefronts, conferences, and exhibitions with our high-quality Retractable Roll Up Banners. These portable banner displays are the gold standard for high-impact offline marketing, offering a seamless blend of durability, convenience, and visual appeal. 

Every retractable banner stand comes pre-assembled with your personalized-printed graphic rolled inside a sturdy, lightweight aluminum cassette. Setup takes under 60 seconds—simply extend the vertical support pole, pull up the banner graphic, and lock it into place. Whether you need trade show signage or a permanent retail display, our roll up stands are built to last.

Our banners are manufactured using curl-free, light-blocking polyester grayback film. This prevents the edges of the banner from curling over time and ensures that light does not shine through from behind, keeping your message fully legible under bright exhibition lights. With next-day banner printing options, we help you get event-ready at a moment's notice.

Why Choose Our Expert-grade Rollup Banners?
- High-quality Anti-Curl Material: Manufactured using smooth, opaque blockout film for a clean, flat presentation.
- Industrial-strength Cassette: Anodized aluminum base with fold-out stabilizing feet for reliable exterior and interior standee stability.
- Effortless Portability: A padded travel carrying case is included with every order, making transportation a breeze.
- Dynamic Visual Impact: High-resolution UV printing at 1440 DPI delivers vivid, fade-resistant colors that command attention across crowded halls.`,
          faqs: [
            {
              q: "How do I set up a retractable roll up banner?",
              a: "Setting up your pull up banner is incredibly simple. Unpack the aluminum base, turn out the stabilizing feet, insert the support pole into the base slot, and then pull the banner up gently and attach it to the top hook of the pole. The entire process takes less than a minute.",
            },
            {
              q: "What material is used for the rollup banner graphic?",
              a: "We use a high-quality curl-free polyester film with a blockout greyback coating. This expert-grade material ensures your graphics remain completely flat and prevents rear light show-through, ensuring maximum legibility under bright trade show lighting.",
            },
            {
              q: "Can I replace the banner graphic in my existing retractable stand?",
              a: "Yes, the graphic can be replaced, but it requires tensioning the internal spring mechanism of the aluminum cassette. We recommend sending it to our print facility or purchasing a new stand bundle for the best results.",
            },
            {
              q: "What is the difference between standard and expert-grade stands?",
              a: "Standard stands feature swing-out stabilizing feet that extend from the front and back of the aluminum base. Expert-grade luxury stands have a wider, heavier teardrop-shaped base that stands stable on its own without visible swing-out feet, offering a cleaner look.",
            },
            {
              q: "Is the roll up banner suitable for exterior use?",
              a: "Retractable banners are designed primarily for interior applications. They can be used outdoors in calm, dry conditions, but because of their tall profile, wind can act as a sail and tip the stand. For exterior promotions, we recommend our industrial-strength feather flags or mesh banners.",
            },
          ],
          reviews: [
            {
              author: "Marcus K., Event Director",
              rating: 5,
              text: "The rollup banner exceeded our expectations. The greyback film is completely blockout and doesn't curl at all. Set up was a breeze at our conference booth.",
            },
            {
              author: "Sarah J., Retail Manager",
              rating: 5,
              text: "Absolute lifesaver! Ordered with next day banner printing and it arrived right on time for our store opening. The print colors are stunningly bright.",
            },
            {
              author: "David T., Startup Founder",
              rating: 5,
              text: "Excellent quality trade show banner stand. We've used it at three separate events now and the aluminum retracting mechanism still works perfectly.",
            },
          ],
          ctaHeading: "Ready to make an impression?",
        },
      },
      {
        id: "x-banner-stand",
        name: "X-Banners",
        description:
          "The X-Frame Banner Stand is a highly cost-effective, portable freestanding banner solution. By utilizing flexible composite fiberglass arms connected to a central hinge, the stand pulls a corner-grommeted banner taut, keeping your graphic perfectly flat and readable. Because the banner attaches simply via grommets, you can order replacement prints and swap graphics in seconds without needing to buy new stands.",
        image: "/images/products/main-page/x_banner_stand-toronto-printing-ca.webp",
        price: "Starting at CAD 49.99",
        config: {
          title: "X-Frame Banner Stands",
          subtitle:
            "Highly cost-effective standing banners utilizing tension fiberglass arms to pull banner corners taut.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF BUDGET X-BANNER DISPLAYS",
          image: "/images/products/main-page/x_banner_stand-toronto-printing-ca.webp",
          ratingCount: "385",
          ratingScore: "4.7",
          sizes: [
            {
              label: '24" x 63" Small X-Stand',
              value: "63x24",
              basePrice: 49.99,
            },
            {
              label: '31" x 70" Large X-Stand',
              value: "70x31",
              basePrice: 69.99,
            },
          ],
          selects: [
            {
              label: "Frame Assembly",
              options: [
                {
                  label: "Include Fiberglass X-Stand & Carrying Bag",
                  value: "full_kit",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Saves up to 15% on bulk packages",
          keyFeatures: [
            "Lightweight carbon-fiberglass frame legs",
            "Super easy backdrop replacements",
            "4 grommeted corners attach to pegs",
          ],
          useCases: [
            "Product marketing roll-outs",
            "Retail storefronts",
            "Special church events",
            "Expositions",
          ],
          specs: [{ key: "Material", value: "13oz Matte PVC Vinyl" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Promote on a budget",
        },
      },
      {
        id: "tabletop-retractable-banners",
        name: "Tabletop Retractable Banners",
        description:
          "Bring high-impact branding to counter-tops, checkout registers, hotel lobbies, and registration desks with Tabletop Retractable Banners. These miniature versions of our full-sized roll-up stands feature a compact aluminum base housing that pulls up and retracts in seconds. Manufactured using smooth, high-resolution polypropylene film, they ensure small details and text are clear and simple to read from a close distance.",
        image:
          "/images/products/main-page/tabletop_retractable-toronto-printing-ca.webp",
        price: "Starting at CAD 27.18",
        config: {
          title: "Tabletop Retractable Banners",
          subtitle:
            "Mini roll-up banners designed to sit on tables, point-of-sale registers, and service desks.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF TABLETOP RETRACTABLE DISPLAYS",
          image:
            "/images/products/main-page/tabletop_retractable-toronto-printing-ca.webp",
          ratingCount: "420",
          ratingScore: "4.8",
          sizes: [
            {
              label: '11.75" x 17" A3 Size Mini Stand',
              value: "17x11.75",
              basePrice: 39.99,
            },
            {
              label: '8.25" x 11.5" A4 Size Micro Stand',
              value: "11.5x8.25",
              basePrice: 27.18,
            },
          ],
          selects: [
            {
              label: "Base Housing",
              options: [
                {
                  label: "Miniature Silver Aluminum Base",
                  value: "mini_silver",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Volume counter-top rates starting at 10+",
          keyFeatures: [
            "Fits compact desk spaces",
            "Retracts into a tiny housing for travel",
            "Smooth banner film ensures high detail readability",
          ],
          useCases: [
            "Counter checkout promotions",
            "Hotel registration desks",
            "Restaurant menus",
            "Job fair table displays",
          ],
          specs: [
            {
              key: "Print Film",
              value: "8mil thick smooth polypropylene film",
            },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Maximize register branding",
        },
      },
      {
        id: "custom-canopy-tents",
        name: "Canopies",
        description:
          "Command attention at exterior events, farmers markets, sporting events, and street fairs with our 10' x 10' Canopy Tents. The canopy top is made from industrial-strength, weather-resistant, and UV-resistant fabric printed in rich full-color dye-sublimation. The popup frame features a commercial-grade steel or aluminum truss system with adjustable height settings, popping up in minutes for instant shade and high-visibility branding.",
        image: "/images/products/main-page/event_tents-toronto-printing-ca.webp",
        price: "Starting at CAD 349.99",
        config: {
          title: "Canopy Tents",
          subtitle:
            "Exterior 10' x 10' canopy tents. Weather-resistant, UV-resistant fabric over steel popup frames.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF EXTERIOR EVENT CANOPIES",
          image: "/images/products/main-page/event_tents-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/event_tents-toronto-printing-ca.webp",
            "/images/products/gallery/canopy_tent_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/canopy_tent_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/canopy_tent_use_1-toronto-printing-ca.webp",
          ],
          ratingCount: "110",
          ratingScore: "4.7",
          sizes: [
            {
              label: "10ft x 10ft Canopy Tent",
              value: "10x10",
              basePrice: 349.99,
            },
          ],
          selects: [
            {
              label: "Frame Type",
              options: [
                {
                  label: "Standard Steel Frame",
                  value: "steel",
                  priceAdder: 0,
                },
                {
                  label: "Premium Lightweight Aluminum Frame",
                  value: "aluminum",
                  priceAdder: 120.0,
                },
              ],
            },
          ],
          qtyDiscount: "Volume canopy packaging available",
          keyFeatures: [
            "Weather-resistant & UV resistant fabric",
            "Resilient popup truss system",
            "Dye-sublimation peak printing",
          ],
          useCases: [
            "Exterior farmers markets",
            "Festivals & concerts",
            "Sports events",
          ],
          specs: [{ key: "Dimensions", value: '120" W x 120" D x 135" H max' }],
          faqs: [],
          reviews: [],
          ctaHeading: "Establish exterior presence",
        },
      },
      {
        id: "feather-flags",
        name: "Feather Flags",
        description:
          "Draw customers in from the roadside with our best-selling Feather Flags. Designed to flutter in the wind and turn heads, these tall marketing flags are manufactured using high-quality open-weave knit polyester to reduce wind load stress. Supported by composite fiberglass poles and a rotating ground spike or cross stand, they rotate 360 degrees to remain visible from any traffic direction.",
        image: "/images/products/main-page/feather_flag-toronto-printing-ca.webp",
        price: "Starting at CAD 80.00",
        config: {
          title: "Feather Flags",
          subtitle:
            "Exterior marketing flags manufactured using resilient knit polyester, complete with poles and hardware.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF ALL MARKETING FLAGS - SHIPS NEXT DAY",
          image: "/images/products/main-page/feather_flag-toronto-printing-ca.webp",
          ratingCount: "820",
          ratingScore: "4.8",
          sizes: [
            {
              label: "9ft Feather Flag",
              value: "9ft",
              basePrice: 80.00,
            },
            {
              label: "10ft Feather Flag",
              value: "10ft",
              basePrice: 100.00,
            },
            {
              label: "13ft Feather Flag",
              value: "13ft",
              basePrice: 110.00,
            },
            {
              label: "16ft Feather Flag",
              value: "16ft",
              basePrice: 130.00,
            },
          ],
          selects: [
            {
              label: "Pole Option",
              options: [
                {
                  label: "No Pole (Flag Fabric Only)",
                  value: "no_pole",
                  priceAdder: 0,
                  description: "Select if you already have a pole.",
                },
                {
                  label: "Include Pole (+CAD 35.00)",
                  value: "pole",
                  priceAdder: 35.00,
                  description: "High-quality carbon-fiberglass pole.",
                },
              ],
            },
            {
              label: "Base Option",
              options: [
                {
                  label: "No Base",
                  value: "no_base",
                  priceAdder: 0,
                },
                {
                  label: "Ground Stake (+CAD 40.00)",
                  value: "stake",
                  priceAdder: 40.00,
                  description: "Traditional stake for soil or grass.",
                },
                {
                  label: "Cross Base (+CAD 55.00)",
                  value: "cross",
                  priceAdder: 55.00,
                  description: "Standard folding cross base.",
                },
                {
                  label: "CS-01 Metal Cross Base (+CAD 65.00)",
                  value: "cs01",
                  priceAdder: 65.00,
                  description: "Commercial-grade metal cross base.",
                },
                {
                  label: "CS-02 Cross Base (+CAD 45.00)",
                  value: "cs02",
                  priceAdder: 45.00,
                  description: "Standard economy cross base.",
                },
                {
                  label: "GS-01 Ground Spike (+CAD 45.00)",
                  value: "gs01",
                  priceAdder: 45.00,
                  description: "Commercial-grade ground spike.",
                },
              ],
            },
            {
              label: "Water Bag Option",
              options: [
                {
                  label: "No Water Bag",
                  value: "no_water_bag",
                  priceAdder: 0,
                },
                {
                  label: "Water Bag (+CAD 10.00)",
                  value: "water_bag_10",
                  priceAdder: 10.00,
                  description: "Adds stability for cross bases.",
                },
                {
                  label: "WF-08 Water Bag (+CAD 14.00)",
                  value: "wf08",
                  priceAdder: 14.00,
                  description: "High-quality donut water weight bag.",
                },
              ],
            },
            {
              label: "Carry Bag Option",
              options: [
                {
                  label: "No Carry Bag",
                  value: "no_carry_bag",
                  priceAdder: 0,
                },
                {
                  label: "Flag Carry Bag (+CAD 45.00)",
                  value: "carry_bag",
                  priceAdder: 45.00,
                  description: "Convenient travel bag for hardware.",
                },
              ],
            },
            {
              label: "Flag Material & Build",
              options: [
                {
                  label: "Premium Polyester Knit",
                  value: "standard",
                  priceAdder: 0,
                  description:
                    "Lightweight mesh fabric engineered for wind flow.",
                },
              ],
            },
          ],
          toggleGroups: [
            {
              label: "Printed Sides",
              options: [
                { id: "single", label: "Single Sided Only", priceAdder: 0 }
              ]
            }
          ],
          qtyDiscount: "Save up to 10% on bulk quantities",
          keyFeatures: [
            "Fluttering wind-resistant design",
            "Dye-sublimation high-contrast printing",
            "Flexible fiberglass poles",
          ],
          useCases: [
            "Exterior storefronts",
            "Grand openings",
            "Car dealerships",
          ],
          specs: [{ key: "Material", value: "110g Knit Polyester" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Get noticed from the road",
        },
      },
      {
        id: "vinyl-banners",
        name: "Vinyl Banners",
        description:
          "Our Vinyl Banners are a adaptable, industrial-strength signage solution for interior and exterior marketing. Constructed from resilient 13oz gloss or 15oz high-quality matte PVC vinyl with heat-welded hems, they are fully weather-resistant and UV-resistant to survive the elements. Complete with pre-installed brass grommets or pole pockets for easy hanging, they are ideal for storefront openings, construction fences, and event banners.",
        image: "/images/products/main-page/vinyl_banner-toronto-printing-ca.webp",
        price: "Starting at CAD 12.99",
        config: {
          title: "Vinyl Banners",
          subtitle:
            "Resilient, weather-resistant, exterior-rated vinyl banners complete with grommets.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF ALL VINYL BANNERS - SHIPS NEXT DAY",
          image: "/images/products/main-page/vinyl_banner-toronto-printing-ca.webp",
          ratingCount: "1530",
          ratingScore: "4.8",
          sizes: [
            { label: "2' x 4' Small Banner", value: "24x48", basePrice: 35.19 },
            {
              label: "3' x 6' Standard Banner",
              value: "36x72",
              basePrice: 75.99,
            },
            { label: "4' x 8' Large Banner", value: "48x96", basePrice: 149 },

          ],
          selects: [
            {
              label: "Material Style",
              options: [
                {
                  label: "13oz Standard Gloss Vinyl",
                  value: "13oz_gloss",
                  priceAdder: 0,

                },
                {
                  label: "15oz Premium Matte Vinyl",
                  value: "15oz_matte",
                  priceAdder: 0,
                  priceMultiplier: 1.2,
                },
              ],
            },
          ],
          qtyDiscount: "Save up to 15% on bulk banner orders",
          keyFeatures: [
            "Weather-resistant & UV resistant",
            "Heat-welded hems for extra strength",
            "Vivid full-color digital printing",
          ],
          useCases: ["Event announcements", "Sponsorship banners"],
          specs: [
            { key: "Material", value: "13oz or 15oz flexible PVC vinyl" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Ready to design your banner?",
        },
      },
      {
        id: "business-cards",
        name: "Business Cards",
        description:
          'Leave a lasting impression with high-quality Business Cards. Manufactured using ultra-thick 14pt or 16pt cardstock with offset high-resolution printing, these standard 3.5" x 2" cards represent your business with absolute quality. Customize your finish with expert-grade non-glare matte or high-gloss UV sheen, and choose single or double-sided layouts to distribute to tradeshow attendees, recruits, and new leads.',
        image: "/images/products/main-page/business_cards-toronto-printing-ca.webp",
        price: "Starting at $55.00",
        config: {
          title: "Business Cards",
          quantityOptions: [100, 250, 500, 1000, 1500, 2000, 2500, 5000, 10000],
          quantityPrices: {
            100: 29.98,
            250: 39.98,
            500: 49.98,
            1000: 79.98,
            1500: 117.98,
            2000: 145.98,
            2500: 179.98,
            5000: 319.98,
            10000: 559.98,
          },
          subtitle:
            'Standard 3.5" x 2" cards manufactured using ultra-thick cardstock with multiple finishes.',
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF ALL EVENT STATIONERY",
          image: "/images/products/main-page/business_cards-toronto-printing-ca.webp",
          ratingCount: "1120",
          ratingScore: "4.9",
          sizes: [
            {
              label: '3.5" x 2" Standard size',
              value: "3.5x2",
              basePrice: 29.98,
            },
          ],
          selects: [
            {
              label: "Paper Stock & Finish",
              options: [
                {
                  label: "14pt semi gloss (profit maximizer)",
                  value: "semi_gloss",
                  priceAdder: 0,
                  description: "Clean, expert-grade look with a smooth semi-gloss finish. Simple to write on.",
                  image: "/images/products/main-page/business_cards_semigloss-toronto-printing-ca.webp",
                },
                {
                  label: "Glossy",
                  value: "glossy",
                  priceAdder: 0,
                  description: "High-shine glossy finish that makes colors pop.",
                  image: "/images/products/main-page/business_cards_glossy-toronto-printing-ca.webp",
                },
                {
                  label: "Embossed Gloss",
                  value: "embossed_gloss",
                  priceAdder: 0.15,
                  description: "Raised clear gloss accents for a textured, high-end feel.",
                  image: "/images/products/main-page/business_cards_foil-toronto-printing-ca.webp",
                },
                {
                  label: "Soft Touch",
                  value: "soft_touch",
                  priceAdder: 0.12,
                  description: "Velvety coating that feels soft and high-quality in the hand.",
                  image: "/images/products/main-page/business_cards-toronto-printing-ca.webp",
                },
                {
                  label: "Painted Edge",
                  value: "painted_edge",
                  priceAdder: 0.25,
                  description: "Thick cards with colored edges for a bold, modern look.",
                  image: "/images/products/main-page/business_cards_painted_edge-toronto-printing-ca.webp",
                },
                {
                  label: "Ultra Thick",
                  value: "ultra_thick",
                  priceAdder: 0.23,
                  description: "Double-thick cardstock for a substantial, sturdy feel.",
                  image: "/images/products/main-page/business_cards_ultra_thick-toronto-printing-ca.webp",
                },
                {
                  label: "Clear Plastic",
                  value: "clear_plastic",
                  priceAdder: 0.35,
                  description: "See-through modern plastic cards that make a unique statement.",
                  image: "/images/products/main-page/business_cards_clear_plastic-toronto-printing-ca.webp",
                },
                {
                  label: "Pearl",
                  value: "pearl",
                  priceAdder: 0.12,
                  description: "Glimmering, light-catching surface with a pearlescent shine.",
                  image: "/images/products/main-page/business_cards_pearl-toronto-printing-ca.webp",
                },
                {
                  label: "Gold Raised Foil",
                  value: "gold_raised_foil",
                  priceAdder: 0.20,
                  description: "Elevated, 3D raised gold foil accents for a luxury feel.",
                  image: "/images/products/main-page/business_cards_gold_raised_foil-toronto-printing-ca.webp",
                },
                {
                  label: "Silver Raised Foil",
                  value: "silver_raised_foil",
                  priceAdder: 0.20,
                  description: "Elevated, 3D raised silver foil accents for a luxury feel.",
                  image: "/images/products/main-page/business_cards_silver_raised_foil-toronto-printing-ca.webp",
                },
              ],
            },
            {
              label: "Sides",
              options: [
                {
                  label: "Single-Sided",
                  value: "single",
                  priceAdder: 0,
                  priceMultiplier: 1.0,
                  description: "Manufactured using front side only.",
                },
                {
                  label: "Double-Sided",
                  value: "double",
                  priceAdder: 0,
                  priceMultiplier: 1.25,
                  description: "Manufactured using both front and back sides.",
                },
              ],
            },
            {
              label: "Corners",
              options: [
                {
                  label: "Standard Square Corners",
                  value: "square",
                  priceAdder: 0,
                },
                {
                  label: "Rounded Corners",
                  value: "rounded",
                  priceAdder: 0.05,
                },
              ],
            },
          ],
          qtyDiscount: "Predefined package quantities selected below",
          keyFeatures: [
            "Vivid color offset printing",
            "Ultra-thick cardstock options",
            "Easy design templates",
          ],
          useCases: ["Networking events", "Customer takeaways"],
          specs: [
            { key: "Dimensions", value: '3.5" x 2" (Standard size)' },
            { key: "Standard Stock", value: "14pt semi gloss (profit maximizer)" },
            { key: "Premium Finishes", value: "Glossy, Soft Touch, Pearl" },
            { key: "Luxury Finishes", value: "Embossed Gloss, Gold Raised Foil, Silver Raised Foil" },
            { key: "Specialty Stocks", value: "Painted Edge, Ultra Thick, Clear Plastic" },
            { key: "Standard Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "What is the standard size of a business card?",
              a: 'The standard size for standard business cards is 3.5 inches by 2 inches. This fits perfectly into standard wallets, cardholders, and organizer slots.',
            },
            {
              q: "What is the difference between 14 pt and 16 pt cardstock?",
              a: 'The point (pt) unit measures paper thickness. 14 pt cardstock is the industry standard for high-quality business cards. 16 pt cardstock is thicker and sturdier, providing a heavier, more high-quality feel.',
            },
            {
              q: "Can I write on both matte and glossy business cards?",
              a: 'You can write on matte and uncoated cards using standard ballpoint pens or pencils. Glossy cards have a slick UV coating that resists ink, making them harder to write on.',
            },
            {
              q: "What is the difference between Pearl and Soft Touch finishes?",
              a: 'Pearl cardstock uses a specialized paper embedded with natural shimmering fibers that give the entire card a pearlescent sheen. Soft Touch is a velvet-matte protective coating applied after printing that gives the cards a soft, suede-like texture.',
            },
          ],
          reviews: [
            {
              author: "Marcus K., Event Director",
              rating: 5,
              text: "The metallic foil cards look amazing! They really capture attention when handed out. Exact color registration and excellent high-quality paper stock.",
            },
            {
              author: "Sarah J., Retail Manager",
              rating: 5,
              text: "I ordered the Pearl business cards and have received so many compliments on the shimmer. The offset print quality is pristine.",
            },
            {
              author: "David T., Startup Founder",
              rating: 5,
              text: "Sturdy 16 pt high-quality cards. Excellent price point and extremely fast turnaround. Will definitely reorder standard cards here.",
            },
          ],
          ctaHeading: "Design business cards now",
        },
      },
      {
        id: "custom-postcards",
        name: "Postcards",
        description:
          "Hand out rich, full-color Postcards at your event table to advertise promotions, catalog your services, or distribute coupons. Printed in high definition on heavy 14pt gloss cover paper, they feel substantial and expert-grade. Choose between matte or high-gloss front finishes and sizes to create flyers, handouts, or mailers that prompt action from potential clients.",
        image: "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
        price: "Starting at $65.00",
        config: {
          title: "Postcards",
          quantityOptions: [100, 250, 500, 750, 1000, 1500, 2000],
          subtitle:
            "Standard promotional postcards printed in high definition gloss or matte cardstock.",
          breadcrumb: "Tradeshow",
          breadcrumbHref: "/trade-show",
          promoText: "25% OFF ALL POSTCARDS AND HANDOUTS",
          image: "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_matte-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_action_1-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_action_2-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_action_3-toronto-printing-ca.webp",
          ],
          ratingCount: "280",
          ratingScore: "4.8",
          sizes: [
            {
              label: '4" x 6" Postcard',
              value: "4x6",
              basePrice: 0.60,
              quantityPrices: {
                100: 65.00,
                250: 75.00,
                500: 140.00,
                750: 165.00,
                1000: 170.00,
                2500: 220.00,
                2000: 250.00,
              },
            },
            {
              label: '5" x 7" Postcard',
              value: "5x7",
              basePrice: 0.80,
              quantityPrices: {
                100: 80.00,
                250: 95,
                500: 155.00,
                750: 180.00,
                1000: 190.00,
                1500: 210.00,
                2000: 320.00,
              },
            },
            {
              label: '6" x 9" Postcard',
              value: "6x9",
              basePrice: 1.10,
              quantityPrices: {
                100: 85.00,
                250: 110.00,
                500: 165.00,
                750: 195.00,
                1000: 220.00,
                1500: 260.00,
                2000: 450.00,
              },
            },
            {
              label: '6" x 11" Postcard',
              value: "6x11",
              basePrice: 1.20,
              quantityPrices: {
                100: 95.00,
                250: 120.00,
                500: 185.00,
                750: 210.00,
                1000: 250.00,
                1500: 350.00,
                2000: 550.00,
              },
            },
          ],
          selects: [
            {
              label: "Paper Stock",
              options: [
                {
                  label: "Glossy",
                  value: "glossy",
                  priceAdder: 0,
                  description: "High-shine glossy finish that makes colors pop.",
                  image: "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
                },
                {
                  label: "Matte",
                  value: "matte",
                  priceAdder: 0,
                  description: "Clean, expert-grade look with a smooth non-glare matte finish.",
                  image: "/images/products/main-page/postcard_matte-toronto-printing-ca.webp",
                },
              ],
            },
            {
              label: "Orientation",
              options: [
                {
                  label: "Horizontal",
                  value: "horizontal",
                  priceAdder: 0,
                  description: "Landscape orientation layout.",
                },
                {
                  label: "Vertical",
                  value: "vertical",
                  priceAdder: 0,
                  description: "Portrait orientation layout.",
                },
              ],
            },
          ],
          qtyDiscount: "Save more when printing in bulk",
          keyFeatures: [
            "High-quality heavyweight 14pt cardstock",
            "Vivid double-sided printing available",
            "High-quality glossy or matte textures",
          ],
          useCases: [
            "Product coupon codes",
            "Information spec sheets",
            "Direct mail advertisements",
          ],
          specs: [
            { key: "Material", value: "14pt Premium Cardstock" },
            { key: "Finish Options", value: "Glossy (front only) or Smooth Matte" },
          ],
          description:
            `<div class="space-y-4">
              <h3 class="text-lg font-bold text-slate-900">Event Postcards & Table Handouts</h3>
              <p class="text-sm text-gray-700 leading-relaxed">
                Nano Signs provides high-quality postcard printing tailored for trade shows, networking events, and corporate displays nationwide. Manufactured using rigid 14pt cardstock, these postcards make outstanding spec sheets, coupon hand-outs, and direct mail ads. The clean, square-cornered trim ensures a simple, modern look that matches corporate guidelines.
              </p>
              <p class="text-sm text-gray-700 leading-relaxed">
                Choose between high-gloss coating for ultimate vibrance or matte finish for a elegant, non-glare appearance that is simple to write on. Personalize with your logo and messaging in our Design Studio or upload layouts to print single-sided or double-sided.
              </p>
            </div>`,
          faqs: [
            {
              q: "What paper stock options do you offer for postcards?",
              a: "We print our postcards on high-quality heavy 14pt glossy cover or matte cardstock, giving them a stiff and substantial feel. Our glossy finish offers a high-shine coating that enhances photographic prints, while our smooth matte finish offers an elegant, writeable surface that resists smudging.",
            },
            {
              q: "Can I print on both the front and back of the postcards?",
              a: "Yes, absolutely! We offer both single-sided and double-sided full-color printing. Double-sided printing is highly recommended for direct mailers so you can place address and postage details on one side and a beautiful visual promotion on the other.",
            },
            {
              q: "Are your postcards compatible with direct mail services like EDDM?",
              a: "Yes! Our postcards are cut with square corners (no round cornering) to comply with Canada Post and USPS direct mail standards. Popular EDDM sizes like 6\" x 9\" and 6\" x 11\" are fully supported.",
            },
            {
              q: "What is the difference between glossy and matte postcard finishes?",
              a: "Glossy paper has a reflective coating that makes images pop with intense color and deep contrasts, ideal for real estate flyers. Matte finish is non-reflective, soft to the touch, and makes text highly legible, ideal for info-dense postcards.",
            },
            {
              q: "Do you offer layout templates for designing postcards?",
              a: "Yes, our online Design Studio provides easy-to-use layouts, shapes, cliparts, and text boxes. You can design your postcard from scratch or upload a print-ready PDF/AI file directly to place your order.",
            },
          ],
          reviews: [
            {
              author: "Tina M., Sales Rep",
              rating: 5,
              text: "Used these as handout spec sheets for our trade show in Toronto. Colors are bright, and the 14pt stock feels very thick and expensive. Highly recommended local print shop!",
            },
            {
              author: "Robert G., General Contractor",
              rating: 5,
              text: "Resilient, thick cards. Square corners look very modern. Handed out to clients and got a great response.",
            },
          ],
          ctaHeading: "Build flyers & postcards",
        },
      },
    ],
  },
  "custom-decals": {
    title: "Decals",
    breadcrumbLabel: "Decals",
    description:
      "Discover our full lineup of decal solutions, including vinyl decals, static clings, sticker sheets, and roll labels.",
    heroImage: "/images/products/main-page/stickers_decals_hero_image-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/stickers_decals_hero_image-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/stickers_decals_hero_image-toronto-printing-ca.webp",
    heroSubtitle: "Design It. Stick It. Leave Your Mark.",
    reviewRating: "4.9",
    reviewCount: "1,840",
    reviewQuote:
      "The window decals turned out perfectly! Extremely simple to apply without bubbles, and the resolution is incredibly sharp. Will buy again!",
    categoryDescriptionText:
      "Discover our full lineup of decal solutions, including vinyl decals, static clings, sticker sheets, and roll labels. Ideal for use indoors or out, our decals are built to last and ideal for everything from storefront displays to vehicle branding and promotional giveaways. Easily personalize your decals with our intuitive design tools by uploading your own artwork or choosing from our ready-made templates to get started today.",
    categorySecondaryImage: "/images/products/main-page/custom_decals_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "What type of decal material should I choose?",
        a: "It depends on your surface and how you plan to use the decal. Clear decals are excellent for glass and offer a sleek, see-through look where the background shows through. Opaque decals have a solid white backing, making colors pop and providing full coverage making them ideal for most surfaces and long-term use. Static clings use no adhesive, are simple to reposition, and ideal for short-term use on smooth surfaces like windows. For bulk needs, sticker sheets and roll labels offer flexible, efficient options.",
      },
      {
        q: "Can these decals be used indoors and outdoors?",
        a: "Yes! We offer materials that suit both environments. Opaque vinyl and clear decals are resilient enough for exterior use, while static clings and wall decals are best for interior or short-term exterior placement.",
      },
      {
        q: "What surfaces do your decals stick to best?",
        a: "All our decals are made for smooth, non-porous surfaces like glass, metal, painted walls, and plastic. For best results, apply to clean, flat areas free of dust or texture.",
      },
      {
        q: "Are decals simple to apply and remove?",
        a: "Yes! Most apply with simple pressure and can be removed without damage. Static clings are especially simple to reposition or remove, while adhesive decals may require heat or adhesive remover for clean removal. Sticker sheets and roll labels are engineered for peel-and-stick convenience and are simple to handle in bulk.",
      },
      {
        q: "Can I upload my own design or logo?",
        a: "Absolutely! You can upload your own artwork, logos, or images, or start with one of our pre-designed templates. Our design tool lets you customize text, colors, and layout—no design experience needed.",
      },
      {
        q: "What decal sizes do you offer?",
        a: "We offer a wide range of standard and sizes to fit your needs; whether it's a small window graphic or a large wall display. You can select your preferred size on each product page or enter a dimension if needed.",
      },
    ],
    products: [
      {
        id: "bumper-stickers",
        name: "Bumper Stickers",
        description:
          "Traditional adhesive labels for car bumpers and windows. Maximum exposure branding.",
        image: "/images/products/main-page/bumper_sticker_product-toronto-printing-ca.webp",
        price: "Starting at CAD 2.24",
        badge: "Car Favorite",
        config: {
          title: "Bumper Stickers",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Standard bumper stickers manufactured using weather-resistant, UV-proof exterior vinyl adhesive.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF BUMPER STICKERS - SHIPS NEXT DAY",
          image: "/images/products/main-page/bumper_sticker_product-toronto-printing-ca.webp",
          ratingCount: "850",
          ratingScore: "4.8",
          sizes: [
            {
              label: '3" x 10" Rectangle Bumper Sticker',
              value: "3x10",
              basePrice: 2.24,
            },
            { label: '4" x 4" Circle Sticker', value: "4x4", basePrice: 3.49 },
          ],
          selects: [
            {
              label: "Finish Options",
              options: [
                {
                  label: "High Gloss Protective UV",
                  value: "gloss",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Bulk packs save up to 80% per sticker",
          keyFeatures: [
            "High-quality 4mil vinyl layer",
            "Weather-resistant and car-wash safe",
            "Easy bubble-free application",
          ],
          useCases: [
            "Corporate giveaways",
            "School spirit labels",
            "Political campaigns",
          ],
          specs: [
            { key: "Material", value: "4mil calendered white gloss vinyl" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Print bumper stickers today",
        },
      },
      {
        id: "car-door-decals",
        name: "Car Door Decals",
        description: "Adhesive door decals for car bodies. Resilient semi-permanent marketing. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/car_door_decal_product-toronto-printing-ca.webp",
        price: "Starting at CAD 23.86",
        config: {
          title: "Car Door Decals",
          subtitle:
            "Expert-grade semi-permanent adhesive branding decals for truck and car door panels.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF SEMI-PERMANENT DOOR DECALS",
          image: "/images/products/main-page/car_door_decal_product-toronto-printing-ca.webp",
          ratingCount: "320",
          ratingScore: "4.7",
          sizes: [
            {
              label: '12" x 18" Small Door Decal',
              value: "12x18",
              basePrice: 43.86,
            },
            {
              label: '18" x 24" Standard Door Decal',
              value: "18x24",
              basePrice: 64.99,
            },
          ],
          selects: [
            {
              label: "Vinyl Option",
              options: [
                {
                  label: "Opaque Adhesive Gloss Vinyl",
                  value: "opaque",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Volume discounts on door pairs",
          keyFeatures: [
            "High performance calendered vinyl",
            "Weather-resistant and UV laminated",
            "Semi-permanent solid adhesion",
          ],
          useCases: [
            "Corporate logos",
            "Regulation USDOT numbers",
            "Contractor branding",
          ],
          specs: [{ key: "Material", value: "4mil High-performance Vinyl" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Brand your fleet vehicles",
        },
      },
      {
        id: "car-window-decals",
        name: "Car Window Decals",
        description:
          "Rear and side window adhesive graphics, available in transparent and opaque materials.",
        image: "/images/products/main-page/car_window_decal_product-toronto-printing-ca.webp",
        price: "Starting at CAD 23.86",
        config: {
          title: "Car Window Decals",
          subtitle:
            "Highly visible rear window adhesive decals. Ideal for glass surfaces.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF WINDOW ADHESIVE DECALS",
          image: "/images/products/main-page/car_window_decal_product-toronto-printing-ca.webp",
          ratingCount: "285",
          ratingScore: "4.8",
          sizes: [
            {
              label: '12" x 18" Small Window Decal',
              value: "12x18",
              basePrice: 43.86,
            },
            {
              label: '18" x 24" Medium Window Decal',
              value: "18x24",
              basePrice: 64.99,
            },
          ],
          selects: [
            {
              label: "Material Style",
              options: [
                {
                  label: "Opaque White Backing Vinyl",
                  value: "opaque",
                  priceAdder: 0,
                },
                {
                  label: "Clear Transparent Window Vinyl",
                  value: "clear",
                  priceAdder: 4.5,
                },
              ],
            },
          ],
          qtyDiscount: "Volume savings apply",
          keyFeatures: [
            "Window safe adhesive backing",
            "Vivid inks pop on transparent base",
            "Rain and rear-wiper proof",
          ],
          useCases: [
            "Rear window advertisement",
            "Store hours",
            "Reg numbers on windows",
          ],
          specs: [
            { key: "Material", value: "4mil window-form adhesive vinyl" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Make your rear window sell",
        },
      },
      {
        id: "window-decals",
        name: "Window Decals",
        description: "Adhesive signage for corporate storefront windows and glass panels. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/vinyl_sticker-toronto-printing-ca.webp",
        price: "Starting at CAD 23.86",
        badge: "Best Seller",
        config: {
          title: "Storefront Window Decals",
          subtitle:
            "Expert-grade adhesive decals for storefront glass, entrances, and office doors.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF STOREFRONT WINDOW DECALS",
          image: "/images/products/main-page/vinyl_sticker-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/vinyl_sticker-toronto-printing-ca.webp",
            "/images/products/gallery/vinyl_decal_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/vinyl_decal_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/vinyl_decal_use_1-toronto-printing-ca.webp",
          ],
          ratingCount: "940",
          ratingScore: "4.9",
          sizes: [
            {
              label: '12" x 18" Small Window Decal',
              value: "12x18",
              basePrice: 23.86,
            },
            {
              label: '18" x 24" Standard Window Decal',
              value: "18x24",
              basePrice: 34.99,
            },
            {
              label: '24" x 36" Large Window Decal',
              value: "24x36",
              basePrice: 54.99,
            },
          ],
          selects: [
            {
              label: "Material Style",
              options: [
                {
                  label: "Opaque White Adhesive Gloss",
                  value: "opaque",
                  priceAdder: 0,
                  description:
                    "Solid background makes colors extremely vivid.",
                },
                {
                  label: "Clear Transparent Adhesive Glass",
                  value: "clear",
                  priceAdder: 4.0,
                  description: "Allows see-through glass margins.",
                },
                {
                  label: "Frosted Glass Etched Finish",
                  value: "frosted",
                  priceAdder: 12.0,
                  description:
                    "Offers privacy with a high-quality sandblasted look.",
                },
              ],
            },
          ],
          qtyDiscount: "Saves up to 15% on commercial building orders",
          keyFeatures: [
            "Weatherproof exterior vinyl print",
            "Apply on inside or outside of glass",
            "Vivid UV inks resist fading",
          ],
          useCases: [
            "Corporate hours lists",
            "Storefront branding logos",
            "Open/Closed door banners",
            "Office partition privacy",
          ],
          specs: [
            { key: "Thickness", value: "4mil self-adhesive PVC" },
            {
              key: "Adhesive Type",
              value: "Low-residue pressure-activated acrylic",
            },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Brand your glass fronts",
        },
      },
      {
        id: "roll-labels",
        name: "Roll Labels",
        description:
          "Bulk promotional logo stickers manufactured using paper or plastic rolls, ideal for packaging.",
        image: "/images/products/main-page/roll_labels_product-toronto-printing-ca.webp",
        price: "Starting at CAD 0.54 each",
        config: {
          title: "Printed Roll Labels",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Bulk logo and product label rolls, ideal for quick peeling, boxing, and product jars.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF ALL BULK ROLL LABELS",
          image: "/images/products/main-page/roll_labels_product-toronto-printing-ca.webp",
          ratingCount: "410",
          ratingScore: "4.8",
          sizes: [
            { label: '2" x 2" Round Label', value: "2x2", basePrice: 0.54 },
            { label: '3" x 3" Square Label', value: "3x3", basePrice: 0.75 },
            { label: '4" x 2" Rectangle Label', value: "4x2", basePrice: 0.85 },
          ],
          selects: [
            {
              label: "Paper Quality",
              options: [
                {
                  label: "Gloss White Paper (BOPP)",
                  value: "gloss_paper",
                  priceAdder: 0,
                },
                {
                  label: "Clear Polypropylene Film",
                  value: "clear_film",
                  priceAdder: 0.1,
                },
              ],
            },
          ],
          qtyDiscount:
            "Pricing drops as low as CAD 0.05 per label in high bulk quantities",
          keyFeatures: [
            'Wound on standard 3" cardboard cores',
            "Easy machine or hand dispensing",
            "Vivid colors",
          ],
          useCases: [
            "Product jar branding",
            "Takeout bag sealing stickers",
            "Retail box shipping labels",
          ],
          specs: [{ key: "Material", value: "Premium BOPP adhesive stock" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Print product packaging rolls",
        },
      },
      {
        id: "window-clings",
        name: "Static Window Clings",
        description:
          "Glueless static clings that stick to glass using static energy. Simple to reposition.",
        image:
          "/images/products/main-page/window_clings_product-toronto-printing-ca.webp",
        price: "Starting at CAD 62.96",
        config: {
          title: "Static Window Clings",
          subtitle:
            "No-adhesive window clings. Slide in place, remove, and reuse with static cling science.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF REPOSITIONABLE WINDOW CLINGS",
          image:
            "/images/products/main-page/window_clings_product-toronto-printing-ca.webp",
          ratingCount: "220",
          ratingScore: "4.7",
          sizes: [
            {
              label: '12" x 18" Small Window Cling',
              value: "12x18",
              basePrice: 62.96,
            },
            {
              label: '18" x 24" Medium Window Cling',
              value: "18x24",
              basePrice: 79.99,
            },
            {
              label: '24" x 36" Large Window Cling',
              value: "24x36",
              basePrice: 99.99,
            },
          ],
          selects: [
            {
              label: "Cling Attachment side",
              options: [
                {
                  label: "Face Cling (Apply inside glass looking out)",
                  value: "face_cling",
                  priceAdder: 0,
                },
                {
                  label: "Back Cling (Apply outside glass looking in)",
                  value: "back_cling",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Saves with multi-clings packs",
          keyFeatures: [
            "Zero adhesive residue",
            "100% repositionable & reusable",
            "Clings to smooth glass surfaces",
          ],
          useCases: [
            "Temporary retail campaigns",
            "Holiday promotional banners",
            "Car service reminder tags",
          ],
          specs: [
            { key: "Material", value: "7.5mil static-cling gloss PVC film" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Get flexible glass branding",
        },
      },
      {
        id: "sheet-stickers",
        name: "Sheet Stickers",
        description: "Multiple stickers manufactured using a flat sheet, ideal for retail labelling. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/sticker_and_labels-toronto-printing-ca.webp",
        price: "Starting at CAD 11.16",
        config: {
          title: "Sheet Stickers",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Sticker sheets featuring multiple peel-off sticker cut contours on a single page.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF PRINTED STICKER SHEETS",
          image: "/images/products/main-page/sticker_and_labels-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/sticker_and_labels-toronto-printing-ca.webp",
            "/images/products/gallery/sticker_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/sticker_use_1-toronto-printing-ca.webp",
            "/images/products/gallery/sticker_use_1-toronto-printing-ca.webp",
          ],
          ratingCount: "340",
          ratingScore: "4.8",
          sizes: [
            {
              label: '8.5" x 11" Standard Sheet Size',
              value: "8.5x11",
              basePrice: 11.16,
            },
          ],
          selects: [
            {
              label: "Sticker Sheet material",
              options: [
                {
                  label: "Glossy White Sticker Paper",
                  value: "gloss_sheet",
                  priceAdder: 0,
                },
                {
                  label: "Matte White Sticker Paper",
                  value: "matte_sheet",
                  priceAdder: 0,
                },
              ],
            },
          ],
          qtyDiscount: "Saves up to 40% on bulk sheets",
          keyFeatures: [
            "Multiple stickers per sheet",
            "Resilient peel-and-stick backings",
            "Contour kiss-cut contours",
          ],
          useCases: [
            "Product labeling",
            "Fun office handouts",
            "Packaging decorations",
          ],
          specs: [{ key: "Sheet Count", value: "Custom layouts per sheet" }],
          faqs: [],
          reviews: [],
          ctaHeading: "Design multi-sticker layouts",
        },
      },
      {
        id: "return-address-labels",
        name: "Return Address Labels",
        description:
          "Mini address stickers for envelope branding, packaging returns, and office logs.",
        image:
          "/images/products/main-page/return_address_labels_product-toronto-printing-ca.webp",
        price: "Starting at CAD 0.14 each",
        config: {
          title: "Return Address Labels",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Convenient return address labels manufactured using high-quality sticky sheets.",
          breadcrumb: "Decals",
          breadcrumbHref: "/custom-decals",
          promoText: "20% OFF RETURN ADDRESS LABELS",
          image:
            "/images/products/main-page/return_address_labels_product-toronto-printing-ca.webp",
          ratingCount: "480",
          ratingScore: "4.9",
          sizes: [
            {
              label: '0.75" x 2.25" Mini Label size',
              value: "0.75x2.25",
              basePrice: 0.14,
            },
          ],
          selects: [
            {
              label: "Label Color Style",
              options: [
                {
                  label: "Standard White paper backing",
                  value: "white_back",
                  priceAdder: 0,
                },
                {
                  label: "Clear transparent window film",
                  value: "clear_back",
                  priceAdder: 0.05,
                },
              ],
            },
          ],
          qtyDiscount: "Pack options of 100, 250, 500",
          keyFeatures: [
            "Peel & stick rapidly",
            "Vivid black text layout",
            "Resilient cardstock box container",
          ],
          useCases: [
            "Corporate correspondence envelopes",
            "Wedding invitations",
            "Product labels",
          ],
          specs: [
            { key: "Dimensions", value: "0.75 inches tall x 2.25 inches wide" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Design return labels",
        },
      },
    ],
  },
  "sign-accessories": {
    title: "Stands & Sign Holders",
    breadcrumbLabel: "Sign Accessories",
    description:
      "High-quality stakes, frames and commercial-grade steel mounts to hold your yard signs, exterior notices, and trade show displays.",
    heroImage: "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
    reviewRating: "4.8",
    reviewCount: "980",
    reviewQuote:
      "The H-frame stakes are rock solid. Held our yard signs through a nasty storm without budging an inch.",
    products: [
      {
        id: "h-frames",
        name: "Metal H-Frame Stakes",
        description: "Commercial-grade metal wire stakes to hold corrugated plastic signs in lawns. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 1.49",
        config: {
          title: "Metal Yard Stakes (H-Frames)",
          subtitle:
            "Commercial-grade galvanized steel wire stakes designed to hold 4mm coroplast yard signs.",
          breadcrumb: "Sign Holders",
          breadcrumbHref: "/sign-accessories",
          promoText: "25% OFF WIRE STAKES & HOLDERS",
          image: "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
          ratingCount: "940",
          ratingScore: "4.8",
          sizes: [
            {
              label: '30" x 10" Standard Wire Stake',
              value: "30x10",
              basePrice: 1.99,
            },
            {
              label: '15" x 10" Half Size Stake',
              value: "15x10",
              basePrice: 1.49,
            },
          ],
          selects: [
            {
              label: "Wire Thickness Quality",
              options: [
                {
                  label: "Standard 9-Gauge Steel",
                  value: "9gauge",
                  priceAdder: 0,
                  description: "Traditional sturdy wire, fits standard lawns.",
                },
                {
                  label: "Heavy Duty Galvanized Steel",
                  value: "heavy",
                  priceAdder: 1.25,
                  description: "Reinforced structure for clay or hard soils.",
                },
              ],
            },
          ],
          qtyDiscount:
            "Volume pricing drops under CAD 0.99 for quantities over 100",
          keyFeatures: [
            "Corrosion-resistant steel",
            "Slides easily into yard sign flutes",
            "Steps directly into lawn",
            "Reusable seasonal hardware",
          ],
          useCases: [
            "Political campaigns",
            "Real estate open houses",
            "Contractor lawn marketing",
            "Community event notices",
          ],
          specs: [
            { key: "Material", value: "Galvanized Steel Wire" },
            { key: "Height", value: "30 inches standard" },
            {
              key: "Compatibility",
              value: "Fits standard 4mm corrugated yard signs",
            },
          ],
          faqs: [
            {
              q: "How do I install these stakes?",
              a: "Simply push the top prongs into the bottom center of the yard sign, then step the bottom crossbar into the soil.",
            },
          ],
          reviews: [
            {
              author: "Arthur L.",
              rating: 5,
              text: "Sturdy stakes. Did not bend even in cold Canadian lawn soil.",
            },
          ],
          ctaHeading: "Order stakes for your yard signs",
        },
      },
    ],
  },
  "marketing-materials": {
    title: "Marketing Materials",
    breadcrumbLabel: "Marketing Materials",
    heroSubtitle: "Expert-grade Print. Promoted Brand.",
    description:
      "Grow your business and look expert-grade with customized business cards, flyers, and brochures.",
    heroImage: "/images/products/main-page/marketing_materials_hero_image-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/marketing_materials_hero_image-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/marketing_materials_hero_image-toronto-printing-ca.webp",
    reviewRating: "4.9",
    reviewCount: "1,150",
    reviewQuote:
      "The flyers and folded menus turned out absolutely gorgeous! Perfect color alignment with our corporate branding guidelines and the paper quality is very thick.",
    categoryDescriptionText:
      `<div class="space-y-4">
        <h3 class="text-xl font-bold text-slate-900">Elevate Your Brand in Toronto with High-quality Marketing Materials</h3>
        <p class="text-sm text-gray-700 leading-relaxed">
          At <strong>Nano Signs</strong>, we deliver industry-leading commercial printing and sign services designed to grab attention and convert leads. Serving <strong>Toronto</strong>, <strong>Mississauga</strong>, and the wider <strong>Greater Toronto Area</strong>, we specialize in high-definition print collateral that represents your business with distinction. Whether you need standard business cards for networking events, door hangers for targeted local neighbourhood mailings, or folded brochures to pitch complex services, our state-of-the-art print production facilities ensure crisp details, harmonious colors, and high-quality paper weights.
        </p>
        <p class="text-sm text-gray-700 leading-relaxed">
          Our complete suite of marketing collateral includes high-quality business cards (including our 14pt semi-gloss profit maximizer), postcards and direct mailers, vivid flyers and folded brochures, and pre-cut door hangers. We print on heavy cardstock and high-density text papers using advanced offset lithography. Plus, with our local facility advantages, we support next-day shipping throughout Ontario, ensuring you never show up empty-handed to your next client pitch or local tradeshow event.
        </p>
      </div>`,
    categorySecondaryImage: "/images/products/main-page/marketing_materials_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "What cardstock and paper options do you offer?",
        a: "We offer a variety of expert-grade materials tailored to each product. Our cards, door hangers, rack cards, and table tents are manufactured using thick 14pt or 16pt cardstock with gloss or matte finishes. Our flyers and brochures are manufactured using high-density 100lb glossy or matte text paper for high foldability.",
      },
      {
        q: "Can I write on the glossy printed materials?",
        a: "Glossy UV-coated materials have a slick finish that is resistant to standard ballpoint ink. If you need to write notes, dates, or prices on your handouts, we highly recommend choosing our Smooth Matte finish, which works perfectly with pens and pencils.",
      },
      {
        q: "Do you offer folding services for brochures?",
        a: "Yes! When configuring our 8.5\" x 11\" flyers, you can select 'Tri-Fold' or 'Half-Fold' finishes. Your brochures will arrive pre-folded and event-ready at no extra hassle.",
      },
    ],
    products: [
      {
        id: "business-cards",
        name: "Business Cards",
        description:
          'Leave a lasting impression with high-quality Business Cards. Manufactured using ultra-thick 14pt or 16pt cardstock with offset high-resolution printing, these standard 3.5" x 2" cards represent your business with absolute quality. Customize your finish with expert-grade non-glare matte or high-gloss UV sheen, and choose single or double-sided layouts to distribute to tradeshow attendees, recruits, and new leads.',
        image: "/images/products/main-page/business_cards-toronto-printing-ca.webp",
        price: "Starting at $55.00",
        config: {
          title: "Business Cards",
          quantityOptions: [100, 500, 1000, 2500, 5000],
          quantityPrices: {
            100: 55.98,
            500: 65.98,
            1000: 85.98,
            2500: 179.98,
            5000: 205.98,

          },
          subtitle:
            'Standard 3.5" x 2" cards manufactured using ultra-thick cardstock with multiple finishes.',
          breadcrumb: "Marketing",
          breadcrumbHref: "/marketing-materials",
          promoText: "25% OFF ALL CORPORATE STATIONERY",
          image: "/images/products/main-page/business_cards-toronto-printing-ca.webp",
          ratingCount: "1120",
          ratingScore: "4.9",
          sizes: [
            {
              label: '3.5" x 2" Standard size',
              value: "3.5x2",
              basePrice: 29.98,
            },
          ],
          selects: [
            {
              label: "Paper Stock & Finish",
              options: [
                {
                  label: "14pt matte finish (profit maximizer)",
                  value: "matte_finish",
                  priceAdder: 0,
                  description: "Clean, expert-grade look with a smooth matte finish. Simple to write on.",
                  image: "/images/products/main-page/business_cards_semigloss-toronto-printing-ca.webp",
                },
                {
                  label: "Glossy",
                  value: "glossy",
                  priceAdder: 0,
                  description: "High-shine glossy finish that makes colors pop.",
                  image: "/images/products/main-page/business_cards_glossy-toronto-printing-ca.webp",
                },
                {
                  label: "Embossed Gloss",
                  value: "embossed_gloss",
                  priceAdder: 0.15,
                  description: "Raised clear gloss accents for a textured, high-end feel.",
                  image: "/images/products/main-page/business_cards_foil-toronto-printing-ca.webp",
                },
                {
                  label: "Soft Touch",
                  value: "soft_touch",
                  priceAdder: 0.12,
                  description: "Velvety coating that feels soft and high-quality in the hand.",
                  image: "/images/products/main-page/business_cards-toronto-printing-ca.webp",
                },
                {
                  label: "Painted Edge",
                  value: "painted_edge",
                  priceAdder: 0.25,
                  description: "Thick cards with colored edges for a bold, modern look.",
                  image: "/images/products/main-page/business_cards_painted_edge-toronto-printing-ca.webp",
                },
                {
                  label: "Ultra Thick",
                  value: "ultra_thick",
                  priceAdder: 0.23,
                  description: "Double-thick cardstock for a substantial, sturdy feel.",
                  image: "/images/products/main-page/business_cards_ultra_thick-toronto-printing-ca.webp",
                },
                {
                  label: "Clear Plastic",
                  value: "clear_plastic",
                  priceAdder: 0.35,
                  description: "See-through modern plastic cards that make a unique statement.",
                  image: "/images/products/main-page/business_cards_clear_plastic-toronto-printing-ca.webp",
                },
                {
                  label: "Pearl",
                  value: "pearl",
                  priceAdder: 0.12,
                  description: "Glimmering, light-catching surface with a pearlescent shine.",
                  image: "/images/products/main-page/business_cards_pearl-toronto-printing-ca.webp",
                },
                {
                  label: "Gold Raised Foil",
                  value: "gold_raised_foil",
                  priceAdder: 0.20,
                  description: "Elevated, 3D raised gold foil accents for a luxury feel.",
                  image: "/images/products/main-page/business_cards_gold_raised_foil-toronto-printing-ca.webp",
                },
                {
                  label: "Silver Raised Foil",
                  value: "silver_raised_foil",
                  priceAdder: 0.20,
                  description: "Elevated, 3D raised silver foil accents for a luxury feel.",
                  image: "/images/products/main-page/business_cards_silver_raised_foil-toronto-printing-ca.webp",
                },
              ],
            },
            {
              label: "Sides",
              options: [
                {
                  label: "Double-Sided",
                  value: "double",
                  priceAdder: 0,
                  priceMultiplier: 1.25,
                  description: "Manufactured using both front and back sides.",
                },
              ],
            },
            {
              label: "Corners",
              options: [
                {
                  label: "Standard Square Corners",
                  value: "square",
                  priceAdder: 0,
                },
                {
                  label: "Rounded Corners",
                  value: "rounded",
                  priceAdder: 0.10,
                },
              ],
            },
          ],
          qtyDiscount: "Predefined package quantities selected below",
          keyFeatures: [
            "Vivid color offset printing",
            "Ultra-thick cardstock options",
            "Easy design templates",
          ],
          useCases: ["Networking events", "Customer takeaways", "Loyalty stamp cards", "Appointment reminders"],
          specs: [
            { key: "Dimensions", value: '3.5" x 2" (Standard size)' },
            { key: "Standard Stock", value: "14pt semi gloss (profit maximizer)" },
            { key: "Premium Finishes", value: "Glossy, Soft Touch, Pearl" },
            { key: "Luxury Finishes", value: "Embossed Gloss, Gold Raised Foil, Silver Raised Foil" },
            { key: "Specialty Stocks", value: "Painted Edge, Ultra Thick, Clear Plastic" },
            { key: "Standard Turnaround", value: "Next Business Day" },
          ],
          description:
            `<div class="space-y-4">
              <h3 class="text-lg font-bold text-slate-900">High-quality Business Cards Printed in Toronto</h3>
              <p class="text-sm text-gray-700 leading-relaxed">
                Make a striking expert-grade statement with business cards from Nano Signs. Serving Toronto, Mississauga, and the Greater Toronto Area, we specialize in high-definition offset business card printing that sets your brand apart. Our cards are manufactured using ultra-sturdy 14pt semi-gloss cardstock (our profit maximizer option) or heavy-weight 16pt stock, ensuring they never feel flimsy or cheap. Choose between a glossy UV protective coating for high vivid contrast, or a smooth matte coating for a sophisticated, writable surface.
              </p>
              <p class="text-sm text-gray-700 leading-relaxed">
                Whether you are an independent contractor in the GTA, a startup founder in Mississauga, or a real estate agent in Toronto, having a pocket full of pristine, double-sided business cards ensures you are always ready to network. Customize yours with raised foil accents, shapes, or painted edges to leave a memorable physical impression.
              </p>
            </div>`,
          faqs: [
            {
              q: "What is the standard size of a business card?",
              a: 'The standard size for standard business cards is 3.5 inches by 2 inches. This fits perfectly into standard wallets, cardholders, and organizer slots.',
            },
            {
              q: "What is the difference between 14 pt and 16 pt cardstock?",
              a: 'The point (pt) unit measures paper thickness. 14 pt cardstock is the industry standard for high-quality business cards. 16 pt cardstock is thicker and sturdier, providing a heavier, more high-quality feel.',
            },
            {
              q: "Can I write on both matte and glossy business cards?",
              a: 'You can write on matte and uncoated cards using standard ballpoint pens or pencils. Glossy cards have a slick UV coating that resists ink, making them harder to write on.',
            },
            {
              q: "What is the difference between Pearl and Soft Touch finishes?",
              a: 'Pearl cardstock uses a specialized paper embedded with natural shimmering fibers that give the entire card a pearlescent sheen. Soft Touch is a velvet-matte protective coating applied after printing that gives the cards a soft, suede-like texture.',
            },
            {
              q: "What is the minimum order quantity for business cards?",
              a: "Our minimum quantity starts at just 100 cards. We provide significant bulk printing discounts for quantities of 250, 500, 1000, and up to 10,000 cards per order, giving you maximum value.",
            },
          ],
          reviews: [
            {
              author: "Marcus K., Event Director",
              rating: 5,
              text: "The metallic foil cards look amazing! They really capture attention when handed out. Exact color registration and excellent high-quality paper stock.",
            },
            {
              author: "Sarah J., Retail Manager",
              rating: 5,
              text: "I ordered the Pearl business cards and have received so many compliments on the shimmer. The offset print quality is pristine.",
            },
            {
              author: "David T., Startup Founder",
              rating: 5,
              text: "Sturdy 16 pt high-quality cards. Excellent price point and extremely fast turnaround. Will definitely reorder standard cards here.",
            },
          ],
          ctaHeading: "Design business cards now",
        },
      },
      {
        id: "postcards",
        name: "Postcards",
        description: "High-quality postcards for direct mail, handouts, and promotional inserts. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
        price: "Starting at CAD 60.00 for 100",
        badge: "Event Choice",
        config: {
          title: "Postcards",
          quantityOptions: [100, 250, 500, 750, 1000, 1500, 2000],
          subtitle:
            "Full-color promotional postcards manufactured using high-quality thick cardstock.",
          breadcrumb: "Marketing",
          breadcrumbHref: "/marketing-materials",
          promoText: "25% OFF ALL EVENT MARKETING PRINTS",
          image: "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_matte-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_action_1-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_action_2-toronto-printing-ca.webp",
            "/images/products/main-page/postcard_action_3-toronto-printing-ca.webp",
          ],
          ratingCount: "580",
          ratingScore: "4.8",
          sizes: [
            {
              label: '4" x 6" Standard Postcard',
              value: "4x6",
              basePrice: 0.60,
              quantityPrices: {
                100: 60.00,
                250: 100.00,
                500: 140.00,
                750: 165.00,
                1000: 180.00,
                1500: 240.00,
                2000: 280.00,
              },
            },
            {
              label: '5" x 7" Medium Postcard',
              value: "5x7",
              basePrice: 0.80,
              quantityPrices: {
                100: 80.00,
                250: 140.00,
                500: 200.00,
                750: 225.00,
                1000: 260.00,
                1500: 330.00,
                2000: 360.00,
              },
            },
            {
              label: '6" x 9" Large Postcard',
              value: "6x9",
              basePrice: 1.10,
              quantityPrices: {
                100: 110.00,
                250: 210.00,
                500: 290.00,
                750: 330.00,
                1000: 380.00,
                1500: 480.00,
                2000: 560.00,
              },
            },
            {
              label: '6" x 11" Jumbo Postcard',
              value: "6x11",
              basePrice: 1.20,
              quantityPrices: {
                100: 120.00,
                250: 220.00,
                500: 310.00,
                750: 360.00,
                1000: 400.00,
                1500: 480.00,
                2000: 600.00,
              },
            },
          ],
          selects: [
            {
              label: "Paper Stock",
              options: [
                {
                  label: "Glossy",
                  value: "glossy",
                  priceAdder: 0,
                  description: "High-shine glossy finish that makes colors pop.",
                  image: "/images/products/main-page/postcard_glossy-toronto-printing-ca.webp",
                },
                {
                  label: "Matte",
                  value: "matte",
                  priceAdder: 0,
                  description: "Clean, expert-grade look with a smooth non-glare matte finish.",
                  image: "/images/products/main-page/postcard_matte-toronto-printing-ca.webp",
                },
              ],
            },
            {
              label: "Orientation",
              options: [
                {
                  label: "Horizontal",
                  value: "horizontal",
                  priceAdder: 0,
                  description: "Landscape orientation layout.",
                },
                {
                  label: "Vertical",
                  value: "vertical",
                  priceAdder: 0,
                  description: "Portrait orientation layout.",
                },
              ],
            },
          ],
          qtyDiscount: "Save more when printing in bulk",
          keyFeatures: [
            "Archival grade cardstock",
            "Stunning gloss or writable matte finish",
            "Double sided color printing available",
          ],
          useCases: [
            "Direct mail marketing",
            "Coupons & promotional hand-outs",
            "Event invitations",
            "Product package inserts",
          ],
          specs: [
            { key: "Material", value: "14pt Premium Cardstock" },
            { key: "Finish Options", value: "Glossy (front only) or Smooth Matte" },
          ],
          description:
            `<div class="space-y-4">
              <h3 class="text-lg font-bold text-slate-900">Printed Postcards in Toronto & Mississauga</h3>
              <p class="text-sm text-gray-700 leading-relaxed">
                Take your local direct mail marketing or client handouts to the next level with high-quality postcards from Nano Signs. Serving the Greater Toronto Area, Toronto, and Mississauga, ON, we offer crisp, full-color postcard printing that is ideal for neighbourhood outreach, retail promotions, coupons, and corporate invitations. Our postcards are cut with square corners to comply with standard Canada Post specifications, guaranteeing a clean and simple product-focused aesthetic.
              </p>
              <p class="text-sm text-gray-700 leading-relaxed">
                Choose between high-shine glossy finish that accentuates photographic imagery and makes colors pop, or smooth matte cardstock for a non-glare, writeable finish. With single-sided or double-sided printing options, you can design your postcard layout to showcase striking graphics on the front while keeping the back clear for address, postage, and local corporate details.
              </p>
            </div>`,
          faqs: [
            {
              q: "What paper stock options do you offer for postcards?",
              a: "We print our postcards on high-quality heavy 14pt glossy cover or matte cardstock, giving them a stiff and substantial feel. Our glossy finish offers a high-shine coating that enhances photographic prints, while our smooth matte finish offers an elegant, writeable surface that resists smudging.",
            },
            {
              q: "Can I print on both the front and back of the postcards?",
              a: "Yes, absolutely! We offer both single-sided and double-sided full-color printing. Double-sided printing is highly recommended for direct mailers so you can place address and postage details on one side and a beautiful visual promotion on the other.",
            },
            {
              q: "Are your postcards compatible with direct mail services like EDDM?",
              a: "Yes! Our postcards are cut with square corners (no round cornering) to comply with Canada Post and USPS direct mail standards. Popular EDDM sizes like 6\" x 9\" and 6\" x 11\" are fully supported.",
            },
            {
              q: "What is the difference between glossy and matte postcard finishes?",
              a: "Glossy paper has a reflective coating that makes images pop with intense color and deep contrasts, ideal for real estate flyers. Matte finish is non-reflective, soft to the touch, and makes text highly legible, ideal for info-dense postcards.",
            },
            {
              q: "Do you offer layout templates for designing postcards?",
              a: "Yes, our online Design Studio provides easy-to-use layouts, shapes, cliparts, and text boxes. You can design your postcard from scratch or upload a print-ready PDF/AI file directly to place your order.",
            },
          ],
          reviews: [
            {
              author: "Elena R., Boutique Owner",
              rating: 5,
              text: "The matte postcards were ideal for our summer collection mailer! They feel very high-quality and the printing is incredibly sharp. Excellent Toronto local service.",
            },
            {
              author: "Jason L., Realtor",
              rating: 5,
              text: "Exactly what I was looking for. No rounded corners, very simple and expert-grade. Will buy all my listing postcards here.",
            },
          ],
          ctaHeading: "Ready to design postcards?",
        },
      },
      {
        id: "flyers",
        name: "Flyers",
        description: "Vivid single or double sided flyers to promote events, menus, and packages. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/flyer_glossy-toronto-printing-ca.webp",
        price: "Starting at CAD 74.00 for 100",
        badge: "Best Value",
        config: {
          title: "Flyers",
          quantityOptions: [100, 250, 500, 750, 1000, 1500, 2000, 2500],
          subtitle:
            "High-quality full color flyers manufactured using expert-grade paper stock.",
          breadcrumb: "Marketing",
          breadcrumbHref: "/marketing-materials",
          promoText: "25% OFF BULK EVENT FLYERS",
          image: "/images/products/main-page/flyer_glossy-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/flyer_glossy-toronto-printing-ca.webp",
            "/images/products/main-page/flyer_matte-toronto-printing-ca.webp",
          ],
          ratingCount: "430",
          ratingScore: "4.7",
          sizes: [
            {
              label: '5.5" x 8.5" Small Flyer',
              value: "5.5x8.5",
              basePrice: 0.74,
              quantityPrices: {
                100: 74.00,
                250: 120.00,
                500: 160.00,
                750: 195.00,
                1000: 240.00,
                1500: 330.00,
                2000: 400.00,
                2500: 480.00,
              },
            },
            {
              label: '8.5" x 14" Medium Flyer',
              value: "8.5x14",
              basePrice: 1.08,
              quantityPrices: {
                100: 108.00,
                250: 220.00,
                500: 330.00,
                750: 390.00,
                1000: 460.00,
                1500: 570.00,
                2000: 680.00,
                2500: 768.00,
              },
            },
            {
              label: '11" x 17" Large Flyer',
              value: "11x17",
              basePrice: 1.48,
              quantityPrices: {
                100: 148.00,
                250: 285.00,
                500: 440.00,
                750: 525.00,
                1000: 700.00,
                1500: 1050.00,
                2000: 1400.00,
                2500: 1698.00,
              },
            },
          ],
          selects: [
            {
              label: "Paper Stock",
              options: [
                {
                  label: "Glossy",
                  value: "glossy",
                  priceAdder: 0,
                  description: "High-shine glossy finish that makes colors pop.",
                  image: "/images/products/main-page/flyer_glossy-toronto-printing-ca.webp",
                },
                {
                  label: "Matte",
                  value: "matte",
                  priceAdder: 0,
                  description: "Clean, expert-grade look with a smooth non-glare matte finish.",
                  image: "/images/products/main-page/flyer_matte-toronto-printing-ca.webp",
                },
              ],
            },
            {
              label: "Orientation",
              options: [
                {
                  label: "Vertical",
                  value: "vertical",
                  priceAdder: 0,
                  description: "Portrait orientation layout.",
                },
                {
                  label: "Horizontal",
                  value: "horizontal",
                  priceAdder: 0,
                  description: "Landscape orientation layout.",
                },
              ],
            },
          ],
          qtyDiscount: "Save more when printing in bulk",
          keyFeatures: [
            "High definition color reproduction",
            "Vivid double-sided printing available",
            "High-quality glossy or matte textures",
          ],
          useCases: [
            "Event handouts",
            "Restaurant menus",
            "Real estate listing sheets",
            "Corporate handouts",
          ],
          specs: [
            { key: "Material", value: "Premium Glossy or Matte paper stock" },
            { key: "Printing", value: "High definition offset printing" },
          ],
          description:
            `<div class="space-y-4">
              <h3 class="text-lg font-bold text-slate-900">Flyer Printing in Toronto</h3>
              <p class="text-sm text-gray-700 leading-relaxed">
                Promote your next corporate event, local restaurant menu, or real estate open house with flyers from Nano Signs. Serving Mississauga, Toronto, and all of the Greater Toronto Area, we specialize in high-definition offset flyer printing with fast turnarounds. Manufactured using high-quality 100lb glossy text paper (which makes colors pop with photographic vibrance) or smooth matte text paper (ideal for a sophisticated, glare-free readable finish), our flyers offer a thick, substantial feel.
              </p>
              <p class="text-sm text-gray-700 leading-relaxed">
                Choose single or double-sided layouts and orientation options (horizontal or vertical) to match your campaign goals. Hand them out at local Toronto events, display them at front desks, or mail them directly to neighbourhood prospects.
              </p>
            </div>`,
          faqs: [
            {
              q: "What sizes are available for flyers?",
              a: "Our flyers are available in three adaptable sizes: 5.5\"x8.5\" (compact handouts), 8.5\"x14\" (legal-size sheets), and 11\"x17\" (large display posters).",
            },
            {
              q: "What paper stocks are used for printing flyers?",
              a: "We use high-density 100lb glossy text paper and smooth matte text paper, ensuring a thick, high-quality feel without compromising on flexibility.",
            },
            {
              q: "Are flyers manufactured using both sides?",
              a: "Yes! You can choose between single-sided and double-sided printing. Double-sided flyers are excellent for menus, pamphlets, and product sheets.",
            },
            {
              q: "Can I fold these flyers to make brochures?",
              a: "While we offer folded brochures separately, our flyers are shipped flat. If you want pre-folded handouts, we recommend ordering from our Brochures section.",
            },
            {
              q: "Is there a bulk discount for large flyer orders?",
              a: "Yes! We offer bulk tier discounts starting at 250 flyers. The unit price decreases significantly as you print higher quantities (up to 2,500 units).",
            },
          ],
          reviews: [
            {
              author: "Kevin M., Event Coordinator",
              rating: 5,
              text: "The glossy 100lb text flyers looked stunning under the venue lighting. Very fast local pickup in Toronto.",
            },
            {
              author: "Maria S., Restaurant Owner",
              rating: 5,
              text: "Printed our double-sided takeout menus on the matte stock. Beautifully clean, simple to read, and very thick. Excellent value!",
            },
          ],
          ctaHeading: "Design flyers online",
        },
      },
      {
        id: "brochures",
        name: "Folded Brochures",
        description:
          "Expert-grade tri-fold or half-fold brochures to showcase your services, menus, and corporate details.",
        image: "/images/products/main-page/custom_brochures-toronto-printing-ca.webp",
        price: "Starting at CAD 29.99 for 50",
        badge: "Corporate Choice",
        config: {
          title: "Folded Brochures",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "High-quality full color folded brochures manufactured using expert-grade paper stock.",
          breadcrumb: "Marketing",
          breadcrumbHref: "/marketing-materials",
          promoText: "25% OFF FOLDED CORPORATE BROCHURES",
          image: "/images/products/main-page/custom_brochures-toronto-printing-ca.webp",
          ratingCount: "320",
          ratingScore: "4.8",
          sizes: [
            {
              label: '8.5" x 11" Standard Brochure',
              value: "8.5x11",
              basePrice: 29.99,
            },
          ],
          selects: [
            {
              label: "Paper Quality",
              options: [
                {
                  label: "100lb Glossy Text",
                  value: "100lb_gloss",
                  priceAdder: 0,
                },
                {
                  label: "100lb Matte Text",
                  value: "100lb_matte",
                  priceAdder: 0,
                },
                {
                  label: "80lb Recycled Text",
                  value: "80lb_recycled",
                  priceAdder: 3.0,
                },
              ],
            },
            {
              label: "Fold Style",
              options: [
                { label: "Tri-Fold", value: "tri_fold", priceAdder: 8.0 },
                { label: "Half-Fold", value: "half_fold", priceAdder: 5.0 },
              ],
            },
          ],
          qtyDiscount: "Save more when printing in packs of 100+",
          keyFeatures: [
            "High definition color reproduction",
            "Pre-folded and ready to display",
            "Tri-fold & half-fold options",
          ],
          useCases: [
            "Corporate guides & service lists",
            "Restaurant take-out menus",
            "Marketing handouts",
            "Product display pamphlets",
          ],
          specs: [
            { key: "Material", value: "100lb Text Paper" },
            { key: "Printing", value: "Offset lithography" },
          ],
          description:
            `<div class="space-y-4">
              <h3 class="text-lg font-bold text-slate-900">Folded Brochures in Ontario</h3>
              <p class="text-sm text-gray-700 leading-relaxed">
                Present your products, services, or menu items in an elegant, structured format with folded brochures from Nano Signs. Serving businesses in Toronto, Mississauga, and neighbouring Ontario cities, we provide high-definition brochure printing with clean scoring and machine-folding. Our standard 8.5" x 11" brochures are available in standard Tri-Fold or Half-Fold configurations, ensuring your layouts line up perfectly.
              </p>
              <p class="text-sm text-gray-700 leading-relaxed">
                Customize your print run with high-quality 100lb glossy text paper (vivid and striking), 100lb matte text paper (sophisticated, smudge-resistant), or 80lb recycled text paper for green-focused branding. Organize complex corporate information, portfolios, or restaurant menu items into readable panels that encourage prospective customers to learn more.
              </p>
            </div>`,
          faqs: [
            {
              q: "What fold styles do you offer for brochures?",
              a: "We offer pre-folded brochures in two styles: Tri-Fold (divided into 3 panels per side) and Half-Fold (folded down the middle into 4 pages).",
            },
            {
              q: "What paper qualities are available for brochures?",
              a: "You can select 100lb Glossy Text (ideal for vivid brochures), 100lb Matte Text (classy, readable), or 80lb Recycled Text for eco-friendly branding.",
            },
            {
              q: "What are the dimensions of the brochures?",
              a: "Our standard brochures start with flat sheets of 8.5\" x 11\" and are pre-folded to compact sizes (approx. 3.7\" x 8.5\" for tri-folds).",
            },
            {
              q: "Do the brochures arrive pre-folded?",
              a: "Yes, absolutely! We score and fold your brochures in-house, so they arrive fully assembled and ready to hand out.",
            },
            {
              q: "Can I design a brochure with layouts?",
              a: "Yes! Our online customizer lets you place images, logos, and descriptions in dedicated text panels matching the folding guidelines.",
            },
          ],
          reviews: [
            {
              author: "Clarissa W., Medical Clinic Manager",
              rating: 5,
              text: "The matte 100lb tri-fold brochures looked highly expert-grade. Text is very sharp and the folds are perfectly aligned. Excellent Ontario printer.",
            },
            {
              author: "Daniel H., HVAC Owner",
              rating: 5,
              text: "Tri-fold brochures were ideal for listing our residential seasonal maintenance packages. Very sturdy paper weight.",
            },
          ],
          ctaHeading: "Design brochures online",
        },
      },
      {
        id: "door-hangers",
        name: "Door Hangers",
        description: "Targeted local marketing hangers that slip easily onto front door handles. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/door_hangers-toronto-printing-ca.webp",
        price: "Starting at CAD 39.99 for 100",
        config: {
          title: "Door Hangers",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Vivid door hangers pre-cut with handle holes, ideal for local corporate marketing.",
          breadcrumb: "Marketing",
          breadcrumbHref: "/marketing-materials",
          promoText: "25% OFF CORPORATE DOOR HANGERS",
          image: "/images/products/main-page/door_hangers-toronto-printing-ca.webp",
          ratingCount: "310",
          ratingScore: "4.8",
          sizes: [
            {
              label: '3.5" x 8.5" Compact Hanger',
              value: "3.5x8.5",
              basePrice: 39.99,
            },
            {
              label: '4.25" x 11" Standard Large Hanger',
              value: "4.25x11",
              basePrice: 54.99,
            },
          ],
          selects: [
            {
              label: "Card Material",
              options: [
                {
                  label: "14pt Gloss Cardstock",
                  value: "14pt_gloss",
                  priceAdder: 0,
                },
                {
                  label: "14pt Matte Cardstock",
                  value: "14pt_matte",
                  priceAdder: 0,
                },
              ],
            },
            {
              label: "Handle Cutout Style",
              options: [
                {
                  label: 'Standard 1.25" Circle Hole with Slit',
                  value: "circle_slit",
                  priceAdder: 0,
                },
                {
                  label: "Curved Arch Hook Cut",
                  value: "arch_hook",
                  priceAdder: 4.0,
                },
              ],
            },
          ],
          qtyDiscount: "Bulk local campaigns save up to 70%",
          keyFeatures: [
            "Pre-cut hole and slit fits all door handles",
            "Resilient 14pt thick cover stock",
            "Double-sided full color printing",
          ],
          useCases: [
            "Home services (lawn, roofing, cleaning)",
            "Political campaigning",
            "Local restaurant menu marketing",
            "Do Not Disturb door signs",
          ],
          specs: [
            { key: "Material", value: "14pt cardstock" },
            { key: "Hole Diameter", value: "1.25 inches standard" },
          ],
          description:
            `<div class="space-y-4">
              <h3 class="text-lg font-bold text-slate-900">Door Hanger Printing in Toronto & Mississauga</h3>
              <p class="text-sm text-gray-700 leading-relaxed">
                Connect directly with local neighbourhoods using door hangers from Nano Signs. Highly popular for landscaping, pressure washing, pest control, roofing, plumbing, and local restaurant delivery campaigns, door hangers provide a guaranteed physical touchpoint on the front doors of Toronto, Mississauga, and GTA homes. Manufactured using heavy 14pt cardstock, these hangers hold up against Ontario's exterior weather without curling.
              </p>
              <p class="text-sm text-gray-700 leading-relaxed">
                Our door hangers are pre-cut with a circular hole and a slit (or curved arch hook) at the top, sliding effortlessly onto any standard handle. Design your door hangers with double-sided printing: use the front for bold, high-gloss promos and contact details, and the back for detailed service pricing or client reviews.
              </p>
            </div>`,
          faqs: [
            {
              q: "What sizes do you offer for door hangers?",
              a: "We provide two standard sizes: 3.5\" x 8.5\" (compact) and 4.25\" x 11\" (large and highly visible).",
            },
            {
              q: "Do the door hangers come with pre-cut holes?",
              a: "Yes! All door hangers are pre-cut with a circular hole and a slit at the top, allowing them to hang easily on any standard door knob.",
            },
            {
              q: "What cardstock weight do you use for door hangers?",
              a: "We print on thick, resilient 14pt cardstock. This ensures they resist bending and withstand exterior humidity while hanging on front doors.",
            },
            {
              q: "Are door hangers weather-resistant?",
              a: "Our 14pt Gloss Cardstock has a light protective sheen that helps resist light Ontario moisture, but they are engineered for temporary exterior hangings.",
            },
            {
              q: "What businesses benefit most from door hangers?",
              a: "Local home services (landscaping, pressure washing, pest control, roofing, plumbing) and restaurants benefit massively from direct neighborhood canvassing.",
            },
          ],
          reviews: [
            {
              author: "Dwayne K., Lawn Care Owner",
              rating: 5,
              text: "Our response rate was excellent! We distributed 500 hangers in Mississauga and gained 12 new monthly accounts. Very clean cut, thick cardstock.",
            },
            {
              author: "Linda J., Pizzeria Manager",
              rating: 5,
              text: "Used these to distribute our menu coupon codes locally. The glossy printing is bright and the hole fits perfectly over door handles.",
            },
          ],
          ctaHeading: "Kick off local door hanger campaigns",
        },
      },



    ],
  },
  "promotional-products": {
    title: "Promotional Swag & Merch",
    breadcrumbLabel: "Promotional Products",
    heroSubtitle: "Brand It. Share It. Grow It.",
    description:
      "Customize apparel, mugs, and trade show giveaways with your business branding.",
    heroImage: "/images/products/main-page/promotional_products_hero_image-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/promotional_products_hero_image-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/promotional_products_hero_image-toronto-printing-ca.webp",
    reviewRating: "4.9",
    reviewCount: "1,480",
    reviewQuote:
      "We ordered 500 logo pens and a couple dozen ceramic mugs for our annual summit giveaway bags. The logo resolution is incredibly sharp and the mugs look amazing.",
    categoryDescriptionText:
      "Promote your business and look expert-grade with customized promo swag. From screen-printed cotton t-shirts and ceramic coffee mugs to canvas tote bags, retractable logo pens, executive journals, keychains, and fridge magnets, we have everything you need to leave a lasting impression. All items are constructed with high-grade, resilient materials designed to proudly showcase your brand.",
    categorySecondaryImage: "/images/products/main-page/promotional_products_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "Is there a minimum order quantity (MOQ) for promotional products?",
        a: "Many of our promotional products, including t-shirts, mugs, and journals, have no minimum order quantity—you can order just a single item! For items like pens or fridge magnets, we sell them in convenient pack sizes (e.g., packs of 50 or 100) to ensure you get the absolute best bulk rates.",
      },
      {
        q: "What print file formats do you recommend for logos?",
        a: "For the absolute sharpest print results, we recommend uploading vector files such as PDF, EPS, or AI. High-resolution PNG and JPG files are also supported. Our design check process automatically verifies that your files have sufficient resolution before printing begins.",
      },
      {
        q: "Are ceramic mugs and tumblers dishwasher safe?",
        a: "Yes! Our ceramic mugs are printed using industrial dye-sublimation wraps that are fully microwave and dishwasher safe, meaning your design won't fade or peel over time.",
      },
    ],
    products: [
      {
        id: "t-shirts",
        name: "T-Shirts",
        description: "Screen printed cotton shirts featuring your company logo or message. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/custom_t_shirts-toronto-printing-ca.webp",
        price: "Starting at CAD 14.99",
        badge: "Staff Wear",
        config: {
          title: "Printed T-Shirts",
          minQuantity: 12,
          subtitle:
            "Comfortable cotton tees customized with full-color heat-press or screen prints.",
          breadcrumb: "Promotional",
          breadcrumbHref: "/promotional-products",
          promoText: "25% OFF PROMOTIONAL MERCHANDISE",
          image: "/images/products/main-page/custom_t_shirts-toronto-printing-ca.webp",
          ratingCount: "740",
          ratingScore: "4.8",
          sizes: [
            {
              label: "Medium Unisex Tee",
              value: "medium_tee",
              basePrice: 14.99,
            },
            { label: "Large Unisex Tee", value: "large_tee", basePrice: 14.99 },
            {
              label: "Extra Large Unisex Tee",
              value: "xl_tee",
              basePrice: 16.99,
            },
          ],
          selects: [
            {
              label: "Shirt Fabric Style",
              options: [
                {
                  label: "100% Premium Cotton",
                  value: "cotton",
                  priceAdder: 0,
                  description: "Soft, breathable, preshrunk ringspun cotton.",
                },
              ],
            },
          ],
          qtyDiscount: "Volume discounts for outfitting your entire team",
          keyFeatures: [
            "Comfortable cotton knit fabric",
            "High durability dye-sub print",
            "Available in white and dark slate",
            "Wash-proof print bond",
          ],
          useCases: [
            "Staff uniforms",
            "Brand promotional giveaways",
            "Family reunions",
            "Corporate retreats",
          ],
          specs: [
            { key: "Material", value: "4.5oz Ringspun Cotton" },
            {
              key: "Wash Care",
              value: "Machine wash cold inside-out, tumble dry low",
            },
          ],
          faqs: [
            {
              q: "Will the graphic peel in the wash?",
              a: "No, our prints utilize high-temp industrial heat fusion that bonds print ink fibers directly to fabrics.",
            },
          ],
          reviews: [
            {
              author: "Nate W.",
              rating: 5,
              text: "Sizing is spot on and the print did not crack after multiple wash cycles.",
            },
          ],
          ctaHeading: "Design shirts for your team",
        },
      },
      {
        id: "mugs",
        name: "Coffee Mugs & Tumblers",
        description: "Vivid ceramic coffee mugs and travel tumblers with your company logo. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/coffee_mugs-toronto-printing-ca.webp",
        price: "Starting at CAD 4.99 each",
        badge: "Office Best-Seller",
        config: {
          title: "Coffee Mugs",
          minQuantity: 12,
          subtitle:
            "Full-color sublimation print ceramic mugs, ideal for corporate swag and office desks.",
          breadcrumb: "Promotional",
          breadcrumbHref: "/promotional-products",
          promoText: "25% OFF PERSONALIZED LOGO DRINKWARE",
          image: "/images/products/main-page/coffee_mugs-toronto-printing-ca.webp",
          ratingCount: "840",
          ratingScore: "4.9",
          sizes: [
            {
              label: "11oz Classic Ceramic Mug",
              value: "11oz",
              basePrice: 4.99,
            },
            {
              label: "15oz Deluxe Ceramic Mug",
              value: "15oz",
              basePrice: 6.99,
            },
          ],
          selects: [
            {
              label: "Ceramic Color",
              options: [
                { label: "Bright White", value: "white", priceAdder: 0 },
                { label: "Midnight Black", value: "black", priceAdder: 1.5 },
              ],
            },
          ],
          qtyDiscount: "Save up to 55% in bulk orders",
          keyFeatures: [
            "Microwave and dishwasher safe",
            "Sublimated print wraps edge-to-edge",
            "Lead-free high-grade ceramic",
          ],
          useCases: [
            "Corporate gifts",
            "Office mugs",
            "Exhibition giveaways",
            "Client appreciation packages",
          ],
          specs: [
            { key: "Material", value: "High-quality Ceramic" },
            { key: "Printing", value: "Dye-Sublimation Wrap" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Brand your office drinkware",
        },
      },
      {
        id: "tote-bags",
        name: "Canvas Tote Bags",
        description: "Resilient cotton canvas tote bags printed with your logo. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/canvas_tote_bags-toronto-printing-ca.webp",
        price: "Starting at CAD 5.99 each",
        config: {
          title: "Canvas Tote Bags",
          minQuantity: 12,
          subtitle:
            "Eco-friendly, reusable cotton canvas totes printed with vivid logo colors.",
          breadcrumb: "Promotional",
          breadcrumbHref: "/promotional-products",
          promoText: "25% OFF ECO-FRIENDLY PROM BAGS",
          image: "/images/products/main-page/canvas_tote_bags-toronto-printing-ca.webp",
          ratingCount: "490",
          ratingScore: "4.8",
          sizes: [
            {
              label: 'Standard 15" x 16" Tote',
              value: "15x16",
              basePrice: 5.99,
            },
          ],
          selects: [
            {
              label: "Cotton Weight",
              options: [
                {
                  label: "6oz Lightweight Cotton",
                  value: "6oz",
                  priceAdder: 0,
                },
                {
                  label: "12oz Heavyweight Canvas",
                  value: "12oz",
                  priceAdder: 2.5,
                },
              ],
            },
          ],
          qtyDiscount: "Save on bulk event tote packs",
          keyFeatures: [
            "Reinforced shoulder handles",
            "Eco-friendly reusable design",
            "Full color heat transfer printing",
          ],
          useCases: [
            "Grocery shoppers",
            "Event giveaway bags",
            "Staff welcome packages",
            "Library book bags",
          ],
          specs: [
            { key: "Material", value: "100% Cotton Canvas" },
            { key: "Handles", value: "21-inch fabric handles" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Design reusable event bags",
        },
      },
      {
        id: "pens",
        name: "Logo Pens",
        description: "Retractable ballpoint writing guidelines, ideal for trade shows and lobbies. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/custom_pens-toronto-printing-ca.webp",
        price: "Starting at CAD 0.89 each",
        badge: "Trade Show Choice",
        config: {
          title: "Logo Pens",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Sleek retractable clicker pens printed with your business website or phone number.",
          breadcrumb: "Promotional",
          breadcrumbHref: "/promotional-products",
          promoText: "25% OFF BULK LOGO WRITING PENS",
          image: "/images/products/main-page/custom_pens-toronto-printing-ca.webp",
          ratingCount: "1250",
          ratingScore: "4.8",
          sizes: [
            {
              label: "Standard Fine Point Pen",
              value: "fine_pen",
              basePrice: 0.89,
            },
          ],
          selects: [
            {
              label: "Ink Color",
              options: [
                {
                  label: "Classic Black Ink",
                  value: "black_ink",
                  priceAdder: 0,
                },
                { label: "Deep Blue Ink", value: "blue_ink", priceAdder: 0 },
              ],
            },
            {
              label: "Pen Barrel Color",
              options: [
                {
                  label: "White/Yellow Trim",
                  value: "yellow_trim",
                  priceAdder: 0,
                },
                {
                  label: "White/Black Trim",
                  value: "black_trim",
                  priceAdder: 0,
                },
                {
                  label: "Solid Silver Barrel",
                  value: "silver_barrel",
                  priceAdder: 0.25,
                },
              ],
            },
          ],
          qtyDiscount: "Super bulk prices drop to CAD 0.29 each",
          keyFeatures: [
            "Smooth ink flow prevents smudges",
            "Soft rubber grip for comfort",
            "Resilient pocket clip attachment",
          ],
          useCases: [
            "Lobby counter registers",
            "Trade show swag baskets",
            "Office stationery chests",
            "Direct mail package fillers",
          ],
          specs: [
            { key: "Ink Style", value: "Ballpoint medium ink" },
            { key: "Body", value: "ABS plastic housing" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Order bulk giveaway pens",
        },
      },
      {
        id: "notebooks",
        name: "Journals & Notebooks",
        description: "Pre-ruled journals and notebooks, ideal for client meetings and logs. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/custom_notebooks-toronto-printing-ca.webp",
        price: "Starting at CAD 3.99 each",
        config: {
          title: "Notebooks & Journals",
          minQuantity: 10,
          subtitle:
            "Lined paper journals with high-quality covers to organize meetings and ideas.",
          breadcrumb: "Promotional",
          breadcrumbHref: "/promotional-products",
          promoText: "25% OFF PERSONALIZED EXECUTIVE NOTEBOOKS",
          image: "/images/products/main-page/custom_notebooks-toronto-printing-ca.webp",
          ratingCount: "380",
          ratingScore: "4.8",
          sizes: [
            {
              label: '5.5" x 8.5" Classic Journal',
              value: "5.5x8.5",
              basePrice: 3.99,
            },
          ],
          selects: [
            {
              label: "Cover Style",
              options: [
                { label: "Flexible Softcover", value: "soft", priceAdder: 0 },
                {
                  label: "Rigid Leatherette Hardcover",
                  value: "hard",
                  priceAdder: 3.0,
                },
              ],
            },
          ],
          qtyDiscount: "Save on office packs starting at 10+ journals",
          keyFeatures: [
            "80 ruled pages (acid-free paper)",
            "Elastic band closure strip",
            "Color-matching ribbon bookmark",
          ],
          useCases: [
            "Client meeting diaries",
            "Employee onboarding logs",
            "Gift-away packages",
            "Educational seminars",
          ],
          specs: [
            { key: "Page Count", value: "80 lined sheets (160 pages)" },
            { key: "Binding", value: "Stitched lay-flat binding" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Create corporate journals",
        },
      },
      {
        id: "keychains",
        name: "Logo Keychains",
        description: "Acrylic and metallic keyring tags customized with your company logo. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/custom_keychains-toronto-printing-ca.webp",
        price: "Starting at CAD 1.29 each",
        config: {
          title: "Logo Keychains",
          minQuantity: 25,
          subtitle:
            "Sturdy key rings featuring printed acrylic shapes or laser engraved metal.",
          breadcrumb: "Promotional",
          breadcrumbHref: "/promotional-products",
          promoText: "25% OFF PERSONALIZED ENGRAVED KEYCHAINS",
          image: "/images/products/main-page/custom_keychains-toronto-printing-ca.webp",
          ratingCount: "290",
          ratingScore: "4.7",
          sizes: [
            {
              label: '2" x 2" Acrylic Keychain',
              value: "2x2_acrylic",
              basePrice: 1.29,
            },
          ],
          selects: [
            {
              label: "Keychain Material",
              options: [
                { label: "Clear Acrylic", value: "acrylic", priceAdder: 0 },
                {
                  label: "Laser-Engraved Stainless Steel",
                  value: "steel",
                  priceAdder: 2.0,
                },
              ],
            },
          ],
          qtyDiscount: "Save on corporate key ring packs",
          keyFeatures: [
            "Stainless steel split ring holds keys safely",
            "Double sided full color print under acrylic",
            "Scratch-resistant shield coatings",
          ],
          useCases: [
            "Car dealership client handovers",
            "Real estate open house promotions",
            "Gym member tags",
            "Corporate swag keyrings",
          ],
          specs: [
            { key: "Ring", value: "1-inch split key ring" },
            { key: "Materials", value: "Acrylic or Stainless steel" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Design key ring promos",
        },
      },
      {
        id: "fridge-magnets",
        name: "Fridge Magnets",
        description: "Flexible promo magnets, ideal for household fridges and direct mail. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/custom_fridge_magnets-toronto-printing-ca.webp",
        price: "Starting at CAD 0.49 each",
        badge: "Household Favorite",
        config: {
          title: "Fridge Magnets",
          quantityOptions: [100, 250, 500, 1000, 2500, 5000, 10000],
          subtitle:
            "Lightweight flexible promo magnets, ideal for direct mail and fridge doors.",
          breadcrumb: "Promotional",
          breadcrumbHref: "/promotional-products",
          promoText: "25% OFF PERSONALIZED HOUSEHOLD MAGNETS",
          image: "/images/products/main-page/custom_fridge_magnets-toronto-printing-ca.webp",
          ratingCount: "710",
          ratingScore: "4.9",
          sizes: [
            { label: '2" x 2" Square Magnet', value: "2x2", basePrice: 0.49 },
            {
              label: '3.5" x 2" Business Card Magnet',
              value: "3.5x2",
              basePrice: 0.79,
            },
          ],
          selects: [
            {
              label: "Lamination Finish",
              options: [
                { label: "Gloss UV Coat", value: "gloss_lam", priceAdder: 0 },
                { label: "Matte Finish", value: "matte_lam", priceAdder: 0 },
              ],
            },
          ],
          qtyDiscount: "Volume packs drop price under CAD 0.15 each",
          keyFeatures: [
            "Flexible 20mil magnetic backings",
            "Sticks tight to fridges & whiteboards",
            "Full-bleed color printing",
          ],
          useCases: [
            "Plumbers & repair hotlines",
            "Pizza takeout phone lists",
            "Save the Date reminders",
            "Calendar fridge cards",
          ],
          specs: [
            { key: "Material", value: "20mil flexible magnet" },
            { key: "Sizing", value: "2x2 inches or 3.5x2 inches" },
          ],
          faqs: [],
          reviews: [],
          ctaHeading: "Print fridge promo magnets",
        },
      },
    ],
  },
  "custom-signs": {
    title: "Signs",
    breadcrumbLabel: "Signs",
    heroSubtitle: "Built to Command attention. Built to Last.",
    description:
      "From yard signs to high-quality acrylic, we print stunning signs fast. Choose your product, upload your design, and we ship next day.",
    heroImage: "/images/products/main-page/nano_hero_signs_section-toronto-printing-ca.webp",
    tabletHeroImage: "/images/products/main-page/nano_hero_signs_section-toronto-printing-ca.webp",
    mobileHeroImage: "/images/products/main-page/nano_hero_signs_section-toronto-printing-ca.webp",
    reviewRating: "4.9",
    reviewCount: "8,420",
    reviewQuote:
      "Ordered 200 yard signs for a local election campaign. They arrived the next day and looked exactly like the proof!",
    categoryDescriptionText:
      "Discover our complete lineup of sign solutions. From lightweight corrugated plastic yard signs that withstand any weather to high-quality acrylic and aluminum signs built for permanent installations. Whether you need a single sign for your business or thousands for a nationwide campaign, we deliver vivid, full-color prints with next-day shipping.",
    categorySecondaryImage:
      "/images/products/main-page/custom_signs_desc-toronto-printing-ca.webp",
    faqs: [
      {
        q: "What sign materials do you offer?",
        a: "We offer a variety of materials including corrugated plastic (Coroplast), aluminum, foam board, acrylic, and PVC. Each material has unique benefits suited for different interior and exterior applications.",
      },
      {
        q: "How long will signs last outdoors?",
        a: "Corrugated plastic signs typically last 6–12 months outdoors. Aluminum signs can last 5+ years. All signs feature UV-resistant inks that resist fading in direct sunlight.",
      },
      {
        q: "Do you offer sign stakes and mounting hardware?",
        a: "Yes! We offer H-frame wire stakes, step stakes, grommets, and various mounting accessories. You can add these during the product configuration process.",
      },
      {
        q: "Can I order just one sign?",
        a: "Absolutely! We have no minimum order quantity. Whether you need 1 sign or 10,000, we print and ship with the same speed and quality.",
      },
      {
        q: "What file formats do you accept for sign artwork?",
        a: 'We accept PDF, AI, EPS, PNG, JPG, and TIFF files. For best results, upload vector files at 300 DPI with 0.125" bleed on all sides.',
      },
    ],
    products: [
      {
        "id": "programmable-led-sign",
        "name": "Programmable LED Sign",
        "description": "Custom Programmable LED display. High-resolution screens perfect for retail, restaurants, churches, and outdoor advertising. Outperforms static signs with dynamic video.",
        "image": "/images/products/led_sign_welcome.webp",
        "price": "Starting at $90/sqft",
        "badge": "New",
        "config": {
          "id": "programmable-led-sign",
          "title": "Programmable LED Sign",
          "subtitle": "High-visibility programmable LED signs for storefronts. Available in multiple pixel pitches (P3, P5, P10) for indoor or outdoor use.",
          "breadcrumb": "Programmable LED Signs",
          "breadcrumbHref": "/led-display-signs",
          "promoText": "CUSTOM LED SIGNS - PREMIUM QUALITY",
          "image": "/images/products/led_sign_welcome.webp",
          "ratingCount": "42",
          "ratingScore": "4.8",
          "sizes": [
            {
              "label": "Custom LED Dimension",
                  "value": "custom",
                  "basePrice": 0
            }
          ],
          "selects": [
            {
              "label": "Width",
              "options": [
                {
                  "label": "28.35\" (72 cm)",
                  "value": "w_72cm",
                  "priceMultiplier": 2.3625000000000003,
                  "priceAdder": 0
                },
                {
                  "label": "40.94\" (104 cm)",
                  "value": "w_104cm",
                  "priceMultiplier": 3.4116666666666666,
                  "priceAdder": 0
                },
                {
                  "label": "53.54\" (136 cm)",
                  "value": "w_136cm",
                  "priceMultiplier": 4.461666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "66.14\" (168 cm)",
                  "value": "w_168cm",
                  "priceMultiplier": 5.511666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "78.74\" (200 cm)",
                  "value": "w_200cm",
                  "priceMultiplier": 6.5616666666666665,
                  "priceAdder": 0
                },
                {
                  "label": "91.34\" (232 cm)",
                  "value": "w_232cm",
                  "priceMultiplier": 7.611666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "103.94\" (264 cm)",
                  "value": "w_264cm",
                  "priceMultiplier": 8.661666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "116.54\" (296 cm)",
                  "value": "w_296cm",
                  "priceMultiplier": 9.711666666666668,
                  "priceAdder": 0
                }
              ]
            },
            {
              "label": "Height",
              "options": [
                {
                  "label": "15.75\" (40 cm)",
                  "value": "h_40cm",
                  "priceMultiplier": 1.3125,
                  "priceAdder": 0
                },
                {
                  "label": "22.05\" (56 cm)",
                  "value": "h_56cm",
                  "priceMultiplier": 1.8375000000000001,
                  "priceAdder": 0
                },
                {
                  "label": "28.35\" (72 cm)",
                  "value": "h_72cm",
                  "priceMultiplier": 2.3625000000000003,
                  "priceAdder": 0
                },
                {
                  "label": "34.65\" (88 cm)",
                  "value": "h_88cm",
                  "priceMultiplier": 2.8874999999999997,
                  "priceAdder": 0
                },
                {
                  "label": "40.94\" (104 cm)",
                  "value": "h_104cm",
                  "priceMultiplier": 3.4116666666666666,
                  "priceAdder": 0
                },
                {
                  "label": "47.24\" (120 cm)",
                  "value": "h_120cm",
                  "priceMultiplier": 3.936666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "53.54\" (136 cm)",
                  "value": "h_136cm",
                  "priceMultiplier": 4.461666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "59.84\" (152 cm)",
                  "value": "h_152cm",
                  "priceMultiplier": 4.986666666666667,
                  "priceAdder": 0
                }
              ]
            },
            {
              "label": "Model",
              "options": [
                {
                  "label": "P10 (Low resolution for far view)",
                  "value": "p10",
                  "priceAdder": 90,
                  "priceMultiplier": 1
                },
                {
                  "label": "P5 (Medium resolution for medium view)",
                  "value": "p5",
                  "priceAdder": 145,
                  "priceMultiplier": 1
                },
                {
                  "label": "P3 (High resolution for close view)",
                  "value": "p3",
                  "priceAdder": 220,
                  "priceMultiplier": 1
                }
              ]
            },
            {
              "label": "Waterproof",
              "options": [
                {
                  "label": "No",
                  "value": "no",
                  "priceMultiplier": 1
                },
                {
                  "label": "Yes",
                  "value": "yes",
                  "priceAdder": 20,
                  "priceMultiplier": 1
                }
              ]
            }
          ],
          "faqs": [],
          "reviews": [],
          "ctaHeading": "Ready to program your message?",
          "ctaLabel": "Add to Cart"
        }
      },
      {
        id: "plastic-yard-sign",
        name: "Plastic yard sign",
        description: "Durable corrugated plastic yard signs perfect for bulk campaigns. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/plastic yard signs.webp",
        price: "100 pcs for $330",
        badge: "Bulk Deal",
        config: {
          title: "Plastic yard sign",
          subtitle: "Bulk printed corrugated plastic lawn signs.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText: "Bulk Deal - 100 pcs for $330",
          image: "/plastic yard signs.webp",
          images: [
            "/bag yard signs.webp",
            "/plastic yard signs.webp",
            "/Bag signs.webp"
          ],
          ratingScore: "4.9",
          ratingCount: "1,240",
          quantityOptions: [100, 200, 500, 1000],
          quantityPrices: {
            100: 330.00,
            200: 620.00,
            500: 1400.00,
            1000: 2800.00
          },
          sizes: [
            { label: '18" x 24" Standard', value: "18x24", basePrice: 3.30 }
          ],
          selects: [
            {
              label: "Sides",
              options: [

                { label: "Double-Sided", value: "double", priceAdder: 0 },
                { label: "Single-Sided", value: "single", priceAdder: 0 }
              ]
            }
          ],
          faqs: [],
          reviews: [],
          keyFeatures: [
            "Heavy-duty 4mm corrugated plastic",
            "Waterproof and weather-resistant",
            "Vibrant UV-cured inks",
          ],
          useCases: [
            "Real Estate Signs",
            "Political Campaigns",
            "Event Direction",
          ],
          specs: [
            { key: "Material", value: "4mm Coroplast" },
            { key: "Printing", value: "Full Color UV" },
          ],
          ctaHeading: "Order Bulk Plastic Yard Signs"
        }
      },
      {
        id: "yard-signs",
        name: "Yard Signs",
        description:
          "Hanging corrugated plastic signs suspended from high-quality L-shaped stands, ideal for real estate, campaigns, and storefronts.",
        image: "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 5.59",
        badge: "Best Seller",
        config: {
          title: "Yard Signs",
          subtitle: "Hanging lawn and commercial signs suspended from wood or metal L-stands.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText: "🏡 25% OFF Yard Signs — Most Popular Sign in America!",
          image: "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/yard_sign-toronto-printing-ca.webp",
            "/images/products/gallery/yard_sign_in_action_1-toronto-printing-ca.webp",
            "/images/products/gallery/yard_sign_in_action_2-toronto-printing-ca.webp",
          ],
          ratingScore: "4.9",
          ratingCount: "8,420",
          sizes: [
            { label: '24" x 32"', value: "24x32", basePrice: 45 },
            { label: '24" x 36"', value: "24x36", basePrice: 65 },
            { label: '32" x 48"', value: "32x48", basePrice: 70 },
            { label: '36" x 48"', value: "36x48", basePrice: 80 }
          ],
          selects: [
            {
              label: "Material",
              options: [
                { label: "4mm Coroplast", value: "4mm", priceAdder: 0 },
                { label: "10mm Heavy Duty", value: "10mm", sizePriceAdders: { "24x32": 10, "24x36": 10, "32x48": 12, "36x48": 10 } },
                { label: "Aluminum (ACM)", value: "acm", sizePriceAdders: { "24x32": 14.99, "24x36": 30, "32x48": 35, "36x48": 40 } }
              ]
            },
            {
              label: "Frame/Stand Options",
              options: [
                { label: "Sign Panel Only", value: "none", priceAdder: 0 },
                { label: "Black L-Shaped Post Stand", value: "stand", priceAdder: 95 }
              ]
            },
            {
              label: "Coating",
              options: [
                { label: "No Coating", value: "none", priceAdder: 0 },
                { label: "UV Gloss Coating", value: "uv", sizePriceAdders: { "24x32": 5.33, "24x36": 6.01, "32x48": 10.65, "36x48": 12 } }
              ]
            }
          ],
          toggleGroups: [
            {
              label: "Printed Sides",
              options: [
                { id: "double", label: "ALL DOUBLE SIDED", priceAdder: 0 }
              ]
            },
            {
              label: "Grommets",
              options: [
                { id: "grommets", label: "3 Standard Grommets Included", priceAdder: 0 }
              ]
            }
          ],
          qtyDiscount: "Buy more, save more — up to 13% off!",
          keyFeatures: [
            "Weather-resistant corrugated plastic",
            "Full-color edge-to-edge printing",
            "Ships in as fast as 1 corporate day",
            "Optional L-shaped wood or metal stands available",
            "Recyclable & eco-friendly material",
            "Single or double-sided printing",
          ],
          useCases: [
            "Political Campaigns",
            "Real Estate",
            "Open Houses",
            "Elections",
            "Corporate Promotions",
            "Events",
          ],
          specs: [
            {
              key: "Standard Material",
              value: "4mm Corrugated Plastic (Coroplast)",
            },
            { key: "Heavy Duty Option", value: "6mm Coroplast" },
            { key: "Print Resolution", value: "720 x 1440 dpi Full Color" },
            { key: "Color Profile", value: "CMYK" },
            { key: "Bleed Required", value: '0.125" on all sides' },
            { key: "File Formats", value: "PDF, AI, EPS, PNG, TIFF" },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "How long will yard signs last outdoors?",
              a: "Standard 4mm coroplast yard signs typically last 6–12 months outdoors. The 6mm industrial-strength option can last 1–2+ years depending on conditions.",
            },
            {
              q: "Do your yard signs come with stands?",
              a: "Stands are optional. You can select either a White L-Shaped Wood Yard Arm Stand or a Black L-Shaped Metal Yard Arm Stand in the configurator. We can pre-drill top hanging holes to make hanging simple.",
            },
            {
              q: "Can I order just 1 yard sign?",
              a: "Yes! We have no minimum order quantity. Single signs ship just as fast as bulk orders.",
            },
            {
              q: "Are the signs weather-resistant?",
              a: "Yes. Corrugated plastic is inherently weather-resistant. Our inks are UV-resistant and won't run or fade in rain.",
            },
          ],
          reviews: [
            {
              author: "Mike D.",
              rating: 5,
              text: "Ordered 200 yard signs for a local election campaign. They arrived the next day and looked exactly like the proof!",
            },
            {
              author: "Sandra R.",
              rating: 5,
              text: "Used for our open house. Very expert-grade look, simple to hang on the L-stand. Will definitely order again.",
            },
            {
              author: "Tom B.",
              rating: 4,
              text: "Great quality for the price. Colors were vivid and matched perfectly.",
            },
          ],
          ctaHeading: "Get Your Signs Out There",
        },
      },
      {
        id: "real-estate-panels",
        name: "Real Estate Panels",
        description:
          "Expert-grade-grade aluminum and coroplast panels for property listings, open houses, and riders.",
        image: "/images/products/main-page/Real_estate_panels-toronto-printing-ca.webp",
        price: "Starting at $329.99",
        badge: "Most Popular",
        config: {
          minQuantity: 1,
          title: "Real Estate Panels",
          subtitle:
            "Expert-grade-grade panels for property listings and open houses.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText: "🏠 Real Estate Panels — Next Day Delivery Available!",
          image: "/images/products/main-page/Real_estate_panels-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/Real_estate_panels-toronto-printing-ca.webp",
            "/images/products/gallery/real_estate_panels_in_action_1-toronto-printing-ca.webp",
            "/images/products/gallery/real_estate_panels_in_action_2-toronto-printing-ca.webp",
          ],
          ratingScore: "4.9",
          ratingCount: "3,150",
          sizes: [
            { label: '20" x 24"', value: "20x24", basePrice: 110 }
          ],
          selects: [
            {
              label: "Material",
              options: [
                {
                  label: "4mm Coroplast (Standard)",
                  value: "4mm_coro",
                  priceAdder: 0,
                  description:
                    "Lightweight, weather-resistant. Best for short listings.",
                },
                {
                  label: ".040 Aluminum",
                  value: "aluminum_040",
                  priceAdder: 98.99,
                  description: "Rigid, resilient metal. Lasts years outdoors.",
                },
                {
                  label: "6mm Heavy-Duty Coroplast",
                  value: "6mm_coro",
                  priceAdder: 40,
                  description: "Thicker plastic for longer listing cycles.",
                },
              ],
            },
            {
              label: "Printing",
              options: [
                { label: "Single Sided", value: "single", priceAdder: 0 },
                { label: "Double Sided", value: "double", priceAdder: 3.5 },
              ],
            },
          ],
          toggleGroups: [
            {
              label: "Printed Sides",
              options: [
                { id: "double", label: "All Double Sided", priceAdder: 0 }
              ]
            }
          ],
          qtyDiscount: "Agent bulk pricing — buy 10+ and save",
          keyFeatures: [
            "Expert-grade real estate layouts",
            "Resilient exterior materials",
            "Rider slot compatible",
            "UV-resistant fade-proof printing",
            "Compatible with standard real estate frames",
            "Next-day turnaround available",
          ],
          useCases: ["For Sale", "Open House", "For Rent", "Sold"],
          specs: [
            { key: "Standard Material", value: "4mm Corrugated Plastic (Coroplast)" },
            { key: "Metal Option", value: ".040 Aluminum" },
            { key: "Print Resolution", value: "720 x 1440 dpi" },
            { key: "Color Profile", value: "CMYK" },
            { key: "Bleed Required", value: '0.125" all sides' },
            { key: "Frame Compatibility", value: 'Standard 30" wide RE frames' },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "Are your panels compatible with standard real estate frames?",
              a: 'Yes! Our 18"x24" and 24"x24" panels are designed to fit standard real estate wire frames and yard arm posts.',
            },
            {
              q: "Can I order rider panels to match my main panel?",
              a: "Absolutely. Select the rider size in the dropdown and we'll match the design style for a cohesive, expert-grade look.",
            },
            {
              q: "Can I include my brokerage logo and headshot?",
              a: "Yes. Upload any artwork file and we'll print it exactly as provided. Our free artwork check ensures everything looks perfect.",
            },
            {
              q: "What is the minimum order?",
              a: "We have no minimum! Order as few as 1 panel or as many as 1,000.",
            },
          ],
          reviews: [
            {
              author: "Jessica A.",
              rating: 5,
              text: "I've been ordering from here for 2 years. Best quality real estate panels I've found, and delivery is always on time.",
            },
            {
              author: "Carlos M.",
              rating: 5,
              text: "Ordered riders for my open house last minute — they arrived the next morning. Saved my weekend!",
            },
            {
              author: "Patricia W.",
              rating: 5,
              text: "The aluminum panels look incredibly expert-grade. My clients always comment on them.",
            },
          ],
          ctaHeading: "List More. Sell Faster.",
        },
      },
      {
        id: "aluminum-signs",
        name: "Aluminum Signs",
        description:
          "Resilient rust-proof aluminum signs for permanent interior and exterior branding, safety, and parking installations.",
        image: "/images/products/main-page/aluminum_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 12.59",
        badge: "Commercial-grade",
        config: {
          title: "Aluminum Signs",
          subtitle:
            "Industrial-strength, rust-proof aluminum signs built to last years in any weather.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText: "⚙️ Aluminum Signs — Rust-Proof, Fade-Proof, Weatherproof. Ships Next Day!",
          image: "/images/products/main-page/aluminum_sign-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/aluminum_sign-toronto-printing-ca.webp",
            "/images/products/alum_sign_hover-toronto-printing-ca.webp",
          ],
          ratingScore: "4.9",
          ratingCount: "2,840",
          sizes: [
            { label: '8" x 12"', value: "8x12", basePrice: 29.84, quantityPrices: { 1: 29.84 } },
            { label: '12" x 18"', value: "12x18", basePrice: 45.84, quantityPrices: { 1: 45.84 } },
            { label: '18" x 24"', value: "18x24", basePrice: 65.85, quantityPrices: { 1: 65.85 } },
            { label: '24" x 32"', value: "24x32", basePrice: 80.84, quantityPrices: { 1: 80.84 } }
          ],
          selects: [
            {
              label: "Aluminum Grade",
              options: [
                { label: ".040 Aluminum (Standard)", value: "040", priceAdder: 0 }
              ]
            }
          ],
          toggleGroups: [
            {
              label: "Corner Option",
              options: [
                { id: "square", label: "Square Corners", priceAdder: 0, priceMultiplier: 1.2 },
                { id: "round", label: "Round Corners", priceAdder: 0, priceMultiplier: 1.7 }
              ]
            }
          ],
          qtyDiscount: "Volume pricing — buy 10+ for up to 13% off",
          keyFeatures: [
            "Rust-proof, corrosion-resistant aluminum",
            "UV-resistant inks — won't fade for years",
            "Available in .040 and .080 gauge",
            "Reflective finish option for regulatory use",
            "Pre-drilled mounting holes available",
            "Square or rounded corner options",
          ],
          useCases: [
            "Corporate Signs",
            "Parking Signs",
            "Street Signs",
            "Safety Signs",
            "Property Signs",
            "Regulatory Signs",
            "Directional Signs",
          ],
          specs: [
            { key: "Standard Grade", value: '.040" Aluminum' },
            { key: "Heavy Duty Grade", value: '.080" Aluminum' },
            { key: "Print Method", value: "Direct UV Digital Print" },
            { key: "Color Profile", value: "CMYK" },
            { key: "Finish Options", value: "Matte, Gloss, Reflective" },
            { key: "Hole Diameter", value: '5/16" standard' },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "How long do aluminum signs last?",
              a: "Our aluminum signs are rated for 7–10+ years outdoors. The UV-resistant inks won't fade, and aluminum won't rust or corrode.",
            },
            {
              q: "Can I get reflective aluminum signs?",
              a: "Yes! Select the 'Reflective' finish option. Our reflective signs meet ASTM D4956 standards and are excellent for regulatory, safety, and parking applications.",
            },
            {
              q: "Are mounting holes included?",
              a: 'Mounting holes are optional. Choose corner holes (standard 5/16") or placement in the configurator — always free to add.',
            },
            {
              q: "Do you offer shapes?",
              a: "Standard shapes (square/rectangle with optional rounded corners) are available online. Contact us for completely cut shapes.",
            },
          ],
          reviews: [
            {
              author: "Frank L.",
              rating: 5,
              text: "We've had these parking signs up for 3 years and they still look brand new. Incredible durability.",
            },
            {
              author: "Donna S.",
              rating: 5,
              text: "Ordered 50 directional signs for our campus. Fast turnaround, perfect print quality.",
            },
            {
              author: "Brian T.",
              rating: 5,
              text: "The reflective signs are exactly what we needed for night visibility. Very expert-grade.",
            },
          ],
          ctaHeading: "Signs That Last a Decade",
        },
      },
      {
        id: "a-frame-signs",
        name: "A-Frame Signs",
        description:
          "Portable double-sided sandwich board sidewalk signs that grab foot traffic and drive customers through your door.",
        image: "/images/products/main-page/A-frame_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 125.99",
        badge: "Striking",
        config: {
          title: "A-Frame Signs (Sandwich Boards)",
          subtitle:
            "Portable, double-sided sidewalk signs that grab foot traffic and drive customers through your door.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText: "🪧 A-Frame Signs — Double-Sided, Portable, Ships Tomorrow!",
          image: "/images/products/main-page/A-frame_sign-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/A-frame_sign-toronto-printing-ca.webp",
            "/images/products/aframe_sign_hover-toronto-printing-ca.webp",
          ],
          ratingScore: "4.8",
          ratingCount: "1,640",
          sizes: [
            { label: '18" x 24"', value: "18x24", basePrice: 105 },
            { label: '36" x 24"', value: "36x24", basePrice: 130 },
          ],
          selects: [
            {
              label: "Insert Material",
              options: [
                { label: "Coroplast Regular", value: "coroplast", priceAdder: 0 },
                { label: "ACM (Aluminum)", value: "acm", priceAdder: 25 }
              ]
            },
            {
              label: "Frame Material",
              options: [
                { label: "Metal Regular", value: "metal", priceAdder: 0 },
                { label: "Plastic", value: "plastic", priceAdder: 30 }
              ]
            }
          ],
          toggleGroups: [
            {
              label: "Printed Sides",
              options: [
                { id: "double", label: "Double Sided Only", priceAdder: 0 }
              ]
            }
          ],
          qtyDiscount: "Buy 3+ A-frames and save up to 10%",
          keyFeatures: [
            "Double-sided by default",
            "Portable — set up in seconds",
            "Weather-resistant frame & inserts",
            "Interchangeable insert panels",
            "Multiple frame material options",
            "Compact for storage",
          ],
          useCases: [
            "Restaurants & Cafes",
            "Retail Stores",
            "Salons",
            "Sidewalk Promotions",
            "Event Venues",
            "Hotels",
            "Markets",
            "Pop-Up Shops",
          ],
          specs: [
            {
              key: "Standard Frame",
              value: "Plastic A-Frame with coroplast insert",
            },
            { key: "Insert Fits", value: '18"x24", 22"x28", or 24"x36"' },
            { key: "Print Method", value: "Full-Color Digital UV Print" },
            { key: "Fold Height", value: 'Approximately 48" tall when open' },
            { key: "Color Profile", value: "CMYK" },
            { key: "Bleed Required", value: '0.125" all sides' },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "Is printing included on both sides?",
              a: "Yes! A-frame signs are inherently double-sided. Both panels are printed by default.",
            },
            {
              q: "Can I swap out the inserts?",
              a: "Yes. The coroplast and PVC foam board inserts slide out easily so you can swap promotions or update messaging without buying a new frame.",
            },
            {
              q: "Are they stable in wind?",
              a: "Plastic A-frames can tip in strong wind. We recommend the connecting chain or sandbag weight add-on for windy locations.",
            },
            {
              q: "Can I store them inside at night?",
              a: "Absolutely. A-frames fold flat for easy interior storage. This also extends the life of the printed inserts.",
            },
          ],
          reviews: [
            {
              author: "Rachel H.",
              rating: 5,
              text: "Our restaurant's daily specials board. Customers stop to read it every single day. Best investment we've made!",
            },
            {
              author: "Aaron P.",
              rating: 5,
              text: "Ordered 5 for our chain of yoga studios. Fast delivery and great print quality on both sides.",
            },
            {
              author: "Maria C.",
              rating: 4,
              text: "Sturdy and looks expert-grade on the sidewalk. The chain accessory was a great add-on.",
            },
          ],
          ctaHeading: "Bring Customers Through the Door",
        },
      },
      {
        id: "foam-board-signs",
        name: "High Quality Foam Signs",
        description: "Lightweight, expert-grade interior display signs for presentations, trade shows, and lobbies. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/foam_board-toronto-printing-ca.webp",
        price: "Starting at CAD 22.19",
        badge: "Interior Favorite",
        config: {
          title: "High Quality Foam Signs",
          subtitle:
            "Lightweight and expert-grade interior display signs for presentations, trade shows, lobbies, and events.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText:
            "✨ High Quality Foam Signs — Ultra-Light, Ultra-Crisp. Ideal for Presentations & Trade Shows!",
          image: "/images/products/main-page/foam_board-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/foam_board-toronto-printing-ca.webp",
            "/images/products/foam_sign_hover-toronto-printing-ca.webp",
          ],
          ratingScore: "4.8",
          ratingCount: "1,280",
          sizes: [
            { label: '12" x 18"', value: "12x18", basePrice: 20.01 },
            { label: '18" x 24"', value: "18x24", basePrice: 38 },
            { label: '24" x 36"', value: "24x36", basePrice: 58 },
            { label: '36" x 48"', value: "36x48", basePrice: 72 },
          ],
          toggleGroups: [
            {
              label: "Printed Sides",
              options: [
                { id: "single", label: "Single Sided", priceAdder: 0 },
                { id: "double", label: "Double Sided", priceAdder: 0, priceMultiplier: 1.6 }
              ]
            },
            {
              label: "Mounting Backing",
              options: [
                { id: "none", label: "No Backing", priceAdder: 0 },
                {
                  id: "self_stick",
                  label: "Self-Adhesive Back",
                  priceAdder: 0, priceMultiplier: 1.3,
                  description: "Peel & stick to any flat surface.",
                },
                {
                  id: "easel",
                  label: "Easel Back",
                  priceAdder: 0, priceMultiplier: 1.8,
                  description: "Stands up on any flat surface.",
                },
              ],
            },
            {
              label: "Border / Frame",
              options: [
                { id: "no_border", label: "No Border", priceAdder: 0 },
                { id: "black_border", label: "Black Border", priceAdder: 0 },
                { id: "white_border", label: "White Border", priceAdder: 0 },
                {
                  id: "custom_frame",
                  label: "Custom Color Border",
                  priceAdder: 0, priceMultiplier: 1.22
                },
              ],
            },
          ],
          qtyDiscount: "Buy 5+ foam boards and save up to 10%",
          keyFeatures: [
            "Crisp, vivid full-color printing",
            "Ultra-lightweight for easy transport",
            "Smooth white surface for high-quality look",
            "Multiple thickness options",
            "Matte, Gloss or Satin finish",
            "Self-adhesive or easel-back options",
          ],
          useCases: [
            "Trade Show Displays",
            "Lobbies",
            "Presentations",
            "Real Estate Open Houses",
            "Photo Backdrops",
            "Wedding Signs",
            "School Projects",
            "Retail Displays",
          ],
          specs: [
            { key: "Core Material", value: "Polystyrene foam with paper face" },
            { key: "Standard Thickness", value: '3/16" (5mm)' },
            { key: "Print Method", value: "Direct UV Digital Inkjet" },
            { key: "Print Resolution", value: "1440 dpi" },
            { key: "Color Profile", value: "CMYK" },
            { key: "Bleed Required", value: '0.125" all sides' },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "Are foam board signs suitable for exterior use?",
              a: "Foam board is engineered for interior use. It can be used outdoors briefly, but prolonged sun and moisture exposure will damage the board. For exterior use, consider our coroplast or aluminum signs.",
            },
            {
              q: "Can foam board signs stand on their own?",
              a: "Yes, with the easel-back option selected. The easel attaches to the back and allows the sign to stand freestanding on any flat surface.",
            },
            {
              q: "How do I hang a foam board sign?",
              a: "Use push pins, foam tape, or command strips. With the self-adhesive backing option, simply peel and stick directly to any wall or surface.",
            },
            {
              q: 'Can I get large format foam boards over 36"?',
              a: "Yes, contact us for larger sizes. We can print foam boards up to 4' x 8' with seams jointed for larger displays.",
            },
          ],
          reviews: [
            {
              author: "Linda K.",
              rating: 5,
              text: "Ideal for our trade show booth. They were lightweight and the print quality was stunning!",
            },
            {
              author: "Jason R.",
              rating: 5,
              text: "Used these for an open house. Very expert-grade looking and simple to carry around the property.",
            },
            {
              author: "Amanda T.",
              rating: 4,
              text: "Excellent for interior use. Colors were accurate to my file. The easel back is a nice touch.",
            },
          ],
          ctaHeading: "Make Your Presentation Pop",
        },
      },
      {
        id: "acrylic-signs",
        name: "Acrylic Signs",
        description: "High-quality clear or colored acrylic for a polished, modern look. Get high-quality, durable printing solutions tailored to your exact specifications and delivered quickly.",
        image: "/images/products/main-page/acrylic_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 34.99",
        badge: "High-quality",
        config: {
          title: "Acrylic Signs",
          subtitle:
            "High-quality clear and colored acrylic signs for a sleek, modern, upscale look.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText:
            "💎 High-quality Acrylic Signs — Crystal-Clear Quality, Ships Next Day!",
          image: "/images/products/main-page/acrylic_sign-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/acrylic_sign-toronto-printing-ca.webp",
            "/images/products/acryl_sign_hover-toronto-printing-ca.webp",
          ],
          ratingScore: "4.9",
          ratingCount: "980",
          sizes: [
            { label: '5" x 7"', value: "5x7", basePrice: 34.99 },
            { label: '8" x 10"', value: "8x10", basePrice: 48.99 },
            { label: '12" x 12"', value: "12x12", basePrice: 69.99 },
            { label: '12" x 18"', value: "12x18", basePrice: 83.99 },
            { label: '18" x 24"', value: "18x24", basePrice: 125.99 },
            { label: '24" x 36"', value: "24x36", basePrice: 195.99 },
            { label: "Custom Size", value: "custom", basePrice: 0 },
          ],
          selects: [
            {
              label: "Acrylic Type",
              options: [
                {
                  label: "Clear Acrylic (Standard)",
                  value: "clear",
                  priceAdder: 0,
                  description: "Crystal clear — print shows through beautifully.",
                },
                {
                  label: "White Acrylic",
                  value: "white",
                  priceAdder: 0, priceMultiplier: 1.2,
                  description: "Bright white base for maximum color vibrancy.",
                },
                {
                  label: "Frosted Acrylic",
                  value: "frosted",
                  priceAdder: 0, priceMultiplier: 1.4,
                  description:
                    "Elegant translucent appearance, ideal for office reception.",
                },
                {
                  label: "Black Acrylic",
                  value: "black",
                  priceAdder: 0, priceMultiplier: 1.4,
                  description:
                    "Dramatic and modern — excellent for gold/silver text.",
                },
              ],
            },
            {
              label: "Thickness",
              options: [
                { label: '1/8" (3mm) Standard', value: "3mm", priceAdder: 0 },
                {
                  label: '1/4" (6mm) Heavy',
                  value: "6mm",
                  priceAdder: 0, priceMultiplier: 1.75,
                  description: "High-quality weight that commands respect.",
                },
                {
                  label: '3/8" (9mm) Ultra-Thick',
                  value: "9mm",
                  priceAdder: 0, priceMultiplier: 2.2,
                  description: "The heaviest, most substantial option.",
                },
              ],
            },
            {
              label: "Print Method",
              options: [
                {
                  label: "UV Printed (Front)",
                  value: "uv_front",
                  priceAdder: 0,
                  description: "Direct manufactured using the front surface.",
                },
                {
                  label: "Second-Surface Print (Back)",
                  value: "second_surface",
                  priceAdder: 0, priceMultiplier: 1.7,
                  description:
                    "Image manufactured using the back for a glass-effect look.",
                },
              ],
            },
          ],
          toggleGroups: [
            {
              label: "Corners",
              options: [
                { id: "square", label: "Square Corners", priceAdder: 0 },
                { id: "rounded", label: "Rounded Corners", priceAdder: 0, priceMultiplier: 1.3 },
                { id: "custom_shape", label: "Custom Shape", priceAdder: 0, priceMultiplier: 1.5 },
              ],
            },
            {
              label: "Mounting Hardware",
              options: [
                { id: "none", label: "No Mounting", priceAdder: 0 },
                {
                  id: "standoffs",
                  label: "Standoff Mounts (x4)",
                  priceAdder: 12.99,
                  description:
                    "Polished metal standoffs for wall floating effect.",
                },
                { id: "adhesive", label: "3M Adhesive Tape", priceAdder: 0, priceMultiplier: 1.2 },
                { id: "holes", label: "Pre-Drilled Holes", priceAdder: 0, multiMultiplier: 1.2 },
              ],
            },
          ],
          qtyDiscount: "Volume pricing — ideal for office signage packages",
          keyFeatures: [
            "High-quality cast acrylic material",
            "Laser-cut edges for a perfect finish",
            "Multiple color and thickness options",
            "Second-surface printing for glass effect",
            "Standoff mounting hardware available",
            "shapes and sizes supported",
          ],
          useCases: [
            "Office Reception",
            "Lobby Signage",
            "Awards & Recognition",
            "Retail Branding",
            "Wayfinding Signs",
            "Restaurant Menus",
            "Hotel Signage",
          ],
          specs: [
            { key: "Material", value: "Cast Acrylic (PMMA)" },
            { key: "Standard Thickness", value: '1/8" (3mm)' },
            { key: "Print Method", value: "UV Direct Print or Second-Surface" },
            {
              key: "Edge Finish",
              value: "Laser-polished, flame-polished, or matte",
            },
            { key: "Color Profile", value: "CMYK + White Ink Base" },
            { key: "Bleed Required", value: '0.125" all sides' },
            { key: "Turnaround", value: "2-3 Business Days" },
          ],
          faqs: [
            {
              q: "What is second-surface printing?",
              a: "The design is manufactured using the back of clear acrylic. You view it through the clear surface, creating a high-quality glass-like appearance that protects the ink from scratches.",
            },
            {
              q: "What standoff mounts do you recommend?",
              a: 'We offer 3/4" polished chrome standoffs for a sleek corporate look, or brushed nickel for a warmer finish. Both create a floating effect on the wall.',
            },
            {
              q: "Can acrylic signs be used outdoors?",
              a: "Cast acrylic is UV-stable and can be used outdoors. However, we recommend UV-printed finishes and avoiding direct harsh weather exposure for longest life.",
            },
            {
              q: "How do I clean acrylic signs?",
              a: "Use a soft cloth and mild soap or specialized acrylic cleaner. Never use ammonia-based cleaners (like Windex) as they may cloud the surface.",
            },
          ],
          reviews: [
            {
              author: "Gabriel M.",
              rating: 5,
              text: "Ordered acrylic signs for our new office. They look stunning — clients always ask about them.",
            },
            {
              author: "Sophia K.",
              rating: 5,
              text: "The second-surface printing is absolutely beautiful. Totally worth the extra cost.",
            },
            {
              author: "David N.",
              rating: 5,
              text: "The standoff mounts are a great touch. The floating effect on the wall looks very high-end.",
            },
          ],
          ctaHeading: "Upgrade to High-quality Acrylic",
        },
      },
      {
        id: "coroplast-signs",
        name: "Coroplast Signs",
        description:
          "Weather-resistant corrugated plastic signs — the most adaptable, lightweight, and cost-effective exterior marketing signs.",
        image: "/images/products/main-page/coroplast_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 12.99",
        badge: "Weather-resistant",
        config: {
          title: "Coroplast Signs",
          subtitle:
            "The most adaptable weather-resistant exterior sign — resilient, colorful, and incredibly cost-effective.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText: "💧 Weather-resistant Coroplast Signs — Weatherproof & Budget-Friendly. Ships Tomorrow!",
          image: "/images/products/main-page/coroplast_sign-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/coroplast_sign-toronto-printing-ca.webp",
            "/images/products/coro_sign_hover-toronto-printing-ca.webp",
            "/images/products/yard_sign_hover-toronto-printing-ca.webp",
          ],
          ratingScore: "4.8",
          ratingCount: "5,620",
          sizes: [
            { label: '12" x 18"', value: "12x18", basePrice: 12.99 },
            {
              label: '18" x 24" (Most Popular)',
              value: "18x24",
              basePrice: 19.99,
            },
            { label: '24" x 24"', value: "24x24", basePrice: 29.99 },
            { label: '24" x 36"', value: "24x36", basePrice: 39.99 },
            { label: '24" x 48"', value: "24x48", basePrice: 49.99 },
            { label: '36" x 48"', value: "36x48", basePrice: 59.99 },
            { label: '48" x 96"', value: "48x96", basePrice: 129.99 },
            { label: "Custom Size", value: "custom", basePrice: 0 },
          ],
          selects: [
            {
              label: "Thickness",
              options: [
                {
                  label: "4mm (Standard — Most Popular)",
                  value: "4mm",
                  priceAdder: 0,
                  description:
                    "Best for general exterior signage up to 12 months.",
                },
                {
                  label: "6mm Heavy Duty",
                  value: "6mm",
                  priceAdder: 0,
                  priceMultiplier: 1.2,
                  description:
                    "50% thicker — ideal for long-term and reusable signs.",
                },
                {
                  label: "10mm Ultra Heavy Duty",
                  value: "10mm",
                  priceAdder: 0,
                  priceMultiplier: 1.4,
                  description: "The thickest option for maximum rigidity.",
                },
              ],
            },
            {
              label: "Printing",
              options: [
                { label: "Single Sided", value: "single", priceAdder: 0 },
                {
                  label: "Double Sided",
                  value: "double",
                  priceAdder: 0,
                  priceMultiplier: 1.3,
                  description: "Both faces printed for maximum visibility.",
                },
              ],
            },
            {
              label: "Color",
              options: [
                {
                  label: "White Background (Standard)",
                  value: "white",
                  priceAdder: 0,
                },
                { label: "Yellow Background", value: "yellow", priceAdder: 10 },
                { label: "Red Background", value: "red", priceAdder: 15 },
                { label: "Blue Background", value: "blue", priceAdder: 20 },
              ],
            },
          ],
          toggleGroups: [
            {
              label: "Stakes",
              options: [
                { id: "none", label: "No Stakes", priceAdder: 0 },
                { id: "9in", label: '9" Wire H-Stakes', priceAdder: 0.99 },
                { id: "15in", label: '15" Wire H-Stakes', priceAdder: 1.48 },
                {
                  id: "step",
                  label: "Step Stakes",
                  priceAdder: 1.99,
                  description: "Easy push-in with foot",
                },
              ],
            },
            {
              label: "Grommets",
              options: [
                { id: "no_grommets", label: "No Grommets", priceAdder: 0 },
                {
                  id: "corner_grommets",
                  label: "Corner Grommets",
                  priceAdder: 1.5,
                },
                {
                  id: "perimeter_grommets",
                  label: 'Perimeter Grommets (every 24")',
                  priceAdder: 1.5,
                },
              ],
            },
          ],
          qtyDiscount: "Buy more, save more — up to 13% off on large orders",
          keyFeatures: [
            "100% weather-resistant corrugated plastic",
            "UV-resistant full-color printing",
            "Available in 4mm, 6mm, and 8mm",
            "Lightweight and simple to transport",
            "Double-sided printing available",
            "sizes available",
          ],
          useCases: [
            "Yard Signs",
            "Construction Sites",
            "Fence Signs",
            "Event Signage",
            "Political Signs",
            "For Sale Signs",
            "Corporate Promotions",
            "Directional Signs",
          ],
          specs: [
            { key: "Material", value: "Corrugated Polypropylene (Coroplast)" },
            { key: "Standard Thickness", value: "4mm" },
            {
              key: "Weatherproof Rating",
              value: "Fully waterproof, UV-resistant inks",
            },
            { key: "Print Resolution", value: "720 x 1440 dpi" },
            { key: "Color Profile", value: "CMYK" },
            { key: "Bleed Required", value: '0.125" all sides' },
            {
              key: "Expected Lifespan",
              value: "6–18 months outdoors (4mm); 2+ years (6mm+)",
            },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "What is the difference between coroplast and regular cardboard?",
              a: "Coroplast is corrugated polypropylene plastic — it is 100% weather-resistant, flexible, and far more resilient than cardboard. It won't absorb moisture or warp in the rain.",
            },
            {
              q: "Can I use coroplast signs indoors?",
              a: "Absolutely. Coroplast is a great interior sign material too — it's lightweight, rigid, and simple to display with stakes, grommets, or adhesive.",
            },
            {
              q: "How do I attach coroplast signs to a fence?",
              a: "Use zip ties through grommets, or bungee cords. We can add pre-punched grommets to any side of the sign for easy attachment.",
            },
            {
              q: "Are they recyclable?",
              a: "Yes! Coroplast signs are made from polypropylene (PP #5) and are fully recyclable at facilities that accept rigid plastics.",
            },
          ],
          reviews: [
            {
              author: "Derek F.",
              rating: 5,
              text: "We ordered 500 signs for our campaign and they were perfect. Fast delivery and great price per sign.",
            },
            {
              author: "Tina R.",
              rating: 5,
              text: "The 6mm signs are incredibly sturdy. Held up through a whole hurricane season on our construction site.",
            },
            {
              author: "Bobby M.",
              rating: 5,
              text: "Best price I found anywhere for coroplast signs. Will definitely order again.",
            },
          ],
          ctaHeading: "Sign Big, Spend Small",
        },
      },
      {
        id: "window-signs",
        name: "Window Signs",
        description:
          "window graphics, clings, perforated vinyl, and decals for storefronts and offices.",
        image: "/images/products/main-page/window_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 13.99",
        badge: "Storefront",
        config: {
          title: "Window Signs & Clings",
          subtitle:
            "window graphics, clings, perforated vinyl, and decals for storefronts and offices.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText:
            "🪟 Window Signs That Turn Passersby Into Customers — Ships Next Day!",
          image: "/images/products/main-page/window_sign-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/window_sign-toronto-printing-ca.webp",
            "/images/products/wind_sign_hover-toronto-printing-ca.webp",
          ],
          ratingScore: "4.8",
          ratingCount: "1,940",
          sizes: [
            { label: '12" x 12"', value: "12x12", basePrice: 13.99 },
            { label: '12" x 24"', value: "12x24", basePrice: 20.99 },
            { label: '24" x 24"', value: "24x24", basePrice: 32.19 },
            { label: '24" x 36"', value: "24x36", basePrice: 46.19 },
            { label: '36" x 48"', value: "36x48", basePrice: 69.99 },
            { label: '48" x 72"', value: "48x72", basePrice: 111.99 },
            { label: "Custom Size", value: "custom", basePrice: 0 },
          ],
          selects: [
            {
              label: "Window Graphic Type",
              options: [


                {
                  label: "White Vinyl Decal",
                  value: "white_vinyl",
                  priceAdder: 0,
                  description: "Opaque white background — bold, vivid colors.",
                },
                {
                  label: "Clear Vinyl Decal",
                  value: "clear_vinyl",
                  priceAdder: 0,
                  priceMultiplier: 1.3,
                  description:
                    "Permanent adhesive on clear film. Very expert-grade look.",
                },

                {
                  label: "Perforated Vinyl (One-Way Vision)",
                  value: "perforated",
                  priceAdder: 0,
                  priceMultiplier: 1.7,
                  description:
                    "See-through from inside, solid image from outside. 60/40 blockout.",
                },
                {
                  label: "Frosted Vinyl",
                  value: "frosted",
                  priceAdder: 0,
                  priceMultiplier: 1.8,
                  description:
                    "Privacy glass effect. Excellent for offices & conference rooms.",
                },
              ],
            },
            {
              label: "Adhesive",
              options: [
                {
                  label: "Permanent",
                  value: "permanent",
                  priceAdder: 0,
                  description: "Long-term adhesion for extended display.",
                },
                {
                  label: "Removable (Standard)",
                  value: "removable",
                  priceAdder: 0,
                  priceMultiplier: 1.3,
                  description: "Peels off cleanly without residue.",
                },

              ],
            },
          ],
          toggleGroups: [
            {
              label: "Application Surface",
              options: [
                {
                  id: "inside",
                  label: "Apply Inside (Facing Out)",
                  priceAdder: 0,
                  description: "Protected from weather — most resilient.",
                },
                {
                  id: "outside",
                  label: "Apply Outside (Facing Out)",
                  priceAdder: 0,
                  priceMultiplier: 1.3,
                  description: "Maximum visibility from street.",
                },
                {
                  id: "second_surface",
                  label: "Second-Surface Reverse Print",
                  priceAdder: 0,
                  priceMultiplier: 1.7,
                  description:
                    "Image reversed so it reads correctly applied inside.",
                },
              ],
            },
            {
              label: "Lamination",
              options: [
                { id: "no_lam", label: "No Lamination", priceAdder: 0 },
                {
                  id: "matte_lam",
                  label: "Matte Laminate",
                  priceAdder: 0,
                  priceMultiplier: 1.3,
                  description: "UV protection, scratch-resistant.",
                },
                {
                  id: "gloss_lam",
                  label: "Gloss Laminate",
                  priceAdder: 0,
                  priceMultiplier: 1.3,
                  description: "Vivid colors, scratch-resistant.",
                },
              ],
            },
          ],
          qtyDiscount: "Buy 3+ and save up to 10%",
          keyFeatures: [
            "Multiple window graphic types available",
            "One-way vision perforated vinyl available",
            "Removable or permanent adhesive options",
            "Inside or outside application",
            "UV-resistant inks",
            "Easy DIY installation",
          ],
          useCases: [
            "Retail Storefronts",
            "Restaurant Windows",
            "Office Branding",
            "Sales & Promotions",
            "Privacy Screens",
            "Vehicle Windows",
            "Real Estate Listings",
            "Event Promotion",
          ],
          specs: [
            { key: "Cling Material", value: "Electrostatic PVC (no adhesive)" },
            {
              key: "Vinyl Material",
              value: "Calendered PVC with acrylic adhesive",
            },
            {
              key: "Perforated Vinyl",
              value: "60% ink coverage / 40% hole (one-way vision)",
            },
            { key: "Print Resolution", value: "1440 dpi" },
            { key: "Color Profile", value: "CMYK" },
            { key: "Bleed Required", value: '0.25" all sides' },
            {
              key: "Max Width",
              value: '54" (custom widths for larger installs)',
            },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "What is the difference between a window cling and a decal?",
              a: "A static cling uses no adhesive — it clings to glass via static electricity and can be removed and reused. A decal uses adhesive to create a more permanent bond.",
            },
            {
              q: "Can I see through perforated vinyl?",
              a: "Yes! Perforated vinyl (one-way vision) blocks 60% of light from outside, forming your printed image. From the inside, you can see through the small holes clearly.",
            },
            {
              q: "How do I apply a window decal without bubbles?",
              a: "Clean the glass thoroughly, wet the surface with soapy water, apply with a squeegee, and work from center to edges. We include installation instructions with every order.",
            },
            {
              q: "Will window graphics damage my glass?",
              a: "Removable adhesive window graphics peel off cleanly without damage or residue when removed within the recommended display period (typically 2 years).",
            },
          ],
          reviews: [
            {
              author: "Naomi S.",
              rating: 5,
              text: "The perforated vinyl looks incredible on our storefront. We get compliments on it every day.",
            },
            {
              author: "Kyle R.",
              rating: 5,
              text: "Ordered frosted vinyl for our conference room for privacy. Looks extremely expert-grade and high-end.",
            },
            {
              author: "Isabella T.",
              rating: 4,
              text: "Great quality static clings for a seasonal sale promotion. Simple to put up and remove — will reorder.",
            },
          ],
          ctaHeading: "Your Window Is Your Best Billboard",
        },
      },
      {
        id: "parking-signs",
        name: "Parking Signs",
        description:
          "Regulatory, reserved, and parking signs — aluminum or coroplast, ships next day.",
        image: "/images/products/main-page/Parking_sign-toronto-printing-ca.webp",
        price: "Starting at CAD 9.79",
        badge: "Ready to Ship",
        config: {
          title: "Parking Signs",
          subtitle:
            "Regulatory, reserved, and parking signs — aluminum or coroplast, ships next day.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText:
            "🅿️ Parking Signs — MUTCD-Compliant Reflective Available. Ships Tomorrow!",
          image: "/images/products/main-page/Parking_sign-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/Parking_sign-toronto-printing-ca.webp",
            "/images/products/park_sign_hover-toronto-printing-ca.webp",
          ],
          ratingScore: "4.9",
          ratingCount: "2,310",
          sizes: [
            { label: '18" x 24"', value: "18x24", basePrice: 105 },
            { label: '36" x 24"', value: "36x24", basePrice: 130 },
          ],
          toggleGroups: [
            {
              label: "Printed Sides",
              options: [
                { id: "single", label: "Single Sided Only", priceAdder: 0 }
              ]
            }
          ],
          qtyDiscount: "Bulk parking sign orders — save up to 13%",
          keyFeatures: [
            "Industry-standard .040 aluminum",
            "Reflective finish available (ASTM D4956 Type I & III)",
            "Standard templates or fully designs",
            "Pre-drilled mounting holes included free",
            "MUTCD-compliant options available",
            "U-channel and square post add-ons",
          ],
          useCases: [
            "Private Parking Lots",
            "Corporate Parking",
            "HOA Communities",
            "Hotels & Motels",
            "Hospitals & Clinics",
            "Churches",
            "Schools",
            "Apartment Complexes",
          ],
          specs: [
            { key: "Standard Material", value: '.040" Aluminum' },
            { key: "Heavy Duty", value: '.080" Aluminum' },
            {
              key: "Reflective Standard",
              value: "ASTM D4956 Type I (Engineer Grade)",
            },
            {
              key: "Reflective High-quality",
              value: "ASTM D4956 Type III (High Intensity)",
            },
            { key: "Hole Diameter", value: '5/16" standard' },
            { key: "Print Resolution", value: "1440 dpi" },
            { key: "Color Profile", value: "CMYK + Spot colors available" },
            { key: "Turnaround", value: "Next Business Day" },
          ],
          faqs: [
            {
              q: "Are your parking signs MUTCD compliant?",
              a: "Yes! Our reflective aluminum signs can be produced to MUTCD (Manual on Uniform Traffic Control Devices) specifications. Select the Engineer-Grade or High-Intensity Reflective finish.",
            },
            {
              q: "Do you have standard parking sign templates?",
              a: "Yes — we offer standard pre-designed templates (No Parking, Reserved, Handicap, Tow Away Zone, etc.) that follow regulatory color standards. You can also fully customize any sign.",
            },
            {
              q: "How do I mount a parking sign to a post?",
              a: 'We offer U-Channel and square tubing post add-ons. Alternatively, pre-drilled holes allow you to mount to any standard 2" U-channel post with sign-mounting hardware.',
            },
            {
              q: "Can I include time restrictions on my parking sign?",
              a: "Absolutely. Our design upload lets you include any specific text, time ranges, or language. We also have templates with 'Hours of Enforcement' sections.",
            },
          ],
          reviews: [
            {
              author: "Steve P.",
              rating: 5,
              text: "Ordered 30 parking signs for our apartment complex. All look great and the reflective finish is very visible at night.",
            },
            {
              author: "Rebecca O.",
              rating: 5,
              text: "Fast, superior quality, and exactly the right regulatory look. Our HOA board approved them immediately.",
            },
            {
              author: "Marcus J.",
              rating: 5,
              text: "The U-channel posts were a perfect add-on. Everything arrived together and install was straightforward.",
            },
          ],
          ctaHeading: "Control Your Parking. Protect Your Space.",
        },
      },
      {
        id: "channel-letter-signs",
        name: "Channel Letter Signs",
        description:
          "High-quality 3D backlit and front-lit channel letters to make your business storefront command attention.",
        image: "/images/products/main-page/channel_letter_signs-toronto-printing-ca.webp",
        price: "Starting at CAD 209.99",
        badge: "High-quality",
        config: {
          title: "Channel Letter Signs",
          subtitle:
            "Expert-grade dimensional signage with brilliant LED illumination options.",
          breadcrumb: "Signs",
          breadcrumbHref: "/custom-signs",
          promoText: "✨ Modern LED Channel Letters — Expert-grade Storefront Impact. Shipped Fast!",
          image: "/images/products/main-page/channel_letter_signs-toronto-printing-ca.webp",
          images: [
            "/images/products/main-page/channel_letter_signs-toronto-printing-ca.webp",
            "/images/products/gallery/channel_letter_storefront_1-toronto-printing-ca.webp",
            "/images/products/gallery/channel_letter_storefront_2-toronto-printing-ca.webp",
          ],
          ratingScore: "4.9",
          ratingCount: "820",
          sizes: [
            { label: '12" High Letters', value: "12in", basePrice: 209.99 },
            { label: '18" High Letters', value: "18in", basePrice: 314.99 },
            { label: '24" High Letters', value: "24in", basePrice: 419.99 },
            { label: '36" High Letters', value: "36in", basePrice: 629.99 },
          ],
          selects: [
            {
              label: "Illumination Type",
              options: [
                {
                  label: "Front-Lit (LED Face Glowing)",
                  value: "front_lit",
                  priceAdder: 0,
                  description: "Standard bright acrylic faces with internal LED illumination.",
                },
                {
                  label: "Halo-Lit / Reverse-Lit (Rear Glowing)",
                  value: "halo_lit",
                  priceAdder: 49.99,
                  description: "Light projects onto the wall behind, creating a halo effect.",
                },
                {
                  label: "Dual-Lit (Front & Rear Glowing)",
                  value: "dual_lit",
                  priceAdder: 90.01,
                  description: "Combines glowing faces and halo backlighting for maximum impact.",
                },
                {
                  label: "Non-Illuminated Dimensional Letters",
                  value: "non_illuminated",
                  priceAdder: -40.0,
                  description: "High-end 3D metal or acrylic letters without lights.",
                },
              ],
            },
            {
              label: "Mounting Style",
              options: [
                {
                  label: "Raceway Mount (Standard)",
                  value: "raceway",
                  priceAdder: 0,
                  description: "Letters pre-installed on a metal box/bar container for easier wiring.",
                },
                {
                  label: "Flush / Direct Wall Mount",
                  value: "flush",
                  priceAdder: 35,
                  description: "Letters mounted directly to the wall surface with individual wiring.",
                },
              ],
            },
          ],
          toggleGroups: [
            {
              label: "Face Acrylic Color",
              options: [
                { id: "white_face", label: "Brilliant White", priceAdder: 0 },
                { id: "red_face", label: "Vibrant Red", priceAdder: 0 },
                { id: "blue_face", label: "Royal Blue", priceAdder: 0 },
                { id: "black_face", label: "Black (Glows White)", priceAdder: 14.99 },
              ],
            },
            {
              label: "Return / Trim Color (Sides)",
              options: [
                { id: "black_return", label: "Sleek Black", priceAdder: 0 },
                { id: "silver_return", label: "Brushed Aluminum", priceAdder: 0 },
                { id: "bronze_return", label: "Classic Bronze", priceAdder: 0 },
              ],
            },
          ],
          qtyDiscount: "Volume discounts on complex multi-letter signs",
          keyFeatures: [
            "Industrial-strength aluminum returns (side walls) will not rust",
            "Energy-efficient and long-lasting UL-listed LEDs",
            "fonts, colors, and logos supported",
            "Front-lit and halo-lit options for stunning looks",
            "Raceway mount option for simplified building installation",
          ],
          useCases: [
            "Retail Storefronts",
            "Corporate Offices",
            "Restaurants & Cafes",
            "Shopping Centers",
            "Building Exterior Signage",
          ],
          specs: [
            { key: "Letter Thickness (Depth)", value: "3\" to 5\" deep returns" },
            { key: "Illumination source", value: "UL-certified Low-voltage 12V LEDs" },
            { key: "Face Material", value: "3/16\" Cast Acrylic" },
            { key: "Return Material", value: "0.040\" Pre-painted Aluminum" },
            { key: "Wiring Type", value: "Single-source connection (with Raceway)" },
            { key: "Outdoor Lifespan", value: "10+ years maintenance-free" },
          ],
          faqs: [
            {
              q: "What is the difference between front-lit and halo-lit letters?",
              a: "Front-lit letters have acrylic faces that glow in the chosen color, throwing light forward. Halo-lit (or reverse-lit) letters have aluminum faces but open backs, allowing light to reflect off the wall behind the letter to create a soft, upscale halo glow.",
            },
            {
              q: "What is a raceway mount?",
              a: "A raceway is a metal box structure that the channel letters are mounted to. It holds the power supplies and wiring. Mounting via a raceway only requires a few holes in the building's facade, whereas flush mounting requires drilling individual mounting and wiring holes for every single letter.",
            },
            {
              q: "Do you supply the mounting templates and hardware?",
              a: "Yes! Every channel letter sign comes with a full-size paper mounting template, studs, silicone spacers, and clear instructions to make installation straightforward for any handyman or signage installer.",
            },
          ],
          reviews: [
            {
              author: "Gordon K.",
              rating: 5,
              text: "The halo-lit letters transformed our cafe facade. Absolute showstopper at night. Highly recommend!",
            },
            {
              author: "Samantha V.",
              rating: 5,
              text: "Fantastic customer support in setting up our vector logo. The letters arrived securely crated and installation templates were exact.",
            },
          ],
          ctaHeading: "Brighten Your Corporate Facade",
        },
      },
    ],
  },
  "led-display-signs": {
    "title": "LED Display Signs",
    "breadcrumbLabel": "LED Displays",
    "heroSubtitle": "High-Brightness Commercial Screens & Programmable Billboards",
    "description": "Discover high-impact, programmable commercial LED display signs. Perfect for retail storefronts, events, window displays, and outdoor advertising. Energy-efficient, ultra-bright, and customizable.",
    "heroImage": "/images/products/led-display-signs/hero4.webp",
    "tabletHeroImage": "/images/products/led-display-signs/hero4.webp",
    "mobileHeroImage": "/images/products/led-display-signs/hero4.webp",
    "reviewRating": "4.9",
    "reviewCount": "85",
    "reviewQuote": "Incredible brightness and super easy to program. Paid for itself in a week!",
    "categoryDescriptionText": "Elevate your brand presence with our premium, high-brightness commercial LED display signs. From massive outdoor fixed billboards and dynamic vehicle displays to sleek indoor screens and flexible retail windows, we deliver cutting-edge, energy-efficient solutions built to last. Our experts provide comprehensive support from design and manufacturing to installation, ensuring your digital signage drives unmatched foot traffic and visibility.",
    "products": [
      {
        "id": "programmable-led-sign",
        "name": "Programmable LED Sign",
        "description": "Custom Programmable LED display. High-resolution screens perfect for retail, restaurants, churches, and outdoor advertising. Outperforms static signs with dynamic video.",
        "image": "/images/products/led_sign_welcome.webp",
        "price": "Starting at $90/sqft",
        "badge": "New",
        "config": {
          "id": "programmable-led-sign",
          "title": "Programmable LED Sign",
          "subtitle": "High-visibility programmable LED signs for storefronts. Available in multiple pixel pitches (P3, P5, P10) for indoor or outdoor use.",
          "breadcrumb": "Programmable LED Signs",
          "breadcrumbHref": "/led-display-signs",
          "promoText": "CUSTOM LED SIGNS - PREMIUM QUALITY",
          "image": "/images/products/led_sign_welcome.webp",
          "ratingCount": "42",
          "ratingScore": "4.8",
          "sizes": [
            {
              "label": "Custom LED Dimension",
                  "value": "custom",
                  "basePrice": 0
            }
          ],
          "selects": [
            {
              "label": "Width",
              "options": [
                {
                  "label": "28.35\" (72 cm)",
                  "value": "w_72cm",
                  "priceMultiplier": 2.3625000000000003,
                  "priceAdder": 0
                },
                {
                  "label": "40.94\" (104 cm)",
                  "value": "w_104cm",
                  "priceMultiplier": 3.4116666666666666,
                  "priceAdder": 0
                },
                {
                  "label": "53.54\" (136 cm)",
                  "value": "w_136cm",
                  "priceMultiplier": 4.461666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "66.14\" (168 cm)",
                  "value": "w_168cm",
                  "priceMultiplier": 5.511666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "78.74\" (200 cm)",
                  "value": "w_200cm",
                  "priceMultiplier": 6.5616666666666665,
                  "priceAdder": 0
                },
                {
                  "label": "91.34\" (232 cm)",
                  "value": "w_232cm",
                  "priceMultiplier": 7.611666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "103.94\" (264 cm)",
                  "value": "w_264cm",
                  "priceMultiplier": 8.661666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "116.54\" (296 cm)",
                  "value": "w_296cm",
                  "priceMultiplier": 9.711666666666668,
                  "priceAdder": 0
                }
              ]
            },
            {
              "label": "Height",
              "options": [
                {
                  "label": "15.75\" (40 cm)",
                  "value": "h_40cm",
                  "priceMultiplier": 1.3125,
                  "priceAdder": 0
                },
                {
                  "label": "22.05\" (56 cm)",
                  "value": "h_56cm",
                  "priceMultiplier": 1.8375000000000001,
                  "priceAdder": 0
                },
                {
                  "label": "28.35\" (72 cm)",
                  "value": "h_72cm",
                  "priceMultiplier": 2.3625000000000003,
                  "priceAdder": 0
                },
                {
                  "label": "34.65\" (88 cm)",
                  "value": "h_88cm",
                  "priceMultiplier": 2.8874999999999997,
                  "priceAdder": 0
                },
                {
                  "label": "40.94\" (104 cm)",
                  "value": "h_104cm",
                  "priceMultiplier": 3.4116666666666666,
                  "priceAdder": 0
                },
                {
                  "label": "47.24\" (120 cm)",
                  "value": "h_120cm",
                  "priceMultiplier": 3.936666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "53.54\" (136 cm)",
                  "value": "h_136cm",
                  "priceMultiplier": 4.461666666666667,
                  "priceAdder": 0
                },
                {
                  "label": "59.84\" (152 cm)",
                  "value": "h_152cm",
                  "priceMultiplier": 4.986666666666667,
                  "priceAdder": 0
                }
              ]
            },
            {
              "label": "Model",
              "options": [
                {
                  "label": "P10 (Low resolution for far view)",
                  "value": "p10",
                  "priceAdder": 90,
                  "priceMultiplier": 1
                },
                {
                  "label": "P5 (Medium resolution for medium view)",
                  "value": "p5",
                  "priceAdder": 145,
                  "priceMultiplier": 1
                },
                {
                  "label": "P3 (High resolution for close view)",
                  "value": "p3",
                  "priceAdder": 220,
                  "priceMultiplier": 1
                }
              ]
            },
            {
              "label": "Waterproof",
              "options": [
                {
                  "label": "No",
                  "value": "no",
                  "priceMultiplier": 1
                },
                {
                  "label": "Yes",
                  "value": "yes",
                  "priceAdder": 20,
                  "priceMultiplier": 1
                }
              ]
            }
          ],
          "faqs": [],
          "reviews": [],
          "ctaHeading": "Ready to program your message?",
          "ctaLabel": "Add to Cart"
        }
      },
{
      "id": "flexible-led-display",
      "name": "Flexible & Curved LED Video Walls",
      "description": "Transform architectural columns, waves, and unique curved surfaces with our bendable soft LED modules. Perfect for immersive retail spaces and creative stage designs.",
      "image": "/images/products/flexible-led-display.webp",
      "price": "Starting at $110/sqft",
      "badge": "Creative Design",
      "config": {
            "id": "flexible-led-display",
            "title": "Flexible & Curved LED Video Walls",
            "subtitle": "Break free from flat screens. Bend, curve, and wrap your digital displays around any architectural element.",
            "breadcrumb": "Flexible LED Displays",
            "breadcrumbHref": "/led-display-signs/flexible-led-display",
            "promoText": "CUSTOM CURVED LED SOLUTIONS",
            "image": "/images/products/flexible-led-display.webp",
            "ratingCount": "41",
            "ratingScore": "4.9",
            "sizes": [
                  {
                        "label": "Custom Curved Dimension",
                        "value": "custom",
                        "basePrice": 0
                  }
            ],
            "selects": [],
            "faqs": [
                  {
                        "q": "How much can a flexible LED module bend?",
                        "a": "Our soft LED modules can bend up to 120 degrees, making them ideal for wrapping around pillars, creating wave-like ceiling installations, or building custom circular displays without compromising pixel integrity."
                  },
                  {
                        "q": "Are curved LED panels suitable for outdoor use?",
                        "a": "While our standard flexible modules are designed for high-end indoor retail and stage use, we do offer specialized IP65-rated flexible panels for outdoor architectural integration. Contact our team for specific outdoor curving requirements."
                  }
            ],
            "reviews": [],
            "ctaHeading": "Ready to build a curved display?",
            "ctaLabel": "Request Custom Quote"
      }
},
      {
      "id": "shop-window-led-display",
      "name": "High-Brightness Storefront LED Posters",
      "description": "Defeat direct sunlight and capture foot traffic with our ultra-bright 5000+ nits window displays. Designed specifically to be visible through retail glass on the sunniest days.",
      "image": "/images/products/shop-window-led-display.webp",
      "price": "Starting at $120/sqft",
      "badge": "Sunlight Readable",
      "config": {
            "id": "shop-window-led-display",
            "title": "High-Brightness Storefront LED Posters",
            "subtitle": "Turn your retail window into a dynamic digital canvas that cuts through glare and direct sunlight.",
            "breadcrumb": "Storefront Window LED",
            "breadcrumbHref": "/led-display-signs/shop-window-led-display",
            "promoText": "ULTRA-BRIGHT WINDOW DISPLAYS",
            "image": "/images/products/shop-window-led-display.webp",
            "ratingCount": "87",
            "ratingScore": "4.9",
            "sizes": [
                  {
                        "label": "Standard Window Size",
                        "value": "custom",
                        "basePrice": 0
                  }
            ],
            "selects": [],
            "faqs": [
                  {
                        "q": "Will the screen be visible in direct afternoon sunlight?",
                        "a": "Absolutely. Standard indoor TVs fade in sunlight because they only output 300-500 nits. Our window-facing LED displays blast at 5,000 to 7,000 nits, ensuring your promotions are crystal clear and vibrant even at high noon."
                  },
                  {
                        "q": "Does it block the view into my store?",
                        "a": "We offer both solid high-brightness panels and transparent LED film options. If you want natural light to enter your store while displaying video, ask about our transparent window series!"
                  }
            ],
            "reviews": [],
            "ctaHeading": "Want to stop foot traffic in its tracks?",
            "ctaLabel": "Get Window Display Quote"
      }
},
      {
      "id": "mobile-truck-led-display",
      "name": "Mobile Billboard Truck LED Screens",
      "description": "Ruggedized, weather-proof, and vibration-resistant LED panels engineered specifically for moving vehicles, trailers, and mobile advertising trucks.",
      "image": "/images/products/mobile-truck-led-display.webp",
      "price": "Starting at $130/sqft",
      "badge": "Heavy Duty",
      "config": {
            "id": "mobile-truck-led-display",
            "title": "Mobile Billboard Truck LED Screens",
            "subtitle": "Take your advertising on the road with military-grade vibration resistance and IP67 weatherproofing.",
            "breadcrumb": "Mobile Truck LED",
            "breadcrumbHref": "/led-display-signs/mobile-truck-led-display",
            "promoText": "VEHICLE MOUNTED LED PANELS",
            "image": "/images/products/mobile-truck-led-display.webp",
            "ratingCount": "34",
            "ratingScore": "4.8",
            "sizes": [
                  {
                        "label": "Truck Bed Dimension",
                        "value": "custom",
                        "basePrice": 0
                  }
            ],
            "selects": [],
            "faqs": [
                  {
                        "q": "How does the screen handle road vibrations?",
                        "a": "Mobile LED screens are built with reinforced structural cabinets, specialized shock-absorbing brackets, and industrial-grade power connectors to ensure continuous operation over potholes, highways, and bumpy terrain."
                  },
                  {
                        "q": "How do I power the screen on a moving truck?",
                        "a": "These screens are powered via onboard ultra-quiet generators or heavy-duty inverter battery banks installed directly into your vehicle chassis, which we can help specify based on the square footage of the screen."
                  }
            ],
            "reviews": [],
            "ctaHeading": "Ready to build your mobile billboard?",
            "ctaLabel": "Contact Engineering Team"
      }
},
      {
      "id": "sphere-led-display",
      "name": "360° Spherical LED Globes",
      "description": "A masterpiece of LED engineering. Our spherical displays offer a completely seamless 360-degree viewing angle, perfect for museums, planetariums, and high-end corporate lobbies.",
      "image": "/images/products/sphere-led-display.webp",
      "price": "Custom Pricing",
      "badge": "Premium 360°",
      "config": {
            "id": "sphere-led-display",
            "title": "360° Spherical LED Globes",
            "subtitle": "Captivate your audience from every possible angle with a seamless, floating digital globe.",
            "breadcrumb": "Spherical LED Globe",
            "breadcrumbHref": "/led-display-signs/sphere-led-display",
            "promoText": "SEAMLESS 360 DEGREE VIDEO",
            "image": "/images/products/sphere-led-display.webp",
            "ratingCount": "12",
            "ratingScore": "5.0",
            "sizes": [
                  {
                        "label": "Custom Diameter",
                        "value": "custom",
                        "basePrice": 0
                  }
            ],
            "selects": [],
            "faqs": [
                  {
                        "q": "How do you map video onto a sphere?",
                        "a": "Our spherical LED systems come with specialized geometric mapping hardware. You simply upload a standard flat panoramic video, and our controller automatically warps and maps it seamlessly around the globe without distortion."
                  },
                  {
                        "q": "Can the globe be suspended from the ceiling?",
                        "a": "Yes! Our LED spheres are constructed with lightweight aerospace-grade aluminum frames and central rigging points, allowing them to be safely suspended to create a stunning \"floating planet\" effect."
                  }
            ],
            "reviews": [],
            "ctaHeading": "Ready for a show-stopping installation?",
            "ctaLabel": "Request Sphere Pricing"
      }
}
    ]
  }} as unknown as Record<string, RegistryCategory>;
