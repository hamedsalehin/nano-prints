const fs = require('fs');

let data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// 1. Change basePrice from 1 to 0 for Custom LED Dimension
data = data.replace(/label:\s*['"]Custom LED Dimension['"],\s*value:\s*['"]custom['"],\s*basePrice:\s*1/g, 'label: "Custom LED Dimension", value: "custom", basePrice: 0');

// 2. Change Model values from priceMultiplier to priceAdder
data = data.replace(/"value":\s*"p10",\n\s*"priceMultiplier":\s*90/g, '"value": "p10",\n                  "priceAdder": 90,\n                  "priceMultiplier": 1');
data = data.replace(/"value":\s*"p5",\n\s*"priceMultiplier":\s*145/g, '"value": "p5",\n                  "priceAdder": 145,\n                  "priceMultiplier": 1');
data = data.replace(/"value":\s*"p3",\n\s*"priceMultiplier":\s*220/g, '"value": "p3",\n                  "priceAdder": 220,\n                  "priceMultiplier": 1');

// 3. Change Waterproof Yes from priceMultiplier to priceAdder 20
data = data.replace(/"value":\s*"yes",\n\s*"priceMultiplier":\s*1.2/g, '"value": "yes",\n                  "priceAdder": 20,\n                  "priceMultiplier": 1');

// Ensure priceAdder: 0 is removed or overwritten for models where we just added priceAdder
// Wait, the existing data already has priceAdder: 0 for p10, p5, p3, yes!
// Let's just do a clean targeted replacement.
