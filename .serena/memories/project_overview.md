# DDD Taiwan 2025 專案概覽

## 🎯 專案簡介
DDD Taiwan Conference 2025 官方網站 - 領域驅動設計年度技術會議的完整資訊平台。

## 📋 核心功能
- **會議資訊**：講者介紹、議程安排、活動地點
- **智慧售票**：整合 Accupass 的動態票券行銷系統
- **多語言**：繁體中文 / 英文雙語支援
- **響應式**：完美支援行動裝置到桌面
- **效能優化**：WebP 圖片、靜態輸出、CDN 快取
- **志工系統**：志工招募和管理功能

## 🚀 技術棧 (2025年最新)
- **Next.js**: 15.5.2 (React 框架 + 靜態輸出)
- **React**: 19 (最新 UI 函式庫)
- **TypeScript**: 最新 (嚴格型別檢查)
- **Tailwind CSS**: 最新 (utility-first CSS)
- **pnpm**: 最新 (高效套件管理)

## 🎨 開發規範
- **檔案命名**: `kebab-case` (`speaker-cards.tsx`)
- **元件命名**: `PascalCase` (`SpeakerCard`)
- **配置驅動**: `@/config` 統一管理，禁止硬編碼
- **國際化強制**: `const { t } = useI18n(); t('key.subkey')`
- **靜態 Tailwind**: 禁止 className 字串插值
- **顏色限制**: 僅 6 種預定義顏色

## 🌐 部署資訊
- **生產環境**: https://conf.ddd.tw
- **部署方式**: GitHub Pages + 靜態輸出
- **自動部署**: Push 至 main 分支觸發
- **建置模式**: Next.js export 模式

## 📊 專案狀況 (2025年10月)
- **文檔系統**: 已完成全面優化 (10個文件，總縮減84%)
- **效能指標**: 90+ Lighthouse 分數
- **票券狀態**: 一般票販售中，早鳥票已售完
- **開發進度**: 生產就緒狀態