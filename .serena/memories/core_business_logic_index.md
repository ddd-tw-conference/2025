# 核心業務邏輯索引

## 主要頁面元件
- **ConferencePage** (app/page.tsx) - 首頁主元件
- **AboutPage** (app/about/page.tsx) - 關於頁面
- **SpeakersPage** (app/speakers/page.tsx) - 講者頁面，含智慧導航
- **AgendaPage** (app/agenda/page.tsx) - 議程頁面，含 lightbox
- **TicketsPage** (app/tickets/page.tsx) - 票券頁面
- **TransportationPage** (app/transportation/page.tsx) - 交通資訊

## 核心業務元件
- **SpeakerCards** (components/speaker-cards.tsx) - 首頁講者卡片，含導航邏輯
- **TicketMarketingSection** (components/ticket-marketing-section.tsx) - 票券行銷
- **LanguageSelector** (components/language-selector.tsx) - 語言切換器
- **VersionMonitor** (components/version-monitor.tsx) - 開發工具面板
- **PromoCodeCopy** (components/promo-code-copy.tsx) - 促銷碼複製功能

## 配置系統
- **TICKET_SALE_CONFIG** (config/tickets.ts) - 票券銷售配置
- **AGENDA_TIME_CONFIG** (config/agenda.ts) - 議程時間配置
- **CONFIG** (config/app.ts) - 應用程式主配置
- **PERFORMANCE_CONFIG** (config/performance.ts) - 效能優化配置

## 資料層
- **SPEAKERS_DATA** (lib/data/speakers.ts) - 講者資料
- **AGENDA_DATA** (lib/data/agenda.ts) - 議程資料
- **Speaker, Session 型別** (lib/data/types.ts) - 資料型別定義

## 國際化系統
- **I18nProvider** (contexts/i18n-context.tsx) - i18n Context
- **useI18n** - 多語言 Hook
- **getLocalizedText/Array** (lib/data/utils.ts) - 本地化工具函式

## 工具函式
- **getOptimizedImagePath** (lib/image-optimization.ts) - 圖片優化
- **reportWebVitals** (lib/web-vitals-reporter.ts) - 效能監控
- **getRoutePath** (lib/paths.ts) - 路由管理