# 第7章：開發工具與除錯

> **本章內容**：版本監控系統、熱重載機制、AI 輔助除錯、開發工具鏈

---

## 🛠️ 開發工具概覽

### 🎯 工具系統架構
```
開發工具鏈
├── 版本監控系統
│   ├── 快捷鍵觸發 (Ctrl+Shift+V)
│   ├── 版本檢查與提示
│   ├── 效能監控面板
│   └── 配置狀態檢視
├── 熱重載機制
│   ├── 檔案變化監控
│   ├── 自動重新整理
│   └── 狀態保持
├── 除錯工具
│   ├── AI 輔助除錯
│   ├── 錯誤追蹤系統
│   └── 效能分析工具
└── 建置工具
    ├── 程式碼檢查
    ├── 型別檢查
    └── 建置優化
```

---

## 🔍 版本監控系統

### ⌨️ 版本監控 UI

#### 核心功能設計
- **隱式觸發**：預設隱藏，按 `Ctrl+Shift+V` 顯示
- **版本檢查**：比較本地與遠端版本
- **效能監控**：即時 Web Vitals 指標
- **配置檢視**：當前票券配置狀態

#### components/version-monitor.tsx
```tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { CONFIG, TICKET_SALE_CONFIG } from '@/config'
import { Button } from '@/components/ui/button'

interface VersionInfo {
  current: string
  latest?: string
  buildTime: string
  isUpdateAvailable: boolean
}

interface WebVital {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

export const VersionMonitor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'version' | 'performance' | 'config'>('version')
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null)
  const [webVitals, setWebVitals] = useState<WebVital[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 快捷鍵監聽
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 版本檢查功能
  const checkVersion = useCallback(async () => {
    setIsLoading(true)
    try {
      // 讀取本地版本
      const localResponse = await fetch('/version.json')
      const localVersion = await localResponse.json()

      // 檢查遠端版本（帶時間戳避免快取）
      const remoteResponse = await fetch(`/version.json?t=${Date.now()}`)
      const remoteVersion = await remoteResponse.json()

      setVersionInfo({
        current: localVersion.version,
        latest: remoteVersion.version,
        buildTime: localVersion.buildTime,
        isUpdateAvailable: localVersion.version !== remoteVersion.version
      })
    } catch (error) {
      console.error('Version check failed:', error)
      setVersionInfo({
        current: 'Unknown',
        buildTime: 'Unknown',
        isUpdateAvailable: false
      })
    }
    setIsLoading(false)
  }, [])

  // Web Vitals 監控
  useEffect(() => {
    if (isVisible && activeTab === 'performance') {
      import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB }) => {
        const updateVital = (vital: any) => {
          setWebVitals(prev => {
            const existing = prev.find(v => v.name === vital.name)
            if (existing) {
              return prev.map(v => v.name === vital.name ? vital : v)
            }
            return [...prev, vital]
          })
        }

        onCLS(updateVital)
        onFID(updateVital)
        onLCP(updateVital)
        onFCP(updateVital)
        onTTFB(updateVital)
      })
    }
  }, [isVisible, activeTab])

  // 初次顯示時檢查版本
  useEffect(() => {
    if (isVisible && !versionInfo) {
      checkVersion()
    }
  }, [isVisible, versionInfo, checkVersion])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* 標題列 */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            開發工具面板
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </Button>
        </div>

        {/* 分頁選單 */}
        <div className="flex border-b border-slate-700">
          {[
            { key: 'version', label: '版本資訊', icon: '📦' },
            { key: 'performance', label: '效能監控', icon: '📊' },
            { key: 'config', label: '配置狀態', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 內容區域 */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'version' && (
            <VersionPanel 
              versionInfo={versionInfo} 
              isLoading={isLoading} 
              onRefresh={checkVersion} 
            />
          )}
          {activeTab === 'performance' && (
            <PerformancePanel webVitals={webVitals} />
          )}
          {activeTab === 'config' && (
            <ConfigPanel />
          )}
        </div>
      </div>
    </div>
  )
}

// 版本資訊面板
const VersionPanel = ({ versionInfo, isLoading, onRefresh }: {
  versionInfo: VersionInfo | null
  isLoading: boolean
  onRefresh: () => void
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-white">版本檢查</h3>
      <Button
        size="sm"
        onClick={onRefresh}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? '檢查中...' : '重新檢查'}
      </Button>
    </div>

    {versionInfo && (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <div className="text-sm text-gray-400">目前版本</div>
            <div className="text-lg font-mono text-white">{versionInfo.current}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <div className="text-sm text-gray-400">最新版本</div>
            <div className="text-lg font-mono text-white">
              {versionInfo.latest || '檢查中...'}
            </div>
          </div>
        </div>

        {versionInfo.isUpdateAvailable && (
          <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-400">
              <span>⚠️</span>
              <span className="font-medium">有新版本可用</span>
            </div>
            <p className="text-sm text-orange-300 mt-1">
              請重新整理頁面以載入最新版本
            </p>
            <Button
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-2 bg-orange-600 hover:bg-orange-700"
            >
              立即更新
            </Button>
          </div>
        )}

        <div className="text-sm text-gray-400">
          建置時間: {new Date(versionInfo.buildTime).toLocaleString('zh-TW')}
        </div>
      </div>
    )}
  </div>
)

// 效能監控面板
const PerformancePanel = ({ webVitals }: { webVitals: WebVital[] }) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-400'
      case 'needs-improvement': return 'text-yellow-400'
      case 'poor': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') return value.toFixed(3)
    return Math.round(value) + 'ms'
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Web Vitals 監控</h3>
      
      {webVitals.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {webVitals.map(vital => (
            <div key={vital.name} className="bg-slate-800/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{vital.name}</div>
                  <div className="text-sm text-gray-400">
                    {vital.name === 'LCP' && '最大內容繪製'}
                    {vital.name === 'FID' && '首次輸入延遲'}
                    {vital.name === 'CLS' && '累計版面偏移'}
                    {vital.name === 'FCP' && '首次內容繪製'}
                    {vital.name === 'TTFB' && '第一位元組時間'}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-mono ${getRatingColor(vital.rating)}`}>
                    {formatValue(vital.name, vital.value)}
                  </div>
                  <div className={`text-xs ${getRatingColor(vital.rating)}`}>
                    {vital.rating === 'good' && '優秀'}
                    {vital.rating === 'needs-improvement' && '需改善'}
                    {vital.rating === 'poor' && '差'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <div className="text-4xl mb-2">📊</div>
          <div>正在收集效能數據...</div>
        </div>
      )}
    </div>
  )
}

// 配置狀態面板
const ConfigPanel = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">系統配置狀態</h3>
    
    <div className="space-y-3">
      {/* 票券配置 */}
      <div className="bg-slate-800/50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-400 mb-3">票券系統</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">售票狀態:</span>
            <span className={`ml-2 ${TICKET_SALE_CONFIG.isTicketSaleActive ? 'text-green-400' : 'text-red-400'}`}>
              {TICKET_SALE_CONFIG.isTicketSaleActive ? '✅ 開放' : '❌ 關閉'}
            </span>
          </div>
          <div>
            <span className="text-gray-400">早鳥票:</span>
            <span className={`ml-2 ${TICKET_SALE_CONFIG.isEarlyBirdSoldOut ? 'text-red-400' : 'text-green-400'}`}>
              {TICKET_SALE_CONFIG.isEarlyBirdSoldOut ? '❌ 售罄' : '✅ 可購買'}
            </span>
          </div>
          <div>
            <span className="text-gray-400">優惠碼:</span>
            <span className={`ml-2 ${TICKET_SALE_CONFIG.promoCode?.isVisible ? 'text-green-400' : 'text-gray-500'}`}>
              {TICKET_SALE_CONFIG.promoCode?.isVisible ? '✅ 顯示' : '🔒 隱藏'}
            </span>
          </div>
        </div>
      </div>

      {/* 應用配置 */}
      <div className="bg-slate-800/50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-400 mb-3">應用設定</h4>
        <div className="text-sm space-y-2">
          <div>
            <span className="text-gray-400">部署路徑:</span>
            <span className="ml-2 text-white font-mono">{CONFIG.deployment.basePath}</span>
          </div>
          <div>
            <span className="text-gray-400">會議年份:</span>
            <span className="ml-2 text-white">{CONFIG.conference.year}</span>
          </div>
          <div>
            <span className="text-gray-400">環境:</span>
            <span className="ml-2 text-white">{process.env.NODE_ENV}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
```

---

## 🔄 熱重載與自動更新

### 🚀 熱重載機制

#### 開發環境熱重載
Next.js 15.5.2 內建快速重載功能，但我們針對版本檢查實作了自動更新提示：

```typescript
// lib/version-check.ts
export class VersionChecker {
  private checkInterval: NodeJS.Timeout | null = null
  private lastKnownVersion: string | null = null

  constructor(private intervalMs: number = 60000) {} // 預設 1 分鐘檢查一次

  async start() {
    // 立即執行一次檢查
    await this.checkVersion()
    
    // 設定定期檢查
    this.checkInterval = setInterval(() => {
      this.checkVersion()
    }, this.intervalMs)
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
  }

  private async checkVersion() {
    try {
      const response = await fetch(`/version.json?t=${Date.now()}`, {
        cache: 'no-store'
      })
      const versionData = await response.json()
      
      if (this.lastKnownVersion && this.lastKnownVersion !== versionData.version) {
        this.notifyUpdate(versionData.version)
      }
      
      this.lastKnownVersion = versionData.version
    } catch (error) {
      console.warn('Version check failed:', error)
    }
  }

  private notifyUpdate(newVersion: string) {
    // 顯示更新通知
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('DDDTW 2025 有新版本', {
        body: `版本 ${newVersion} 已發布，點擊重新載入`,
        icon: '/favicon.ico'
      })
    }
    
    // 或使用自定義 Toast 通知
    this.showUpdateToast(newVersion)
  }

  private showUpdateToast(newVersion: string) {
    // 實作自定義更新提示
    const toast = document.createElement('div')
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50'
    toast.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <div class="font-semibold">新版本可用 (${newVersion})</div>
          <div class="text-sm opacity-90">點擊重新載入頁面</div>
        </div>
        <button onclick="window.location.reload()" class="ml-4 bg-white/20 px-3 py-1 rounded text-sm">
          更新
        </button>
      </div>
    `
    
    document.body.appendChild(toast)
    
    // 5 秒後自動移除
    setTimeout(() => {
      toast.remove()
    }, 5000)
  }
}
```

#### 使用版本檢查器
```tsx
// app/layout.tsx
'use client'

import { useEffect } from 'react'
import { VersionChecker } from '@/lib/version-check'

export default function RootLayout({ children }) {
  useEffect(() => {
    const versionChecker = new VersionChecker(60000) // 1 分鐘檢查
    versionChecker.start()
    
    return () => versionChecker.stop()
  }, [])
  
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

---

## 🐛 AI 輔助除錯系統

### 🤖 智慧錯誤分析

#### 錯誤分類與處理
```typescript
// lib/error-handler.ts
export interface ErrorContext {
  component: string
  action: string
  timestamp: number
  userAgent: string
  url: string
  userId?: string
}

export class AIAssistedErrorHandler {
  private errors: Array<Error & { context: ErrorContext }> = []
  
  captureError(error: Error, context: Partial<ErrorContext>) {
    const fullContext: ErrorContext = {
      component: 'Unknown',
      action: 'Unknown',
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...context
    }
    
    const enrichedError = Object.assign(error, { context: fullContext })
    this.errors.push(enrichedError)
    
    // AI 輔助分析
    this.analyzeError(enrichedError)
  }
  
  private analyzeError(error: Error & { context: ErrorContext }) {
    const suggestions = this.generateSuggestions(error)
    
    if (process.env.NODE_ENV === 'development') {
      console.group('🤖 AI 錯誤分析')
      console.error('錯誤詳情:', error)
      console.info('發生情境:', error.context)
      console.warn('建議解決方案:', suggestions)
      console.groupEnd()
    }
    
    // 發送到監控服務（生產環境）
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(error, suggestions)
    }
  }
  
  private generateSuggestions(error: Error & { context: ErrorContext }): string[] {
    const suggestions: string[] = []
    
    // 網路錯誤
    if (error.message.includes('fetch') || error.message.includes('network')) {
      suggestions.push('檢查網路連線狀態')
      suggestions.push('確認 API 端點是否正常運作')
      suggestions.push('檢查 CORS 設定')
    }
    
    // React 渲染錯誤
    if (error.message.includes('Cannot read') || error.message.includes('undefined')) {
      suggestions.push('檢查資料是否正確載入')
      suggestions.push('確認元件 props 型別正確')
      suggestions.push('增加 null 檢查或預設值')
    }
    
    // 版本相關錯誤
    if (error.context.component.includes('version') || error.message.includes('version')) {
      suggestions.push('清除瀏覽器快取')
      suggestions.push('檢查 version.json 檔案')
      suggestions.push('確認 CDN 快取更新')
    }
    
    // i18n 錯誤
    if (error.message.includes('translation') || error.context.component.includes('i18n')) {
      suggestions.push('檢查語言檔案完整性')
      suggestions.push('確認翻譯鍵值存在')
      suggestions.push('驗證 I18nProvider 包裝正確')
    }
    
    return suggestions
  }
  
  private sendToMonitoring(error: Error, suggestions: string[]) {
    // 發送到外部監控服務（如 Sentry）
    // 這裡可以整合各種監控平台
  }
  
  // 取得錯誤統計
  getErrorStats() {
    return {
      total: this.errors.length,
      byComponent: this.groupBy(this.errors, 'context.component'),
      byAction: this.groupBy(this.errors, 'context.action'),
      recent: this.errors.filter(e => 
        Date.now() - e.context.timestamp < 5 * 60 * 1000 // 最近 5 分鐘
      )
    }
  }
  
  private groupBy(arr: any[], key: string) {
    return arr.reduce((groups, item) => {
      const group = key.split('.').reduce((obj, k) => obj[k], item)
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    }, {})
  }
}

// 全域錯誤處理器實例
export const errorHandler = new AIAssistedErrorHandler()
```

#### React 錯誤邊界
```tsx
// components/error-boundary.tsx
'use client'

import { Component, ReactNode } from 'react'
import { errorHandler } from '@/lib/error-handler'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  componentName?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    errorHandler.captureError(error, {
      component: this.props.componentName || 'ErrorBoundary',
      action: 'render',
      extraInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
          <h3 className="text-red-800 font-semibold mb-2">發生錯誤</h3>
          <p className="text-red-600 text-sm mb-4">
            {this.state.error?.message || '未知錯誤'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
          >
            重試
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

## 🔧 開發工具腳本

### 📋 程式碼品質檢查

#### scripts/dev-check.sh
```bash
#!/bin/bash
# 完整的開發檢查腳本

echo "🔍 執行開發環境檢查..."

# 1. TypeScript 檢查
echo "📝 TypeScript 型別檢查..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript 檢查失敗"
  exit 1
fi

# 2. ESLint 檢查
echo "🔧 ESLint 程式碼檢查..."
npx eslint . --ext .ts,.tsx --max-warnings 0
if [ $? -ne 0 ]; then
  echo "❌ ESLint 檢查失敗"
  exit 1
fi

# 3. 建置測試
echo "📦 建置測試..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 建置失敗"
  exit 1
fi

# 4. 圖片優化檢查
echo "📸 圖片優化檢查..."
node scripts/check-image-sizes.js

# 5. 翻譯完整性檢查
echo "🌍 翻譯檢查..."
node scripts/check-translations.js

echo "✅ 所有檢查通過！"
```

#### scripts/performance-audit.js
```javascript
// 效能稽核腳本
const puppeteer = require('puppeteer')
const lighthouse = require('lighthouse')

async function performanceAudit() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  })
  
  const page = await browser.newPage()
  
  try {
    // 設定視窗大小
    await page.setViewport({ width: 1200, height: 800 })
    
    console.log('🚀 開始效能稽核...')
    
    // 測試首頁載入
    const startTime = Date.now()
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle0',
      timeout: 30000
    })
    const loadTime = Date.now() - startTime
    
    console.log(`⏱️ 首頁載入時間: ${loadTime}ms`)
    
    // 檢查核心元素
    const coreElements = [
      'header',
      'main',
      'footer'
    ]
    
    for (const element of coreElements) {
      const exists = await page.$(element)
      console.log(`${exists ? '✅' : '❌'} ${element} 元素`)
    }
    
    // 檢查 JavaScript 錯誤
    const jsErrors = []
    page.on('pageerror', error => {
      jsErrors.push(error.message)
    })
    
    // 模擬使用者互動
    await page.click('button') // 假設有按鈕
    await page.waitForTimeout(1000)
    
    if (jsErrors.length > 0) {
      console.log('❌ JavaScript 錯誤:')
      jsErrors.forEach(error => console.log(`  - ${error}`))
    } else {
      console.log('✅ 無 JavaScript 錯誤')
    }
    
    // Lighthouse 效能評估
    const { port } = new URL(browser.wsEndpoint())
    const result = await lighthouse('http://localhost:3000', {
      port,
      output: 'json',
      logLevel: 'error'
    })
    
    const scores = result.lhr.categories
    console.log('📊 Lighthouse 分數:')
    console.log(`  效能: ${Math.round(scores.performance.score * 100)}`)
    console.log(`  可及性: ${Math.round(scores.accessibility.score * 100)}`)
    console.log(`  最佳實踐: ${Math.round(scores['best-practices'].score * 100)}`)
    console.log(`  SEO: ${Math.round(scores.seo.score * 100)}`)
    
  } catch (error) {
    console.error('❌ 稽核過程發生錯誤:', error)
  } finally {
    await browser.close()
  }
}

performanceAudit().catch(console.error)
```

---

## 🚀 建置與部署工具

### 📦 自動化建置腳本

#### scripts/deploy-check.js
```javascript
// 部署前檢查腳本
const fs = require('fs')
const path = require('path')

function checkDeploymentReadiness() {
  console.log('🚀 檢查部署準備狀態...')
  
  const checks = [
    checkVersionFile,
    checkStaticFiles,
    checkConfigFiles,
    checkImageOptimization,
    checkBuildOutput
  ]
  
  let allPassed = true
  
  for (const check of checks) {
    const result = check()
    if (!result.passed) {
      allPassed = false
      console.log(`❌ ${result.name}: ${result.message}`)
    } else {
      console.log(`✅ ${result.name}`)
    }
  }
  
  if (allPassed) {
    console.log('🎉 部署檢查通過，可以部署！')
  } else {
    console.log('🚫 部署檢查失敗，請修正問題後重試')
    process.exit(1)
  }
}

function checkVersionFile() {
  try {
    const versionPath = path.join(__dirname, '../public/version.json')
    const version = JSON.parse(fs.readFileSync(versionPath, 'utf8'))
    
    if (!version.version || !version.buildTime) {
      return { 
        passed: false, 
        name: 'Version File', 
        message: '版本檔案缺少必要欄位' 
      }
    }
    
    return { passed: true, name: 'Version File' }
  } catch (error) {
    return { 
      passed: false, 
      name: 'Version File', 
      message: '版本檔案不存在或格式錯誤' 
    }
  }
}

function checkStaticFiles() {
  const requiredFiles = [
    'public/favicon.ico',
    'public/robots.txt'
  ]
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, '..', file))) {
      return { 
        passed: false, 
        name: 'Static Files', 
        message: `缺少必要檔案: ${file}` 
      }
    }
  }
  
  return { passed: true, name: 'Static Files' }
}

function checkConfigFiles() {
  try {
    // 檢查 Next.js 配置
    require('../next.config.mjs')
    
    // 檢查應用配置
    require('../config')
    
    return { passed: true, name: 'Config Files' }
  } catch (error) {
    return { 
      passed: false, 
      name: 'Config Files', 
      message: `配置檔案錯誤: ${error.message}` 
    }
  }
}

function checkImageOptimization() {
  const imagesDir = path.join(__dirname, '../public/images')
  
  if (!fs.existsSync(imagesDir)) {
    return { passed: true, name: 'Image Optimization' }
  }
  
  // 檢查是否有未優化的圖片
  const checkDir = (dir) => {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        const result = checkDir(filePath)
        if (!result) return false
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        // 檢查是否有對應的 WebP 檔案
        const webpFile = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        const webpPath = path.join(dir, webpFile)
        
        if (!fs.existsSync(webpPath)) {
          return false
        }
      }
    }
    return true
  }
  
  const allOptimized = checkDir(imagesDir)
  
  return { 
    passed: allOptimized, 
    name: 'Image Optimization',
    message: allOptimized ? undefined : '部分圖片尚未轉換為 WebP'
  }
}

function checkBuildOutput() {
  const outDir = path.join(__dirname, '../out')
  
  if (!fs.existsSync(outDir)) {
    return { 
      passed: false, 
      name: 'Build Output', 
      message: '建置輸出目錄不存在，請執行 npm run build' 
    }
  }
  
  // 檢查關鍵檔案
  const requiredFiles = [
    'index.html',
    '_next'
  ]
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(outDir, file))) {
      return { 
        passed: false, 
        name: 'Build Output', 
        message: `建置輸出缺少: ${file}` 
      }
    }
  }
  
  return { passed: true, name: 'Build Output' }
}

checkDeploymentReadiness()
```

---

## 🔍 監控與分析

### 📊 即時監控 Dashboard

整合到版本監控系統中的效能監控：

```tsx
// components/monitoring-dashboard.tsx
export const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState({
    pageViews: 0,
    errors: 0,
    avgLoadTime: 0,
    bounceRate: 0
  })
  
  useEffect(() => {
    // 從 Web Vitals 和錯誤處理器收集數據
    const errorStats = errorHandler.getErrorStats()
    
    setMetrics(prev => ({
      ...prev,
      errors: errorStats.total
    }))
  }, [])
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        title="頁面瀏覽"
        value={metrics.pageViews}
        unit=""
        trend="up"
      />
      <MetricCard
        title="錯誤數量"
        value={metrics.errors}
        unit=""
        trend={metrics.errors > 5 ? "down" : "stable"}
      />
      <MetricCard
        title="載入時間"
        value={metrics.avgLoadTime}
        unit="ms"
        trend="stable"
      />
      <MetricCard
        title="跳出率"
        value={metrics.bounceRate}
        unit="%"
        trend="stable"
      />
    </div>
  )
}
```

---

**下一章：** [第8章：SEO 與部署](./08-seo-deployment.md) - 深入了解搜尋引擎優化與 GitHub Pages 部署策略
