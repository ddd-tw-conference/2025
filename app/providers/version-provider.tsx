"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { BUILD_VERSION } from "@/lib/version"

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
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const pathname = usePathname()

  const checkVersion = async () => {
    try {
      const response = await fetch("/version.json", { 
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      })
      const data = await response.json()
      
      if (data.version !== BUILD_VERSION) {
        if (isUserInteracting) {
          // 使用者正在互動，靜默更新
          console.log("New version detected during interaction")
        } else {
          // 使用者停留同頁，顯示提示
          setHasNewVersion(true)
          setIsDismissed(false)
        }
      }
    } catch (error) {
      console.warn("Version check failed:", error)
    }
  }

  // 定時檢查版本
  useEffect(() => {
    checkVersion()
    const interval = setInterval(checkVersion, 3 * 60 * 1000) // 3分鐘
    return () => clearInterval(interval)
  }, []) // 移除 isUserInteracting 依賴，避免不必要的重新設定

  // 監聽路由變化
  useEffect(() => {
    setIsUserInteracting(true)
    checkVersion()
    
    const timer = setTimeout(() => {
      setIsUserInteracting(false)
    }, 2000) // 2秒後認為互動結束
    
    return () => clearTimeout(timer)
  }, [pathname])

  // 監聽使用者互動
  useEffect(() => {
    const handleUserActivity = () => {
      setIsUserInteracting(true)
      setTimeout(() => setIsUserInteracting(false), 2000)
    }

    window.addEventListener("click", handleUserActivity)
    window.addEventListener("scroll", handleUserActivity)
    
    return () => {
      window.removeEventListener("click", handleUserActivity)
      window.removeEventListener("scroll", handleUserActivity)
    }
  }, [])

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
