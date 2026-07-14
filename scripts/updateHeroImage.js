const fs = require('fs');
let data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// Find the programmable-led-signs category specifically
let categoryStart = data.indexOf('"programmable-led-signs": {');
if (categoryStart !== -1) {
  let categoryEnd = data.indexOf('} as unknown', categoryStart);
  if (categoryEnd === -1) categoryEnd = data.length;
  
  let block = data.substring(categoryStart, categoryEnd);
  
  // Replace the image URLs in the category config hero section
  block = block.replace(/"heroImage":\s*"[^"]+"/g, '"heroImage": "/images/products/hero4.png"');
  block = block.replace(/"tabletHeroImage":\s*"[^"]+"/g, '"tabletHeroImage": "/images/products/hero4.png"');
  block = block.replace(/"mobileHeroImage":\s*"[^"]+"/g, '"mobileHeroImage": "/images/products/hero4.png"');

  data = data.substring(0, categoryStart) + block + data.substring(categoryEnd);
  
  fs.writeFileSync('src/lib/productsRegistry.ts', data);
  console.log('Category hero images updated successfully');
} else {
  console.log('Could not find programmable-led-signs category');
}
