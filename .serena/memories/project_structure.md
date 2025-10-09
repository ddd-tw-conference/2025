# 專案結構完整指南

## 📁 根目錄結構
```
2025/
├── app/              # Next.js 13+ App Router 頁面
├── components/       # React 元件庫
├── config/          # 配置檔案 (8個配置檔)
├── contexts/        # React Context
├── docs/           # 技術文檔 (10個文件)
├── hooks/          # 自訂 React Hooks
├── lib/            # 工具函式與資料層
├── locales/        # 多語言資源
├── public/         # 靜態資源
├── scripts/        # 建置腳本
└── styles/         # 全域樣式
```

## 🏗️ 核心目錄詳解

### app/ - Next.js 頁面 (App Router)
- **page.tsx**: 首頁
- **layout.tsx**: 根佈局
- **speakers/**: 講者頁面
- **tickets/**: 票券頁面
- **agenda/**: 議程頁面
- **transportation/**: 交通資訊
- **rules/**: 行為準則
- **about/**: 關於頁面

### config/ - 配置驅動系統
- **tickets.ts**: TICKET_SALE_CONFIG 票券配置
- **agenda.ts**: 議程資料和時間計算
- **app.ts**: 基本應用配置
- **constants.ts**: 全域常數
- **performance.ts**: 效能監控配置
- **system.ts**: 系統設定
- **volunteers.ts**: 志工系統配置
- **index.ts**: 統一匯出

### components/ - 元件架構
```
components/
├── ui/                    # 基礎 UI 元件 (35+個)
├── layout/               # 佈局元件
│   ├── header.tsx
│   ├── footer.tsx
│   └── hero-section.tsx
└── 功能元件/
    ├── ticket-marketing-section.tsx
    ├── speaker-cards.tsx
    ├── promo-code-copy.tsx
    └── language-selector.tsx
```

### lib/ - 核心工具層
- **i18n.ts**: 國際化核心功能
- **paths.ts**: 路由管理
- **utils.ts**: 通用工具函式
- **data/**: 資料層 (講者資料、型別定義)
- **config.ts**: 配置載入器

### docs/ - 完整技術文檔 (已優化)
1. **專案概覽** (85行) - 專案介紹和快速開始
2. **系統架構** (104行) - 技術架構設計
3. **國際化系統** (109行) - 多語言實作
4. **設計系統** (126行) - UI/UX 規範
5. **票券行銷** (75行) - 票務系統
6. **效能優化** (114行) - 效能策略
7. **開發工具** (152行) - 開發環境
8. **SEO與部署** (185行) - 上線策略
9. **維護更新** (190行) - 日常維護
10. **志工系統** (97行) - 志工管理

### locales/ - 多語言資源
- **zh-tw.json**: 繁體中文 (主要語言)
- **en.json**: 英文 (國際版本)

### public/ - 靜態資源
- **images/**: 圖片資源 (WebP 優化)
- **version.json**: 版本控制檔案

## 🔄 資料流架構
```
config/ → lib/data/ → components/ → app/pages
   ↓         ↓          ↓           ↓
配置檔案 → 資料處理 → UI元件 → 頁面渲染
```

## 🌍 多語言架構
```
locales/ → contexts/i18n → lib/i18n.ts → components (t函式)
```

## 📈 效能優化結構
- **圖片**: public/images/ (WebP + 回退)
- **腳本**: scripts/ (自動化處理)
- **快取**: .next/ (建置快取)
- **輸出**: out/ (靜態匯出)