'use client'

import { useEffect } from 'react'
import { PERFORMANCE_CONFIG } from '@/config/performance'
import { SYSTEM_MESSAGES, SYSTEM_CONFIG } from '@/config/system'
import { getOptimizedImagePath } from '@/lib/image-optimization'
import { useI18n } from '@/contexts/i18n-context'

/**
 * 資源預載入元件
 * 負責預載入關鍵資源，避免 preload 未使用警告
 */
export function ResourcePreloader() {
  const { t } = useI18n()
  
  // 如果系統配置禁用資源預載入，則不執行任何操作
  if (!SYSTEM_CONFIG.enableResourcePreloader) {
    return null
  }

  useEffect(() => {
    const initializeResources = () => {
      // 使用配置檔案中的關鍵資源清單
      const criticalImages = PERFORMANCE_CONFIG.preload.critical

      criticalImages.forEach(imagePath => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.type = 'image/webp'
        link.href = getOptimizedImagePath(imagePath)
        
        // 添加到 head，確保 preload 資源會被使用
        document.head.appendChild(link)
        
        // 立即創建一個隱藏的 img 元素來確保資源被使用
        const img = new Image()
        img.src = getOptimizedImagePath(imagePath)
        img.style.display = 'none'
        img.onload = () => img.remove()
        img.onerror = () => {
          console.warn(t(SYSTEM_MESSAGES.resourcePreloader.preloadFailed), imagePath)
          img.remove()
        }
      })

      // DNS 預解析
      PERFORMANCE_CONFIG.resourceHints.dnsPrefetch.forEach(domain => {
        const link = document.createElement('link')
        link.rel = 'dns-prefetch'
        link.href = domain
        document.head.appendChild(link)
      })

      // 連線預連結
      PERFORMANCE_CONFIG.resourceHints.preconnect.forEach(domain => {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = domain
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }

    // 延遲初始化以避免阻塞關鍵渲染路徑
    const timer = setTimeout(initializeResources, 100)

    return () => clearTimeout(timer)
  }, [t])

  return null // 這是一個無 UI 的工具元件
}