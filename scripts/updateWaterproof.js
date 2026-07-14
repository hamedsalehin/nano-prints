const fs = require('fs');

let data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

data = data.replace(/"value":\s*"yes",\s*"priceMultiplier":\s*1.1/g, '"value": "yes",\n                  "priceMultiplier": 1.2');

fs.writeFileSync('src/lib/productsRegistry.ts', data);
console.log('Waterproof multiplier updated successfully');
