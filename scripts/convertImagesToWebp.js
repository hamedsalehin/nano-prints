const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertToWebp(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await convertToWebp(fullPath);
    } else if (file.match(/\.(png|jpe?g)$/i)) {
      const parsed = path.parse(fullPath);
      const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

      // Skip if webp already exists
      if (fs.existsSync(webpPath)) {
        console.log(`Skipping ${file}, webp already exists.`);
        continue;
      }

      console.log(`Converting ${fullPath} to webp...`);
      try {
        await sharp(fullPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(webpPath);
        console.log(`Success: ${webpPath}`);
        
        // Optional: delete original if it's over 1MB to save space
        if (stat.size > 1024 * 1024) {
          // Keep it for now just to be safe, or we can replace everything in the code first.
        }
      } catch (err) {
        console.error(`Failed to convert ${fullPath}`, err);
      }
    }
  }
}

convertToWebp(path.join(__dirname, '../public/images'))
  .then(() => console.log('Done converting images'))
  .catch(console.error);
