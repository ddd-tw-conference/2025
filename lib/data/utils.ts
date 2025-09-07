/**
 * 會議統計資料和共用工具函式
 * 包含參與人數、講者數量等統計資訊和多語言工具函式
 */

// 統計數據
export const CONFERENCE_STATISTICS = {
  PARTICIPANTS: '100+',
  SPEAKERS: '8+',
  HOURS: '8',
  SESSIONS: '4'
} as const

// 多語言工具函式
export const getLocalizedText = (
  textObj: { 'zh-tw': string; 'en': string },
  language: string
): string => {
  return textObj[language as 'zh-tw' | 'en'] || textObj['zh-tw']
}

// 多語言陣列工具函式  
export const getLocalizedArray = (
  arrayObj: { 'zh-tw': string[]; 'en': string[] },
  language: string
): string[] => {
  return arrayObj[language as 'zh-tw' | 'en'] || arrayObj['zh-tw']
}
