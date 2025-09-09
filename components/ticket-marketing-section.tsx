'use client'

import { useState } from 'react'
import { isEarlyBirdAvailable, TICKET_SALE_CONFIG } from '@/config/tickets'
import { useI18n } from '@/contexts/i18n-context'

export default function TicketMarketingSection() {
  const { t } = useI18n()
  const isEarlyBirdSoldOut = !isEarlyBirdAvailable()
  const [isCopied, setIsCopied] = useState(false)
  const [copyMethod, setCopyMethod] = useState<'success' | 'manual' | null>(null)

  // 複製優惠碼到剪貼簿 - 支援多種方法確保兼容性
  const copyPromoCode = async () => {
    const code = TICKET_SALE_CONFIG.promoCode?.code || ''
    
    try {
      // 方法 1: 現代 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code)
        setIsCopied(true)
        setCopyMethod('success')
        setTimeout(() => {
          setIsCopied(false)
          setCopyMethod(null)
        }, 2000)
        return
      }
      
      // 方法 2: 傳統 execCommand 方法 (fallback)
      const textArea = document.createElement('textarea')
      textArea.value = code
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      
      if (successful) {
        setIsCopied(true)
        setCopyMethod('success')
        setTimeout(() => {
          setIsCopied(false)
          setCopyMethod(null)
        }, 2000)
      } else {
        throw new Error('execCommand failed')
      }
      
    } catch (err) {
      console.error('Failed to copy promo code:', err)
      // 方法 3: 顯示手動複製提示
      setIsCopied(true)
      setCopyMethod('manual')
      setTimeout(() => {
        setIsCopied(false)
        setCopyMethod(null)
      }, 4000) // 手動複製提示顯示更久一點
    }
  }

  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      {/* 早鳥票售罄提示 */}
      {isEarlyBirdSoldOut && (
        <div className="text-center mb-8">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 text-sm font-semibold mb-4 inline-block shadow-lg">
            {t('tickets.earlyBirdSoldOut')}
          </span>
        </div>
      )}

      {/* 一般票行銷區塊 */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t('tickets.regularTitle')}
        </h2>
        <p className="text-xl text-blue-100 mb-6 leading-relaxed">
          {t('tickets.regularPromo')}
        </p>

        {/* 優惠碼區塊 - 點擊複製功能 */}
        {TICKET_SALE_CONFIG.promoCode?.isVisible && (
          <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
            <p className="text-yellow-200 text-sm mb-2">
              {t('tickets.promoCodeHint')}
            </p>
            <div 
              onClick={copyPromoCode}
              className="inline-flex items-center gap-3 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-100 px-4 py-2 rounded font-mono text-sm cursor-pointer transition-all duration-200 hover:scale-105 group"
              title={t('tickets.promoCodeClick')}
            >
              <code className="select-none">
                {TICKET_SALE_CONFIG.promoCode.code}
              </code>
              {isCopied ? (
                <svg 
                  className="w-4 h-4 text-green-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg 
                  className="w-4 h-4 text-yellow-300 group-hover:text-yellow-100 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            {isCopied && (
              <div className="mt-2 animate-fade-in">
                {copyMethod === 'success' ? (
                  <p className="text-green-400 text-xs">
                    {t('tickets.promoCodeCopied')}
                  </p>
                ) : copyMethod === 'manual' ? (
                  <div className="text-yellow-300 text-xs">
                    <p className="font-semibold mb-1">{t('tickets.promoCodeManual')}</p>
                    <p className="font-mono bg-yellow-400/20 px-2 py-1 rounded inline-block select-all">
                      {TICKET_SALE_CONFIG.promoCode?.code}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
