/**
 * 會議相關類型定義
 * 定義講者、議程、主題等核心資料結構
 */

export interface Speaker {
  name: { 'zh-tw': string; 'en': string }
  title: { 'zh-tw': string; 'en': string }
  company: { 'zh-tw': string; 'en': string }
  topic: { 'zh-tw': string; 'en': string }
  content: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
  image: string
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
  github?: string
  website?: string
  email?: string
  experience?: { 'zh-tw': string; 'en': string }
  expertise: { 'zh-tw': string[]; 'en': string[] }
  education?: { 'zh-tw': string; 'en': string }
  achievements?: { 'zh-tw': string[]; 'en': string[] }
  hasPromoCode?: boolean  // 新增：標記此講者是否顯示優惠碼
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export interface Session {
  time: string
  title: { 'zh-tw': string; 'en': string }
  speaker: string
  description: { 'zh-tw': string; 'en': string }
  track: { 'zh-tw': string; 'en': string }
  type: 'workshop' | 'talk'
}

export interface SpeakerTopic {
  topic: { 'zh-tw': string; 'en': string }
  shortTitle: { 'zh-tw': string; 'en': string }
  description: { 'zh-tw': string; 'en': string }
  color: 'blue' | 'purple' | 'green' | 'indigo' | 'orange' | 'pink'
  speakers: Speaker[]
}

export interface SessionPatternConfig {
  key: string
  label: { 'zh-tw': string; 'en': string }
  icon: string // Icon name for Lucide React
  gradient: string // Tailwind gradient class
  bgColor: string // Background color class
  iconColor: string // Icon color class
}

export interface AgendaTimeConfig {
  breakAfterScience: number // 科學分享後休息時間（分鐘）
  breakAfterWorkshop: number // 工作坊後休息時間（分鐘）
  scienceDuration: number // 科學分享時長（分鐘）
  workshopDuration: number // 工作坊時長（分鐘）
  practiceDuration: number // 實務分享時長（分鐘）
}
