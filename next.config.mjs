import { CONFIG } from './lib/config.mjs'

const withBundleAnalyzer = process.env.ANALYZE === 'true' ?
  (await import('@next/bundle-analyzer')).default({
    enabled: true,
    openAnalyzer: true,
  }) : (config) => config

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 修復工作區根目錄警告
  outputFileTracingRoot: process.cwd(),

  // SPA 模式核心配置 (僅在生產環境)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'out', // 確保輸出到 out 目錄
  }),
  trailingSlash: false, // 改為 false 以產生 .txt 檔案而非目錄結構

  // SPA 必要配置
  images: {
    unoptimized: true, // SPA 模式必須停用圖片最佳化
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
      {
        pathname: '/images/**',
        search: '?v=*',
      },
    ],
  },

  // 建構優化
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 生產環境 GitHub Pages 配置 (使用統一配置)
  ...(process.env.NODE_ENV === 'production' && {
    basePath: CONFIG.deployment.basePath,
    assetPrefix: CONFIG.deployment.basePath,
  }),

  // SPA 專用配置
  skipTrailingSlashRedirect: true, // SPA 不需要重定向
}

export default withBundleAnalyzer(nextConfig)
