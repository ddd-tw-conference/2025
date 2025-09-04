"use client"

import { useVersion } from '../providers/version-provider'
import { useI18n } from '@/contexts/i18n-context'
import { Button } from '@/components/ui/button'

export function VersionNotification() {
  const { hasNewVersion, dismissNotification } = useVersion()
  const { t } = useI18n()

  const handleRefresh = () => {
    window.location.reload()
  }

  if (!hasNewVersion) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="text-sm mb-2">
        {t("message.newVersionAvailable")}
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white/10 border-white/30 text-white backdrop-blur-sm font-medium hover:bg-white/20"
          onClick={dismissNotification}
        >
          {t("button.later")}
        </Button>
        <Button
          size="sm"
          className="bg-white text-blue-600 hover:bg-white/90 font-semibold"
          onClick={handleRefresh}
        >
          {t("button.refresh")}
        </Button>
      </div>
    </div>
  )
}
