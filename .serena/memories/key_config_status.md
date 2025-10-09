# 關鍵配置與狀態 (最新版)

## 🎫 票券銷售配置 (config/tickets.ts)
```typescript
TICKET_SALE_CONFIG: {
  isTicketSaleActive: true,          // 🎯 開賣控制開關 - 已啟動
  earlyBirdSaleStartDate: "2025-09-03",
  regularSaleStartDate: "2025-10-16", 
  saleEndDate: "2025-11-07",
  purchaseUrl: "https://www.accupass.com/eflow/ticket/2508301008076132622520",
  isEarlyBirdSoldOut: true,          // 🎯 早鳥票售罄狀態
  promoCode: {
    isVisible: false,                // 🎟️ 優惠碼 - 已到期移除
    code: ""
  }
}
```

## 📊 當前銷售狀態
- **票券開賣**: ✅ 啟動中 (isTicketSaleActive: true)
- **早鳥票**: ❌ 已售完 (isEarlyBirdSoldOut: true)  
- **一般票**: ✅ 販售中
- **優惠碼**: ❌ 已停用 (promoCode.isVisible: false)
- **購票平台**: Accupass 整合

## ⚙️ 其他關鍵配置

### 議程配置 (config/agenda.ts)
- 完整議程時間表和講者安排
- 動態時間計算和狀態顯示

### 效能配置 (config/performance.ts)
- Web Vitals 監控設定
- 圖片優化參數
- 快取策略配置

### 志工配置 (config/volunteers.ts)
- 志工招募狀態控制
- 職位類別和需求人數
- 報名表單配置

### 系統配置 (config/system.ts)
- 多語言設定
- 版本控制資訊
- 外部服務整合

## 🔄 配置驅動功能
所有功能狀態均透過配置檔案控制：
- 票券銷售邏輯完全配置化
- 功能開關無需修改程式碼
- 環境切換簡單快速
- A/B 測試支援完善

## 📈 配置檔案結構
```
config/
├── index.ts         # 統一匯出
├── tickets.ts       # 票券銷售
├── agenda.ts        # 議程安排
├── volunteers.ts    # 志工系統
├── performance.ts   # 效能監控
├── system.ts        # 系統設定
├── app.ts          # 應用配置
└── constants.ts    # 全域常數
```