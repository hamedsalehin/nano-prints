const fs = require('fs');
let registry = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');
let categoryStart = registry.indexOf('"programmable-led-signs": {');
let categoryEnd = registry.indexOf('} as unknown', categoryStart);
let block = registry.substring(categoryStart, categoryEnd);
console.log(block.substring(block.length - 1000));
