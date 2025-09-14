# 程式碼風格與慣例

## 檔案命名
- **kebab-case**: 所有檔案使用短橫線命名 (promo-code-copy.tsx)
- **TypeScript**: 所有原始碼檔案使用 .ts/.tsx 擴展名
- **配置檔案**: 使用 .mjs 擴展名 (next.config.mjs, postcss.config.mjs)

## TypeScript 規範
- **嚴格模式**: 啟用所有 TypeScript 嚴格選項
- **型別定義**: 完整的介面和型別定義 (lib/data/types.ts)
- **匯入路徑**: 使用絕對路徑 (@/components, @/lib, @/config)

## CSS/樣式規範
- **Tailwind CSS**: 使用靜態 class，避免字串插值
- **響應式設計**: 使用 md: 等前綴進行響應式設計
- **元件庫**: 基於 Radix UI 建構自訂 UI 元件

## React 慣例
- **Hooks**: 使用 React 19 最新 hooks 模式
- **Client 元件**: 明確標示 'use client' 指令
- **事件處理**: 使用 stopPropagation() 處理巢狀事件
- **狀態管理**: Context + useState 進行全域狀態管理

## 國際化規範
- **i18n 函式**: const { t } = useI18n(); t('key.subkey')
- **多語言**: 支援 zh-tw/en 雙語系統
- **語言資源**: 集中於 locales/ 目錄管理

## 配置管理
- **集中式配置**: 所有設定集中於 config/ 目錄
- **避免硬編碼**: 使用 @/config 匯入設定值
- **功能開關**: 使用配置控制功能啟用/停用