'use client'

import { useI18n } from "@/contexts/i18n-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/layout/hero-section"
import AboutSection from "@/components/layout/about-section"
import SpeakerCards from "@/components/speaker-cards"
import StructuredData from "@/components/structured-data"
import {
  generateEventStructuredData,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData
} from "@/lib/structured-data"

export default function ConferencePage() {
  const { language } = useI18n()

  // 生成結構化資料
  const structuredData = [
    generateEventStructuredData(language),
    generateOrganizationStructuredData(language),
    generateWebsiteStructuredData(language)
  ]

  return (
    <>
      {/* SEO 結構化資料 */}
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
        <Header />

        {/* 為桌面模式固定 Header 添加頂部間距 */}
        <div className="hidden md:block h-20"></div>

        {/* 桌面版懸浮 Speaker 卡片 - 固定在右側 */}
        <div className="hidden xl:block fixed right-4 top-32 z-30 w-80">
          <div className="floating-speaker-cards">
            <SpeakerCards />
          </div>
        </div>

        {/* Hero Section with Full-width Banner */}
        <main id="main-content">
          <HeroSection />

          {/* 手機版和平板版 Speaker 卡片 - 在 Hero 後立即顯示 */}
          <div className="block xl:hidden">
            <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 py-8">
              <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {language === 'zh-tw' ? '精選講者' : 'Featured Speakers'}
                  </h2>
                </div>
                <SpeakerCards />
              </div>
            </div>
          </div>

          {/* About Section */}
          <AboutSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
