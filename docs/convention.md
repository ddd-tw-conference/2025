# DDDTW 2025 開發規範

## 📁 命名規範
- **統一使用 kebab-case**，無例外
- 檔案：`hero-section.tsx`、`use-mobile.tsx`
- 目錄：`components/ui/`、`contexts/`

## ⚛️ React 慣例
```typescript
// Import
import * as React from "react"

// 基礎元件
export default function ComponentName() {
  return <div>...</div>
}

// UI 元件 (shadcn/ui)
const ComponentName = React.forwardRef<HTMLElement, Props>(
  ({ className, ...props }, ref) => (
    <div ref={ref} {...props} />
  )
)
ComponentName.displayName = "ComponentName"
export { ComponentName }
```

## 🚀 Next.js 靜態匯出設定
```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: false,  // 重要：產生 tickets.txt 而非 tickets/index.txt
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/2025' : '',
}
```

## 🚨 常見問題修復

### RSC 404 錯誤
**問題**：瀏覽器找不到 `tickets.txt`、`agenda.txt`
**解決**：設定 `trailingSlash: false`

### React #418 Hydration 錯誤
**原因**：SSR 與客戶端不匹配
**解決**：
1. 所有元件使用 `'use client'`
2. localStorage 延遲載入
3. 使用 `isMounted` 狀態檢查

```tsx
// 修復範例
const [isMounted, setIsMounted] = useState(false)
useEffect(() => setIsMounted(true), [])
if (!isMounted) return null
```

---

*最後更新：2025年8月31日*
