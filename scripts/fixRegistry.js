const fs = require('fs');

let registry = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// Find the programmable-led-signs category block
let categoryStart = registry.indexOf('"programmable-led-signs": {');
if (categoryStart === -1) process.exit(1);

let categoryEnd = registry.indexOf('} as unknown', categoryStart);
if (categoryEnd === -1) categoryEnd = registry.length;

let block = registry.substring(categoryStart, categoryEnd);

// Find the end of the first product "programmable-led-sign"
// Its ctaLabel is "Add to Cart"
let firstProductEnd = block.indexOf('"ctaLabel": "Add to Cart"');
if (firstProductEnd !== -1) {
  let endOfFirstConfig = block.indexOf('}', firstProductEnd);
  let endOfFirstProduct = block.indexOf('}', endOfFirstConfig + 1);
  
  // Truncate the block after the first product
  let newBlock = block.substring(0, endOfFirstProduct + 1);
  
  const newProducts = [
  {
    id: 'flexible-led-display',
    name: 'Flexible & Curved LED Video Walls',
    description: 'Transform architectural columns, waves, and unique curved surfaces with our bendable soft LED modules. Perfect for immersive retail spaces and creative stage designs.',
    image: '/images/products/flexible-led-display.jpg',
    price: 'Starting at $110/sqft',
    badge: 'Creative Design',
    config: {
      id: 'flexible-led-display',
      title: 'Flexible & Curved LED Video Walls',
      subtitle: 'Break free from flat screens. Bend, curve, and wrap your digital displays around any architectural element.',
      breadcrumb: 'Flexible LED Displays',
      breadcrumbHref: '/programmable-led-signs/flexible-led-display',
      promoText: 'CUSTOM CURVED LED SOLUTIONS',
      image: '/images/products/flexible-led-display.jpg',
      ratingCount: '41',
      ratingScore: '4.9',
      sizes: [ { label: 'Custom Curved Dimension', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [
        {
            q: 'How much can a flexible LED module bend?',
            a: 'Our soft LED modules can bend up to 120 degrees, making them ideal for wrapping around pillars, creating wave-like ceiling installations, or building custom circular displays without compromising pixel integrity.'
        },
        {
            q: 'Are curved LED panels suitable for outdoor use?',
            a: 'While our standard flexible modules are designed for high-end indoor retail and stage use, we do offer specialized IP65-rated flexible panels for outdoor architectural integration. Contact our team for specific outdoor curving requirements.'
        }
      ],
      reviews: [],
      ctaHeading: 'Ready to build a curved display?',
      ctaLabel: 'Request Custom Quote'
    }
  },
  {
    id: 'shop-window-led-display',
    name: 'High-Brightness Storefront LED Posters',
    description: 'Defeat direct sunlight and capture foot traffic with our ultra-bright 5000+ nits window displays. Designed specifically to be visible through retail glass on the sunniest days.',
    image: '/images/products/shop-window-led-display.jpg',
    price: 'Starting at $120/sqft',
    badge: 'Sunlight Readable',
    config: {
      id: 'shop-window-led-display',
      title: 'High-Brightness Storefront LED Posters',
      subtitle: 'Turn your retail window into a dynamic digital canvas that cuts through glare and direct sunlight.',
      breadcrumb: 'Storefront Window LED',
      breadcrumbHref: '/programmable-led-signs/shop-window-led-display',
      promoText: 'ULTRA-BRIGHT WINDOW DISPLAYS',
      image: '/images/products/shop-window-led-display.jpg',
      ratingCount: '87',
      ratingScore: '4.9',
      sizes: [ { label: 'Standard Window Size', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [
        {
            q: 'Will the screen be visible in direct afternoon sunlight?',
            a: 'Absolutely. Standard indoor TVs fade in sunlight because they only output 300-500 nits. Our window-facing LED displays blast at 5,000 to 7,000 nits, ensuring your promotions are crystal clear and vibrant even at high noon.'
        },
        {
            q: 'Does it block the view into my store?',
            a: 'We offer both solid high-brightness panels and transparent LED film options. If you want natural light to enter your store while displaying video, ask about our transparent window series!'
        }
      ],
      reviews: [],
      ctaHeading: 'Want to stop foot traffic in its tracks?',
      ctaLabel: 'Get Window Display Quote'
    }
  },
  {
    id: 'mobile-truck-led-display',
    name: 'Mobile Billboard Truck LED Screens',
    description: 'Ruggedized, weather-proof, and vibration-resistant LED panels engineered specifically for moving vehicles, trailers, and mobile advertising trucks.',
    image: '/images/products/mobile-truck-led-display.jpg',
    price: 'Starting at $130/sqft',
    badge: 'Heavy Duty',
    config: {
      id: 'mobile-truck-led-display',
      title: 'Mobile Billboard Truck LED Screens',
      subtitle: 'Take your advertising on the road with military-grade vibration resistance and IP67 weatherproofing.',
      breadcrumb: 'Mobile Truck LED',
      breadcrumbHref: '/programmable-led-signs/mobile-truck-led-display',
      promoText: 'VEHICLE MOUNTED LED PANELS',
      image: '/images/products/mobile-truck-led-display.jpg',
      ratingCount: '34',
      ratingScore: '4.8',
      sizes: [ { label: 'Truck Bed Dimension', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [
        {
            q: 'How does the screen handle road vibrations?',
            a: 'Mobile LED screens are built with reinforced structural cabinets, specialized shock-absorbing brackets, and industrial-grade power connectors to ensure continuous operation over potholes, highways, and bumpy terrain.'
        },
        {
            q: 'How do I power the screen on a moving truck?',
            a: 'These screens are powered via onboard ultra-quiet generators or heavy-duty inverter battery banks installed directly into your vehicle chassis, which we can help specify based on the square footage of the screen.'
        }
      ],
      reviews: [],
      ctaHeading: 'Ready to build your mobile billboard?',
      ctaLabel: 'Contact Engineering Team'
    }
  },
  {
    id: 'sphere-led-display',
    name: '360° Spherical LED Globes',
    description: 'A masterpiece of LED engineering. Our spherical displays offer a completely seamless 360-degree viewing angle, perfect for museums, planetariums, and high-end corporate lobbies.',
    image: '/images/products/sphere-led-display.jpg',
    price: 'Custom Pricing',
    badge: 'Premium 360°',
    config: {
      id: 'sphere-led-display',
      title: '360° Spherical LED Globes',
      subtitle: 'Captivate your audience from every possible angle with a seamless, floating digital globe.',
      breadcrumb: 'Spherical LED Globe',
      breadcrumbHref: '/programmable-led-signs/sphere-led-display',
      promoText: 'SEAMLESS 360 DEGREE VIDEO',
      image: '/images/products/sphere-led-display.jpg',
      ratingCount: '12',
      ratingScore: '5.0',
      sizes: [ { label: 'Custom Diameter', value: 'custom', basePrice: 0 } ],
      selects: [],
      faqs: [
        {
            q: 'How do you map video onto a sphere?',
            a: 'Our spherical LED systems come with specialized geometric mapping hardware. You simply upload a standard flat panoramic video, and our controller automatically warps and maps it seamlessly around the globe without distortion.'
        },
        {
            q: 'Can the globe be suspended from the ceiling?',
            a: 'Yes! Our LED spheres are constructed with lightweight aerospace-grade aluminum frames and central rigging points, allowing them to be safely suspended to create a stunning "floating planet" effect.'
        }
      ],
      reviews: [],
      ctaHeading: 'Ready for a show-stopping installation?',
      ctaLabel: 'Request Sphere Pricing'
    }
  }
  ];

  const newProductsString = ',\n' + newProducts.map(p => JSON.stringify(p, null, 6)).join(',\n      ') + '\n    ]\n  }';

  newBlock += newProductsString;

  registry = registry.substring(0, categoryStart) + newBlock + registry.substring(categoryEnd);

  fs.writeFileSync('src/lib/productsRegistry.ts', registry);
  console.log('Fixed syntax error and re-injected products successfully');
} else {
  console.log('Could not find first product');
}
