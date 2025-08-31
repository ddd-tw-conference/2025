'use client'

import { Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/contexts/i18n-context'

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
  className = ''
}: CalendarEventProps) {
  const { t } = useI18n()

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
      <Button
        onClick={handleGoogleCalendarClick}
        variant={variant}
        size={size}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        <Calendar className="w-4 h-4" />
        <span>{t('calendar.addToGoogle')}</span>
      </Button>
      
      <Button
        onClick={handleAppleCalendarClick}
        variant={variant}
        size={size}
        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white border-0 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        <Download className="w-4 h-4" />
        <span>{t('calendar.addToApple')}</span>
      </Button>
    </div>
  )
}
