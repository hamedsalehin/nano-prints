const fs = require('fs');
let registry = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// The new products we want to add to the Programmable LED Signs page
const newProducts = [
  {
    id: 'flexible-led-display',
    name: 'Flexible LED Display',
    description: 'Customizable flexible LED panels for curved surfaces.',
    image: '/images/products/flexible-led-display.jpg',
    price: 'Starting at $110/sqft',
    badge: 'Popular',
    config: {
      id: 'flexible-led-display',
      title: 'Flexible LED Display',
      subtitle: 'Create stunning curved and creative displays.',
      breadcrumb: 'Flexible LED',
      breadcrumbHref: '/programmable-led-signs/flexible-led-display',
      promoText: 'CURVED LED PANELS',
      image: '/images/products/flexible-led-display.jpg',
      ratingCount: '24',
      ratingScore: '4.9',
      sizes: [ { label: 'Custom Dimension', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [],
      reviews: [],
      ctaHeading: 'Ready for a flexible design?',
      ctaLabel: 'Contact for Quote'
    }
  },
  {
    id: 'shop-window-led-display',
    name: 'Shop Window LED Display',
    description: 'Ultra-bright LED displays designed for storefront windows.',
    image: '/images/products/shop-window-led-display.jpg',
    price: 'Starting at $120/sqft',
    badge: 'High Brightness',
    config: {
      id: 'shop-window-led-display',
      title: 'Shop Window LED Display',
      subtitle: 'Stand out in direct sunlight with ultra-bright displays.',
      breadcrumb: 'Shop Window LED',
      breadcrumbHref: '/programmable-led-signs/shop-window-led-display',
      promoText: 'HIGH BRIGHTNESS LED',
      image: '/images/products/shop-window-led-display.jpg',
      ratingCount: '52',
      ratingScore: '4.8',
      sizes: [ { label: 'Custom Dimension', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [],
      reviews: [],
      ctaHeading: 'Ready to attract more customers?',
      ctaLabel: 'Contact for Quote'
    }
  },
  {
    id: 'mobile-truck-led-display',
    name: 'Mobile Truck LED Display',
    description: 'Rugged LED displays for mobile billboard trucks.',
    image: '/images/products/mobile-truck-led-display.jpg',
    price: 'Starting at $130/sqft',
    badge: 'Durable',
    config: {
      id: 'mobile-truck-led-display',
      title: 'Mobile Truck LED Display',
      subtitle: 'Take your message on the road with rugged LED displays.',
      breadcrumb: 'Mobile LED',
      breadcrumbHref: '/programmable-led-signs/mobile-truck-led-display',
      promoText: 'MOBILE BILLBOARD LED',
      image: '/images/products/mobile-truck-led-display.jpg',
      ratingCount: '15',
      ratingScore: '4.7',
      sizes: [ { label: 'Custom Dimension', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [],
      reviews: [],
      ctaHeading: 'Ready to go mobile?',
      ctaLabel: 'Contact for Quote'
    }
  },
  {
    id: 'sphere-led-display',
    name: 'Sphere LED Display',
    description: '360-degree spherical LED displays for unique advertising.',
    image: '/images/products/sphere-led-display.jpg',
    price: 'Custom Pricing',
    badge: '360° Viewing',
    config: {
      id: 'sphere-led-display',
      title: 'Sphere LED Display',
      subtitle: 'Captivate audiences from every angle with a 360° spherical display.',
      breadcrumb: 'Sphere LED',
      breadcrumbHref: '/programmable-led-signs/sphere-led-display',
      promoText: '360 DEGREE LED',
      image: '/images/products/sphere-led-display.jpg',
      ratingCount: '8',
      ratingScore: '5.0',
      sizes: [ { label: 'Custom Dimension', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [],
      reviews: [],
      ctaHeading: 'Ready for a 360° impact?',
      ctaLabel: 'Contact for Quote'
    }
  }
];

const newProductsString = newProducts.map(p => JSON.stringify(p, null, 6)).join(',\n      ');

// Find the programmable-led-signs category specifically
let categoryStart = registry.indexOf('"programmable-led-signs": {');
if (categoryStart !== -1) {
  let categoryEnd = registry.indexOf('} as unknown', categoryStart);
  if (categoryEnd === -1) categoryEnd = registry.length;
  
  let block = registry.substring(categoryStart, categoryEnd);
  
  const searchStr = `"ctaLabel": "Add to Cart"\n        }\n      }\n    ]\n  }`;
  if (block.includes(searchStr)) {
    block = block.replace(
      `"ctaLabel": "Add to Cart"\n        }\n      }\n    ]\n  }`, 
      `"ctaLabel": "Add to Cart"\n        }\n      },\n      ${newProductsString}\n    ]\n  }`
    );
  } else {
    console.log("Still could not find the exact closing string!");
  }

  registry = registry.substring(0, categoryStart) + block + registry.substring(categoryEnd);
  
  fs.writeFileSync('src/lib/productsRegistry.ts', registry);
  console.log('Added 4 new products to Programmable LED Signs category');
} else {
  console.log('Could not find programmable-led-signs category');
}
