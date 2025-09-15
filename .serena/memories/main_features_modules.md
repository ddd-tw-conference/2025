# 主要功能模組

## 票券系統
- **config/tickets.ts** - TICKET_SALE_CONFIG 配置
- **components/ticket-marketing-section.tsx** - 票券行銷區塊
- **components/promo-code-copy.tsx** - 促銷碼複製

## 講者系統
- **app/speakers/page.tsx** - 講者頁面
- **components/speaker-cards.tsx** - 首頁講者卡片
- **lib/data/speakers.ts** - 講者資料

## 多語言
- **contexts/i18n-context.tsx** - i18n Context
- **lib/i18n.ts** - 語言邏輯
- **locales/** - 語言檔案

## 效能優化
- **WebP 圖片** - 自動轉換
- **bundle analyzer** - 效能分析
- **靜態導出** - GitHub Pages
- **特色**: 即時效能指標顯示

## 圖片優化系統
- **檔案**: config/performance.ts, scripts/generate-all-webp.js
- **功能**: WebP 自動轉換、格式 fallback
- **效果**: 90%+ 檔案大小減少

## 導航與路由
- **檔案**: lib/paths.ts, components/layout/header.tsx
- **功能**: 智慧路由管理、響應式導航
- **特色**: 支援 GitHub Pages basePath 配置

## UI 元件庫
- **目錄**: components/ui/
- **基礎**: Radix UI + Tailwind CSS
- **特色**: 完整的可重用元件集合