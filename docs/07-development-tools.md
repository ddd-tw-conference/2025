# 第7章：開發工具

> **本章內容**：開發環境設定、實用工具介紹、工作流程優化

---

## 🛠️ 核心開發工具

### 必要工具清單
| 工具名稱 | 版本要求 | 用途 |
|---------|----------|------|
| **Node.js** | 18+ | JavaScript 執行環境 |
| **pnpm** | 最新版 | 套件管理器（比 npm 更快） |
| **VS Code** | 最新版 | 程式碼編輯器 |
| **Git** | 2.0+ | 版本控制系統 |

### 推薦 VS Code 擴充功能
| 擴充功能 | 功能說明 |
|---------|----------|
| **TypeScript** | TypeScript 語言支援 |
| **Tailwind CSS IntelliSense** | Tailwind 自動完成與預覽 |
| **ES7+ React/Redux** | React 程式碼片段 |
| **Prettier** | 程式碼自動格式化 |
| **ESLint** | 程式碼品質檢查 |

---

## 📦 套件管理

### 為什麼選擇 pnpm
- **速度快**：比 npm/yarn 快 2-3 倍
- **節省空間**：共享套件，避免重複下載
- **嚴格模式**：避免幻影依賴問題

### 常用指令
| 指令 | 功能 |
|------|------|
| `pnpm install` | 安裝所有依賴 |
| `pnpm dev` | 啟動開發服務器 |
| `pnpm build` | 建置生產版本 |
| `pnpm lint` | 執行程式碼檢查 |

---

## 🎨 圖片處理工具

### 自動化腳本
| 腳本名稱 | 功能 | 使用時機 |
|---------|------|----------|
| `generate-all-webp.js` | 轉換圖片為 WebP 格式 | 新增圖片後 |
| `check-image-sizes.js` | 檢查圖片檔案大小 | 效能優化時 |
| `optimize-images.js` | 壓縮與優化圖片 | 部署前執行 |
| `check-duplicates.js` | 檢查重複檔案 | 清理專案時 |

### 執行方式
```bash
# 轉換所有圖片為 WebP
node scripts/generate-all-webp.js

# 檢查圖片大小
node scripts/check-image-sizes.js

# 優化圖片品質
node scripts/optimize-images.js
```

---

## 🔧 開發環境設定

### 環境變數
專案使用環境變數管理不同環境的設定：
- **開發環境**：`.env.local`
- **生產環境**：透過部署平台設定

### Git 工作流程
1. **主分支**：`main` - 穩定的生產版本
2. **開發分支**：`develop` - 開發中的功能
3. **功能分支**：`feature/*` - 個別功能開發

### 程式碼品質
- **ESLint**：自動檢查程式碼問題
- **Prettier**：統一程式碼格式
- **TypeScript**：型別檢查避免錯誤

---

## 📝 程式碼規範

### 檔案命名
- **元件檔案**：`PascalCase.tsx` (例：`SpeakerCard.tsx`)
- **工具檔案**：`kebab-case.ts` (例：`image-utils.ts`)
- **頁面檔案**：`page.tsx`, `layout.tsx`

### 資料夾結構
```
src/
├── app/          # Next.js 頁面
├── components/   # React 元件
├── config/       # 設定檔案
├── hooks/        # 自訂 Hook
├── lib/          # 工具函式
└── types/        # TypeScript 型別
```

### 程式碼風格
- **縮排**：2 個空格
- **引號**：統一使用單引號
- **分號**：不使用分號（Prettier 自動處理）
- **尾隨逗號**：物件和陣列使用尾隨逗號

---

## 🚀 部署工具

### GitHub Actions
自動化建置與部署流程：
1. **程式碼推送**到 main 分支
2. **自動執行**建置流程
3. **部署到** GitHub Pages

### 建置檢查
部署前自動檢查：
- TypeScript 編譯無錯誤
- ESLint 檢查通過
- 建置流程成功完成

---

## 🔍 除錯工具

### 瀏覽器開發者工具
- **Console**：查看錯誤訊息和 log
- **Network**：檢查網路請求和載入時間
- **Lighthouse**：效能分析和建議
- **Elements**：檢視和修改 DOM 結構

### React 開發工具
- **React Developer Tools**：檢查 React 元件狀態
- **Next.js 開發模式**：提供詳細的錯誤資訊

---

## 📊 效能監控工具

### 分析工具
| 工具名稱 | 功能 | 使用方式 |
|---------|------|----------|
| **Lighthouse** | 綜合效能分析 | Chrome 開發者工具 |
| **PageSpeed Insights** | Google 效能測試 | 線上工具 |
| **Bundle Analyzer** | JavaScript 檔案大小分析 | npm 套件 |

### 監控指標
- **載入時間**：頁面完整載入時間
- **互動時間**：使用者可開始互動的時間
- **視覺穩定性**：版面位移指標

---

## 🛡️ 安全性工具

### 依賴安全
- **npm audit**：檢查套件安全漏洞
- **Dependabot**：自動更新有安全問題的套件
- **定期更新**：保持依賴套件為最新版本

### 程式碼安全
- **TypeScript 嚴格模式**：避免型別錯誤
- **ESLint 安全規則**：檢查潛在安全問題
- **輸入驗證**：確保使用者輸入安全

---

## 📚 學習資源

### 官方文件
- **Next.js 文件**：https://nextjs.org/docs
- **React 文件**：https://react.dev
- **Tailwind CSS 文件**：https://tailwindcss.com/docs
- **TypeScript 文件**：https://www.typescriptlang.org/docs

### 實用教學
- **Next.js 官方教學**：適合初學者
- **React 官方教學**：學習 React 基礎
- **Tailwind CSS 影片教學**：快速上手 CSS 框架

---

## ❓ 常見問答

**Q: 為什麼不用 npm 而要用 pnpm？**
A: pnpm 更快、更節省硬碟空間，且能避免依賴問題。

**Q: 如何確保程式碼品質？**
A: 使用 TypeScript + ESLint + Prettier 的組合。

**Q: 開發時遇到錯誤怎麼辦？**
A: 先查看瀏覽器 Console，再檢查 VS Code 的錯誤提示。

**Q: 如何檢查網站效能？**
A: 使用 Chrome 的 Lighthouse 工具進行分析。

---

*文件版本: v2.0 | 最後更新: 2025年10月9日*