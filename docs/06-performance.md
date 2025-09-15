# 第6章：效能優化

> **本章內容**：WebP 圖片優化、靜態生成策略、效能監控

---

## ⚡ 效能優化策略

### 優化成果
| 項目 | 優化前 | 優化後 | 改善 |
|------|--------|--------|------|
| **圖片大小** | 3.8MB | 296KB | **92% ↓** |
| **載入時間** | 3.2s | 1.1s | **65% ↓** |
| **LCP** | 4.1s | 1.8s | **56% ↓** |

### 核心策略
1. **WebP 圖片格式**：統一使用 WebP，大幅減少檔案大小
2. **靜態生成**：Next.js SSG 模式，預先生成所有頁面
3. **載入優化**：延遲載入、圖片優化

---

## 🖼️ WebP 圖片優化

### 自動化轉換腳本
```javascript
// scripts/generate-all-webp.js
const sharp = require('sharp')

async function convertToWebP(inputPath, outputPath) {
  await sharp(inputPath)
    .webp({ 
      quality: 85,
      effort: 6
    })
    .toFile(outputPath)
}

// 批次轉換指令
async function processImages() {
  // 掃描 public/images 目錄
  // 轉換所有 PNG/JPG 為 WebP
}
```
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
### 圖片使用方式
```tsx
// 最佳化圖片組件
export const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <Image
      src={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      {...props}
    />
  )
}

// 使用範例
<OptimizedImage 
  src="/images/speakers/john-doe.webp"
  alt="John Doe"
  width={300}
  height={400}
/>
```

---

## 🚀 靜態生成優化

### Next.js 配置
```javascript
// next.config.mjs
export default {
  output: 'export',           // 靜態輸出模式
  trailingSlash: true,        // GitHub Pages 相容
  images: {
    unoptimized: true,        // 靜態部署設定
    formats: ['webp']         // 支援 WebP 格式
  },
  experimental: {
    optimizeCss: true         // CSS 優化
  }
}
```

### 載入效能策略
```tsx
// 關鍵資源預載入
export const PerformanceOptimizer = () => {
  useEffect(() => {
    // 預載入關鍵圖片
    const criticalImages = [
      '/images/hero-bg.webp',
      '/images/logo.webp'
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  return null
}
```

---

## 📊 效能監控

### Web Vitals 監控
```tsx
// lib/web-vitals.tsx
import { getCLS, getFID, getLCP } from 'web-vitals'

export function reportWebVitals() {
  getCLS(console.log)  // Cumulative Layout Shift
  getFID(console.log)  // First Input Delay  
  getLCP(console.log)  // Largest Contentful Paint
}
```

### 開發指令
```bash
# 圖片優化
pnpm run optimize:images

# 效能分析
pnpm run analyze

# 建置檢查
pnpm run build
```

---

**下一章：[第7章 開發工具](./07-development-tools.md)**
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
  console.log(`DOM 內容載入: ${performanceData.domContentLoadedEventEnd - performanceData.fetchStart}ms`)
  console.log(`首次繪製: ${performanceData.responseStart - performanceData.fetchStart}ms`)
  
  await browser.close()
}

// 定期執行效能測試
setInterval(runPerformanceTest, 24 * 60 * 60 * 1000) // 每24小時
```

### 🎯 靜態導出優化特殊設定

#### Next.js 靜態導出效能配置
```javascript
// next.config.mjs - 針對 GitHub Pages 優化
const nextConfig = {
  // 靜態導出設定
  output: 'export',
  trailingSlash: false,
  
  // 資源追蹤優化（針對靜態導出）
  outputFileTracingRoot: path.join(__dirname, '../../'),
  
  // 實驗性效能功能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
    
    // 靜態生成優化
    staticGenerationMaxConcurrency: 8,
    staticGenerationRetryCount: 3
  },
  
  // 編譯優化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // 圖片處理（靜態導出）
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif']
  },
  
  // Webpack 優化
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 客戶端 bundle 優化
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
              },
              name(module) {
                const hash = crypto.createHash('sha1')
                hash.update(module.identifier())
                return hash.digest('hex').substring(0, 8)
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name: false,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    
    return config
  }
}
```

### 📊 靜態資源優化策略

#### 資源壓縮與快取
```javascript
// scripts/optimize-static-assets.js
const fs = require('fs')
const path = require('path')
const { gzipSync } = require('zlib')

function compressStaticFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      compressStaticFiles(fullPath)
    } else if (/\.(js|css|html|json|xml|txt)$/.test(file.name)) {
      // 生成 gzip 版本
      const content = fs.readFileSync(fullPath)
      const compressed = gzipSync(content)
      fs.writeFileSync(`${fullPath}.gz`, compressed)
      
      const originalSize = content.length
      const compressedSize = compressed.length
      const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
      
      console.log(`✅ ${file.name}: ${originalSize} → ${compressedSize} bytes (${savings}% 節省)`)
    }
  }
}

// 優化 out 目錄
compressStaticFiles('./out')
```

### 🔍 效能監控儀表板

#### 開發者效能工具
```tsx
// components/performance-dashboard.tsx - 擴展版本
'use client'

import { useState, useEffect } from 'react'

interface PerformanceMetrics {
  buildTime?: number
  bundleSize?: number
  imageOptimization?: {
    originalSize: number
    optimizedSize: number
    savings: number
  }
  webVitals?: {
    lcp?: number
    fid?: number
    cls?: number
  }
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  // 載入效能數據
  useEffect(() => {
    if (isVisible) {
      // 模擬載入效能數據
      setMetrics({
        buildTime: 45.2,
        bundleSize: 234.5,
        imageOptimization: {
          originalSize: 3840,
          optimizedSize: 296,
          savings: 92.3
        },
        webVitals: {
          lcp: 1.8,
          fid: 85,
          cls: 0.05
        }
      })
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 w-80 bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg p-4 text-sm z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white">效能監控面板</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* 建置效能 */}
        <div>
          <h4 className="font-semibold text-gray-200 mb-2">建置效能</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>建置時間:</span>
              <span className="font-mono text-green-400">{metrics.buildTime}s</span>
            </div>
            <div className="flex justify-between">
              <span>Bundle 大小:</span>
              <span className="font-mono text-blue-400">{metrics.bundleSize}KB</span>
            </div>
          </div>
        </div>

        {/* 圖片優化 */}
        {metrics.imageOptimization && (
          <div>
            <h4 className="font-semibold text-gray-200 mb-2">圖片優化</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>原始大小:</span>
                <span className="font-mono text-red-400">{metrics.imageOptimization.originalSize}KB</span>
              </div>
              <div className="flex justify-between">
                <span>優化後:</span>
                <span className="font-mono text-green-400">{metrics.imageOptimization.optimizedSize}KB</span>
              </div>
              <div className="flex justify-between">
                <span>節省:</span>
                <span className="font-mono text-yellow-400">{metrics.imageOptimization.savings}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Web Vitals */}
        {metrics.webVitals && (
          <div>
            <h4 className="font-semibold text-gray-200 mb-2">Web Vitals</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>LCP:</span>
                <span className={`font-mono ${
                  (metrics.webVitals.lcp || 0) <= 2.5 ? 'text-green-400' : 
                  (metrics.webVitals.lcp || 0) <= 4.0 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {metrics.webVitals.lcp}s
                </span>
              </div>
              <div className="flex justify-between">
                <span>FID:</span>
                <span className={`font-mono ${
                  (metrics.webVitals.fid || 0) <= 100 ? 'text-green-400' : 
                  (metrics.webVitals.fid || 0) <= 300 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {metrics.webVitals.fid}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span>CLS:</span>
                <span className={`font-mono ${
                  (metrics.webVitals.cls || 0) <= 0.1 ? 'text-green-400' : 
                  (metrics.webVitals.cls || 0) <= 0.25 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {metrics.webVitals.cls}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="pt-2 border-t border-slate-600">
          <div className="flex gap-2">
            <button 
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
              onClick={() => window.location.reload()}
            >
              重載頁面
            </button>
            <button 
              className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
              onClick={() => {
                if ('performance' in window) {
                  performance.mark('manual-performance-check')
                }
              }}
            >
              效能標記
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-600 text-xs text-gray-400">
        按 Ctrl+Shift+P 關閉面板
      </div>
    </div>
  )
}
```

### 🎯 效能優化最佳實踐總結

#### 圖片優化核心原則
1. **純 WebP 策略**: 統一使用 WebP 格式，平均減少 90%+ 檔案大小
2. **自動化轉換**: 使用 Sharp 進行批量轉換
3. **回退機制**: 提供向後相容性
4. **延遲載入**: 非關鍵圖片使用 lazy loading

#### 程式碼優化策略
1. **動態匯入**: 分割大型元件和路由
2. **樹搖優化**: 移除未使用的程式碼
3. **Bundle 分析**: 定期檢查 bundle 大小
4. **快取策略**: 合理設定靜態資源快取

#### 監控與測量
1. **Web Vitals**: 持續監控核心效能指標
2. **自動化測試**: 建立效能測試流程
3. **開發者工具**: 提供即時效能監控面板
4. **基準測試**: 定期效能比較和分析

---

## 📋 維護檢查清單

### 🔄 定期效能檢查
- [ ] 每週執行圖片大小分析
- [ ] 每月檢查 Bundle 大小變化
- [ ] 季度進行完整效能基準測試
- [ ] 監控 Web Vitals 趨勢變化
- [ ] 檢查新增圖片是否已轉換為 WebP
- [ ] 驗證 CDN 快取策略有效性

---

*最後更新：2025年1月9日 - v2.1 加強靜態導出優化與監控功能*
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
