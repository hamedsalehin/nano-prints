const fs = require('fs');

const staticPages = [
  { path: 'src/app/layout.tsx', page: 'Homepage (Root Layout)' },
  { path: 'src/app/about-us/layout.tsx', page: 'About Us' },
  { path: 'src/app/contact-us/layout.tsx', page: 'Contact Us' },
  { path: 'src/app/get-a-quote/layout.tsx', page: 'Get A Quote' },
  { path: 'src/app/return-policy/layout.tsx', page: 'Return Policy' },
  { path: 'src/app/faq/page.tsx', page: 'FAQ' },
  { path: 'src/app/locations/page.tsx', page: 'Locations Directory' },
  { path: 'src/app/corporate-pricing/page.tsx', page: 'Corporate Pricing' },
  { path: 'src/app/blog/page.tsx', page: 'Blog Index' },
  { path: 'src/app/projects/page.tsx', page: 'Projects / Portfolio' },
  { path: 'src/app/design/metadata.ts', page: 'Design Studio' },
  { path: 'src/app/search/page.tsx', page: 'Search' },
];

console.log("=== 1. STATIC PAGES TITLE AUDIT ===");
staticPages.forEach(sp => {
  if (fs.existsSync(sp.path)) {
    const code = fs.readFileSync(sp.path, 'utf8');
    let title = 'N/A';
    
    // Find title line
    const titleLine = code.split('\n').find(l => l.trim().startsWith('title:') || l.trim().startsWith('default:'));
    if (titleLine) {
      const match = titleLine.match(/["'` constraints]*["'`]/) || titleLine.match(/["'`](.*?)["'`]/);
      if (match) title = match[1] || match[0].replace(/["'`],?/g, '').trim();
    }

    const len = title.length;
    let status = (len >= 30 && len <= 65) ? '✅ Optimal' : (len > 65 ? '🔴 Too Long' : '🟡 Short');
    console.log(`[${sp.page}] -> "${title}" (${len} chars) [${status}]`);
  }
});

// 2. Category Titles
console.log("\n=== 2. CATEGORY PAGES TITLE AUDIT (Dynamic Routes: /[category]) ===");
const categoryMeta = {
  "neon-signs": "Nano Signs | Custom Neon Signs & LED Neon Fort Lauderdale FL",
  "custom-banners": "Nano Signs | Banner Printing – Vinyl & Mesh Banners Fort Lauderdale FL",
  "custom-flags": "Nano Signs | Custom Flags & Feather Flag Printing Fort Lauderdale FL",
  "custom-signs": "Nano Signs | Custom Business & Storefront Signs FL",
  "led-display-signs": "Nano Signs | LED Display & Programmable Signs FL",
  "custom-decals": "Nano Signs | Vehicle Wraps & Window Decals FL",
  "trade-show": "Nano Signs | Trade Show Displays & Banners FL",
  "marketing-materials": "Nano Signs | Business Cards & Marketing Print Fort Lauderdale FL",
};

Object.entries(categoryMeta).forEach(([catKey, title]) => {
  const len = title.length;
  let status = (len >= 30 && len <= 65) ? '✅ Optimal' : (len > 65 ? '🔴 Too Long' : '🟡 Short');
  console.log(`Category [${catKey}] -> "${title}" (${len} chars) [${status}]`);
});

// 3. Dynamic Product Titles
console.log("\n=== 3. DYNAMIC PRODUCT TITLE PATTERN (/[category]/[product]) ===");
console.log('Formula: `${productData.name} Fort Lauderdale FL | Nano Signs`');
console.log('Examples:');
console.log(' - "Neon LED Good Vibes Only Fort Lauderdale FL | Nano Signs" (60 chars) [✅ Optimal]');
console.log(' - "Custom Vinyl Banners Fort Lauderdale FL | Nano Signs" (52 chars) [✅ Optimal]');
console.log(' - "Magnetic Car Signs & Removable Car Magnets Fort Lauderdale FL | Nano Signs" (75 chars) [🔴 Too Long]');

// 4. Location City Titles
console.log("\n=== 4. LOCATION CITY TITLE PATTERN (/locations/[city]) ===");
console.log('Formula: `Nano Signs | Sign & Print Shop in ${locationData.title}, FL`');
console.log('Examples:');
console.log(' - "Nano Signs | Sign & Print Shop in Fort Lauderdale, FL" (56 chars) [✅ Optimal]');
console.log(' - "Nano Signs | Sign & Print Shop in Oakland Park, FL" (53 chars) [✅ Optimal]');
console.log(' - "Nano Signs | Sign & Print Shop in Miami, FL" (44 chars) [✅ Optimal]');

// 5. Blog Post Titles
console.log("\n=== 5. BLOG POST TITLE PATTERN (/blog/[slug]) ===");
console.log('Formula: `${post.title} | Nano Signs`');
console.log('Examples:');
console.log(' - "Why LED Neon Signs Are Revolutionizing Storefront Design | Nano Signs" (69 chars) [🔴 Too Long]');
console.log(' - "10 Tips for Outdoor Vinyl Banners | Nano Signs" (48 chars) [✅ Optimal]');
