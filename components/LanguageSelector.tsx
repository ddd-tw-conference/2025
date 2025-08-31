'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from '@/contexts/I18nContext'

export const LanguageSelector = () => {
  const { language, changeLanguage } = useI18n()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getLanguageIcon = (lang: string) => {
    switch (lang) {
      case 'zh-tw':
        return '🇹🇼'
      case 'en':
        return '🇺🇸'
      default:
        return '🌐'
    }
  }

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'zh-tw':
        return '繁體中文'
      case 'en':
        return 'English'
      default:
        return 'Language'
    }
  }

  return (
    <div className="relative inline-block z-[60]" ref={dropdownRef}>
      <button 
        className="rounded-full border-2 border-gray-300 hover:border-blue-500 px-3 py-2 flex items-center gap-2 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md bg-white/90 backdrop-blur-sm"
        onClick={() => setOpen(!open)} 
        aria-label="Change language"
      >
        <span className="text-lg">{getLanguageIcon(language)}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 text-gray-600 ${open ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <button 
            className={`w-full py-3 px-4 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3 ${
              language === 'zh-tw' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
            }`}
            onClick={() => { 
              changeLanguage('zh-tw') 
              setOpen(false) 
            }}
          >
            <span className="text-lg">🇹🇼</span>
            <span className="font-medium">繁體中文</span>
          </button>
          <div className="h-px bg-gray-200"></div>
          <button 
            className={`w-full py-3 px-4 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3 ${
              language === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
            }`}
            onClick={() => { 
              changeLanguage('en') 
              setOpen(false) 
            }}
          >
            <span className="text-lg">🇺🇸</span>
            <span className="font-medium">English</span>
          </button>
        </div>
      )}
    </div>
  )
}
