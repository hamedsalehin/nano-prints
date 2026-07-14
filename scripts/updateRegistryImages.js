const fs = require('fs');

let registry = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');

// Replace all .png and .jpg paths inside public/images with .webp
registry = registry.replace(/\.png/g, '.webp');
registry = registry.replace(/\.jpg/g, '.webp');
registry = registry.replace(/\.jpeg/g, '.webp');

fs.writeFileSync('src/lib/productsRegistry.ts', registry);
console.log('Updated productsRegistry.ts to use .webp extensions');
