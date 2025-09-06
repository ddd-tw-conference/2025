/**
 * i18n 工具函式
 */

// 語言檔案動態載入
export const loadLocale = async (lang: string): Promise<Record<string, string>> => {
  try {
    const messages = await import(`../locales/${lang}.json`)
    return messages.default
  } catch {
    // 靜默回退到預設語言
    const fallback = await import('../locales/zh-tw.json')
    return fallback.default
  }
}

// 初始語言判斷 - 修復 hydration 問題
export const detectLanguage = (): string => {
  // 總是先返回預設語言，避免 hydration 不一致
  return 'zh-tw'
}

// 客戶端語言偵測（僅在客戶端使用）
export const detectClientLanguage = (): string => {
  if (typeof window === 'undefined') {
    return 'zh-tw'
  }

  try {
    const stored = localStorage.getItem('language')
    if (stored) return stored

    const browserLang = navigator.language.toLowerCase()
    if (browserLang.includes('en')) return 'en'
    return 'zh-tw'
  } catch {
    return 'zh-tw'
  }
}

// 翻譯函式
export const t = (messages: Record<string, string>, key: string, params?: Record<string, string>): string => {
  const keys = key.split('.')
  let value: unknown = messages

  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k]
    if (value === undefined) break
  }

  let result = typeof value === 'string' ? value : key // fallback 到 key

  // 參數插值
  if (params && typeof result === 'string') {
    Object.entries(params).forEach(([param, val]) => {
      result = result.replace(`{{${param}}}`, String(val))
    })
  }

  return result
}

// 支援的語言列表
export const SUPPORTED_LANGUAGES = [
  { code: 'zh-tw', name: '繁體中文' },
  { code: 'en', name: 'English' }
] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code']
