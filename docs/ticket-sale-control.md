# 票券販售控制說明

## � 快速啟用販售

### 步驟 1: 啟用販售開關
編輯 `lib/ticket-config.ts`：
```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: true,  // 🎯 改為 true 啟用販售
  // ... 其他設定保持不變
}
```

### 步驟 2: 購票連結 (已完成)
- 已連接至：`https://www.accupass.com/event/2508301008076132622520`
- 早鳥票和一般票使用同一購票頁面

## 🔧 故障排除

### 按鈕無法跳轉問題

**症狀**：點擊購票/報名按鈕無反應

**解決方案**：

| 跳轉類型 | 正確寫法 | 錯誤寫法 |
|----------|----------|----------|
| **內部頁面** | `<Link href="/tickets">` 或 `router.push('/tickets')` | `window.location.href = '/tickets'` |
| **外部網站** | `window.open(url, '_blank')` | `window.location.href = url` |

**修復步驟**：
1. 引入必要依賴：`import { useRouter } from 'next/navigation'`
2. 使用正確的跳轉方式
3. 為 Button 組件添加 `asChild` 屬性（配合 Link 使用時）

## 📊 系統狀態

### 已修復的功能
- ✅ 首頁"立即報名"按鈮
- ✅ 精選講師"立即購票"按鈕
- ✅ 購票頁面 Accupass 連結

### 跳轉方式總覽
| 位置 | 方式 | 狀態 |
|------|------|------|
| 首頁報名 | `<Link>` | ✅ |
| 講師卡片 | `router.push()` | ✅ |
| 購票頁面 | `window.open()` | ✅ |

## ⚙️ 進階設定

### 販售控制
```typescript
// 暫停販售
isTicketSaleActive: false

// 個別票種控制
isEarlyBirdAvailable()      // 早鳥票狀態
isRegularTicketAvailable()  // 一般票狀態
```

### 時間設定
- `earlyBirdSaleStartDate`: 早鳥票開始日期
- `regularSaleStartDate`: 一般票開始日期  
- `saleEndDate`: 販售結束日期

## 🚨 注意事項

1. **即時生效**：配置修改後立即生效，無需重啟
2. **測試優先**：正式發布前請先在測試環境驗證
3. **避免使用** `window.location.href` 進行內部跳轉
4. **外部連結**：使用 `window.open(url, '_blank')` 開啟新視窗
