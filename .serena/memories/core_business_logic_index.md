# 核心業務邏輯索引

## 主要頁面
- **app/page.tsx** - 首頁
- **app/speakers/page.tsx** - 講者頁面
- **app/tickets/page.tsx** - 票券頁面
- **app/agenda/page.tsx** - 議程頁面

## 重要元件
- **components/ticket-marketing-section.tsx** - 票券行銷區塊
- **components/promo-code-copy.tsx** - 促銷碼複製功能
- **components/speaker-cards.tsx** - 講者卡片
- **components/language-selector.tsx** - 語言切換

## 配置驅動
- **config/tickets.ts** - 票券銷售配置
- **config/app.ts** - 應用基本配置
- **TICKET_SALE_CONFIG** - 票券狀態開關

## 多語言
- **const { t } = useI18n()** - 標準用法
- **t('key.subkey')** - 文字翻譯
- **locales/zh-tw.json** & **locales/en.json** - 語言檔