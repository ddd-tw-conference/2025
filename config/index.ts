/**
 * 配置統一匯出
 * 集中管理所有應用配置的統一入口
 */

// 主應用配置
export { CONFIG } from './app'
export type { Config, DeploymentConfig, ConferenceConfig } from './app'

// 票券配置
export {
  TICKET_SALE_CONFIG,
  getTicketPurchaseUrl,
  isTicketAvailable,
  isEarlyBirdAvailable,
  isRegularTicketAvailable
} from './tickets'
export type { TicketSaleConfig } from './tickets'

// 效能配置
export {
  PERFORMANCE_CONFIG,
  generateImageSrcSet,
  getOptimizedImageUrl,
  getSupportedImageFormat
} from './performance'

// 應用常數
export {
  UI_CONSTANTS,
  VALIDATION,
  API_CONSTANTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
} from './constants'

// 議程配置
export {
  AGENDA_TIME_CONFIG,
  SESSION_PATTERNS,
  calculateSessionTimes
} from './agenda'
