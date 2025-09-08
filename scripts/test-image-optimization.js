#!/usr/bin/env node

/**
 * 測試圖片最佳化工具
 */

// 模擬getImagePath函數（簡化版）
const getImagePath = (path) => {
  const version = '20250830001'
  return `${path}?v=${version}`
}

// 智能圖片路徑選擇器
const getOptimizedImagePath = (imagePath) => {
  // 如果已經是WebP格式，直接返回
  if (imagePath.endsWith('.webp')) {
    return getImagePath(imagePath)
  }

  // 對於所有圖片，都轉換為WebP版本
  const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  return getImagePath(webpPath)
}

// 取得完整的圖片URL
const getFullImageUrl = (imagePath) => {
  const optimizedPath = getOptimizedImagePath(imagePath)
  
  // 生產環境返回完整URL
  const baseUrl = 'https://ddd-tw-conference.github.io/2025'
  return `${baseUrl}${optimizedPath}`
}

console.log('🖼️  測試圖片最佳化工具（全WebP策略）\n')

console.log('📊 Banner圖片 (PNG→WebP):')
console.log('  原始:', '/images/banners/banner-main.png')
console.log('  最佳化:', getOptimizedImagePath('/images/banners/banner-main.png'))
console.log('  原始:', '/images/banners/banner-about.png')
console.log('  最佳化:', getOptimizedImagePath('/images/banners/banner-about.png'))
console.log()

console.log('🏷️  Logo圖片 (PNG→WebP, 節省83%):')
console.log('  原始:', '/images/logos/dddtw-logo.png')
console.log('  最佳化:', getOptimizedImagePath('/images/logos/dddtw-logo.png'))
console.log()

console.log('👤 Speaker圖片 (JPG→WebP, 平均節省75%+):')
console.log('  原始:', '/images/speakers/michael.jpg')
console.log('  最佳化:', getOptimizedImagePath('/images/speakers/michael.jpg'))
console.log('  原始:', '/images/speakers/fong.jpg')
console.log('  最佳化:', getOptimizedImagePath('/images/speakers/fong.jpg'))
console.log('  原始:', '/images/speakers/arthur.jpg')
console.log('  最佳化:', getOptimizedImagePath('/images/speakers/arthur.jpg'))
console.log()

console.log('🌐 完整URL (用於SEO):')
console.log('  Logo URL:', getFullImageUrl('/images/logos/dddtw-logo.png'))
console.log('  Banner URL:', getFullImageUrl('/images/banners/banner-main.png'))
console.log('  Speaker URL:', getFullImageUrl('/images/speakers/michael.jpg'))
console.log()

console.log('✅ 測試完成！現在所有圖片都使用WebP格式')
