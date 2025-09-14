# DDD Taiwan 2025 專案概覽

## 專案目的
DDD Taiwan Conference 2025 年度成果發表會官方網站，致力於促進軟體開發者、架構師、團隊領導者等共同交流 Domain Driven Design 的最佳實踐與最新趨勢。

## 技術棧
- **框架**: Next.js 15.5.2 (App Router)
- **前端**: React 19 + TypeScript 5.x
- **樣式**: Tailwind CSS 3.x + Radix UI
- **包管理**: pnpm
- **部署**: GitHub Pages (SPA 模式)
- **多語言**: 繁體中文 (zh-tw) + 英文 (en)

## 關鍵特色
- **配置驅動開發**: 所有功能狀態透過 config/ 目錄集中管理
- **SPA 靜態部署**: 使用 Next.js export 模式部署至 GitHub Pages
- **智慧售票系統**: 支援促銷碼、早鳥票、狀態切換的票券行銷功能
- **多語言架構**: 完整的 i18n 系統支援繁中/英文切換
- **效能優化**: WebP 圖片策略，90%+ 檔案大小減少
- **開發友善**: 版本監控 (Ctrl+Shift+V)、熱重載、完整除錯工具

## 部署資訊
- **生產環境**: https://ddd-tw-conference.github.io/2025/
- **BasePath**: /2025
- **建置模式**: Static export (SPA)
- **自動部署**: Push 至 main 分支觸發