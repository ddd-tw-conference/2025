import { MetadataRoute } from 'next'
import { CONFIG } from '@/config'

// SPA 模式需要 force-static 配置
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = CONFIG.deployment.baseUrl

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
