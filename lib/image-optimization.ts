/**
 * 圖片最佳化工具 - 純WebP策略
 * 所有圖片都已經是WebP格式，簡化路徑管理
 */

import { getImagePath } from '@/lib/paths'

/**
 * 簡化的圖片路徑函數（所有圖片都是WebP）
 * 自動處理WebP路徑
 */
export const getOptimizedImagePath = (imagePath: string): string => {
  // 如果路徑已經是WebP，直接返回
  if (imagePath.endsWith('.webp')) {
    return getImagePath(imagePath)
  }

  // 將舊格式路徑轉換為WebP（為了向後相容）
  const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  return getImagePath(webpPath)
}

/**
 * 取得完整的圖片URL（用於結構化資料）
 */
export const getFullImageUrl = (imagePath: string): string => {
  const optimizedPath = getOptimizedImagePath(imagePath)
  
  // 如果是開發環境，返回相對路徑
  if (process.env.NODE_ENV !== 'production') {
    return optimizedPath
  }

  // 生產環境返回完整URL
  const baseUrl = 'https://ddd-tw-conference.github.io/2025'
  return `${baseUrl}${optimizedPath}`
}
