// 效能最佳化配置
export const PERFORMANCE_CONFIG = {
  // 圖片最佳化設定
  images: {
    // 支援的圖片格式 (按優先順序)
    supportedFormats: ['avif', 'webp', 'jpeg', 'png'] as const,
    
    // 響應式圖片尺寸
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      large: 1280
    },
    
    // 圖片品質設定
    quality: {
      low: 50,      // 佔位符或縮圖
      medium: 75,   // 一般內容圖片
      high: 90,     // 重要圖片
      lossless: 100 // 特殊需求
    },
    
    // 延遲載入設定
    lazy: {
      rootMargin: '100px',  // 提前100px載入
      threshold: 0.1        // 當10%可見時載入
    }
  },

  // 快取策略
  cache: {
    // 靜態資源快取時間 (秒)
    static: {
      images: 31536000,      // 1年
      css: 31536000,         // 1年
      js: 31536000,          // 1年
      fonts: 31536000        // 1年
    },
    
    // API 快取時間
    api: {
      conference: 3600,      // 1小時
      speakers: 1800,        // 30分鐘
      agenda: 900           // 15分鐘
    },
    
    // 瀏覽器快取策略
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff'
    }
  },

  // Core Web Vitals 目標值
  webVitals: {
    // 最大內容繪製 (毫秒)
    LCP: {
      good: 2500,
      needsImprovement: 4000
    },
    
    // 首次輸入延遲 (毫秒)
    FID: {
      good: 100,
      needsImprovement: 300
    },
    
    // 累積版面位移
    CLS: {
      good: 0.1,
      needsImprovement: 0.25
    },
    
    // 首次內容繪製 (毫秒)
    FCP: {
      good: 1800,
      needsImprovement: 3000
    },
    
    // 首位元組時間 (毫秒)
    TTFB: {
      good: 800,
      needsImprovement: 1800
    },
    
    // 互動至下一個繪製 (毫秒)
    INP: {
      good: 200,
      needsImprovement: 500
    }
  },

  // 預載入策略
  preload: {
    // 關鍵資源
    critical: [
      '/images/logos/dddtw-logo.png',
      '/images/speakers/'
    ],
    
    // 字體預載入
    fonts: [
      'GeistSans',
      'GeistMono'
    ],
    
    // 路由預載入
    routes: [
      '/',
      '/speakers',
      '/agenda',
      '/tickets'
    ]
  },

  // 程式碼分割設定
  codeSplitting: {
    // 頁面層級分割
    pageLevel: true,
    
    // 元件層級分割
    componentLevel: {
      // 大型元件延遲載入
      lazyComponents: [
        'PerformanceDashboard',
        'SpeakerModal'
      ]
    },
    
    // 第三方套件分割
    vendor: {
      // 分離的套件
      separate: [
        'react',
        'react-dom',
        'next'
      ]
    }
  },

  // 資源提示
  resourceHints: {
    // DNS 預取
    dnsPrefetch: [
      '//fonts.googleapis.com',
      '//www.google-analytics.com'
    ],
    
    // 連線預連結
    preconnect: [
      'https://fonts.gstatic.com'
    ],
    
    // 模組預載入
    modulePreload: [
      '/lib/web-vitals.js',
      '/lib/conference.js'
    ]
  },

  // 漸進式增強
  progressive: {
    // 服務工作者
    serviceWorker: {
      enabled: true,
      scope: '/',
      updateViaCache: 'imports'
    },
    
    // 離線支援
    offline: {
      fallback: '/offline.html',
      cache: ['/', '/speakers', '/agenda']
    },
    
    // 應用程式清單
    manifest: {
      name: 'DDDTW 2025',
      shortName: 'DDDTW2025',
      display: 'minimal-ui',
      orientation: 'portrait'
    }
  },

  // 效能監控
  monitoring: {
    // 採樣率 (0-1)
    sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
    
    // 監控的指標
    metrics: ['LCP', 'FID', 'CLS', 'FCP', 'TTFB', 'INP'],
    
    // 報告端點
    endpoint: process.env.ANALYTICS_ENDPOINT || null,
    
    // 本地儲存
    localStorage: {
      key: 'dddtw-web-vitals',
      maxRecords: 50
    }
  }
} as const

// 取得響應式圖片 srcSet
export function generateImageSrcSet(
  imagePath: string,
  sizes: number[] = [640, 768, 1024, 1280]
): string {
  return sizes
    .map(size => `${imagePath}?w=${size}&q=75 ${size}w`)
    .join(', ')
}

// 取得最佳化的圖片 URL
export function getOptimizedImageUrl(
  imagePath: string,
  options: {
    width?: number
    height?: number
    quality?: keyof typeof PERFORMANCE_CONFIG.images.quality
    format?: 'avif' | 'webp' | 'jpeg' | 'png'
  } = {}
): string {
  const params = new URLSearchParams()
  
  if (options.width) params.append('w', options.width.toString())
  if (options.height) params.append('h', options.height.toString())
  if (options.quality) {
    const qualityValue = PERFORMANCE_CONFIG.images.quality[options.quality]
    params.append('q', qualityValue.toString())
  }
  if (options.format) params.append('f', options.format)
  
  const queryString = params.toString()
  return queryString ? `${imagePath}?${queryString}` : imagePath
}

// 檢查瀏覽器支援的圖片格式
export function getSupportedImageFormat(): 'avif' | 'webp' | 'jpeg' {
  if (typeof window === 'undefined') return 'jpeg'
  
  // 檢查 AVIF 支援
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  if (canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
    return 'avif'
  }
  
  // 檢查 WebP 支援
  if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
    return 'webp'
  }
  
  return 'jpeg'
}
