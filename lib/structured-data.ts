/**
 * 結構化資料 (JSON-LD) 生成工具
 * 提升 SEO 理解度
 */

import { SPEAKERS_DATA, AGENDA_DATA } from '@/lib/data'
import { getLocalizedText } from '@/lib/data'
import { getFullImageUrl } from '@/lib/image-optimization'

// 會議活動結構化資料
export function generateEventStructuredData(language: string = 'zh-tw') {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": language === 'zh-tw' ? "Domain-Driven Design Taiwan 2025" : "Domain-Driven Design Taiwan 2025",
    "alternateName": "DDDTW 2025",
    "description": language === 'zh-tw' 
      ? "台灣最大的領域驅動設計年度盛會，匯聚業界專家分享系統設計與架構實務經驗"
      : "Taiwan's largest annual Domain-Driven Design conference, bringing together industry experts to share system design and architecture practices",
    "startDate": "2025-11-08T09:00:00+08:00",
    "endDate": "2025-11-08T17:00:00+08:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": language === 'zh-tw' ? "台北市商業會" : "Taipei Chamber of Commerce",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": language === 'zh-tw' ? "南京東路二段72號6樓" : "6F, No. 72, Sec. 2, Nanjing E. Rd.",
        "addressLocality": language === 'zh-tw' ? "台北市" : "Taipei City",
        "addressRegion": language === 'zh-tw' ? "中山區" : "Zhongshan District",
        "postalCode": "104",
        "addressCountry": "TW"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.052,
        "longitude": 121.533
      }
    },
    "image": [
      getFullImageUrl("/images/logos/dddtw-logo.webp")
    ],
    "organizer": {
      "@type": "Organization",
      "name": "DDDesign TW",
      "url": "https://ddd-tw-conference.github.io/2025",
      "logo": getFullImageUrl("/images/logos/dddtw-logo.webp")
    },
    "offers": [
      {
        "@type": "Offer",
        "name": language === 'zh-tw' ? "早鳥票" : "Early Bird Ticket",
        "description": language === 'zh-tw' ? "限量優惠價格，數量有限，僅限前 50 名" : "Limited offer pricing, quantities limited to first 50 people",
        "price": "2000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/LimitedAvailability",
        "validFrom": "2025-08-31T00:00:00+08:00",
        "validThrough": "2025-10-15T23:59:59+08:00",
        "url": "https://ddd-tw-conference.github.io/2025/tickets",
        "category": "早鳥優惠"
      },
      {
        "@type": "Offer",
        "name": language === 'zh-tw' ? "一般票" : "Regular Ticket",
        "description": language === 'zh-tw' ? "標準會議票券" : "Standard conference ticket",
        "price": "2500",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-10-16T00:00:00+08:00",
        "validThrough": "2025-11-08T09:00:00+08:00",
        "url": "https://ddd-tw-conference.github.io/2025/tickets",
        "category": "標準票"
      }
    ],
    "performer": SPEAKERS_DATA.flatMap(topic => 
      topic.speakers.map(speaker => ({
        "@type": "Person",
        "name": getLocalizedText(speaker.name, language),
        "jobTitle": getLocalizedText(speaker.title, language),
        "worksFor": {
          "@type": "Organization",
          "name": getLocalizedText(speaker.company, language)
        },
        "description": getLocalizedText(speaker.bio, language),
        "image": speaker.image.startsWith('/') ? `https://ddd-tw-conference.github.io/2025${speaker.image}` : speaker.image,
        "url": speaker.socialLinks?.website || speaker.socialLinks?.linkedin
      }))
    ),
    "subEvent": AGENDA_DATA.map(session => ({
      "@type": "Event",
      "name": getLocalizedText(session.title, language),
      "description": getLocalizedText(session.description, language),
      "startDate": `2025-11-08T${session.time.split(' - ')[0]}:00+08:00`,
      "performer": {
        "@type": "Person",
        "name": session.speaker
      },
      "location": {
        "@type": "Place",
        "name": getLocalizedText(session.track, language)
      }
    })),
    "inLanguage": language === 'zh-tw' ? ["zh-TW", "en-US"] : ["en-US", "zh-TW"],
    "audience": {
      "@type": "Audience",
      "audienceType": language === 'zh-tw' 
        ? "軟體開發者、系統架構師、技術主管" 
        : "Software Developers, System Architects, Technical Leaders"
    }
  }
}

// 組織結構化資料
export function generateOrganizationStructuredData(language: string = 'zh-tw') {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DDDesign TW",
    "alternateName": "Domain-Driven Design Taiwan",
    "description": language === 'zh-tw' 
      ? "推廣領域驅動設計在台灣的發展，建立專業技術社群"
      : "Promoting the development of Domain-Driven Design in Taiwan and building professional technical communities",
    "url": "https://ddd-tw-conference.github.io/2025",
    "logo": getFullImageUrl("/images/logos/dddtw-logo.webp"),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["zh-TW", "en-US"]
    },
    "sameAs": [
      "https://www.facebook.com/dddtw",
      "https://github.com/ddd-tw-conference"
    ],
    "foundingDate": "2019",
    "location": {
      "@type": "Place",
      "addressCountry": "TW",
      "addressRegion": language === 'zh-tw' ? "台灣" : "Taiwan"
    }
  }
}

// 網站結構化資料
export function generateWebsiteStructuredData(language: string = 'zh-tw') {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": language === 'zh-tw' ? "Domain-Driven Design Taiwan 2025" : "Domain-Driven Design Taiwan 2025",
    "alternateName": "DDDTW 2025",
    "url": "https://ddd-tw-conference.github.io/2025",
    "description": language === 'zh-tw' 
      ? "台灣領域驅動設計年度大會官方網站，提供議程、講者資訊及報名服務"
      : "Official website of Taiwan Domain-Driven Design Annual Conference, providing agenda, speaker information and registration services",
    "inLanguage": ["zh-TW", "en-US"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ddd-tw-conference.github.io/2025/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DDDesign TW",
      "logo": getFullImageUrl("/images/logos/dddtw-logo.webp")
    }
  }
}

import { Speaker } from './data'

// 講者個人結構化資料生成器
export function generatePersonStructuredData(speaker: Speaker, language: string = 'zh-tw') {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": getLocalizedText(speaker.name, language),
    "jobTitle": getLocalizedText(speaker.title, language),
    "worksFor": {
      "@type": "Organization",
      "name": getLocalizedText(speaker.company, language)
    },
    "description": getLocalizedText(speaker.bio, language),
    "image": speaker.image.startsWith('/') ? `https://ddd-tw-conference.github.io/2025${speaker.image}` : speaker.image,
    "url": speaker.socialLinks?.website,
    "sameAs": [
      speaker.socialLinks?.linkedin,
      speaker.socialLinks?.twitter,
      speaker.socialLinks?.github
    ].filter(Boolean),
    "knowsAbout": speaker.expertise[language as keyof typeof speaker.expertise] || speaker.expertise['zh-tw'] || [],
    "alumniOf": speaker.education ? getLocalizedText(speaker.education, language) : undefined,
    "award": speaker.achievements ? (speaker.achievements[language as keyof typeof speaker.achievements] || speaker.achievements['zh-tw'] || []) : undefined
  }
}

// 麵包屑導航結構化資料
export function generateBreadcrumbStructuredData(items: Array<{name: string, url?: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `https://ddd-tw-conference.github.io/2025${item.url}` : undefined
    }))
  }
}
