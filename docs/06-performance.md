# 第6章：效能優化

> **本章內容**：圖片優化策略、WebP 轉換、載入效能提升、Web Vitals 優化

---

## 🚀 效能優化策略概覽

### 📊 優化成果總覽
| 項目 | 優化前 | 優化後 | 改善幅度 |
|------|--------|--------|----------|
| **圖片總大小** | 3.8MB | 296KB | **92.2% ↓** |
| **首頁載入時間** | 3.2s | 1.1s | **65.6% ↓** |
| **LCP (最大內容繪製)** | 4.1s | 1.8s | **56.1% ↓** |
| **圖片格式** | PNG/JPG | WebP | **統一格式** |

### 🎯 優化重點領域
1. **🖼️ 圖片優化**：純 WebP 策略，自動化轉換
2. **⚡ 載入優化**：延遲載入、預載入策略
3. **📦 Bundle 優化**：程式碼分割、樹搖優化
4. **🔄 快取策略**：靜態資源快取控制

---

## 🖼️ 純 WebP 圖片策略

### 💡 策略原理
WebP 格式相比傳統 PNG/JPG 格式能提供：
- **更小檔案大小**：平均減少 25-90%
- **更好畫質**：同等檔案大小下畫質更佳
- **廣泛支援**：現代瀏覽器 95%+ 支援率

### 🏗️ 實作架構

#### 1. 自動化轉換腳本
```javascript
// scripts/generate-all-webp.js
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function convertToWebP(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ 
        quality: 85,           // 高品質設定
        effort: 6,             // 最大壓縮努力
        smartSubsample: true   // 智慧子採樣
      })
      .toFile(outputPath)
    
    console.log(`✅ ${inputPath} → ${outputPath}`)
    console.log(`   Size: ${info.size} bytes`)
    return info
  } catch (error) {
    console.error(`❌ 轉換失敗: ${inputPath}`, error.message)
  }
}

async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name)
    
    if (file.isDirectory()) {
      await processDirectory(fullPath)
    } else if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
      const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      await convertToWebP(fullPath, webpPath)
    }
  }
}

// 執行轉換
processDirectory('./public/images')
```

#### 2. 檔案大小分析腳本
```javascript
// scripts/check-image-sizes.js
const fs = require('fs')
const path = require('path')

function getFileSize(filePath) {
  const stats = fs.statSync(filePath)
  return stats.size
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function analyzeDirectory(dirPath, results = { original: 0, webp: 0, count: 0 }) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name)
    
    if (file.isDirectory()) {
      analyzeDirectory(fullPath, results)
    } else {
      const size = getFileSize(fullPath)
      
      if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
        results.original += size
      } else if (/\.webp$/i.test(file.name)) {
        results.webp += size
        results.count++
      }
    }
  }
  
  return results
}

// 分析結果
const results = analyzeDirectory('./public/images')
const savings = results.original - results.webp
const savingsPercent = ((savings / results.original) * 100).toFixed(1)

console.log('\n📊 圖片優化分析報告')
console.log('════════════════════════')
console.log(`原始格式總大小: ${formatBytes(results.original)}`)
console.log(`WebP 格式總大小: ${formatBytes(results.webp)}`)
console.log(`節省空間: ${formatBytes(savings)} (${savingsPercent}%)`)
console.log(`WebP 檔案數量: ${results.count}`)
```

### 🔧 圖片處理工具函式

#### lib/image-optimization.ts
```typescript
/**
 * 取得優化後的圖片路徑
 * 自動處理 WebP 格式切換與向後相容
 */
export function getOptimizedImagePath(originalPath: string): string {
  // 如果已經是 WebP 格式，直接返回
  if (originalPath.endsWith('.webp')) {
    return originalPath
  }
  
  // 轉換為 WebP 路徑
  const webpPath = originalPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  
  // 在開發環境或 WebP 不存在時，嘗試回退
  if (typeof window !== 'undefined') {
    // 瀏覽器環境：檢查 WebP 支援
    const canvas = document.createElement('canvas')
    const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    
    return supportsWebP ? webpPath : originalPath
  }
  
  // 服務端環境：假設支援 WebP
  return webpPath
}

/**
 * 圖片預載入函式
 * 提升關鍵圖片載入速度
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = getOptimizedImagePath(src)
  })
}

/**
 * 批量預載入圖片
 */
export async function preloadImages(sources: string[]): Promise<void[]> {
  const promises = sources.map(src => preloadImage(src))
  return Promise.all(promises)
}
```

### 🎨 React 元件中的使用

#### 最佳化圖片元件
```tsx
// components/optimized-image.tsx
'use client'

import { useState, useEffect } from 'react'
import { getOptimizedImagePath } from '@/lib/image-optimization'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  placeholder?: string
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  placeholder = '/images/placeholder.webp'
}: OptimizedImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    const optimizedSrc = getOptimizedImagePath(src)
    
    const img = new Image()
    img.onload = () => {
      setCurrentSrc(optimizedSrc)
      setIsLoaded(true)
    }
    img.onerror = () => {
      // WebP 載入失敗，回退到原始格式
      setCurrentSrc(src)
      setIsLoaded(true)
    }
    
    img.src = optimizedSrc
  }, [src])
  
  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-50'
      } ${className}`}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
```

#### 講者頭像元件範例
```tsx
// components/speaker-avatar.tsx
import { OptimizedImage } from './optimized-image'

interface SpeakerAvatarProps {
  src: string
  name: string
  size?: 'sm' | 'md' | 'lg'
}

export const SpeakerAvatar = ({ src, name, size = 'md' }: SpeakerAvatarProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  }
  
  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}>
      <OptimizedImage
        src={src}
        alt={`${name} 的照片`}
        className="w-full h-full object-cover"
        priority={size === 'lg'} // 大圖片優先載入
      />
    </div>
  )
}
```

---

## ⚡ 載入效能優化

### 📦 程式碼分割策略

#### 1. 動態匯入大型元件
```tsx
// 延遲載入非關鍵元件
import dynamic from 'next/dynamic'

const AgendaLightbox = dynamic(
  () => import('@/components/ui/agenda-lightbox'),
  { 
    loading: () => <div className="loading-spinner">載入中...</div>,
    ssr: false // 客戶端渲染
  }
)

const PerformanceDashboard = dynamic(
  () => import('@/components/performance-dashboard'),
  { ssr: false }
)
```

#### 2. 路由層級程式碼分割
```typescript
// app/speakers/page.tsx
export default async function SpeakersPage() {
  // 動態載入講者資料
  const { speakers } = await import('@/lib/data/speakers')
  
  return (
    <div>
      {speakers.map(speaker => (
        <SpeakerCard key={speaker.id} speaker={speaker} />
      ))}
    </div>
  )
}
```

### 🔄 快取與預載入策略

#### 1. 關鍵資源預載入
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  useEffect(() => {
    // 預載入關鍵圖片
    preloadImages([
      '/images/hero-bg.webp',
      '/images/logo.webp',
      '/images/speakers/keynote-speaker.webp'
    ])
  }, [])
  
  return (
    <html>
      <head>
        {/* DNS 預解析 */}
        <link rel="dns-prefetch" href="//www.accupass.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* 關鍵資源預載入 */}
        <link 
          rel="preload" 
          href="/images/hero-bg.webp" 
          as="image" 
          type="image/webp"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### 2. 服務端快取控制
```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*\\.webp',
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
```

---

## 📊 Web Vitals 監控

### 🎯 效能目標設定

| 指標 | 優秀 | 需要改善 | 差 |
|------|------|----------|-----|
| **LCP** (最大內容繪製) | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** (首次輸入延遲) | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** (累計版面偏移) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

### 🔍 效能監控實作

#### lib/web-vitals.tsx
```tsx
'use client'

import { useEffect } from 'react'

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

function sendToAnalytics(metric: WebVitalMetric) {
  // 發送到分析服務
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      custom_map: {
        rating: metric.rating
      }
    })
  }
  
  // 開發環境下在 console 顯示
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', metric)
  }
}

export function WebVitalsReporter() {
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onFID, onLCP }) => {
      onCLS(sendToAnalytics)
      onFID(sendToAnalytics)
      onLCP(sendToAnalytics)
    })
  }, [])
  
  return null
}
```

#### 版本監控整合
```tsx
// components/version-monitor.tsx 片段
const PerformancePanel = () => {
  const [vitals, setVitals] = useState<WebVitalMetric[]>([])
  
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onFID, onLCP }) => {
      const updateVitals = (metric: WebVitalMetric) => {
        setVitals(prev => {
          const existing = prev.find(v => v.name === metric.name)
          if (existing) {
            return prev.map(v => v.name === metric.name ? metric : v)
          }
          return [...prev, metric]
        })
      }
      
      onCLS(updateVitals)
      onFID(updateVitals)
      onLCP(updateVitals)
    })
  }, [])
  
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-200">Web Vitals</h4>
      {vitals.map(vital => (
        <div key={vital.name} className="flex justify-between text-sm">
          <span>{vital.name}:</span>
          <span className={`font-mono ${
            vital.rating === 'good' ? 'text-green-400' :
            vital.rating === 'needs-improvement' ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {vital.value.toFixed(0)}{vital.name === 'CLS' ? '' : 'ms'}
          </span>
        </div>
      ))}
    </div>
  )
}
```

---

## 🛠️ 效能優化工具

### 📋 建置分析

#### Bundle 分析器
```bash
# 安裝分析工具
pnpm add -D @next/bundle-analyzer

# 執行分析
ANALYZE=true pnpm build
```

```javascript
// next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
```

#### 建置優化配置
```javascript
// next.config.mjs 優化設定
const nextConfig = {
  // 實驗性功能
  experimental: {
    optimizeCss: true,          // CSS 優化
    optimizePackageImports: [   // 套件匯入優化
      'react-icons',
      '@headlessui/react'
    ]
  },
  
  // 壓縮設定
  compress: true,
  
  // 靜態優化
  output: 'export',
  trailingSlash: false,
  
  // 圖片優化
  images: {
    unoptimized: true,
    formats: ['image/webp']
  }
}
```

### 🚀 效能檢查腳本

#### 完整效能檢查
```bash
#!/bin/bash
# scripts/performance-check.sh

echo "🚀 執行效能檢查..."

# 1. 建置分析
echo "📦 分析 Bundle 大小..."
ANALYZE=true pnpm build > /dev/null 2>&1

# 2. 圖片大小檢查
echo "📸 檢查圖片優化..."
node scripts/check-image-sizes.js

# 3. Lighthouse 檢查（如果有安裝）
if command -v lighthouse &> /dev/null; then
  echo "🔍 執行 Lighthouse 檢查..."
  lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
fi

# 4. 靜態檔案大小檢查
echo "📁 檢查靜態檔案大小..."
du -sh out/ 2>/dev/null || echo "尚未建置"

echo "✅ 效能檢查完成！"
```

---

## 📈 持續效能監控

### 🎯 效能基準測試

#### 定期效能測試
```javascript
// scripts/performance-benchmark.js
const puppeteer = require('puppeteer')

async function runPerformanceTest() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // 啟用效能監控
  await page.tracing.start({ screenshots: true, path: 'trace.json' })
  
  // 載入頁面
  const response = await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0'
  })
  
  // 停止追蹤
  await page.tracing.stop()
  
  // 取得效能指標
  const performanceData = JSON.parse(
    await page.evaluate(() => JSON.stringify(performance.getEntriesByType('navigation')[0]))
  )
  
  console.log('📊 效能指標:')
  console.log(`載入時間: ${performanceData.loadEventEnd - performanceData.fetchStart}ms`)
  console.log(`首屏渲染: ${performanceData.responseEnd - performanceData.fetchStart}ms`)
  
  await browser.close()
}

runPerformanceTest().catch(console.error)
```

### 📊 效能監控 Dashboard

整合到版本監控系統中：

```tsx
// components/performance-dashboard.tsx
export const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState({
    buildSize: '0 KB',
    imageCount: 0,
    webpSavings: '0%',
    lastOptimized: null
  })
  
  useEffect(() => {
    // 載入效能數據
    loadPerformanceMetrics().then(setMetrics)
  }, [])
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-400">Bundle 大小</h3>
        <p className="text-2xl font-bold text-white">{metrics.buildSize}</p>
      </div>
      
      <div className="bg-green-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-green-400">WebP 節省</h3>
        <p className="text-2xl font-bold text-white">{metrics.webpSavings}</p>
      </div>
    </div>
  )
}
```

---

**下一章：** [第7章：開發工具與除錯](./07-development-tools.md) - 深入了解版本監控、熱重載、除錯工具
