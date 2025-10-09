/**
 * 志工管理儀表板
 * 包含角色切換、時間狀態、進度總覽與排班卡片
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/contexts/i18n-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Circle,
  ClipboardCheck,
  Navigation,
  Settings,
  Building
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  VOLUNTEER_CONFIG, 
  calculateVolunteerProgress, 
  getScheduleByRole, 
  getRoleById 
} from '@/config/volunteers'
import type { VolunteerRole, VolunteerSchedule } from '@/lib/data/types'

interface VolunteerDashboardProps {
  currentRole: string
  className?: string
}

// 圖標映射
const iconMap = {
  ClipboardCheck,
  Navigation, 
  Settings,
  Building
}

// 顏色樣式映射 (遵循專案的顏色限制)
const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      gradient: 'from-blue-500 to-cyan-500'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20', 
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      gradient: 'from-purple-500 to-pink-500'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400', 
      border: 'border-green-200 dark:border-green-800',
      gradient: 'from-green-500 to-emerald-500'
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800', 
      gradient: 'from-indigo-500 to-blue-500'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800',
      gradient: 'from-orange-500 to-red-500'
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-900/20',
      text: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-200 dark:border-pink-800',
      gradient: 'from-pink-500 to-rose-500'
    }
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

export default function VolunteerDashboard({ currentRole, className }: VolunteerDashboardProps) {
  const { t, language } = useI18n()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [progress, setProgress] = useState({
    overallProgress: 0,
    currentTask: null as VolunteerSchedule | null,
    nextTask: null as VolunteerSchedule | null,
    isWorkingHours: false
  })

  // 獲取當前角色資料
  const roleData = getRoleById(currentRole)
  const schedules = getScheduleByRole(currentRole)
  
  if (!roleData) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          找不到指定的志工角色：{currentRole}
        </AlertDescription>
      </Alert>
    )
  }

  // 實時更新時間與進度
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now)
      setProgress(calculateVolunteerProgress(now))
    }

    updateTime() // 初始化
    const interval = setInterval(updateTime, 1000) // 每秒更新

    return () => clearInterval(interval)
  }, [])

  // 如果時間還未初始化，顯示預設狀態
  if (!currentTime) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    )
  }

  // 角色切換
  const handleRoleSwitch = (roleId: string) => {
    router.push(`/volunteer/${roleId}`)
  }

  const colors = getColorClasses(roleData.color)
  const IconComponent = iconMap[roleData.icon as keyof typeof iconMap] || ClipboardCheck

  return (
    <div className={cn("space-y-6", className)}>
      {/* 角色選擇器 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('volunteer.roleSelector')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {VOLUNTEER_CONFIG.roles.map((role) => {
              const roleColors = getColorClasses(role.color)
              const RoleIcon = iconMap[role.icon as keyof typeof iconMap] || ClipboardCheck
              const isActive = role.id === currentRole
              
              return (
                <Button
                  key={role.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRoleSwitch(role.id)}
                  className={cn(
                    "h-auto flex-col gap-2 p-4",
                    isActive && `bg-gradient-to-r ${roleColors.gradient} text-white`
                  )}
                >
                  <RoleIcon className="h-5 w-5" />
                  <span className="text-xs font-medium">
                    {role.name[language as 'zh-tw' | 'en']}
                  </span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 當前角色資訊與時間狀態 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 角色資訊卡 */}
        <Card className={cn(colors.border)}>
          <CardHeader className={cn(colors.bg)}>
            <CardTitle className="flex items-center gap-3">
              <IconComponent className={cn("h-6 w-6", colors.text)} />
              <div>
                <h2 className="text-xl font-bold">
                  {roleData.name[language as 'zh-tw' | 'en']}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {roleData.description[language as 'zh-tw' | 'en']}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                {t('volunteer.responsibilities')}：
              </h4>
              <ul className="space-y-2">
                {roleData.responsibilities[language as 'zh-tw' | 'en'].map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 時間狀態卡 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('volunteer.timeStatus')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center" suppressHydrationWarning={true}>
              <div className="text-2xl font-mono font-bold">
                {currentTime.toLocaleTimeString('zh-TW', { 
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {currentTime.toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <div className="space-y-2" suppressHydrationWarning={true}>
              <div className="flex justify-between text-sm">
                <span>{t('volunteer.todayProgress')}</span>
                <span>{progress.overallProgress.toFixed(1)}%</span>
              </div>
              <Progress 
                value={progress.overallProgress} 
                className="h-2"
              />
            </div>

            <Badge 
              variant={progress.isWorkingHours ? "default" : "secondary"}
              className="w-full justify-center"
              suppressHydrationWarning={true}
            >
              {progress.isWorkingHours ? t('volunteer.workingHours') : t('volunteer.nonWorkingHours')}
            </Badge>

            {progress.currentTask && (
              <div className={cn("p-3 rounded-lg", colors.bg)} suppressHydrationWarning={true}>
                <div className="text-sm font-medium">{t('volunteer.currentTask')}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {progress.currentTask.title[language as 'zh-tw' | 'en']}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 排班卡片列表 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('volunteer.todaySchedule')}</h3>
        <div className="grid gap-4">
          {schedules.map((schedule, index) => (
            <ScheduleCard
              key={index}
              schedule={schedule}
              colors={colors}
              isActive={progress.currentTask?.timeSlot === schedule.timeSlot}
              isCompleted={false} // TODO: 實作完成狀態邏輯
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 排班卡片子組件
interface ScheduleCardProps {
  schedule: VolunteerSchedule
  colors: ReturnType<typeof getColorClasses>
  isActive: boolean
  isCompleted: boolean
}

function ScheduleCard({ schedule, colors, isActive, isCompleted }: ScheduleCardProps) {
  const { t, language } = useI18n()
  
  // ProgressBar 背景效果（僅在當前活動任務時顯示）
  const progressBarStyle = isActive ? {
    background: `linear-gradient(135deg, ${colors.gradient.replace('from-', '').replace('to-', ', ')})`,
    backgroundSize: '200% 200%',
    animation: 'gradientShift 3s ease-in-out infinite'
  } : {}

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isActive && "ring-2 ring-blue-500 shadow-lg",
        isCompleted && "opacity-60"
      )}
      style={progressBarStyle}
    >
      {/* 優先級指示器 */}
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        schedule.priority === 'high' && "bg-red-500",
        schedule.priority === 'medium' && "bg-yellow-500", 
        schedule.priority === 'low' && "bg-green-500"
      )} />
      
      <CardContent className="p-6 pl-8">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            {/* 標題與時間 */}
            <div className="flex items-center gap-3">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : isActive ? (
                <Circle className="h-5 w-5 text-blue-500 animate-pulse" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <h4 className="font-semibold">
                  {schedule.title[language as 'zh-tw' | 'en']}
                </h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {schedule.timeSlot}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {schedule.location[language as 'zh-tw' | 'en']}
                  </span>
                </div>
              </div>
            </div>

            {/* 描述與備註 */}
            {schedule.notes && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {schedule.notes[language as 'zh-tw' | 'en']}
              </p>
            )}

            {/* 聯絡人資訊 */}
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3" />
              <span>{t('volunteer.contactPerson')}：{schedule.contactPerson}</span>
            </div>
          </div>

          {/* 狀態徽章 */}
          <div className="flex flex-col gap-2">
            <Badge 
              variant={schedule.priority === 'high' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {schedule.priority === 'high' ? t('volunteer.highPriority') : 
               schedule.priority === 'medium' ? t('volunteer.mediumPriority') : t('volunteer.lowPriority')}
            </Badge>
            
            <Badge variant="outline" className="text-xs">
              {schedule.estimatedDuration} {t('volunteer.minutes')}
            </Badge>
          </div>
        </div>
      </CardContent>

      {/* CSS 動畫樣式 */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </Card>
  )
}