# DDDTW 2025 開發規範

## 📁 基礎規範
- **命名**：統一使用 `kebab-case` (檔案、目錄、路由)
- **元件**：使用 `'use client'` 避免 SSR 問題
- **Import 順序**：React → Next.js → 第三方 → 本地組件

## ⚙️ 配置管理
- **統一目錄**：所有配置放在 `config/` 目錄（詳見 [config-management.md](./config-management.md)）
- **引用方式**：使用 `import { CONFIG } from '@/config'`
- **避免硬編碼**：所有設定值都要透過配置文件管理

## 🎨 UI 設計原則

### 按鈕可讀性
```tsx
// ✅ 主要按鈕：漸層背景 + 白文字
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">

// ✅ 次要按鈕：半透明背景 + 毛玻璃
<Button className="bg-white/10 border-white/30 text-white backdrop-blur-sm font-medium">

// ❌ 避免：純透明背景導致對比度不足
<Button className="border-white/50 text-white">
```

### 懸浮效果
- **主要按鈕**：`hover:from-blue-700 hover:to-purple-700`
- **次要按鈕**：`hover:bg-white/20 hover:border-white/50`
- **互動元素**：必須添加 `cursor-pointer` 確保正確的鼠標樣式

## 🚀 路由跳轉規範

| 使用場景 | 推薦方式 | 範例 |
|----------|----------|------|
| 內部頁面 | `<Link>` + `asChild` | `<Button asChild><Link href="/tickets">` |
| 程式跳轉 | `router.push()` | `router.push('/tickets')` |
| 外部網站 | `window.open()` | `window.open(url, '_blank')` |
| 返回上頁 | `window.history.back()` | 404 頁面使用 |

## ⚙️ Next.js 設定
```javascript
// next.config.mjs - 靜態匯出必要設定
const nextConfig = {
  output: 'export',
  trailingSlash: false,  // 避免 404 錯誤
  images: { unoptimized: true },
}
```

## 🚨 故障排除

### 按鈕無法點擊 / 文字看不清楚
- **檢查**：是否有足夠的背景色和對比度
- **修復**：添加 `bg-white/10` 和 `font-medium`

### 頁面跳轉失效
- **檢查**：是否使用了正確的跳轉方式
- **修復**：內部用 `Link`，外部用 `window.open()`

### Hydration 錯誤
```tsx
// 延遲渲染客戶端內容
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
```

## 📋 上線前檢查
- [ ] 所有按鈕文字清楚可見 (對比度 ≥ 4.5:1)
- [ ] 購票/報名按鈕功能正常
- [ ] 無 Console 錯誤或警告
- [ ] 行動裝置顯示正常

---
*更新日期：2025年9月7日 | v2.1 - 簡化配置管理說明並改善可讀性*
