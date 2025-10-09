/**
 * 志工角色管理頁面
 * 動態路由支援 4 種角色：registration, guide, technical, venue
 * 
 * 功能特色：
 * - 單一頁面展示特定角色的排班資訊
 * - 實時進度追蹤與視覺化
 * - 角色間快速切換
 * - PWA 支援，可加入桌面書籤
 */

import { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import VolunteerDashboard from '@/components/volunteer-dashboard'
import { VOLUNTEER_CONFIG, getRoleById } from '@/config/volunteers'

interface VolunteerRolePageProps {
  params: Promise<{ role: string }>
}

// 生成動態 viewport
export async function generateViewport({ params }: VolunteerRolePageProps): Promise<Viewport> {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#000000'
  }
}

// 生成動態 metadata
export async function generateMetadata({ params }: VolunteerRolePageProps): Promise<Metadata> {
  const { role } = await params
  const roleData = getRoleById(role)
  
  if (!roleData) {
    return {
      title: 'Volunteer Role Not Found - DDD Taiwan 2025',
      description: 'The requested volunteer role was not found.'
    }
  }

  return {
    title: `${roleData.name['zh-tw']} - 志工管理 - DDD Taiwan 2025`,
    description: roleData.description['zh-tw'],
    openGraph: {
      title: `${roleData.name['zh-tw']} - 志工管理`,
      description: roleData.description['zh-tw'],
      type: 'website',
    },
    // PWA 支援：各角色可獨立加入桌面書籤
    manifest: `/manifest-volunteer-${role}.json`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: roleData.name['zh-tw']
    }
  }
}

// 生成靜態路徑
export async function generateStaticParams() {
  return VOLUNTEER_CONFIG.roles.map((role) => ({
    role: role.id
  }))
}

export default async function VolunteerRolePage({ params }: VolunteerRolePageProps) {
  const { role } = await params
  
  // 驗證角色是否存在
  const roleData = getRoleById(role)
  if (!roleData) {
    notFound()
  }

  // 驗證角色 ID 格式
  const validRoles = ['registration', 'guide', 'technical', 'venue']
  if (!validRoles.includes(role)) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 緊急狀況聯絡資訊 */}
      <div className="bg-red-500 text-white px-4 py-2 text-center text-sm">
        緊急聯絡：{VOLUNTEER_CONFIG.workingHours.start} - {VOLUNTEER_CONFIG.workingHours.end} | 
        電話：+886-2-1234-5678
      </div>
      
      {/* 主要儀表板 */}
      <main className="container mx-auto px-4 py-6">
        <VolunteerDashboard 
          currentRole={role}
          className="max-w-6xl mx-auto"
        />
      </main>
      
      {/* 頁面底部資訊 */}
      <footer className="bg-white dark:bg-gray-800 border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>DDD Taiwan 2025 志工管理系統 | 活動日期：{VOLUNTEER_CONFIG.eventDate}</p>
          <p className="mt-1">
            工作時段：{VOLUNTEER_CONFIG.workingHours.start} - {VOLUNTEER_CONFIG.workingHours.end}
          </p>
        </div>
      </footer>
    </div>
  )
}