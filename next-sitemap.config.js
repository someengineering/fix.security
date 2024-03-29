/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fix.security',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  exclude: ['*.xml', '*.json', '/blog/preview*'],
  changefreq: 'weekly',
  autoLastmod: false,

  robotsTxtOptions: {
    additionalSitemaps: ['https://fix.security/sitemap.xml'],
    policies: [
      process.env.VERCEL_ENV === 'production'
        ? { userAgent: '*', allow: '/' }
        : { userAgent: '*', disallow: '/' },
      {
        userAgent: '*',
        allow: ['/blog/feed.json'],
        disallow: [
          '/*.json$',
          '/*_buildManifest.js$',
          '/*_middlewareManifest.js$',
          '/*_ssgManifest.js$',
          '/*.js$',
          '/blog/preview/*',
        ],
      },
    ],
  },
};
