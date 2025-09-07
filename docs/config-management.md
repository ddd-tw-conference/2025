# 配置管理架構文檔

## 📁 統一配置管理

DDD Taiwan 2025 採用集中式配置管理，所有配置文件統一放置在 `config/` 目錄中。

---

## 🏗️ 目錄結構

```
config/
├── index.ts          # 統一匯出入口
├── app.ts            # 應用主配置
├── tickets.ts        # 票務配置
├── performance.ts    # 效能配置
├── constants.ts      # 應用常數
└── agenda.ts         # 議程時段配置
```

---

## 📋 各配置文件說明

### `config/app.ts` - 應用主配置
負責應用核心設定和部署資訊：

```typescript
export const CONFIG = {
  // 部署配置
  deployment: {
    basePath: '/2025',
    domain: 'ddd-tw-conference.github.io',
    baseUrl: 'https://ddd-tw-conference.github.io/2025'
  },
  
  // 會議基本資訊
  conference: {
    year: 2025,
    name: 'DDDTW 2025',
    fullName: 'DDDTW 2025 - AI時代軟體開發方法',
    theme: 'AI時代軟體開發方法'
  }
}
```

### `config/tickets.ts` - 票務配置
管理售票相關設定和業務邏輯：

```typescript
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,
  earlyBirdSaleStartDate: "2025-09-03",
  regularSaleStartDate: "2025-10-16", 
  saleEndDate: "2025-11-07",
  purchaseUrl: "https://www.accupass.com/eflow/ticket/..."
}

export const getTicketPurchaseUrl = (): string => 
  TICKET_SALE_CONFIG.purchaseUrl
```

### `config/performance.ts` - 效能配置
定義效能優化相關設定：

```typescript
export const PERFORMANCE_CONFIG = {
  // 圖片優化設定
  images: {
    unoptimized: true,
    localPatterns: [
      { pathname: '/images/**', search: '' },
      { pathname: '/images/**', search: '?v=*' }
    ]
  },
  
  // Web Vitals 監控
  webVitals: {
    enabled: true,
    reportToConsole: process.env.NODE_ENV === 'development'
  }
}
```

### `config/constants.ts` - 應用常數
集中管理應用中使用的常數：

```typescript
export const UI_CONSTANTS = {
  // 響應式斷點
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  },
  
  // 動畫時長
  animations: {
    fast: 150,
    medium: 300,
    slow: 500
  }
}

export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  maxContentLength: 500
}
```

### `config/agenda.ts` - 議程時段配置
管理議程時段模式和時間計算：

```typescript
export const AGENDA_TIME_CONFIG = {
  breakAfterScience: 10,    // 基礎知識後休息時間
  breakAfterWorkshop: 20,   // 工作坊後休息時間
  scienceDuration: 30,      // 基礎知識時長
  workshopDuration: 90,     // 工作坊時長
  practiceDuration: 30      // 實務分享時長
}

export const SESSION_PATTERNS = [
  {
    key: "science",
    label: { 'zh-tw': "基礎知識", 'en': "Foundation Knowledge" },
    icon: "Sparkles",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  }
  // ... 其他時段
]
```

---

## 🔄 使用方式

### 統一匯入
```typescript
// 推薦：使用統一匯入
import { CONFIG, TICKET_SALE_CONFIG } from '@/config'

// 或單獨匯入特定配置
import { AGENDA_TIME_CONFIG } from '@/config/agenda'
```

### 配置存取
```typescript
// 取得應用配置
const appName = CONFIG.conference.name
const baseUrl = CONFIG.deployment.baseUrl

// 取得票務狀態
const isTicketActive = TICKET_SALE_CONFIG.isTicketSaleActive
const purchaseUrl = getTicketPurchaseUrl()
```

---

## ✅ 設計原則

### 1. **集中管理**
- 所有配置統一放在 `config/` 目錄
- 避免魔法字串散布在程式碼中
- 便於維護和修改

### 2. **類型安全**
- 完整的 TypeScript 介面定義
- 編譯時期檢查配置有效性
- 智慧感知和自動完成

### 3. **分層架構**
- 按功能領域分割配置文件
- 每個文件負責特定範圍的配置
- 減少單一文件過於龐大

### 4. **統一出入口**
- `config/index.ts` 提供統一匯出
- 簡化引用路徑
- 便於重構和重新組織

---

## 🚀 配置修改流程

### 1. **一般配置修改**
```bash
# 1. 編輯對應的配置文件
vim config/tickets.ts

# 2. 執行型別檢查
pnpm type-check

# 3. 測試構建
pnpm build
```

### 2. **新增配置項目**
```typescript
// 1. 在對應文件中新增配置
export const NEW_FEATURE_CONFIG = {
  enabled: true,
  settings: { /* ... */ }
}

// 2. 更新 index.ts 匯出
export { NEW_FEATURE_CONFIG } from './new-feature'

// 3. 更新型別定義 (如需要)
interface NewFeatureConfig {
  enabled: boolean
  settings: Record<string, any>
}
```

---

## 🔧 故障排除

### 配置文件找不到
```typescript
// ❌ 錯誤：直接引用深層路徑
import { CONFIG } from '../../../config/app'

// ✅ 正確：使用統一入口
import { CONFIG } from '@/config'
```

### 類型錯誤
```typescript
// 檢查 TypeScript 錯誤
pnpm type-check

// 確保配置介面正確定義
interface TicketSaleConfig {
  isTicketSaleActive: boolean
  purchaseUrl: string
}
```

### 環境變數整合
```typescript
// 在配置中整合環境變數
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.default.com',
  timeout: parseInt(process.env.API_TIMEOUT || '5000')
}
```

---

## 📊 效益評估

### 維護性提升
- ✅ 配置集中管理，修改更方便
- ✅ 類型安全，減少運行時錯誤
- ✅ 結構清晰，新人容易理解

### 開發效率
- ✅ 統一引用路徑，減少重複代碼
- ✅ 智慧感知支援，提升開發體驗
- ✅ 模組化設計，支援並行開發

### 程式碼品質
- ✅ 消除魔法字串和硬編碼
- ✅ 配置與邏輯分離，職責清晰
- ✅ 便於單元測試和 CI/CD 整合

---

*建立日期：2025年9月7日 | 狀態：✅ 已實作並投入使用*
