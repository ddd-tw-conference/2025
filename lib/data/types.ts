/**
 * 會議相關類型定義
 * 定義講者、議程、主題等核心資料結構
 */

export interface Speaker {
  id: string // 講者唯一識別碼，使用 kebab-case 格式
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

export interface Segment {
  duration: number // 該段落時長（分鐘）
  title: { 'zh-tw': string; 'en': string }
  description: { 'zh-tw': string; 'en': string }
  speakerIds: string[] // 參與該段落的講者 ID 列表
  keywords: { 'zh-tw': string[]; 'en': string[] }
  type: 'knowledge' | 'workshop' | 'practice' | 'break' // 段落類型
}

export interface Session {
  time: string
  title: { 'zh-tw': string; 'en': string }
  speaker: string
  description: { 'zh-tw': string; 'en': string }
  track: { 'zh-tw': string; 'en': string }
  type: 'workshop' | 'talk'
  segments?: Segment[] // 可選的段落詳細資訊
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

// 本地化文字類型
export type LocalizedText = { 'zh-tw': string; 'en': string }

// 志工角色定義
export interface VolunteerRole {
  id: 'registration' | 'guide' | 'technical' | 'venue'
  name: LocalizedText
  description: LocalizedText
  color: 'blue' | 'purple' | 'green' | 'indigo' | 'orange' | 'pink'
  icon: string // Lucide Icon 名稱
  responsibilities: { 'zh-tw': string[]; 'en': string[] }
  emergencyContact: LocalizedText // 緊急聯絡人
}

// 志工排班時段
export interface VolunteerSchedule {
  timeSlot: string // "08:30-09:00" 格式
  title: LocalizedText
  location: LocalizedText
  priority: 'high' | 'medium' | 'low'
  estimatedDuration: number // 預估時長（分鐘）
  notes?: LocalizedText // 備註說明
  relatedSessions?: string[] // 關聯議程 ID
}

// 志工時間配置
export interface VolunteerTimeConfig {
  workingStart: string // "08:30" 格式
  workingEnd: string // "17:00" 格式
  eventDate: string // "2025-11-08" 格式
  progressUpdateInterval: number // 進度更新間隔（毫秒）
  emergencyContact: string // 緊急聯絡電話
}

// 志工系統完整配置
export interface VolunteerConfig {
  roles: VolunteerRole[]
  dailySchedule: { [roleId: string]: VolunteerSchedule[] }
  eventDate: string
  workingHours: {
    start: string
    end: string
  }
}
