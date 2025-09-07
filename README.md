
# DDD Taiwan Conference 2025

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-blue?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-green?logo=github)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

> 「Domain Driven Design Taiwan (DDD Taiwan)」2025 年度成果發表會官方網站  
> 🌐 部署於：[https://ddd-tw-conference.github.io/2025/](https://ddd-tw-conference.github.io/2025/)

---

## 目錄

- [專案簡介](#專案簡介)
- [目錄結構](#目錄結構)
- [技術棧](#技術棧)
- [安裝與啟動](#安裝與啟動)
- [主要功能](#主要功能)
- [貢獻方式](#貢獻方式)
- [聯絡方式](#聯絡方式)
- [授權](#授權)

---

## 專案簡介

DDD Taiwan 致力於促進軟體開發者、架構師、團隊領導者等共同交流，透過工作坊、演講、實作活動，分享 DDD 的最佳實踐與最新趨勢。2025 年度主題聚焦於 AI 時代的軟體開發方法、AI 輔助開發、文件即程式碼、Incident Response 自動化等。

## 目錄結構

- `app/`：主要頁面（首頁、關於、議程、講者、交通、規則等）
- `components/`：共用元件（UI、佈局、主題等）
- `config/`：統一配置管理（應用設定、票務、性能等）
- `contexts/`：React Context 提供者（i18n 等）
- `hooks/`：自訂 React hooks
- `lib/`：工具函式和資料管理
- `locales/`：多語系資源檔案
- `public/`：靜態資源（圖片等）
- `styles/`：全域樣式
- `docs/`：技術文檔

## 技術棧

- **Next.js 15.5.2** - React 框架，配置為 SPA 模式
- **React 19** - 前端框架
- **TypeScript** - 型別安全的 JavaScript
- **Tailwind CSS** - 實用優先的 CSS 框架
- **Radix UI** - 無樣式的 UI 組件庫
- **PostCSS** - CSS 處理工具
- **pnpm** - 快速的包管理器

### 部署配置

- **GitHub Pages** - 靜態網站託管
- **SPA 模式** - 單頁應用程式配置 (`output: 'export'`)
- **BasePath** - 支援 `/2025` 路徑前綴
- **圖片優化** - 停用 Next.js 圖片優化，支援靜態匯出
- **快取控制** - 實施版本參數防止快取問題

## 安裝與啟動

### 開發環境

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm dev
```

造訪 [http://localhost:3000](http://localhost:3000) 查看網站。

### 生產環境建置

```bash
# 建置靜態檔案 (用於 GitHub Pages)
pnpm build

# 預覽靜態網站
pnpm preview

# 檢查部署準備狀態
pnpm deploy:check
```

建置後的檔案會輸出到 `out/` 目錄，適合部署至 GitHub Pages。

## 主要功能

- ✅ **響應式設計** - 支援多元裝置瀏覽（桌面、平板、手機）
- ✅ **年會資訊** - 議程、講者介紹、交通資訊、活動規則
- ✅ **技術分享** - DDD 實務分享、技術交流、知識傳承  
- ✅ **靜態部署** - 基於 GitHub Pages 的高效能靜態網站
- ✅ **SEO 優化** - 完整的 meta 標籤和 Open Graph 支援
- ✅ **圖片優化** - 快取控制和路徑處理優化
- ✅ **無障礙設計** - 遵循 Web 無障礙設計原則

### 技術特色

- **SPA 架構** - 使用 Next.js 靜態匯出功能
- **統一配置管理** - 集中式 config/ 目錄管理（詳見 [配置文檔](./docs/config-management.md)）
- **模組化資料層** - 專門的資料管理和類型定義
- **型別安全** - 完整的 TypeScript 型別定義
- **元件化設計** - 可重複使用的 React 組件庫
- **效能優化** - 程式碼分割和圖片最佳化
- **多語系支援** - 完整的 i18n 架構

## 貢獻方式

我們歡迎社群貢獻！請遵循以下步驟：

1. **Fork** 此專案
2. 建立您的功能分支：`git checkout -b feature/AmazingFeature`
3. 提交您的變更：`git commit -m 'Add some AmazingFeature'`
4. 推送至分支：`git push origin feature/AmazingFeature`
5. 開啟一個 **Pull Request**

也歡迎提出 [Issue](https://github.com/ddd-tw-conference/2025/issues) 回報問題或建議改進。

### 開發指南

- 遵循 TypeScript 嚴格模式
- 使用 Tailwind CSS 進行樣式設計
- 確保組件具備響應式設計
- 新增功能時請考慮 SEO 和無障礙性

## 聯絡方式

- 🌐 **官方網站**：[ddd-tw-conference.github.io/2025](https://ddd-tw-conference.github.io/2025/)
- 📧 **電子郵件**：[dddtw2018@gmail.com](mailto:dddtw2018@gmail.com)
- 👥 **Facebook 社團**：[Domain Driven Design Taiwan](https://www.facebook.com/groups/ddd.tw/)
- 📺 **YouTube 頻道**：[DDD Taiwan](https://www.youtube.com/channel/UCydw7dbEksG3axEMjHy4BxQ)
- 💬 **Line 社群**：[加入我們的討論群組](https://line.me/ti/g2/aiNGJvViOJIxp7tV-EgNvJ2Id5ae1jBpecKSnA)

## 部署資訊

本專案自動部署至 GitHub Pages：
- **生產環境**：[https://ddd-tw-conference.github.io/2025/](https://ddd-tw-conference.github.io/2025/)
- **部署分支**：`gh-pages`
- **建置指令**：`pnpm build`
- **部署觸發**：Push 至 `main` 分支時自動部署

## 授權

[MIT License](LICENSE)

---

DDD Taiwan 期待與您一同推動台灣軟體開發的進步！
