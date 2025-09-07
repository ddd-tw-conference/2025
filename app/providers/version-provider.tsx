"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
import { BUILD_VERSION } from "@/lib/version"
import { getVersionUrl } from "@/lib/paths"

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

  // 優化的版本檢查函數 - 減少頻繁請求
  const checkVersion = useCallback(async () => {
    const now = Date.now()
    // 防止頻繁請求：至少間隔 60 秒才允許下一次檢查
    if (now - lastCheckTimeRef.current < 60 * 1000) {
      console.log("Version check skipped - too frequent")
      return
    }
    
    // 取消之前的請求（如果還在進行中）
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    
    try {
      lastCheckTimeRef.current = now
      const versionUrl = getVersionUrl()
      console.log("Checking version from:", versionUrl)
      
      const response = await fetch(versionUrl, { 
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' },
        signal: abortController.signal
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.version !== BUILD_VERSION) {
        setHasNewVersion(true)
        setIsDismissed(false)
        console.log("New version detected:", data.version, "current:", BUILD_VERSION)
      } else {
        console.log("Version check passed - no update needed")
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("Version check aborted")
      } else {
        console.warn("Version check failed:", error)
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null
      }
    }
  }, [])

  // 初始檢查 + 定時檢查（大幅減少頻率）
  useEffect(() => {
    // 延遲初始檢查，避免影響頁面載入性能
    const initialTimer = setTimeout(() => {
      checkVersion()
    }, 3000) // 3秒後進行初始檢查
    
    // 10分鐘檢查一次，大幅減少頻率
    const interval = setInterval(checkVersion, 10 * 60 * 1000)
    
    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [checkVersion])

  // 路由變化時檢查（但有嚴格的頻率限制）
  useEffect(() => {
    const timer = setTimeout(() => {
      checkVersion()
    }, 5000) // 延遲 5 秒後檢查
    
    return () => clearTimeout(timer)
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
