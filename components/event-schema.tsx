'use client'

import { useI18n } from '@/contexts/i18n-context'
import { CONFIG } from '@/config'
import StructuredData from './structured-data'

/**
 * 活動結構化資料元件
 * 用於產生符合 Google Search Console 要求的活動結構化資料
 * 解決 endDate、eventStatus、offers、organizer、image 等欄位缺失問題
 */
export default function EventSchema() {
  const { t } = useI18n()

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: t('event.name'),
    description: t('event.description'),
    startDate: CONFIG.event.startDate,
    endDate: CONFIG.event.endDate,
    eventStatus: CONFIG.event.eventStatus,
    location: {
      '@type': 'Place',
      name: t('event.location.name'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: t('event.location.address'),
        addressLocality: 'Taipei',
        addressRegion: 'Taiwan',
        addressCountry: 'TW'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: CONFIG.event.location.latitude,
        longitude: CONFIG.event.location.longitude
      }
    },
    image: [CONFIG.event.image],
    organizer: {
      '@type': 'Organization',
      name: t('organizer.name'),
      url: CONFIG.organizer.url,
      logo: CONFIG.organizer.logo,
      email: CONFIG.organizer.email
    },
    offers: {
      '@type': 'Offer',
      url: CONFIG.event.ticketUrl,
      price: CONFIG.event.price,
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
      validFrom: CONFIG.event.ticketStartDate
    }
  }

  return <StructuredData data={eventSchema} />
}