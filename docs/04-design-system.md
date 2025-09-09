# 第4章：UI/UX 設計系統

> **本章內容**：Tailwind CSS 最佳實踐、元件設計原則、設計系統規範

---

## 🎨 設計系統概覽

### 🎯 設計哲學
- **一致性優先**：統一的視覺語言和互動模式
- **可讀性第一**：確保對比度、字體大小、視覺層級清晰
- **響應式設計**：手機優先，桌面增強的設計策略
- **效能考量**：靜態 CSS 類別，避免動態字串拼接

### 🏗️ 設計架構
```
設計系統
├── 色彩系統
│   ├── 主色調（藍紫漸層）
│   ├── 語意色彩（成功、警告、錯誤）
│   └── 透明度階層
├── 字型系統
│   ├── 字型大小階層
│   ├── 行高比例
│   └── 字重層級
├── 間距系統
│   ├── 元件內邊距
│   ├── 元件間距
│   └── 版面邊距
└── 元件庫
    ├── 按鈕系統
    ├── 卡片容器
    ├── 表單元素
    └── 互動效果
```

---

## 🎨 色彩系統

### 🌈 主色彩配置

#### 主要色彩
```css
/* 主色調：藍紫漸層 */
--primary-blue: #2563eb    /* blue-600 */
--primary-purple: #9333ea  /* purple-600 */
--primary-blue-dark: #1d4ed8    /* blue-700 */
--primary-purple-dark: #7c3aed   /* purple-700 */

/* 中性色彩 */
--neutral-dark: #1e293b    /* slate-800 */
--neutral-medium: #475569  /* slate-600 */
--neutral-light: #e2e8f0   /* slate-200 */

/* 背景色彩 */
--bg-primary: #0f172a      /* slate-900 */
--bg-secondary: #1e293b    /* slate-800 */
--bg-accent: rgba(59, 130, 246, 0.1)  /* blue-500/10 */
```

#### 語意色彩
```css
/* 狀態色彩 */
--success: #10b981     /* emerald-500 */
--warning: #f59e0b     /* amber-500 */
--error: #ef4444       /* red-500 */
--info: #3b82f6        /* blue-500 */

/* 透明度變化 */
--white-10: rgba(255, 255, 255, 0.1)
--white-20: rgba(255, 255, 255, 0.2)
--black-10: rgba(0, 0, 0, 0.1)
--black-20: rgba(0, 0, 0, 0.2)
```

### 🎨 Tailwind 色彩應用

#### 漸層背景設計
```tsx
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
const h3Style = "text-xl font-semibold"

// 輔助標題
const h4Style = "text-lg font-medium"
```

#### 內文系統
```tsx
// 主要內文
const bodyText = "text-base leading-relaxed"

// 小字內文
const smallText = "text-sm leading-normal"

// 微字說明
const captionText = "text-xs leading-tight"

// 強調文字
const emphasisText = "text-lg font-medium"
```

### 🎯 字型應用範例

#### 響應式字型
```tsx
export const ResponsiveHeading = ({ children, level = 1 }) => {
  const headingStyles = {
    1: "text-3xl md:text-4xl lg:text-5xl font-bold",
    2: "text-2xl md:text-3xl lg:text-4xl font-bold",
    3: "text-xl md:text-2xl lg:text-3xl font-semibold",
    4: "text-lg md:text-xl lg:text-2xl font-medium"
  }
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <Tag className={headingStyles[level]}>
      {children}
    </Tag>
  )
}
```

---

## 🔘 按鈕設計系統

### 🎯 按鈕變體設計

#### 主要按鈕（Primary）
```tsx
export const PrimaryButton = ({ children, className = '', ...props }) => {
  const baseStyles = `
    bg-gradient-to-r from-blue-600 to-purple-600 
    hover:from-blue-700 hover:to-purple-700
    text-white font-semibold
    px-6 py-3 rounded-lg
    shadow-lg hover:shadow-xl
    transform hover:scale-105
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-blue-500/50
  `
  
  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}
```

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

---

**下一章：** [第7章：開發工具與除錯](./07-development-tools.md) - 深入了解版本監控、熱重載、除錯工具
