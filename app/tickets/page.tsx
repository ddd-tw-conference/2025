'use client'

import { Metadata } from 'next'
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useI18n } from "@/contexts/i18n-context"

// export const metadata: Metadata = {
//   title: 'DDDTW 2025 - 購票資訊',
//   description: 'DDDTW 2025 AI時代軟體開發方法成果發表會 - 購票資訊',
//   keywords: ['Domain-Driven Design', 'DDD', 'Taiwan', '軟體開發', 'AI', '領域驅動設計', '2025', '購票'],
//   authors: [{ name: 'DDD Taiwan Community' }],
//   creator: 'DDD Taiwan Community',
//   publisher: 'DDD Taiwan Community',
//   robots: 'index, follow',
//   openGraph: {
//     title: 'DDDTW 2025 - 購票資訊',
//     description: 'DDDTW 2025 AI時代軟體開發方法成果發表會 - 購票資訊',
//     url: 'https://ddd-tw-conference.github.io/2025/tickets/',
//     siteName: 'DDDTW 2025',
//     locale: 'zh_TW',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'DDDTW 2025 - 購票資訊',
//     description: 'DDDTW 2025 AI時代軟體開發方法成果發表會 - 購票資訊',
//   }
// }

export default function TicketsPage() {
  const { t } = useI18n()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <Header />

      {/* Hero Section */}
      <main>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span className="text-lg font-medium">2025 / 11 / 08</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t("tickets.title")}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t("tickets.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-20 bg-blue-900/60">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Ticket Options */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Early Bird Ticket */}
              <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-blue-700/30 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Early Bird
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{t("tickets.earlyBird")}</h3>
                    <p className="text-gray-400">{t("tickets.earlyBirdDescription")}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-white">
                      NT$ <span className="text-blue-400">2,000</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <span className="line-through">{t("tickets.originalPrice")}</span>
                      <span className="text-green-400 ml-2 font-semibold">{t("tickets.save")}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.fullDayAccess")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.afternoonTea")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.speakerInteraction")}
                    </li>
                  </ul>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                    {t("tickets.buyEarlyBird")}
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-yellow-400 font-medium">
                      {t("tickets.earlyBirdDeadline")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {t("tickets.limitedQuantity")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Regular Ticket */}
              <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-600/30 transform hover:scale-105 transition-all duration-300">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{t("tickets.regular")}</h3>
                    <p className="text-gray-400">{t("tickets.regularDescription")}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-white">
                      NT$ <span>2,500</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {t("tickets.standardPrice")}
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.fullDayAccess")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.afternoonTea")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.speakerInteraction")}
                    </li>
                  </ul>
                  <button className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                    {t("tickets.buyRegular")}
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-gray-300">
                      {t("tickets.regularAvailable")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Purchase Information */}
              <div className="bg-slate-800/30 rounded-xl p-8 backdrop-blur-sm">
                <h4 className="text-2xl font-semibold text-white mb-6 text-center">{t("tickets.purchaseInfo")}</h4>
                <div className="grid md:grid-cols-3 gap-8 text-gray-300">
                  <div>
                    <h5 className="font-semibold text-white mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.refundPolicy")}
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li>• {t("tickets.refund14Days")}</li>
                      <li>• {t("tickets.refund7Days")}</li>
                      <li>• {t("tickets.refundWithin7")}</li>
                      <li>• {t("tickets.refundProcessTime")}</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.importantNotes")}
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li>• {t("tickets.ticketOnly")}</li>
                      <li>• {t("tickets.note3")}</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      {t("tickets.contactInfo")}
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li>• {t("tickets.anyQuestions")}</li>
                      <li>• Email: {t("tickets.email")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-slate-800/30 rounded-xl p-8 backdrop-blur-sm">
                <h4 className="text-2xl font-semibold text-white mb-6 text-center">{t("tickets.faq")}</h4>
                <div className="space-y-6">
                  <div className="border-b border-slate-600/30 pb-4">
                    <h5 className="font-semibold text-white mb-2">{t("tickets.faq1Question")}</h5>
                    <p className="text-gray-300 text-sm">{t("tickets.faq1Answer")}</p>
                  </div>
                  <div className="border-b border-slate-600/30 pb-4">
                    <h5 className="font-semibold text-white mb-2">{t("tickets.faq2Question")}</h5>
                    <p className="text-gray-300 text-sm">{t("tickets.faq2Answer")}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">{t("tickets.faq3Question")}</h5>
                    <p className="text-gray-300 text-sm">{t("tickets.faq3Answer")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}
