/**
 * 議程時段配置管理
 * 定義議程內時段模式、時間配置和計算邏輯
 */

import type { SessionPatternConfig, AgendaTimeConfig } from '@/lib/data/types'

// 議程時間配置
export const AGENDA_TIME_CONFIG: AgendaTimeConfig = {
  breakAfterScience: 10, // 基礎知識後10分鐘休息
  breakAfterWorkshop: 20, // 工作坊後20分鐘休息
  scienceDuration: 30, // 基礎知識30分鐘
  workshopDuration: 90, // 工作坊90分鐘
  practiceDuration: 30 // 實務分享30分鐘
}

// 議程時段模式
export const SESSION_PATTERNS: SessionPatternConfig[] = [
  {
    key: "science",
    label: { 'zh-tw': "基礎知識", 'en': "Foundation Knowledge" },
    icon: "Sparkles",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    key: "workshop",
    label: { 'zh-tw': "工作坊", 'en': "Workshop" },
    icon: "Users",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    key: "practice",
    label: { 'zh-tw': "實務分享", 'en': "Practice Sharing" },
    icon: "Calendar",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400"
  }
]

// 議程時間計算工具函式
export const calculateSessionTimes = (sessionTime: string): Array<SessionPatternConfig & { time: string }> => {
  const isAfternoon = sessionTime.includes('13:00')
  const { breakAfterScience, breakAfterWorkshop, scienceDuration, workshopDuration, practiceDuration } = AGENDA_TIME_CONFIG
  
  if (isAfternoon) {
    // 下午議程 13:00 開始
    const scienceStart = 13 * 60 // 13:00 (分鐘)
    const scienceEnd = scienceStart + scienceDuration
    const workshopStart = scienceEnd + breakAfterScience
    const workshopEnd = workshopStart + workshopDuration
    const practiceStart = workshopEnd + breakAfterWorkshop
    const practiceEnd = practiceStart + practiceDuration

    return SESSION_PATTERNS.map(pattern => ({
      ...pattern,
      time: pattern.key === 'science' 
        ? `${Math.floor(scienceStart / 60)}:${String(scienceStart % 60).padStart(2, '0')} ~ ${Math.floor(scienceEnd / 60)}:${String(scienceEnd % 60).padStart(2, '0')}`
        : pattern.key === 'workshop'
        ? `${Math.floor(workshopStart / 60)}:${String(workshopStart % 60).padStart(2, '0')} ~ ${Math.floor(workshopEnd / 60)}:${String(workshopEnd % 60).padStart(2, '0')}`
        : `${Math.floor(practiceStart / 60)}:${String(practiceStart % 60).padStart(2, '0')} ~ ${Math.floor(practiceEnd / 60)}:${String(practiceEnd % 60).padStart(2, '0')}`
    }))
  } else {
    // 上午議程 09:00 開始
    const scienceStart = 9 * 60 // 09:00 (分鐘)
    const scienceEnd = scienceStart + scienceDuration
    const workshopStart = scienceEnd + breakAfterScience
    const workshopEnd = workshopStart + workshopDuration
    const practiceStart = workshopEnd + breakAfterWorkshop
    const practiceEnd = practiceStart + practiceDuration

    return SESSION_PATTERNS.map(pattern => ({
      ...pattern,
      time: pattern.key === 'science'
        ? `${String(Math.floor(scienceStart / 60)).padStart(2, '0')}:${String(scienceStart % 60).padStart(2, '0')} ~ ${String(Math.floor(scienceEnd / 60)).padStart(2, '0')}:${String(scienceEnd % 60).padStart(2, '0')}`
        : pattern.key === 'workshop'
        ? `${String(Math.floor(workshopStart / 60)).padStart(2, '0')}:${String(workshopStart % 60).padStart(2, '0')} ~ ${String(Math.floor(workshopEnd / 60)).padStart(2, '0')}:${String(workshopEnd % 60).padStart(2, '0')}`
        : `${String(Math.floor(practiceStart / 60)).padStart(2, '0')}:${String(practiceStart % 60).padStart(2, '0')} ~ ${String(Math.floor(practiceEnd / 60)).padStart(2, '0')}:${String(practiceEnd % 60).padStart(2, '0')}`
    }))
  }
}
