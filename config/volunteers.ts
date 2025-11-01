/**
 * 志工管理配置
 * 定義志工角色、排班時間與進度計算邏輯
 * 
 * 設計基於 AGENDA_DATA 結構，與會議議程時間對應
 */

import type { 
  VolunteerRole, 
  VolunteerSchedule, 
  VolunteerConfig, 
  VolunteerTimeConfig,
  LocalizedText 
} from '@/lib/data/types'

// 志工工作時間配置
export const VOLUNTEER_TIME_CONFIG: VolunteerTimeConfig = {
  workingStart: "08:30", // 志工上班時間
  workingEnd: "17:00",   // 志工下班時間
  eventDate: "2025-11-08", // 活動日期
  progressUpdateInterval: 30000, // 進度更新間隔 (30秒)
  emergencyContact: "+886-2-1234-5678" // 緊急聯絡電話
}

// 志工角色定義
export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: "registration",
    name: { 'zh-tw': "報到組", 'en': "Registration Team" },
    description: { 'zh-tw': "負責參會者報到、資料核對與會議資料發放", 'en': "Responsible for attendee check-in, data verification, and material distribution" },
    color: "blue",
    icon: "ClipboardCheck",
    responsibilities: {
      'zh-tw': [
        "參會者身份核實與報到確認",
        "會議資料袋與識別證發放",
        "報到數據統計與回報",
        "處理現場報到問題與諮詢"
      ],
      'en': [
        "Attendee identity verification and check-in confirmation",
        "Conference material and badge distribution",
        "Check-in data statistics and reporting",
        "Handle on-site registration issues and inquiries"
      ]
    },
    emergencyContact: { 'zh-tw': "Kim", 'en': "Kim" }
  },
  {
    id: "guide",
    name: { 'zh-tw': "引導組", 'en': "Guide Team" },
    description: { 'zh-tw': "協助參會者導引、會場秩序維護與緊急狀況處理", 'en': "Assist with attendee guidance, venue order maintenance, and emergency situation handling" },
    color: "purple",
    icon: "Navigation",
    responsibilities: {
      'zh-tw': [
        "參會者會場導引與座位安排",
        "會場秩序維護與人流控制",
        "緊急疏散與安全引導",
        "協助講者與專家接待"
      ],
      'en': [
        "Attendee venue guidance and seating arrangement",
        "Venue order maintenance and crowd control",
        "Emergency evacuation and safety guidance",
        "Assist with speaker and expert reception"
      ]
    },
    emergencyContact: { 'zh-tw': "姍姍", 'en': "San San" }
  },
  {
    id: "technical",
    name: { 'zh-tw': "技術組", 'en': "Technical Team" },
    description: { 'zh-tw': "負責會議技術設備、直播系統與網路環境維護", 'en': "Responsible for conference technical equipment, live streaming systems, and network environment maintenance" },
    color: "green",
    icon: "Settings",
    responsibilities: {
      'zh-tw': [
        "音響設備與麥克風系統管理",
        "投影設備與簡報技術支援",
        "網路環境維護與WiFi支援"
      ],
      'en': [
        "Audio equipment and microphone system management",
        "Projection equipment and presentation technical support",
        "Network environment maintenance and WiFi support"
      ]
    },
    emergencyContact: { 'zh-tw': "魚咬章(Taco)", 'en': "Taco" }
  },
  {
    id: "venue",
    name: { 'zh-tw': "場地組", 'en': "Venue Team" },
    description: { 'zh-tw': "場地佈置、物料管理與環境清潔維護", 'en': "Venue setup, material management, and environmental cleaning maintenance" },
    color: "indigo",
    icon: "Building",
    responsibilities: {
      'zh-tw': [
        "會場佈置與座位配置",
        "物料準備與庫存管理",
        "餐飲服務協調與監督",
        "會場清潔與垃圾分類"
      ],
      'en': [
        "Venue setup and seating configuration",
        "Material preparation and inventory management",
        "Catering service coordination and supervision",
        "Venue cleaning and waste sorting"
      ]
    },
    emergencyContact: { 'zh-tw': "Peter", 'en': "Peter" }
  }
]

// 志工排班時間表
export const VOLUNTEER_SCHEDULES: { [roleId: string]: VolunteerSchedule[] } = {
  registration: [
    {
      timeSlot: "08:30-09:00",
      title: { 'zh-tw': "報到系統準備", 'en': "Check-in System Setup" },
      location: { 'zh-tw': "會場入口", 'en': "Main Hall Entrance" },
      priority: "high",
      estimatedDuration: 30,
      notes: { 'zh-tw': "確認報到系統正常運作，準備會議資料袋", 'en': "Ensure check-in system is operational, prepare conference material bags" },
      relatedSessions: []
    },
    {
      timeSlot: "09:00-12:00",
      title: { 'zh-tw': "上午場報到服務", 'en': "Morning Session Check-in Service" },
      location: { 'zh-tw': "會場入口", 'en': "Main Hall Entrance" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "處理遲到參會者報到，維護報到櫃台秩序", 'en': "Handle late attendee check-ins, maintain check-in counter order" },
      relatedSessions: ["morning-session-1", "morning-session-2"]
    },
    {
      timeSlot: "12:00-13:30",
      title: { 'zh-tw': "便當接收協助", 'en': "Lunch Box Reception" },
      location: { 'zh-tw': "後勤區", 'en': "Logistics Area" },
      priority: "medium",
      estimatedDuration: 90,
      notes: { 'zh-tw': "協助接收外送便當，僅供工作人員使用", 'en': "Assist with receiving delivered lunch boxes for staff only" },
      relatedSessions: []
    },
    {
      timeSlot: "13:30-16:30",
      title: { 'zh-tw': "下午場報到服務", 'en': "Afternoon Session Check-in Service" },
      location: { 'zh-tw': "會場入口", 'en': "Main Hall Entrance" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "下午場次報到確認，處理臨時參會者", 'en': "Afternoon session check-in confirmation, handle walk-in attendees" },
      relatedSessions: ["afternoon-session-1", "afternoon-session-2"]
    },
    {
      timeSlot: "16:30-17:00",
      title: { 'zh-tw': "報到資料整理", 'en': "Check-in Data Organization" },
      location: { 'zh-tw': "講師、後勤休息區", 'en': "Staff Rest Area" },
      priority: "medium",
      estimatedDuration: 30,
      notes: { 'zh-tw': "整理當日報到統計資料，準備結算報告", 'en': "Organize daily check-in statistics, prepare settlement report" },
      relatedSessions: []
    }
  ],

  guide: [
    {
      timeSlot: "08:30-09:00",
      title: { 'zh-tw': "會場導引準備", 'en': "Venue Guidance Preparation" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 30,
      notes: { 'zh-tw': "檢查會場指標，準備引導工具", 'en': "Check venue signage, prepare guidance tools" },
      relatedSessions: []
    },
    {
      timeSlot: "09:00-12:00",
      title: { 'zh-tw': "上午場引導服務", 'en': "Morning Session Guidance Service" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "協助參會者找到座位，維持會場秩序", 'en': "Help attendees find seats, maintain venue order" },
      relatedSessions: ["morning-session-1", "morning-session-2"]
    },
    {
      timeSlot: "12:00-13:30",
      title: { 'zh-tw': "會眾午餐引導", 'en': "Attendee Lunch Guidance" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "medium",
      estimatedDuration: 90,
      notes: { 'zh-tw': "引導會眾至附近用餐地點，說明午餐自理政策", 'en': "Guide attendees to nearby dining locations, explain self-service lunch policy" },
      relatedSessions: []
    },
    {
      timeSlot: "13:30-16:30",
      title: { 'zh-tw': "下午場引導服務", 'en': "Afternoon Session Guidance Service" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "下午議程引導，專家面對面時段協助", 'en': "Afternoon session guidance, assist during expert face-to-face sessions" },
      relatedSessions: ["afternoon-session-1", "afternoon-session-2"]
    },
    {
      timeSlot: "16:30-17:00",
      title: { 'zh-tw': "會場整理指引", 'en': "Venue Cleanup Guidance" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "medium",
      estimatedDuration: 30,
      notes: { 'zh-tw': "協助參會者離場，引導會場清理", 'en': "Assist attendee departure, guide venue cleanup" },
      relatedSessions: []
    }
  ],

  technical: [
    {
      timeSlot: "08:30-09:00",
      title: { 'zh-tw': "設備系統檢查", 'en': "Equipment System Check" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 30,
      notes: { 'zh-tw': "檢查所有技術設備，測試投影、音響系統", 'en': "Check all technical equipment, test projection and audio systems" },
      relatedSessions: []
    },
    {
      timeSlot: "09:00-12:00",
      title: { 'zh-tw': "上午場技術支援", 'en': "Morning Session Technical Support" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "監控音響設備，支援講者簡報", 'en': "Monitor audio equipment, support speaker presentations" },
      relatedSessions: ["morning-session-1", "morning-session-2"]
    },
    {
      timeSlot: "12:00-13:30",
      title: { 'zh-tw': "設備維護時段", 'en': "Equipment Maintenance Period" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "medium",
      estimatedDuration: 90,
      notes: { 'zh-tw': "檢查設備狀態，準備下午場次", 'en': "Check equipment status, prepare for afternoon sessions" },
      relatedSessions: []
    },
    {
      timeSlot: "13:30-16:30",
      title: { 'zh-tw': "下午場技術支援", 'en': "Afternoon Session Technical Support" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "監控直播品質，處理技術問題", 'en': "Monitor live stream quality, handle technical issues" },
      relatedSessions: ["afternoon-session-1", "afternoon-session-2"]
    },
    {
      timeSlot: "16:30-17:00",
      title: { 'zh-tw': "設備收整與備份", 'en': "Equipment Storage and Backup" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "medium",
      estimatedDuration: 30,
      notes: { 'zh-tw': "關閉設備系統，備份直播資料", 'en': "Shutdown equipment systems, backup streaming data" },
      relatedSessions: []
    }
  ],

  venue: [
    {
      timeSlot: "08:30-09:00",
      title: { 'zh-tw': "會場最終確認", 'en': "Final Venue Confirmation" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 30,
      notes: { 'zh-tw': "檢查座位配置，確認零食、飲料準備", 'en': "Check seating arrangement, confirm snacks and drinks preparation" },
      relatedSessions: []
    },
    {
      timeSlot: "09:00-12:00",
      title: { 'zh-tw': "上午場場地維護", 'en': "Morning Session Venue Maintenance" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "維持會場清潔，監督餐點準備", 'en': "Maintain venue cleanliness, supervise catering preparation" },
      relatedSessions: ["morning-session-1", "morning-session-2"]
    },
    {
      timeSlot: "12:00-13:30",
      title: { 'zh-tw': "工作人員便當管理", 'en': "Staff Lunch Box Management" },
      location: { 'zh-tw': "講師、後勤休息區", 'en': "Staff Rest Area" },
      priority: "high",
      estimatedDuration: 90,
      notes: { 'zh-tw': "協助便當接收與工作人員用餐區域維護", 'en': "Assist with lunch box reception and staff dining area maintenance" },
      relatedSessions: []
    },
    {
      timeSlot: "13:30-16:30",
      title: { 'zh-tw': "下午場場地維護", 'en': "Afternoon Session Venue Maintenance" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 180,
      notes: { 'zh-tw': "維持會場狀態，準備茶點服務", 'en': "Maintain venue condition, prepare refreshment service" },
      relatedSessions: ["afternoon-session-1", "afternoon-session-2"]
    },
    {
      timeSlot: "16:30-17:00",
      title: { 'zh-tw': "會場收拾整理", 'en': "Venue Cleanup and Organization" },
      location: { 'zh-tw': "主會場 A & 會議室 B", 'en': "Main Hall A & Conference Room B" },
      priority: "high",
      estimatedDuration: 30,
      notes: { 'zh-tw': "進行會場清理，物料回收整理", 'en': "Conduct venue cleanup, organize material collection" },
      relatedSessions: []
    }
  ]
}

// 志工系統完整配置
export const VOLUNTEER_CONFIG: VolunteerConfig = {
  roles: VOLUNTEER_ROLES,
  dailySchedule: VOLUNTEER_SCHEDULES,
  eventDate: VOLUNTEER_TIME_CONFIG.eventDate,
  workingHours: {
    start: VOLUNTEER_TIME_CONFIG.workingStart,
    end: VOLUNTEER_TIME_CONFIG.workingEnd
  }
}

// 時間進度計算工具函式
export const calculateVolunteerProgress = (roleId: string, currentTime: Date = new Date()): {
  overallProgress: number
  currentTask: VolunteerSchedule | null
  nextTask: VolunteerSchedule | null
  isWorkingHours: boolean
} => {
  const { workingStart, workingEnd, eventDate } = VOLUNTEER_TIME_CONFIG
  
  // 轉換為今日時間以便測試 (實際部署時可改為活動日期)
  const today = new Date()
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()
  const currentTotalMinutes = currentHour * 60 + currentMinute
  
  // 工作時間範圍 (08:30 - 17:00)
  const startMinutes = 8 * 60 + 30  // 08:30
  const endMinutes = 17 * 60        // 17:00
  const totalWorkingMinutes = endMinutes - startMinutes
  
  const isWorkingHours = currentTotalMinutes >= startMinutes && currentTotalMinutes <= endMinutes
  
  // 計算整體進度
  let overallProgress = 0
  if (currentTotalMinutes <= startMinutes) {
    overallProgress = 0
  } else if (currentTotalMinutes >= endMinutes) {
    overallProgress = 100
  } else {
    overallProgress = ((currentTotalMinutes - startMinutes) / totalWorkingMinutes) * 100
  }
  
  // 根據角色ID獲取對應的排班資料
  const schedules = VOLUNTEER_SCHEDULES[roleId] || []
  let currentTask: VolunteerSchedule | null = null
  let nextTask: VolunteerSchedule | null = null
  
  for (let i = 0; i < schedules.length; i++) {
    const schedule = schedules[i]
    const [startTime, endTime] = schedule.timeSlot.split('-')
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    
    const scheduleStartMinutes = startHour * 60 + startMin
    const scheduleEndMinutes = endHour * 60 + endMin
    
    if (currentTotalMinutes >= scheduleStartMinutes && currentTotalMinutes <= scheduleEndMinutes) {
      currentTask = schedule
      nextTask = schedules[i + 1] || null
      break
    } else if (currentTotalMinutes < scheduleStartMinutes && !nextTask) {
      nextTask = schedule
      break
    }
  }
  
  return {
    overallProgress: Math.round(overallProgress * 100) / 100,
    currentTask,
    nextTask,
    isWorkingHours
  }
}

// 根據角色ID獲取排班資料
export const getScheduleByRole = (roleId: string): VolunteerSchedule[] => {
  return VOLUNTEER_SCHEDULES[roleId] || []
}

// 根據角色ID獲取活躍的排班資料（過濾已結束的項目，當前和未來的項目按時間排序）
export const getActiveScheduleByRole = (roleId: string, currentTime: Date = new Date()): VolunteerSchedule[] => {
  const schedules = VOLUNTEER_SCHEDULES[roleId] || []
  const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
  
  // 過濾出未結束的項目（當前進行中或尚未開始的）
  const activeSchedules = schedules.filter(schedule => {
    const [, endTime] = schedule.timeSlot.split('-')
    const [endHour, endMin] = endTime.split(':').map(Number)
    const scheduleEndMinutes = endHour * 60 + endMin
    
    // 只顯示尚未結束的項目
    return currentTotalMinutes < scheduleEndMinutes
  })
  
  // 按開始時間排序，讓當前或即將開始的項目顯示在最上方
  return activeSchedules.sort((a, b) => {
    const [aStartTime] = a.timeSlot.split('-')
    const [bStartTime] = b.timeSlot.split('-')
    const [aStartHour, aStartMin] = aStartTime.split(':').map(Number)
    const [bStartHour, bStartMin] = bStartTime.split(':').map(Number)
    
    const aStartMinutes = aStartHour * 60 + aStartMin
    const bStartMinutes = bStartHour * 60 + bStartMin
    
    return aStartMinutes - bStartMinutes
  })
}

// 根據角色ID獲取角色資訊
export const getRoleById = (roleId: string): VolunteerRole | null => {
  return VOLUNTEER_ROLES.find(role => role.id === roleId) || null
}

// 檢查當前是否為活動日
export const isEventDay = (date: Date = new Date()): boolean => {
  const eventDate = new Date(VOLUNTEER_TIME_CONFIG.eventDate)
  return date.toDateString() === eventDate.toDateString()
}
