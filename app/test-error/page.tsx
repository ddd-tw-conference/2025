'use client'

export default function TestError() {
  // 故意拋出錯誤來測試錯誤頁面
  throw new Error('這是一個測試錯誤')
  
  return <div>This should not be rendered</div>
}
