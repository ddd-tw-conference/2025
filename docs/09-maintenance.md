# 第9章：運維與維護

> **本章內容**：系統監控、日常維護任務、故障排除指南

---

## 🛠️ 日常維護任務

### 例行檢查清單

#### 每日檢查
- [ ] 網站正常運作 (`https://conf.ddd.tw`)
- [ ] 售票連結有效性
- [ ] 多語言切換功能
- [ ] 版本監控系統 (`Ctrl+Shift+V`)

#### 每週檢查
- [ ] GitHub Pages 部署狀態
- [ ] Web Vitals 效能指標
- [ ] 圖片載入速度
- [ ] SEO 搜尋結果

#### 開發後檢查
- [ ] **Serena 專案索引更新**
- [ ] 程式碼品質檢查 (`pnpm lint`)
- [ ] 型別檢查 (`pnpm type-check`)
- [ ] 建置測試 (`pnpm build`)
- [ ] 圖片優化檢查 (`node scripts/check-image-sizes.js`)

```bash
# Serena 專案索引更新（必須執行）
uvx --from git+https://github.com/oraios/serena serena project index

# 圖片更新最佳實踐（講者照片等）
# 1. 觸發腳本覆寫判斷
(Get-Item 'public/images/speakers/filename.jpg').LastWriteTime = Get-Date
# 2. 執行智慧轉換（已含品質優化）
node scripts/generate-all-webp.js
```

---

## 🖼️ 圖片資源管理最佳實踐

### 智慧圖片更新工作流程
**基於 waterball 講者照片更新的成功經驗總結**

#### 核心原則：善用既有工具鏈
- ✅ **零新增工具**：充分利用專案內建 `scripts/generate-all-webp.js`
- ✅ **最小修改**：僅需 3 步驟完成圖片更新
- ✅ **智慧壓縮**：腳本已內建品質優化（85-90），平均節省 40%+ 空間

#### 標準操作流程
```powershell
# 1. 觸發覆寫判斷（利用 mtime 機制）
(Get-Item 'public/images/speakers/講者ID.jpg').LastWriteTime = Get-Date

# 2. 執行智慧轉換（已含品質優化）
node scripts/generate-all-webp.js

# 3. 提交變更
git add public/images/speakers/講者ID.webp && git commit -m "chore(images): replace 講者ID speaker photo"
```

#### 工具鏈智慧特性
- **mtime 檢查**：自動跳過無需更新的檔案
- **檔案大小適應**：大檔案用 75% 品質，小檔案用 90% 品質
- **即時回饋**：顯示轉換結果與空間節省百分比
- **git 整合**：使用版本控制作為備份策略

#### 驗收檢查點
- [ ] 腳本執行成功並顯示轉換統計
- [ ] WebP 檔案 LastWriteTime 已更新
- [ ] 空間節省達 30%+ （正常範圍）
- [ ] git commit 成功完成

### 🎯 議程分段系統開發經驗

#### 實作成就總結
- ✅ **零破壞性變更**: 完全向後相容，無需修改現有頁面
- ✅ **標準化時間結構**: 建立 30+10+90+20+30 分鐘的議程模式
- ✅ **類型安全資料結構**: 完整的 TypeScript 介面定義
- ✅ **響應式設計完成**: 支援桌面到手機的完美適配
- ✅ **i18n 清理優化**: 移除無用翻譯，新增必要多語系支援

#### 關鍵技術亮點
- **動態時間計算**: 基於 `duration` 欄位自動計算各段落時間範圍
- **類型導向樣式**: knowledge/workshop/practice/break 各有專屬色彩系統
- **關鍵字響應式排版**: 桌面同行顯示，手機自動換行
- **講者資料快取**: 高效的講者 ID 查找與頭像展示機制

#### 維護性設計原則
- **設定檔驅動**: 所有內容來自 `agenda.ts` 和 `speakers.ts`，無硬編碼
- **模組化架構**: 僅修改 `agenda-lightbox.tsx` 一個元件
- **類型安全**: TypeScript 嚴格檢查，編譯期捕捉錯誤
- **國際化完整**: 所有文字透過 `t()` 函式處理

#### 故障排除經驗
- **講者 ID 對應**: 確保 `speakerIds` 與 `speakers.ts` 中的 `id` 完全一致
- **時間計算邏輯**: 總時長必須等於所有 `segment.duration` 的總和
- **響應式設計**: 使用 `sm:` 斷點而非 `md:` 以確保更好的手機體驗
- **JSX 語法**: 注意 React 19 的嚴格標籤閉合要求

#### 重要時期檢查
- [ ] 票券狀態配置正確
- [ ] Accupass 整合正常
- [ ] 會議資訊更新
- [ ] 講者資料完整
  promoCode: {
    isVisible: false              // 🔒 暫不顯示優惠碼
---

## ⚙️ 配置更新指南

### 票券系統維護
```typescript
// config/tickets.ts

// 開始售票
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,        // 啟用售票
  isEarlyBirdSoldOut: false,      // 早鳥票可購買
  purchaseUrl: "https://www.accupass.com/...",
  promoCode: { isVisible: false }
}

// 早鳥票售罄
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,
  isEarlyBirdSoldOut: true,       // 標記早鳥票售罄
  purchaseUrl: "...",
  promoCode: {
    isVisible: true,              // 啟用優惠碼促銷
    code: "DDDTW2025"
  }
}

// 停止售票
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: false      // 停用所有售票
}
```

### 內容更新流程

#### 新增講者資料
```typescript
// lib/data/speakers.ts
export const speakers: Speaker[] = [
  {
    id: "new-speaker",
    name: { 'zh-tw': "講者姓名", 'en': "Speaker Name" },
    title: { 'zh-tw': "職稱", 'en': "Title" },
    bio: { 'zh-tw': "簡介...", 'en': "Bio..." },
    avatar: "/images/speakers/new-speaker.webp"
  }
]
```

#### 圖片更新
```bash
# 1. 將新圖片放入對應目錄
cp new-image.jpg public/images/

# 2. 轉換為 WebP 格式
pnpm optimize:images

# 3. 提交變更
git add . && git commit -m "feat: 更新講者資料"
```
node scripts/generate-all-webp.js

# 3. 檢查優化效果
node scripts/check-image-sizes.js

# 4. 刪除原始檔案（可選）
rm public/images/new-image.jpg
```

#### 圖片使用方式
```tsx
// 在元件中使用
import { getOptimizedImagePath } from '@/lib/image-optimization'

<img 
  src={getOptimizedImagePath('/images/speaker.jpg')} 
  alt="講者照片"
  className="w-full h-auto object-cover"
/>
```

---

## 🚨 故障排除指南

### 常見問題與解決方案

#### 網站無法載入
```bash
# 檢查部署狀態
curl -I https://conf.ddd.tw

# 檢查 GitHub Pages 設定
# GitHub Repository > Settings > Pages
```

#### 圖片載入失敗
```bash
# 重新產生 WebP 圖片
pnpm optimize:images

# 檢查圖片路徑
ls -la public/images/
```

#### 建置失敗
```bash
# 檢查 TypeScript 錯誤
pnpm type-check

# 檢查 ESLint 錯誤
pnpm lint

# 清除快取重新建置
rm -rf .next out
pnpm build
```

#### 配置不生效
1. 檢查 `config/*` 檔案語法
2. 確認 import 路徑正確
3. 重啟開發伺服器 (`pnpm dev`)

### 版本回復
```bash
# 回復到上一個穩定版本
git log --oneline  # 查看提交歷史
git reset --hard [commit-hash]
git push --force-with-lease
```

---

## 📋 維護檢查表

### 每次變更後
- [ ] Serena 專案索引更新
- [ ] 程式碼檢查通過
- [ ] 建置成功
- [ ] 功能測試通過

### 定期維護
- [ ] 依賴套件更新
- [ ] 安全性掃描
- [ ] 效能監控檢視
- [ ] 備份重要配置

---

**文檔結束 - 完整的 DDD Taiwan 2025 技術文檔**
uvx --from git+https://github.com/oraios/serena serena project index
git commit -m "feat: 新功能並更新 Serena 索引"

# 發布前：最終索引確認
uvx --from git+https://github.com/oraios/serena serena project index
pnpm build
```

#### 🔍 索引狀態檢查
```bash
# 檢查 Serena 配置
cat .serena/project.yml

# 檢查索引快取檔案
ls -la .serena/cache/typescript/

# 檢查最後索引時間
stat .serena/cache/typescript/document_symbols_cache_*.pkl
```

#### ⚠️ 索引問題排除
**問題**：`uvx` 指令找不到
```bash
# 解決方案：確認 Python 和 pipx 安裝
pip install --user pipx
pipx ensurepath
```

**問題**：索引失敗或不完整
```bash
# 解決方案：清除快取重新索引
rm -rf .serena/cache/
uvx --from git+https://github.com/oraios/serena serena project index
```

**問題**：某些檔案沒有被索引
```bash
# 檢查 .serena/project.yml 中的 ignored_paths
# 確認檔案沒有被意外忽略
```

### 📊 索引效果驗證
執行索引後，應該看到：
- ✅ 處理檔案數量合理（約 100-120 個檔案）
- ✅ 生成快取檔案 `document_symbols_cache_*.pkl`
- ✅ 無錯誤訊息
- ✅ GitHub Copilot 建議更準確

---

## 🚨 故障排除指南

### 🔧 常見問題與解決方案

#### 1. 網站無法載入
**症狀**：訪問網站出現 404 或載入失敗

**檢查步驟**：
```bash
# 檢查 GitHub Pages 部署狀態
# 前往：https://github.com/ddd-tw-conference/2025/actions

# 檢查建置結果
pnpm build

# 檢查靜態檔案
ls -la out/
```

**常見原因**：
- GitHub Pages 部署失敗
- `basePath` 配置錯誤
- 靜態輸出配置問題

**解決方案**：
```javascript
// 檢查 next.config.mjs
const nextConfig = {
  output: 'export',
  basePath: '/2025',           // 確保路徑正確
  trailingSlash: false,
  assetPrefix: '/2025'         // 可能需要加入
}
```

#### 2. 圖片載入緩慢或失敗
**症狀**：圖片載入速度慢或顯示破圖

**檢查步驟**：
```bash
# 檢查圖片檔案大小
node scripts/check-image-sizes.js

# 檢查 WebP 轉換
ls -la public/images/**/*.webp
```

**解決方案**：
```bash
# 重新優化所有圖片
node scripts/generate-all-webp.js

# 檢查圖片路徑
# 確保使用 getOptimizedImagePath()
```

#### 3. 多語言切換異常
**症狀**：語言切換按鈕無效或內容未翻譯

**檢查步驟**：
```bash
# 檢查語言檔案格式
cat locales/zh-tw.json | jq .
cat locales/en.json | jq .
```

**解決方案**：
```typescript
// 檢查 i18n context 使用
const { t, language, changeLanguage } = useI18n()

// 確保元件在 I18nProvider 內
<I18nProvider>
  <YourComponent />
</I18nProvider>
```

#### 4. 售票連結無效
**症狀**：點擊購票按鈕無反應或跳轉錯誤頁面

**檢查步驟**：
```typescript
// 檢查配置檔案
import { getTicketPurchaseUrl } from '@/config'
console.log(getTicketPurchaseUrl())
```

**解決方案**：
```typescript
// 更新 config/tickets.ts
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  purchaseUrl: "https://www.accupass.com/eflow/ticket/正確的票券ID"
}
```

#### 5. 版本監控失效
**症狀**：`Ctrl+Shift+V` 無反應或顯示錯誤

**檢查步驟**：
```bash
# 檢查版本檔案
cat public/version.json

# 檢查元件引入
grep -r "version-monitor" app/
```

**解決方案**：
```tsx
// 確保在根 layout 引入
import { VersionMonitor } from '@/components/version-monitor'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <VersionMonitor />
      </body>
    </html>
  )
}
```

### 🔍 除錯工具

#### 1. 版本監控面板
- **快捷鍵**：`Ctrl+Shift+V`
- **功能**：檢查版本、效能指標、配置狀態
- **使用時機**：懷疑版本不同步或效能問題時

#### 2. 瀏覽器開發者工具
```javascript
// 在 Console 執行檢查
// 檢查配置
window.__DDDTW_CONFIG__ = require('@/config')

// 檢查 i18n 狀態
window.__DDDTW_I18N__ = {
  current: localStorage.getItem('dddtw-language'),
  available: ['zh-tw', 'en']
}

// 檢查效能
window.__DDDTW_PERF__ = performance.getEntriesByType('navigation')
```

#### 3. 建置診斷
```bash
# 詳細建置資訊
pnpm build --debug

# 分析 bundle 大小
npx @next/bundle-analyzer

# 檢查靜態輸出
tree out/ -I 'node_modules'
```

---

## 🔄 更新與部署流程

### 📦 版本發布流程

#### 1. 準備更新
```bash
# 更新依賴
pnpm update

# 執行完整測試
pnpm lint
pnpm build

# 檢查圖片優化
node scripts/check-image-sizes.js
```

#### 2. 版本號更新
```json
// package.json
{
  "version": "1.0.1",  // 遞增版本號
}
```

```json
// public/version.json
{
  "version": "1.0.1",
  "buildTime": "2025-01-09T10:30:00Z",
  "commit": "abc123..."
}
```

#### 3. Git 提交與推送
```bash
# 提交變更
git add .
git commit -m "chore: release v1.0.1"

# 推送到 GitHub
git push origin main

# GitHub Actions 會自動部署到 GitHub Pages
```

#### 4. 部署驗證
- [ ] 檢查 GitHub Actions 執行狀態
- [ ] 驗證網站正常載入
- [ ] 確認版本號更新 (`Ctrl+Shift+V`)
- [ ] 測試核心功能

### 🔧 緊急修復流程

#### 關鍵問題快速修復
```bash
# 1. 創建修復分支
git checkout -b hotfix/critical-issue

# 2. 進行最小化修復
# 例如：修復售票連結
# config/tickets.ts: 更新 purchaseUrl

# 3. 快速測試
pnpm build

# 4. 緊急部署
git commit -m "hotfix: fix ticket purchase link"
git push origin hotfix/critical-issue

# 5. 創建 Pull Request 立即合併
```

#### 回滾機制
```bash
# 回滾到上一個正常版本
git revert HEAD
git push origin main

# 或回滾到特定 commit
git reset --hard <previous-commit>
git push --force origin main
```

---

## 📊 監控與維護指標

### 📈 效能監控

#### Web Vitals 目標值
| 指標 | 目標 | 警戒值 |
|------|------|--------|
| **LCP** | < 2.5s | > 4.0s |
| **FID** | < 100ms | > 300ms |
| **CLS** | < 0.1 | > 0.25 |

#### 檢查方式
```javascript
// 使用版本監控面板
// Ctrl+Shift+V → Performance 標籤

// 或使用 PageSpeed Insights
// https://pagespeed.web.dev/analysis?url=https://ddd-tw-conference.github.io/2025/
```

### 🔍 維護檢查腳本

#### 自動檢查腳本
```bash
#!/bin/bash
# scripts/health-check.sh

echo "🔍 執行網站健康檢查..."

# 檢查建置
echo "📦 檢查建置..."
pnpm build || exit 1

# 檢查圖片
echo "📸 檢查圖片優化..."
node scripts/check-image-sizes.js

# 檢查語言檔案
echo "🌍 檢查語言檔案..."
node -e "
  const zhTw = require('./locales/zh-tw.json');
  const en = require('./locales/en.json');
  console.log('zh-tw keys:', Object.keys(zhTw).length);
  console.log('en keys:', Object.keys(en).length);
"

echo "✅ 健康檢查完成！"
```

#### 定期執行
```bash
# 加入 crontab 定期執行
# 每天早上 8:00 檢查
0 8 * * * cd /path/to/project && ./scripts/health-check.sh
```

---

## 📞 支援與聯絡

### 🆘 緊急聯絡清單
- **技術負責人**：[技術負責人聯絡方式]
- **GitHub Repository**：https://github.com/ddd-tw-conference/2025
- **部署平台**：GitHub Pages
- **票務平台**：Accupass

### 📚 參考資源
- [Next.js 官方文檔](https://nextjs.org/docs)
- [GitHub Pages 文檔](https://docs.github.com/pages)
- [Accupass API 文檔](https://www.accupass.com/developer)

---

**本章總結**：維護手冊提供了完整的日常維護、故障排除和更新流程指南。定期執行檢查清單，遵循標準流程，能確保網站穩定運行。
