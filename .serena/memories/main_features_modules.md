# 主要功能模組說明

## 票券行銷系統
- **檔案**: config/tickets.ts, components/ticket-marketing-section.tsx
- **功能**: 售票狀態控制、促銷碼管理、購票流程
- **配置**: TICKET_SALE_CONFIG 集中管理所有票券相關設定

## 講者管理系統
- **檔案**: lib/data/speakers.ts, app/speakers/page.tsx
- **功能**: 講者資料管理、lightbox 展示、智慧導航
- **特色**: 支援從首頁卡片直接跳轉到講者詳情

## 議程系統
- **檔案**: config/agenda.ts, app/agenda/page.tsx
- **功能**: 議程時間計算、session 管理、議程展示
- **特色**: 自動時間計算和 lightbox 詳情展示

## 多語言系統
- **檔案**: lib/i18n.ts, contexts/i18n-context.tsx
- **功能**: 繁中/英文切換、語言資源管理
- **支援**: 完整的語言切換和內容本地化

## 版本監控系統
- **檔案**: components/version-monitor.tsx, lib/version.ts
- **功能**: 開發時版本檢查、熱重載提醒
- **操作**: Ctrl+Shift+V 開啟監控面板

## 效能監控
- **檔案**: lib/web-vitals.tsx, components/performance-dashboard.tsx
- **功能**: Web Vitals 監控、效能數據收集
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