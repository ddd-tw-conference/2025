"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
import { BUILD_VERSION } from "@/lib/version"
import { getVersionUrl } from "@/lib/paths"
import { PERFORMANCE_CONFIG } from "@/config/performance"
import { SYSTEM_MESSAGES, SYSTEM_CONFIG } from "@/config/system"

interface VersionContextType {
  hasNewVersion: boolean
  checkVersion: () => void
  dismissNotification: () => void
}

const VersionContext = createContext<VersionContextType>({
  hasNewVersion: false,
  checkVersion: () => {},
  dismissNotification: () => {}
})

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [hasNewVersion, setHasNewVersion] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const lastCheckTimeRef = useRef(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const pathname = usePathname()

  // 如果系統配置禁用版本檢查，則不執行任何操作
  if (!SYSTEM_CONFIG.enableVersionCheck) {
    return (
      <VersionContext.Provider value={{
        hasNewVersion: false,
        checkVersion: () => {},
        dismissNotification: () => {}
      }}>
        {children}
      </VersionContext.Provider>
    )
  }



  // 優化的版本檢查函數 - 加強長時間閒置穩定性
  const checkVersion = useCallback(async () => {
    const now = Date.now()
    // 防止頻繁請求
    if (now - lastCheckTimeRef.current < PERFORMANCE_CONFIG.versionCheck.minInterval) {
      console.log(SYSTEM_MESSAGES.versionCheck.skippedFrequent)
      return
    }
    
    // 取消之前的請求（如果還在進行中）
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    
    // 設定超時處理，避免長時間掛起
    const timeoutId = setTimeout(() => {
      abortController.abort()
    }, PERFORMANCE_CONFIG.versionCheck.timeout)
    
    try {
      lastCheckTimeRef.current = now
      const versionUrl = getVersionUrl()
      console.log(SYSTEM_MESSAGES.versionCheck.checking, versionUrl)
      
      const response = await fetch(versionUrl, { 
        cache: 'no-cache',
        headers: { 
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: abortController.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // 驗證回應資料格式
      if (!data || typeof data.version !== 'string') {
        throw new Error('Invalid version data format')
      }
      
      if (data.version !== BUILD_VERSION) {
        setHasNewVersion(true)
        setIsDismissed(false)
        console.log(SYSTEM_MESSAGES.versionCheck.newVersionDetected, data.version, SYSTEM_MESSAGES.versionCheck.current, BUILD_VERSION)
      } else {
        console.log(SYSTEM_MESSAGES.versionCheck.passed)
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log(SYSTEM_MESSAGES.versionCheck.aborted)
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          console.warn(SYSTEM_MESSAGES.versionCheck.networkError, error.message)
        } else {
          console.warn(SYSTEM_MESSAGES.versionCheck.failed, error.message)
        }
      } else {
        console.warn(SYSTEM_MESSAGES.versionCheck.unknownError, error)
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null
      }
    }
  }, [])

  // 初始檢查 + 定時檢查（加強生命週期管理）
  useEffect(() => {
    let initialTimer: NodeJS.Timeout | null = null
    let interval: NodeJS.Timeout | null = null
    
    // 延遲初始檢查，避免影響頁面載入性能
    initialTimer = setTimeout(() => {
      checkVersion()
    }, PERFORMANCE_CONFIG.versionCheck.initialDelay)
    
    // 定期檢查，減少伺服器負載並提高穩定性
    interval = setInterval(() => {
      // 檢查頁面是否仍然可見，避免後台無用請求
      if (document.visibilityState === 'visible') {
        checkVersion()
      } else {
        console.log(SYSTEM_MESSAGES.versionCheck.pageNotVisible)
      }
    }, PERFORMANCE_CONFIG.versionCheck.periodicInterval)
    
    // 監聽頁面可見性變化，重新檢查版本
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(checkVersion, PERFORMANCE_CONFIG.versionCheck.visibilityDelay)
      }
    }
    
    // 監聽頁面活動恢復事件
    const handleActivityResumed = () => {
      console.log(SYSTEM_MESSAGES.versionCheck.triggeredByActivity)
      setTimeout(checkVersion, PERFORMANCE_CONFIG.versionCheck.activityDelay)
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('page-activity-resumed', handleActivityResumed)
    
    return () => {
      if (initialTimer) clearTimeout(initialTimer)
      if (interval) clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('page-activity-resumed', handleActivityResumed)
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
    }
  }, [checkVersion])

  // 路由變化時檢查（但有嚴格的頻率限制）
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    // 只在頁面可見時才檢查
    if (document.visibilityState === 'visible') {
      timer = setTimeout(() => {
        checkVersion()
      }, PERFORMANCE_CONFIG.versionCheck.routeDelay)
    }
    
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [pathname, checkVersion])

  const dismissNotification = () => {
    setIsDismissed(true)
  }

  return (
    <VersionContext.Provider value={{ 
      hasNewVersion: hasNewVersion && !isDismissed, 
      checkVersion,
      dismissNotification 
    }}>
      {children}
    </VersionContext.Provider>
  )
}

export function useVersion() {
  return useContext(VersionContext)
}
