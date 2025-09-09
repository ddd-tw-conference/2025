# 第8章：SEO 與部署

> **本章內容**：搜尋引擎優化策略、GitHub Pages 部署配置、靜態網站最佳實踐

---

## 🔍 SEO 優化策略

### 🎯 SEO 目標設定
- **搜尋可見性**：在「DDD Taiwan」、「領域驅動設計」關鍵字排名前列
- **結構化資料**：完整的活動、組織、網站資訊標記
- **效能優化**：Core Web Vitals 全綠達標
- **多語言支援**：中英文內容完整索引

### 🏗️ SEO 架構設計
```
SEO 最佳化系統
├── 基礎 SEO 設定
│   ├── Meta Tags 管理
│   ├── Open Graph 配置
│   ├── Twitter Cards
│   └── Canonical URLs
├── 結構化資料
│   ├── Event Schema
│   ├── Organization Schema
│   ├── Person Schema (講者)
│   └── WebSite Schema
├── 內容優化
│   ├── 關鍵字策略
│   ├── 標題階層
│   ├── 圖片 Alt 標籤
│   └── 內部連結
└── 技術 SEO
    ├── Sitemap 生成
    ├── Robots.txt 配置
    ├── 載入速度優化
    └── 行動裝置友善
```

---

## 📄 基礎 SEO 實作

### 🏷️ Meta Tags 管理系統

#### lib/seo.ts
```typescript
import { CONFIG } from '@/config'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'event'
  locale?: 'zh_TW' | 'en_US'
}

export const generateSEOTags = (config: SEOConfig) => {
  const {
    title,
    description,
    keywords = [],
    image = `${CONFIG.deployment.baseUrl}/images/og-default.webp`,
    url = CONFIG.deployment.baseUrl,
    type = 'website',
    locale = 'zh_TW'
  } = config

  return {
    // 基礎 Meta 標籤
    title,
    description,
    keywords: keywords.join(', '),
    
    // Open Graph 標籤
    openGraph: {
      title,
      description,
      url,
      siteName: CONFIG.conference.fullName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale,
      type: type === 'event' ? 'website' : type,
    },
    
    // Twitter Card 標籤
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@DDDesignTW',
    },
    
    // 其他標籤
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': `${CONFIG.deployment.baseUrl}/`,
        'en': `${CONFIG.deployment.baseUrl}/en/`,
      }
    },
    
    // Viewport 和其他
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
  }
}

// 頁面專用 SEO 配置
export const pageSEOConfigs = {
  home: {
    'zh-TW': {
      title: 'DDDTW 2025 - AI時代軟體開發方法 | 領域驅動設計台灣',
      description: '探索領域驅動設計在人工智慧時代的實踐與創新。匯聚國內外專家，分享最新技術趨勢與實戰經驗。',
      keywords: ['DDD', '領域驅動設計', '軟體開發', 'AI', '人工智慧', '台灣', '會議']
    },
    'en': {
      title: 'DDDTW 2025 - Software Development in AI Era | Domain-Driven Design Taiwan',
      description: 'Explore Domain-Driven Design practices and innovations in the age of artificial intelligence. Join experts from Taiwan and abroad.',
      keywords: ['DDD', 'Domain-Driven Design', 'Software Development', 'AI', 'Artificial Intelligence', 'Taiwan', 'Conference']
    }
  },
  
  speakers: {
    'zh-TW': {
      title: '講者介紹 | DDDTW 2025',
      description: '認識 DDDTW 2025 的精彩講者陣容，包括國內外領域驅動設計專家與實踐者。',
      keywords: ['講者', '專家', 'DDD', '領域驅動設計', '分享']
    },
    'en': {
      title: 'Speakers | DDDTW 2025',
      description: 'Meet the amazing speakers of DDDTW 2025, including DDD experts and practitioners from Taiwan and abroad.',
      keywords: ['speakers', 'experts', 'DDD', 'Domain-Driven Design', 'sharing']
    }
  },
  
  tickets: {
    'zh-TW': {
      title: '購票資訊 | DDDTW 2025',
      description: '立即購買 DDDTW 2025 門票，搶先體驗 AI 時代的軟體開發新思維。早鳥優惠限時供應！',
      keywords: ['購票', '門票', '早鳥', '優惠', 'DDDTW', '會議']
    },
    'en': {
      title: 'Tickets | DDDTW 2025',
      description: 'Get your DDDTW 2025 tickets now! Experience cutting-edge software development insights in the AI era.',
      keywords: ['tickets', 'registration', 'early bird', 'discount', 'DDDTW', 'conference']
    }
  }
}
```

#### 頁面 SEO 應用
```tsx
// app/page.tsx
import { Metadata } from 'next'
import { generateSEOTags, pageSEOConfigs } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const seoConfig = pageSEOConfigs.home['zh-TW']
  return generateSEOTags(seoConfig)
}

export default function HomePage() {
  return (
    <main>
      {/* 頁面內容 */}
    </main>
  )
}
```

---

## 🏗️ 結構化資料實作

### 📊 Schema.org 標記

#### lib/structured-data.ts
```typescript
import { CONFIG } from '@/config'

// 活動結構化資料
export const generateEventSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: CONFIG.conference.fullName,
  description: "探索領域驅動設計在人工智慧時代的實踐與創新",
  startDate: "2025-09-13T09:00:00+08:00",
  endDate: "2025-09-13T18:00:00+08:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "台北國際會議中心",
    address: {
      "@type": "PostalAddress",
      streetAddress: "信義路五段1號",
      addressLocality: "台北市",
      addressRegion: "信義區",
      postalCode: "110",
      addressCountry: "TW"
    }
  },
  organizer: {
    "@type": "Organization",
    name: "DDD Taiwan",
    url: "https://dddtaiwan.com",
    logo: `${CONFIG.deployment.baseUrl}/images/logo.webp`
  },
  offers: {
    "@type": "Offer",
    url: `${CONFIG.deployment.baseUrl}/tickets`,
    price: "1800",
    priceCurrency: "TWD",
    availability: "https://schema.org/InStock",
    validFrom: "2024-12-01T00:00:00+08:00"
  },
  image: [
    `${CONFIG.deployment.baseUrl}/images/event-cover.webp`
  ],
  url: CONFIG.deployment.baseUrl
})

// 組織結構化資料
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DDD Taiwan",
  alternateName: "Domain-Driven Design Taiwan",
  url: CONFIG.deployment.baseUrl,
  logo: `${CONFIG.deployment.baseUrl}/images/logo.webp`,
  description: "台灣領域驅動設計社群，致力於推廣 DDD 概念與實踐",
  foundingDate: "2020",
  sameAs: [
    "https://www.facebook.com/DDDesignTW",
    "https://www.linkedin.com/company/ddd-taiwan"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: CONFIG.contact.email
  }
})

// 講者結構化資料
export const generateSpeakerSchema = (speaker: any, language: 'zh-TW' | 'en') => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: speaker.name[language === 'zh-TW' ? 'zh-tw' : 'en'],
  jobTitle: speaker.title[language === 'zh-TW' ? 'zh-tw' : 'en'],
  description: speaker.bio[language === 'zh-TW' ? 'zh-tw' : 'en'],
  image: `${CONFIG.deployment.baseUrl}${speaker.avatar}`,
  url: speaker.social?.website,
  sameAs: [
    speaker.social?.linkedin,
    speaker.social?.twitter
  ].filter(Boolean)
})

// 網站結構化資料
export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: CONFIG.conference.fullName,
  url: CONFIG.deployment.baseUrl,
  description: "DDDTW 2025 官方網站 - AI時代軟體開發方法",
  publisher: {
    "@type": "Organization",
    name: "DDD Taiwan",
    logo: `${CONFIG.deployment.baseUrl}/images/logo.webp`
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${CONFIG.deployment.baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
})
```

#### 結構化資料元件
```tsx
// components/structured-data.tsx
import Script from 'next/script'
import { 
  generateEventSchema, 
  generateOrganizationSchema, 
  generateWebSiteSchema 
} from '@/lib/structured-data'

export const StructuredData = () => {
  const schemas = [
    generateEventSchema(),
    generateOrganizationSchema(),
    generateWebSiteSchema()
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  )
}

// 在 layout.tsx 中使用
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 🗺️ Sitemap 與 Robots 配置

### 📍 動態 Sitemap 生成

#### app/sitemap.ts
```typescript
import { MetadataRoute } from 'next'
import { CONFIG } from '@/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CONFIG.deployment.baseUrl
  
  // 靜態頁面
  const staticPages = [
    '',           // 首頁
    '/about',     // 關於
    '/speakers',  // 講者
    '/agenda',    // 議程
    '/tickets',   // 購票
    '/transportation', // 交通
  ]
  
  // 生成多語言 URLs
  const urls: MetadataRoute.Sitemap = []
  
  for (const page of staticPages) {
    // 預設中文版本
    urls.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'zh-TW': `${baseUrl}${page}`,
          'en': `${baseUrl}/en${page}`,
        }
      }
    })
  }
  
  // 動態講者頁面（如果有個別講者頁面）
  // const speakers = await getSpeakers()
  // for (const speaker of speakers) {
  //   urls.push({
  //     url: `${baseUrl}/speakers/${speaker.id}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'monthly',
  //     priority: 0.6
  //   })
  // }
  
  return urls
}
```

### 🤖 Robots.txt 配置

#### app/robots.ts
```typescript
import { MetadataRoute } from 'next'
import { CONFIG } from '@/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
          '*.json$',
        ]
      },
      {
        userAgent: 'GPTBot',
        disallow: '/', // 禁止 AI 爬蟲
      }
    ],
    sitemap: `${CONFIG.deployment.baseUrl}/sitemap.xml`,
    host: CONFIG.deployment.baseUrl
  }
}
```

---

## 🚀 GitHub Pages 部署配置

### ⚙️ Next.js 靜態輸出配置

#### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 靜態輸出配置
  output: 'export',
  trailingSlash: false,
  
  // GitHub Pages 路徑配置
  basePath: '/2025',
  assetPrefix: '/2025',
  
  // 圖片配置
  images: {
    unoptimized: true,      // 靜態輸出必須
    formats: ['image/webp'], // 優先 WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 檔案追蹤根目錄
  outputFileTracingRoot: path.join(__dirname, '.'),
  
  // 實驗性功能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  
  // 快取配置
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(js|css|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/tickets',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
```

### 🔄 GitHub Actions 工作流程

#### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
      
    - name: Generate version file
      run: |
        echo "{
          \"version\": \"${{ github.sha }}\",
          \"buildTime\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
          \"branch\": \"${{ github.ref_name }}\"
        }" > public/version.json
        
    - name: Optimize images
      run: node scripts/generate-all-webp.js
      
    - name: Run type check
      run: pnpm type-check
      
    - name: Run linting
      run: pnpm lint
      
    - name: Build
      run: pnpm build
      
    - name: Setup Pages
      uses: actions/configure-pages@v4
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './out'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### 🔧 部署最佳化腳本

#### scripts/pre-deploy.js
```javascript
// 部署前優化腳本
const fs = require('fs')
const path = require('path')

async function preDeploy() {
  console.log('🚀 執行部署前優化...')
  
  // 1. 生成版本資訊
  generateVersionFile()
  
  // 2. 優化圖片
  await optimizeImages()
  
  // 3. 檢查 SEO 設定
  await checkSEOConfig()
  
  // 4. 驗證建置輸出
  await validateBuild()
  
  console.log('✅ 部署前優化完成')
}

function generateVersionFile() {
  const version = {
    version: process.env.GITHUB_SHA || Date.now().toString(),
    buildTime: new Date().toISOString(),
    branch: process.env.GITHUB_REF_NAME || 'local',
    environment: process.env.NODE_ENV || 'development'
  }
  
  fs.writeFileSync(
    path.join(__dirname, '../public/version.json'),
    JSON.stringify(version, null, 2)
  )
  
  console.log('📦 版本檔案已生成:', version.version)
}

async function optimizeImages() {
  console.log('📸 優化圖片中...')
  
  // 執行 WebP 轉換
  const { execSync } = require('child_process')
  try {
    execSync('node scripts/generate-all-webp.js', { stdio: 'inherit' })
    console.log('✅ 圖片優化完成')
  } catch (error) {
    console.warn('⚠️ 圖片優化跳過:', error.message)
  }
}

async function checkSEOConfig() {
  console.log('🔍 檢查 SEO 配置...')
  
  // 檢查關鍵 SEO 檔案
  const requiredFiles = [
    'app/sitemap.ts',
    'app/robots.ts',
    'lib/seo.ts'
  ]
  
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, '..', file)
    if (!fs.existsSync(filePath)) {
      throw new Error(`SEO 配置檔案缺失: ${file}`)
    }
  }
  
  console.log('✅ SEO 配置檢查通過')
}

async function validateBuild() {
  console.log('🔨 驗證建置設定...')
  
  // 檢查 Next.js 配置
  try {
    const nextConfig = await import('../next.config.mjs')
    
    if (!nextConfig.default.output || nextConfig.default.output !== 'export') {
      throw new Error('Next.js 未設定為靜態輸出模式')
    }
    
    if (!nextConfig.default.basePath) {
      throw new Error('未設定 basePath')
    }
    
    console.log('✅ 建置配置驗證通過')
  } catch (error) {
    throw new Error(`建置配置錯誤: ${error.message}`)
  }
}

preDeploy().catch(error => {
  console.error('❌ 部署前優化失敗:', error)
  process.exit(1)
})
```

---

## 📊 SEO 監控與分析

### 🔍 SEO 健康檢查

#### scripts/seo-audit.js
```javascript
// SEO 稽核腳本
const puppeteer = require('puppeteer')
const fs = require('fs')

async function seoAudit() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  try {
    console.log('🔍 開始 SEO 稽核...')
    
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle0' 
    })
    
    // 檢查基礎 Meta 標籤
    const metaChecks = await page.evaluate(() => {
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        keywords: document.querySelector('meta[name="keywords"]')?.content,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        ogDescription: document.querySelector('meta[property="og:description"]')?.content,
        ogImage: document.querySelector('meta[property="og:image"]')?.content,
      }
    })
    
    // 檢查標題階層
    const headingStructure = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      return headings.map(h => ({
        tag: h.tagName,
        text: h.textContent.slice(0, 50),
        level: parseInt(h.tagName.slice(1))
      }))
    })
    
    // 檢查圖片 Alt 標籤
    const imageAlt = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'))
      return {
        total: images.length,
        withAlt: images.filter(img => img.alt).length,
        withoutAlt: images.filter(img => !img.alt).length
      }
    })
    
    // 檢查內部連結
    const internalLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'))
      const internal = links.filter(link => 
        link.href.includes(window.location.hostname) || 
        link.href.startsWith('/')
      )
      return {
        total: links.length,
        internal: internal.length,
        external: links.length - internal.length
      }
    })
    
    // 檢查結構化資料
    const structuredData = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent)
        } catch {
          return null
        }
      }).filter(Boolean)
    })
    
    // 生成報告
    const report = {
      timestamp: new Date().toISOString(),
      meta: metaChecks,
      headings: {
        structure: headingStructure,
        h1Count: headingStructure.filter(h => h.tag === 'H1').length
      },
      images: imageAlt,
      links: internalLinks,
      structuredData: {
        count: structuredData.length,
        types: structuredData.map(sd => sd['@type']).filter(Boolean)
      },
      issues: []
    }
    
    // 檢查問題
    if (!report.meta.title) report.issues.push('缺少頁面標題')
    if (!report.meta.description) report.issues.push('缺少頁面描述')
    if (report.headings.h1Count !== 1) report.issues.push(`H1 標籤數量異常: ${report.headings.h1Count}`)
    if (report.images.withoutAlt > 0) report.issues.push(`${report.images.withoutAlt} 張圖片缺少 Alt 標籤`)
    if (report.structuredData.count === 0) report.issues.push('缺少結構化資料')
    
    console.log('📊 SEO 稽核報告:')
    console.log(`  標題: ${report.meta.title}`)
    console.log(`  描述: ${report.meta.description?.slice(0, 60)}...`)
    console.log(`  圖片 Alt 覆蓋率: ${Math.round(report.images.withAlt / report.images.total * 100)}%`)
    console.log(`  結構化資料: ${report.structuredData.count} 個`)
    console.log(`  問題數量: ${report.issues.length}`)
    
    if (report.issues.length > 0) {
      console.log('\n⚠️ 發現問題:')
      report.issues.forEach(issue => console.log(`  - ${issue}`))
    } else {
      console.log('\n✅ SEO 檢查通過！')
    }
    
    // 儲存詳細報告
    fs.writeFileSync('seo-audit-report.json', JSON.stringify(report, null, 2))
    
  } catch (error) {
    console.error('❌ SEO 稽核失敗:', error)
  } finally {
    await browser.close()
  }
}

seoAudit().catch(console.error)
```

### 📈 搜尋排名監控

#### scripts/rank-monitor.js
```javascript
// 搜尋排名監控腳本
const axios = require('axios')

class RankMonitor {
  constructor() {
    this.keywords = [
      'DDD Taiwan',
      '領域驅動設計 台灣',
      'Domain Driven Design Taiwan',
      'DDDTW 2025',
      'AI 軟體開發方法'
    ]
  }
  
  async checkRankings() {
    console.log('📈 檢查搜尋排名...')
    
    const results = {}
    
    for (const keyword of this.keywords) {
      try {
        // 這裡可以整合 Google Search Console API
        // 或其他 SEO 工具 API
        console.log(`檢查關鍵字: ${keyword}`)
        
        // 模擬搜尋結果檢查
        const ranking = await this.simulateRankCheck(keyword)
        results[keyword] = ranking
        
      } catch (error) {
        console.warn(`關鍵字 ${keyword} 檢查失敗:`, error.message)
      }
    }
    
    return results
  }
  
  async simulateRankCheck(keyword) {
    // 實際應用中，這裡會呼叫真實的搜尋 API
    // 返回模擬排名資料
    return {
      position: Math.floor(Math.random() * 10) + 1,
      url: 'https://ddd-tw-conference.github.io/2025/',
      timestamp: new Date().toISOString()
    }
  }
}

// 執行排名監控
const monitor = new RankMonitor()
monitor.checkRankings().then(results => {
  console.log('排名檢查結果:', results)
}).catch(console.error)
```

---

## 🔧 部署維護流程

### 📋 部署檢查清單

#### 部署前檢查
```bash
#!/bin/bash
# scripts/deploy-checklist.sh

echo "📋 部署前檢查清單"
echo "=================="

# 1. 程式碼品質
echo "1. 檢查程式碼品質..."
pnpm lint && echo "✅ ESLint 通過" || echo "❌ ESLint 失敗"
pnpm type-check && echo "✅ TypeScript 通過" || echo "❌ TypeScript 失敗"

# 2. 建置測試
echo "2. 測試建置..."
pnpm build && echo "✅ 建置成功" || echo "❌ 建置失敗"

# 3. SEO 檢查
echo "3. SEO 檢查..."
node scripts/seo-audit.js

# 4. 效能檢查
echo "4. 效能檢查..."
node scripts/performance-audit.js

# 5. 圖片優化檢查
echo "5. 圖片優化檢查..."
node scripts/check-image-sizes.js

echo "📦 部署檢查完成！"
```

### 🚀 自動化部署流程

整合到 GitHub Actions 的完整部署流程：

1. **程式碼檢查** → ESLint + TypeScript
2. **圖片優化** → WebP 轉換
3. **SEO 驗證** → Meta 標籤、結構化資料
4. **效能測試** → Lighthouse 檢查
5. **建置輸出** → 靜態檔案生成
6. **部署發布** → GitHub Pages 更新

### 📊 部署後驗證

```javascript
// scripts/post-deploy-check.js
async function postDeployCheck() {
  const siteUrl = 'https://ddd-tw-conference.github.io/2025'
  
  console.log('🔍 部署後驗證...')
  
  try {
    // 1. 檢查網站可訪問性
    const response = await fetch(siteUrl)
    if (!response.ok) {
      throw new Error(`網站無法訪問: ${response.status}`)
    }
    console.log('✅ 網站可正常訪問')
    
    // 2. 檢查關鍵頁面
    const pages = ['/', '/speakers', '/tickets', '/agenda']
    for (const page of pages) {
      const pageResponse = await fetch(`${siteUrl}${page}`)
      if (pageResponse.ok) {
        console.log(`✅ ${page} 頁面正常`)
      } else {
        console.log(`❌ ${page} 頁面異常`)
      }
    }
    
    // 3. 檢查 sitemap
    const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`)
    if (sitemapResponse.ok) {
      console.log('✅ Sitemap 正常')
    } else {
      console.log('❌ Sitemap 異常')
    }
    
    console.log('🎉 部署驗證完成！')
    
  } catch (error) {
    console.error('❌ 部署驗證失敗:', error)
    process.exit(1)
  }
}

postDeployCheck()
```

---

**下一章：** [第9章：維護手冊](./09-maintenance.md) - 日常維護任務、故障排除、系統更新流程

**回到目錄：** [README.md](./README.md) - 完整文檔導覽
