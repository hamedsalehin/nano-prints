const fs = require('fs');
let registry = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

const widthsCm = Array.from({length: 8}).map((_, i) => 72 + i * 32);
const heightsCm = Array.from({length: 8}).map((_, i) => 40 + i * 16);

const widthOptions = widthsCm.map(cm => {
  const inches = (cm / 2.54).toFixed(2);
  return {
    label: `${inches}" (${cm} cm)`,
    value: `w_${cm}cm`,
    priceMultiplier: parseFloat(inches) / 12,
    priceAdder: 0
  };
});

const heightOptions = heightsCm.map(cm => {
  const inches = (cm / 2.54).toFixed(2);
  return {
    label: `${inches}" (${cm} cm)`,
    value: `h_${cm}cm`,
    priceMultiplier: parseFloat(inches) / 12,
    priceAdder: 0
  };
});

const productConfig = {
  id: 'programmable-led-sign',
  name: 'Programmable LED Sign',
  description: 'Custom Programmable LED display.',
  image: '/images/products/main-page/banners_hero_image-toronto-printing-ca.png',
  price: 'Starting at $100/sqft',
  badge: 'New',
  config: {
    id: 'programmable-led-sign',
    title: 'Programmable LED Sign',
    subtitle: 'High-visibility programmable LED signs for storefronts.',
    breadcrumb: 'Programmable LED Signs',
    breadcrumbHref: '/programmable-led-signs',
    promoText: 'CUSTOM LED SIGNS - FREE SHIPPING',
    image: '/images/products/main-page/banners_hero_image-toronto-printing-ca.png',
    ratingCount: '42',
    ratingScore: '4.8',
    sizes: [
      { label: 'Custom LED Dimension', value: 'custom', basePrice: 1 }
    ],
    selects: [
      {
        label: 'Width',
        options: widthOptions
      },
      {
        label: 'Height',
        options: heightOptions
      },
      {
        label: 'Model',
        options: [
          { label: 'P10 (Low resolution for far view)', value: 'p10', priceMultiplier: 100, priceAdder: 0 },
          { label: 'P5 (Medium resolution for medium view)', value: 'p5', priceMultiplier: 150, priceAdder: 0 },
          { label: 'P3 (High resolution for close view)', value: 'p3', priceMultiplier: 200, priceAdder: 0 }
        ]
      },
      {
        label: 'Waterproof',
        options: [
          { label: 'No', value: 'no', priceMultiplier: 1, priceAdder: 0 },
          { label: 'Yes', value: 'yes', priceMultiplier: 1.1, priceAdder: 0 }
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
  title: 'Programmable LED Signs',
  breadcrumbLabel: 'LED Signs',
  heroSubtitle: 'Dynamic. Customizable. Bright.',
  description: 'Capture attention with high-resolution programmable LED displays.',
  heroImage: '/images/products/main-page/banners_hero_image-toronto-printing-ca.png',
  tabletHeroImage: '/images/products/main-page/banners_hero_image-toronto-printing-ca.png',
  mobileHeroImage: '/images/products/main-page/banners_hero_image-toronto-printing-ca.png',
  reviewRating: '4.9',
  reviewCount: '85',
  reviewQuote: 'Incredible brightness and super easy to program. Paid for itself in a week!',
  categoryDescriptionText: 'Whether you need a P10 outdoor display or a high-res P5/P3 indoor screen, we build perfectly sized panels for your needs.',
  products: [ productConfig ]
};

const catStr = '  "programmable-led-signs": ' + JSON.stringify(categoryConfig, null, 2).split('\n').join('\n  ');

const match = registry.match(/  "programmable-led-signs":\s*\{[\s\S]*\}\s*\} as unknown as Record<string, RegistryCategory>;/);

if (match) {
  registry = registry.replace(match[0], catStr + '\n} as unknown as Record<string, RegistryCategory>;');
  fs.writeFileSync('src/lib/productsRegistry.ts', registry);
  console.log('Successfully replaced category');
} else {
  console.log('Regex failed');
}
