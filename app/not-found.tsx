'use client';

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/contexts/i18n-context'

export default function NotFound() {
  const { t } = useI18n()
  
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Link href="/">
                  🏠 {t('button.backHome')}
                </Link>
              </Button>
              
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full border-white/50 text-white hover:bg-white/10"
              >
                ← {t('button.goBack')}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  <Link href="/about">{t('nav.about')}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  <Link href="/agenda">{t('nav.agenda')}</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-gray-400">
                需要協助？ {t('button.contactUs')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
