const fs = require('fs');
const data = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// Find all occurrences of p10
const p10Matches = [...data.matchAll(/"value":\s*"p10"[\s\S]*?\}/g)];
console.log(p10Matches.map(m => m[0]).join('\n\n'));
