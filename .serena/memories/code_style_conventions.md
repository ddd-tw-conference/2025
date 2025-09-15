# 開發規範

## 檔案命名
- **kebab-case** - 檔案命名 (promo-code-copy.tsx)
- **TypeScript** - 所有檔案 .ts/.tsx

## 重要規範
- **t()函式** - `const { t } = useI18n(); t('key.subkey')`
- **靜態 Tailwind** - 避免字串插值
- **config導入** - 使用 `@/config`，避免硬編碼
- **stopPropagation()** - 處理巢狀事件

## 配置驅動
- 功能開關透過 config 控制
- 票券狀態使用 TICKET_SALE_CONFIG
- 多語言透過 t() 函式