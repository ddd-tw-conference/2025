# 第4章：UI/UX 設計系統

> **本章內容**：Tailwind CSS 實用指南、UI 元件設計標準、Smart Navigation

---

## 🎨 設計系統核心

### 色彩系統
```css
/* 主要色彩 */
--primary: #2563eb → #9333ea  /* 藍紫漸層 */
--secondary: rgba(255,255,255,0.1)  /* 半透明白色 */
--success: #10b981
--warning: #f59e0b
--error: #ef4444
```

### 按鈕設計標準
```tsx
// 主要按鈕
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 
                   text-white font-semibold 
                   hover:from-blue-700 hover:to-purple-700
                   transition-all duration-200">
  立即購票
</Button>

// 次要按鈕
<Button className="bg-white/10 text-white border border-white/20
                   hover:bg-white/20 
                   transition-all duration-200">
  了解更多
</Button>

// 複製操作按鈕
<Button className="bg-yellow-500/40 text-yellow-50 
                   border border-yellow-400/50
                   hover:bg-yellow-500/60">
  複製優惠碼
</Button>
```
// 主要漸層背景
const primaryGradient = "bg-gradient-to-r from-blue-600 to-purple-600"
const primaryGradientHover = "hover:from-blue-700 hover:to-purple-700"

// 卡片背景漸層
const cardGradient = "bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60"

// 文字漸層
const textGradient = "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
```

#### 透明度階層應用
```tsx
// 玻璃擬態效果
const glassEffect = "bg-white/10 backdrop-blur-sm border border-white/20"

// 懸浮效果
const hoverGlass = "hover:bg-white/20 hover:border-white/30"

// 低調背景
const subtleBackground = "bg-slate-800/30"
```

---

## 🔤 字型系統

### 📝 字型階層

#### 標題系統
```tsx
// 主標題（頁面標題）
const h1Style = "text-4xl md:text-5xl font-bold"

// 次標題（區塊標題）
const h2Style = "text-2xl md:text-3xl font-bold"

// 小標題（卡片標題）
### 互動效果標準
```tsx
// 基本互動
const interactive = "cursor-pointer hover:scale-105 transition-all duration-200"

// 卡片懸浮效果
const cardHover = "hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1"

// 按鈕點擊效果
const buttonClick = "active:scale-95 transition-transform duration-100"
```

### 響應式設計原則
```tsx
// 手機優先設計
<div className="p-4 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    {t('page.title')}
  </h1>
</div>

// 網格系統
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

## 🧭 Smart Navigation & Context Tracking

### Context Tracking 設計原理
根據使用者來源提供智慧化導航體驗：

```tsx
// Smart Navigation Hook
export const useSmartNavigation = () => {
  const [isFromHomepage, setIsFromHomepage] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const from = searchParams.get('from')
    setIsFromHomepage(from === 'homepage')
  }, [searchParams])

  const navigateWithContext = (path: string, context?: string) => {
    const params = new URLSearchParams()
    if (context) params.set('from', context)
    router.push(`${path}?${params.toString()}`)
  }

  return { isFromHomepage, navigateWithContext }
}
```

### 實際應用範例
```tsx
// Lightbox 關閉行為
const handleCloseLightbox = () => {
  if (isFromHomepage) {
    router.push('/?from=speakers')  // 回到首頁並定位到講者區塊
  } else {
    router.push('/speakers')       // 回到講者頁面
  }
}

// 導航連結
<Link href="/speakers?from=homepage">
  查看所有講者
</Link>
```

---

**下一章：[第5章 票券行銷系統](./05-ticket-marketing.md)**

#### 次要按鈕（Secondary）
```tsx
export const SecondaryButton = ({ children, className = '', ...props }) => {
  const baseStyles = `
    bg-white/10 border border-white/30
    hover:bg-white/20 hover:border-white/50
    text-white font-medium
    px-6 py-3 rounded-lg
    backdrop-blur-sm
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-white/25
  `
  
  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}
```

#### 停用按鈕（Disabled）
```tsx
export const DisabledButton = ({ children, className = '', ...props }) => {
  const baseStyles = `
    bg-gray-500 text-gray-300
    cursor-not-allowed
    px-6 py-3 rounded-lg
    border border-gray-600
    opacity-60
  `
  
  return (
    <button 
      disabled 
      className={`${baseStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
}
```

### 🎭 按鈕狀態管理

#### 動態按鈕元件
```tsx
interface DynamicButtonProps {
  variant: 'primary' | 'secondary' | 'disabled'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const DynamicButton = ({ 
  variant, 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: DynamicButtonProps) => {
  
  // 基礎樣式
  const baseStyles = "font-medium rounded-lg transition-all duration-200 focus:outline-none"
  
  // 尺寸樣式
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  // 變體樣式
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 
      hover:from-blue-700 hover:to-purple-700
      text-white shadow-lg hover:shadow-xl
      transform hover:scale-105
      focus:ring-4 focus:ring-blue-500/50
    `,
    secondary: `
      bg-white/10 border border-white/30
      hover:bg-white/20 hover:border-white/50
      text-white backdrop-blur-sm
      focus:ring-4 focus:ring-white/25
    `,
    disabled: `
      bg-gray-500 text-gray-300
      cursor-not-allowed border border-gray-600
      opacity-60
    `
  }
  
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`
  
  return (
    <button 
      className={combinedStyles}
      disabled={variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## 🃏 卡片設計系統

### 📄 基礎卡片元件

#### 標準卡片
```tsx
interface CardProps {
  variant?: 'default' | 'highlight' | 'muted'
  children: React.ReactNode
  className?: string
}

export const Card = ({ variant = 'default', children, className = '' }: CardProps) => {
  const variantStyles = {
    default: `
      bg-slate-800/40 border border-slate-600/30
      hover:border-slate-500/50
    `,
    highlight: `
      bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60
      border border-blue-400/30
      hover:border-blue-300/50
    `,
    muted: `
      bg-slate-800/30 border border-slate-600/20
      opacity-60
    `
  }
  
  const baseStyles = `
    rounded-xl p-6
    transition-all duration-300
    backdrop-blur-sm
  `
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  )
}
```

#### 講者卡片範例
```tsx
export const SpeakerCard = ({ speaker, isPrimary = false }) => {
  const { t, language } = useI18n()
  
  return (
    <Card variant={isPrimary ? 'highlight' : 'default'} className="text-center">
      {/* 頭像 */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={getOptimizedImagePath(speaker.avatar)}
          alt={speaker.name[language]}
          className="w-full h-full rounded-full object-cover"
        />
        {isPrimary && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {t('speakers.keynote')}
          </div>
        )}
      </div>
      
      {/* 講者資訊 */}
      <h3 className="text-xl font-bold text-white mb-2">
        {speaker.name[language]}
      </h3>
      <p className="text-blue-400 font-medium mb-4">
        {speaker.title[language]}
      </p>
      <p className="text-gray-300 text-sm leading-relaxed">
        {speaker.bio[language]}
      </p>
    </Card>
  )
}
```

---

## 🎮 互動效果設計

### ✨ 懸浮效果

#### 通用懸浮效果
```tsx
// 輕微縮放效果
const hoverScale = "transform hover:scale-105 transition-transform duration-200"

// 陰影增強效果
const hoverShadow = "shadow-lg hover:shadow-xl transition-shadow duration-300"

// 亮度增強效果
const hoverBrightness = "hover:brightness-110 transition-all duration-200"

// 組合懸浮效果
const fullHoverEffect = `
  transform hover:scale-105
  shadow-lg hover:shadow-xl
  hover:brightness-110
  transition-all duration-200
  cursor-pointer
`
```

#### 卡片懸浮效果
```tsx
export const InteractiveCard = ({ children, onClick, className = '' }) => {
  const interactiveStyles = `
    transform hover:scale-[1.02]
    hover:shadow-2xl
    transition-all duration-300
    cursor-pointer
    ${onClick ? 'active:scale-[0.98]' : ''}
  `
  
  return (
    <div 
      className={`${interactiveStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
```

### 🔄 載入與狀態效果

#### 載入動畫
```tsx
export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }
  
  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-blue-500 border-t-transparent`} />
  )
}

export const LoadingButton = ({ children, isLoading, ...props }) => {
  return (
    <button 
      disabled={isLoading}
      className="relative"
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}
```

---

## 📱 響應式設計系統

### 📐 斷點策略

#### Tailwind 斷點使用
```tsx
// 手機優先設計
const responsiveContainer = `
  w-full px-4
  md:max-w-4xl md:mx-auto md:px-8
  lg:max-w-6xl lg:px-12
`

// 響應式網格
const responsiveGrid = `
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
`

// 響應式文字大小
const responsiveText = `
  text-base leading-relaxed
  md:text-lg md:leading-loose
  lg:text-xl lg:leading-loose
`
```

#### 響應式元件範例
```tsx
export const ResponsiveSection = ({ children, title }) => {
  return (
    <section className="py-12 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {title && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {children}
        </div>
      </div>
    </section>
  )
}
```

---

## 🎯 可讀性與可及性

### 🔍 對比度要求

#### 色彩對比檢查
```tsx
// 確保對比度符合 WCAG 標準（4.5:1）
const highContrastText = "text-white"  // 在深色背景上
const mediumContrastText = "text-gray-200"  // 次要文字
const lowContrastText = "text-gray-400"   // 輔助文字

// 錯誤範例（對比度不足）
const poorContrast = "text-gray-500 bg-gray-400"  // ❌ 避免

// 正確範例
const goodContrast = "text-white bg-blue-600"     // ✅ 推薦
```

#### 可及性優化
```tsx
export const AccessibleButton = ({ children, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        bg-blue-600 text-white
        px-6 py-3 rounded-lg
        focus:outline-none 
        focus:ring-4 focus:ring-blue-500/50
        focus:ring-offset-2 focus:ring-offset-slate-900
        transition-all duration-200
      `}
    >
      {children}
    </button>
  )
}
```

### 📝 字型可讀性

#### 行高與間距
```tsx
// 最佳行高比例
const readableText = `
  text-base leading-relaxed    /* line-height: 1.625 */
  md:text-lg md:leading-loose  /* line-height: 2 */
`

// 段落間距
const paragraphSpacing = "space-y-4 md:space-y-6"

// 列表間距
const listSpacing = "space-y-2 md:space-y-3"
```

---

## 🔧 Tailwind 最佳實踐

### 📋 開發規範

#### 1. 避免動態類別拼接
```tsx
// ❌ 錯誤：動態字串拼接
const badExample = `text-${color}-500`

// ✅ 正確：使用 switch/case
const getColorClass = (color: string) => {
  switch (color) {
    case 'blue': return 'text-blue-500'
    case 'purple': return 'text-purple-500'
    case 'green': return 'text-green-500'
    default: return 'text-gray-500'
  }
}
```

#### 2. 元件樣式抽離
```tsx
// ❌ 避免：樣式直接寫在 JSX 中
<button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
  Click me
</button>

// ✅ 推薦：抽離為變數或元件
const primaryButtonStyles = `
  bg-gradient-to-r from-blue-600 to-purple-600 
  hover:from-blue-700 hover:to-purple-700
  text-white font-semibold px-6 py-3 rounded-lg
  shadow-lg hover:shadow-xl
  transform hover:scale-105 transition-all duration-200
`

<button className={primaryButtonStyles}>
  Click me
</button>
```

#### 3. 條件樣式處理
```tsx
// 使用 clsx 或 cn 工具函式
import { cn } from '@/lib/utils'

const Button = ({ variant, isActive, className, ...props }) => {
  return (
    <button
      className={cn(
        // 基礎樣式
        "px-6 py-3 rounded-lg font-semibold transition-all duration-200",
        
        // 變體樣式
        variant === 'primary' && "bg-blue-600 text-white hover:bg-blue-700",
        variant === 'secondary' && "bg-white/10 text-white hover:bg-white/20",
        
        // 狀態樣式
        isActive && "ring-4 ring-blue-500/50",
        
        // 自定義樣式
        className
      )}
      {...props}
    />
  )
}
```

---

## 📊 設計系統維護

### 🎨 複製功能 UI 模式

#### 複製操作設計標準
```tsx
// 複製功能的統一設計語言
export const CopyActionStyles = {
  // 黃色主題色系
  container: "bg-yellow-400/10 border border-yellow-400/30 rounded-lg",
  button: "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-100",
  text: "text-yellow-200",
  
  // 狀態反饋色系
  success: "text-green-400",
  manual: "text-yellow-300",
  error: "text-red-400",
  
  // 互動效果
  interactive: "cursor-pointer transition-all duration-200 hover:scale-105",
  
  // 圖示樣式
  icon: "w-4 h-4 transition-colors",
  iconSuccess: "text-green-400",
  iconDefault: "text-yellow-300 group-hover:text-yellow-100"
}
```

#### 複製按鈕元件
```tsx
interface CopyButtonProps {
  text: string
  variant?: 'default' | 'compact' | 'inline'
  onCopySuccess?: () => void
  onCopyError?: () => void
}

export const CopyButton = ({ 
  text, 
  variant = 'default', 
  onCopySuccess, 
  onCopyError 
}: CopyButtonProps) => {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'manual'>('idle')
  const { t } = useI18n()

  const handleCopy = async () => {
    try {
      // Layer 1: Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        setCopyState('success')
        onCopySuccess?.()
        return
      }
      
      // Layer 2: Legacy execCommand
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      const result = document.execCommand('copy')
      document.body.removeChild(textArea)
      
      if (result) {
        setCopyState('success')
        onCopySuccess?.()
      } else {
        throw new Error('Copy failed')
      }
    } catch (err) {
      setCopyState('manual')
      onCopyError?.(err)
    }
  }

  // Auto-reset state
  useEffect(() => {
    if (copyState !== 'idle') {
      const timeout = copyState === 'manual' ? 4000 : 2000
      const timer = setTimeout(() => setCopyState('idle'), timeout)
      return () => clearTimeout(timer)
    }
  }, [copyState])

  const variantStyles = {
    default: "inline-flex items-center gap-3 px-4 py-2 rounded",
    compact: "inline-flex items-center gap-2 px-3 py-1 rounded-sm",
    inline: "inline-flex items-center gap-1"
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className={cn(
          CopyActionStyles.button,
          CopyActionStyles.interactive,
          "group",
          variantStyles[variant]
        )}
        title={t('common.copyToClipboard')}
      >
        <code className="select-none font-mono text-sm">{text}</code>
        {copyState === 'success' ? (
          <CheckIcon className={cn(CopyActionStyles.icon, CopyActionStyles.iconSuccess)} />
        ) : (
          <CopyIcon className={cn(CopyActionStyles.icon, CopyActionStyles.iconDefault)} />
        )}
      </button>
      
      {/* 狀態反饋 */}
      {copyState !== 'idle' && (
        <div className="absolute top-full left-0 mt-1 animate-fade-in">
          {copyState === 'success' ? (
            <span className={cn("text-xs", CopyActionStyles.success)}>
              {t('common.copied')}
            </span>
          ) : (
            <div className={cn("text-xs", CopyActionStyles.manual)}>
              <p className="font-semibold">{t('common.manualCopy')}</p>
              <p className="font-mono bg-yellow-400/20 px-2 py-1 rounded mt-1 select-all">
                {text}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

#### 狀態反饋設計

**成功狀態視覺語言**:
```tsx
const SuccessState = () => (
  <div className="flex items-center gap-2 text-green-400 text-sm">
    <CheckCircleIcon className="w-4 h-4" />
    <span>已複製到剪貼簿</span>
  </div>
)
```

**手動複製狀態視覺語言**:
```tsx
const ManualState = ({ text }) => (
  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3">
    <p className="text-yellow-300 text-sm font-semibold mb-2">
      請手動複製以下內容：
    </p>
    <div className="bg-yellow-400/20 rounded p-2">
      <code className="text-yellow-100 font-mono text-sm select-all">
        {text}
      </code>
    </div>
  </div>
)
```

**錯誤狀態視覺語言**:
```tsx
const ErrorState = () => (
  <div className="flex items-center gap-2 text-red-400 text-sm">
    <ExclamationCircleIcon className="w-4 h-4" />
    <span>複製失敗，請手動複製</span>
  </div>
)
```

### 🎭 動畫系統

#### 自訂 CSS 動畫
```css
/* globals.css - 新增動畫 */
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  .animate-bounce-in {
    animation: bounceIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

#### 動畫使用規範
```tsx
// 狀態轉換動畫
const stateTransitionClass = "transition-all duration-200"

// 互動動畫
const interactionClass = "transform hover:scale-105 transition-transform duration-200"

// 內容出現動畫
const contentAppearClass = "animate-fade-in"

// 成功反饋動畫
const successFeedbackClass = "animate-bounce-in"
```

### 🎨 色彩語義系統

#### 功能性色彩定義
```tsx
export const FunctionalColors = {
  // 成功狀態
  success: {
    primary: "text-green-400",
    background: "bg-green-400/10",
    border: "border-green-400/30"
  },
  
  // 警告狀態
  warning: {
    primary: "text-yellow-400",
    background: "bg-yellow-400/10", 
    border: "border-yellow-400/30"
  },
  
  // 錯誤狀態
  error: {
    primary: "text-red-400",
    background: "bg-red-400/10",
    border: "border-red-400/30"
  },
  
  // 資訊狀態
  info: {
    primary: "text-blue-400",
    background: "bg-blue-400/10",
    border: "border-blue-400/30"
  },
  
  // 手動操作狀態
  manual: {
    primary: "text-yellow-300",
    background: "bg-yellow-400/20",
    border: "border-yellow-400/30",
    highlight: "bg-yellow-400/30"
  }
}
```

#### 狀態色彩應用範例
```tsx
const StatusMessage = ({ type, children }) => {
  const colorScheme = FunctionalColors[type]
  
  return (
    <div className={cn(
      "p-4 rounded-lg border",
      colorScheme.background,
      colorScheme.border
    )}>
      <p className={colorScheme.primary}>
        {children}
      </p>
    </div>
  )
}

// 使用範例
<StatusMessage type="success">操作成功！</StatusMessage>
<StatusMessage type="warning">請注意檢查設定</StatusMessage>
<StatusMessage type="error">發生錯誤，請重試</StatusMessage>
<StatusMessage type="manual">請手動完成此步驟</StatusMessage>
```

### 🎨 設計 Tokens 管理

#### tailwind.config.ts 自定義
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    }
  }
}
```

### 🔍 設計系統檢查

#### 設計一致性檢查腳本
```bash
#!/bin/bash
# scripts/design-check.sh

echo "🎨 設計系統一致性檢查..."

# 檢查是否有動態類別拼接
echo "📋 檢查動態類別..."
grep -r "text-\${" app/ components/ && echo "❌ 發現動態類別拼接" || echo "✅ 無動態類別問題"

# 檢查色彩使用一致性
echo "🎨 檢查色彩使用..."
grep -r "bg-blue-[0-9]" app/ components/ | wc -l | xargs -I {} echo "藍色使用次數: {}"

echo "✅ 設計檢查完成"
```

### 🎫 優惠碼元件設計規範

#### PromoCodeCopy 元件實作

專為優惠碼複製功能設計的獨立元件，遵循項目設計系統標準：

```tsx
// components/promo-code-copy.tsx
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/i18n-context";

type PromoCodeCopyProps = {
  code: string;
  theme?: "yellow" | "blue" | "purple";
  className?: string;
  label?: string;
};

const themeMap = {
  yellow: "bg-yellow-500/40 text-yellow-50 border border-yellow-400/50",
  blue: "bg-blue-500/40 text-blue-50 border border-blue-400/50", 
  purple: "bg-purple-500/40 text-purple-50 border border-purple-400/50",
};

export function PromoCodeCopy({
  code,
  theme = "yellow",
  className = "",
  label,
}: PromoCodeCopyProps) {
  const { t } = useI18n();
  const [copyState, setCopyState] = useState<"idle" | "success" | "manual">("idle");

  const copyWithFallback = async (text: string) => {
    try {
      // Layer 1: 現代瀏覽器 Clipboard API (HTTPS)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopyState("success");
        return;
      }
      
      // Layer 2: 傳統瀏覽器 execCommand fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopyState(result ? "success" : "manual");
    } catch (error) {
      // Layer 3: 完全失敗，提示手動複製
      console.warn("Clipboard copy failed:", error);
      setCopyState("manual");
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    copyWithFallback(code);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      copyWithFallback(code);
    }
  };

  useEffect(() => {
    if (copyState !== "idle") {
      const timeout = setTimeout(
        () => setCopyState("idle"),
        copyState === "manual" ? 4000 : 2000
      );
      return () => clearTimeout(timeout);
    }
  }, [copyState]);

  return (
    <div
      className={`rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 animate-fade-in ${themeMap[theme]} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={label || t("tickets.promoCodeClick")}
    >
      <span className="font-mono font-bold text-lg select-all">{code}</span>
      {copyState === "success" && (
        <span className="text-green-400 ml-2 flex items-center" aria-live="polite">
          <svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {t("tickets.promoCodeCopied")}
        </span>
      )}
      {copyState === "manual" && (
        <span className="text-yellow-300 ml-2 flex items-center" aria-live="polite">
          <svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m-4-5v9" />
          </svg>
          {t("tickets.promoCodeManual")}
        </span>
      )}
      {copyState === "idle" && (
        <span className="ml-2 flex items-center">
          <svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label || t("tickets.promoCodeClick")}
        </span>
      )}
    </div>
  );
}
```

#### 設計原則特點

- **三層 Clipboard 策略**：現代 API → 傳統方法 → 手動提示
- **事件防冒泡**：防止觸發父元素的 click 事件
- **無障礙設計**：ARIA 標籤、鍵盤導航、螢幕閱讀器支援
- **狀態管理**：視覺回饋與自動重置機制
- **主題支援**：配合不同頁面的色彩需求

---

**下一章：** [第7章：開發工具與除錯](./07-development-tools.md) - 深入了解版本監控、熱重載、除錯工具
---

## 🧭 Smart Navigation 與 Context Tracking

### 設計原則
- 所有導航行為皆應根據使用者進入來源、URL 參數與上下文狀態動態調整 UX 流程。
- 透過 `useSearchParams()` 取得 URL 參數，並以 `isFromHomepage` 等狀態追蹤使用者來源。
- 關閉 Lightbox、返回上一頁等行為皆依據上下文決策。

### URL 參數設計
```tsx
// 典型講者頁面 URL
/speakers?id=michael-chen&from=homepage
```

### useSearchParams 實作範例
```tsx
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export const SpeakerLightbox = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isFromHomepage, setIsFromHomepage] = useState(false)

  useEffect(() => {
    const speakerId = searchParams.get('id')
    if (speakerId) {
      setIsFromHomepage(searchParams.get('from') === 'homepage')
      // 開啟 Lightbox 並標記來源
      openLightbox(speakerId, isFromHomepage)
    }
  }, [searchParams])

  const closeLightbox = () => {
    if (isFromHomepage) {
      router.push('/') // 從首頁進入，返回首頁
    } else {
      // 停留在講者頁面
    }
    setIsFromHomepage(false)
  }

  // ...元件內容
}
```

### UX 流程應用
- 從首頁進入：關閉 Lightbox 返回首頁
- 直接訪問：關閉 Lightbox 停留在講者頁面
- 分享連結：自動開啟對應講者 Lightbox

此設計確保使用者體驗一致且可追蹤來源，提升導航靈活性。
