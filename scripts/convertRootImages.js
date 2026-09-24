const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convert(filename) {
  const fullPath = path.join(process.cwd(), 'public', filename);
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const webpPath = path.join(process.cwd(), 'public', `${base}.webp`);
  
  console.log(`Converting ${filename}...`);
  await sharp(fullPath).webp({ quality: 80, effort: 6 }).toFile(webpPath);
  console.log(`Successfully created ${base}.webp`);
}

async function run() {
  await convert('Bag signs.jpeg');
  await convert('bag yard signs.png');
  await convert('plastic yard signs.png');
}

run().catch(console.error);
