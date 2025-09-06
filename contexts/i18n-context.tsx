'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import zhTwMessages from '../locales/zh-tw.json'
import enMessages from '../locales/en.json'

interface I18nContextType {
  language: string
  messages: Record<string, string>
  changeLanguage: (lang: string) => void
  t: (key: string, params?: Record<string, any>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

// 語言檔案對應表
const messagesMap: Record<string, Record<string, string>> = {
  'zh-tw': zhTwMessages,
  'en': enMessages
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguage] = useState('zh-tw')
  const [messages, setMessages] = useState<Record<string, string>>(zhTwMessages)
  const [mounted, setMounted] = useState(false)

  const changeLanguage = (lang: string) => {
    const newMessages = messagesMap[lang] || messagesMap['zh-tw']
    setLanguage(lang)
    setMessages(newMessages)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  // 等待客戶端 hydration 完成後再載入儲存的語言設定
  useEffect(() => {
    setMounted(true)

    const loadStoredLanguage = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('language')
        if (stored && stored !== language) {
          changeLanguage(stored)
        } else {
          // 如果沒有儲存的語言，檢查瀏覽器語言
          const browserLang = navigator.language.toLowerCase()
          if (browserLang.includes('en') && language !== 'en') {
            changeLanguage('en')
          }
        }
      }
    }

    // 小延遲確保完全 hydration
    setTimeout(loadStoredLanguage, 100)
  }, [])

  const t = (key: string, params?: Record<string, any>): string => {
    const result = messages[key] || key

    // 參數插值
    if (params && typeof result === 'string') {
      return Object.entries(params).reduce(
        (acc, [param, val]) => acc.replace(`{{${param}}}`, String(val)),
        result
      )
    }

    return result
  }

  const contextValue: I18nContextType = {
    language,
    messages,
    changeLanguage,
    t
  }

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
