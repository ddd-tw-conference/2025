# 重要函式與工具索引

## 🌍 多語言系統
### contexts/i18n-context.tsx
- **useI18n()**: 多語言 Hook，提供 `t` 函式和 `currentLanguage`
- **t('key.subkey')**: 翻譯函式，**強制使用**，禁止硬編碼文字

### lib/i18n.ts
- **detectLanguage()**: 自動偵測使用者語言偏好
- **loadLocale()**: 動態載入語言資源檔案
- **getLocalizedText()**: 取得本地化文字內容
- **getLocalizedArray()**: 取得本地化陣列資料

## 🎫 票券系統核心
### config/tickets.ts
- **TICKET_SALE_CONFIG**: 票券銷售主配置
  - `isTicketSaleActive`: 開賣控制開關
  - `isEarlyBirdSoldOut`: 早鳥票售罄狀態
  - `promoCode`: 促銷碼設定

### components/promo-code-copy.tsx
- **PromoCodeCopy**: 促銷碼複製元件 (目前已停用)
- **handleCopyCode()**: 剪貼簿複製功能

## 🎯 資料查詢與處理
### components/ui/agenda-lightbox.tsx
- **getSpeakerById(speakerId: string)**: 根據 ID 查詢講者資料
- **處理 null 回傳**: 必須檢查回傳值是否為空

### lib/data/ 資料層
- **講者資料管理**: 統一的講者資訊結構
- **型別定義**: TypeScript 介面和型別

## 🚀 效能優化工具
### lib/web-vitals-reporter.ts
- **reportWebVitals()**: Core Web Vitals 數據回報
- **getPerformanceInsights()**: 效能洞察分析
- **storeMetric()**: 效能指標本地儲存

### lib/image-optimization.ts
- **getSupportedImageFormat()**: 檢測瀏覽器支援的圖片格式
- **generateImageSrcSet()**: 產生響應式圖片集
- **optimizeImageLoading()**: 圖片載入優化

## 🧭 路徑與路由管理
### lib/paths.ts
- **getBasePath()**: 取得應用程式基礎路徑 (GitHub Pages 支援)
- **getRoutePath()**: 取得多語言路由路徑
- **getImagePath()**: 取得圖片資源路徑
- **getVersionUrl()**: 取得版本檢查 URL

## 🎨 UI 工具函式
### lib/utils.ts
- **cn()**: className 合併工具 (clsx + tailwind-merge)
- **getColorClasses()**: 取得預定義顏色 CSS 類別
- **formatDate()**: 日期格式化
- **debounce()**: 防抖函式

## 🔧 開發與建置工具
### scripts/generate-all-webp.js
- **convertToWebP()**: 批次轉換圖片為 WebP 格式
- **generateFallbackImages()**: 產生回退圖片格式

### scripts/check-image-sizes.js
- **analyzeImageSizes()**: 分析圖片檔案大小
- **reportLargeImages()**: 回報過大的圖片檔案

## ⚙️ 系統工具
### lib/config.ts
- **loadConfig()**: 動態載入配置檔案
- **validateConfig()**: 配置檔案驗證
- **mergeConfigs()**: 配置合併工具

### lib/error-handler.ts
- **handleError()**: 統一錯誤處理
- **logError()**: 錯誤記錄功能
- **reportError()**: 錯誤回報機制

## 🔄 事件處理
### 通用事件工具
- **stopPropagation()**: 阻止事件冒泡，處理巢狀點擊
- **preventDefault()**: 阻止預設行為
- **debounceHandler()**: 防抖事件處理器

## 📊 資料驗證
### lib/validation.ts
- **validateSpeakerData()**: 講者資料驗證
- **validateTicketConfig()**: 票券配置驗證
- **validateI18nKeys()**: 多語言鍵值驗證

## 🌟 關鍵使用模式
1. **多語言**: `const { t } = useI18n(); t('key.subkey')` - 強制使用
2. **配置導入**: `import { TICKET_SALE_CONFIG } from '@/config'`
3. **靜態 Tailwind**: 避免 className 字串插值
4. **陣列檢查**: `{array.length > 0 && <Component />}`
5. **講者查詢**: `getSpeakerById(id)` 並處理 null 回傳