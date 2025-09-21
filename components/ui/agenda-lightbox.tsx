import React from "react"
import { X, Clock, Users, Sparkles, Calendar, ChevronRight, User, Tag, BookOpen, Coffee, Wrench } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import { getLocalizedText, Session, calculateSessionTimes, SPEAKERS_DATA } from "@/lib/data"

interface AgendaLightboxProps {
  open: boolean
  onClose: () => void
  session: Session | null
}

export function AgendaLightbox({ open, onClose, session }: AgendaLightboxProps) {
  const { t, language } = useI18n()
  
  // 使用配置文件中的時間計算函式來顯示議程內部結構
  const sessionPattern = session ? calculateSessionTimes(session.time) : []
  
  // 獲取講者資料的輔助函數
  const getSpeakerById = (speakerId: string) => {
    for (const speakerTopic of SPEAKERS_DATA) {
      const speaker = speakerTopic.speakers.find(s => s.id === speakerId)
      if (speaker) return speaker
    }
    return null
  }
  
  // 計算 segments 的時間安排
  const calculateSegmentTimes = (startTime: string, segments: any[]) => {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    let currentMinutes = startHour * 60 + startMinute
    
    return segments.map(segment => {
      const segmentStartHour = Math.floor(currentMinutes / 60)
      const segmentStartMinute = currentMinutes % 60
      currentMinutes += segment.duration
      const segmentEndHour = Math.floor(currentMinutes / 60)
      const segmentEndMinute = currentMinutes % 60
      
      return {
        ...segment,
        timeRange: `${segmentStartHour.toString().padStart(2, '0')}:${segmentStartMinute.toString().padStart(2, '0')} - ${segmentEndHour.toString().padStart(2, '0')}:${segmentEndMinute.toString().padStart(2, '0')}`
      }
    })
  }

  // ESC 鍵關閉 - 必須在條件渲染之前調用
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [open, onClose])

  // 條件渲染放在所有 Hooks 之後
  if (!session || !open) return null

  // 確定是否要顯示 segments 或 sessionPattern
  const hasSegments = session.segments && session.segments.length > 0
  const segmentsWithTimes = hasSegments 
    ? calculateSegmentTimes(session.time.split(' - ')[0], session.segments!) 
    : []

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-4xl mx-4 relative max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-t-2xl">
          <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>
          <button
            className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110 cursor-pointer z-20 focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={onClose}
            aria-label={t("common.close")}
          >
            <X size={20} className="pointer-events-none" />
          </button>
          
          <div className="relative z-10 pr-12">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/80 font-medium">{getLocalizedText(session.track, language)}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
              {getLocalizedText(session.title, language)}
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              {getLocalizedText(session.description, language)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {hasSegments ? t("agenda.sessionContent") : t("agenda.sessionStructure")}
            </h3>
          </div>
          
          <div className="grid gap-6">
            {hasSegments ? (
              // 顯示詳細的 segments 內容
              segmentsWithTimes.map((segment, index) => {
                // 根據段落類型選擇不同的樣式
                let IconComponent, gradient, bgColor, iconColor, borderColor
                switch (segment.type) {
                  case 'knowledge':
                    IconComponent = BookOpen
                    gradient = "from-blue-500 to-indigo-600"
                    bgColor = "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                    iconColor = "text-blue-600 dark:text-blue-400"
                    borderColor = "border-blue-200 dark:border-blue-700"
                    break
                  case 'workshop':
                    IconComponent = Wrench
                    gradient = "from-emerald-500 to-teal-600"
                    bgColor = "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
                    iconColor = "text-emerald-600 dark:text-emerald-400"
                    borderColor = "border-emerald-200 dark:border-emerald-700"
                    break
                  case 'practice':
                    IconComponent = Sparkles
                    gradient = "from-purple-500 to-pink-600"
                    bgColor = "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                    iconColor = "text-purple-600 dark:text-purple-400"
                    borderColor = "border-purple-200 dark:border-purple-700"
                    break
                  case 'break':
                    IconComponent = Coffee
                    gradient = "from-amber-400 to-orange-500"
                    bgColor = "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
                    iconColor = "text-amber-600 dark:text-amber-400"
                    borderColor = "border-amber-200 dark:border-amber-700"
                    break
                  default:
                    IconComponent = Clock
                    gradient = "from-gray-500 to-gray-600"
                    bgColor = "bg-gray-50 dark:bg-gray-900/20"
                    iconColor = "text-gray-600 dark:text-gray-400"
                    borderColor = "border-gray-200 dark:border-gray-700"
                }
                
                return (
                  <div 
                    key={index} 
                    className={`relative group ${bgColor} rounded-2xl p-6 border ${borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gradient} rounded-l-2xl`}></div>
                    
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        {/* 段落標題和時間 */}
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                            {getLocalizedText(segment.title, language)}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className={`${iconColor} font-mono text-sm bg-white dark:bg-neutral-800 px-2 py-1 rounded border font-medium`}>
                              {segment.timeRange}
                            </span>
                            <span className="text-neutral-500 dark:text-neutral-400 text-sm bg-neutral-50 dark:bg-neutral-800 px-2 py-1 rounded border">
                              {segment.duration} 分鐘
                            </span>
                          </div>
                        </div>
                        
                        {/* 段落描述 */}
                        <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                          {getLocalizedText(segment.description, language)}
                        </p>
                        
                        {/* 講者頭像區 - 只在非休息時間顯示 */}
                        {segment.type !== 'break' && segment.speakerIds.length > 0 && (
                          <div className="flex items-center space-x-3 mb-4">
                            <User className={`w-4 h-4 ${iconColor}`} />
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                              {t("agenda.speakerProfile")}:
                            </span>
                            <div className="flex items-center space-x-2">
                              {segment.speakerIds.map((speakerId: string) => {
                                const speaker = getSpeakerById(speakerId)
                                return speaker ? (
                                  <div 
                                    key={speakerId}
                                    className="flex items-center space-x-2 bg-white dark:bg-neutral-700 rounded-lg px-3 py-1 border"
                                  >
                                    <img 
                                      src={speaker.image} 
                                      alt={getLocalizedText(speaker.name, language)}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                      {getLocalizedText(speaker.name, language)}
                                    </span>
                                  </div>
                                ) : null
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* 關鍵字標籤 - 只在非休息時間顯示 */}
                        {segment.type !== 'break' && segment.keywords && (
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                            <div className="flex items-center space-x-2 shrink-0">
                              <Tag className={`w-4 h-4 ${iconColor}`} />
                              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {t("agenda.keywords")}:
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {segment.keywords[language as 'zh-tw' | 'en']?.map((keyword: string, kidx: number) => (
                                <span 
                                  key={kidx}
                                  className={`text-xs px-2 py-1 rounded-full border ${
                                    segment.type === 'knowledge' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700' :
                                    segment.type === 'workshop' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700' :
                                    'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700'
                                  }`}
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* 休息時間的特殊提示 */}
                        {segment.type === 'break' && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Coffee className={`w-4 h-4 ${iconColor}`} />
                            <span className={`text-sm ${iconColor} font-medium`}>
                              {language === 'zh-tw' ? '放鬆時光，準備下一階段' : 'Relax time, prepare for the next stage'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 opacity-20">
                      <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-full blur-2xl`}></div>
                    </div>
                  </div>
                )
              })
            ) : (
              // 原有的 sessionPattern 顯示邏輯作為 fallback
              sessionPattern.map((pattern, index) => {
                // 直接根據 key 來選擇圖標和樣式，確保 Tailwind 正確編譯
                let IconComponent, gradient, bgColor, iconColor
                switch (pattern.key) {
                  case 'science':
                    IconComponent = Sparkles
                    gradient = "from-purple-500 to-pink-500"
                    bgColor = "bg-purple-50 dark:bg-purple-900/20"
                    iconColor = "text-purple-600 dark:text-purple-400"
                    break
                  case 'workshop':
                    IconComponent = Users
                    gradient = "from-blue-500 to-cyan-500"
                    bgColor = "bg-blue-50 dark:bg-blue-900/20"
                    iconColor = "text-blue-600 dark:text-blue-400"
                    break
                  case 'practice':
                    IconComponent = Calendar
                    gradient = "from-green-500 to-emerald-500"
                    bgColor = "bg-green-50 dark:bg-green-900/20"
                    iconColor = "text-green-600 dark:text-green-400"
                    break
                  default:
                    IconComponent = Calendar
                    gradient = "from-gray-500 to-gray-600"
                    bgColor = "bg-gray-50 dark:bg-gray-900/20"
                    iconColor = "text-gray-600 dark:text-gray-400"
                }
                
                return (
                  <div 
                    key={pattern.key} 
                    className={`relative group ${bgColor} rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gradient} rounded-l-2xl`}></div>
                    
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        {/* 時段標題 - 最重要的資訊 */}
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-2xl font-black text-neutral-800 dark:text-neutral-200">
                            {getLocalizedText(pattern.label, language)}
                          </h4>
                          <ChevronRight className={`w-5 h-5 ${iconColor} group-hover:translate-x-1 transition-transform duration-200`} />
                        </div>
                        
                        {/* 時間資訊 - 核心內容 */}
                        <div className="flex items-center space-x-2 mb-4">
                          <Clock className={`w-4 h-4 ${iconColor}`} />
                          <span className={`text-lg font-mono ${iconColor} bg-white dark:bg-neutral-800 px-3 py-2 rounded-md border font-bold`}>
                            {pattern.time}
                          </span>
                          <span className={`text-sm ${iconColor} bg-white/50 dark:bg-neutral-800/50 px-2 py-1 rounded border`}>
                            {pattern.key === 'science' ? t("agenda.scienceDuration") : 
                             pattern.key === 'workshop' ? t("agenda.workshopDuration") : 
                             t("agenda.practiceDuration")}
                          </span>
                        </div>
                        
                        {/* 時段說明 */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}></div>
                            <span className="text-neutral-600 dark:text-neutral-300 font-medium">
                              {pattern.key === 'science' ? t("agenda.scienceDescription") : 
                               pattern.key === 'workshop' ? t("agenda.workshopDescription") : 
                               t("agenda.practiceDescription")}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Sparkles className={`w-4 h-4 ${iconColor}`} />
                            <span className={`text-sm ${iconColor} font-medium`}>
                              {t("agenda.detailsRevealSoon")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 opacity-20">
                      <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-full blur-2xl`}></div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
