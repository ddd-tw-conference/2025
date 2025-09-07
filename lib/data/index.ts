/**
 * 會議資料統一匯出
 * 整合所有會議相關資料和工具函式的統一入口
 */

// 類型定義
export type {
  Speaker,
  Session,
  SpeakerTopic,
  SessionPatternConfig,
  AgendaTimeConfig
} from './types'

// 講者資料
export { SPEAKERS_DATA } from './speakers'

// 議程資料
export { AGENDA_DATA } from './agenda'

// 議程配置
export {
  AGENDA_TIME_CONFIG,
  SESSION_PATTERNS,
  calculateSessionTimes
} from '@/config/agenda'

// 統計資料和工具函式
export {
  CONFERENCE_STATISTICS,
  getLocalizedText,
  getLocalizedArray
} from './utils'
