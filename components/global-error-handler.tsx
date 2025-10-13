'use client'

import { useEffect } from 'react'
import { chunkErrorHandler } from '@/lib/chunk-error-handler'

/**
 * 全域錯誤處理元件
 * 負責初始化 Chunk Loading 錯誤處理機制
 * 遵循 DDDTW 2025 規範：配置驅動、自動恢復
 */
export function GlobalErrorHandler() {
  useEffect(() => {
    // 初始化 Chunk 錯誤處理器
    chunkErrorHandler.initialize()

    // 清理函數
    return () => {
      chunkErrorHandler.cleanup()
    }
  }, [])

  // 這個元件不渲染任何內容
  return null
}