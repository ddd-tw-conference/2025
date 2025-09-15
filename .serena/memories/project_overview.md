# DDD Taiwan 2025 專案概覽

## 專案簡介
DDD Taiwan Conference 2025 官方網站，提供領域驅動設計年度技術會議的完整資訊平台。

## 核心功能
- 📋 會議資訊展示：講者介紹、議程安排、會議地點
- 🎫 智慧售票系統：整合 Accupass 的動態票券行銷
- 🌍 多語言支援：繁體中文 / 英文雙語系統
- 📱 響應式設計：完美支援手機到桌面裝置

## 技術棧
- **Next.js**: 15.5.2 (React 框架 + 靜態輸出)
- **React**: 19 (UI 函式庫)
- **TypeScript**: 最新 (型別安全)
- **Tailwind CSS**: 最新 (CSS 框架)
- **pnpm**: 最新 (套件管理器)

## 核心開發規範
- **檔案命名**: `kebab-case` (例：`speaker-card.tsx`)
- **元件命名**: `PascalCase` (例：`SpeakerCard`)
- **函式變數**: `camelCase` (例：`handleTicketPurchase`)
- **配置驅動**: 所有狀態由 `@/config` 統一管理，禁止硬編碼
- **國際化**: 必須使用 `const { t } = useI18n(); t('key.subkey')`

## 部署資訊
- **生產環境**: https://conf.ddd.tw
- **部署方式**: GitHub Pages + 靜態輸出
- **建置模式**: Next.js export 模式
- **自動部署**: Push 至 main 分支觸發