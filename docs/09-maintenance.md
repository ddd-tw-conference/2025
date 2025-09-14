# 第9章：維護手冊

> **本章內容**：日常維護任務、故障排除指南、系統更新流程

---

## 🛠️ 日常維護任務

### 📋 例行檢查清單

#### 每日檢查
- [ ] 網站正常運作 (`https://ddd-tw-conference.github.io/2025/`)
- [ ] 售票連結有效性
- [ ] 多語言切換功能
- [ ] 版本監控系統 (`Ctrl+Shift+V`)

#### 每週檢查
- [ ] GitHub Pages 部署狀態
- [ ] Web Vitals 效能指標
- [ ] 圖片載入速度
- [ ] SEO 搜尋結果

#### 開發後檢查（每次功能開發完成後）
- [ ] **Serena 專案索引更新** (`uvx --from git+https://github.com/oraios/serena serena project index`)
- [ ] 程式碼品質檢查 (`pnpm lint`)
- [ ] 型別檢查 (`pnpm type-check`)
- [ ] 建置測試 (`pnpm build`)

#### 重要時期檢查（售票開始/會議前）
- [ ] 票券狀態配置正確
- [ ] Accupass 整合正常
- [ ] 會議資訊更新
- [ ] 講者資料完整
- [ ] **Serena 索引包含最新配置** (重新執行索引)

---

## ⚙️ 配置更新指南

### 🎫 票券系統維護

#### 開始售票
```typescript
// config/tickets.ts
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: true,        // ✅ 啟用售票
  isEarlyBirdSoldOut: false,      // ✅ 早鳥票可購買
  purchaseUrl: "https://www.accupass.com/eflow/ticket/[票券ID]",
  promoCode: {
    isVisible: false              // 🔒 暫不顯示優惠碼
  }
}
```

#### 早鳥票售罄
```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: true,
  isEarlyBirdSoldOut: true,       // ⚠️ 標記早鳥票售罄
  purchaseUrl: "...",
  promoCode: {
    isVisible: true,              // 🎯 啟用優惠碼促銷
    code: "DDDTW2025"
  }
}
```

#### 停止售票
```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: false,      // 🛑 停用所有售票
  // 其他設定保持不變
}
```

### 🌍 內容更新流程

#### 新增講者資料
1. **準備圖片**：
   ```bash
   # 將講者照片放入 public/images/speakers/
   node scripts/generate-all-webp.js  # 轉換為 WebP
   ```

2. **更新資料檔案**：
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

3. **多語言內容**：
   ```json
   // locales/zh-tw.json
   {
     "speakers": {
       "new-speaker": {
         "session": "演講主題"
       }
     }
   }
   ```

#### 議程時間更新
```typescript
// config/agenda.ts
export const AGENDA_CONFIG = {
  timeSlots: [
    { time: "09:00-09:30", type: "registration" },
    { time: "09:30-10:30", type: "keynote", speaker: "keynote-speaker" },
    // 新增時段...
  ]
}
```

### 📸 圖片管理

#### 新增圖片流程
```bash
# 1. 將原始圖片放入對應目錄
cp new-image.jpg public/images/

# 2. 轉換為 WebP 格式
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

## 🤖 Serena AI 輔助工具維護

### 📋 Serena 索引管理

#### 🔄 何時需要重新索引
**強制重新索引情況**：
- ✅ 新增或修改 React 元件
- ✅ 更新 `config/*` 配置檔案
- ✅ 修改 TypeScript 型別定義
- ✅ 新增或變更頁面路由
- ✅ 更新專案文件 (`docs/`, `README.md`, `copilot-instructions.md`)
- ✅ 完成重要功能開發

**可選重新索引情況**：
- 🔶 樣式調整（僅 CSS/Tailwind 變更）
- 🔶 文字內容更新（不涉及程式邏輯）
- 🔶 圖片資源新增/替換

#### 📝 標準索引流程
```bash
# 1. 確保在專案根目錄
cd C:\Users\a8022\Desktop\2025

# 2. 執行 Serena 專案索引
uvx --from git+https://github.com/oraios/serena serena project index

# 3. 驗證索引完成
# 看到 "Symbols saved to .serena/cache/..." 即表示成功
```

#### 🚀 開發工作流程集成
```bash
# 開發前：確認索引是最新的
uvx --from git+https://github.com/oraios/serena serena project index

# 開發中：重大變更後立即索引
git add .
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
