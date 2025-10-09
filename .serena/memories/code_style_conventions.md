# DDD Taiwan 2025 開發規範

## 🎯 核心原則
**Next.js 15.5.2 + React 19 + TypeScript + Tailwind CSS + i18n (zh-tw/en)**

## 📁 命名規範
- **檔案**: kebab-case (`promo-code-copy.tsx`)
- **套件管理**: `pnpm` 僅此一種
- **Speaker ID**: kebab-case (`"michael-chen"`)

## 🌍 多語言 (強制要求)
```typescript
const { t } = useI18n();
t('key.subkey') // 必須使用，禁止硬編碼文字
```

## 🎨 樣式規範
- **靜態 Tailwind**: 禁止字串插值 className
- **顏色限制**: `"blue" | "purple" | "green" | "indigo" | "orange" | "pink"`
- **新顏色**: 必須更新 `getColorClasses()` 所有元件

## ⚙️ 設定管理
- **導入**: `@/config` 不可硬編碼
- **票券**: `TICKET_SALE_CONFIG` 驅動功能
- **功能開關**: 透過 config 控制

## 🔗 資料架構
```typescript
interface Segment {
  speakerIds: string[]  // 使用 getSpeakerById() 查詢
}
// 條件渲染: {segment.speakerIds.length > 0 && <ExpertInfo />}
```

## 🎯 事件處理
- **巢狀點擊**: 使用 `stopPropagation()`
- **導航**: `<Link>` 和 `router.push()`
- **參數**: URL `?id=value` + `useSearchParams()`

## 🛡️ 相容性規則
- **陣列檢查**: `array.length` 確認後渲染
- **型別擴展**: 不修改現有型別，使用擴展
- **Null 處理**: `getSpeakerById()` 處理 null 回傳

## 🔧 開發工具
```bash
pnpm dev                              # 開發模式
node scripts/generate-all-webp.js     # 圖片優化
Start-Process pwsh                    # 穩定開發伺服器
```

## ⚠️ 常見陷阱
1. 只允許 6 種顏色 - 必須更新 `getColorClasses()`
2. 使用 `getSpeakerById()`，處理 null 回傳
3. `<body>` 加入 `suppressHydrationWarning={true}`

## 🤖 MCP 伺服器整合
- **Context7**: `resolve-library-id` → `get-library-docs`
- **Serena**: `find_symbol`, `search_for_pattern`, `get_symbols_overview`
- **Chrome**: `navigate_page`, `take_snapshot`, `click`