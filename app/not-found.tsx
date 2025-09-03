'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/contexts/i18n-context'

export default function NotFound() {
  const { t } = useI18n()
  const router = useRouter()
  
  const handleNavigation = (path: string) => {
    router.push(path)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <div className="mb-6">
              <div className="text-6xl font-bold text-white/20 mb-4">404</div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {t('error.pageNotFound')}
              </h1>
              <p className="text-gray-300 mb-6">
                {t('error.pageNotFoundDescription')}
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
              >
                <Link href="/">
                  🏠 {t('button.backHome')}
                </Link>
              </Button>
              
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm font-medium"
              >
                ← {t('button.goBack')}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/tickets')}
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm font-medium"
                >
                  {t('nav.tickets')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/agenda')}
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm font-medium"
                >
                  {t('nav.agenda')}
                </Button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-gray-400 mb-2">
                {t('rules.needHelp')}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // 嘗試開啟郵件客戶端
                  try {
                    window.location.href = 'mailto:dddtw2018@gmail.com?subject=DDD Taiwan 2025 - 需要協助&body=您好，我需要協助：%0D%0A%0D%0A';
                  } catch (error) {
                    // 如果郵件客戶端無法開啟，複製郵件地址到剪貼簿
                    navigator.clipboard?.writeText('dddtw2018@gmail.com').then(() => {
                      alert('郵件地址已複製到剪貼簿：dddtw2018@gmail.com');
                    }).catch(() => {
                      // 如果剪貼簿也無法使用，顯示郵件地址
                      alert('請聯繫我們：dddtw2018@gmail.com');
                    });
                  }
                }}
                className="text-blue-300 hover:text-white hover:bg-white/10 underline underline-offset-4 px-2 py-1 h-auto font-medium"
              >
                📧 {t('button.contactUs')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
