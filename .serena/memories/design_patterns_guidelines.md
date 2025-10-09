# 設計模式與開發指南

## 🎯 核心設計原則

### 配置驅動架構
- **統一配置管理**: 所有功能透過 `config/` 目錄控制
- **避免硬編碼**: 使用 `@/config` 導入，禁止魔術數字/字串
- **環境感知**: 配置檔案支援不同環境設定
- **型別安全**: 所有配置都有 TypeScript 型別定義

### 多語言強制模式
```typescript
// ✅ 正確使用
const { t } = useI18n();
t('tickets.early_bird_price')

// ❌ 禁止硬編碼
"早鳥票價格"
```

## 🎨 UI/UX 設計模式

### 靜態 Tailwind 原則
```typescript
// ✅ 正確 - 靜態類別
className="bg-blue-500 text-white"

// ❌ 錯誤 - 字串插值
className={`bg-${color}-500`}
```

### 顏色系統約束
- **限制**: 僅 6 種預定義顏色
- **類型**: `"blue" | "purple" | "green" | "indigo" | "orange" | "pink"`
- **擴展規則**: 新增顏色必須更新 `getColorClasses()` 所有元件

### 響應式設計模式
- **行動優先**: 從手機版開始設計
- **斷點系統**: 使用 Tailwind 標準斷點
- **觸控優化**: 按鈕和連結適合觸控操作

## 🔄 資料流設計模式

### 資料架構模式
```typescript
interface Segment {
  speakerIds: string[]  // 關聯式資料設計
}

// 使用模式
{segment.speakerIds.length > 0 && <ExpertInfo />}
const speaker = getSpeakerById(speakerId) // 處理 null 回傳
```

### 狀態管理模式
- **配置驅動狀態**: `TICKET_SALE_CONFIG` 控制票券系統
- **React Context**: 全域狀態 (如 i18n)
- **本地狀態**: 元件內部狀態管理

## ⚡ 效能優化模式

### 圖片處理模式
- **WebP 優先**: 自動轉換 + 回退支援
- **響應式載入**: 根據裝置載入適當尺寸
- **延遲載入**: 非關鍵圖片延後載入

### 程式碼分割模式
- **路由分割**: 按頁面分割 JavaScript
- **元件分割**: 大型元件動態載入
- **依賴優化**: Tree shaking 移除未使用程式碼

## 🛡️ 型別安全模式

### TypeScript 嚴格模式
- **嚴格檢查**: 啟用所有 TypeScript 嚴格選項
- **型別推導**: 充分利用型別推導減少冗餘
- **介面定義**: 明確的資料結構介面

### 資料驗證模式
- **運行時驗證**: 外部資料的運行時檢查
- **型別守衛**: 使用型別守衛確保型別安全
- **錯誤邊界**: React Error Boundary 捕獲錯誤

## 🌐 國際化模式

### 翻譯鍵值設計
```typescript
// ✅ 階層式鍵值
t('tickets.early_bird.price')
t('speakers.bio.title')

// ✅ 使用插值
t('tickets.remaining', { count: 5 })
```

### 文化適應模式
- **日期格式**: 根據語言地區調整
- **數字格式**: 千分位符號本地化
- **文字方向**: 支援 RTL 語言 (未來擴展)

## 🔧 事件處理模式

### 巢狀事件處理
```typescript
// ✅ 阻止事件冒泡
const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  // 處理邏輯
}
```

### 表單處理模式
- **受控元件**: 統一使用受控元件
- **驗證策略**: 即時驗證 + 提交驗證
- **錯誤處理**: 使用者友善的錯誤提示

## 📊 SEO 優化模式

### 結構化資料模式
- **JSON-LD**: 使用標準 Schema.org 格式
- **事件資料**: Conference 類型結構化資料
- **組織資料**: Organization 資訊

### Meta 標籤模式
```typescript
// 完整的 Open Graph 支援
<meta property="og:title" content={t('meta.title')} />
<meta property="og:description" content={t('meta.description')} />
```

## 🚨 錯誤處理模式

### 漸進式降級
- **功能降級**: 功能失效時提供基本版本
- **圖片回退**: WebP 失敗時回退至 PNG/JPEG
- **JavaScript 失敗**: 基本 HTML/CSS 仍可使用

### 錯誤邊界模式
```typescript
// React Error Boundary
<ErrorBoundary fallback={<ErrorUI />}>
  <Component />
</ErrorBoundary>
```

## 🔄 版本控制模式

### Git 工作流程
- **主分支**: `main` - 生產就緒代碼
- **功能分支**: `feature/*` - 個別功能開發
- **自動部署**: Push 到 main 觸發 CI/CD

### 程式碼審查模式
- **Pull Request**: 所有變更需要審查
- **自動檢查**: ESLint + TypeScript + 測試
- **文檔更新**: 功能變更同步更新文檔

## 🎯 最佳實踐檢查清單
- [ ] 使用 `t()` 函式，避免硬編碼文字
- [ ] 從 `@/config` 導入配置，避免魔術值
- [ ] 使用靜態 Tailwind 類別
- [ ] 檢查陣列長度後再渲染
- [ ] 處理 `getSpeakerById()` 的 null 回傳
- [ ] 新增顏色時更新所有 `getColorClasses()`
- [ ] 使用 `stopPropagation()` 處理巢狀事件
- [ ] 保持型別安全的程式碼結構