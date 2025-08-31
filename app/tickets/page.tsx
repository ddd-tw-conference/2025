'use client'

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CalendarEvent from "@/components/calendar-event"
import { useI18n } from "@/contexts/i18n-context"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { isTicketAvailable, isEarlyBirdAvailable, isRegularTicketAvailable } from "@/lib/ticket-config"

export default function TicketsPage() {
  const { t } = useI18n()
  const [isEarlyBirdDialogOpen, setIsEarlyBirdDialogOpen] = useState(false)
  const [isRegularDialogOpen, setIsRegularDialogOpen] = useState(false)
  
  // 檢查票券販售狀態
  const ticketSaleActive = isTicketAvailable()
  const earlyBirdAvailable = isEarlyBirdAvailable()
  const regularTicketAvailable = isRegularTicketAvailable()

  // 處理購票按鈕點擊
  const handleEarlyBirdClick = () => {
    if (!ticketSaleActive || !earlyBirdAvailable) {
      setIsEarlyBirdDialogOpen(true)
    } else {
      // TODO: 導向到實際的購票頁面
      window.open('https://your-ticket-sales-url.com/early-bird', '_blank')
    }
  }

  const handleRegularTicketClick = () => {
    if (!ticketSaleActive || !regularTicketAvailable) {
      setIsRegularDialogOpen(true)
    } else {
      // TODO: 導向到實際的購票頁面
      window.open('https://your-ticket-sales-url.com/regular', '_blank')
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t("tickets.title")}</h1>
            <p className="text-lg sm:text-xl text-gray-200">{t("tickets.subtitle")}</p>
          </div>

          {/* Conference Date and Info */}
          <div className="bg-slate-100/95 rounded-lg p-6 backdrop-blur-sm mb-8 shadow-lg border border-slate-200">
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
                  {/* 早鳥票購買按鈕 - 根據配置決定是否顯示彈跳視窗 */}
                  {!ticketSaleActive || !earlyBirdAvailable ? (
                    <AlertDialog open={isEarlyBirdDialogOpen} onOpenChange={setIsEarlyBirdDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <button 
                          onClick={handleEarlyBirdClick}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                          {t("tickets.buyEarlyBird")}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 shadow-2xl">
                        <AlertDialogHeader className="text-center">
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                          <AlertDialogTitle className="text-white text-xl font-bold">
                            🎯 {t("tickets.notYetAvailable")}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300 text-base mt-2 leading-relaxed">
                            {t("tickets.notYetAvailableMessage")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-center pt-6">
                          <AlertDialogAction className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                            {t("common.confirm")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <button 
                      onClick={handleEarlyBirdClick}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      {t("tickets.buyEarlyBird")}
                    </button>
                  )}
                  <div className="text-center">
                    <p className="text-sm text-yellow-400 font-medium">
                      {ticketSaleActive && earlyBirdAvailable ? t("tickets.earlyBirdDeadline") : t("tickets.comingSoon")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {ticketSaleActive && earlyBirdAvailable ? t("tickets.limitedQuantity") : t("tickets.stayTuned")}
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
                  {/* 一般票購買按鈕 - 根據配置決定是否顯示彈跳視窗 */}
                  {!ticketSaleActive || !regularTicketAvailable ? (
                    <AlertDialog open={isRegularDialogOpen} onOpenChange={setIsRegularDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <button 
                          onClick={handleRegularTicketClick}
                          className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                          {t("tickets.buyRegular")}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 shadow-2xl">
                        <AlertDialogHeader className="text-center">
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                          <AlertDialogTitle className="text-white text-xl font-bold">
                            {t("tickets.notYetAvailable")}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300 text-base mt-2 leading-relaxed">
                            {t("tickets.notYetAvailableMessage")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-center pt-6">
                          <AlertDialogAction className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                            {t("common.confirm")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <button 
                      onClick={handleRegularTicketClick}
                      className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      {t("tickets.buyRegular")}
                    </button>
                  )}
                  <div className="text-center">
                    <p className="text-sm text-gray-300">
                      {ticketSaleActive && regularTicketAvailable ? t("tickets.regularAvailable") : t("tickets.comingSoon")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Event Section */}
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-8 backdrop-blur-sm border border-blue-700/30">
              <h4 className="text-2xl font-semibold text-white mb-4 text-center flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-blue-400">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                {t("tickets.addToCalendar")}
              </h4>
              <p className="text-gray-300 text-center mb-6">
                {t("tickets.calendarDescription")}
              </p>
              
              {/* Event Details */}
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-semibold text-white">{t("tickets.eventDetails.date")}</span>
                    </div>
                    <p className="text-sm">{t("tickets.eventDetails.dateValue")}</p>
                    <p className="text-sm">{t("tickets.eventDetails.time")}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-semibold text-white">{t("tickets.eventDetails.location")}</span>
                    </div>
                    <p className="text-sm">{t("tickets.eventDetails.locationValue")}</p>
                    <p className="text-xs text-gray-400">{t("tickets.eventDetails.address")}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                      <span className="font-semibold text-white">{t("tickets.eventDetails.eventName")}</span>
                    </div>
                    <p className="text-sm">{t("tickets.eventDetails.eventValue")}</p>
                    <p className="text-xs text-gray-400">{t("tickets.eventDetails.eventSubtitle")}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <CalendarEvent
                  eventTitle={t("calendar.eventTitle")}
                  eventDescription={t("calendar.eventDescription")}
                  location={t("calendar.eventLocation")}
                  startDate="2025-11-08"
                  startTime="09:00"
                  endTime="17:00"
                  size="lg"
                  className="max-w-md w-full"
                />
              </div>
              
              <div className="text-center mt-4">
                <p className="text-xs text-gray-400">
                  {t("tickets.calendarReminder")}
                </p>
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
