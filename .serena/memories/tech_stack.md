# 技術棧與架構

## 核心技術
- **Next.js 15.5.2**: React 框架，配置為 SPA 模式 (output: 'export')
- **React 19**: 前端框架，使用最新 hooks 和 state 管理
- **TypeScript**: 嚴格模式，完整型別安全
- **Tailwind CSS 3.x**: 實用優先的 CSS 框架
- **Radix UI**: 無樣式的 UI 組件庫 (@radix-ui/*)
- **PostCSS**: CSS 處理工具
- **pnpm**: 快速的包管理器

## 開發工具
- **ESLint**: 程式碼品質檢查
- **Bundle Analyzer**: 效能分析工具
- **Sharp**: 圖片處理和優化
- **Web Vitals**: 效能監控

## 部署配置
- **GitHub Pages**: 靜態網站託管
- **SPA 模式**: 單頁應用程式配置
- **BasePath**: 支援 /2025 路徑前綴
- **圖片優化**: 停用 Next.js 圖片優化以支援靜態匯出
- **快取控制**: 版本參數防止快取問題

## 關鍵依賴版本
- next: 15.5.2
- react: ^19
- typescript: ^5
- tailwindcss: ^3.4.17
- @radix-ui/*: 最新版本 (完整 UI 組件庫)