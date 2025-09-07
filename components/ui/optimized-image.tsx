'use client'

import * as React from "react"
import { getOptimizedImageUrl, getSupportedImageFormat, PERFORMANCE_CONFIG } from "@/config"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: "low" | "medium" | "high" | "lossless"
  placeholder?: "blur" | "empty"
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({
    src,
    alt,
    width,
    height,
    className = "",
    priority = false,
    quality = "medium",
    placeholder = "blur",
    sizes,
    onLoad,
    onError,
    ...props
  }, ref) => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [isInView, setIsInView] = React.useState(priority)
  const [bestFormat, setBestFormat] = React.useState<"avif" | "webp" | "jpeg">("jpeg")
  const imgRef = React.useRef<HTMLImageElement>(null)
  const observerRef = React.useRef<IntersectionObserver | null>(null)

  // 合併 refs
  const combinedRef = React.useCallback(
    (node: HTMLImageElement) => {
      if (imgRef.current) imgRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  // 檢測最佳圖片格式
  React.useEffect(() => {
    setBestFormat(getSupportedImageFormat())
  }, [])

  // 設置 Intersection Observer 進行延遲載入
  React.useEffect(() => {
    if (!priority && !isInView) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            setIsInView(true)
            observerRef.current?.disconnect()
          }
        },
        {
          rootMargin: PERFORMANCE_CONFIG.images.lazy.rootMargin,
          threshold: PERFORMANCE_CONFIG.images.lazy.threshold
        }
      )

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current)
      }
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [priority, isInView])

  // 產生響應式圖片 URLs
  const generateSources = () => {
    const formats: Array<"avif" | "webp" | "jpeg"> = ["avif", "webp", "jpeg"]
    const breakpoints = Object.values(PERFORMANCE_CONFIG.images.breakpoints)
    
    return formats.map(format => {
      const srcSet = breakpoints
        .map(bp => {
          const url = getOptimizedImageUrl(src, {
            width: bp,
            quality,
            format
          })
          return `${url} ${bp}w`
        })
        .join(', ')
      
      return { format, srcSet }
    })
  }

  const sources = generateSources()
  const fallbackSrc = getOptimizedImageUrl(src, {
    width: width || PERFORMANCE_CONFIG.images.breakpoints.desktop,
    quality,
    format: bestFormat
  })

  // 處理載入完成
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // 處理載入錯誤
  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // 產生佔位符樣式
  const placeholderStyle = placeholder === "blur" && !isLoaded ? {
    filter: "blur(10px)",
    transform: "scale(1.05)",
    transition: "filter 0.3s ease-out, transform 0.3s ease-out"
  } : {}

  // 如果發生錯誤，顯示替代內容
  if (hasError) {
    return (
      <div 
        ref={ref}
        className={cn(
          "bg-gray-200 dark:bg-gray-700 flex items-center justify-center",
          className
        )}
        style={{ width, height }}
        {...props}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          無法載入圖片
        </span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* 佔位符背景 */}
      {placeholder === "blur" && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      
      {/* 主要圖片 */}
      {(isInView || priority) && (
        <picture>
          {sources.map(({ format, srcSet }) => (
            <source
              key={format}
              type={`image/${format}`}
              srcSet={srcSet}
              sizes={sizes || `(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw`}
            />
          ))}
          <img
            ref={combinedRef}
            src={fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            style={placeholderStyle}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...props}
          />
        </picture>
      )}
      
      {/* 載入指示器 */}
      {!isLoaded && !hasError && (isInView || priority) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
})

OptimizedImage.displayName = "OptimizedImage"

export { OptimizedImage }
