'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useI18n } from '@/contexts/i18n-context'
import { SPEAKERS_DATA, Speaker } from '@/lib/data'

// 卡片色系配置
const cardThemes = {
  blue: {
    gradient: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
    shadow: "rgba(79, 70, 229, 0.4)",
    glowColor: "#06b6d4"
  },
  pink: {
    gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
    shadow: "rgba(236, 72, 153, 0.4)",
    glowColor: "#f97316"
  },
  purple: {
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
    shadow: "rgba(139, 92, 246, 0.4)",
    glowColor: "#d946ef"
  }
} as const

type ThemeKey = keyof typeof cardThemes

// 輔助函數：獲取本地化文字
const getLocalizedText = (text: { 'zh-tw': string; 'en': string }, lang: string) => {
  return text[lang as keyof typeof text] || text['zh-tw']
}

// 計算當前應該顯示的講者（每3天切換一位）- 使用固定的種子確保一致性
const calculateCurrentSpeakers = (): { speakers: Speaker[], currentIndex: number } => {
  const allSpeakers: Speaker[] = []
  SPEAKERS_DATA.forEach(topic => {
    allSpeakers.push(...topic.speakers)
  })
  
  // 找到Sunny講者的索引（Sunny Cheng是第二位講者，索引為1）
  const sunnyIndex = allSpeakers.findIndex(speaker => 
    getLocalizedText(speaker.name, 'zh-tw').includes('Sunny Cheng')
  )
  
  const baseDate = new Date('2025-09-13')
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - baseDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // 每3天輪換一位講者，但以Sunny為起始點
  const rotationIndex = Math.floor(diffDays / 3) % allSpeakers.length
  const currentIndex = (sunnyIndex + rotationIndex) % allSpeakers.length
  
  return { 
    speakers: [allSpeakers[currentIndex]], // 只顯示一位講者
    currentIndex 
  }
}

// 固定色系生成（使用講者索引作為種子，確保一致性）
const generateDeterministicTheme = (speakerIndex: number): ThemeKey => {
  const themes: ThemeKey[] = ['blue', 'pink', 'purple']
  return themes[speakerIndex % themes.length]
}

interface SpeakerCardProps {
  speaker: Speaker
  theme: ThemeKey
  currentLang: string
  onTicketClick: (speaker: Speaker) => void
  onCardClick: (speaker: Speaker) => void // 新增卡片點擊處理
}

const SpeakerCard = ({ speaker, theme, currentLang, onTicketClick, onCardClick }: SpeakerCardProps) => {
  const currentTheme = cardThemes[theme]

  const texts = {
    'zh-tw': {
      buyTicket: "立即購票",
      expertise: "專業領域"
    },
    'en': {
      buyTicket: "Buy Tickets",
      expertise: "Expertise"
    }
  } as const

  const currentTexts = texts[currentLang as keyof typeof texts] || texts['zh-tw']

  const handleCardClick = () => {
    onCardClick(speaker)
  }

  const handleTicketClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 防止觸發卡片點擊
    onTicketClick(speaker)
  }

  return (
    <div
      className="speaker-card relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 cursor-pointer"
      onClick={handleCardClick} // 新增卡片點擊
      style={{
        background: currentTheme.gradient,
        boxShadow: `0 8px 32px ${currentTheme.shadow}, 0 0 24px ${currentTheme.glowColor}33`,
        borderRadius: '20px',
        padding: '1.5rem 1.25rem 1.25rem',
        color: '#fff',
        width: '100%',
        maxWidth: '320px',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        // 細邊框效果
        border: `1px solid ${currentTheme.glowColor}44`,
        backgroundImage: `${currentTheme.gradient}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box'
      }}
      data-lang={currentLang}
    >
      {/* 內層細光暈邊框 */}
      <div
        className="absolute inset-0 rounded-[19px] opacity-25"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.glowColor}15, transparent, ${currentTheme.glowColor}15)`,
          filter: 'blur(0.5px)'
        }}
      />

      {/* 動態邊框閃爍效果 - 更細緻 */}
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          background: `linear-gradient(45deg, transparent, ${currentTheme.glowColor}22, transparent, ${currentTheme.glowColor}22)`,
          backgroundSize: '200% 200%',
          animation: 'borderGlow 4s ease-in-out infinite alternate',
          opacity: 0.6
        }}
      />

      {/* 精選講者標籤 - 左上角 */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="inline-block px-2 py-1 text-xs font-medium rounded-lg backdrop-blur-sm shadow-md border"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.glowColor}33, ${currentTheme.glowColor}22)`,
            border: `1px solid ${currentTheme.glowColor}55`,
            boxShadow: `0 2px 6px ${currentTheme.shadow}`
          }}
        >
          {currentLang === 'zh-tw' ? '精選講者' : 'Featured'}
        </span>
      </div>

      {/* 講者照片 - 放大 */}
      <div className="speaker-avatar mx-auto mb-4 relative mt-2 z-10">
        <div
          className="w-20 h-20 lg:w-18 lg:h-18 rounded-full overflow-hidden backdrop-blur-sm"
          style={{
            border: `2px solid ${currentTheme.glowColor}55`,
            boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px ${currentTheme.glowColor}33`
          }}
        >
          <Image
            src={speaker.image}
            alt={getLocalizedText(speaker.name, currentLang)}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* 講者姓名 */}
      <div className="text-center mb-3">
        <h3
          className="text-lg lg:text-base font-semibold leading-tight"
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            maxHeight: '2.6em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {getLocalizedText(speaker.name, currentLang)}
        </h3>
      </div>

      {/* 演講主題 */}
      <div className="text-center mb-3">
        <p
          className="text-sm lg:text-xs font-medium leading-relaxed text-yellow-100"
          style={{
            maxHeight: '3.6em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {getLocalizedText(speaker.topic, currentLang)}
        </p>
      </div>

      {/* 講者介紹 */}
      <div className="speaker-content flex-1 text-center mb-4">
        <p
          className="text-xs lg:text-xs opacity-85 leading-relaxed"
          style={{
            maxHeight: '4.2em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {getLocalizedText(speaker.bio, currentLang)}
        </p>
      </div>

      {/* 購票 CTA */}
      <div className="speaker-actions mt-auto text-center z-10">
        <button
          className="w-full font-semibold text-white uppercase tracking-wide text-sm lg:text-xs py-2 lg:py-2 px-4 lg:px-3 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 cursor-pointer relative overflow-hidden"
          style={{
            background: `linear-gradient(45deg, ${currentTheme.glowColor}, ${currentTheme.glowColor}dd)`,
            boxShadow: `0 4px 15px ${currentTheme.shadow}, 0 0 8px ${currentTheme.glowColor}44`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${currentTheme.glowColor}66`
          }}
          onClick={handleTicketClick} // 修改為使用新的處理函式
        >
          {/* 按鈕內部光效 - 更微妙 */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${currentTheme.glowColor}55, transparent)`,
              backgroundSize: '200% 100%',
              animation: 'buttonShimmer 3s ease-in-out infinite'
            }}
          />
          <span className="relative z-10">{currentTexts.buyTicket}</span>
        </button>
      </div>
    </div>
  )
}

export default function SpeakerCards() {
  const { language } = useI18n()
  const router = useRouter()
  const [currentSpeakers, setCurrentSpeakers] = useState<Speaker[]>([])
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  // 使用 useEffect 避免 hydration 問題
  useEffect(() => {
    setMounted(true)
    const result = calculateCurrentSpeakers()
    setCurrentSpeakers(result.speakers)
    setCurrentSpeakerIndex(result.currentIndex)
  }, [])

  // 為講者分配固定色系（避免 hydration 問題）
  const speakersWithThemes = useMemo(() => {
    if (!mounted || !currentSpeakers.length) return []
    
    return currentSpeakers.map((speaker, index) => {
      // 使用當前輪換的講者索引作為主題種子，確保一致性
      const theme = generateDeterministicTheme(currentSpeakerIndex)
      return {
        ...speaker,
        theme
      }
    })
  }, [currentSpeakers, currentSpeakerIndex, mounted])

  const handleTicketClick = (speaker: Speaker) => {
    // 購票邏輯 - 直接導向購票頁面
    console.log('購買票券:', getLocalizedText(speaker.name, language))
    // 使用 Next.js router 導向購票頁面
    router.push('/tickets')
  }

  const handleCardClick = (speaker: Speaker) => {
    // 使用講者 ID 跳轉到 speakers 頁面並開啟 Lightbox
    console.log('點擊講者卡片:', speaker.id)
    router.push(`/speakers?id=${speaker.id}`)
  }

  // 檢查是否有講者資料或尚未 mount
  if (!mounted || !currentSpeakers.length || !speakersWithThemes.length) {
    return (
      <section className="speaker-section py-8">
        <div className="speaker-cards-container flex flex-col items-center gap-6 lg:gap-8">
          <div className="text-white text-center">
            {!mounted ? (
              <p>載入中...</p>
            ) : (
              <p>{language === 'zh-tw' ? '暫無講者資料' : 'No speaker data available'}</p>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="speaker-section py-8">
      <div className="speaker-cards-container flex flex-col items-center gap-6 lg:gap-8">
        {speakersWithThemes.map((speaker, index) => (
          <SpeakerCard
            key={`${getLocalizedText(speaker.name, 'en')}-${index}`}
            speaker={speaker}
            theme={speaker.theme}
            currentLang={language}
            onTicketClick={handleTicketClick}
            onCardClick={handleCardClick} // 新增卡片點擊處理
          />
        ))}
      </div>
    </section>
  )
}
