/**
 * 統一錯誤處理工具
 * 遵循 Vibe-Coding 原則：集中化錯誤管理
 */

import { t } from './i18n'

export interface AppError {
  code: string
  message: string
  details?: unknown
  timestamp: Date
}

export class ErrorHandler {
  private static instance: ErrorHandler
  private errorQueue: AppError[] = []

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  /**
   * 記錄錯誤
   */
  logError(error: AppError): void {
    this.errorQueue.push(error)
    
    // 開發環境下輸出到控制台
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${error.code}] ${error.message}`, error.details)
    }
  }

  /**
   * 創建標準化錯誤
   */
  createError(code: string, message: string, details?: unknown): AppError {
    return {
      code,
      message,
      details,
      timestamp: new Date()
    }
  }

  /**
   * 處理路徑相關錯誤
   */
  handlePathError(error: unknown, context: string, messages?: Record<string, string>): string {
    const errorMessage = messages 
      ? t(messages, 'error.path', { context })
      : `路徑處理錯誤 in ${context}` // fallback
      
    const appError = this.createError(
      'PATH_ERROR',
      errorMessage,
      error
    )
    this.logError(appError)
    
    // 返回安全的預設值
    return process.env.NODE_ENV === 'production' ? '/2025' : ''
  }

  /**
   * 獲取錯誤歷史 (用於調試)
   */
  getErrorHistory(): AppError[] {
    return [...this.errorQueue]
  }

  /**
   * 清空錯誤歷史
   */
  clearErrors(): void {
    this.errorQueue = []
  }
}

export const errorHandler = ErrorHandler.getInstance()
