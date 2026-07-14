import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/PrintDesignExperience/',
        '/design/',
        '/checkout/',
        '/account/',
      ],
    },
    sitemap: 'https://nano-signs.com/sitemap.xml',
  };
}
