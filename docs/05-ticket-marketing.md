# 第5章：票券行銷系統

> **本章內容**：售票流程設計、行銷功能實作、狀態管理策略

---

## 🎫 系統概覽

### 📋 業務需求分析
當早鳥票售罄後，網站需要將行銷焦點轉移到一般票，透過：
- ✅ **明顯的視覺提示**告知早鳥票售罄
- ✅ **吸引人的行銷文案**推廣一般票
- ✅ **清晰的視覺層級**引導購票流程
- ✅ **預留優惠碼機制**供行銷部門使用

### 🏗️ 解決方案架構
```
票券行銷系統
├── 配置驅動設計
│   ├── 售票狀態控制
│   ├── 早鳥票售罄標記
│   └── 優惠碼機制
├── 視覺層級優化
│   ├── 一般票（左側主要）
│   ├── 早鳥票（右側次要）
│   └── 動態樣式切換
└── 行銷內容管理
    ├── 多語言支援
    ├── 動態文案切換
    └── 促銷資訊展示
```

---

## ⚙️ 配置管理

### 🎛️ 核心配置檔案

#### config/tickets.ts
```typescript
export interface TicketSaleConfig {
  isTicketSaleActive: boolean        // 售票總開關
  isEarlyBirdSoldOut?: boolean      // 早鳥票售罄標記
  purchaseUrl: string               // Accupass 購票連結
  promoCode?: {                     // 優惠碼機制
    isVisible: boolean              // 顯示開關
    code?: string                   // 優惠碼內容
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
```

#### 狀態檢查函式
```typescript
// 早鳥票可購買檢查
export const isEarlyBirdAvailable = (): boolean => {
  return TICKET_SALE_CONFIG.isTicketSaleActive && 
         !TICKET_SALE_CONFIG.isEarlyBirdSoldOut
}

// 一般票可購買檢查
export const isRegularTicketAvailable = (): boolean => {
  return TICKET_SALE_CONFIG.isTicketSaleActive
}

// 購票連結取得
export const getTicketPurchaseUrl = (): string => {
  return TICKET_SALE_CONFIG.purchaseUrl
}
```

---

## 🎨 視覺設計系統

### 🎭 視覺層級策略

#### 一般票（主要推廣）
```tsx
// 醒目的漸層背景 + 光效
const regularTicketStyle = `
  bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60
  border border-blue-400/30
  hover:border-blue-300/50
  transform hover:scale-[1.02]
  transition-all duration-300
  relative overflow-hidden
  before:absolute before:inset-0 
  before:bg-gradient-to-r before:from-transparent 
  before:via-white/5 before:to-transparent
  before:translate-x-[-100%] hover:before:translate-x-[100%]
  before:transition-transform before:duration-1000
`

// 主要購票按鈕
const primaryButton = `
  bg-gradient-to-r from-blue-600 to-purple-600 
  hover:from-blue-700 hover:to-purple-700
  text-white font-semibold
  shadow-lg hover:shadow-xl
  transform hover:scale-105
`
```

#### 早鳥票（售罄狀態）
```tsx
// 低調的灰色系 + 售罄標示
const earlyBirdSoldOutStyle = `
  bg-slate-800/30
  border border-slate-600/20
  opacity-60
  relative
`

// 停用按鈕
const disabledButton = `
  bg-gray-500 
  text-gray-300 
  cursor-not-allowed
  border border-gray-600
`

// 售罄徽章
const soldOutBadge = `
  absolute -top-2 -right-2
  bg-red-500 text-white
  px-3 py-1 rounded-full
  text-sm font-bold
  transform rotate-12
  shadow-lg
`
```

### 📱 響應式布局
```tsx
// 票券容器布局
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  {/* 一般票 - 左側主要位置 */}
  <div className={`order-1 ${regularTicketStyle}`}>
    {/* 一般票內容 */}
  </div>
  
  {/* 早鳥票 - 右側次要位置 */}
  <div className={`order-2 ${earlyBirdSoldOutStyle}`}>
    {/* 早鳥票內容 */}
  </div>
</div>
```

---

## 🧩 核心元件架構

### 🎪 TicketMarketingSection 元件

#### 元件職責
- 顯示早鳥票售罄資訊
- 推廣一般票購買
- 管理優惠碼顯示
- 提供多語言支援

#### 實作程式碼
```tsx
'use client'

import { useI18n } from '@/hooks/use-i18n'
import { TICKET_SALE_CONFIG, isEarlyBirdAvailable } from '@/config'

export const TicketMarketingSection = () => {
  const { t } = useI18n()
  
  // 只在早鳥票售罄時顯示
  if (isEarlyBirdAvailable()) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">
            {t('tickets.earlyBirdSoldOut')}
          </h3>
          <p className="text-orange-700 mb-4">
            {t('tickets.regularPromo')}
          </p>
          
          {/* 優惠碼顯示 */}
          {TICKET_SALE_CONFIG.promoCode?.isVisible && TICKET_SALE_CONFIG.promoCode.code && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mt-4">
              <p className="text-yellow-800 text-sm font-medium">
                {t('tickets.promoCodeHint')}: 
                <code className="ml-2 bg-yellow-200 px-2 py-1 rounded text-yellow-900 font-mono">
                  {TICKET_SALE_CONFIG.promoCode.code}
                </code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

### 🎟️ 主要票券區塊元件

#### TicketCard 元件
```tsx
interface TicketCardProps {
  type: 'earlybird' | 'regular'
  title: string
  price: string
  description: string
  features: string[]
  isAvailable: boolean
  isPrimary?: boolean
}

export const TicketCard = ({ 
  type, 
  title, 
  price, 
  description, 
  features, 
  isAvailable, 
  isPrimary = false 
}: TicketCardProps) => {
  const { t } = useI18n()
  
  // 動態樣式
  const cardStyle = isPrimary && isAvailable
    ? "bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60 border-blue-400/30"
    : isAvailable
    ? "bg-slate-800/40 border-slate-600/30"
    : "bg-slate-800/30 border-slate-600/20 opacity-60"
  
  const buttonStyle = isAvailable
    ? isPrimary
      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      : "bg-white/10 hover:bg-white/20"
    : "bg-gray-500 cursor-not-allowed"
  
  const handlePurchase = () => {
    if (isAvailable) {
      window.open(getTicketPurchaseUrl(), '_blank')
    }
  }
  
  return (
    <div className={`relative rounded-xl border p-8 transition-all duration-300 ${cardStyle}`}>
      {/* 售罄徽章 */}
      {!isAvailable && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
          {t('tickets.soldOut')}
        </div>
      )}
      
      {/* 推薦徽章 */}
      {isPrimary && isAvailable && (
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {t('tickets.recommended')}
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="text-3xl font-bold text-blue-400 mb-2">{price}</div>
        <p className="text-gray-300">{description}</p>
      </div>
      
      {/* 功能列表 */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      {/* 購票按鈕 */}
      <button
        onClick={handlePurchase}
        disabled={!isAvailable}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${buttonStyle}`}
      >
        {isAvailable ? t('tickets.purchaseNow') : t('tickets.soldOut')}
      </button>
    </div>
  )
}
```

---

## 🌍 多語言內容管理

### 📝 語言資源檔案

#### locales/zh-tw.json (票券相關)
```json
{
  "tickets": {
    "pageTitle": "購票資訊",
    "earlyBirdTitle": "早鳥票",
    "regularTitle": "一般票",
    "earlyBirdSoldOut": "🔥 早鳥票已售完！",
    "regularPromo": "一般票現正熱賣中，把握最後機會參加 DDDTW 2025！",
    "hotSelling": "🎯 熱賣中",
    "recommended": "⭐ 推薦",
    "soldOut": "已售完",
    "purchaseNow": "立即購票",
    "promoCodeHint": "限時優惠碼",
    "features": {
      "access": "完整會議入場權",
      "materials": "會議資料包",
      "networking": "茶歇交流時間",
      "certificate": "參與證書"
    }
  }
}
```

#### locales/en.json (票券相關)
```json
{
  "tickets": {
    "pageTitle": "Ticket Information",
    "earlyBirdTitle": "Early Bird",
    "regularTitle": "Regular Ticket",
    "earlyBirdSoldOut": "🔥 Early Bird Tickets Sold Out!",
    "regularPromo": "Regular tickets are now on sale! Don't miss your chance to join DDDTW 2025!",
    "hotSelling": "🎯 Hot Selling",
    "recommended": "⭐ Recommended",
    "soldOut": "Sold Out",
    "purchaseNow": "Purchase Now",
    "promoCodeHint": "Limited Time Promo Code",
    "features": {
      "access": "Full Conference Access",
      "materials": "Conference Materials",
      "networking": "Networking Breaks",
      "certificate": "Participation Certificate"
    }
  }
}
```

---

## 🔄 狀態管理與邏輯

### 🎯 票券狀態控制邏輯

#### 售票狀態決策樹
```typescript
// 票券顯示邏輯
export const getTicketDisplayState = () => {
  const config = TICKET_SALE_CONFIG
  
  return {
    showTicketSection: config.isTicketSaleActive,
    showMarketingSection: config.isTicketSaleActive && config.isEarlyBirdSoldOut,
    showPromoCode: config.promoCode?.isVisible ?? false,
    earlyBirdAvailable: isEarlyBirdAvailable(),
    regularAvailable: isRegularTicketAvailable()
  }
}
```

#### 動態樣式生成
```typescript
// 樣式狀態管理
export const getTicketStyles = (ticketType: 'earlybird' | 'regular') => {
  const state = getTicketDisplayState()
  
  if (ticketType === 'regular' && state.regularAvailable) {
    return {
      container: "bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60",
      button: "bg-gradient-to-r from-blue-600 to-purple-600",
      badge: "recommended",
      priority: "primary"
    }
  }
  
  if (ticketType === 'earlybird' && !state.earlyBirdAvailable) {
    return {
      container: "bg-slate-800/30 opacity-60",
      button: "bg-gray-500 cursor-not-allowed",
      badge: "soldOut",
      priority: "secondary"
    }
  }
  
  // 預設狀態
  return {
    container: "bg-slate-800/40",
    button: "bg-white/10",
    badge: null,
    priority: "normal"
  }
}
```

---

## 📊 實作完整範例

### 🎪 完整的票券頁面實作
```tsx
// app/tickets/page.tsx
'use client'

import { useI18n } from '@/hooks/use-i18n'
import { TicketMarketingSection } from '@/components/ticket-marketing-section'
import { TicketCard } from '@/components/ticket-card'
import { getTicketDisplayState } from '@/lib/ticket-utils'

export default function TicketsPage() {
  const { t } = useI18n()
  const ticketState = getTicketDisplayState()
  
  if (!ticketState.showTicketSection) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl text-gray-600">{t('tickets.notAvailable')}</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        {t('tickets.pageTitle')}
      </h1>
      
      {/* 行銷區塊 */}
      <TicketMarketingSection />
      
      {/* 票券選擇區 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* 一般票 - 主要推廣 */}
        <TicketCard
          type="regular"
          title={t('tickets.regularTitle')}
          price="NT$ 1,800"
          description={t('tickets.regularDescription')}
          features={[
            t('tickets.features.access'),
            t('tickets.features.materials'),
            t('tickets.features.networking'),
            t('tickets.features.certificate')
          ]}
          isAvailable={ticketState.regularAvailable}
          isPrimary={true}
        />
        
        {/* 早鳥票 - 售罄狀態 */}
        <TicketCard
          type="earlybird"
          title={t('tickets.earlyBirdTitle')}
          price="NT$ 1,200"
          description={t('tickets.earlyBirdDescription')}
          features={[
            t('tickets.features.access'),
            t('tickets.features.materials'),
            t('tickets.features.networking'),
            t('tickets.features.certificate')
          ]}
          isAvailable={ticketState.earlyBirdAvailable}
          isPrimary={false}
        />
      </div>
    </div>
  )
}
```

---

## 🚀 維護與更新指南

### 📋 優惠碼功能管理

#### 🔄 啟動/停用優惠碼
```typescript
// config/tickets.ts - 調整優惠碼顯示
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  // 其他配置...
  promoCode: {
    isVisible: true,  // 設為 true 啟動優惠碼顯示
    code: "DDDTW2025" // 實際優惠碼內容
  }
}
```

#### 📋 Clipboard API 兼容性實現

**問題背景**：
Clipboard API 在某些環境下會被瀏覽器安全策略阻擋，特別是：
- 非 HTTPS 環境
- 開發環境的安全限制
- 某些瀏覽器的權限政策

**解決方案：三層 Fallback 策略**

```typescript
// 優惠碼複製功能 - 完整實現
import { useState, useEffect } from 'react'

export const PromoCodeCopy = ({ code }: { code: string }) => {
  const { t } = useI18n()
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'manual'>('idle')

  // 複製優惠碼到剪貼簿 - 支援多種方法確保兼容性
  const copyPromoCode = async () => {
    try {
      // 方法 1: 現代 Clipboard API (首選)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code)
        setCopyState('success')
        return
      }
      
      // 方法 2: 傳統 execCommand 方法 (fallback)
      const textArea = document.createElement('textarea')
      textArea.value = code
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      
      if (successful) {
        setCopyState('success')
      } else {
        throw new Error('execCommand failed')
      }
      
    } catch (err) {
      console.error('Failed to copy promo code:', err)
      // 方法 3: 手動複製提示 (最後手段)
      setCopyState('manual')
    }
  }

  // 自動重置狀態
  useEffect(() => {
    if (copyState !== 'idle') {
      const timeout = copyState === 'manual' ? 4000 : 2000
      const timer = setTimeout(() => setCopyState('idle'), timeout)
      return () => clearTimeout(timer)
    }
  }, [copyState])

  return (
    <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
      <p className="text-yellow-200 text-sm mb-2">
        {t('tickets.promoCodeHint')}
      </p>
      <div 
        onClick={copyPromoCode}
        className="inline-flex items-center gap-3 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-100 px-4 py-2 rounded font-mono text-sm cursor-pointer transition-all duration-200 hover:scale-105 group"
        title={t('tickets.promoCodeClick')}
      >
        <code className="select-none">{code}</code>
        {copyState === 'success' ? (
          <svg 
            className="w-4 h-4 text-green-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg 
            className="w-4 h-4 text-yellow-300 group-hover:text-yellow-100 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      
      {/* 狀態反饋 */}
      {copyState !== 'idle' && (
        <div className="mt-2 animate-fade-in">
          {copyState === 'success' ? (
            <p className="text-green-400 text-xs">
              {t('tickets.promoCodeCopied')}
            </p>
          ) : copyState === 'manual' ? (
            <div className="text-yellow-300 text-xs">
              <p className="font-semibold mb-1">{t('tickets.promoCodeManual')}</p>
              <p className="font-mono bg-yellow-400/20 px-2 py-1 rounded inline-block select-all">
                {code}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
```

#### 🎨 視覺反饋設計模式

**成功狀態** (綠色主題):
```css
.copy-success {
  color: #10b981; /* text-green-400 */
  /* 顯示打勾圖示 */
}
```

**手動複製狀態** (黃色主題):
```css
.copy-manual {
  color: #fcd34d; /* text-yellow-300 */
  background: rgba(251, 191, 36, 0.2); /* bg-yellow-400/20 */
  /* 顯示可選取的優惠碼區塊 */
}
```

**互動效果**:
```css
.copy-button {
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  transform: scale(1.05);
  background: rgba(251, 191, 36, 0.3); /* hover:bg-yellow-400/30 */
}
```

#### 🌍 多語言支援擴展

新增複製功能相關文字：

**locales/zh-tw.json**:
```json
{
  "tickets": {
    "promoCodeClick": "點擊複製優惠碼",
    "promoCodeCopied": "優惠碼已複製！",
    "promoCodeManual": "請手動複製優惠碼："
  }
}
```

**locales/en.json**:
```json
{
  "tickets": {
    "promoCodeClick": "Click to copy promo code",
    "promoCodeCopied": "Promo code copied!",
    "promoCodeManual": "Please manually copy the promo code:"
  }
}
```

### 📋 常見維護任務

#### 1. 啟用/停用售票
```typescript
// config/tickets.ts
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: true,  // 改為 false 停用售票
  // ...其他設定
}
```

#### 2. 標記早鳥票售罄
```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isEarlyBirdSoldOut: true,  // 設為 true 標記售罄
  // ...其他設定
}
```

#### 3. 啟用優惠碼
```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  promoCode: {
    isVisible: true,          // 顯示優惠碼
    code: "DDDTW2025"        // 優惠碼內容
  }
  // ...其他設定
}
```

#### 4. 更新購票連結
```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  purchaseUrl: "https://www.accupass.com/eflow/ticket/新的票券ID",
  // ...其他設定
}
```

### 🔧 測試檢查清單
- [ ] 票券狀態切換正確顯示
- [ ] 多語言文案正確翻譯
- [ ] 購票連結可正常開啟
- [ ] 響應式布局在不同裝置正常
- [ ] 優惠碼顯示/隱藏機制正常

---

**下一章：** [第6章：效能優化](./06-performance.md) - 深入了解圖片優化與載入效能策略
