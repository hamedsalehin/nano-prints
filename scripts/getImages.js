const https = require('https');

https.get('https://led-signs.us', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const images = data.match(/<img[^>]+src="([^"]+)"/g) || [];
    const cssImages = data.match(/url\(['"]?([^'"\)]+)['"]?\)/g) || [];
    console.log("Images found:", images.slice(0, 10));
    console.log("CSS Images found:", cssImages.slice(0, 10));
  });
});
