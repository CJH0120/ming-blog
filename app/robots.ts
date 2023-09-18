import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/amdin/**',
    },
    sitemap: 'https://www.mmew.site/sitemap.xml',
  }
}
