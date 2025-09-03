# GitHub Copilot Instructions for DDD Taiwan 2025

## 🎯 專案概述
DDD Taiwan 2025 研討會官網 - Next.js 15 + TypeScript + Tailwind，靜態部署到 GitHub Pages

## 🛠 技術架構
- **框架**: Next.js 15 (App Router) + React 19 + TypeScript
- **UI**: Tailwind CSS + shadcn/ui (Radix)
- **部署**: GitHub Pages 靜態匯出 (`output: 'export'`)
- **多語系**: 自定義 i18n (zh-tw/en)
- **票務**: Accupass 外部整合

## 📁 關鍵檔案
```
app/
├── tickets/page.tsx    # 購票頁面 (Accupass 整合)
├── not-found.tsx      # 404 頁面 (智能聯繫功能)
└── error.tsx          # 錯誤頁面

components/layout/
└── header.tsx         # 響應式固定導航 (桌面固定/手機相對)

lib/
├── ticket-config.ts   # 票務開關 (isTicketSaleActive: true)
├── data/conference.ts # 講師/議程資料 (多語系)
└── i18n.ts           # 多語系核心

locales/
├── zh-tw.json        # 繁體中文
└── en.json           # 英文
```

## ⚡ 開發規範 (基於 convention.md)

### Git 最佳實踐
```bash
# ✅ 當文件修改損毀時，使用 Git 恢復
git checkout HEAD -- path/to/damaged-file.tsx

# ✅ 查看文件修改狀態
git status

# ✅ 查看具體修改內容
git diff path/to/file.tsx

# ❌ 避免直接刪除文件重建
# rm file.tsx  # 不推薦
```

### UI 設計模式
```tsx
// ✅ 主要按鈕 - 漸層 + 高對比
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">

// ✅ 次要按鈕 - 半透明 + 毛玻璃效果
<Button className="bg-white/10 border-white/30 text-white backdrop-blur-sm font-medium hover:bg-white/20">

// ✅ 響應式固定 Header - 桌面固定，手機相對
<header className="relative z-50 md:fixed md:top-0 md:left-0 md:right-0">

// ✅ 配套間距 - 避免固定 Header 遮蓋內容
<div className="hidden md:block h-20"></div>

// ❌ 避免對比度不足
<Button className="border-white/50 text-white">
```

### 路由跳轉標準
| 場景 | 方法 | 範例 |
|------|------|------|
| 內部頁面 | `<Link>` + `asChild` | `<Button asChild><Link href="/tickets">` |
| 程式跳轉 | `router.push()` | `router.push('/agenda')` |
| 外部連結 | `window.open()` | `window.open(ticketUrl, '_blank')` |

### 多語系使用 (基於 i18n-architecture.md)
```tsx
// ✅ 正確方式
const { t } = useI18n()
<button>{t('button.contactUs')}</button>

// ❌ 硬編碼
<button>聯繫我們</button>

// 資料結構
interface Speaker {
  name: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
}
```

## 🎫 票務系統 (基於 ticket-config.ts)

### 控制開關
```typescript
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,  // 主開關
  earlyBirdSaleStartDate: "2025-09-03",
  regularSaleStartDate: "2025-10-16"
}

// 購票功能實作
const handleTicketClick = () => {
  const ticketUrl = 'https://www.accupass.com/event/2508301008076132622520'
  window.open(ticketUrl, '_blank', 'noopener,noreferrer')
}
```

## 🐛 已解決問題

### 1. 按鈕可讀性 ✅
- **問題**: 透明按鈕文字看不清
- **解法**: 添加 `bg-white/10` 背景提高對比度

### 2. 路由問題 ✅  
- **問題**: `window.location.href` 破壞 SPA 路由
- **解法**: 統一使用 Next.js `<Link>` 和 `router.push()`

### 3. 郵件聯繫 ✅
- **問題**: `mailto:` 在某些環境顯示空白
- **解法**: 錯誤處理 + 剪貼簿備用方案

### 4. Accupass 整合 ✅
- **問題**: 購票按鈕無法連接外部
- **解法**: `window.open()` + 正確的 URL 參數

### 5. 固定導航 Header ✅
- **問題**: 首頁內容長，需滾回頂部才能導航
- **解法**: 桌面模式 Header 固定頂部，手機模式維持原樣
- **實現**: `relative z-50 md:fixed md:top-0 md:left-0 md:right-0`
- **配套**: 所有頁面添加 `<div className="hidden md:block h-20"></div>` 避免遮蓋

### 6. Git 文件恢復 ✅
- **問題**: 編輯工具意外損毀文件內容
- **解法**: 使用 `git checkout HEAD -- filename` 恢復文件
- **避免**: 直接刪除文件重建，會丟失 Git 歷史記錄

## 🚀 開發檢查清單

### 開發前
- [ ] `npm run dev` 啟動本地環境  
- [ ] 檢查 `isTicketSaleActive` 狀態

### UI 檢查
- [ ] 按鈕對比度 ≥ 4.5:1
- [ ] 所有文字使用 i18n (`t()` 函數)
- [ ] 響應式設計 (sm/md/lg)
- [ ] Header 在桌面模式正確固定

### 功能測試
- [ ] 內部路由使用 Next.js 方式
- [ ] 購票鏈接正確開啟 Accupass
- [ ] 多語系切換正常
- [ ] 聯繫功能有錯誤處理

### 部署前
- [ ] `npm run build` 無錯誤
- [ ] 靜態檔案生成到 `out/` 目錄
- [ ] 所有圖片在 `public/` 下

## 📞 聯繫資訊
- **技術支援**: dddtw2018@gmail.com
- **Repository**: ddd-tw-conference/2025
- **部署**: GitHub Pages

---
*最後更新: 2025年9月3日 | v2.2 - 新增 Git 文件恢復最佳實踐*

---
*最後更新: 2025年9月3日 | v2.1 - 新增響應式固定 Header*
*最後更新: 2025年9月3日 | v2.0*
