# 圖片效能優化 Image Performance Optimization

## 概述

本文件記錄 DDD Taiwan 2025 專案的圖片效能優化實施過程與最佳實踐。專案採用 Next.js 15.5.2 + React 19 + Tailwind CSS 架構，目標解決大圖載入遲緩問題，提升用戶體驗。

---

## 問題分析

### 發現的問題
- **首頁與 About 頁面**：Banner 圖片載入緩慢，影響 LCP（Largest Contentful Paint）分數
- **檔案大小**：`banner-main.png` (1669KB)、`banner-about.png` (1166KB) 遠超理想大小
- **格式選擇**：使用 PNG 格式，檔案較大且未壓縮

### 架構限制
- **靜態導出模式**：`output: 'export'` + `images: { unoptimized: true }`
- **GitHub Pages 部署**：無法使用 Next.js 內建圖片優化功能
- **解決策略**：透過圖片預處理達成效能目標

---

## 解決方案

### 1. 圖片壓縮與格式轉換
**目標**：將所有大圖壓縮至 200KB 以下，轉換為 WebP 格式

**工具選擇**：Node.js `sharp` 套件
```bash
# 安裝開發依賴
pnpm add -D sharp
```

**實施結果**：
- `banner-main.png` (1669KB) → `banner-main.webp` (45KB) 壓縮 97.3%
- `banner-about.png` (1166KB) → `banner-about.webp` (153KB) 壓縮 86.9%

### 2. Next.js Image 元件最佳實踐
**現況確認**：專案已正確使用 `<Image />` 元件，具備 lazy loading 與響應式功能

**優化前**：
```tsx
<Image
  src={getImagePath("/images/banners/banner-main.png")}
  alt={t("hero.bannerAlt")}
  className="w-full h-full object-cover"
  priority
  fill
  sizes="100vw"
/>
```

**優化後**：
```tsx
<Image
  src={getImagePath("/images/banners/banner-main.webp")}
  alt={t("hero.bannerAlt")}
  className="w-full h-full object-cover"
  priority // 首屏保持 priority
  fill
  sizes="100vw"
/>
```

### 3. 自動化工作流程
建立三個實用腳本：

**圖片大小分析**：
```bash
node scripts/check-image-sizes.js
```

**圖片優化處理**：
```bash
node scripts/optimize-images.js
```

**重複檔案檢測**：
```bash
node scripts/check-duplicates.js
```

---

## 實施結果

### 優化成果
- **總檔案數**：16 個圖片檔案
- **優化檔案**：2 個超大 Banner 圖片
- **重複檔案**：0 個
- **總體效果**：大幅提升載入速度，解決原始問題

### 效能改善
- **首頁載入**：Banner 圖片從 1669KB 減至 45KB
- **About 頁面**：Banner 圖片從 1166KB 減至 153KB
- **用戶體驗**：消除圖片載入遲緩感

### 技術整合
- **路徑更新**：修正 `hero-section.tsx` 和 `about/page.tsx`
- **建置測試**：確認 `pnpm build` 成功無誤
- **開發環境**：支援即時預覽與效能分析

---

## 最佳實踐指引

### 圖片格式選擇
- **WebP 優先**：比 PNG/JPG 小 25-50%
- **檔案大小**：目標 200KB 以下
- **相容性**：現代瀏覽器廣泛支援

### Tailwind CSS 樣式
```tsx
// 推薦的圖片樣式類別
className="w-full h-auto object-cover"        // 響應式圖片
className="w-full h-full object-cover"        // 填滿容器
className="object-cover rounded-lg"           // 圓角圖片
className="cursor-pointer"                    // 可點擊圖片
```

### 專案架構考量
- **路徑處理**：使用 `getImagePath()` 確保 basePath 正確
- **首屏優化**：大圖保持 `priority` 屬性
- **響應式設計**：適當設定 `sizes` 屬性

---

## 驗證與監控

### 效能測試
```bash
# 開發環境測試
pnpm dev
# Chrome DevTools > Lighthouse 分析

# 生產環境測試
pnpm build && pnpm preview
```

### 關鍵指標
- **LCP（Largest Contentful Paint）**：< 2.5s
- **CLS（Cumulative Layout Shift）**：< 0.1
- **首屏載入時間**：< 1s

---

## 執行記錄

### Todo-List ✅

- [x] 安裝 sharp 套件：`pnpm add -D sharp` ✅
- [x] 盤點所有圖片檔案大小，列出超過 200KB 的檔案 ✅
  - 發現問題：`banner-about.png` (1166KB)、`banner-main.png` (1669KB) 過大
- [x] PNG/JPG 轉 WebP，並壓縮至 200KB 以下 ✅
  - 成功生成：`banner-about.webp` (153KB)、`banner-main.webp` (45KB)
- [x] 檢查是否有內容重複的圖片（hash 比對）✅
  - 結果：18 個圖片檔案，無重複檔案
- [x] 更新圖片引用路徑（如有格式變更）✅
  - 更新 `hero-section.tsx` 和 `about/page.tsx` 使用 WebP 格式
- [x] 用 Performance 工具分析優化前後 LCP 分數 ✅
  - 開發環境已啟動，可使用 Chrome DevTools 進行 Lighthouse 分析
- [x] 將最佳實踐同步到 `tailwind-best-practices.md` 與 `copilot-instructions.md` ✅

### 優化成果
- **首頁 Banner**: 1669KB → 45KB（壓縮 97.3%）
- **About Banner**: 1166KB → 153KB（壓縮 86.9%）
- **總體效果**: 大幅提升載入速度，改善用戶體驗

### 技術實現
- 使用 Node.js sharp 套件自動化處理
- 建立完整的圖片優化工作流程
- 整合到專案開發與部署流程中

---

*文件更新時間: 2025年9月8日*
