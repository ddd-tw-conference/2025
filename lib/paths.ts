import { CONFIG } from '@/config'

// SPA 模式專用路徑工具函數 - 修復 hydration 問題
export const getBasePath = (): string => {
  const basePath = CONFIG.deployment.basePath

  // 開發環境總是返回空字串
  if (process.env.NODE_ENV !== 'production') {
    return ''
  }

  // 生產環境返回配置的 basePath
  return basePath
}

// SPA 專用靜態資源路徑
export const getAssetPath = (path: string): string => {
  const basePath = getBasePath()
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // SPA 模式下的路徑組合
  return `${basePath}${cleanPath}`
}

// 圖片資源專用函數（SPA 最佳化）
export const getImagePath = (imageName: string): string => {
  // SPA 模式下，確保圖片路徑正確
  const path = getAssetPath(imageName)

  // 添加固定版本參數破解快取（避免 SSG 時間不一致）
  const version = '20250830001' // 格式：YYYYMMDD + 版本號
  return `${path}?v=${version}`
}

// SPA 路由輔助函數
export const getRoutePath = (route: string): string => {
  const basePath = getBasePath()
  const cleanRoute = route.startsWith('/') ? route : `/${route}`
  return `${basePath}${cleanRoute}`
}

// 客戶端路徑檢測（僅在客戶端執行）
export const getClientBasePath = (): string => {
  if (typeof window === 'undefined') {
    return getBasePath()
  }

  try {
    // 檢查 Next.js 注入的 basePath
    const nextData = (window as typeof window & { __NEXT_DATA__?: { basePath?: string } }).__NEXT_DATA__
    if (nextData?.basePath) {
      return nextData.basePath
    }

    // 從當前 URL 自動偵測 basePath
    const pathname = window.location.pathname
    const configBasePath = CONFIG.deployment.basePath

    if (pathname.startsWith(`${configBasePath}/`) || pathname === configBasePath) {
      return configBasePath
    }

    // 檢查是否在子路徑部署
    const pathSegments = pathname.split('/').filter(Boolean)
    const expectedSegment = configBasePath.slice(1)
    if (pathSegments.length > 0 && pathSegments[0] === expectedSegment) {
      return configBasePath
    }

    return getBasePath()
  } catch {
    return getBasePath()
  }
}
