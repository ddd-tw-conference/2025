'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { reportWebVitals as report } from './web-vitals-reporter'

export function reportWebVitals() {
  // SPA 模式下，使用增強的報告系統
  onCLS(report)     // 累積版面位移
  onINP(report)     // 互動至下一個繪製
  onFCP(report)     // 首次內容繪製
  onLCP(report)     // 最大內容繪製
  onTTFB(report)    // 首位元組時間
}

export function WebVitalsReporter() {
  // 使用 useEffect 確保只在客戶端執行
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 延遲執行，確保頁面完全載入
      const timer = setTimeout(() => {
        reportWebVitals()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])
  
  return null
}
