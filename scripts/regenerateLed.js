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
  image: '/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png',
  price: 'Starting at $90/sqft',
  badge: 'New',
  config: {
    id: 'programmable-led-sign',
    title: 'Programmable LED Sign',
    subtitle: 'High-visibility programmable LED signs for storefronts.',
    breadcrumb: 'Programmable LED Signs',
    breadcrumbHref: '/programmable-led-signs',
    promoText: 'CUSTOM LED SIGNS - FREE SHIPPING',
    image: '/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png',
    ratingCount: '42',
    ratingScore: '4.8',
    sizes: [
      { label: 'Custom LED Dimension', value: 'custom', basePrice: 0 } // basePrice is now 0
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
          // Using priceAdder for Model prices so Waterproof can ADD to it per sqft
          { label: 'P10 (Low resolution for far view)', value: 'p10', priceMultiplier: 1, priceAdder: 90 },
          { label: 'P5 (Medium resolution for medium view)', value: 'p5', priceMultiplier: 1, priceAdder: 145 },
          { label: 'P3 (High resolution for close view)', value: 'p3', priceMultiplier: 1, priceAdder: 220 }
        ]
      },
      {
        label: 'Waterproof',
        options: [
          { label: 'No', value: 'no', priceMultiplier: 1, priceAdder: 0 },
          { label: 'Yes', value: 'yes', priceMultiplier: 1, priceAdder: 20 } // Waterproof now ADDS $20 per sqft
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
  heroImage: '/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png',
  tabletHeroImage: '/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png',
  mobileHeroImage: '/images/products/main-page/banners_hero_image-oakland-park-printing-fl.png',
  reviewRating: '4.9',
  reviewCount: '85',
  reviewQuote: 'Incredible brightness and super easy to program. Paid for itself in a week!',
  categoryDescriptionText: 'Whether you need a P10 outdoor display or a high-res P5/P3 indoor screen, we build perfectly sized panels for your needs.',
  products: [ productConfig ]
};

// 1. Replace the entire programmable-led-signs category
const catStr = '  "programmable-led-signs": ' + JSON.stringify(categoryConfig, null, 2).split('\n').join('\n  ');
const match = registry.match(/  "programmable-led-signs":\s*\{[\s\S]*\}\s*\} as unknown as Record<string, RegistryCategory>;/);

if (match) {
  registry = registry.replace(match[0], catStr + '\n} as unknown as Record<string, RegistryCategory>;');
} else {
  console.log("Could not find programmable-led-signs category");
}

// 2. Replace the productConfig inside custom-signs products array
// The easiest way is to match the object inside custom-signs.
// We can find the start of the products array in custom-signs:
const customSignsIndex = registry.indexOf('"custom-signs": {');
if (customSignsIndex !== -1) {
  const productsIndex = registry.indexOf('products: [', customSignsIndex);
  if (productsIndex !== -1) {
    const ledSignIndex = registry.indexOf('"id": "programmable-led-sign"', productsIndex);
    if (ledSignIndex !== -1) {
      // Find the start of this object
      const objStart = registry.lastIndexOf('{', ledSignIndex);
      // We will replace this entire object manually, but since it has nested brackets, it's safer to just overwrite the whole file or do string replacement with known structure.
      // Wait, we know exactly what is in the file right now because we just generated it.
      // But instead of complex parsing, let's just do targeted string replacements on the whole file!
    }
  }
}

fs.writeFileSync('src/lib/productsRegistry.ts', registry);
console.log('Category regenerated.');
