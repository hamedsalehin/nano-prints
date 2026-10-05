const fs = require('fs');

const files = [
  { name: 'Homepage', file: 'src/app/layout.tsx' },
  { name: 'About Us', file: 'src/app/about-us/layout.tsx' },
  { name: 'Contact Us', file: 'src/app/contact-us/layout.tsx' },
  { name: 'Get a Quote', file: 'src/app/get-a-quote/layout.tsx' },
  { name: 'Locations Directory', file: 'src/app/locations/page.tsx' },
  { name: 'Corporate Pricing', file: 'src/app/corporate-pricing/page.tsx' },
  { name: 'Blog Index', file: 'src/app/blog/page.tsx' },
  { name: 'Projects / Portfolio', file: 'src/app/projects/page.tsx' },
  { name: 'FAQ', file: 'src/app/faq/page.tsx' },
  { name: 'Return Policy', file: 'src/app/return-policy/layout.tsx' },
  { name: 'Design Studio', file: 'src/app/design/metadata.ts' }
];

files.forEach((item, index) => {
  const content = fs.readFileSync(item.file, 'utf8');
  
  let title = '';
  const titleMatch = content.match(/title:\s*["'` constraints]*["'`]/) || content.match(/title:\s*["'` constraints]([^"'` constraints]+)["'` constraints]/) || content.match(/title:\s*["'` constraints](.*?)["'` constraints]/);
  
  // Direct extraction for title
  const titleLine = content.split('\n').find(l => l.includes('title:'));
  if (titleLine) {
    title = titleLine.split('title:')[1].trim().replace(/^["'`]/, '').replace(/["'`],?$/, '').trim();
  }

  let desc = '';
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('description:')) {
      desc = lines[i].split('description:')[1].trim();
      if (!desc || desc === '"' || desc === "'") {
        desc = lines[i+1].trim();
      }
      break;
    }
  }
  desc = desc.replace(/^["'`]/, '').replace(/["'`],?$/, '').trim();

  console.log(`${index + 1}. ${item.name} (${item.file})`);
  console.log(`   TITLE (${title.length} chars): "${title}"`);
  console.log(`   DESC  (${desc.length} chars): "${desc}"`);
  console.log('');
});
