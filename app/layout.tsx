'use client'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { WebVitalsReporter } from '@/lib/web-vitals'
import { I18nProvider } from '@/contexts/i18n-context'
import { VersionProvider } from './providers/version-provider'
import { VersionNotification } from './components/version-notification'
import { VersionMonitor } from '@/components/version-monitor'
import PerformanceDashboard from '@/components/performance-dashboard'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <title>DDDTW 2025 - AI時代軟體開發方法</title>
        <meta name="description" content="DDDTW 2025 AI時代軟體開發方法成果發表會" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="DDDTW 2025 - AI時代軟體開發方法" />
        <meta property="og:description" content="DDDTW 2025 AI時代軟體開發方法成果發表會" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="zh_TW" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <WebVitalsReporter />
        <I18nProvider>
          <VersionProvider>
            <VersionNotification />
            {children}
          </VersionProvider>
        </I18nProvider>
        <PerformanceDashboard />
        <VersionMonitor />
      </body>
    </html>
  )
}
