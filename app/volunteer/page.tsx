/**
 * 志工系統入口頁面 - 自動重定向
 * 
 * 當用戶訪問 /volunteer 時，自動重定向到 /volunteer/registration
 * 這提供了更好的用戶體驗，讓 URL 更簡潔易記
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VolunteerIndexPage() {
  const router = useRouter()
  
  useEffect(() => {
    // 立即重定向到預設的報到組頁面
    router.replace('/volunteer/registration')
  }, [router])

  // 顯示載入狀態
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">正在跳轉至志工管理系統...</p>
      </div>
    </div>
  )
}