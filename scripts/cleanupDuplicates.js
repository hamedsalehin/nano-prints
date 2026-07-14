const fs = require('fs');

let data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

data = data.replace(/"priceMultiplier": 1,\n\s*"priceAdder": 0/g, '"priceMultiplier": 1');

fs.writeFileSync('src/lib/productsRegistry.ts', data);
console.log('Cleaned up duplicate priceAdders');
