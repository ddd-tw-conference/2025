'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/contexts/i18n-context'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const { t } = useI18n()

  // 檢查是否為 Chunk Loading 錯誤
  const isChunkError = error.message?.includes('Loading chunk') || 
                       error.message?.includes('ChunkLoadError') ||
                       error.name === 'ChunkLoadError'

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    
    // 如果是 Chunk Loading 錯誤，嘗試清除快取並重新載入
    if (isChunkError) {
      const clearCacheAndReload = async () => {
        try {
          if ('caches' in window) {
            const cacheNames = await caches.keys()
            await Promise.all(
              cacheNames.map(cacheName => 
                caches.delete(cacheName)
              )
            )
          }
        } catch (cacheError) {
          console.warn('Cache clearing failed:', cacheError)
        }
      }
      
      clearCacheAndReload()
    }
  }, [error, isChunkError])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {isChunkError ? `🔧 ${t('error.chunkLoadError')}` : t('error.somethingWentWrong')}
              </h1>
              <p className="text-gray-300 mb-6">
                {isChunkError 
                  ? t('error.chunkLoadDescription')
                  : t('error.tryAgainLater')
                }
              </p>
            </div>
            
            <div className="space-y-4">
              {isChunkError ? (
                <>
                  <Button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                  >
                    🔄 {t('error.reloadPage')}
                  </Button>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm font-medium"
                  >
                    🛠️ {t('error.chunkRetryFix')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={reset}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  >
                    🔄 {t('button.tryAgain')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/')}
                    className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm font-medium"
                  >
                    🏠 {t('button.backHome')}
                  </Button>
                </>
              )}
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                  錯誤詳細資訊 (開發模式)
                </summary>
                <pre className="mt-2 text-xs text-red-300 bg-red-900/20 p-2 rounded overflow-auto">
                  {error.message}
                  {error.stack && '\n\nStack trace:\n' + error.stack}
                </pre>
              </details>
            )}

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-gray-400">
                錯誤代碼: {error.digest || 'UNKNOWN'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                如問題持續發生，請 {t('button.contactUs')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
