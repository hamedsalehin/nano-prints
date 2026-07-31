const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = '854cf68bc1ae44b2baf32093760cc3a9';
const HOST = 'nano-signs.com';
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

// Read sitemap / registry or fetch sitemap directly
async function main() {
  console.log(`Starting IndexNow submission for ${HOST}...`);
  console.log(`Key Location: ${KEY_LOCATION}`);

  // Construct list of main URLs to submit
  let urls = [
    `${BASE_URL}/`,
    `${BASE_URL}/about-us`,
    `${BASE_URL}/contact-us`,
    `${BASE_URL}/return-policy`,
    `${BASE_URL}/get-a-quote`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/projects`,
    `${BASE_URL}/locations`,
    `${BASE_URL}/design`,
    `${BASE_URL}/faq`,
    `${BASE_URL}/corporate-pricing`,
    `${BASE_URL}/locations/sign-shop`,
    `${BASE_URL}/locations/neon-led-signs`,
    `${BASE_URL}/locations/programmable-led-signs`,
    `${BASE_URL}/locations/roll-up-banners`,
  ];

  // Try loading registries if available
  try {
    const productsRegistryPath = path.join(__dirname, '../src/lib/productsRegistry.ts');
    if (fs.existsSync(productsRegistryPath)) {
      const content = fs.readFileSync(productsRegistryPath, 'utf8');
      const matches = content.match(/"id":\s*"([^"]+)"/g) || content.match(/id:\s*"([^"]+)"/g);
      if (matches) {
        matches.forEach(m => {
          const id = m.replace(/"?id"?:\s*"/, '').replace('"', '');
          // We can add product pages if needed
        });
      }
    }
  } catch (err) {
    console.warn('Could not read product registry directly, using core URLs.');
  }

  // Remove duplicates
  urls = [...new Set(urls)];

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log(`IndexNow HTTP Status: ${response.status} ${response.statusText}`);
    if (response.ok || response.status === 200 || response.status === 202) {
      console.log('Successfully submitted URLs to IndexNow!');
    } else {
      const text = await response.text();
      console.log(`Response output: ${text}`);
    }
  } catch (error) {
    console.error('Error submitting to IndexNow:', error);
  }
}

main();
