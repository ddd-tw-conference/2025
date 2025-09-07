/**
 * 應用常數統一管理
 * 架構師建議：提取魔法數字和重複使用的常數
 */

// UI 常數
export const UI_CONSTANTS = {
  // 統計數據
  STATISTICS: {
    PARTICIPANTS: '100+',
    SPEAKERS: '13+',
    HOURS: '8',
    SESSIONS: '4'
  },
  
  // 動畫時間
  ANIMATION: {
    DURATION: {
      FAST: 200,
      NORMAL: 300,
      SLOW: 500
    },
    DELAY: {
      SHORT: 100,
      MEDIUM: 500,
      LONG: 1000
    }
  },
  
  // 響應式斷點 (配合 Tailwind)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536
  },
  
  // Z-index 層級管理
  Z_INDEX: {
    BACKGROUND: -1,
    BASE: 0,
    DROPDOWN: 10,
    HEADER: 20,
    MODAL_OVERLAY: 40,
    MODAL: 50,
    TOOLTIP: 60
  },
  
  // 常用顏色主題
  THEME_COLORS: {
    BLUE: 'blue',
    PURPLE: 'purple',
    GREEN: 'green',
    INDIGO: 'indigo',
    ORANGE: 'orange',
    PINK: 'pink'
  } as const
} as const

// 表單驗證常數
export const VALIDATION = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 254
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  }
} as const

// API 常數
export const API_CONSTANTS = {
  ENDPOINTS: {
    // 未來 API 擴展預留
    SPEAKERS: '/api/speakers',
    AGENDA: '/api/agenda',
    REGISTRATION: '/api/registration'
  },
  TIMEOUT: {
    DEFAULT: 5000,
    LONG: 10000
  }
} as const

// 錯誤訊息常數
export const ERROR_MESSAGES = {
  NETWORK: '網路連線發生問題，請稍後再試',
  VALIDATION: '輸入資料格式不正確',
  UNKNOWN: '發生未知錯誤，請聯繫技術支援',
  NOT_FOUND: '找不到您要的頁面',
  SERVER_ERROR: '伺服器暫時無法回應，請稍後再試'
} as const

// 成功訊息常數
export const SUCCESS_MESSAGES = {
  REGISTRATION: '報名成功！我們將寄送確認信至您的信箱',
  SUBSCRIPTION: '訂閱成功！您將收到最新活動資訊',
  CONTACT: '訊息已送出，我們將盡快回覆您'
} as const
