/**
 * 系統監控配置
 * 統一管理版本檢查、頁面活動監控等系統功能
 */

// 系統監控訊息常數 (國際化 keys)
export const SYSTEM_MESSAGES = {
  versionCheck: {
    skippedFrequent: 'system.versionCheck.skippedFrequent',
    checking: 'system.versionCheck.checking',
    newVersionDetected: 'system.versionCheck.newVersionDetected',
    current: 'system.versionCheck.current',
    passed: 'system.versionCheck.passed',
    aborted: 'system.versionCheck.aborted',
    networkError: 'system.versionCheck.networkError',
    failed: 'system.versionCheck.failed',
    unknownError: 'system.versionCheck.unknownError',
    pageNotVisible: 'system.versionCheck.pageNotVisible',
    triggeredByActivity: 'system.versionCheck.triggeredByActivity'
  },
  
  pageActivity: {
    recovering: 'system.pageActivity.recovering',
    enteredIdle: 'system.pageActivity.enteredIdle',
    networkRestored: 'system.pageActivity.networkRestored',
    networkLost: 'system.pageActivity.networkLost'
  },
  
  resourcePreloader: {
    preloadFailed: 'system.resourcePreloader.preloadFailed'
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