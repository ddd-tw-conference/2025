'use client'

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useI18n } from "@/contexts/i18n-context"

export default function RulesPage() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header />

      {/* 為桌面模式固定 Header 添加頂部間距 */}
      <div className="hidden md:block h-20"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-12">{t('rules.pageTitle')}</h1>

          {/* Basic Rules Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">{t('rules.basicRules')}</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                {t('rules.welcomeMessage')}
              </p>

              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-semibold text-red-300 mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  {t('rules.noRecordingTitle')}
                </h3>
                <p className="text-red-200 leading-relaxed">
                  <strong>{t('rules.noRecordingContent')}</strong>
                </p>
              </div>

              <p>
                {t('rules.violationBehaviors')}
              </p>

              <p>
                {t('rules.immediateStop')}
              </p>

              <p>{t('rules.consequences')}</p>

              <p>
                {t('rules.reportHarassment')}
              </p>

              <p>{t('rules.expectation')}</p>
            </div>
          </section>

          {/* Information Sharing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">{t('rules.infoSharing')}</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                {t('rules.interactionWelcome')}<strong className="text-red-300">{t('rules.privacyProtection')}</strong>{t('rules.respectPrivacy')}
              </p>

              <p>{t('rules.maintainRights')}</p>
            </div>
          </section>

          {/* Additional Guidelines */}
          <section className="bg-slate-800/30 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">{t('rules.importantReminder')}</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-2 text-lg">🚫</span>
                <strong className="text-red-300">{t('rules.strictlyProhibited')}</strong>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {t('rules.respectAll')}
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {t('rules.noHarassment')}
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {t('rules.maintainCleanliness')}
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {t('rules.contactStaff')}
              </li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="mt-12 text-center">
            <div className="bg-blue-900/30 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">{t('rules.needHelp')}</h3>
              <p className="text-gray-300 mb-4">{t('rules.helpMessage')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <span className="text-gray-300">{t('rules.emergencyContact')}</span>
                <a href="mailto:dddtw2018@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  dddtw2018@gmail.com
                </a>
                <span className="text-gray-300">|</span>
                <span className="text-blue-400">{t('rules.onSiteStaff')}</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
