'use client'

import { useI18n } from "@/contexts/i18n-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/layout/hero-section"
import AboutSection from "@/components/layout/about-section"
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

        {/* Hero Section with Full-width Banner */}
        <main id="main-content">
          <HeroSection />

          <AboutSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
