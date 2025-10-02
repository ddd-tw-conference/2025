# 第7章：開發流程與工具鏈

> **本章內容**：開發工作流程、Serena AI 整合、版本監控系統

---

## 🛠️ 開發流程

### 標準開發工作流程
```bash
# 1. 環境準備
pnpm install

# 2. Serena AI 專案索引更新
uvx --from git+https://github.com/oraios/serena serena project index

# 3. 啟動開發
pnpm dev

# 4. 建置檢查
pnpm build
```

### 配置驅動開發原則
**所有功能狀態由 `@/config` 統一管理，禁止硬編碼！**

```tsx
// ✅ 正確：使用配置
import { TICKET_SALE_CONFIG } from '@/config'
{TICKET_SALE_CONFIG.isTicketSaleActive && <TicketSection />}

// ❌ 錯誤：硬編碼
{true && <TicketSection />}
```
```typescript
import { TICKET_SALE_CONFIG } from '@/config/tickets'

if (TICKET_SALE_CONFIG.isTicketSaleActive) {
  // 顯示購票按鈕
}
```

### 最小修改原則（圖片更新實踐智慧）
**善用現有工具鏈，避免重複造輪子！**

```powershell
# ✅ 正確：使用專案既有腳本
# 1. 觸發覆寫判斷（利用 mtime 機制）
(Get-Item 'path/to/image.jpg').LastWriteTime = Get-Date
# 2. 執行現有轉換腳本（已含智慧品質設定）
node scripts/generate-all-webp.js

# ❌ 錯誤：手動處理或新增工具
# 不要重複開發已有功能
```

**關鍵洞察**：專案的 `scripts/generate-all-webp.js` 已具備：
- mtime 檢查（避免重複轉換）
- 智慧品質設定（85-90 based on file size）
- 自動壓縮優化（平均節省 40%+ 空間）

---

## 🤖 Serena AI 整合工作流程

### 專案索引更新
**每次重大程式碼變更後，必須執行 Serena 專案索引更新！**

```bash
# 標準 Serena 更新指令
uvx --from git+https://github.com/oraios/serena serena project index
```

### 開發流程整合
```bash
# 1. 開發前更新
uvx --from git+https://github.com/oraios/serena serena project index

# 2. 開發過程
# 進行程式碼開發...

# 3. 提交前更新
git add .
uvx --from git+https://github.com/oraios/serena serena project index
git commit -m "feat: 新功能 + Serena index 更新"

# 4. 部署前確認
pnpm build
```

### 何時必須更新索引
- React 元件新增/修改
- `config/*` 檔案變更
- TypeScript 型別定義
- Next.js 路由調整
- 文檔更新
- 功能開發完成後

---

## 🔍 版本監控系統

### 快捷鍵觸發
```tsx
// 按 Ctrl+Shift+V 開啟版本監控面板
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
      setIsVisible(prev => !prev)
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

### 監控功能
- **版本檢查**：本地 vs 遠端版本比較
- **效能監控**：Web Vitals 即時指標
- **配置狀態**：當前票券/功能配置檢視

---

## 📋 常用開發指令

```bash
# 基本開發
pnpm dev                    # 開發模式
pnpm build                  # 建置專案
pnpm start                  # 預覽建置結果

# 程式碼品質
pnpm lint                   # ESLint 檢查
pnpm type-check             # TypeScript 檢查

# 圖片優化
pnpm optimize:images        # WebP 轉換

# Serena AI
uvx --from git+https://github.com/oraios/serena serena project index
```

---

**下一章：[第8章 SEO 與部署](./08-seo-deployment.md)**
            size="sm"
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

## 🤖 Serena AI 輔助工具

### 📖 Serena 簡介
Serena 是基於 LLM 的智能開發助手，提供專案知識索引、程式碼理解和開發輔助功能。

#### 🎯 核心功能
- **智能專案索引**：自動分析專案結構和程式碼符號
- **上下文理解**：理解專案架構、設計模式和業務邏輯
- **開發輔助**：提供程式碼建議、重構和除錯協助
- **文件整合**：索引專案文件和 Copilot 指令

### 🔧 安裝與配置

#### 安裝 Serena
```bash
# 使用 pip 安裝
pip install git+https://github.com/oraios/serena

# 驗證安裝
serena --version
```

#### 專案配置
專案已包含 `.serena/project.yml` 配置檔案，針對 DDD Taiwan 2025 專案優化：

```yaml
# DDD Taiwan 2025 Conference Website - Serena Project Configuration
language: typescript
project_name: "DDD Taiwan 2025"
ignore_all_files_in_gitignore: true

ignored_paths:
  # Build and dependency directories
  - "node_modules/**"
  - ".next/**" 
  - "out/**"
  
  # Cache and temporary files
  - "*.tsbuildinfo"
  - ".pnpm-debug.log*"
  
  # IDE files
  - ".vscode/**"
  - ".idea/**"
  
  # Generated files
  - "next-env.d.ts"
  - "pnpm-lock.yaml"
  
  # Large binary files
  - "public/images/**/*.{jpg,jpeg,png,gif,svg,webp}"
```

### 🚀 使用指南

#### 專案索引更新
**重要**：每次專案有重大變更後，都需要重新執行索引以確保 Serena 掌握最新的專案狀態。

```bash
# 執行專案索引（推薦使用 uvx）
uvx --from git+https://github.com/oraios/serena serena project index

# 或使用已安裝的 serena
serena project index
```

#### 🔄 自動化索引時機
在以下情況後，**必須**執行 `serena project index`：

1. **新增/修改元件**：新增 React 元件或修改現有元件結構
2. **配置變更**：修改 `config/*` 檔案中的業務邏輯
3. **路由更新**：新增或修改 Next.js 頁面路由
4. **型別定義變更**：修改 TypeScript 型別或介面
5. **文件更新**：更新 `docs/` 資料夾或 `copilot-instructions.md`
6. **重要功能開發完成**：完成一個功能模組的開發

#### 💡 最佳實踐

##### 開發週期集成
```bash
# 開發前：確保索引是最新的
uvx --from git+https://github.com/oraios/serena serena project index

# 開發中：根據變更規模決定是否重新索引
# 小修改（如樣式調整）：不需要重新索引
# 大修改（如新增功能）：建議重新索引

# 開發完成：必須重新索引
uvx --from git+https://github.com/oraios/serena serena project index
```

##### Git 工作流程集成
```bash
# 在 commit 前執行索引更新
git add .
uvx --from git+https://github.com/oraios/serena serena project index
git commit -m "feat: 新增功能並更新 Serena 索引"
```

### 🎯 與 GitHub Copilot 整合
Serena 索引的專案知識可以增強 GitHub Copilot 的建議準確性：

1. **專案上下文**：Serena 提供完整的專案結構理解
2. **設計模式**：理解專案中使用的架構模式
3. **業務邏輯**：掌握票券系統、多語言等核心功能
4. **程式碼風格**：遵循專案的編碼規範和慣例

---

## � 開發工作流程

### 🚀 開發前準備
```bash
# 1. 環境檢查
pnpm dev  # 確認開發伺服器正常啟動

# 2. 配置檢查
# 檢查 config/tickets.ts 中的 isTicketSaleActive 狀態
# 驗證 locales/ 目錄下的語言檔案完整性

# 3. 依賴更新
pnpm install  # 確保所有依賴最新
```

### � 開發實作流程
```typescript
// 遵循配置驅動開發模式
// 1. 配置優先 - 從 @/config 取得設定，避免硬編碼
// 2. i18n 支援 - 所有文字透過 t() 函數處理
// 3. 響應式設計 - 使用 md: 前綴處理桌面版

// 範例：新功能實作
const { t } = useI18n()
const config = TICKET_SALE_CONFIG

// 配置驅動的條件渲染
{config.isTicketSaleActive && (
  <TicketSection title={t('tickets.title')} />
)}
```

### 🔍 開發驗證檢查點
- [ ] `pnpm build` 建置成功
- [ ] 多語言切換功能正常
- [ ] 按鈕狀態反映配置設定
- [ ] 版面在行動/桌面裝置正常顯示
- [ ] 無 TypeScript 型別錯誤
- [ ] 符合設計系統規範

### � 建置與部署腳本

#### scripts/deploy-check.js
```javascript
// 部署前完整檢查腳本
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

## 🔧 常見問題與解決方案

### 🚨 Hydration 錯誤修正

#### 問題描述
Next.js 15 應用中可能遇到 React hydration 錯誤，通常由瀏覽器擴充功能（如 Grammarly）動態添加屬性造成：

```
A tree hydrated but some attributes of the server rendered HTML 
didn't match the client properties.
```

**常見觸發原因：**
- Grammarly 擴充功能添加 `data-new-gr-c-s-check-loaded` 屬性
- 廣告攔截器修改 DOM 結構
- 其他瀏覽器擴充功能的 DOM 操作

#### 解決方案
在 `app/layout.tsx` 中添加 `suppressHydrationWarning` 屬性：

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        {/* meta tags */}
      </head>
      <body 
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}
        suppressHydrationWarning={true}  // 新增此行
      >
        {children}
      </body>
    </html>
  )
}
```

**注意事項：**
- `suppressHydrationWarning` 僅用於 `body` 標籤
- 專門處理瀏覽器擴充功能造成的 hydration 不匹配
- 這是 React 官方推薦的解決方案
- 不會影響應用程式的功能性

### 🎯 事件處理最佳實踐

#### 事件冒泡控制
在實作複合互動元件時（如可點擊卡片內的按鈕），需要正確處理事件冒泡：

```tsx
// components/speaker-cards.tsx
const SpeakerCard = ({ speaker, onCardClick, onTicketClick }) => {
  const handleCardClick = () => {
    onCardClick(speaker)
  }

  const handleTicketClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 防止觸發卡片點擊
    onTicketClick(speaker)
  }

  return (
    <div 
      onClick={handleCardClick} 
      className="cursor-pointer"
    >
      {/* 卡片內容 */}
      <button 
        onClick={handleTicketClick}  // 使用事件隔離的處理器
        className="..."
      >
        購票
      </button>
    </div>
  )
}
```

**關鍵點：**
- 使用 `e.stopPropagation()` 防止事件冒泡
- 為卡片元素添加 `cursor-pointer` 提供視覺回饋
- 確保按鈕和卡片的點擊行為獨立

### 🧪 功能測試指南

#### 講者導航系統測試項目

**基本功能測試：**
1. **卡片點擊跳轉**：首頁精選講師卡片點擊能正常跳轉
2. **購票按鈕隔離**：購票按鈕點擊不觸發卡片跳轉
3. **Lightbox 自動開啟**：跳轉後 Lightbox 自動顯示對應講者
4. **分享連結**：直接訪問 `/speakers?id=speaker-id` 能開啟 Lightbox

**智慧導航測試：**
1. **從首頁進入**：關閉 Lightbox 後返回首頁
2. **直接訪問**：關閉 Lightbox 後停留在講者頁面
3. **多語系**：切換語系功能正常
4. **響應式**：手機、平板、桌面版本正常運作

**測試連結範例：**
```
- Michael: /speakers?id=michael-chen
- Sunny Cheng: /speakers?id=sunny-cheng
- Fong: /speakers?id=fong-liu
- Arthur: /speakers?id=arthur
```

#### 自動化測試建議

```typescript
// 範例：講者導航功能測試
describe('Speaker Navigation System', () => {
  test('應該從首頁跳轉到講者頁面並開啟 Lightbox', async () => {
    // 1. 訪問首頁
    await page.goto('/')
    
    // 2. 點擊精選講師卡片
    await page.click('[data-testid="speaker-card-michael-chen"]')
    
    // 3. 驗證 URL 變更
    expect(page.url()).toContain('/speakers?id=michael-chen')
    
    // 4. 驗證 Lightbox 開啟
    await expect(page.locator('[data-testid="speaker-lightbox"]')).toBeVisible()
  })

  test('關閉 Lightbox 應該返回首頁', async () => {
    // 1. 從首頁進入講者頁面
    await page.goto('/speakers?id=michael-chen')
    
    // 2. 關閉 Lightbox
    await page.click('[data-testid="lightbox-close"]')
    
    // 3. 驗證返回首頁
    expect(page.url()).toBe('/')
  })
})
```

### 🔍 除錯技巧

#### 使用版本監控工具
利用內建的版本監控系統（按 `Ctrl+Shift+V`）來檢查：
- 當前版本資訊
- 效能指標
- 配置狀態

#### 瀏覽器開發者工具
- **Console**：檢查 JavaScript 錯誤和警告
- **Network**：監控 API 請求和資源載入
- **Performance**：分析頁面效能瓶頸
- **Application**：檢查 Local Storage 和 Session Storage

---

**下一章：** [第8章：SEO 與部署](./08-seo-deployment.md) - 深入了解搜尋引擎優化與 GitHub Pages 部署策略
