'use client'

import { isEarlyBirdAvailable, TICKET_SALE_CONFIG } from '@/config/tickets'
import { useI18n } from '@/contexts/i18n-context'

export default function TicketMarketingSection() {
  const { t } = useI18n()
  const isEarlyBirdSoldOut = !isEarlyBirdAvailable()

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

        {/* 優惠碼區塊（預留，初期不顯示） */}
        {TICKET_SALE_CONFIG.promoCode?.isVisible && (
          <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
            <p className="text-yellow-200 text-sm mb-2">
              {t('tickets.promoCodeHint')}
            </p>
            <code className="bg-yellow-400/20 text-yellow-100 px-3 py-1 rounded font-mono text-sm">
              {TICKET_SALE_CONFIG.promoCode.code}
            </code>
          </div>
        )}
      </div>
    </section>
  )
}
