const fs = require('fs');

let data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// Replace the image url for programmable led signs
const oldImage = '/images/products/main-page/banners_hero_image-toronto-printing-ca.png';
const newImage = '/images/products/led_sign_welcome.png';

// Since the old image might be used by banners too, we ONLY want to replace it inside the programmable-led-signs and custom-signs blocks.
// The safest way is to replace it globally where it's associated with LED signs, but wait!
// The old image was used as a placeholder for the entire programmable-led-signs block.
// So let's find the 'programmable-led-signs' category and replace the image there.
let categoryStart = data.indexOf('"programmable-led-signs": {');
if (categoryStart !== -1) {
  let categoryEnd = data.indexOf('} as unknown', categoryStart);
  if (categoryEnd === -1) categoryEnd = data.length;
  
  let block = data.substring(categoryStart, categoryEnd);
  block = block.split(oldImage).join(newImage);
  data = data.substring(0, categoryStart) + block + data.substring(categoryEnd);
}

// Now replace it for the injected product in custom-signs array
let customSignsStart = data.indexOf('"custom-signs": {');
if (customSignsStart !== -1) {
  // we just search for the programmable-led-sign block inside
  let ledSignStart = data.indexOf('"id": "programmable-led-sign"', customSignsStart);
  if (ledSignStart !== -1) {
    let ledSignEnd = data.indexOf('] // End of products', ledSignStart);
    if (ledSignEnd === -1) ledSignEnd = data.indexOf('      },', ledSignStart); // next product
    if (ledSignEnd === -1) ledSignEnd = data.indexOf('    ]', ledSignStart);
    
    let block = data.substring(ledSignStart, ledSignEnd);
    block = block.split(oldImage).join(newImage);
    data = data.substring(0, ledSignStart) + block + data.substring(ledSignEnd);
  }
}

fs.writeFileSync('src/lib/productsRegistry.ts', data);
console.log('Images updated successfully');
