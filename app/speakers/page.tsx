"use client"

import {
  Twitter,
  Users,
  Building,
  ExternalLink,
  X,
  User,
  MessageSquare,
  Briefcase,
  Award,
  Globe,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import StructuredData from "@/components/structured-data"
import { SPEAKERS_DATA, type Speaker, getLocalizedText, getLocalizedArray } from "@/lib/data"
import { useI18n } from "@/contexts/i18n-context"
import { TopicTitle } from "@/components/topic-title"
import { PromoCodeCopy } from "@/components/promo-code-copy"
import { TICKET_SALE_CONFIG } from "@/config/tickets"
import { 
  generatePersonStructuredData, 
  generateBreadcrumbStructuredData 
} from "@/lib/structured-data"

// 解析 bio 並提取優惠碼
const parseBioWithPromoCode = (bio: string, currentLang: string) => {
  // 正則表達式匹配優惠碼模式
  const promoCodeRegex = /🎫\s*(?:購票優惠：使用優惠碼|Ticket Discount: Use promo code)\s*([A-Z0-9]+)/i
  const match = bio.match(promoCodeRegex)
  
  if (match && match[1]) {
    const promoCode = match[1]
    const beforePromo = bio.substring(0, match.index || 0).trim()
    const promoSection = match[0]
    const afterPromo = bio.substring((match.index || 0) + match[0].length).trim()
    
    return {
      hasPromoCode: true as const,
      promoCode,
      beforeText: beforePromo,
      afterText: afterPromo,
      fullPromoText: promoSection
    }
  }
  
  return {
    hasPromoCode: false as const,
    fullText: bio
  }
}

export default function SpeakersPage() {
  const { t, language } = useI18n()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isFromHomepage, setIsFromHomepage] = useState(false) // 記錄是否從首頁進入
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 使用統一的數據層，避免重複程式碼
  const speakersByTopic = SPEAKERS_DATA

  // 主題導航函數
  const navigateToTopic = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (activeTab - 1 + speakersByTopic.length) % speakersByTopic.length
      : (activeTab + 1) % speakersByTopic.length

    setActiveTab(newIndex)

    // 滾動到對應的主題標籤居中位置 (考慮循環結構)
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      // 真實的目標索引 = 原始索引 + 1 (因為前面有一個重複項)
      const realTargetIndex = newIndex + 1
      const targetButton = container.children[realTargetIndex] as HTMLElement
      if (targetButton) {
        const containerWidth = container.clientWidth
        const buttonWidth = targetButton.clientWidth
        const buttonLeft = targetButton.offsetLeft
        const scrollLeft = buttonLeft - (containerWidth - buttonWidth) / 2

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }

  // 創建循環數組：[最後一個] + [所有主題] + [第一個]
  const createCircularTopics = () => {
    if (speakersByTopic.length === 0) return []

    const lastTopic = speakersByTopic[speakersByTopic.length - 1]
    const firstTopic = speakersByTopic[0]

    return [
      { ...lastTopic, isClone: true, originalIndex: speakersByTopic.length - 1 },
      ...speakersByTopic.map((topic, index) => ({ ...topic, isClone: false, originalIndex: index })),
      { ...firstTopic, isClone: true, originalIndex: 0 }
    ]
  }

  const circularTopics = createCircularTopics()

  // 初始化時將滾動位置設置到正確位置
  useEffect(() => {
    if (scrollContainerRef.current && circularTopics.length > 0) {
      const container = scrollContainerRef.current
      // 初始時滾動到真實的第一個主題位置 (索引1，因為索引0是克隆的最後一個)
      const initialTargetIndex = activeTab + 1
      const targetButton = container.children[initialTargetIndex] as HTMLElement
      if (targetButton) {
        const containerWidth = container.clientWidth
        const buttonWidth = targetButton.clientWidth
        const buttonLeft = targetButton.offsetLeft
        const scrollLeft = buttonLeft - (containerWidth - buttonWidth) / 2

        // 使用 setTimeout 確保在 DOM 渲染完成後執行
        setTimeout(() => {
          container.scrollTo({
            left: scrollLeft,
            behavior: 'auto' // 初始化時不需要動畫
          })
        }, 100)
      }
    }
  }, [activeTab, circularTopics.length])

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: {
        tab: isActive
          ? "bg-blue-600 text-white border-blue-500"
          : "bg-slate-100/90 text-slate-700 border-slate-300 hover:bg-blue-50 hover:text-blue-600",
        badge: "bg-blue-100 text-blue-700 border-blue-300",
        gradient: "from-blue-50/80 via-blue-50/40 to-blue-50/80",
      },
      purple: {
        tab: isActive
          ? "bg-purple-600 text-white border-purple-500"
          : "bg-slate-100/90 text-slate-700 border-slate-300 hover:bg-purple-50 hover:text-purple-600",
        badge: "bg-purple-100 text-purple-700 border-purple-300",
        gradient: "from-purple-50/80 via-purple-50/40 to-purple-50/80",
      },
      green: {
        tab: isActive
          ? "bg-green-600 text-white border-green-500"
          : "bg-slate-100/90 text-slate-700 border-slate-300 hover:bg-green-50 hover:text-green-600",
        badge: "bg-green-100 text-green-700 border-green-300",
        gradient: "from-green-50/80 via-green-50/40 to-green-50/80",
      },
      indigo: {
        tab: isActive
          ? "bg-indigo-600 text-white border-indigo-500"
          : "bg-slate-100/90 text-slate-700 border-slate-300 hover:bg-indigo-50 hover:text-indigo-600",
        badge: "bg-indigo-100 text-indigo-700 border-indigo-300",
        gradient: "from-indigo-50/80 via-indigo-50/40 to-indigo-50/80",
      },
    }
    return colors[color as keyof typeof colors]
  }

  const currentTopic = speakersByTopic[activeTab]

  const openLightbox = (speaker: Speaker, fromHomepage: boolean = false) => {
    setSelectedSpeaker(speaker)
    setIsLightboxOpen(true)
    setIsFromHomepage(fromHomepage)
    document.body.style.overflow = "hidden" // 防止背景滾動
  }

  const closeLightbox = () => {
    setSelectedSpeaker(null)
    setIsLightboxOpen(false)
    document.body.style.overflow = "unset"
    
    // 根據進入方式決定關閉後的行為
    if (isFromHomepage) {
      // 從首頁進入，關閉後返回首頁
      router.push('/')
    }
    // 如果是直接在講者頁面點擊的，則不需要跳轉，只關閉 lightbox
    
    // 重置狀態
    setIsFromHomepage(false)
  }

  // 監聽 URL query string 自動開啟 Lightbox
  useEffect(() => {
    const speakerId = searchParams.get('id')
    if (speakerId) {
      // 在所有講者中尋找匹配的講者（使用 ID 比對）
      const allSpeakers = SPEAKERS_DATA.flatMap(topic => topic.speakers)
      const targetSpeaker = allSpeakers.find(speaker => speaker.id === speakerId)
      
      if (targetSpeaker) {
        openLightbox(targetSpeaker, true) // 標記為從首頁進入
        // 保留 URL 參數以支援分享功能，不清除
      }
      // 靜默忽略找不到講者的情況（根據需求）
    }
  }, [searchParams])

  // 生成講者結構化資料
  const allSpeakers = SPEAKERS_DATA.flatMap(topic => topic.speakers)
  const speakersStructuredData = allSpeakers.map(speaker => 
    generatePersonStructuredData(speaker, language)
  )

  // 生成麵包屑結構化資料
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.speakers') }
  ])

  return (
    <>
      {/* SEO 結構化資料 */}
      <StructuredData data={[...speakersStructuredData, breadcrumbData]} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <Header />

      {/* 為桌面模式固定 Header 添加頂部間距 */}
      <div className="hidden md:block h-20"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('speakers.pageTitle')}</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('speakers.subtitle')}
            </p>
          </div>

          {/* Topic Tabs */}
          <div className="mb-8">
            {/* Desktop & Tablet Layout */}
            <div className="hidden md:flex flex-wrap justify-center gap-2 mb-8">
              {speakersByTopic.map((topic, index) => {
                const colorClasses = getColorClasses(topic.color, activeTab === index)
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 font-medium shadow-lg ${colorClasses.tab}`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">{t('speakers.topic')} {index + 1}</div>
                      <div className="text-xs mt-1">{getLocalizedText(topic.shortTitle, language)}</div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Mobile Layout - Horizontal Scroll with Navigation */}
            <div className="md:hidden mb-6">
              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={() => navigateToTopic('prev')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
                  aria-label={t('speakers.previousTopic')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => navigateToTopic('next')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
                  aria-label={t('speakers.nextTopic')}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Scrollable Topics */}
                <div
                  ref={scrollContainerRef}
                  className="flex gap-3 overflow-x-auto pb-2 px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {circularTopics.map((topic, index) => {
                    const isActive = topic.originalIndex === activeTab
                    const colorClasses = getColorClasses(topic.color, isActive)
                    return (
                      <button
                        key={`${topic.originalIndex}-${topic.isClone ? 'clone' : 'original'}-${index}`}
                        onClick={() => setActiveTab(topic.originalIndex)}
                        className={`flex-shrink-0 px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 font-medium shadow-lg min-w-[200px] ${colorClasses.tab} ${topic.isClone ? 'opacity-80' : ''}`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold">{t('speakers.topic')} {topic.originalIndex + 1}</div>
                          <div className="text-xs mt-1 leading-tight">{getLocalizedText(topic.shortTitle, language)}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Mobile navigation hint */}
              <div className="text-center text-white/60 text-xs mt-2">
                {t('speakers.topicNavHint')}
              </div>
            </div>

            {/* Topic Overview */}
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center justify-center px-6 py-3 rounded-full border backdrop-blur-sm mb-4 shadow-lg ${getColorClasses(currentTopic.color, true).badge}`}
              >
                <span className="font-semibold text-lg">{t('speakers.topic')} {activeTab + 1}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{getLocalizedText(currentTopic.topic, language)}</h2>
              <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">{getLocalizedText(currentTopic.description, language)}</p>
            </div>
          </div>

          {/* Current Topic Content */}
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getColorClasses(currentTopic.color, true).gradient} pointer-events-none`}
            ></div>
            <div className="relative z-10 p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {currentTopic.speakers.map((speaker, speakerIndex) => (
                  <Card
                    key={speakerIndex}
                    className="bg-slate-100/95 border-slate-200 backdrop-blur-sm hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
                    onClick={() => openLightbox(speaker)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                        <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                          <Image
                            src={speaker.image}
                            alt={getLocalizedText(speaker.name, language)}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              // 如果圖片載入失敗，顯示預設圖標
                              e.currentTarget.style.display = 'none'
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement
                              if (fallback) {
                                fallback.style.display = 'flex'
                              }
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center">
                            <Users className="w-8 h-8 text-slate-600" />
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-slate-800 text-lg">{getLocalizedText(speaker.name, language)}</CardTitle>
                      <div className="space-y-1">
                        <p className="text-blue-600 text-sm font-medium">{getLocalizedText(speaker.title, language)}</p>
                        <div className="flex items-center justify-center space-x-1 text-slate-600 text-xs">
                          <Building className="w-3 h-3" />
                          <span>{getLocalizedText(speaker.company, language)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-slate-200/80 rounded-lg p-3 border border-slate-300">
                        <h4 className="text-purple-600 font-medium text-sm mb-1">{t('speakers.speechTopic')}</h4>
                        <div className="text-slate-700 text-sm">
                          <TopicTitle 
                            title={getLocalizedText(speaker.topic, language)}
                            maxLength={language === 'en' ? 60 : 30}
                          />
                        </div>
                      </div>
                      {(() => {
                        const bioText = getLocalizedText(speaker.bio, language)
                        const bioAnalysis = parseBioWithPromoCode(bioText, language)
                        
                        if (bioAnalysis.hasPromoCode) {
                          return (
                            <div className="space-y-2">
                              {/* 一般介紹文字 */}
                              {bioAnalysis.beforeText && (
                                <p className="text-slate-600 text-xs leading-relaxed">
                                  {bioAnalysis.beforeText}
                                </p>
                              )}
                              
                              {/* 優惠碼組件 */}
                              <div className="flex justify-center">
                                <PromoCodeCopy 
                                  code={bioAnalysis.promoCode}
                                  theme="blue"
                                  className="text-xs scale-90"
                                  label={language === 'zh-tw' ? '點擊複製' : 'Click to copy'}
                                />
                              </div>
                            </div>
                          )
                        }
                        
                        // 沒有優惠碼的一般顯示
                        return (
                          <p className="text-slate-600 text-xs leading-relaxed">
                            {bioText}
                          </p>
                        )
                      })()}
                      <div className="flex justify-center space-x-3 pt-2">
                        <a
                          href={speaker.linkedin}
                          className="w-8 h-8 bg-slate-300 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                          aria-label="LinkedIn"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                          href={speaker.twitter}
                          className="w-8 h-8 bg-slate-300 hover:bg-blue-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      </div>
                      
                      {/* Promo Code Section */}
                      {TICKET_SALE_CONFIG.promoCode?.isVisible && 
                       TICKET_SALE_CONFIG.promoCode?.code && 
                       speaker.hasPromoCode && (
                        <div className="pt-2">
                          <PromoCodeCopy code={TICKET_SALE_CONFIG.promoCode.code} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="text-center mt-8">
            <p className="text-gray-200 text-sm">{t('speakers.switchTopicHint')}</p>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {isLightboxOpen && selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-100 rounded-lg shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-800/80 hover:bg-slate-800 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label={t('speakers.close')}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 p-1 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center overflow-hidden">
                      <Image
                        src={selectedSpeaker.image}
                        alt={getLocalizedText(selectedSpeaker.name, language)}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          // 如果圖片載入失敗，顯示預設圖標
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="w-full h-full hidden items-center justify-center">
                        <Users className="w-16 h-16 text-slate-600" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{getLocalizedText(selectedSpeaker.name, language)}</h2>
                    <p className="text-xl text-blue-100 mb-2">{getLocalizedText(selectedSpeaker.title, language)}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-200">
                      <Building className="w-4 h-4" />
                      <span>{getLocalizedText(selectedSpeaker.company, language)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Bio Section */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                    <User className="w-6 h-6 mr-2 text-blue-600" />
                    {t('speakers.speakerBio')}
                  </h3>
                  {(() => {
                    const bioText = getLocalizedText(selectedSpeaker.bio, language)
                    const bioAnalysis = parseBioWithPromoCode(bioText, language)
                    
                    if (bioAnalysis.hasPromoCode) {
                      return (
                        <div className="space-y-4">
                          {/* 一般介紹文字 */}
                          {bioAnalysis.beforeText && (
                            <p className="text-slate-700 leading-relaxed text-lg">
                              {bioAnalysis.beforeText}
                            </p>
                          )}
                          
                          {/* 優惠碼組件 */}
                          <div className="flex justify-center">
                            <PromoCodeCopy 
                              code={bioAnalysis.promoCode}
                              theme="blue"
                              className="text-sm"
                              label={language === 'zh-tw' ? '點擊複製優惠碼' : 'Click to copy promo code'}
                            />
                          </div>
                        </div>
                      )
                    }
                    
                    // 沒有優惠碼的一般顯示
                    return (
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {bioText}
                      </p>
                    )
                  })()}
                </div>

                {/* Topic Section */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-purple-600" />
                    {t('speakers.speechTopic')}
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                    <div className="text-xl font-semibold text-purple-800 mb-2">
                      <TopicTitle 
                        title={getLocalizedText(selectedSpeaker.topic, language)}
                        maxLength={language === 'en' ? 80 : 40}
                      />
                    </div>
                    <p className="text-slate-700">{getLocalizedText(selectedSpeaker.content, language)}</p>
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                    <Briefcase className="w-6 h-6 mr-2 text-green-600" />
                    {t('speakers.experience')}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {selectedSpeaker.experience ? getLocalizedText(selectedSpeaker.experience, language) : "擁有豐富的軟體開發與系統架構經驗，專精於領域驅動設計的理論與實踐，曾參與多個大型專案的架構設計與技術決策。"}
                  </p>
                </div>

                {/* Achievements Section */}
                {selectedSpeaker.achievements && selectedSpeaker.achievements && (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                      <Award className="w-6 h-6 mr-2 text-yellow-600" />
                      {t('speakers.achievements')}
                    </h3>
                    <div className="grid gap-3">
                      {getLocalizedArray(selectedSpeaker.achievements, language).map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                        >
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700 leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expertise Section */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-orange-600" />
                    {t('speakers.expertise')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getLocalizedArray(selectedSpeaker.expertise, language).map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200 hover:bg-orange-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-600" />
                    {t('speakers.contactInfo')}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedSpeaker.linkedin}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={selectedSpeaker.twitter}
                      className="flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
    </>
  )
}
