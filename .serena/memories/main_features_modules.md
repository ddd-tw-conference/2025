# 主要功能模組架構

## 🎫 票券銷售系統
### 核心檔案
- **config/tickets.ts**: `TICKET_SALE_CONFIG` 主配置
- **components/ticket-marketing-section.tsx**: 動態票券行銷區塊
- **components/promo-code-copy.tsx**: 促銷碼複製功能 (已停用)

### 功能特色
- 配置驅動的銷售狀態控制
- Accupass 平台整合
- 動態價格和售罄狀態顯示
- 早鳥票/一般票自動切換

## 👥 講者展示系統
### 核心檔案
- **app/speakers/page.tsx**: 講者專頁
- **components/speaker-cards.tsx**: 首頁講者卡片
- **lib/data/speakers.ts**: 講者資料管理

### 功能特色
- 響應式講者卡片設計
- 社群媒體連結整合
- 講者詳細資訊展示
- 多語言講者介紹

## 🌍 多語言系統
### 核心檔案
- **contexts/i18n-context.tsx**: i18n React Context
- **lib/i18n.ts**: 語言切換核心邏輯
- **locales/zh-tw.json**: 繁體中文語言包
- **locales/en.json**: 英文語言包
- **components/language-selector.tsx**: 語言切換器

### 功能特色
- **強制使用**: `const { t } = useI18n(); t('key.subkey')`
- 動態語言切換
- URL 路由本地化
- 完整的翻譯管理

## 📅 議程展示系統
### 核心檔案
- **config/agenda.ts**: 議程資料和時間配置
- **app/agenda/page.tsx**: 議程頁面
- **components/ui/agenda-lightbox.tsx**: 議程燈箱顯示

### 功能特色
- 時間軸式議程展示
- 講者資訊連動顯示
- 響應式議程表格
- 互動式議程詳情

## 🚀 效能優化系統
### 核心檔案
- **config/performance.ts**: 效能監控配置
- **scripts/generate-all-webp.js**: WebP 圖片轉換
- **lib/web-vitals.tsx**: Core Web Vitals 監控
- **components/performance-dashboard.tsx**: 效能儀表板

### 功能特色
- **90%+ 檔案大小減少**: WebP 自動轉換
- **Lighthouse 90+ 分數**: 全方位效能優化
- **即時效能監控**: Core Web Vitals 追蹤
- **自動化圖片處理**: 批次 WebP 轉換

## 🎯 志工招募系統
### 核心檔案
- **config/volunteers.ts**: 志工系統配置
- **app/volunteers/**: 志工相關頁面 (如存在)

### 功能特色
- 職位分類管理
- 招募狀態控制
- 表單整合支援

## 🧭 導航與路由系統
### 核心檔案
- **lib/paths.ts**: 路由路徑管理
- **components/layout/header.tsx**: 響應式導航列
- **components/layout/footer.tsx**: 頁尾連結

### 功能特色
- **智慧路由管理**: 支援 GitHub Pages basePath
- **響應式導航**: 行動版選單設計
- **多語言路由**: URL 本地化支援

## 🎨 UI 元件庫
### 目錄結構
```
components/ui/
├── button.tsx        # 按鈕元件
├── card.tsx          # 卡片容器
├── dialog.tsx        # 對話框
├── badge.tsx         # 標籤徽章
└── [35+ 其他元件]
```

### 技術基礎
- **Radix UI**: 無障礙基礎元件
- **Tailwind CSS**: utility-first 樣式
- **TypeScript**: 嚴格型別定義
- **響應式設計**: 完整行動支援

## 📊 資料管理層
### 核心檔案
- **lib/data/speakers.ts**: 講者資料
- **lib/data/types.ts**: TypeScript 型別定義
- **lib/utils.ts**: 通用工具函式

### 功能特色
- 型別安全的資料結構
- 統一的資料存取介面
- 配置與資料分離設計

## 🔧 建置與工具系統
### 腳本檔案
- **scripts/generate-all-webp.js**: 圖片格式轉換
- **scripts/check-image-sizes.js**: 圖片大小檢查
- **scripts/optimize-images.js**: 圖片壓縮優化

### 功能特色
- 自動化圖片處理工作流
- 效能監控和分析
- 建置品質檢查