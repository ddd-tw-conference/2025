'use client'

import { useEffect, useRef } from 'react'
import { PERFORMANCE_CONFIG } from '@/config/performance'
import { SYSTEM_MESSAGES, SYSTEM_CONFIG } from '@/config/system'
import { useI18n } from '@/contexts/i18n-context'

/**
 * 頁面活動監控工具
 * 處理長時間閒置後的系統恢復
 */
export function PageActivityMonitor() {
  const { t } = useI18n()
  const lastActivityRef = useRef(Date.now())
  const isIdleRef = useRef(false)

  useEffect(() => {
    const updateActivity = () => {
      const now = Date.now()
      const wasIdle = isIdleRef.current
      
      lastActivityRef.current = now
      isIdleRef.current = false
      
      // 如果從閒置狀態恢復，執行恢復操作
      if (wasIdle) {
        console.log(t(SYSTEM_MESSAGES.pageActivity.recovering))
        
        // 觸發自訂事件，讓其他系統知道頁面已恢復活動
        window.dispatchEvent(new CustomEvent('page-activity-resumed', {
          detail: { wasIdleFor: now - lastActivityRef.current }
        }))
      }
    }
    
    const checkIdleState = () => {
      const now = Date.now()
      const idleTime = now - lastActivityRef.current
      
      if (idleTime > PERFORMANCE_CONFIG.monitoring.idleThreshold && !isIdleRef.current) {
        isIdleRef.current = true
        console.log(t(SYSTEM_MESSAGES.pageActivity.enteredIdle))
        
        // 觸發閒置事件
        window.dispatchEvent(new CustomEvent('page-idle', {
          detail: { idleDuration: idleTime }
        }))
      }
    }
    
    // 監聽各種活動事件
    const activityEvents = [
      'mousedown', 'mousemove', 'mouseup',
      'keydown', 'keyup',
      'scroll', 'touchstart', 'touchmove', 'touchend',
      'click', 'focus', 'blur'
    ]
    
    // 頁面可見性變化
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateActivity()
      }
    }
    
    // 網路狀態變化
    const handleOnline = () => {
      console.log(t(SYSTEM_MESSAGES.pageActivity.networkRestored))
      updateActivity()
    }
    
    const handleOffline = () => {
      console.log(t(SYSTEM_MESSAGES.pageActivity.networkLost))
    }
    
    // 註冊事件監聽器
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, true)
    })
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // 定期檢查閒置狀態
    const idleCheckInterval = setInterval(checkIdleState, PERFORMANCE_CONFIG.monitoring.checkInterval)
    
    return () => {
      // 清理事件監聽器
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity, true)
      })
      
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      
      clearInterval(idleCheckInterval)
    }
  }, [t])

  return null // 無 UI 的監控元件
}