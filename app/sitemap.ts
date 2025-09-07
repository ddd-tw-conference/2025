import { MetadataRoute } from 'next'
import { CONFIG } from '@/config'

// SPA 模式需要 force-static 配置
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // SPA 模式下的靜態 sitemap (使用統一配置)
  const baseUrl = CONFIG.deployment.baseUrl
  const lastModified = new Date('2025-08-29') // 固定日期，因為是靜態站點

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agenda`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/speakers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transportation`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rules`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
