import { CONFIG } from './config'

// SPA 模式專用路徑工具函數
export const getBasePath = (): string => {
  const basePath = CONFIG.deployment.basePath
  
  try {
    // SPA 模式下，優先檢查客戶端環境
    if (typeof window !== 'undefined') {
      // 1. 檢查 Next.js 注入的 basePath (SPA export 時會注入)
      const nextData = (window as typeof window & { __NEXT_DATA__?: { basePath?: string } }).__NEXT_DATA__
      if (nextData?.basePath) {
        return nextData.basePath
      }
      
      // 2. 從當前 URL 自動偵測 basePath (適用於 GitHub Pages)
      const pathname = window.location.pathname
      if (pathname.startsWith(`${basePath}/`) || pathname === basePath) {
        return basePath
      }
      
      // 3. 檢查是否在子路徑部署（通用檢測）
      const pathSegments = pathname.split('/').filter(Boolean)
      const expectedSegment = basePath.slice(1) // 移除開頭的 '/'
      if (pathSegments.length > 0 && pathSegments[0] === expectedSegment) {
        return basePath
      }
    }
    
    // SPA 建構時的路徑決策
    return process.env.NODE_ENV === 'production' ? basePath : ''
  } catch (error) {
    // 靜默處理錯誤，回到預設行為
    return process.env.NODE_ENV === 'production' ? basePath : ''
  }
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

// SPA 模式調試輔助
export const getPathInfo = () => {
  if (typeof window === 'undefined') {
    return { basePath: getBasePath(), mode: 'SSR/Build' }
  }
  
  return {
    basePath: getBasePath(),
    currentPath: window.location.pathname,
    nextData: (window as typeof window & { __NEXT_DATA__?: { basePath?: string } }).__NEXT_DATA__?.basePath || 'not found',
    mode: 'SPA'
  }
}
