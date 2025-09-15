# 第1章：專案概覽

> **本章內容**：專案背景與目標、技術棧選擇、核心開發規範

---

## 🎯 專案簡介

DDD Taiwan 2025 Conference 官方網站，提供領域驅動設計年度技術會議的完整資訊平台。

**核心功能**
- 📋 會議資訊展示：講者介紹、議程安排、會議地點
- 🎫 智慧售票系統：整合 Accupass 的動態票券行銷
- 🌍 多語言支援：繁體中文 / 英文雙語系統
- 📱 響應式設計：完美支援手機到桌面裝置

### 🛠️ 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 15.5.2 | React 框架 + 靜態輸出 |
| **React** | 19 | UI 函式庫 |
| **TypeScript** | 最新 | 型別安全 |
| **Tailwind CSS** | 最新 | CSS 框架 |
| **pnpm** | 最新 | 套件管理器 |

---

## 📐 核心開發規範

### 命名規範
- **檔案名稱**：`kebab-case` (例：`speaker-card.tsx`)
- **元件名稱**：`PascalCase` (例：`SpeakerCard`)
- **函式變數**：`camelCase` (例：`handleTicketPurchase`)

### 必須使用規範
```tsx
// 1. 'use client' 指令
'use client'

// 2. 配置引用（禁止硬編碼）
import { CONFIG } from '@/config'

// 3. 國際化翻譯
const { t } = useI18n()
return <h1>{t('page.title')}</h1>
```

### UI 設計標準
```tsx
// 主要按鈕
<Button className="bg-gradient-to-r from-blue-600 to-purple-600">
  立即購票
</Button>

// 次要按鈕
<Button className="bg-white/10 hover:bg-white/20">
  了解更多
</Button>
```

---

## 🚀 快速開始

### 安裝與執行
```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 建置專案
pnpm build
```

### 專案結構
```
app/           # Next.js 頁面
components/    # React 元件
config/        # 統一配置
hooks/         # 自定義 Hooks
lib/           # 工具函式
locales/       # 多語言檔案
```

---

**下一章：[第2章 架構設計](./02-architecture.md)**

### 專案簡介
DDD Taiwan 2025 Conference 官方網站，提供 Domain-Driven Design 年度技術會議的完整資訊平台。

**專案使命：**
- 🌐 推廣 DDD 在台灣的技術交流與實踐
- 🎯 提供會議參與者完整的資訊服務
- 📱 確保良好的使用者體驗與無障礙設計

**核心功能：**
- 📋 **會議資訊展示**：講者介紹、議程安排、會議地點
- 🎫 **智慧售票系統**：整合 Accupass 的動態票券行銷
- � **多語言支援**：繁體中文 / 英文雙語系統
- 📱 **響應式設計**：完美支援手機到桌面裝置

### 🏆 專案特色
- ⚡ **靜態網站優化**：Next.js export 模式 + GitHub Pages 部署
- 🎨 **設計系統驅動**：Tailwind CSS + Radix UI 組件庫
- ⚙️ **配置驅動開發**：集中式配置管理，無硬編碼
- � **TypeScript 嚴格模式**：完整型別安全保障
- 🚀 **效能優化**：WebP 圖片格式 + 智慧載入策略

### 🛠️ 技術棧

| 分類 | 技術 | 版本 | 用途 |
|------|------|------|------|
| **框架** | Next.js | 15.5.2 | React 框架 + 靜態輸出 |
| **前端** | React | 19 | UI 函式庫 |
| **語言** | TypeScript | 最新 | 型別安全 |
| **樣式** | Tailwind CSS | 最新 | CSS 框架 |
| **套件管理** | pnpm | 最新 | 高效能套件管理器 |
| **UI 組件** | Radix UI | 最新 | 無樣式組件庫 |
| **部署** | GitHub Pages | - | 靜態網站託管 |

### 📁 專案結構概覽
```
DDD Taiwan 2025/
├── 📱 前端應用 (Next.js 15 + React 19)
├── 🎨 設計系統 (Tailwind CSS + Radix UI)
├── 🌍 國際化系統 (自建 i18n)
├── 🎫 票券行銷 (配置驅動)
├── ⚡ 效能優化 (WebP + 靜態優化)
├── 🔧 開發工具 (版本監控 + Serena AI)
├── 📊 SEO 優化 (結構化資料)
└── 🛠️ 運維系統 (GitHub Actions)
```

---

## 📐 開發規範

### 🔤 命名規範
- **檔案名稱**：使用 `kebab-case`
  ```
  ✅ speaker-card.tsx
  ✅ ticket-marketing-section.tsx
  ❌ SpeakerCard.tsx
  ❌ ticketMarketingSection.tsx
  ```

- **元件名稱**：使用 `PascalCase`
  ```tsx
  ✅ export const SpeakerCard = () => {}
  ✅ export const TicketMarketingSection = () => {}
  ```

- **函式與變數**：使用 `camelCase`
  ```tsx
  ✅ const handleTicketPurchase = () => {}
  ✅ const isEarlyBirdAvailable = true
  ```

### 📦 Import 順序
```tsx
// 1. React 相關
import React from 'react'
import { useState, useEffect } from 'react'

// 2. Next.js 相關
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 3. 第三方套件
import { Button } from '@/components/ui/button'

// 4. 本地模組
import { useI18n } from '@/hooks/use-i18n'
import { CONFIG } from '@/config'
```

### ⚙️ 元件開發原則

#### 1. 必須使用 'use client'
```tsx
'use client'

import { useState } from 'react'

export const InteractiveComponent = () => {
  const [state, setState] = useState('')
  // 元件邏輯
}
```

#### 2. 統一配置引用
```tsx
// ✅ 正確：透過統一配置
import { CONFIG } from '@/config'
const ticketUrl = CONFIG.tickets.purchaseUrl

// ❌ 錯誤：硬編碼值
const ticketUrl = 'https://www.accupass.com/...'
```

#### 3. 國際化支援
```tsx
import { useI18n } from '@/hooks/use-i18n'

export const Component = () => {
  const { t } = useI18n()
  
  return (
    <h1>{t('page.title')}</h1>
    <p>{t('page.description')}</p>
  )
}
```

---

## 🎨 UI 設計原則

### 🔘 按鈕設計標準

#### 主要按鈕（Primary）
```tsx
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700">
  立即購票
</Button>
```

#### 次要按鈕（Secondary）
```tsx
<Button className="bg-white/10 border-white/30 text-white backdrop-blur-sm font-medium hover:bg-white/20 hover:border-white/50">
  了解更多
</Button>
```

#### 停用按鈕（Disabled）
```tsx
<Button disabled className="bg-gray-500 text-gray-300 cursor-not-allowed">
  已售完
</Button>
```

### 🖱️ 互動效果
所有可點擊元素必須包含：
```tsx
className="cursor-pointer hover:scale-105 transition-transform duration-200"
```

### 📱 響應式設計
```tsx
// 手機優先，桌面增強
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="p-4 md:p-8">
    {/* 內容 */}
  </div>
</div>
```

---

## 🚀 路由與導航

### 🎯 智慧講者導航系統

DDD Taiwan 2025 實作了進階的講者導航系統，提供無縫的用戶體驗：

#### 核心功能
- **首頁卡片點擊**：點擊精選講師卡片自動跳轉到講者頁面並開啟 Lightbox
- **事件隔離**：購票按鈕和卡片點擊獨立處理，避免意外觸發
- **智慧導航**：根據進入方式決定關閉 Lightbox 後的行為
- **分享支援**：URL 參數保留，支援直接分享講者連結

#### 使用範例

```tsx
// 1. SpeakerCards 組件：支援卡片點擊導航
<SpeakerCard
  speaker={speaker}
  onCardClick={(speaker) => router.push(`/speakers?id=${speaker.id}`)}
  onTicketClick={(speaker) => router.push('/tickets')}
/>

// 2. 講者頁面：URL 參數監聽
useEffect(() => {
  const speakerId = searchParams.get('id')
  if (speakerId) {
    const targetSpeaker = allSpeakers.find(s => s.id === speakerId)
    if (targetSpeaker) {
      openLightbox(targetSpeaker, true) // 標記為從首頁進入
    }
  }
}, [searchParams])

// 3. 智慧關閉邏輯
const closeLightbox = () => {
  if (isFromHomepage) {
    router.push('/') // 從首頁進入，返回首頁
  }
  // 否則停留在講者頁面
}
```

#### 導航行為模式

| 進入方式 | 關閉行為 | URL 範例 |
|---------|---------|----------|
| 首頁卡片點擊 | 返回首頁 | `/speakers?id=michael-chen` |
| 選單直接進入 | 停留在講者頁面 | `/speakers` |
| 分享連結 | 依據上下文決定 | `/speakers?id=sunny-cheng` |

### 內部頁面跳轉
```tsx
// 宣告式導航（推薦）
<Button asChild>
  <Link href="/tickets">購票頁面</Link>
</Button>

// 程式式導航
const router = useRouter()
const handleNavigation = () => {
  router.push('/tickets')
}
```

### 外部連結
```tsx
// 開新視窗
const handleExternalLink = () => {
  window.open('https://external-site.com', '_blank')
}
```

### 返回上頁
```tsx
// 瀏覽器返回
const handleGoBack = () => {
  window.history.back()
}
```

---

## ⚙️ Next.js 配置

### 靜態輸出設定
```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',           // 靜態輸出
  trailingSlash: false,       // 避免 404 錯誤
  basePath: '/2025',          // GitHub Pages 路徑
  images: { 
    unoptimized: true,        # 靜態輸出必要
    formats: ['image/webp']   # WebP 優先
  }
}
```

### TypeScript 嚴格模式
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## 📋 開發檢查清單

### 開發前準備
- [ ] `pnpm install` 安裝依賴
- [ ] `pnpm dev` 啟動開發服務器
- [ ] 檢查 `config/tickets.ts` 中的 `isTicketSaleActive` 狀態

### 實作階段
- [ ] 使用配置驅動功能（避免硬編碼）
- [ ] 所有文字透過 `t()` 函式處理
- [ ] 響應式設計（`md:` 前綴）
- [ ] 按鈕包含適當的互動效果

### 提交前驗證
- [ ] `pnpm build` 建置成功
- [ ] 多語言切換正常運作
- [ ] 按鈕狀態反映配置
- [ ] 版面在手機/桌面正確顯示

---

## 🔧 常用指令

```bash
# 開發
pnpm dev                    # 啟動開發服務器
pnpm build                  # 建置生產版本
pnpm lint                   # 程式碼檢查

# 圖片優化
node scripts/generate-all-webp.js    # 轉換為 WebP
node scripts/check-image-sizes.js    # 檢查檔案大小

# 測試
pnpm test                   # 執行測試（如有）
```

---

**下一章：** [第2章：架構設計](./02-architecture.md) - 深入了解系統架構與配置管理
