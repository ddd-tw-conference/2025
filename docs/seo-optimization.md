# DDD Taiwan 2025 SEO 優化指南

## 專案架構概述

DDD Taiwan 2025 網站採用 Next.js 15 靜態 SPA 架構，部署於 GitHub Pages，具備以下特性：

- **多語系支援**：繁體中文與英文透過 i18n context 切換，共用同一組 URL
- **頁面結構**：首頁、about、agenda、speakers、transportation、rules、tickets
- **SEO 策略**：票務與 404 頁面不納入 sitemap，主要頁面優化搜尋引擎收錄

---

## 核心實作

### Sitemap 設定

**設計原則**：
- 僅包含主要內容頁面：首頁、about、agenda、speakers、transportation、rules
- 使用 `CONFIG.deployment.baseUrl` 直接拼接路徑（避免路徑重複）
- 設定適當的 changeFrequency 與 priority

```typescript
import { MetadataRoute } from 'next'
import { CONFIG } from '@/config/app'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CONFIG.deployment.baseUrl
  const lastModified = new Date('2025-09-08')

  const pages = [
    { route: '/', changeFrequency: 'monthly', priority: 1 },
    { route: '/about', changeFrequency: 'yearly', priority: 0.8 },
    { route: '/agenda', changeFrequency: 'monthly', priority: 0.9 },
    { route: '/speakers', changeFrequency: 'monthly', priority: 0.9 },
    { route: '/transportation', changeFrequency: 'yearly', priority: 0.7 },
    { route: '/rules', changeFrequency: 'yearly', priority: 0.5 },
  ]

  return pages.map(page => ({
    url: `${baseUrl}${page.route}`,
    lastModified,
    changeFrequency: page.changeFrequency as 'monthly' | 'yearly',
    priority: page.priority,
  }))
}
```

### Robots 設定

**設計原則**：
- 允許搜尋引擎抓取所有內容頁面
- 阻擋技術性路徑（`/api/`、`/_next/`）
- 指向正確的 sitemap 位置

```typescript
import { MetadataRoute } from 'next'
import { CONFIG } from '@/config/app'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = CONFIG.deployment.baseUrl

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

---

## 重要注意事項

### 路徑處理陷阱
⚠️ **避免使用 `getRoutePath()`**：由於 `CONFIG.deployment.baseUrl` 已是完整 URL，再使用 `getRoutePath()` 會造成路徑重複（如 `/2025/2025/`）

```typescript
// ✅ 正確做法
const url = `${baseUrl}/about`

// ❌ 錯誤做法（會造成路徑重複）
const url = `${baseUrl}${getRoutePath('/about')}`
```

### 文件衝突避免
- 使用 `app/robots.ts` 動態產生，刪除 `public/robots.txt` 避免衝突
- Next.js 15 優先使用 App Router 的 robots.ts

---

## 維護指南

### 日常維護
- 新增頁面時同步更新 sitemap.ts
- 定期檢查 `CONFIG.deployment.baseUrl` 與實際部署網址一致性
- 在各頁面 metadata 中設定多語系 SEO 標籤

### 驗證方法
```bash
# 建置驗證
pnpm build

# 檢查生成的檔案
Get-Content "out/sitemap.xml"
Get-Content "out/robots.txt"
```

---

## 執行紀錄

### 已完成項目
- [x] 路徑生成方式統一（sitemap 使用 baseUrl + 相對路徑）
- [x] sitemap.ts 優化（避免路徑重複問題）
- [x] robots.ts 設定確認
- [x] 刪除 public/robots.txt 避免衝突
- [x] 建置驗證通過

### 持續維護
- [ ] 新增頁面時同步更新 sitemap
- [ ] 優化各頁面多語系 SEO metadata
