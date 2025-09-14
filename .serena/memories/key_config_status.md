# 關鍵配置與狀態

## 票券銷售配置 (config/tickets.ts)
```typescript
TICKET_SALE_CONFIG: {
  isTicketSaleActive: true,          // 🎯 開賣控制開關
  earlyBirdSaleStartDate: "2025-09-03",
  regularSaleStartDate: "2025-10-16", 
  saleEndDate: "2025-11-07",
  purchaseUrl: "https://www.accupass.com/eflow/ticket/2508301008076132622520",
  isEarlyBirdSoldOut: true,          // 🎯 早鳥票售罄狀態
  promoCode: {
    isVisible: true,                 // 🎟️ 優惠碼設定 - 已啟動！
    code: "PS3ETZ"
  }
}
```

## 重要狀態值
- **票券開賣**: ✅ 啟動中 (isTicketSaleActive: true)
- **早鳥票**: ❌ 已售完 (isEarlyBirdSoldOut: true)  
- **優惠碼**: ✅ 顯示中 (promoCode.isVisible: true, code: "PS3ETZ")
- **購票連結**: Accupass 平台

## 關鍵功能開關
- 票券銷售狀態控制
- 早鳥票/一般票切換邏輯
- 促銷碼顯示/隱藏機制
- 購票平台導向邏輯

## 配置驅動的功能
所有票券相關功能均透過此配置控制，無需修改業務邏輯程式碼即可調整銷售策略。