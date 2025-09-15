# 完成檢查清單

## 建置檢查
```bash
# TypeScript 檢查
npx tsc --noEmit

# 建置測試
pnpm build

# 程式碼檢查
pnpm lint
```

## 功能測試
- 語言切換正常
- 票券購買流程
- 響應式設計
- 圖片載入

## 更新 Serena
```bash
# 更新專案索引
uvx --from git+https://github.com/oraios/serena serena project index
```
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