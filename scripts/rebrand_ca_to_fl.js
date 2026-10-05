const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['node_modules', '.next', '.git', 'out', 'build', 'dist', '.gemini', 'temp.js'];
const TEXT_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.css', '.txt', '.xml'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.svg'];

// Text replacements (case-sensitive pairs: [from, to])
const TEXT_REPLACEMENTS = [
  // File path references in code (image filenames ending in -ca)
  [/-printing-ca\./g, '-printing-fl.'],
  [/-ca\.(webp|png|jpg|jpeg)/g, '-fl.$1'],
  // Text content replacements
  ['Florida', 'Florida'],
  ['florida', 'florida'],
  ['FLORIDA', 'FLORIDA'],
  ['Florida', 'Florida'],
  ['florida', 'florida'],
  ['FLORIDA', 'FLORIDA'],
  // Abbreviation in text (but NOT in filenames - those are handled above)
  [', FL ', ', FL '],
  [', FL,', ', FL,'],
  ['FL 3', 'FL 3'],  // zip-like patterns
];

// File rename patterns
const FILE_RENAME_PATTERNS = [
  { from: /-printing-ca(\.(webp|png|jpg|jpeg|gif))$/i, to: '-printing-fl$1' },
  { from: /-ca(\.(webp|png|jpg|jpeg|gif))$/i, to: '-fl$1' },
];

let textFilesChanged = 0;
let filesRenamed = 0;
let renamedFiles = {}; // old -> new mapping for reference updates

function getAllFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.includes(entry.name)) {
        getAllFiles(fullPath, results);
      }
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

// Step 1: Rename image files
function renameFiles(rootDir) {
  const allFiles = getAllFiles(rootDir);
  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!IMAGE_EXTS.includes(ext)) continue;
    
    const dir = path.dirname(filePath);
    const base = path.basename(filePath);
    let newBase = base;
    
    for (const pattern of FILE_RENAME_PATTERNS) {
      if (pattern.from.test(newBase)) {
        newBase = newBase.replace(pattern.from, pattern.to);
        break;
      }
    }
    
    if (newBase !== base) {
      const newPath = path.join(dir, newBase);
      if (!fs.existsSync(newPath)) {
        fs.renameSync(filePath, newPath);
        renamedFiles[base] = newBase;
        filesRenamed++;
        console.log(`  RENAMED: ${base} -> ${newBase}`);
      } else {
        console.log(`  SKIP (exists): ${newBase}`);
      }
    }
  }
}

// Step 2: Update text content in code files
function updateTextFiles(rootDir) {
  const allFiles = getAllFiles(rootDir);
  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!TEXT_EXTS.includes(ext)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const original = content;
    
    for (const [from, to] of TEXT_REPLACEMENTS) {
      if (typeof from === 'string') {
        if (content.includes(from)) {
          content = content.split(from).join(to);
          changed = true;
        }
      } else {
        // regex
        if (from.test(content)) {
          from.lastIndex = 0;
          content = content.replace(from, to);
          changed = true;
        }
      }
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      textFilesChanged++;
      console.log(`  UPDATED: ${path.relative(rootDir, filePath)}`);
    }
  }
}

const rootDir = path.resolve(__dirname, '..');
console.log('=== Step 1: Renaming image files ===');
renameFiles(rootDir);
console.log(`\nRenamed ${filesRenamed} image files.\n`);

console.log('=== Step 2: Updating text references ===');
updateTextFiles(rootDir);
console.log(`\nUpdated text in ${textFilesChanged} files.\n`);

console.log('=== Done! ===');
