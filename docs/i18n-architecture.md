# SPA 多國語系（i18n）架構規劃

## 1. 語言資源管理

建立 `locales/` 資料夾，每語言一個 JSON 檔案：

```json
// zh-tw.json
{ "common.submit": "送出", "nav.home": "首頁" }
// en.json
{ "common.submit": "Submit", "nav.home": "Home" }
```

## 2. 語言資源載入

```typescript
// contexts/I18nContext.tsx
import zhTwMessages from '../locales/zh-tw.json';
import enMessages from '../locales/en.json';
const messages = { 'zh-tw': zhTwMessages, 'en': enMessages };
```

## 3. 全域語言狀態管理

```typescript
interface I18nContextType {
  language: string;
  t: (key: string, params?: Record<string, any>) => string;
  changeLanguage: (lang: string) => void;
}
export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('language') || 'zh-tw' : 'zh-tw'
  );
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') localStorage.setItem('language', lang);
  };
  const t = (key: string, params?: Record<string, any>) => {
    let result = messages[language]?.[key] || key;
    if (params) Object.entries(params).forEach(([param, val]) => {
      result = result.replace(`{{${param}}}`, String(val));
    });
    return result;
  };
  return (
    <I18nContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
```

## 4. Hook 使用方式

```typescript
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
```

## 5. 語言切換介面（設計優化）

```tsx
// components/LanguageSelector.tsx
import { useI18n } from '../contexts/I18nContext';
import { useState } from 'react';
export const LanguageSelector = () => {
  const { language, changeLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button className="rounded-full border px-2 py-1 flex items-center gap-1 hover:bg-gray-100"
        onClick={() => setOpen(!open)} aria-label="Change language">
        {language === 'zh-tw' ? '🇹🇼' : '🇺🇸'}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          <button className={`w-full py-2 px-4 text-left ${language === 'zh-tw' ? 'bg-gray-200' : ''}`}
            onClick={() => { changeLanguage('zh-tw'); setOpen(false); }}>🇹🇼 繁體中文</button>
          <button className={`w-full py-2 px-4 text-left ${language === 'en' ? 'bg-gray-200' : ''}`}
            onClick={() => { changeLanguage('en'); setOpen(false); }}>🇺🇸 English</button>
        </div>
      )}
    </div>
  );
};
```

## 6. 資料層國際化設計

```typescript
// lib/data/conference.ts
export interface Speaker {
  name: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
}
export const SPEAKERS_DATA: Speaker[] = [
  { name: { 'zh-tw': "陳勉修", 'en': "Michael Chen" },
    bio: { 'zh-tw': "專注於...", 'en': "Focuses on..." }
  }
];
```
元件顯示時依語言：`speaker.name[language]`

## 7. Speaker主題排版與Tooltip

```tsx
// components/TopicTitle.tsx
import { useState } from 'react';
export const TopicTitle = ({ title }: { title: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="truncate max-w-[180px] md:max-w-[320px] cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={() => setShowTooltip(!showTooltip)}
      title={title}>
      {title}
      {showTooltip && (
        <div className="absolute z-20 bg-black text-white px-2 py-1 rounded shadow-lg">{title}</div>
      )}
    </div>
  );
};
```

## 8. SPA 響應式設計重點

- 所有主要元件加上 Tailwind CSS 響應式 class（如 `md:`, `lg:`, `sm:`）。
- Tooltip、語言切換器等皆支援觸控操作。
- 測試手機、平板、桌面模式下排版。

## 9. 檔案結構

```
/locales
  ├── zh-tw.json
  ├── en.json
/contexts
  └── I18nContext.tsx
/lib
  └── data/conference.ts
/components
  ├── LanguageSelector.tsx
  └── TopicTitle.tsx
```

---

