const fs = require('fs');

const staticPages = [
  { path: 'src/app/layout.tsx', page: 'Homepage (Root Layout)' },
  { path: 'src/app/about-us/layout.tsx', page: 'About Us' },
  { path: 'src/app/contact-us/layout.tsx', page: 'Contact Us' },
  { path: 'src/app/get-a-quote/layout.tsx', page: 'Get A Quote' },
  { path: 'src/app/return-policy/layout.tsx', page: 'Return Policy' },
  { path: 'src/app/faq/page.tsx', page: 'FAQ' },
  { path: 'src/app/locations/page.tsx', page: 'Locations Directory' },
  { path: 'src/app/corporate-pricing/page.tsx', page: 'Corporate Pricing' },
  { path: 'src/app/blog/page.tsx', page: 'Blog Index' },
  { path: 'src/app/projects/page.tsx', page: 'Projects / Portfolio' },
  { path: 'src/app/design/metadata.ts', page: 'Design Studio' },
  { path: 'src/app/search/page.tsx', page: 'Search' },
];

console.log("=================================================================");
console.log("        NANO-SIGNS.COM - META DESCRIPTION AUDIT REPORT           ");
console.log("=================================================================\n");

console.log("--- 1. STATIC PAGES META DESCRIPTIONS ---\n");
staticPages.forEach(sp => {
  if (fs.existsSync(sp.path)) {
    const code = fs.readFileSync(sp.path, 'utf8');
    let desc = 'N/A';
    
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('description:')) {
        let raw = lines[i].split('description:')[1].trim();
        if (!raw || raw === '"' || raw === "'") {
          raw = lines[i+1].trim();
        }
        desc = raw.replace(/^["'`]/, '').replace(/["'`],?$/, '').replace(/\s+/g, ' ').trim();
        break;
      }
    }

    const len = desc.length;
    let status = (len >= 120 && len <= 165) ? '✅ Optimal' : (len > 165 ? '🔴 Too Long' : '🟡 Short');
    console.log(`[${sp.page}] (${len} chars) [${status}]`);
    console.log(`  "${desc}"\n`);
  }
});

console.log("--- 2. CATEGORY PAGES META DESCRIPTIONS ---\n");
if (fs.existsSync('src/app/[category]/page.tsx')) {
  const catCode = fs.readFileSync('src/app/[category]/page.tsx', 'utf8');
  const catMapMatch = catCode.match(/const categoryMeta[\s\S]*?=\s*\{([\s\S]*?)\};/);
  if (catMapMatch) {
    const block = catMapMatch[1];
    const catBlocks = block.split('\n  "');
    catBlocks.forEach(cb => {
      const slugMatch = cb.match(/([a-z0-9-]+)"\s*:\s*\{/);
      const descMatch = cb.match(/description:\s*["'`]([^"`']+)["'`]/);
      if (slugMatch && descMatch) {
        const slug = slugMatch[1];
        const desc = descMatch[1];
        const len = desc.length;
        let status = (len >= 120 && len <= 165) ? '✅ Optimal' : (len > 165 ? '🔴 Too Long' : '🟡 Short');
        console.log(`Category [${slug}] (${len} chars) [${status}]`);
        console.log(`  "${desc}"\n`);
      }
    });
  }
}
