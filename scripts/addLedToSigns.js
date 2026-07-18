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
  image: '/images/products/main-page/banners_hero_image-oakland-park-printing-ca.png',
  price: 'Starting at $100/sqft',
  badge: 'New',
  config: {
    id: 'programmable-led-sign',
    title: 'Programmable LED Sign',
    subtitle: 'High-visibility programmable LED signs for storefronts.',
    breadcrumb: 'Programmable LED Signs',
    breadcrumbHref: '/programmable-led-signs',
    promoText: 'CUSTOM LED SIGNS - FREE SHIPPING',
    image: '/images/products/main-page/banners_hero_image-oakland-park-printing-ca.png',
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

const lines = registry.split('\n');
const targetLineIndex = lines.findIndex((l, i) => l.includes('products: [') && lines.slice(Math.max(0, i - 40), i).some(x => x.includes('"custom-signs": {')));

if (targetLineIndex !== -1) {
  const isAlreadyThere = lines.slice(targetLineIndex, targetLineIndex + 30).some(l => l.includes('"programmable-led-sign"'));
  if (!isAlreadyThere) {
    const productStr = '      ' + JSON.stringify(productConfig, null, 2).split('\n').join('\n      ') + ',';
    lines.splice(targetLineIndex + 1, 0, productStr);
    fs.writeFileSync('src/lib/productsRegistry.ts', lines.join('\n'));
    console.log('Successfully injected into custom-signs');
  } else {
    console.log('Already exists in custom-signs');
  }
} else {
  console.log('Could not find custom-signs products array');
}
