# 核心業務邏輯索引

## 🏠 主要頁面邏輯

### app/page.tsx - 首頁
- **講者展示**: 精選講者卡片展示
- **票券行銷**: 動態票券銷售區塊
- **活動介紹**: 會議簡介和亮點
- **多語言支援**: 完整的 i18n 整合

### app/speakers/page.tsx - 講者頁面
- **講者列表**: 完整講者陣容展示
- **詳細資訊**: 講者背景和專長介紹
- **社群連結**: LinkedIn、Twitter 等連結
- **響應式設計**: 行動裝置優化顯示

### app/tickets/page.tsx - 票券頁面
- **購票入口**: 整合 Accupass 購票系統
- **價格資訊**: 動態顯示票種和價格
- **銷售狀態**: 早鳥票/一般票狀態切換
- **促銷功能**: 優惠碼顯示 (目前已停用)

### app/agenda/page.tsx - 議程頁面
- **時間軸展示**: 完整議程時間表
- **講者連動**: 議程與講者資訊整合
- **互動功能**: 議程詳情燈箱顯示
- **分類篩選**: 不同類型議程分類

## 🧩 核心元件邏輯

### components/ticket-marketing-section.tsx
```typescript
// 票券行銷的核心邏輯
- 讀取 TICKET_SALE_CONFIG 配置
- 動態顯示銷售狀態
- 早鳥票售罄自動切換一般票
- 整合 Accupass 購票連結
```

### components/speaker-cards.tsx
```typescript
// 講者卡片展示邏輯
- 響應式網格佈局
- 講者頭像和基本資訊
- 社群媒體連結整合
- hover 效果和互動設計
```

### components/promo-code-copy.tsx
```typescript
// 促銷碼複製功能 (目前已停用)
- 剪貼簿 API 整合
- 複製成功提示
- 配置驅動顯示/隱藏
```

### components/language-selector.tsx
```typescript
// 語言切換核心邏輯
- useI18n Hook 整合
- 語言狀態管理
- URL 路由更新
- 本地儲存語言偏好
```

## ⚙️ 配置驅動邏輯

### config/tickets.ts - 票券系統配置
```typescript
TICKET_SALE_CONFIG: {
  isTicketSaleActive: true,      // 主要開關
  isEarlyBirdSoldOut: true,     // 早鳥票狀態
  promoCode: {                  // 促銷碼控制
    isVisible: false,
    code: ""
  }
}
```

### config/agenda.ts - 議程邏輯
- **時間計算**: 議程時間自動計算
- **講者關聯**: speakerIds 陣列關聯講者資料
- **狀態管理**: 議程進行狀態追蹤

### config/system.ts - 系統配置
- **版本控制**: 應用程式版本資訊
- **功能開關**: 各種功能的開關控制
- **環境設定**: 開發/生產環境差異

## 🌍 多語言邏輯

### contexts/i18n-context.tsx
```typescript
// 多語言核心邏輯
- React Context 狀態管理
- 語言檔案動態載入
- 翻譯函式提供 (t)
- 語言切換事件處理
```

### 使用模式
```typescript
const { t } = useI18n();
// 強制使用，禁止硬編碼
t('tickets.early_bird_price')
t('speakers.bio_title')
```

## 📊 資料處理邏輯

### lib/data/speakers.ts
- **講者資料結構**: 統一的講者資訊格式
- **資料驗證**: 講者資料完整性檢查
- **查詢功能**: `getSpeakerById()` 查詢邏輯

### lib/data/types.ts
- **TypeScript 介面**: 所有資料結構定義
- **型別安全**: 編譯時型別檢查
- **資料一致性**: 統一的資料格式標準

## 🎯 業務流程邏輯

### 票券購買流程
1. **狀態檢查**: 檢查 `TICKET_SALE_CONFIG.isTicketSaleActive`
2. **票種判斷**: 根據 `isEarlyBirdSoldOut` 顯示適當票種
3. **價格顯示**: 動態顯示對應票種價格
4. **導向購票**: 跳轉至 Accupass 購票頁面

### 多語言切換流程
1. **語言偵測**: 自動偵測瀏覽器語言偏好
2. **語言載入**: 動態載入對應語言檔案
3. **狀態更新**: 更新 React Context 狀態
4. **UI 重渲染**: 觸發介面語言更新

### 講者資料展示流程
1. **資料載入**: 從 speakers.ts 載入資料
2. **ID 查詢**: 使用 `getSpeakerById()` 查詢特定講者
3. **null 處理**: 處理查詢不到的情況
4. **UI 渲染**: 渲染講者卡片或詳細頁面

## 🚀 效能邏輯

### 圖片載入邏輯
- **WebP 檢測**: 檢測瀏覽器 WebP 支援
- **格式回退**: WebP → PNG/JPEG 的回退機制
- **延遲載入**: 非首屏圖片延遲載入策略

### 程式碼分割邏輯
- **頁面分割**: 每個路由獨立載入
- **元件分割**: 大型元件動態導入
- **依賴優化**: Tree shaking 移除未使用程式碼

## 🔄 狀態管理邏輯

### 全域狀態
- **i18n Context**: 多語言狀態
- **配置狀態**: 從 config 檔案讀取的狀態

### 本地狀態
- **表單狀態**: 表單輸入和驗證狀態
- **UI 狀態**: 載入中、錯誤等 UI 狀態
- **互動狀態**: hover、focus 等互動狀態

## 🛡️ 錯誤處理邏輯

### 資料錯誤處理
- **null 檢查**: `getSpeakerById()` 回傳 null 的處理
- **陣列檢查**: `{array.length > 0 && <Component />}`
- **配置錯誤**: 配置檔案錯誤的回退機制

### UI 錯誤處理
- **Error Boundary**: React 錯誤邊界
- **載入失敗**: 圖片、字體載入失敗的處理
- **網路錯誤**: API 請求失敗的使用者提示