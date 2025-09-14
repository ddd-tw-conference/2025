# 重要函式與邏輯索引

## 智慧導航系統
### app/speakers/page.tsx
- **SpeakersPage** - 主要講者頁面元件
- **closeLightbox** - 智慧關閉邏輯 (考慮來源頁面)
- **openLightbox** - 開啟講者詳情
- **isFromHomepage** 狀態 - 追蹤使用者來源

### components/speaker-cards.tsx
- **handleCardClick** - 卡片點擊處理 (導航到講者頁面)
- **handleTicketClick** - 票券按鈕點擊 (阻止事件冒泡)
- **generateDeterministicTheme** - 產生一致性主題色彩

## 票券行銷系統
### config/tickets.ts
- **TICKET_SALE_CONFIG** - 主要票券配置
- **isTicketAvailable** - 檢查票券可用性
- **getTicketPurchaseUrl** - 取得購票連結
- **isEarlyBirdAvailable** - 早鳥票狀態檢查

## 議程管理
### config/agenda.ts
- **SESSION_PATTERNS** - 議程模式配置
- **calculateSessionTimes** - 自動計算議程時間
- **AGENDA_TIME_CONFIG** - 時間配置

## 效能優化
### config/performance.ts
- **getOptimizedImageUrl** - 取得優化圖片 URL
- **getSupportedImageFormat** - 檢測支援的圖片格式
- **generateImageSrcSet** - 產生響應式圖片集

### lib/web-vitals-reporter.ts
- **reportWebVitals** - Web Vitals 回報
- **getPerformanceInsights** - 效能洞察分析
- **storeMetric** - 效能指標儲存

## 國際化核心
### lib/i18n.ts
- **detectLanguage** - 語言偵測
- **loadLocale** - 載入語言資源
- **t** - 翻譯函式

### lib/data/utils.ts
- **getLocalizedText** - 取得本地化文字
- **getLocalizedArray** - 取得本地化陣列

## 路徑管理
### lib/paths.ts
- **getBasePath** - 取得基礎路徑
- **getRoutePath** - 取得路由路徑
- **getImagePath** - 取得圖片路徑
- **getVersionUrl** - 取得版本檢查 URL