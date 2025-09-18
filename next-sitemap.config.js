/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.tattooidea.tattoo',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'Slurp',
        allow: '/',
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://www.tattooidea.tattoo'}/sitemap.xml`,
    ],
    host: process.env.SITE_URL || 'https://www.tattooidea.tattoo',
    crawlDelay: 1,
  },
  exclude: ['/protected/*', '/api/*', '/auth/*'],
  changefreq: 'daily',
  priority: 0.8,
  sitemapSize: 7000,
  generateIndexSitemap: true,
  // 针对不同页面设置不同优先级
  transform: async (config, path) => {
    // 高优先级页面
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    
    // 博客页面高优先级
    if (path.startsWith('/blog')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }
    
    // Ambigram生成器页面
    if (path === '/ambigram') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }
    
    // 默认设置
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
} 