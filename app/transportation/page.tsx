'use client'

import {
  MapPin,
  Car,
  Train,
  Bus,
  Clock,
  Navigation,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useI18n } from "@/contexts/i18n-context"

export default function TransportationPage() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('transportation.pageTitle')}</h1>
            {/* Map Section */}
            <div className="mb-12">
              <Card className="bg-slate-100/95 border-slate-200 backdrop-blur-sm shadow-lg transform transition-transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{t('transportation.venueLocation')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-200/80 rounded-lg p-4 text-center border border-slate-300">
                    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7228.9515234658975!2d121.53071999999999!3d25.051859!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a973462902af%3A0x82542a72815a4f06!2z5Y-w5YyX5biC5ZWG5qWt5pyD!5e0!3m2!1szh-TW!2stw!4v1756032104143!5m2!1szh-TW!2stw"
                        width="100%"
                        height="100%"
                        className="border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="台北市商業會位置地圖"
                      ></iframe>
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      <p className="font-medium text-slate-800 mb-2">{t('transportation.venueAddress')}</p>
                      <p>{t('transportation.fullAddress')}</p>
                      <p className="mt-2">{t('transportation.mapClickHint')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Transportation Methods */}
          <div className="space-y-8">
            {/* Bus */}
            <Card className="bg-slate-100/95 border-slate-200 backdrop-blur-sm shadow-lg transform transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <Bus className="w-6 h-6 text-green-600" />
                  <span>{t('transportation.byBus')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                      <h4 className="text-green-600 font-semibold mb-2">{t('transportation.busStop')}</h4>
                      <p className="text-slate-700 text-sm mb-2">
                        {t('transportation.busRoutes')}
                      </p>
                      <p className="text-slate-600 text-sm">{t('transportation.walkTime')}</p>
                    </div>
                  </div>
                  <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                    <h4 className="text-green-600 font-semibold mb-2">{t('transportation.trafficReminder')}</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {t('transportation.busReminder')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MRT Transportation */}
            <Card className="bg-slate-100/95 border-slate-200 backdrop-blur-sm shadow-lg transform transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <Train className="w-6 h-6 text-blue-600" />
                  <span>{t('transportation.byMRT')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-200/80 rounded-lg p-6 border border-slate-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <h4 className="text-blue-600 font-semibold">{t('transportation.mrtStation')}</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-700 text-sm">
                      <span className="font-medium">{t('transportation.mrtRoutes')}</span>{t('transportation.mrtLines')}
                    </p>
                    <p className="text-slate-700 text-sm">
                      <span className="font-medium">{t('transportation.mrtWalkTime')}</span>{t('transportation.mrtWalkDuration')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driving */}
            <Card className="bg-slate-100/95 border-slate-200 backdrop-blur-sm shadow-lg transform transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <Car className="w-6 h-6 text-purple-600" />
                  <span>{t('transportation.byDriving')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                  <div className="flex items-center space-x-2 mb-3">
                    <Navigation className="w-4 h-4 text-purple-600" />
                    <h4 className="text-purple-600 font-semibold">{t('transportation.navigationAddress')}</h4>
                  </div>
                  <p className="text-slate-700 text-sm mb-2">{t('transportation.drivingAddress')}</p>
                  <p className="text-slate-700 text-sm">
                    {t('transportation.drivingNotes')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Parking Information */}
            <Card className="bg-slate-100/95 border-slate-200 backdrop-blur-sm shadow-lg transform transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <Car className="w-6 h-6 text-orange-600" />
                  <span>{t('transportation.parkingInfo')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                      <h4 className="text-orange-600 font-semibold mb-2">{t('transportation.streetParking')}</h4>
                      <p className="text-slate-700 text-sm">
                        {t('transportation.streetParkingNotes')}
                      </p>
                    </div>
                    <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                      <h4 className="text-orange-600 font-semibold mb-2">{t('transportation.privateParking')}</h4>
                      <p className="text-slate-700 text-sm">{t('transportation.privateParkingNotes')}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                      <h4 className="text-orange-600 font-semibold mb-2">{t('transportation.motorcycleParking')}</h4>
                      <p className="text-slate-700 text-sm">{t('transportation.motorcycleParkingNotes')}</p>
                    </div>
                    <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                      <h4 className="text-orange-600 font-semibold mb-2">{t('transportation.parkingSuggestion')}</h4>
                      <p className="text-slate-700 text-sm">{t('transportation.parkingSuggestionNotes')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Transportation */}
            <Card className="bg-slate-100/95 border-slate-200 backdrop-blur-sm shadow-lg transform transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <Navigation className="w-6 h-6 text-indigo-600" />
                  <span>{t('transportation.recommended')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                    <h4 className="text-indigo-600 font-semibold mb-2">{t('transportation.mrtWalk')}</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-600 font-medium">{t('transportation.advantages')}</span>
                        <span className="text-slate-700">{t('transportation.mrtWalkAdvantages')}</span>
                      </div>
                      <div>
                        <span className="text-red-600 font-medium">{t('transportation.notes')}</span>
                        <span className="text-slate-700">{t('transportation.mrtWalkNotes')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                    <h4 className="text-indigo-600 font-semibold mb-2">{t('transportation.busTransfer')}</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-600 font-medium">{t('transportation.advantages')}</span>
                        <span className="text-slate-700">{t('transportation.busTransferAdvantages')}</span>
                      </div>
                      <div>
                        <span className="text-red-600 font-medium">{t('transportation.notes')}</span>
                        <span className="text-slate-700">{t('transportation.busTransferNotes')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-200/80 rounded-lg p-4 border border-slate-300">
                    <h4 className="text-indigo-600 font-semibold mb-2">{t('transportation.byDriving')}</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-600 font-medium">{t('transportation.advantages')}</span>
                        <span className="text-slate-700">{t('transportation.drivingAdvantages')}</span>
                      </div>
                      <div>
                        <span className="text-red-600 font-medium">{t('transportation.notes')}</span>
                        <span className="text-slate-700">{t('transportation.drivingWarning')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <div className="bg-slate-100/95 rounded-lg p-6 backdrop-blur-sm shadow-lg border border-slate-200 transform transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{t('transportation.importantReminders')}</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-blue-600 font-medium">{t('transportation.practicalTips')}</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• {t('transportation.tip1')}</li>
                    <li>• {t('transportation.tip2')}</li>
                    <li>• {t('transportation.tip3')}</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-blue-600 font-medium">{t('transportation.precautions')}</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• {t('transportation.precaution1')}</li>
                    <li>• {t('transportation.precaution2')}</li>
                    <li>• {t('transportation.precaution3')}</li>
                  </ul>
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
