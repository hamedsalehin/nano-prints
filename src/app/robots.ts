import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/PrintDesignExperience',
          '/PrintDesignExperience/',
          '/PrintDesignExperience/Load',
          '/PrintDesignExperience/Load/',
          '/design/',
          '/checkout/',
          '/account/',
        ],
      },
    ],
    sitemap: 'https://nano-signs.com/sitemap.xml',
  };
}
