# Tailwind CSS 開發最佳實踐

## 🚨 動態類別問題與解決方案

在 DDD Taiwan 2025 專案中，我們遇到了 Tailwind CSS 動態類別編譯的重要問題。

---

## ⚠️ 問題描述

### Tailwind CSS 無法識別動態字串插值
```tsx
// ❌ 問題代碼 - Tailwind 無法編譯動態類別
const gradient = "from-purple-500 to-pink-500"
<div className={`bg-gradient-to-br ${gradient}`} />

// 結果：背景顯示為白色，因為類別未被編譯到最終 CSS
```

### 根本原因
- Tailwind CSS 在構建時進行靜態分析
- 動態字串插值無法被 PurgeCSS 識別
- 未使用的類別會被從最終 CSS 中移除

---

## 🖼️ 圖片效能最佳實踐

### Next.js Image 元件使用
```tsx
// ✅ 推薦：使用 Next.js Image 元件
import Image from 'next/image'

<Image
  src={getImagePath("/images/banners/banner-main.webp")}
  alt="Banner"
  className="w-full h-full object-cover"
  priority // 首屏大圖
  fill
  sizes="100vw"
/>
```

### 圖片格式與壓縮
- **格式選擇**：優先使用 WebP 格式（比 PNG/JPG 小 25-50%）
- **檔案大小**：目標 200KB 以下
- **工具**：使用 sharp 套件自動化壓縮
- **靜態導出**：專案使用 `unoptimized: true`，依賴預處理優化

### Tailwind 圖片樣式
```tsx
// ✅ 推薦的圖片樣式類別
className="w-full h-auto object-cover"        // 響應式圖片
className="w-full h-full object-cover"        // 填滿容器
className="object-cover rounded-lg"           // 圓角圖片
className="cursor-pointer"                    // 可點擊圖片
```

---

## ✅ 解決方案

### 1. 使用靜態類別定義
```tsx
// ✅ 推薦方案：預定義所有可能的類別
let gradient, bgColor, iconColor

switch (type) {
  case 'science':
    gradient = "from-purple-500 to-pink-500"
    bgColor = "bg-purple-50 dark:bg-purple-900/20"
    iconColor = "text-purple-600 dark:text-purple-400"
    break
  case 'workshop':
    gradient = "from-blue-500 to-cyan-500"
    bgColor = "bg-blue-50 dark:bg-blue-900/20"
    iconColor = "text-blue-600 dark:text-blue-400"
    break
}

<div className={`bg-gradient-to-br ${gradient} ${bgColor}`} />
```

### 2. 在 safelist 中保護類別
```javascript
// tailwind.config.ts
module.exports = {
  content: [...],
  safelist: [
    // 確保特定類別不被移除
    'from-purple-500',
    'to-pink-500',
    'from-blue-500',
    'to-cyan-500',
    'bg-purple-50',
    'bg-blue-50'
  ]
}
```

### 3. 建立設計令牌系統
```typescript
// config/design-tokens.ts
export const DESIGN_TOKENS = {
  gradients: {
    science: "from-purple-500 to-pink-500",
    workshop: "from-blue-500 to-cyan-500", 
    practice: "from-green-500 to-emerald-500"
  },
  
  backgrounds: {
    science: "bg-purple-50 dark:bg-purple-900/20",
    workshop: "bg-blue-50 dark:bg-blue-900/20",
    practice: "bg-green-50 dark:bg-green-900/20"
  }
}
```

---

## 🎯 最佳實踐指南

### 1. **類別命名策略**
```tsx
// ✅ 好：使用語義化的預定義類別
const buttonStyles = {
  primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
  secondary: "bg-white/10 border-white/30 text-white backdrop-blur-sm"
}

// ❌ 避免：動態組合類別名稱
const dynamicClass = `bg-${color}-500 text-${color}-900`
```

### 2. **組件樣式管理**
```tsx
// ✅ 推薦：使用 clsx 或 cn 工具函式
import { cn } from '@/lib/utils'

const Button = ({ variant, className, ...props }) => (
  <button 
    className={cn(
      "px-4 py-2 rounded-lg transition-colors",
      {
        "bg-blue-500 text-white": variant === 'primary',
        "bg-gray-200 text-gray-900": variant === 'secondary'
      },
      className
    )}
    {...props}
  />
)
```

### 3. **響應式設計**
```tsx
// ✅ 明確的響應式類別
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ✅ 複雜響應式邏輯使用 CSS Grid
<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
```

---

## 🔧 除錯技巧

### 1. **檢查類別是否被編譯**
```bash
# 構建後檢查 CSS 檔案
grep "from-purple-500" out/_next/static/css/*.css

# 如果找不到，表示類別未被編譯
```

### 2. **使用開發者工具檢查**
```tsx
// 臨時加入明確的類別進行測試
<div className="bg-purple-500 from-purple-500 to-pink-500" />
```

### 3. **檢視構建報告**
```bash
# 檢查 Tailwind 編譯結果
pnpm build 2>&1 | grep -i tailwind
```

---

## 📊 常見問題與解決

### 問題 1：按鈕背景不顯示
```tsx
// ❌ 問題：動態背景類別
const bgClass = `bg-${type}-500`

// ✅ 解決：預定義映射
const bgClass = {
  primary: "bg-blue-500",
  secondary: "bg-gray-500"
}[type]
```

### 問題 2：漸變效果失效
```tsx
// ❌ 問題：動態漸變類別
const gradient = `from-${startColor}-500 to-${endColor}-500`

// ✅ 解決：完整的漸變定義
const gradients = {
  blue: "from-blue-500 to-blue-700",
  purple: "from-purple-500 to-pink-500"
}
```

### 問題 3：深色模式類別消失
```tsx
// ❌ 問題：動態深色模式類別
className={`text-${color}-600 dark:text-${color}-400`}

// ✅ 解決：完整定義
const textColors = {
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400"
}
```

---

## 🚀 效能優化建議

### 1. **減少 CSS 檔案大小**
- 避免不必要的類別在 safelist 中
- 使用精確的 content 路徑設定
- 定期清理未使用的設計令牌

### 2. **提升開發體驗**
- 使用 TypeScript 定義設計令牌類型
- 建立設計系統文檔
- 使用 VSCode 擴展提供自動完成

### 3. **構建最佳化**
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 精確指定路徑，避免掃描不必要的檔案
  ],
  theme: {
    extend: {
      // 只擴展真正需要的樣式
    }
  }
}
```

---

## 📋 檢查清單

開發新功能時的 Tailwind CSS 檢查項目：

- [ ] 所有類別都是靜態定義的
- [ ] 沒有使用字串插值組合類別名稱
- [ ] 複雜的樣式變化使用 switch/object 映射
- [ ] 響應式斷點使用標準的 sm/md/lg/xl
- [ ] 深色模式類別都有對應的淺色模式
- [ ] 自訂類別都在 theme.extend 中定義
- [ ] 構建後確認樣式正確應用

---

*建立日期：2025年9月7日 | 基於實際問題解決經驗編寫*
