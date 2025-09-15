# 專案結構

## 根目錄
- **package.json** - 依賴管理
- **next.config.mjs** - Next.js 配置
- **tailwind.config.ts** - Tailwind 配置

## 主要目錄

### app/ - 頁面
- **page.tsx** - 首頁
- **speakers/** - 講者頁面
- **tickets/** - 票券頁面

### config/ - 配置
- **tickets.ts** - 票券配置
- **app.ts** - 基本配置

### components/ - 元件
- **ticket-marketing-section.tsx** - 票券行銷
- **promo-code-copy.tsx** - 促銷碼複製
- **language-selector.tsx** - 語言切換

### locales/ - 多語言
- **zh-tw.json** - 繁體中文
- **en.json** - 英文
- **tickets.ts**: 票務配置和邏輯
- **agenda.ts**: 議程資料和時間計算
- **constants.ts**: 全域常數定義

### lib/ - 工具函式與資料管理
- **i18n.ts**: 國際化核心功能
- **paths.ts**: 路由和路徑管理
- **utils.ts**: 通用工具函式
- **data/**: 資料層 (講者資料、型別定義)

### locales/ - 多語言資源
- **zh-tw.json**: 繁體中文語言包
- **en.json**: 英文語言包

### docs/ - 完整技術文檔 (9章)
- 詳細的開發與維護指南
- 架構設計文檔
- 功能實作說明

### public/ - 靜態資源
- **images/**: 圖片資源 (WebP 優化)
- **version.json**: 版本控制檔案