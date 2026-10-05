const fs = require('fs');
const registry = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

console.log("p10 multiplier matches:");
console.log(registry.match(/"value":\s*"p10",\s*"priceMultiplier":\s*\d+/g));
console.log("p5 multiplier matches:");
console.log(registry.match(/"value":\s*"p5",\s*"priceMultiplier":\s*\d+/g));
console.log("p3 multiplier matches:");
console.log(registry.match(/"value":\s*"p3",\s*"priceMultiplier":\s*\d+/g));
