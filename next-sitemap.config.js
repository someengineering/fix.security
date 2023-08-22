/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://fix.tt',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // policies: [{ userAgent: '*', allow: '/' }],
    policies: [{ userAgent: '*', disallow: '/' }],
  },
};
