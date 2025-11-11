# 第2章：系統架構設計

> **本章內容**：Next.js 應用架構、配置驅動原則、目錄結構設計

---

## 🏛️ 整體架構設計

### 技術架構

```text
前端應用 (Next.js 15 + React 19)
├── App Router 路由系統
├── 靜態生成 (SSG)
├── 配置驅動業務邏輯
├── 多語言系統 (i18n)
└── 響應式 UI (Tailwind CSS)
```

### 架構特色

- **靜態優先**：使用 Next.js 靜態生成提升效能
- **配置驅動**：業務邏輯由設定檔控制，不寫死在程式碼中
- **元件化**：可重用的 React 元件設計
- **類型安全**：TypeScript 確保開發品質

---

## ⚙️ 配置驅動架構

### 核心原則

所有業務邏輯、功能開關由 `@/config` 集中管理，實現程式碼與配置分離。

### 實作原則

- 所有設定都集中在 `@/config`，不直接寫在元件裡
- 只要調整設定檔，就能快速切換功能

### React 19 注意事項

- 若遇到 Hydration 警告，請在 `<body>` 標籤加上 `suppressHydrationWarning={true}` 屬性

---

## 📁 目錄結構設計

### 核心目錄架構

| 資料夾         | 說明                 | 範例檔案 |
|--------------|----------------------|----------|
| **app/**         | Next.js App Router 頁面 | page.tsx, layout.tsx |
| **components/**  | 共用元件               | speaker-card.tsx, button.tsx |
| **config/**      | 所有設定檔             | tickets.ts, agenda.ts |
| **contexts/**    | React Context          | i18n-context.tsx |
| **hooks/**       | React 自訂 Hook        | use-mobile.tsx, use-i18n.ts |
| **lib/**         | 工具與函式庫           | utils.ts, paths.ts |
| **locales/**     | 多語言檔案             | zh-tw.json, en.json |
| **public/**      | 靜態資源               | images/, icons/ |
| **styles/**      | 全域樣式               | globals.css |

### 檔案組織原則

- **按功能分類**：相關功能的檔案放在一起
- **命名一致性**：使用 kebab-case 命名檔案
- **職責單一**：每個檔案只負責一個明確功能

---

## 🔄 資料流設計

### 配置管理流程

1. **設定檔** (`config/*.ts`) 定義業務規則
2. **元件** 從設定檔讀取配置
3. **條件渲染** 根據設定顯示不同內容
4. **國際化** 透過 `t()` 函式處理文字

### 狀態管理

- **全域狀態**：使用 React Context (如 i18n)
- **本地狀態**：使用 useState Hook
- **設定狀態**：從 `@/config` 匯入，不可變更

---

## 🎨 元件設計原則

### 元件分類

| 類型 | 說明 | 範例 |
|------|------|------|
| **頁面元件** | App Router 頁面 | page.tsx |
| **佈局元件** | 頁面結構 | header.tsx, footer.tsx |
| **功能元件** | 特定功能 | ticket-section.tsx |
| **UI 元件** | 基礎 UI | button.tsx, card.tsx |

### 設計原則

- **可重用性**：元件可在多個地方使用
- **可配置性**：透過 props 調整元件行為
- **無狀態優先**：儘量設計無狀態元件
- **國際化支援**：所有文字使用 `t()` 函式

---

## 🚀 部署架構

### 建置流程

1. **開發環境**：`pnpm dev` 啟動本地開發
2. **建置生產版本**：`pnpm build` 生成靜態檔案
3. **部署**：將 `out/` 資料夾部署到 GitHub Pages

### 靜態最佳化

- **自動生成**：所有頁面預先生成 HTML
- **圖片最佳化**：WebP 格式減少檔案大小
- **CSS 最佳化**：Tailwind CSS 移除未使用樣式

---

## 🔧 開發工具整合

### 必要工具

- **TypeScript**：型別檢查與 IntelliSense
- **ESLint**：程式碼品質檢查
- **Prettier**：自動格式化
- **Tailwind CSS**：實用優先 CSS 框架

### 開發流程

1. 編寫元件時先考慮配置需求
2. 使用 TypeScript 定義清楚的介面
3. 確保所有文字都國際化
4. 測試響應式設計

---

## ❓ 常見問答

**Q: 為什麼選擇配置驅動架構？**
A: 可以快速調整功能而不需修改程式碼，降低維護成本。

**Q: 如何新增一個設定項目？**
A: 在 `config/` 對應檔案中新增設定，並在元件中使用。

**Q: 靜態生成有什麼好處？**
A: 載入速度快、SEO 友善、部署簡單、成本低。

**Q: 如何確保型別安全？**
A: 使用 TypeScript 嚴格模式，定義清楚的介面和型別。

---
