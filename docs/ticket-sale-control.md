# 票券販售控制說明

## 📋 快速啟用票券販售

當票券開始販售時，您只需要修改一個檔案即可立即移除所有「尚未開賣」的彈跳視窗：

### 🎯 步驟 1: 編輯配置檔案

打開檔案：`lib/ticket-config.ts`

```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  // 🎯 將此設定改為 true 即可開始販售
  isTicketSaleActive: true,  // ← 改為 true
  
  // 預計開賣日期 (可選，用於顯示)
  earlyBirdSaleStartDate: "2025-09-15",
  regularSaleStartDate: "2025-10-16", 
  saleEndDate: "2025-11-07"
}
```

### 🎯 步驟 2: 設定購票連結

在 `app/tickets/page.tsx` 中，找到以下兩個 TODO 註解並替換為實際的購票連結：

```typescript
// TODO: 導向到實際的購票頁面
window.open('https://your-ticket-sales-url.com/early-bird', '_blank')

// TODO: 導向到實際的購票頁面  
window.open('https://your-ticket-sales-url.com/regular', '_blank')
```

### ✅ 完成！

修改完成後，網站將會：
- ❌ 移除所有「尚未開賣」彈跳視窗
- ✅ 購票按鈕直接連結到實際購票頁面
- ✅ 顯示正常的販售期限和數量限制資訊

---

## 🔄 暫停販售 (如需要)

如果需要暫時暫停販售，只需將 `isTicketSaleActive` 改回 `false` 即可。

---

## 📅 進階控制

### 時間控制
- `earlyBirdSaleStartDate`: 早鳥票開始日期
- `regularSaleStartDate`: 一般票開始日期  
- `saleEndDate`: 販售結束日期

### 個別票種控制
配置檔案包含以下函式可以做更細緻的控制：
- `isEarlyBirdAvailable()`: 檢查早鳥票是否可販售
- `isRegularTicketAvailable()`: 檢查一般票是否可販售

---

## 🚨 注意事項

1. **修改配置後會立即生效**，無需重新啟動服務
2. **請確保購票連結正確**，避免導向錯誤頁面
3. **建議先在測試環境驗證**後再發佈到正式環境
