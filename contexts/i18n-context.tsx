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

  const changeLanguage = (lang: string) => {
    const newMessages = messagesMap[lang] || messagesMap['zh-tw']
    console.log(`Changing language to: ${lang}`)
    console.log('Available keys:', Object.keys(newMessages).slice(0, 10))
    setLanguage(lang)
    setMessages(newMessages)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  // 初始化時載入語言
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language')
      if (stored && stored !== language) {
        changeLanguage(stored)
      }
    }
  }, [])

  const t = (key: string, params?: Record<string, any>): string => {
    const result = messages[key] || key
    console.log(`Translation lookup: "${key}" -> "${result}"`)
    
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

  console.log('I18nProvider render - language:', language, 'messages keys count:', Object.keys(messages).length)

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
