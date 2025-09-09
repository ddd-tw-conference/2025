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

## 📦 靜態匯出最佳化

### 🔧 Next.js 靜態匯出配置

#### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true // 靜態匯出時必須啟用
  },
  outputFileTracingRoot: __dirname, // 確保正確的檔案追蹤
  
  // 建置最佳化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // 實驗性功能
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },
  
  // 重寫規則（GitHub Pages 相容）
  async rewrites() {
    return []
  },
  
  // 標頭設定
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

### 📊 建置大小監控

#### scripts/bundle-analyzer.js
```javascript
// 套件大小分析腳本
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function analyzeBundleSize() {
  console.log('📊 分析套件大小...')
  
  // 執行建置
  execSync('pnpm build', { stdio: 'inherit' })
  
  // 分析 .next 目錄
  const buildDir = path.join(__dirname, '../.next')
  const staticDir = path.join(buildDir, 'static')
  
  if (!fs.existsSync(staticDir)) {
    console.error('❌ 建置目錄不存在')
    return
  }
  
  const sizes = {}
  
  // 分析 JavaScript 檔案
  const jsDir = path.join(staticDir, 'chunks')
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir, { recursive: true })
      .filter(file => file.endsWith('.js'))
    
    jsFiles.forEach(file => {
      const filePath = path.join(jsDir, file)
      const stats = fs.statSync(filePath)
      sizes[`js/${file}`] = {
        size: stats.size,
        sizeKB: Math.round(stats.size / 1024 * 100) / 100
      }
    })
  }
  
  // 分析 CSS 檔案
  const cssDir = path.join(staticDir, 'css')
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir)
      .filter(file => file.endsWith('.css'))
    
    cssFiles.forEach(file => {
      const filePath = path.join(cssDir, file)
      const stats = fs.statSync(filePath)
      sizes[`css/${file}`] = {
        size: stats.size,
        sizeKB: Math.round(stats.size / 1024 * 100) / 100
      }
    })
  }
  
  // 產生報告
  console.log('\n📋 套件大小報告:')
  console.log('=' .repeat(60))
  
  const sorted = Object.entries(sizes)
    .sort(([,a], [,b]) => b.size - a.size)
  
  let totalSize = 0
  sorted.forEach(([file, data]) => {
    console.log(`${file.padEnd(40)} ${data.sizeKB.toString().padStart(8)} KB`)
    totalSize += data.size
  })
  
  console.log('=' .repeat(60))
  console.log(`總計: ${Math.round(totalSize / 1024 * 100) / 100} KB`)
  
  // 大小警告
  const totalKB = totalSize / 1024
  if (totalKB > 500) {
    console.log('⚠️  警告: 套件大小超過 500KB，考慮程式碼分割')
  } else if (totalKB > 300) {
    console.log('💡 建議: 套件大小接近 300KB，注意效能')
  } else {
    console.log('✅ 套件大小在合理範圍內')
  }
  
  // 儲存報告
  const report = {
    timestamp: new Date().toISOString(),
    totalSizeKB: Math.round(totalKB * 100) / 100,
    files: sorted.map(([file, data]) => ({
      file,
      sizeKB: data.sizeKB
    }))
  }
  
  fs.writeFileSync(
    path.join(__dirname, '../.next/bundle-analysis.json'),
    JSON.stringify(report, null, 2)
  )
  
  console.log('\n📁 報告已儲存至 .next/bundle-analysis.json')
}

// 效能閾值檢查
function checkPerformanceThresholds() {
  const analysisPath = path.join(__dirname, '../.next/bundle-analysis.json')
  
  if (!fs.existsSync(analysisPath)) {
    console.log('⚠️  找不到套件分析報告，請先執行分析')
    return
  }
  
  const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'))
  
  console.log('\n🎯 效能閾值檢查:')
  
  // JavaScript 大小檢查
  const jsFiles = analysis.files.filter(f => f.file.startsWith('js/'))
  const totalJSSize = jsFiles.reduce((sum, f) => sum + f.sizeKB, 0)
  
  console.log(`JavaScript 總大小: ${totalJSSize} KB`)
  if (totalJSSize > 300) {
    console.log('❌ JavaScript 過大 (>300KB)')
  } else {
    console.log('✅ JavaScript 大小正常')
  }
  
  // CSS 大小檢查
  const cssFiles = analysis.files.filter(f => f.file.startsWith('css/'))
  const totalCSSSize = cssFiles.reduce((sum, f) => sum + f.sizeKB, 0)
  
  console.log(`CSS 總大小: ${totalCSSSize} KB`)
  if (totalCSSSize > 50) {
    console.log('❌ CSS 過大 (>50KB)')
  } else {
    console.log('✅ CSS 大小正常')
  }
  
  // 單一檔案大小檢查
  const largeFiles = analysis.files.filter(f => f.sizeKB > 100)
  if (largeFiles.length > 0) {
    console.log('\n⚠️  發現大型檔案:')
    largeFiles.forEach(f => {
      console.log(`  ${f.file}: ${f.sizeKB} KB`)
    })
  }
}

// 主要執行
if (require.main === module) {
  analyzeBundleSize()
  checkPerformanceThresholds()
}

module.exports = { analyzeBundleSize, checkPerformanceThresholds }
```

### 🚀 GitHub Pages 部署自動化

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
        
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Generate version file
        run: |
          echo "{
            \"version\": \"${{ github.sha }}\",
            \"buildTime\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
            \"branch\": \"${{ github.ref_name }}\"
          }" > public/version.json
          
      - name: Run build checks
        run: |
          pnpm lint
          pnpm type-check
          node scripts/check-translations.js
          
      - name: Build application
        run: pnpm build
        
      - name: Bundle size analysis
        run: node scripts/bundle-analyzer.js
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: out/
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload to GitHub Pages
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

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
        uses: actions/deploy-pages@v3
```

### 📈 部署後驗證腳本

#### scripts/post-deploy-check.js
```javascript
// 部署後健康檢查
const https = require('https')
const http = require('http')

const SITE_URL = 'https://dddtaiwan.github.io/2025'

async function checkSiteHealth() {
  console.log('🔍 執行部署後健康檢查...')
  
  const checks = [
    checkHomePage,
    checkCriticalPages,
    checkAssets,
    checkSEO,
    checkPerformance
  ]
  
  const results = []
  
  for (const check of checks) {
    try {
      const result = await check()
      results.push(result)
      console.log(`${result.passed ? '✅' : '❌'} ${result.name}`)
      if (result.details) {
        console.log(`   ${result.details}`)
      }
    } catch (error) {
      results.push({
        name: check.name,
        passed: false,
        error: error.message
      })
      console.log(`❌ ${check.name}: ${error.message}`)
    }
  }
  
  const passed = results.filter(r => r.passed).length
  const total = results.length
  
  console.log(`\n📊 檢查結果: ${passed}/${total} 通過`)
  
  if (passed === total) {
    console.log('🎉 部署成功，所有檢查通過！')
  } else {
    console.log('⚠️  部分檢查失敗，請檢查問題')
    process.exit(1)
  }
}

async function checkHomePage() {
  return new Promise((resolve, reject) => {
    const req = https.get(SITE_URL, (res) => {
      if (res.statusCode === 200) {
        resolve({
          name: 'Homepage Accessibility',
          passed: true,
          details: `Status: ${res.statusCode}`
        })
      } else {
        resolve({
          name: 'Homepage Accessibility',
          passed: false,
          details: `Status: ${res.statusCode}`
        })
      }
    })
    
    req.on('error', (err) => {
      resolve({
        name: 'Homepage Accessibility',
        passed: false,
        error: err.message
      })
    })
    
    req.setTimeout(10000, () => {
      req.destroy()
      resolve({
        name: 'Homepage Accessibility',
        passed: false,
        error: 'Timeout'
      })
    })
  })
}

async function checkCriticalPages() {
  const criticalPages = [
    '/speakers/',
    '/agenda/',
    '/tickets/',
    '/about/'
  ]
  
  let allPassed = true
  const details = []
  
  for (const page of criticalPages) {
    try {
      const url = `${SITE_URL}${page}`
      const result = await checkPageAvailability(url)
      if (!result) allPassed = false
      details.push(`${page}: ${result ? '✅' : '❌'}`)
    } catch (error) {
      allPassed = false
      details.push(`${page}: ❌ ${error.message}`)
    }
  }
  
  return {
    name: 'Critical Pages',
    passed: allPassed,
    details: details.join(', ')
  }
}

async function checkPageAvailability(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve(res.statusCode === 200)
    })
    
    req.on('error', () => resolve(false))
    req.setTimeout(5000, () => {
      req.destroy()
      resolve(false)
    })
  })
}

async function checkAssets() {
  const assetUrls = [
    `${SITE_URL}/version.json`,
    `${SITE_URL}/favicon.ico`,
    `${SITE_URL}/robots.txt`
  ]
  
  let allPassed = true
  const details = []
  
  for (const url of assetUrls) {
    try {
      const available = await checkPageAvailability(url)
      if (!available) allPassed = false
      const fileName = url.split('/').pop()
      details.push(`${fileName}: ${available ? '✅' : '❌'}`)
    } catch (error) {
      allPassed = false
    }
  }
  
  return {
    name: 'Static Assets',
    passed: allPassed,
    details: details.join(', ')
  }
}

async function checkSEO() {
  return new Promise((resolve) => {
    https.get(SITE_URL, (res) => {
      let html = ''
      
      res.on('data', (chunk) => {
        html += chunk
      })
      
      res.on('end', () => {
        const checks = [
          html.includes('<title>'),
          html.includes('meta name="description"'),
          html.includes('meta property="og:title"'),
          html.includes('application/ld+json')
        ]
        
        const passed = checks.every(Boolean)
        
        resolve({
          name: 'SEO Elements',
          passed,
          details: `${checks.filter(Boolean).length}/${checks.length} elements found`
        })
      })
    }).on('error', () => {
      resolve({
        name: 'SEO Elements',
        passed: false,
        error: 'Failed to fetch HTML'
      })
    })
  })
}

async function checkPerformance() {
  const startTime = Date.now()
  
  return new Promise((resolve) => {
    https.get(SITE_URL, (res) => {
      const endTime = Date.now()
      const loadTime = endTime - startTime
      
      resolve({
        name: 'Performance',
        passed: loadTime < 3000,
        details: `Load time: ${loadTime}ms`
      })
    }).on('error', () => {
      resolve({
        name: 'Performance',
        passed: false,
        error: 'Failed to measure performance'
      })
    })
  })
}

checkSiteHealth().catch(console.error)
```

### 🔄 版本管理與快取控制

#### scripts/generate-version.js
```javascript
// 版本檔案生成腳本
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

function generateVersionFile() {
  console.log('📝 生成版本檔案...')
  
  const buildTime = new Date().toISOString()
  const gitHash = process.env.GITHUB_SHA || 'dev-build'
  const branch = process.env.GITHUB_REF_NAME || 'local'
  
  // 計算內容雜湊
  const buildDir = path.join(__dirname, '../out')
  let contentHash = 'unknown'
  
  if (fs.existsSync(buildDir)) {
    const files = getAllFiles(buildDir)
    const hasher = crypto.createHash('sha256')
    
    files.forEach(file => {
      const content = fs.readFileSync(file)
      hasher.update(content)
    })
    
    contentHash = hasher.digest('hex').substring(0, 8)
  }
  
  const version = {
    version: gitHash.substring(0, 8),
    buildTime,
    branch,
    contentHash,
    environment: process.env.NODE_ENV || 'development',
    generator: 'DDD Taiwan 2025 Build System'
  }
  
  // 寫入版本檔案
  const versionPath = path.join(__dirname, '../public/version.json')
  fs.writeFileSync(versionPath, JSON.stringify(version, null, 2))
  
  console.log('✅ 版本檔案已生成')
  console.log(`   版本: ${version.version}`)
  console.log(`   建置時間: ${version.buildTime}`)
  console.log(`   內容雜湊: ${version.contentHash}`)
  
  return version
}

function getAllFiles(dir) {
  const files = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...getAllFiles(fullPath))
    } else {
      files.push(fullPath)
    }
  }
  
  return files
}

if (require.main === module) {
  generateVersionFile()
}

module.exports = { generateVersionFile }
```
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
