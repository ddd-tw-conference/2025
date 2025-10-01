/**
 * 系統監控配置
 * 統一管理版本檢查、頁面活動監控等系統功能
 */

// 系統監控訊息常數 (支援國際化)
export const SYSTEM_MESSAGES = {
  versionCheck: {
    skippedFrequent: 'Version check skipped - too frequent',
    checking: 'Checking version from:',
    newVersionDetected: 'New version detected:',
    current: 'current:',
    passed: 'Version check passed - no update needed',
    aborted: 'Version check aborted',
    networkError: 'Version check failed - network error (possibly offline):',
    failed: 'Version check failed:',
    unknownError: 'Version check failed with unknown error:',
    pageNotVisible: 'Version check skipped - page not visible',
    triggeredByActivity: '🔄 Version check triggered by activity resume'
  },
  
  pageActivity: {
    recovering: '🔄 Recovering from idle state',
    enteredIdle: '😴 Page entered idle state',
    networkRestored: '🌐 Network connection restored',
    networkLost: '📴 Network connection lost'
  },
  
  resourcePreloader: {
    preloadFailed: 'Failed to preload image:'
  }
} as const

// 系統配置型別定義
export interface SystemConfig {
  enableVersionCheck: boolean
  enablePageActivityMonitor: boolean
  enableResourcePreloader: boolean
  enablePerformanceMonitoring: boolean
}

// 系統功能開關配置
export const SYSTEM_CONFIG: SystemConfig = {
  enableVersionCheck: true,
  enablePageActivityMonitor: true,
  enableResourcePreloader: true,
  enablePerformanceMonitoring: process.env.NODE_ENV === 'development'
} as const