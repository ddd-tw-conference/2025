'use client'

import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Users } from "lucide-react"
import Image from "next/image"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useI18n } from "@/contexts/i18n-context"
import { getImagePath } from "@/lib/paths"

export default function AboutPage() {
  const { t } = useI18n()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <Header />

      {/* 為桌面模式固定 Header 添加頂部間距 */}
      <div className="hidden md:block h-20"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Community Photo */}
        <div className="mb-12">
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={getImagePath("/images/banners/banner-about.webp")}
              alt="DDD Taiwan Community"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">{t("about.pageTitle")}</h1>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>{t("about.paragraph1")}</p>

            <p>{t("about.paragraph2")}</p>

            <p>{t("about.paragraph3")}</p>

            <p>{t("about.paragraph4")}</p>

            <p className="text-blue-300">{t("about.facebookCallout")}</p>
          </div>

          {/* Call to Action */}
          <div className="pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              asChild
            >
              <a href="https://www.facebook.com/groups/dddtaiwan" target="_blank" rel="noopener noreferrer">
                {t("about.joinFacebookGroup")}
              </a>
            </Button>
          </div>
        </div>

        {/* Community Values */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-800/50 rounded-lg p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t("about.communityExchange")}</h3>
              <p className="text-gray-400">
                {t("about.communityExchangeDesc")}
              </p>
            </div>

            <div className="bg-blue-800/50 rounded-lg p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t("about.knowledgeSharing")}</h3>
              <p className="text-gray-400">
                {t("about.knowledgeSharingDesc")}
              </p>
            </div>

            <div className="bg-blue-800/50 rounded-lg p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t("about.practicalApplication")}</h3>
              <p className="text-gray-400">{t("about.practicalApplicationDesc")}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
