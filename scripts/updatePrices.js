const fs = require('fs');

let data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

data = data.replace(/"value":\s*"p10",\s*"priceMultiplier":\s*100/g, '"value": "p10",\n                  "priceMultiplier": 90');
data = data.replace(/"value":\s*"p5",\s*"priceMultiplier":\s*150/g, '"value": "p5",\n                  "priceMultiplier": 145');
data = data.replace(/"value":\s*"p3",\s*"priceMultiplier":\s*200/g, '"value": "p3",\n                  "priceMultiplier": 220');

// Also update the description price text
data = data.replace(/Starting at \$100\/sqft/g, 'Starting at $90/sqft');

fs.writeFileSync('src/lib/productsRegistry.ts', data);
console.log('Prices updated successfully');
