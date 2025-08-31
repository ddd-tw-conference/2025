'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { reportWebVitals as report } from './web-vitals-reporter'

export function reportWebVitals() {
  try {
    // SPA 模式下，使用增強的報告系統
    // 設定不使用 beforeunload 事件，避免權限政策違規
    const reportOptions = {
      reportAllChanges: false, // 只報告最終值，不使用 beforeunload
    }
    
    onCLS(report, reportOptions)     // 累積版面位移
    onINP(report, reportOptions)     // 互動至下一個繪製
    onFCP(report, reportOptions)     // 首次內容繪製
    onLCP(report, reportOptions)     // 最大內容繪製
    onTTFB(report, reportOptions)    // 首位元組時間
  } catch (error) {
    // 靜默處理 Web Vitals 錯誤，避免影響用戶體驗
    if (process.env.NODE_ENV === 'development') {
      console.warn('Web Vitals initialization failed:', error)
    }
  }
}

export function WebVitalsReporter() {
  // 使用 useEffect 確保只在客戶端執行
  useEffect(() => {
    // 只在開發環境啟用 Web Vitals 以避免權限政策違規
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // 延遲執行，確保頁面完全載入
      const timer = setTimeout(() => {
        reportWebVitals()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])
  
  return null
}
