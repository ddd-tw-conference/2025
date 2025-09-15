# 重要函式

## 多語言
- **useI18n()** - 多語言 Hook
- **t('key.subkey')** - 翻譯函式

## 票券系統
- **TICKET_SALE_CONFIG** - 票券配置
- **PromoCodeCopy** - 促銷碼複製

## 開發工具
- **stopPropagation()** - 事件隔離
- **@/config** - 配置導入
- **WebP優化** - 圖片處理
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