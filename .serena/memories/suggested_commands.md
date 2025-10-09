# 開發指令與工作流程

## 🚀 基本開發指令

### 專案初始化
```bash
# 安裝依賴 (使用 pnpm)
pnpm install

# 開發模式 (熱重載)
pnpm dev

# 開發模式 (穩定版本 - PowerShell)
Start-Process pwsh  # 啟動新的 PowerShell 然後執行 pnpm dev
```

### 建置與分析
```bash
# 標準建置
pnpm build

# 建置 + Bundle 分析
pnpm build:analyze
# 或
ANALYZE=true pnpm build

# 預覽建置結果
pnpm start
```

## 🖼️ 圖片優化指令

### 自動化圖片處理
```bash
# ✨ 生成所有圖片的 WebP 版本
node scripts/generate-all-webp.js

# 📊 檢查圖片檔案大小
node scripts/check-image-sizes.js

# 🔧 優化圖片品質
node scripts/optimize-images.js

# 🧪 測試圖片優化效果
node scripts/test-image-optimization.js

# 🔍 檢查重複檔案
node scripts/check-duplicates.js
```

## 🔍 程式碼品質檢查

### 靜態分析
```bash
# ESLint 程式碼檢查
pnpm lint

# ESLint 自動修復
pnpm lint:fix

# TypeScript 型別檢查
npx tsc --noEmit

# 完整品質檢查
pnpm type-check && pnpm lint
```

## 🚀 部署相關指令

### 部署準備
```bash
# 部署前檢查
pnpm deploy:check

# 建置生產版本
pnpm build

# 檢查建置輸出
ls -la out/  # 檢查 out 目錄
```

### GitHub Actions (自動執行)
```bash
# 推送到 main 分支自動觸發部署
git push origin main

# 檢查部署狀態
# 查看 GitHub Actions 頁面
```

## 🔧 開發工具指令

### 除錯工具
```bash
# 啟動除錯模式
NODE_OPTIONS='--inspect' pnpm dev

# 檢查套件更新
pnpm outdated

# 更新依賴
pnpm update

# 安全性檢查
pnpm audit
```

### 效能分析
```bash
# Lighthouse 測試 (需要 Chrome)
npx lighthouse http://localhost:3000 --output html

# Bundle 大小分析
npx next-bundle-analyzer

# Web Vitals 測試
# 內建在開發模式中，按 Ctrl+Shift+V 查看
```

## 🌍 多語言相關指令

### 語言檔案管理
```bash
# 檢查翻譯完整性
# (可考慮加入自動化腳本)

# 語言檔案格式化
prettier --write locales/*.json

# 檢查未使用的翻譯鍵
# (可考慮加入檢查腳本)
```

## 🔄 Git 工作流程

### 標準工作流程
```bash
# 檢查當前狀態
git status

# 暫存變更
git add .

# 或暫存特定檔案
git add components/specific-file.tsx

# 提交變更 (使用語意化提交)
git commit -m "feat: add new ticket component"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "docs: update README.md"

# 推送變更 (自動觸發部署)
git push origin main
```

### 分支管理
```bash
# 建立功能分支
git checkout -b feature/new-speaker-page

# 切換分支
git checkout main

# 合併分支
git merge feature/new-speaker-page

# 刪除已合併的分支
git branch -d feature/new-speaker-page
```

## 🖥️ Windows 特殊指令

### PowerShell 指令
```powershell
# 檔案操作
Get-ChildItem *.tsx | Measure-Object  # 計算檔案數量
Move-Item file1.txt file2.txt -Force  # 強制移動檔案

# 系統資訊
Get-Process | Where-Object {$_.Name -like "*node*"}  # 查看 Node 程序

# 網路測試
Test-NetConnection localhost -Port 3000  # 測試本地端口
```

## 🛠️ 特殊開發功能

### 內建開發工具
```bash
# 版本監控面板
# 在瀏覽器中按 Ctrl+Shift+V

# 效能監控
# 開發模式自動顯示 Web Vitals

# 錯誤監控
# 檢查瀏覽器 Console 和 Network 面板
```

### MCP 工具整合
```bash
# 使用 Serena 工具進行程式碼分析
# (透過 VS Code 整合)

# 使用 Context7 查詢文檔
# (透過 MCP 伺服器)

# 使用 Chrome DevTools
# (透過 MCP Chrome 工具)
```

## 📊 監控與分析

### 效能監控
```bash
# 本地效能測試
npm run lighthouse

# 載入時間分析
# 使用瀏覽器 DevTools Performance 面板

# 記憶體使用分析
# 使用瀏覽器 DevTools Memory 面板
```

### 錯誤追蹤
```bash
# 查看建置錯誤
pnpm build 2>&1 | tee build.log

# 查看開發伺服器日誌
pnpm dev | tee dev.log

# 檢查 TypeScript 錯誤
npx tsc --noEmit --incremental false
```

## 🎯 快速開發技巧

### 常用組合指令
```bash
# 完整檢查 + 建置
pnpm type-check && pnpm lint && pnpm build

# 圖片優化 + 建置
node scripts/generate-all-webp.js && pnpm build

# 清理 + 重新安裝
rm -rf node_modules .next out && pnpm install

# 快速部署檢查
pnpm lint && pnpm build && echo "Ready for deployment!"
```