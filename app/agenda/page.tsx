'use client'

import { Users, Clock, MapPin, User } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import StructuredData from "@/components/structured-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from 'next'
import { AGENDA_DATA, getLocalizedText } from '@/lib/data/conference'
import { useI18n } from "@/contexts/i18n-context"
import { 
  generateEventStructuredData, 
  generateBreadcrumbStructuredData 
} from "@/lib/structured-data"

// export const metadata: Metadata = {
//   title: '議程資訊',
//   description: 'DDDTW 2025 議程安排 - 2025年11月8日 AI時代軟體開發方法，包含工作坊與專題演講。',
// }

export default function AgendaPage() {
  const { t, language } = useI18n()
  // 使用統一資料層
  const sessions = AGENDA_DATA

  // 生成結構化資料
  const eventData = generateEventStructuredData(language)
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.agenda') }
  ])

  return (
    <>
      {/* SEO 結構化資料 */}
      <StructuredData data={[eventData, breadcrumbData]} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t("agenda.pageTitle")}</h1>
            <p className="text-lg sm:text-xl text-gray-200">{t("agenda.subtitle")}</p>
          </div>

          {/* Conference Date and Info */}
          <div className="bg-slate-100/95 rounded-lg p-6 backdrop-blur-sm mb-8 shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-slate-700 font-medium">09:00 - 17:00</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
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
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="text-slate-700 font-medium">{t("agenda.participants")}</span>
              </div>
            </div>
          </div>

          {/* Agenda Grid - 2 Columns, 2 Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sessions.map((session, index) => (
              <Card
                key={index}
                className="bg-slate-100/95 border-slate-200 backdrop-blur-sm hover:bg-slate-50 transition-colors shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <span className="text-blue-600 font-semibold mr-auto">{session.time}</span>
                    <div className="flex items-center space-x-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200`}
                      >
                        {t("agenda.talk")}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200`}
                      >
                        {t("agenda.workshop")}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200`}
                      >
                        {t("agenda.techShare")}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-slate-800 text-lg">{getLocalizedText(session.title, language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <User className="w-4 h-4" />
                      <span className="text-xs text-slate-500">{t("agenda.speaker")}:</span>
                      <span className="font-medium">{session.speaker}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs text-slate-500">{t("agenda.track")}:</span>
                      <span>{getLocalizedText(session.track, language)}</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{getLocalizedText(session.description, language)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12">
            <div className="bg-slate-100/95 rounded-lg p-8 backdrop-blur-sm shadow-lg border border-slate-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-700 inline-block pb-2 border-b-2 border-blue-500">{t("agenda.notesTitle")}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/80 rounded-lg p-5 shadow-md border border-slate-100 transform transition-transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-blue-800">{t("agenda.venueAndTime")}</h4>
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{t("agenda.arriveEarly")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{t("agenda.bringLaptop")}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/80 rounded-lg p-5 shadow-md border border-slate-100 transform transition-transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-purple-800">{t("agenda.servicesAndData")}</h4>
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>{t("agenda.refreshments")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>{t("agenda.materials")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </>
  )
}
