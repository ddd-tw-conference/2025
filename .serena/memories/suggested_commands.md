# 開發指令與工作流程

## 基本開發指令

### 安裝與啟動
```bash
# 安裝依賴
pnpm install

# 啟動開發服務器
pnpm dev

# 建置生產版本
pnpm build

# 預覽建置結果
pnpm preview
```

### 建置相關指令
```bash
# SPA 建置 (生產模式)
pnpm build:spa

# 建置並分析包大小
pnpm build:analyze

# 部署檢查
pnpm deploy:check
```

### 程式碼品質
```bash
# ESLint 檢查
pnpm lint

# TypeScript 型別檢查
npx tsc --noEmit
```

### 圖片優化指令
```bash
# 生成所有圖片的 WebP 版本
node scripts/generate-all-webp.js

# 優化圖片檔案
node scripts/optimize-images.js

# 檢查圖片大小
node scripts/check-image-sizes.js

# 測試圖片優化
node scripts/test-image-optimization.js
```

## Windows 系統指令
- **目錄瀏覽**: dir, cd
- **檔案操作**: copy, move, del
- **搜尋**: findstr (Windows 版 grep)
- **程序管理**: tasklist, taskkill
- **網路**: netstat, ping

## Git 工作流程
```bash
# 檢查狀態
git status

# 提交變更
git add .
git commit -m "feat: description"

# 推送到 GitHub (自動觸發部署)
git push origin main
```

## 特殊開發工具
- **版本監控**: 按 Ctrl+Shift+V 開啟版本檢查面板
- **效能監控**: 內建 Web Vitals 監控
- **Bundle 分析**: ANALYZE=true pnpm build