import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { WebVitalsReporter } from '@/lib/web-vitals'
import { I18nProvider } from '@/contexts/i18n-context'
import PerformanceDashboard from '@/components/performance-dashboard'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'DDDTW 2025 - AI時代軟體開發方法',
    template: '%s | DDDTW 2025'
  },
  description: 'DDDTW 2025 AI時代軟體開發方法成果發表會',
  keywords: ['Domain-Driven Design', 'DDD', 'Taiwan', '軟體開發', 'AI', '領域驅動設計', '2025'],
  authors: [{ name: 'DDD Taiwan Community' }],
  creator: 'DDD Taiwan Community',
  publisher: 'DDD Taiwan Community',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://ddd-tw-conference.github.io/2025/',
    title: 'DDDTW 2025 - AI時代軟體開發方法',
    description: 'DDDTW 2025 AI時代軟體開發方法成果發表會',
    siteName: 'DDDTW 2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DDDTW 2025 - AI時代軟體開發方法',
    description: 'DDDTW 2025 AI時代軟體開發方法成果發表會',
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <WebVitalsReporter />
        <I18nProvider>
          {children}
        </I18nProvider>
        <PerformanceDashboard />
      </body>
    </html>
  )
}
