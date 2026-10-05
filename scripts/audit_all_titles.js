const fs = require('fs');
const path = require('path');

console.log("=================================================================");
console.log("          NANO-SIGNS.COM - COMPLETE TITLE AUDIT REPORT           ");
console.log("=================================================================\n");

// Helper to recursively find files
function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 1. Static Routes & Layout Metadata
console.log("--- 1. STATIC PAGES & METADATA AUDIT ---\n");

const appFiles = getFiles('src/app');
const metaFiles = appFiles.filter(f => f.endsWith('page.tsx') || f.endsWith('layout.tsx') || f.endsWith('metadata.ts'));

const staticResults = [];

metaFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = file.replace(/\\/g, '/');
  
  // Extract export const metadata
  let title = null;
  let titleTemplate = null;

  // Check static metadata object
  const metaMatch = content.match(/export const metadata(?:\s*:\s*Metadata)?\s*=\s*\{([\s\S]*?)\n\};/);
  if (metaMatch) {
    const metaBlock = metaMatch[1];
    
    // Check title object or string
    const titleObjMatch = metaBlock.match(/title:\s*\{([\s\S]*?)\}/);
    if (titleObjMatch) {
      const defaultMatch = titleObjMatch[1].match(/default:\s*["'` constraints]*["'`]/) || titleObjMatch[1].match(/default:\s*["'` constraints](.*?)["'` constraints]/) || titleObjMatch[1].match(/default:\s*["'` constraints]([^"`']+)["'` constraints]/);
      const templateMatch = titleObjMatch[1].match(/template:\s*["'` constraints](.*?)["'` constraints]/);
      
      // refined regex
      const dM = titleObjMatch[1].match(/default:\s*["'`]([^"`']+)["'`]/);
      const tM = titleObjMatch[1].match(/template:\s*["'`]([^"`']+)["'`]/);
      
      if (dM) title = dM[1];
      if (tM) titleTemplate = tM[1];
    } else {
      const tMatch = metaBlock.match(/title:\s*["'` constraints]*["'`]/) || metaBlock.match(/title:\s*["'` constraints]([^"`']+)["'` constraints]/) || metaBlock.match(/title:\s*["'` constraints](.*?)["'` constraints]/);
      const simpleTitle = metaBlock.match(/title:\s*["'`]([^"`']+)["'`]/);
      if (simpleTitle) title = simpleTitle[1];
    }
  }

  // Check generateMetadata function
  if (!title && content.includes('generateMetadata')) {
    title = "[Dynamic Metadata / generateMetadata()]";
  }

  if (title) {
    const charCount = title.length;
    let status = '✅ OK';
    if (title.startsWith('[')) {
      status = 'ℹ️ DYNAMIC';
    } else if (charCount < 30) {
      status = '🟡 SHORT (<30)';
    } else if (charCount > 65) {
      status = '🔴 TOO LONG (>65)';
    }

    staticResults.push({
      file: relativePath,
      title: title,
      length: charCount,
      status: status,
      template: titleTemplate
    });
  }
});

console.table(staticResults);

// 2. Dynamic Categories & Products Audit (from productsRegistry.ts)
console.log("\n--- 2. CATEGORY & PRODUCT TITLES AUDIT ---\n");

try {
  // Read productsRegistry file directly to extract category and product titles
  const registryContent = fs.readFileSync('src/lib/productsRegistry.ts', 'utf8');
  
  // Extract categories
  const categories = [];
  const catMatches = registryContent.matchAll(/id:\s*["'` constraints]([^"`']+)["'` constraints][\s\S]*?name:\s*["'` constraints]([^"`']+)["'` constraints][\s\S]*?title:\s*["'` constraints]([^"`']+)["'` constraints]/g);
  
  console.log("CATEGORY TITLES:");
  for (const match of catMatches) {
    const catId = match[1];
    const catName = match[2];
    const catTitle = match[3];
    console.log(` - Category: [${catId}] -> Title: "${catTitle}" (${catTitle.length} chars)`);
  }
  
  // Extract products
  const products = [];
  const prodRegex = /id:\s*["'` constraints]([^"`']+)["'` constraints],?\s*\n?\s*title:\s*["'` constraints]([^"`']+)["'` constraints]/g;
  let pMatch;
  while ((pMatch = prodRegex.exec(registryContent)) !== null) {
    products.push({ id: pMatch[1], title: pMatch[2] });
  }

  console.log(`\nTOTAL PRODUCTS FOUND IN REGISTRY: ${products.length}\n`);

  let countOk = 0;
  let countShort = 0;
  let countLong = 0;

  const productTitleDetails = products.map(p => {
    // Standard site title format usually appends " | Nano Signs" or " Fort Lauderdale, FL"
    const fullSeoTitleCandidate = `${p.title} | Nano Signs Fort Lauderdale`;
    const len = p.title.length;
    const fullLen = fullSeoTitleCandidate.length;

    let status = '✅ Good';
    if (len < 15) status = '🟡 Short Base Title';
    if (fullLen > 65) status = '🔴 Long SEO Title Target';

    if (status.includes('✅')) countOk++;
    else if (status.includes('🟡')) countShort++;
    else countLong++;

    return {
      id: p.id,
      baseTitle: p.title,
      baseLength: len,
      fullSeoTarget: fullSeoTitleCandidate,
      fullLength: fullLen,
      status: status
    };
  });

  console.log("PRODUCT TITLE STATS:");
  console.log(`  Total Products: ${products.length}`);
  console.log(`  Optimal Lengths: ${countOk}`);
  console.log(`  Short Base Titles: ${countShort}`);
  console.log(`  Over 65 Chars with Suffix: ${countLong}\n`);

  console.log("PRODUCT TITLES BREAKDOWN (Sample / List):");
  productTitleDetails.forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.id}] "${p.baseTitle}" (${p.baseLength} chars) => Full target: "${p.fullSeoTarget}" (${p.fullLength} chars) [${p.status}]`);
  });

} catch (err) {
  console.error("Error analyzing productsRegistry.ts:", err.message);
}

// 3. Check for specific dynamic metadata rules in [category]/[product]/page.tsx
console.log("\n--- 3. DYNAMIC METADATA GENERATION RULES AUDIT ---\n");

const categoryProductPage = 'src/app/[category]/[product]/page.tsx';
if (fs.existsSync(categoryProductPage)) {
  const code = fs.readFileSync(categoryProductPage, 'utf8');
  const genMetaMatch = code.match(/export async function generateMetadata[\s\S]*?return\s*\{([\s\S]*?)\};/);
  if (genMetaMatch) {
    console.log("Dynamic Metadata Logic in [category]/[product]/page.tsx:");
    console.log(genMetaMatch[0].substring(0, 500) + '...\n');
  }
}

const categoryPage = 'src/app/[category]/page.tsx';
if (fs.existsSync(categoryPage)) {
  const code = fs.readFileSync(categoryPage, 'utf8');
  const genMetaMatch = code.match(/export async function generateMetadata[\s\S]*?return\s*\{([\s\S]*?)\};/);
  if (genMetaMatch) {
    console.log("Dynamic Metadata Logic in [category]/page.tsx:");
    console.log(genMetaMatch[0].substring(0, 500) + '...\n');
  }
}
