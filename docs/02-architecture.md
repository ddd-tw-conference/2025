# 第2章：架構設計

> **本章內容**：系統架構設計、配置管理策略、目錄結構規劃

---

## 🏛️ 系統架構概覽

### 📐 整體架構圖
```
DDD Taiwan 2025 Conference Website
├── 前端應用 (Next.js 15.5.2)
│   ├── App Router 路由系統
│   ├── React 19 元件架構
│   └── Tailwind CSS 樣式系統
├── 配置管理層
│   ├── 統一配置檔案
│   ├── 環境變數管理
│   └── 功能開關控制
├── 國際化系統
│   ├── 語言資源管理
│   ├── 動態語言切換
│   └── 內容本地化
└── 靜態部署
    ├── GitHub Pages 託管
    ├── WebP 圖片優化
    └── SEO 最佳化
```

### 🎯 設計原則
1. **配置驅動**：所有功能狀態透過配置控制
2. **組件化**：高度模組化的 React 元件
3. **類型安全**：TypeScript 嚴格模式
4. **效能優先**：靜態生成 + 圖片優化
5. **多語言**：完整的 i18n 支援

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

**下一章：** [第3章：國際化系統](./03-i18n-system.md) - 深入了解多語言實作架構
