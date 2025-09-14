# 專案結構與目錄說明

## 根目錄配置檔案
- **package.json**: 依賴管理和指令定義
- **next.config.mjs**: Next.js 配置 (SPA 模式、GitHub Pages)
- **tailwind.config.ts**: Tailwind CSS 配置
- **tsconfig.json**: TypeScript 編譯設定
- **pnpm-lock.yaml**: 鎖定依賴版本

## 核心目錄結構

### app/ - Next.js App Router 頁面
- **layout.tsx**: 根佈局，包含全域設定
- **page.tsx**: 首頁
- **about/**: 關於頁面
- **speakers/**: 講者頁面 (含 lightbox 功能)
- **agenda/**: 議程頁面
- **tickets/**: 購票頁面
- **transportation/**: 交通資訊
- **providers/**: React Context 提供者

### components/ - 可重用元件
- **ui/**: shadcn/ui 元件庫
- **layout/**: 佈局元件 (Header, Footer, Hero)
- **ticket-marketing-section.tsx**: 票券行銷元件
- **language-selector.tsx**: 語言切換器
- **version-monitor.tsx**: 開發工具 (Ctrl+Shift+V)

### config/ - 集中式配置管理
- **app.ts**: 應用程式基本設定
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