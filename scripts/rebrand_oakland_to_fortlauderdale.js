/**
 * rebrand_oakland_to_fortlauderdale.js
 *
 * Two-pass transformation:
 *
 * PASS 1 — Primary city rebrand:
 *   "Oakland Park" → "Fort Lauderdale" everywhere in src/
 *
 * PASS 2 — Service area restoration:
 *   Adds "Oakland Park" back into service-area listing contexts so it
 *   appears as a city we SERVE rather than our primary address city.
 *
 * Safe because:
 *   - URL slugs use hyphens ("oakland-park") — NOT affected by space-based replace
 *   - Skips node_modules, .next, .git, build dirs
 */

const fs = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const SRC_DIR  = path.join(ROOT, 'src');

const IGNORE_DIRS = ['node_modules', '.next', '.git', 'out', 'build', 'dist', '.gemini'];
const TEXT_EXTS   = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.css', '.txt'];

// ─── PASS 1: Primary city replacement ─────────────────────────────────────────
const PRIMARY_REPLACEMENTS = [
  [/OAKLAND PARK/g, 'FORT LAUDERDALE'],
  [/Oakland Park/g, 'Fort Lauderdale'],
  [/oakland park/g, 'fort lauderdale'],
];

// ─── PASS 2: Service area restoration ─────────────────────────────────────────
// After pass 1, "Oakland Park" no longer appears anywhere.
// Re-insert it into service-area listing sentences.
// These patterns target common phrasings in metadata / page content.
const SERVICE_AREA_RESTORATIONS = [
  // "serves Fort Lauderdale, Pompano Beach" → "serves Fort Lauderdale, Oakland Park, Pompano Beach"
  [
    /serves Fort Lauderdale,\s*Pompano Beach/g,
    'serves Fort Lauderdale, Oakland Park, Pompano Beach',
  ],
  // "Fort Lauderdale, Pompano Beach, Plantation" → "Fort Lauderdale, Oakland Park, Pompano Beach, Plantation"
  [
    /Fort Lauderdale,\s*Pompano Beach,\s*Plantation/g,
    'Fort Lauderdale, Oakland Park, Pompano Beach, Plantation',
  ],
  // "Fort Lauderdale & Broward County" → "Fort Lauderdale, Oakland Park & Broward County"
  [
    /Fort Lauderdale\s*&\s*Broward County/g,
    'Fort Lauderdale, Oakland Park & Broward County',
  ],
  // "Fort Lauderdale FL & Broward County" → "Fort Lauderdale & Oakland Park FL | Broward County"
  [
    /Fort Lauderdale FL\s*&\s*Broward County/g,
    'Fort Lauderdale & Oakland Park FL | Broward County',
  ],
  // "Nano Signs — Fort Lauderdale's" → keep Fort Lauderdale as primary, add service note separately (leave as-is in descriptions)
  // "in Fort Lauderdale FL" in service descriptions (not address lines) — add Oakland Park
  [
    /in Fort Lauderdale FL\. Pricing/g,
    'in Fort Lauderdale & Oakland Park FL. Pricing',
  ],
  [
    /in Fort Lauderdale FL\. Fast/g,
    'in Fort Lauderdale & Oakland Park FL. Fast',
  ],
  [
    /in Fort Lauderdale FL\. Professional/g,
    'in Fort Lauderdale & Oakland Park FL. Professional',
  ],
  [
    /in Fort Lauderdale FL\. Full/g,
    'in Fort Lauderdale & Oakland Park FL. Full',
  ],
  [
    /in Fort Lauderdale FL\. Premium/g,
    'in Fort Lauderdale & Oakland Park FL. Premium',
  ],
  [
    /in Fort Lauderdale FL\. Indoor/g,
    'in Fort Lauderdale & Oakland Park FL. Indoor',
  ],
  [
    /in Fort Lauderdale FL\. Outdoor/g,
    'in Fort Lauderdale & Oakland Park FL. Outdoor',
  ],
  [
    /in Fort Lauderdale FL\. Any/g,
    'in Fort Lauderdale & Oakland Park FL. Any',
  ],
  [
    /in Fort Lauderdale FL\. Perfect/g,
    'in Fort Lauderdale & Oakland Park FL. Perfect',
  ],
  // Broward County service area descriptions
  [
    /businesses in Fort Lauderdale FL\./g,
    'businesses in Fort Lauderdale & Oakland Park FL.',
  ],
  [
    /businesses in Fort Lauderdale FL\s/g,
    'businesses in Fort Lauderdale & Oakland Park FL ',
  ],
  // "for Fort Lauderdale FL businesses"
  [
    /for Fort Lauderdale FL businesses/g,
    'for Fort Lauderdale & Oakland Park FL businesses',
  ],
  // "Fort Lauderdale FL businesses."
  [
    /Fort Lauderdale FL businesses\./g,
    'Fort Lauderdale & Oakland Park FL businesses.',
  ],
  // footer / address area — keep Fort Lauderdale only (physical address)
  // "Nano Signs — Fort Lauderdale's #1" in meta descriptions
  // cityName in areaServed schema — expand to include both
  [
    /"name": "Fort Lauderdale",\s*"addressRegion": "FL"/g,
    '"name": "Fort Lauderdale & Oakland Park", "addressRegion": "FL"',
  ],
];

let totalFiles = 0;
let changedFiles = 0;
const changeLog = [];

function getAllFiles(dir, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return results; }

  for (const entry of entries) {
    if (IGNORE_DIRS.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, results);
    } else if (TEXT_EXTS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;

  // Pass 1: primary city rebrand
  for (const [pattern, replacement] of PRIMARY_REPLACEMENTS) {
    updated = updated.replace(pattern, replacement);
  }

  // Pass 2: service area restoration
  for (const [pattern, replacement] of SERVICE_AREA_RESTORATIONS) {
    updated = updated.replace(pattern, replacement);
  }

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    const rel = path.relative(ROOT, filePath);
    changeLog.push(rel);
    changedFiles++;
  }
}

console.log('\n🔄  Rebranding: Oakland Park → Fort Lauderdale (primary city)');
console.log('🏙️   Restoring: Oakland Park as service area city\n');
console.log(`📁  Scanning: ${SRC_DIR}\n`);

const files = getAllFiles(SRC_DIR);
totalFiles = files.length;

for (const file of files) {
  processFile(file);
}

console.log(`✅  Done!\n`);
console.log(`   Files scanned : ${totalFiles}`);
console.log(`   Files changed : ${changedFiles}\n`);

if (changeLog.length > 0) {
  console.log('📝  Changed files:');
  for (const f of changeLog) {
    console.log(`   • ${f}`);
  }
}

console.log('\n⚠️   URL slugs (e.g. /locations/oakland-park) were intentionally preserved.');
console.log('⚠️   Physical address lines kept as Fort Lauderdale only (matches Google Business Profile).\n');
