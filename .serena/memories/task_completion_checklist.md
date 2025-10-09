# 任務完成檢查清單

## 🔧 開發階段檢查

### 程式碼品質檢查
```bash
# TypeScript 型別檢查
npx tsc --noEmit

# ESLint 程式碼檢查
pnpm lint

# 自動修復可修復的問題
pnpm lint:fix

# 程式碼格式化
npx prettier --write .
```

### 建置測試
```bash
# 標準建置測試
pnpm build

# 檢查建置輸出
ls -la out/

# 測試建置檔案完整性
find out/ -name "*.html" | wc -l  # 檢查 HTML 檔案數量
```

## 🧪 功能測試檢查

### 核心功能驗證
- [ ] **首頁載入**: 確認首頁正常顯示
- [ ] **多語言切換**: 測試中英文切換功能
- [ ] **票券系統**: 驗證購票按鈕和 Accupass 連結
- [ ] **講者頁面**: 檢查講者卡片和詳細資訊
- [ ] **議程頁面**: 測試議程展示和燈箱功能
- [ ] **響應式設計**: 測試手機、平板、桌面版本

### 互動功能測試
- [ ] **導航選單**: 測試各頁面連結
- [ ] **語言選擇器**: 確認語言切換正常
- [ ] **按鈕互動**: 檢查所有按鈕的 hover 和點擊效果
- [ ] **表單功能**: 測試任何表單提交功能
- [ ] **外部連結**: 確認 Accupass 等外部連結正常

### 瀏覽器相容性
- [ ] **Chrome**: 主要開發瀏覽器
- [ ] **Firefox**: 次要測試瀏覽器
- [ ] **Safari**: macOS/iOS 相容性
- [ ] **Edge**: Windows 預設瀏覽器

## 📊 效能檢查

### 圖片優化驗證
```bash
# 檢查圖片大小
node scripts/check-image-sizes.js

# 生成 WebP 圖片 (如需要)
node scripts/generate-all-webp.js

# 檢查重複檔案
node scripts/check-duplicates.js
```

### 效能指標檢查
- [ ] **Lighthouse 分數**: 目標 90+ 分
- [ ] **首次內容繪製 (FCP)**: < 1.8s
- [ ] **最大內容繪製 (LCP)**: < 2.5s
- [ ] **累積版面偏移 (CLS)**: < 0.1
- [ ] **首次輸入延遲 (FID)**: < 100ms

### Bundle 分析
```bash
# 分析 JavaScript 包大小
ANALYZE=true pnpm build

# 檢查是否有不必要的大型依賴
```

## 🌐 內容檢查

### 多語言內容驗證
- [ ] **繁體中文內容**: 檢查所有中文內容正確性
- [ ] **英文內容**: 確認英文翻譯準確性
- [ ] **翻譯完整性**: 確認沒有遺漏的翻譯
- [ ] **文化適應**: 檢查日期、時間格式是否適當

### SEO 檢查
- [ ] **頁面標題**: 每頁都有獨特的標題
- [ ] **Meta 描述**: 重要頁面都有描述
- [ ] **Open Graph**: 社群分享標籤完整
- [ ] **結構化資料**: JSON-LD 格式正確

## 🔄 配置檢查

### 關鍵配置驗證
```typescript
// 檢查 config/tickets.ts
- isTicketSaleActive: 確認票券開賣狀態
- isEarlyBirdSoldOut: 確認早鳥票狀態
- purchaseUrl: 確認 Accupass 連結正確
- promoCode: 確認促銷碼設定 (目前已停用)
```

### 環境配置
- [ ] **next.config.mjs**: 確認輸出設定正確
- [ ] **package.json**: 檢查依賴版本
- [ ] **tailwind.config.ts**: 確認樣式配置
- [ ] **tsconfig.json**: TypeScript 設定檢查

## 🚀 部署前檢查

### Git 提交準備
```bash
# 檢查工作目錄狀態
git status

# 檢查提交歷史
git log --oneline -10

# 確認分支狀態
git branch -v
```

### 部署檢查清單
- [ ] **程式碼審查**: 所有變更已經過審查
- [ ] **測試通過**: 所有自動化測試通過
- [ ] **文檔更新**: 相關文檔已同步更新
- [ ] **版本標記**: 適當的版本標記或標籤

### GitHub Actions 驗證
```bash
# 推送到 main 分支
git push origin main

# 檢查部署狀態
# 1. 前往 GitHub Actions 頁面
# 2. 確認建置流程通過
# 3. 檢查部署完成
```

## 📝 上線後驗證

### 生產環境測試
- [ ] **網站存取**: https://conf.ddd.tw 正常載入
- [ ] **所有頁面**: 檢查每個頁面都能正常存取
- [ ] **功能測試**: 重複核心功能測試
- [ ] **效能監控**: 確認實際載入速度合理

### 監控設定
- [ ] **Google Analytics**: 確認追蹤正常運作
- [ ] **Search Console**: 檢查搜尋引擎收錄
- [ ] **錯誤監控**: 設定錯誤追蹤 (如適用)

## 🔄 Serena 工具維護

### 專案索引更新
```bash
# 更新 Serena 專案索引
uvx --from git+https://github.com/oraios/serena serena project index

# 檢查記憶檔案狀態
# 確認所有記憶檔案都已更新
```

### 記憶檔案檢查
- [ ] **project_overview**: 專案概覽是否最新
- [ ] **tech_stack**: 技術棧資訊準確
- [ ] **key_config_status**: 配置狀態正確
- [ ] **main_features_modules**: 功能模組完整

## ⚡ 快速檢查指令

### 完整檢查流程
```bash
# 一鍵完整檢查
pnpm type-check && pnpm lint && pnpm build && echo "✅ All checks passed!"

# 圖片優化檢查
node scripts/check-image-sizes.js && echo "✅ Images optimized!"

# 部署準備檢查
git status && pnpm build && echo "✅ Ready for deployment!"
```

## 🎯 檢查結果記錄

### 完成狀態追蹤
- [ ] 開發階段檢查完成
- [ ] 功能測試檢查完成  
- [ ] 效能檢查完成
- [ ] 內容檢查完成
- [ ] 配置檢查完成
- [ ] 部署前檢查完成
- [ ] 上線後驗證完成
- [ ] Serena 工具維護完成

**最終確認**: 所有檢查項目都已完成 ✅