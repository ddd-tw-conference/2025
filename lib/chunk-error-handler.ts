/**
 * Chunk Loading 錯誤處理工具
 * 解決長時間瀏覽後的代碼分割載入失敗問題
 * 遵循 DDDTW 2025 規範：配置驅動、多語言支援
 */

import { errorHandler } from './error-handler'

// 類型聲明：擴展 Window 介面以支持 webpack require
declare global {
  interface Window {
    __webpack_require__?: any;
  }
}

export class ChunkErrorHandler {
  private static instance: ChunkErrorHandler
  private retryAttempts: Map<string, number> = new Map()
  private readonly MAX_RETRIES = 3
  private readonly RETRY_DELAY = 1000 // ms

  static getInstance(): ChunkErrorHandler {
    if (!ChunkErrorHandler.instance) {
      ChunkErrorHandler.instance = new ChunkErrorHandler()
    }
    return ChunkErrorHandler.instance
  }

  /**
   * 初始化全域 Chunk Loading 錯誤處理
   */
  initialize(): void {
    // 攔截動態 import 錯誤
    this.interceptDynamicImports()
    
    // 監聽未捕獲的錯誤
    window.addEventListener('error', this.handleResourceError.bind(this))
    
    // 監聽 Promise 拒絕錯誤
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this))
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 ChunkErrorHandler initialized')
    }
  }

  /**
   * 處理資源載入錯誤
   */
  private handleResourceError(event: ErrorEvent): void {
    const target = event.target as HTMLElement
    
    // 檢查是否為 chunk 載入錯誤
    if (this.isChunkLoadError(event)) {
      this.handleChunkError(event.filename || 'unknown-chunk', event.error)
    }
    
    // 檢查是否為 script 標籤錯誤
    if (target?.tagName === 'SCRIPT') {
      const src = (target as HTMLScriptElement).src
      if (src && src.includes('/_next/static/chunks/')) {
        this.handleChunkError(src, new Error('Script loading failed'))
      }
    }
  }

  /**
   * 處理 Promise 拒絕錯誤
   */
  private handlePromiseRejection(event: PromiseRejectionEvent): void {
    const reason = event.reason
    
    // 檢查是否為 ChunkLoadError
    if (reason && this.isChunkLoadError(reason)) {
      event.preventDefault() // 防止錯誤傳播到控制台
      
      const chunkName = this.extractChunkName(reason.message || reason.toString())
      this.handleChunkError(chunkName, reason)
    }
  }

  /**
   * 判斷是否為 Chunk Loading 錯誤
   */
  private isChunkLoadError(error: any): boolean {
    if (!error) return false
    
    const errorMessage = error.message || error.toString()
    const chunkErrorPatterns = [
      /Loading chunk \d+ failed/i,
      /ChunkLoadError/i,
      /Loading CSS chunk/i,
      /Failed to import/i,
      /NetworkError.*chunk/i
    ]
    
    return chunkErrorPatterns.some(pattern => pattern.test(errorMessage))
  }

  /**
   * 從錯誤訊息中提取 chunk 名稱
   */
  private extractChunkName(message: string): string {
    const chunkMatch = message.match(/chunk (\d+)/i)
    if (chunkMatch) {
      return `chunk-${chunkMatch[1]}`
    }
    
    const urlMatch = message.match(/_next\/static\/chunks\/([^?\s]+)/i)
    if (urlMatch) {
      return urlMatch[1]
    }
    
    return 'unknown-chunk'
  }

  /**
   * 處理 Chunk 載入錯誤
   */
  private handleChunkError(chunkName: string, error: any): void {
    const currentRetries = this.retryAttempts.get(chunkName) || 0
    
    // 記錄錯誤
    const appError = errorHandler.createError(
      'CHUNK_LOAD_ERROR',
      `Chunk loading failed: ${chunkName} (attempt ${currentRetries + 1})`,
      {
        chunkName,
        error: error?.message || error?.toString(),
        retries: currentRetries
      }
    )
    errorHandler.logError(appError)
    
    // 如果重試次數未達上限，則重試
    if (currentRetries < this.MAX_RETRIES) {
      this.retryAttempts.set(chunkName, currentRetries + 1)
      
      setTimeout(() => {
        this.retryChunkLoading(chunkName)
      }, this.RETRY_DELAY * (currentRetries + 1)) // 指數退避
      
    } else {
      // 達到最大重試次數，建議使用者重新載入頁面
      this.suggestPageReload(chunkName)
    }
  }

  /**
   * 重試 Chunk 載入
   */
  private retryChunkLoading(chunkName: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Retrying chunk loading: ${chunkName}`)
    }
    
    // 清除相關的快取
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.includes('next-static') || cacheName.includes('chunks')) {
              return caches.delete(cacheName)
            }
          })
        )
      }).catch(() => {
        // 靜默處理快取清理錯誤
      })
    }
  }

  /**
   * 建議用戶重新載入頁面
   */
  private suggestPageReload(chunkName: string): void {
    // 創建一個非阻塞的通知
    const notification = document.createElement('div')
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: 400px;
        text-align: center;
      ">
        <div style="margin-bottom: 8px;">⚠️ 載入錯誤</div>
        <div style="margin-bottom: 12px; font-size: 12px; opacity: 0.9;">
          部分功能可能無法正常運作
        </div>
        <button onclick="window.location.reload()" style="
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          margin-right: 8px;
        ">🔄 重新載入</button>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        ">稍後處理</button>
      </div>
    `
    
    document.body.appendChild(notification)
    
    // 10 秒後自動移除通知
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 10000)
    
    // 重置重試計數
    this.retryAttempts.delete(chunkName)
  }

  /**
   * 攔截動態 import 錯誤
   */
  private interceptDynamicImports(): void {
    // 保存原始的動態 import 函數
    const originalImport = window.__webpack_require__?.cache ? 
      window.__webpack_require__ : 
      null
    
    if (!originalImport) return
    
    // 注入錯誤處理邏輯到 Next.js 的 webpack runtime
    if (typeof window !== 'undefined' && window.__webpack_require__) {
      const originalRequire = window.__webpack_require__
      
      window.__webpack_require__ = function(moduleId: string) {
        try {
          return originalRequire(moduleId)
        } catch (error) {
          if (ChunkErrorHandler.getInstance().isChunkLoadError(error)) {
            ChunkErrorHandler.getInstance().handleChunkError(
              `module-${moduleId}`, 
              error
            )
          }
          throw error
        }
      }
      
      // 複製原始屬性
      Object.keys(originalRequire).forEach(key => {
        (window.__webpack_require__ as any)[key] = (originalRequire as any)[key]
      })
    }
  }

  /**
   * 清理錯誤處理器
   */
  cleanup(): void {
    this.retryAttempts.clear()
    window.removeEventListener('error', this.handleResourceError.bind(this))
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection.bind(this))
  }
}

export const chunkErrorHandler = ChunkErrorHandler.getInstance()

// 自動初始化（僅在瀏覽器環境）
if (typeof window !== 'undefined') {
  // 延遲初始化避免阻塞頁面載入
  setTimeout(() => {
    chunkErrorHandler.initialize()
  }, 1000)
}