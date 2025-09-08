import { MetadataRoute } from 'next'
import { CONFIG } from '@/config/app'
import { getRoutePath } from '@/lib/paths'

// SPA 模式需要 force-static 配置
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // SPA 模式下的靜態 sitemap (使用統一配置)
  const baseUrl = CONFIG.deployment.baseUrl
  const lastModified = new Date('2025-09-08') // 更新至當前日期

  const pages = [
    { route: '/', changeFrequency: 'monthly', priority: 1 },
    { route: '/about', changeFrequency: 'yearly', priority: 0.8 },
    { route: '/agenda', changeFrequency: 'monthly', priority: 0.9 },
    { route: '/speakers', changeFrequency: 'monthly', priority: 0.9 },
    { route: '/transportation', changeFrequency: 'yearly', priority: 0.7 },
    { route: '/rules', changeFrequency: 'yearly', priority: 0.5 },
  ]

  return pages.map(page => ({
    url: `${baseUrl}${page.route}`,
    lastModified,
    changeFrequency: page.changeFrequency as 'monthly' | 'yearly',
    priority: page.priority,
  }))
}
