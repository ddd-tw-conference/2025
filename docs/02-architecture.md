# 第2章：系統架構設計

> **本章內容**：Next.js 應用架構、配置驅動原則、目錄結構設計

---

## 🏛️ 整體架構設計

### Next.js 15 + React 19 架構
```
前端應用 (Next.js 15)
├── App Router 路由系統
├── 靜態生成 (SSG) 
├── 配置驅動業務邏輯
├── 多語言系統 (i18n)
└── 響應式 UI (Tailwind CSS)
```

### ⚙️ 配置驅動架構

**核心原則：** 所有業務邏輯、功能開關由 `@/config` 集中管理，實現程式碼與配置分離。

**實作範例：**
```typescript
// config/tickets.ts
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,
  isEarlyBirdSoldOut: false,
  purchaseUrl: "https://www.accupass.com/...",
  promoCode: {
    isVisible: true,
    code: "DDD2025"
  }
}

// 元件中使用
import { TICKET_SALE_CONFIG } from '@/config/tickets'

{TICKET_SALE_CONFIG.isTicketSaleActive && <TicketSection />}
```

### React 19 注意事項
```tsx
// 解決 Hydration 警告
<body suppressHydrationWarning={true}>
  {children}
</body>
```
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-tw">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
```

---

## 📁 目錄結構設計

### 🗂️ 核心目錄架構
```
DDD Taiwan 2025/
├── 📱 app/                     # Next.js App Router 頁面
│   ├── layout.tsx             # 根佈局配置
│   ├── page.tsx               # 首頁
---

## 📁 目錄結構設計

```
專案目錄結構
├── app/                      # Next.js App Router
│   ├── page.tsx             # 首頁
│   ├── about/page.tsx       # 關於頁面
│   ├── speakers/            # 講者相關頁面
│   ├── agenda/page.tsx      # 議程頁面
│   └── tickets/page.tsx     # 售票頁面
├── components/              # 可重用元件
│   ├── ui/                  # 基礎 UI 元件
│   ├── layout/              # 佈局元件
│   └── speaker-cards.tsx    # 業務元件
├── config/                  # 集中式配置管理
│   ├── app.ts              # 應用程式基本配置
│   ├── tickets.ts          # 票券行銷配置
│   └── agenda.ts           # 議程配置
├── lib/                     # 工具函式與資料
│   ├── i18n.ts             # 國際化核心
│   ├── utils.ts            # 通用工具函式
│   └── data/               # 資料層
├── locales/                 # 多語言資源
│   ├── zh-tw.json          # 繁體中文
│   └── en.json             # 英文
└── public/                  # 靜態資源
```

## 🔄 狀態管理策略

### 多層次狀態管理
1. **全域狀態**：語言切換 (React Context)
2. **頁面狀態**：Lightbox 開關 (useState)
3. **URL 狀態**：導航參數 (useSearchParams)

```typescript
// 全域狀態
const { language, setLanguage } = useI18n()

// 頁面狀態
const [isLightboxOpen, setIsLightboxOpen] = useState(false)

// URL 狀態
const searchParams = useSearchParams()
const speakerId = searchParams.get('id')
```
   // 可分享的狀態，如講者 ID、議程時段
   const searchParams = useSearchParams()
   const speakerId = searchParams.get('id')
   ```

### 🔌 路由設計模式

**智慧導航系統：**
- 上下文追蹤：記錄使用者來源頁面
- 參數化路由：`/speakers?id=speaker1&from=homepage`
- 回退策略：優雅處理無效路由參數

---

## 📅 議程資料架構

### Session + Segment 架構設計

專案使用雙層資料結構管理議程：

```typescript
interface Session {
  time: string           // 時段："09:00 - 12:00"
  title: LocalizedText   // 主題標題
  speaker: string        // 講者名稱
  description: LocalizedText
  track: LocalizedText   // 會場：主會場 A / 會議室 B
  type: string
  segments: Segment[]    // 時段內的細分段落
}

interface Segment {
  duration: number       // 分鐘數
  title: LocalizedText
  description: LocalizedText
  speakerIds: string[]   // 講者 ID 陣列（關聯到 speakers.ts）
  keywords: LocalizedText
  type: 'knowledge' | 'workshop' | 'practice' | 'break'
}
```

### 關鍵設計原則

1. **資料關聯而非複製**
   - 使用 `speakerIds` 參照講者資料，避免資料重複
   - 透過 `getSpeakerById()` 函數查詢講者詳細資訊

2. **類型驅動 UI**
   - 不同 `type` 自動套用不同顏色與 icon
   - `break` 類型支援兩種模式：一般休息 / 專家面對面

3. **向後相容性**
   ```typescript
   // 一般休息 (speakerIds = [])
   { type: "break", speakerIds: [] }
   // → 顯示「放鬆時光，準備下一階段」
   
   // 專家面對面 (speakerIds.length > 0)
   { type: "break", speakerIds: ["expert-morning-kao"] }
   // → 顯示專家資訊 + t('agenda.expertBreakHint')
   ```

4. **擴展性設計**
   - 支援多專家同時在場：`speakerIds: ["id1", "id2"]`
   - Lightbox 使用 `.map()` 自動渲染所有專家

### 實作範例：專家面對面功能

```typescript
// lib/data/agenda.ts
{
  duration: 20,
  title: { 
    'zh-tw': "休息時間 — 專家面對面",
    'en': "Break Time — Face-to-Face with Experts" 
  },
  description: { 
    'zh-tw': "20 分鐘專家諮詢，現場與專家面對面交流。",
    'en': "20-minute expert consultation, on-site face-to-face with experts."
  },
  speakerIds: ["expert-morning-kao"],  // 關聯到講者資料
  keywords: { 
    'zh-tw': ["專家面對面", "諮詢"],
    'en': ["Face-to-Face", "Consultation"]
  },
  type: "break"
}
```

```tsx
// components/ui/agenda-lightbox.tsx
{segment.type === 'break' && (
  <div className="mt-2 space-y-3">
    <Coffee className={iconColor} />
    <span>{segment.speakerIds.length > 0 
      ? t('agenda.expertBreakHint')
      : '放鬆時光，準備下一階段'
    }</span>
    
    {/* 顯示專家資訊 */}
    {segment.speakerIds.map(id => {
      const speaker = getSpeakerById(id)
      return speaker ? (
        <div key={id}>
          <img src={speaker.image} />
          <span>{getLocalizedText(speaker.name, language)}</span>
          <span>{getLocalizedText(speaker.title, language)}</span>
        </div>
      ) : null
    })}
  </div>
)}
```

### 🎯 設計原則
1. **配置驅動**：所有功能狀態透過配置控制
2. **組件化**：高度模組化的 React 元件
3. **類型安全**：TypeScript 嚴格模式
4. **效能優先**：靜態生成 + 圖片優化
5. **多語言**：完整的 i18n 支援

### 📌 實際案例：講者資料更新最佳實踐

**情境**：上線前需更新「專家面對面」講者資訊，遵循最小修改原則。

#### 資料連結機制
```typescript
// lib/data/speakers.ts（講者資料源）
{
  id: "expert-morning-kao",
  name: { 'zh-tw': "即將公布（Kao）", 'en': "To be announced (Kao)" },
  // ... 其他欄位
}

// lib/data/agenda.ts（透過 speakerIds 關聯）
segments: [{
  speakerIds: ["expert-morning-kao"],  // 🔗 ID 連結
  type: "break"
}]

// components/ui/agenda-lightbox.tsx（查詢與顯示）
const speaker = getSpeakerById(id)  // 🔍 根據 ID 查詢
```

#### 關鍵注意事項
1. **ID 命名規範**：
   - 上午場（09:00-12:00）：`expert-morning-*`
   - 下午場（13:30-16:30）：`expert-afternoon-*`

2. **同步更新原則**：
   - 修改 `speakers.ts` 的 `id` 時，必須同步更新 `agenda.ts` 中所有 `speakerIds` 引用
   - 使用搜尋工具確認所有引用位置

3. **型別安全保證**：
   ```typescript
   // ✅ 正確：遵循 Speaker 介面
   socialLinks: {}  // 空物件而非 undefined
   
   // ❌ 錯誤：缺少必要的雙語欄位
   name: { 'zh-tw': "名稱" }  // 缺少 'en'
   ```

4. **向後相容性**：
   ```typescript
   // 組件中使用長度檢查避免破壞性
   {segment.speakerIds?.length > 0 && <ExpertInfo />}
   ```

**完整案例請參考**：`docs/09-maintenance.md` > 講者資料更新案例研究

---

## 📁 目錄結構詳解

### 🗂️ 根目錄結構
```
DDD-Taiwan-2025/
├── app/                    # Next.js App Router 頁面
├── components/             # 可重用 React 元件
├── config/                # 配置文件目錄
├── contexts/              # React Context 提供者
├── hooks/                 # 自定義 React Hooks
├── lib/                   # 工具函式與第三方整合
├── locales/              # 多語言資源檔案
├── public/               # 靜態資源
├── scripts/              # 建置與優化腳本
├── styles/               # 全域樣式檔案
└── docs/                 # 專案文檔
```

### 📄 app/ 目錄（頁面路由）
```
app/
├── layout.tsx            # 根版面組件
├── page.tsx              # 首頁
├── loading.tsx           # 載入狀態頁面
├── error.tsx             # 錯誤處理頁面
├── not-found.tsx         # 404 頁面
├── globals.css           # 全域樣式
├── robots.ts             # SEO robots 設定
├── sitemap.ts            # SEO sitemap 生成
├── about/
│   └── page.tsx          # 關於頁面
├── agenda/
│   └── page.tsx          # 議程頁面
├── speakers/
│   ├── layout.tsx        # 講者版面
│   └── page.tsx          # 講者列表
├── tickets/
│   └── page.tsx          # 售票頁面
└── transportation/
    └── page.tsx          # 交通資訊
```

### 🧩 components/ 目錄（元件庫）
```
components/
├── layout/               # 版面相關元件
│   ├── header.tsx        # 網站標頭
│   ├── footer.tsx        # 網站頁尾
│   ├── hero-section.tsx  # 主視覺區塊
│   └── about-section.tsx # 關於區塊
├── ui/                   # shadcn/ui 基礎元件
│   ├── button.tsx        # 按鈕元件
│   ├── card.tsx          # 卡片元件
│   ├── dialog.tsx        # 對話框元件
│   └── ...               # 其他 UI 元件
├── speaker-cards.tsx     # 講者卡片
├── ticket-marketing-section.tsx  # 票券行銷區塊
├── language-selector.tsx # 語言選擇器
├── version-monitor.tsx   # 版本監控工具
└── theme-provider.tsx    # 主題提供者
```

---

## ⚙️ 配置管理架構

### 📋 配置文件結構
```
config/
├── index.ts              # 統一匯出入口
├── app.ts                # 應用主配置
├── tickets.ts            # 票務系統配置
├── performance.ts        # 效能監控配置
├── agenda.ts             # 議程時段配置
└── constants.ts          # 應用常數
```

### 🎛️ 主要配置檔案

#### config/app.ts - 應用核心配置
```typescript
export const CONFIG = {
  // 部署配置
  deployment: {
    basePath: '/2025',
    domain: 'ddd-tw-conference.github.io',
    baseUrl: 'https://ddd-tw-conference.github.io/2025'
  },
  
  // 會議資訊
  conference: {
    year: 2025,
    name: 'DDDTW 2025',
    fullName: 'DDDTW 2025 - AI時代軟體開發方法',
    date: '2025年9月13日',
    venue: '台北國際會議中心'
  },
  
  // 聯絡資訊
  contact: {
    email: 'contact@dddtw.com',
    facebook: 'https://www.facebook.com/DDDesignTW',
    linkedin: 'https://www.linkedin.com/company/ddd-taiwan'
  }
}
```

#### config/tickets.ts - 票務配置
```typescript
export interface TicketSaleConfig {
  isTicketSaleActive: boolean
  isEarlyBirdSoldOut?: boolean
  purchaseUrl: string
  promoCode?: {
    isVisible: boolean
    code?: string
  }
}

export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: true,
  isEarlyBirdSoldOut: true,
  purchaseUrl: "https://www.accupass.com/eflow/ticket/2410070349001779478700",
  promoCode: {
    isVisible: false,
    code: "DDDTW2025"
  }
}

// 票券狀態檢查函式
export const isEarlyBirdAvailable = (): boolean => {
  return TICKET_SALE_CONFIG.isTicketSaleActive && !TICKET_SALE_CONFIG.isEarlyBirdSoldOut
}

export const isRegularTicketAvailable = (): boolean => {
  return TICKET_SALE_CONFIG.isTicketSaleActive
}

// 購票 URL 取得函式
export const getTicketPurchaseUrl = (): string => {
  return TICKET_SALE_CONFIG.purchaseUrl
}
```

### 🔧 配置使用模式

#### 1. 統一引入方式
```typescript
// ✅ 正確：透過統一入口引入
import { CONFIG, TICKET_SALE_CONFIG } from '@/config'

// ❌ 錯誤：直接引入單一配置檔案
import { CONFIG } from '@/config/app'
```

#### 2. 配置驅動的條件渲染
```tsx
export const TicketSection = () => {
  const { t } = useI18n()
  
  return (
    <section>
      {/* 基於配置的條件顯示 */}
      {TICKET_SALE_CONFIG.isTicketSaleActive ? (
        <div>
          {/* 售票中的內容 */}
          {TICKET_SALE_CONFIG.promoCode?.isVisible && (
            <div className="promo-code">
              優惠碼：{TICKET_SALE_CONFIG.promoCode.code}
            </div>
          )}
        </div>
      ) : (
        <div>售票尚未開始</div>
      )}
    </section>
  )
}
```

#### 3. 功能開關控制
```typescript
// 票券狀態檢查
const canPurchaseEarlyBird = isEarlyBirdAvailable()
const canPurchaseRegular = isRegularTicketAvailable()

// 根據狀態調整 UI
const ticketButtonStyle = canPurchaseEarlyBird
  ? "bg-gradient-to-r from-blue-600 to-purple-600"
  : "bg-gray-500 cursor-not-allowed"
```

---

## 🔗 模組間依賴關係

### 📊 依賴層級圖
```
┌─────────────────┐
│   app/ (頁面)   │
└─────────┬───────┘
          │
┌─────────▽───────┐
│  components/    │
│    (元件)       │
└─────────┬───────┘
          │
┌─────────▽───────┐
│   config/       │
│   lib/          │
│   hooks/        │
└─────────┬───────┘
          │
┌─────────▽───────┐
│   locales/      │
│   (語言資源)    │
└─────────────────┘
```

### 🔄 資料流向
1. **配置層** → **邏輯層** → **展示層**
2. **locales/** → **hooks/useI18n** → **components/**
3. **config/** → **lib/** → **components/**

---

## 🛡️ 類型安全架構

### 📝 TypeScript 配置
```json
// tsconfig.json 關鍵設定
{
  "compilerOptions": {
    "strict": true,                    // 嚴格模式
    "noUnusedLocals": true,           // 檢查未使用變數
    "noUnusedParameters": true,       // 檢查未使用參數
    "exactOptionalPropertyTypes": true // 精確可選屬性
  }
}
```

### 🏷️ 核心類型定義
```typescript
// lib/types.ts
export interface Speaker {
  id: string
  name: { 'zh-tw': string; 'en': string }
  title: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
  avatar: string
  social?: {
    website?: string
    linkedin?: string
    twitter?: string
  }
}

export interface AgendaItem {
  time: string
  title: { 'zh-tw': string; 'en': string }
  speaker?: string
  type: 'keynote' | 'session' | 'break' | 'panel'
}

export type Language = 'zh-tw' | 'en'
export type LocalizedContent<T = string> = Record<Language, T>
```

---

## 🔄 狀態管理策略

### 🎯 Context 提供者架構
```typescript
// contexts/i18n-context.tsx
export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('zh-tw')
  
  const value = {
    language,
    changeLanguage: setLanguage,
    t: (key: string) => translateKey(key, language)
  }
  
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}
```

### 🪝 自定義 Hooks
```typescript
// hooks/use-i18n.ts
export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

// hooks/use-conference-data.ts
export const useConferenceData = () => {
  return {
    config: CONFIG,
    ticketConfig: TICKET_SALE_CONFIG,
    isEarlyBirdAvailable: isEarlyBirdAvailable(),
    isRegularTicketAvailable: isRegularTicketAvailable()
  }
}
```

---

## 📈 擴展性考量

### 🔮 未來功能預留
1. **多會議支援**：透過 `CONFIG.conference.year` 擴展
2. **更多語言**：在 `locales/` 新增語言檔案
3. **複雜售票邏輯**：擴展 `TicketSaleConfig` 介面
4. **主題系統**：預留 `ThemeProvider` 架構

### 🔧 維護友善設計
- **配置集中化**：所有設定統一管理
- **類型安全**：編譯期錯誤檢測
- **文檔完整**：每個模組都有說明
- **測試覆蓋**：關鍵邏輯有測試保護

---

## 🎯 核心功能架構

### 📱 講者導航系統

DDD Taiwan 2025 實作了智慧講者導航系統，支援多種進入方式和上下文感知的導航邏輯。

#### 系統架構設計

```
講者導航系統
├── 講者資料結構
│   ├── 唯一 ID 系統 (kebab-case)
│   ├── 多語言支援
│   └── 結構化資料
├── 首頁精選卡片
│   ├── 卡片點擊導航
│   ├── 購票按鈕隔離
│   └── 動態主題系統
├── 講者頁面 Lightbox
│   ├── URL 參數監聽
│   ├── 自動開啟機制
│   └── 智慧關閉邏輯
└── 導航上下文管理
    ├── 進入方式追蹤
    ├── 關閉行為決策
    └── 分享連結支援
```

### 🎭 議程分段系統架構

**核心功能**: 將單一議程時段拆分為詳細的講者分段展示，每段包含時間、講者、描述和關鍵字。

#### 標準時間結構
- **30分鐘**: Knowledge 段落（概念介紹）
- **10分鐘**: 休息時間
- **90分鐘**: Workshop 段落（實作工作坊）
- **20分鐘**: 休息時間  
- **30分鐘**: Practice 段落（實務分享）

#### 資料結構設計
```typescript
interface Session {
  time: string                      // 總體時間範圍
  title: LocalizedContent           // 議程標題
  speaker: string                   // 講者摘要
  segments: Segment[]               // 詳細分段
}

interface Segment {
  duration: number                  // 段落時長（分鐘）
  title: LocalizedContent           // 段落標題
  description: LocalizedContent     // 段落描述
  speakerIds: string[]             // 講者 ID 列表
  keywords: LocalizedContent<string[]> // 關鍵字標籤
  type: 'knowledge' | 'workshop' | 'practice' | 'break' // 段落類型
}
```

#### UI 設計特色
- **類型色彩系統**: knowledge=藍、workshop=綠、practice=紫、break=橙
- **動態時間計算**: 基於 duration 自動計算段落時間範圍
- **響應式關鍵字排版**: 桌面同行顯示，手機自動換行
- **講者頭像群組**: 支援多講者協作段落展示
- **段落類型圖標**: 每種類型配有專屬圖標和漸層背景

#### 講者 ID 系統設計

**設計原則：**
- **格式**：kebab-case（如 `michael-chen`, `sunny-cheng`）
- **唯一性**：每位講者都有獨特的 ID
- **相容性**：符合 URL 參數使用規範
- **SEO 友善**：使用語義化的 URL 結構

```typescript
// lib/data/types.ts
export interface Speaker {
  id: string // 講者唯一識別碼
  name: { 'zh-tw': string; 'en': string }
  title: { 'zh-tw': string; 'en': string }
  company: { 'zh-tw': string; 'en': string }
  // ...其他欄位
}

// lib/data/speakers.ts 範例
{
  id: "michael-chen",
  name: { 'zh-tw': "陳勉修(Michael)", 'en': "Michael" },
  title: { 'zh-tw': "產品處副總經理", 'en': "Deputy General Manager" },
  // ...
}
```

#### URL 參數設計

**設計目標：**
- 支援直接分享講者連結
- 實現自動 Lightbox 開啟
- 保持 SEO 友善的 URL 結構

```
格式：/speakers?id=speaker-id
範例：
- Michael: /speakers?id=michael-chen
- Sunny Cheng: /speakers?id=sunny-cheng
- Fong: /speakers?id=fong-liu
```

#### 智慧導航邏輯

系統根據用戶的進入方式，提供不同的關閉行為：

```tsx
// app/speakers/page.tsx
const [isFromHomepage, setIsFromHomepage] = useState(false)

// URL 參數監聽：從首頁進入時標記
useEffect(() => {
  const speakerId = searchParams.get('id')
  if (speakerId) {
    const targetSpeaker = allSpeakers.find(speaker => speaker.id === speakerId)
    if (targetSpeaker) {
      openLightbox(targetSpeaker, true) // 標記為從首頁進入
    }
  }
}, [searchParams])

// 智慧關閉邏輯
const closeLightbox = () => {
  if (isFromHomepage) {
    router.push('/') // 從首頁進入，返回首頁
  }
  // 否則停留在當前頁面
  setIsFromHomepage(false)
}
```

**行為模式：**

1. **從首頁進入**：
   - 點擊精選講師卡片 → 跳轉到講者頁面 → 自動開啟 Lightbox
   - 關閉 Lightbox → 返回首頁

2. **直接訪問講者頁面**：
   - 從選單進入講者頁面 → 點擊講者卡片 → 開啟 Lightbox
   - 關閉 Lightbox → 停留在講者頁面

3. **分享連結**：
   - 直接訪問 `/speakers?id=speaker-id` → 自動開啟對應 Lightbox
   - 支援社群媒體分享

---

**下一章：** [第3章：國際化系統](./03-i18n-system.md) - 深入了解多語言實作架構
