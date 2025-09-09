
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
- [完整開發文檔](#-完整開發文檔)
- [技術棧](#技術棧)
- [快速開始](#-快速開始)
- [專案特色](#-專案特色)
- [技術亮點](#-技術亮點)
- [目錄結構](#目錄結構)
- [主要功能](#主要功能)
- [貢獻方式](#貢獻方式)
- [聯絡方式](#聯絡方式)
- [授權](#授權)

---

## 專案簡介

DDD Taiwan 致力於促進軟體開發者、架構師、團隊領導者等共同交流，透過工作坊、演講、實作活動，分享 DDD 的最佳實踐與最新趨勢。2025 年度主題聚焦於 AI 時代的軟體開發方法、AI 輔助開發、文件即程式碼、Incident Response 自動化等。

---

## 📚 完整開發文檔

本專案提供完整的開發與維護文檔，適合開發人員、維護人員以及專案貢獻者參考：

### 🏗️ **第一部分：架構與設計**
- [**第1章：專案概覽與開發規範**](./docs/01-project-overview.md) - 專案基礎、技術棧、開發標準
- [**第2章：架構設計**](./docs/02-architecture.md) - 系統架構、配置管理、目錄結構
- [**第3章：國際化系統**](./docs/03-i18n-system.md) - 多語言實作、語言資源管理

### 🎨 **第二部分：功能實作**
- [**第4章：UI/UX 設計系統**](./docs/04-design-system.md) - Tailwind 最佳實踐、元件設計原則
- [**第5章：票券行銷系統**](./docs/05-ticket-marketing.md) - 售票流程、行銷功能、狀態管理
- [**第6章：效能優化**](./docs/06-performance.md) - 圖片優化、WebP 策略、載入效能

### 🛠️ **第三部分：開發與維護**
- [**第7章：開發工具與除錯**](./docs/07-development-tools.md) - 版本監控、熱重載、除錯工具
- [**第8章：SEO 與部署**](./docs/08-seo-deployment.md) - SEO 優化、靜態部署、GitHub Pages
- [**第9章：維護手冊**](./docs/09-maintenance.md) - 日常維護、故障排除、更新指南

---

## 目錄結構

```
app/                    # Next.js App Router 頁面
├── globals.css        # 全域樣式
├── layout.tsx         # 根佈局
├── page.tsx          # 首頁
├── about/            # 關於頁面
├── speakers/         # 講者頁面
├── agenda/           # 議程頁面
├── tickets/          # 購票頁面
└── transportation/   # 交通資訊

components/             # 可重用元件
├── ui/               # shadcn/ui 元件庫
├── layout/           # 佈局元件 (Header, Footer, Hero)
├── language-selector.tsx
├── ticket-marketing-section.tsx
└── version-monitor.tsx  # 開發工具 (Ctrl+Shift+V)

config/                 # 集中式配置管理
├── app.ts            # 應用程式設定
├── tickets.ts        # 票務配置
├── agenda.ts         # 議程資料
└── constants.ts      # 常數定義

lib/                   # 工具函式與資料管理
├── i18n.ts           # 國際化核心
├── paths.ts          # 路由管理
├── utils.ts          # 通用工具
└── data/             # 資料層

locales/               # 多語言資源
├── zh-tw.json        # 繁體中文
└── en.json           # 英文

docs/                  # 完整技術文檔
├── README.md         # 文檔導覽
├── 01-project-overview.md
├── 02-architecture.md
└── ... (共9章)
```

## 技術棧

### 核心技術
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

---

## 🚀 快速開始

### 開發環境準備

```bash
# 1. 安裝依賴
pnpm install

# 2. 啟動開發服務器
pnpm dev

# 3. 建置生產版本
pnpm build
```

造訪 [http://localhost:3000](http://localhost:3000) 查看網站。

### 常用維護任務

| 任務 | 文檔章節 | 快速指令 |
|------|----------|----------|
| 更新票券狀態 | [第5章](./docs/05-ticket-marketing.md#配置管理) | 修改 `config/tickets.ts` |
| 新增多語言內容 | [第3章](./docs/03-i18n-system.md#內容更新) | 編輯 `locales/*.json` |
| 圖片優化 | [第6章](./docs/06-performance.md#webp-策略) | `node scripts/generate-all-webp.js` |
| 效能監控 | [第7章](./docs/07-development-tools.md#版本監控) | 按 `Ctrl+Shift+V` |

---

## 🎯 專案特色

- **🌍 多語言支援**：zh-tw/en 雙語系統，完整 i18n 架構
- **🎫 智慧售票**：配置驅動的票券行銷系統，支援促銷碼機制
- **⚡ 高效能**：WebP 圖片策略，90%+ 檔案大小減少
- **📱 響應式設計**：從手機到桌面的完美適配
- **🛠️ 開發友善**：完整的開發工具鏈與除錯系統

---

## 💡 技術亮點

### 配置驅動開發
```typescript
// 所有功能狀態透過配置控制
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,
  isEarlyBirdSoldOut: true,
  promoCode: { isVisible: false, code: "DDDTW2025" }
}
```

### 純 WebP 圖片策略
- **效能提升**：3.8MB → 296KB (92% 減少)
- **自動化**：完整的轉換與優化腳本
- **向後相容**：`getOptimizedImagePath()` 處理格式切換

### 智慧型除錯工具
- **版本監控**：`Ctrl+Shift+V` 快速檢查更新
- **效能面板**：即時 Web Vitals 監控
- **熱重載**：自動版本檢測與提示更新

---

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
- **統一配置管理** - 集中式 config/ 目錄管理（詳見 [第2章：架構設計](./docs/02-architecture.md)）
- **模組化資料層** - 專門的資料管理和類型定義
- **型別安全** - 完整的 TypeScript 型別定義
- **元件化設計** - 可重複使用的 React 組件庫
- **效能優化** - 程式碼分割和圖片最佳化
- **多語系支援** - 完整的 i18n 架構（詳見 [第3章：國際化系統](./docs/03-i18n-system.md)）

---

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
- 參考 [完整開發文檔](#-完整開發文檔) 了解詳細規範

### 程式碼品質

```bash
# 型別檢查
pnpm type-check

# 程式碼檢查
pnpm lint

# 建置測試
pnpm build

# 效能分析
pnpm analyze
```

---

## 📚 延伸閱讀

- [完整開發文檔](./docs/README.md) - 深入的技術指南與維護手冊
- [GitHub Copilot 指令](./.github/copilot-instructions.md) - AI 輔助開發規範
- [Next.js 15.5.2 文檔](https://nextjs.org/docs) - 框架官方文檔
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架文檔

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
