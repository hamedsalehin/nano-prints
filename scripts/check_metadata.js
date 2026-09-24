const fs = require('fs');

const files = [
  'src/app/layout.tsx',
  'src/app/about-us/layout.tsx',
  'src/app/contact-us/layout.tsx',
  'src/app/get-a-quote/layout.tsx',
  'src/app/return-policy/layout.tsx',
  'src/app/faq/page.tsx',
  'src/app/locations/page.tsx',
  'src/app/corporate-pricing/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/projects/page.tsx',
  'src/app/design/metadata.ts',
  'src/app/search/page.tsx',
];

console.log('=== DETAILED SEO METADATA AUDIT ===\n');

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');

  // Extract title and description specifically from metadata block
  let title = 'N/A';
  let desc = 'N/A';

  const metaBlockMatch = content.match(/export const metadata: Metadata = \{([\s\S]*?)\};/);
  if (metaBlockMatch) {
    const metaBlock = metaBlockMatch[1];

    const titleMatch = metaBlock.match(/title:\s*["`']([^"`']+)["`']/);
    if (titleMatch) title = titleMatch[1];

    const descMatch = metaBlock.match(/description:\s*\n?\s*["`']([^"`']+)["`']/);
    if (descMatch) desc = descMatch[1].replace(/\s+/g, ' ').trim();
  }

  const pageName = f.replace('src/app/', '').replace('/layout.tsx', '').replace('/page.tsx', '').replace('/metadata.ts', '') || 'Homepage';

  const tLen = title.length;
  const dLen = desc.length;

  const tStatus = (tLen >= 40 && tLen <= 65) ? '✅ OK' : (tLen > 65 ? '🔴 Too Long' : '🟡 Short');
  const dStatus = (dLen >= 120 && dLen <= 165) ? '✅ OK' : (dLen > 165 ? '🔴 Too Long' : '🟡 Short');

  console.log(`PAGE: ${pageName.toUpperCase()}`);
  console.log(`  TITLE (${tLen} chars) [${tStatus}]: "${title}"`);
  console.log(`  DESC  (${dLen} chars) [${dStatus}]: "${desc}"`);
  console.log('--------------------------------------------------');
});
