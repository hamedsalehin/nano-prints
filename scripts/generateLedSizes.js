const fs = require('fs');

const widths = Array.from({length: 8}).map((_, i) => 15.7 + i * 6.2992);
const heights = Array.from({length: 8}).map((_, i) => 25 + i * 12.59);
const sizes = [];

for (const w of widths) {
  for (const h of heights) {
    const wInch = w.toFixed(2);
    const hInch = h.toFixed(2);
    const sqFt = (w / 12) * (h / 12);
    sizes.push({
      label: `${wInch}" x ${hInch}"`,
      value: `${wInch.replace('.', '_')}x${hInch.replace('.', '_')}`,
      basePrice: parseFloat(sqFt.toFixed(4))
    });
  }
}

const productConfig = {
  id: 'programmable-led-sign',
  name: 'Programmable LED Sign',
  description: 'Custom Programmable LED display.',
  image: '/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png',
  price: 'Starting at $100/sqft',
  badge: 'New',
  config: {
    title: 'Programmable LED Sign',
    subtitle: 'High-visibility programmable LED signs for storefronts.',
    breadcrumb: 'Programmable LED Signs',
    breadcrumbHref: '/programmable-led-signs',
    promoText: 'CUSTOM LED SIGNS - FREE SHIPPING',
    image: '/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png',
    ratingCount: '42',
    ratingScore: '4.8',
    sizes: sizes,
    selects: [
      {
        label: 'Model (Resolution)',
        options: [
          { label: 'P10 (Outdoor / High Viewing Distance)', value: 'p10', priceMultiplier: 100, priceAdder: 0 },
          { label: 'P5 (Indoor / Medium Viewing Distance)', value: 'p5', priceMultiplier: 150, priceAdder: 0 },
          { label: 'P3 (Indoor / Close Viewing Distance)', value: 'p3', priceMultiplier: 200, priceAdder: 0 }
        ]
      }
    ],
    faqs: [],
    reviews: [],
    ctaHeading: 'Ready to program your message?',
    ctaLabel: 'Add to Cart'
  }
};

const categoryConfig = {
  "programmable-led-signs": {
    title: "Programmable LED Signs",
    breadcrumbLabel: "LED Signs",
    heroSubtitle: "Dynamic. Customizable. Bright.",
    description: "Capture attention with high-resolution programmable LED displays.",
    heroImage: "/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png",
    tabletHeroImage: "/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png",
    mobileHeroImage: "/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png",
    reviewRating: "4.9",
    reviewCount: "85",
    reviewQuote: "Incredible brightness and super easy to program. Paid for itself in a week!",
    categoryDescriptionText: "Whether you need a P10 outdoor display or a high-res P5/P3 indoor screen, we build perfectly sized panels for your needs.",
    products: [ productConfig ]
  }
};

console.log(JSON.stringify(categoryConfig, null, 2));
fs.writeFileSync('scratch/programmable_led.json', JSON.stringify(categoryConfig, null, 2));
