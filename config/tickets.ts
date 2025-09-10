/**
 * 票券販售配置
 * 當需要開始販售票券時，只需要將 isTicketSaleActive 設為 true
 */

export interface TicketSaleConfig {
  isTicketSaleActive: boolean
  earlyBirdSaleStartDate?: string // YYYY-MM-DD format
  regularSaleStartDate?: string // YYYY-MM-DD format
  saleEndDate?: string // YYYY-MM-DD format
  purchaseUrl: string // Accupass 購票連結
  isEarlyBirdSoldOut?: boolean // 早鳥票是否售罄
  promoCode?: {
    isVisible: boolean // 優惠碼是否顯示
    code?: string // 優惠碼內容（由 Accupass 管理兌換次數）
  }
}

export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  // 🎯 開賣控制開關 - 設為 true 即可開始販售
  isTicketSaleActive: true,
  
  // 預計開賣日期 (可選，用於顯示)
  earlyBirdSaleStartDate: "2025-09-03",
  regularSaleStartDate: "2025-10-16", 
  saleEndDate: "2025-11-07",
  
  // 🎫 Accupass 購票連結 - 統一管理購票入口
  purchaseUrl: "https://www.accupass.com/eflow/ticket/2508301008076132622520",
  
  // 🎯 早鳥票售罄狀態
  isEarlyBirdSoldOut: true,
  
  // 🎟️ 優惠碼設定 - 已啟動！
  promoCode: {
    isVisible: true,
    code: "PS3ETZ"
  }
}

/**
 * 取得購票連結
 */
export const getTicketPurchaseUrl = (): string => {
  return TICKET_SALE_CONFIG.purchaseUrl
}

/**
 * 檢查票券是否可以販售
 */
export const isTicketAvailable = (): boolean => {
  return TICKET_SALE_CONFIG.isTicketSaleActive
}

/**
 * 檢查早鳥票是否可以販售
 */
export const isEarlyBirdAvailable = (): boolean => {
  if (!TICKET_SALE_CONFIG.isTicketSaleActive) return false
  if (TICKET_SALE_CONFIG.isEarlyBirdSoldOut) return false
  
  const today = new Date()
  const earlyBirdEnd = new Date(TICKET_SALE_CONFIG.regularSaleStartDate || "2025-10-16")
  
  return today < earlyBirdEnd
}

/**
 * 檢查一般票是否可以販售
 */
export const isRegularTicketAvailable = (): boolean => {
  if (!TICKET_SALE_CONFIG.isTicketSaleActive) return false
  
  const today = new Date()
  const saleEnd = new Date(TICKET_SALE_CONFIG.saleEndDate || "2025-11-07")
  
  return today <= saleEnd
}
