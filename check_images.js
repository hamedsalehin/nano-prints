const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const imageRegex = /\/images\/[A-Za-z0-9_\-\.\/]+/g;
const allImages = new Set();

walkDir('src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const file = fs.readFileSync(filePath, 'utf8');
    const matches = file.match(imageRegex);
    if (matches) {
      matches.forEach(m => allImages.add(m));
    }
  }
});

let missing = 0;
allImages.forEach(img => {
  const p = path.join('public', img.split('?')[0]);
  if (!fs.existsSync(p)) {
    console.log('Missing:', img);
    missing++;
  }
});
console.log('Total missing images across src:', missing);
