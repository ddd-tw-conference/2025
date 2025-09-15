# 第3章：國際化系統

> **本章內容**：多語言架構設計、t() 函式標準、語言資源管理

---

## 🌍 國際化系統設計

### 核心架構
```
國際化系統
├── 語言資源 (locales/*.json)
├── Context 狀態管理
├── useI18n() Hook
└── t() 翻譯函式
```

### 強制使用規範
**所有顯示文字必須透過 t() 函式處理，禁止硬編碼！**

```tsx
// ✅ 正確用法
const { t } = useI18n()
return <h1>{t('page.title')}</h1>

// ❌ 錯誤用法
return <h1>立即購票</h1>
```

---

## � 語言資源管理

### 檔案結構
```
locales/
├── zh-tw.json    # 繁體中文（預設）
└── en.json       # 英文
```

### 資源檔案格式
```json
{
  "common": {
    "submit": "送出",
    "cancel": "取消"
  },
  "nav": {
    "home": "首頁",
    "about": "關於會議",
    "speakers": "講者介紹"
  },
  "page": {
    "home": {
      "title": "DDDTW 2025",
      "heroAction": "立即購票"
    }
  }
}
```
---

## 🔧 使用方式

### 基本用法
```tsx
'use client'

import { useI18n } from '@/hooks/use-i18n'

export const Component = () => {
  const { t, language, changeLanguage } = useI18n()
  
  return (
    <div>
      <h1>{t('page.home.title')}</h1>
      <p>{t('page.home.subtitle')}</p>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  )
}
```

### 語言切換器
```tsx
export const LanguageSelector = () => {
  const { language, changeLanguage } = useI18n()
  
  return (
    <select 
      value={language} 
      onChange={(e) => changeLanguage(e.target.value as Language)}
    >
      <option value="zh-tw">繁體中文</option>
      <option value="en">English</option>
    </select>
  )
}
```

### 實用範例
```tsx
// 按鈕文字
<Button>{t('common.submit')}</Button>

// 導航選單
<Link href="/about">{t('nav.about')}</Link>

// 頁面標題
<h1>{t('page.tickets.title')}</h1>

// 動態內容
{isLoading ? t('common.loading') : t('common.success')}
```

---

**下一章：[第4章 設計系統](./04-design-system.md)**
        "networking": "Networking Breaks",
        "certificate": "Participation Certificate"
      }
    }
  },
  "speakers": {
    "pageTitle": "Speakers",
    "keynoteTitle": "Keynote",
    "sessionTitle": "Sessions",
    "bio": "Biography",
    "session": "Session Topic"
  },
  "tickets": {
    "earlyBirdSoldOut": "🔥 Early Bird Tickets Sold Out!",
    "regularPromo": "Regular tickets are now on sale! Don't miss your chance to join DDDTW 2025!",
    "purchaseNow": "Purchase Now",
    "soldOut": "Sold Out",
    "recommended": "⭐ Recommended",
    "promoCodeHint": "Limited Time Promo Code"
  }
}
```

### 🔑 命名規範

---

## 🌐 多語系處理規範

### 必須規範：所有文字皆用 t() 處理

所有前端顯示文字、按鈕、提示、標題、訊息等，**一律必須透過 `t()` 函式取得**，禁止硬編文字於元件、頁面或 config 內。

#### 標準用法
```tsx
import { useI18n } from '@/contexts/i18n-context'

const { t } = useI18n()

return <h1>{t('page.home.title')}</h1>
```

#### 按鈕範例
```tsx
<button>{t('common.submit')}</button>
```

#### 動態參數範例
```tsx
t('tickets.earlyBirdTitle', { date: '2025/01/01' })
```

#### config 檔案範例
```typescript
// config/tickets.ts
export const TICKET_LABEL = {
  title: t('tickets.title'),
  earlyBird: t('tickets.earlyBirdTitle'),
}
```

#### 錯誤範例（禁止）
```tsx
return <h1>DDD Taiwan 2025</h1> // ❌ 禁止硬編文字
```

---

```typescript
// 階層式命名，使用點號分隔
"page.home.title"           // 頁面 > 首頁 > 標題
"nav.speakers"              // 導航 > 講者頁面
"tickets.earlyBirdTitle"    // 票券 > 早鳥票標題
"common.submit"             // 通用 > 送出按鈕

// 功能模組分組
"speakers.bio"              // 講者模組
"agenda.timeSlot"           // 議程模組
"tickets.features.access"   // 票券模組 > 功能 > 入場權限
```

---

## 🔧 核心實作

### 🎯 Context 提供者

#### contexts/i18n-context.tsx
```tsx
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 支援的語言類型
export type Language = 'zh-tw' | 'en'

// 翻譯函式類型
export type TranslationFunction = (key: string, params?: Record<string, any>) => string

// Context 介面定義
export interface I18nContextType {
  language: Language
  changeLanguage: (lang: Language) => void
  t: TranslationFunction
}

// 語言資源載入
const loadMessages = async (lang: Language) => {
  switch (lang) {
    case 'zh-tw':
      return (await import('../locales/zh-tw.json')).default
    case 'en':
      return (await import('../locales/en.json')).default
    default:
      return (await import('../locales/zh-tw.json')).default
  }
}

// 建立 Context
const I18nContext = createContext<I18nContextType | undefined>(undefined)

// 翻譯函式實作
const createTranslationFunction = (messages: any): TranslationFunction => {
  return (key: string, params?: Record<string, any>) => {
    // 支援巢狀鍵值，如 'page.home.title'
    const keys = key.split('.')
    let value = messages
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key // 返回 key 作為 fallback
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`)
      return key
    }
    
    // 參數替換功能
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }
    
    return value
  }
}

// Provider 元件
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('zh-tw')
  const [messages, setMessages] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  
  // 載入語言資源
  useEffect(() => {
    const loadLanguageMessages = async () => {
      setIsLoading(true)
      try {
        const newMessages = await loadMessages(language)
        setMessages(newMessages)
      } catch (error) {
        console.error('Failed to load language messages:', error)
        // 載入失敗時使用預設語言
        const defaultMessages = await loadMessages('zh-tw')
        setMessages(defaultMessages)
      }
      setIsLoading(false)
    }
    
    loadLanguageMessages()
  }, [language])
  
  // 從 localStorage 讀取儲存的語言偏好
  useEffect(() => {
    const savedLanguage = localStorage.getItem('dddtw-language') as Language
    if (savedLanguage && ['zh-tw', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])
  
  // 語言切換函式
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('dddtw-language', lang)
  }
  
  // 翻譯函式
  const t = createTranslationFunction(messages)
  
  const value: I18nContextType = {
    language,
    changeLanguage,
    t
  }
  
  // 載入中時顯示載入畫面
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">載入中...</div>
      </div>
    )
  }
  
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

// Hook 介面
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
```

### 🔗 Hook 使用介面

#### lib/i18n.ts
```typescript
// 匯出主要介面
export { useI18n, I18nProvider } from '../contexts/i18n-context'
export type { Language, TranslationFunction } from '../contexts/i18n-context'

// 語言資訊常數
export const SUPPORTED_LANGUAGES = [
  { code: 'zh-tw', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
] as const

// 語言檢測工具
export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh-tw'
  
  const browserLang = navigator.language.toLowerCase()
  
  if (browserLang.startsWith('zh-tw') || browserLang.startsWith('zh-hant')) {
    return 'zh-tw'
  }
  
  if (browserLang.startsWith('en')) {
    return 'en'
  }
  
  return 'zh-tw' // 預設語言
}

// 語言名稱取得
export const getLanguageName = (code: Language): string => {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code)
  return lang?.name || code
}
```

---

## 🎨 語言選擇器元件

### 🔘 語言切換按鈕

#### components/language-selector.tsx
```tsx
'use client'

import { useState } from 'react'
import { useI18n, SUPPORTED_LANGUAGES } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export const LanguageSelector = () => {
  const { language, changeLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language)
  
  return (
    <div className="relative">
      {/* 當前語言按鈕 */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:bg-white/10"
      >
        <span>{currentLang?.flag}</span>
        <span className="hidden md:inline">{currentLang?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      
      {/* 語言選項下拉選單 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 ${
                language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 🧩 元件中的使用範例

### 📄 頁面元件範例

#### app/page.tsx - 首頁
```tsx
'use client'

import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const { t } = useI18n()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          {t('page.home.title')}
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          {t('page.home.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
            {t('page.home.heroAction')}
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white">
            {t('page.home.heroSecondary')}
          </Button>
        </div>
      </section>
    </div>
  )
}
```

#### 導航元件範例
```tsx
// components/layout/header.tsx
'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { LanguageSelector } from '@/components/language-selector'

export const Header = () => {
  const { t } = useI18n()
  
  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/speakers', label: t('nav.speakers') },
    { href: '/agenda', label: t('nav.agenda') },
    { href: '/tickets', label: t('nav.tickets') },
    { href: '/transportation', label: t('nav.transportation') }
  ]
  
  return (
    <header className="bg-blue-900/95 backdrop-blur-sm fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          DDDTW 2025
        </Link>
        
        {/* 導航選單 */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-blue-200 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* 語言選擇器 */}
        <LanguageSelector />
      </nav>
    </header>
  )
}
```

---

## 🔄 資料結構多語言支援

### 📊 多語言資料介面

#### lib/types.ts
```typescript
// 多語言內容類型
export type LocalizedContent<T = string> = Record<Language, T>

// 講者資料結構
export interface Speaker {
  id: string
  name: LocalizedContent
  title: LocalizedContent
  bio: LocalizedContent
  avatar: string
  social?: {
    website?: string
    linkedin?: string
    twitter?: string
  }
}

// 議程項目結構
export interface AgendaItem {
  id: string
  time: string
  title: LocalizedContent
  description?: LocalizedContent
  speaker?: string
  type: 'keynote' | 'session' | 'break' | 'panel'
}
```

#### 資料使用範例
```tsx
// components/speaker-card.tsx
interface SpeakerCardProps {
  speaker: Speaker
}

export const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
  const { language } = useI18n()
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <img 
        src={speaker.avatar} 
        alt={speaker.name[language]}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-bold text-center mb-2">
        {speaker.name[language]}
      </h3>
      <p className="text-blue-600 text-center mb-4">
        {speaker.title[language]}
      </p>
      <p className="text-gray-600 text-sm">
        {speaker.bio[language]}
      </p>
    </div>
  )
}
```

---

## 🛠️ 維護與更新

### 📝 新增語言資源

#### 1. 新增翻譯項目
```json
// locales/zh-tw.json
{
  "tickets": {
    "newFeature": "新功能說明",
    "specialOffer": "特別優惠：{{discount}}% 折扣"
  }
}
```

```json
// locales/en.json
{
  "tickets": {
    "newFeature": "New Feature Description",
    "specialOffer": "Special Offer: {{discount}}% Discount"
  }
}
```

#### 2. 使用參數化翻譯
```tsx
const { t } = useI18n()

// 基本翻譯
<h2>{t('tickets.newFeature')}</h2>

// 參數化翻譯
<p>{t('tickets.specialOffer', { discount: 20 })}</p>
```

### 🔍 翻譯檢查工具

#### scripts/check-translations.js
```javascript
const fs = require('fs')

const zhTw = require('../locales/zh-tw.json')
const en = require('../locales/en.json')

function flattenObject(obj, prefix = '') {
  let flattened = {}
  
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key], prefix + key + '.'))
    } else {
      flattened[prefix + key] = obj[key]
    }
  }
  
  return flattened
}

const zhKeys = Object.keys(flattenObject(zhTw))
const enKeys = Object.keys(flattenObject(en))

const missingInEn = zhKeys.filter(key => !enKeys.includes(key))
const missingInZh = enKeys.filter(key => !zhKeys.includes(key))

console.log('📋 翻譯檢查報告')
console.log('=================')
console.log(`繁體中文鍵值數量: ${zhKeys.length}`)
console.log(`英文鍵值數量: ${enKeys.length}`)

if (missingInEn.length > 0) {
  console.log('\n❌ 英文缺少的翻譯:')
  missingInEn.forEach(key => console.log(`  - ${key}`))
}

if (missingInZh.length > 0) {
  console.log('\n❌ 繁體中文缺少的翻譯:')
  missingInZh.forEach(key => console.log(`  - ${key}`))
}

if (missingInEn.length === 0 && missingInZh.length === 0) {
  console.log('\n✅ 所有翻譯完整無缺失！')
}
```

---

## 🚀 效能最佳化

### ⚡ 語言資源最佳化

#### 1. 按需載入
```typescript
// 只載入當前語言資源，減少初始 bundle 大小
const loadMessages = async (lang: Language) => {
  switch (lang) {
    case 'zh-tw':
      return (await import('../locales/zh-tw.json')).default
    case 'en':
      return (await import('../locales/en.json')).default
  }
}
```

#### 2. 快取機制
```typescript
// 加入記憶體快取，避免重複載入
const messageCache = new Map<Language, any>()

const loadMessages = async (lang: Language) => {
  if (messageCache.has(lang)) {
    return messageCache.get(lang)
  }
  
  const messages = await import(`../locales/${lang}.json`)
  messageCache.set(lang, messages.default)
  return messages.default
}
```

### 📊 Bundle 分析
```bash
# 檢查語言資源對 bundle 大小的影響
pnpm add -D @next/bundle-analyzer
ANALYZE=true pnpm build
```

---

**下一章：** [第4章：UI/UX 設計系統](./04-design-system.md) - 深入了解 Tailwind 最佳實踐與元件設計原則
