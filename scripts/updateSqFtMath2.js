const fs = require('fs');
let data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// 1. Change Custom LED Dimension basePrice to 0
data = data.replace(/"label": "Custom LED Dimension",\n\s*"value": "custom",\n\s*"basePrice": 1/g, '"label": "Custom LED Dimension",\n                  "value": "custom",\n                  "basePrice": 0');

// 2. Models: Convert priceMultiplier to priceAdder 
data = data.replace(/"value": "p10",\n\s*"priceMultiplier": 90/g, '"value": "p10",\n                  "priceAdder": 90,\n                  "priceMultiplier": 1');
data = data.replace(/"value": "p5",\n\s*"priceMultiplier": 145/g, '"value": "p5",\n                  "priceAdder": 145,\n                  "priceMultiplier": 1');
data = data.replace(/"value": "p3",\n\s*"priceMultiplier": 220/g, '"value": "p3",\n                  "priceAdder": 220,\n                  "priceMultiplier": 1');

// 3. Waterproof "yes": Convert priceMultiplier 1.2 to priceAdder 20
data = data.replace(/"value": "yes",\n\s*"priceMultiplier": 1.2/g, '"value": "yes",\n                  "priceAdder": 20,\n                  "priceMultiplier": 1');

fs.writeFileSync('src/lib/productsRegistry.ts', data);
console.log('Math logic updated successfully');
