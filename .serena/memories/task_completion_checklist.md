# 任務完成後的檢查清單

## 程式碼品質檢查
1. **TypeScript 型別檢查**
   ```bash
   npx tsc --noEmit
   ```
   
2. **ESLint 程式碼檢查**
   ```bash
   pnpm lint
   ```

3. **建置測試**
   ```bash
   pnpm build
   ```

## 功能測試
1. **開發模式測試**
   - 啟動 `pnpm dev`
   - 測試所有頁面功能
   - 檢查響應式設計
   - 驗證多語言切換

2. **生產建置測試**
   - 執行 `pnpm build`
   - 檢查 out/ 目錄生成
   - 測試靜態檔案存取

3. **特定功能驗證**
   - 票券購買流程
   - 講者 lightbox 功能
   - 語言切換
   - 版本監控 (Ctrl+Shift+V)

## 效能檢查
1. **圖片優化**
   ```bash
   node scripts/check-image-sizes.js
   ```

2. **Bundle 分析**
   ```bash
   ANALYZE=true pnpm build
   ```

3. **Web Vitals 監控**
   - 檢查效能面板數據
   - 確認載入時間合理

## 部署前檢查
1. **配置驗證**
   - 檢查 config/tickets.ts 票券狀態
   - 確認多語言內容完整
   - 驗證圖片路徑正確

2. **Git 提交**
   ```bash
   git add .
   git commit -m "type: description"
   git push origin main
   ```

3. **部署驗證**
   - 等待 GitHub Actions 完成
   - 檢查 https://ddd-tw-conference.github.io/2025/
   - 測試關鍵功能正常運作