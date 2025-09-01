'use client'

import { Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/contexts/i18n-context'
import { useState, useEffect } from 'react'

interface CalendarEventProps {
  eventTitle: string
  eventDescription: string
  location: string
  startDate: string // YYYY-MM-DD format
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  iconOnly?: boolean // 新增：只顯示圖標模式
}

export default function CalendarEvent({
  eventTitle,
  eventDescription,
  location,
  startDate,
  startTime,
  endTime,
  variant = 'default',
  size = 'default',
  className = '',
  iconOnly = false
}: CalendarEventProps) {
  const { t } = useI18n()
  const [isAppleDevice, setIsAppleDevice] = useState(false)

  // 檢測是否為 Apple 裝置
  useEffect(() => {
    const detectAppleDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const platform = navigator.platform.toLowerCase()
      
      // 檢查 iOS 裝置 (iPhone, iPad, iPod)
      const isIOS = /iphone|ipad|ipod/.test(userAgent) || 
                   /iphone|ipad|ipod/.test(platform)
      
      // 檢查 macOS
      const isMac = /macintosh|mac os x/.test(userAgent) || 
                   /mac/.test(platform) ||
                   platform.includes('mac')
      
      return isIOS || isMac
    }
    
    setIsAppleDevice(detectAppleDevice())
  }, [])

  // Google Calendar URL
  const generateGoogleCalendarUrl = () => {
    // 轉換為 UTC 時間，台灣時間 UTC+8
    const startDateTimeUTC = new Date(`${startDate}T${startTime}:00+08:00`)
    const endDateTimeUTC = new Date(`${startDate}T${endTime}:00+08:00`)
    
    const formatGoogleDateTime = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      dates: `${formatGoogleDateTime(startDateTimeUTC)}/${formatGoogleDateTime(endDateTimeUTC)}`,
      details: eventDescription,
      location: location,
      ctz: 'Asia/Taipei'
    })
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  // Apple Calendar (ICS) file generation
  const generateIcsFile = () => {
    const formatDateTimeForIcs = (date: string, time: string) => {
      // 創建台北時間並轉換為 UTC
      const datetime = new Date(`${date}T${time}:00+08:00`)
      return datetime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }

    const startDateTime = formatDateTimeForIcs(startDate, startTime)
    const endDateTime = formatDateTimeForIcs(startDate, endTime)
    const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DDDesign Taiwan//Conference Event//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${startDateTime}`,
      `DTEND:${endDateTime}`,
      `DTSTAMP:${now}`,
      `UID:dddtw2025-${now}@dddtaiwan.org`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'BEGIN:VTIMEZONE',
      'TZID:Asia/Taipei',
      'BEGIN:STANDARD',
      'DTSTART:20250101T000000',
      'TZOFFSETFROM:+0800',
      'TZOFFSETTO:+0800',
      'TZNAME:CST',
      'END:STANDARD',
      'END:VTIMEZONE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`
  }

  const handleGoogleCalendarClick = () => {
    window.open(generateGoogleCalendarUrl(), '_blank')
  }

  const handleAppleCalendarClick = () => {
    const icsData = generateIcsFile()
    const link = document.createElement('a')
    link.href = icsData
    link.download = `${eventTitle.replace(/\s+/g, '_')}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {/* 根據裝置類型顯示對應的行事曆按鈕 */}
      <Button
        onClick={isAppleDevice ? handleAppleCalendarClick : handleGoogleCalendarClick}
        variant={variant}
        size={size}
        className={`flex items-center gap-2 border-0 transition-all duration-200 transform hover:scale-105 shadow-lg ${
          iconOnly 
            ? `sm:w-auto sm:h-10 sm:px-3 sm:py-2 sm:rounded-lg sm:justify-center sm:bg-white ${
                isAppleDevice 
                  ? 'sm:hover:bg-gray-50 sm:border sm:border-gray-300 sm:hover:border-gray-400' 
                  : 'sm:hover:bg-blue-50 sm:border sm:border-blue-200 sm:hover:border-blue-300'
              } sm:shadow-md sm:hover:shadow-lg w-auto h-auto p-3 rounded-lg justify-start bg-white hover:bg-gray-50 border border-gray-200 text-gray-700` 
            : isAppleDevice
              ? 'bg-gradient-to-b from-gray-700 via-gray-800 to-black hover:from-gray-600 hover:via-gray-700 hover:to-gray-900 text-white'
              : 'bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 hover:from-blue-600 hover:via-red-600 hover:to-yellow-600 text-white'
        }`}
        title={iconOnly ? (isAppleDevice ? t('calendar.addToApple') : t('calendar.addToGoogle')) : (isAppleDevice ? t('calendar.addToApple') : t('calendar.addToGoogle'))}
      >
        {iconOnly ? (
          <>
            {/* 桌面版顯示行事曆圖標 + 品牌 Logo + 文字 */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Calendar className={`w-4 h-4 ${isAppleDevice ? 'text-gray-600' : 'text-blue-600'}`} />
                {isAppleDevice ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="#000000"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
              </div>
            </div>
            {/* 手機版顯示 Logo */}
            <div className="sm:hidden flex items-center gap-2">
              {isAppleDevice ? (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="#000000"/>
                  </svg>
                  <span className="text-sm font-medium">{t('calendar.addToApple')}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-medium">{t('calendar.addToGoogle')}</span>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {isAppleDevice ? (
              <>
                <Download className="w-4 h-4" />
                <span>{t('calendar.addToApple')}</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>{t('calendar.addToGoogle')}</span>
              </>
            )}
          </>
        )}
      </Button>
    </div>
  )
}
