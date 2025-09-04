'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { reportWebVitals as report } from './web-vitals-reporter'

export function reportWebVitals() {
  try {
    // 增強的報告系統配置
    const reportOptions = {
      reportAllChanges: false, // 只報告最終值
      durationThreshold: 40,   // INP 最小持續時間 (ms)
    }
    
    onCLS(report, reportOptions)     // 累積版面位移
    onINP(report, reportOptions)     // 互動至下一個繪製 (取代 FID)
    onFCP(report, reportOptions)     // 首次內容繪製
    onLCP(report, reportOptions)     // 最大內容繪製
    onTTFB(report, reportOptions)    // 首位元組時間
    
    // 監聽頁面卸載事件，確保數據完整性
    window.addEventListener('beforeunload', () => {
      // 最後一次數據上報
      const pendingMetrics = localStorage.getItem('dddtw-web-vitals-pending');
      if (pendingMetrics) {
        navigator.sendBeacon('/api/analytics', pendingMetrics);
      }
    });
    
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
    if (typeof window !== 'undefined') {
      // 檢查是否為生產環境且用戶同意追蹤
      const shouldTrack = process.env.NODE_ENV === 'development' || 
                         localStorage.getItem('analytics-consent') === 'true';
      
      if (shouldTrack) {
        // 延遲執行，確保頁面完全載入
        const timer = setTimeout(() => {
          reportWebVitals()
          
          // 監聽路由變化，重新初始化監控
          let currentPath = window.location.pathname;
          const observer = new MutationObserver(() => {
            if (window.location.pathname !== currentPath) {
              currentPath = window.location.pathname;
              // 路由變化時重新啟動監控
              setTimeout(reportWebVitals, 100);
            }
          });
          
          observer.observe(document.body, { 
            childList: true, 
            subtree: true 
          });
          
          return () => observer.disconnect();
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [])
  
  return null
}
