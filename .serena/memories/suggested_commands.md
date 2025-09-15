# 開發指令

## 基本指令
```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 建置
pnpm build

# 建置並分析
pnpm build:analyze
```

## 圖片優化
```bash
# 生成 WebP 圖片
node scripts/generate-all-webp.js

# 檢查圖片大小
node scripts/check-image-sizes.js
```

## 部署
```bash
# 部署檢查
pnpm deploy:check

# GitHub Pages 部署
# (透過 GitHub Actions 自動執行)
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