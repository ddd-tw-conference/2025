'use client'

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CalendarEvent from "@/components/calendar-event"
import { useI18n } from "@/contexts/i18n-context"

export default function TicketsPage() {
  const { t } = useI18n()
  const [] = useState(false)
  const [] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <Header />

      {/* 為桌面模式固定 Header 添加頂部間距 */}
      <div className="hidden md:block h-20"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 relative">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t("tickets.title")}</h1>
            <p className="text-lg sm:text-xl text-gray-200">{t("tickets.subtitle")}</p>
            
            {/* Calendar Icons - only show on desktop in top-right corner */}
            <div className="hidden sm:block absolute top-0 right-0 opacity-80 hover:opacity-100 transition-opacity">
              <CalendarEvent
                eventTitle={t("calendar.eventTitle")}
                eventDescription={t("calendar.eventDescription")}
                location={t("calendar.eventLocation")}
                startDate="2025-11-08"
                startTime="09:00"
                endTime="17:00"
                size="sm"
                iconOnly={true}
                className="flex-row gap-2"
              />
            </div>
          </div>

          {/* Conference Date and Info - hide venue on mobile */}
          <div className="hidden sm:block bg-slate-100/95 rounded-lg p-6 backdrop-blur-sm mb-8 shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span className="text-slate-700 font-medium">{t("hero.date")}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <a
                  href="https://maps.app.goo.gl/JeeWMfDoyFPPmxPi9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 font-medium hover:text-blue-500 transition-colors"
                >
                  {t("agenda.venue")}
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-indigo-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="m22 21-3-3m0 0a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0L16 16l3 3Z"></path>
                </svg>
                <span className="text-slate-700 font-medium">{t("agenda.participants")}</span>
              </div>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="space-y-12">
            {/* Ticket Options */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Regular Ticket - 已售罄，使用黯淡效果 */}
              <div className="bg-slate-800/30 rounded-xl p-8 backdrop-blur-sm border border-slate-600/30 relative overflow-hidden opacity-60">
                {/* 售罄標籤 */}
                <div className="absolute top-0 right-0 bg-gray-600 text-gray-300 px-4 py-1 text-sm font-medium rounded-bl-lg shadow-lg">
                  <span className="relative z-10">{t("tickets.soldOut")}</span>
                </div>
                <div className="space-y-6 relative z-10">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-400 mb-2">{t("tickets.regular")}</h3>
                    <p className="text-gray-500">{t("tickets.regularDescription")}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-gray-400">
                      NT$ <span className="line-through">2,500</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {t("tickets.standardPrice")}
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-500">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.fullDayAccess")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.afternoonTea")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.speakerInteraction")}
                    </li>
                  </ul>
                  {/* 一般票已售罄按鈕 */}
                  <button 
                    disabled
                    className="w-full bg-gray-600 text-gray-300 font-medium py-4 px-6 rounded-lg cursor-not-allowed relative"
                  >
                    {t("tickets.regularSoldOutButton")}
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      {t("tickets.regularSoldOut")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Early Bird Ticket - 移到右邊，使用低調灰暗效果 */}
              <div className="bg-slate-800/30 rounded-xl p-8 backdrop-blur-sm border border-slate-600/30 relative overflow-hidden opacity-60">
                {/* 售罄標籤 */}
                <div className="absolute top-0 right-0 bg-gray-600 text-gray-300 px-4 py-1 text-sm font-medium rounded-bl-lg shadow-lg">
                  <span className="relative z-10">{t("tickets.soldOut")}</span>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-400 mb-2">{t("tickets.earlyBird")}</h3>
                    <p className="text-gray-500">{t("tickets.earlyBirdDescription")}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-gray-400">
                      NT$ <span className="line-through">2,000</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="line-through">{t("tickets.originalPrice")}</span>
                      <span className="text-gray-500 ml-2">{t("tickets.save")}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-500">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.fullDayAccess")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.afternoonTea")}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t("tickets.speakerInteraction")}
                    </li>
                  </ul>
                  {/* 早鳥票已售罄按鈕 */}
                  <button 
                    disabled
                    className="w-full bg-gray-600 text-gray-300 font-medium py-4 px-6 rounded-lg cursor-not-allowed relative"
                  >
                    {t("tickets.earlyBirdSoldOutButton")}
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      {t("tickets.earlyBirdSoldOut")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Section for Mobile - show after tickets */}
            <div className="sm:hidden mt-8">
              <div className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="text-xl font-semibold text-white mb-4 text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17 3a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h14zM3 5v10h14V5H3zm2 2a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z"/>
                  </svg>
                  {t("calendar.addToCalendar")}
                </h4>
                <p className="text-gray-300 text-sm text-center mb-6">
                  {t("calendar.description")}
                </p>
                <div className="flex justify-center">
                  <CalendarEvent
                    eventTitle={t("calendar.eventTitle")}
                    eventDescription={t("calendar.eventDescription")}
                    location={t("calendar.eventLocation")}
                    startDate="2025-11-08"
                    startTime="09:00"
                    endTime="17:00"
                    size="default"
                    iconOnly={true}
                    className="flex-col gap-3"
                  />
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
      </main>

      <Footer />
    </div>
  )
}
