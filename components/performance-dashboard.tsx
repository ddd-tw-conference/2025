'use client'

import * as React from "react"
import { getStoredMetrics, getPerformanceSummary, clearStoredMetrics } from "@/lib/web-vitals-reporter"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  name: string
  data: {
    good: number
    needsImprovement: number
    poor: number
    average: number
  }
}

function MetricCard({ name, data }: MetricCardProps) {
  const total = data.good + data.needsImprovement + data.poor
  const goodPercentage = total > 0 ? (data.good / total) * 100 : 0
  const needsImprovementPercentage = total > 0 ? (data.needsImprovement / total) * 100 : 0
  const poorPercentage = total > 0 ? (data.poor / total) * 100 : 0

  const formatValue = (name: string, value: number) => {
    switch (name) {
      case 'CLS':
        return value.toFixed(3)
      case 'FCP':
      case 'LCP':
      case 'TTFB':
      case 'INP':
        return `${Math.round(value)}ms`
      default:
        return Math.round(value).toString()
    }
  }

  const getDescription = (name: string) => {
    switch (name) {
      case 'CLS':
        return '累積版面位移 - 頁面載入過程中元素移動的程度'
      case 'FCP':
        return '首次內容繪製 - 第一個內容元素渲染的時間'
      case 'LCP':
        return '最大內容繪製 - 最大元素完全載入的時間'
      case 'TTFB':
        return '首位元組時間 - 伺服器回應第一個位元組的時間'
      case 'INP':
        return '互動至下一個繪製 - 使用者互動到頁面更新的時間'
      default:
        return '效能指標'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {getDescription(name)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatValue(name, data.average)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">平均值</div>
        </div>
      </div>
      
      {total > 0 && (
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>評分分布 ({total} 次測量)</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div className="h-full flex">
              <div 
                className="bg-green-500 h-full" 
                style={{ width: `${goodPercentage}%` }}
                title={`良好: ${data.good} 次 (${goodPercentage.toFixed(1)}%)`}
              />
              <div 
                className="bg-yellow-500 h-full" 
                style={{ width: `${needsImprovementPercentage}%` }}
                title={`需改善: ${data.needsImprovement} 次 (${needsImprovementPercentage.toFixed(1)}%)`}
              />
              <div 
                className="bg-red-500 h-full" 
                style={{ width: `${poorPercentage}%` }}
                title={`差: ${data.poor} 次 (${poorPercentage.toFixed(1)}%)`}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>✅ {goodPercentage.toFixed(1)}%</span>
            <span>⚠️ {needsImprovementPercentage.toFixed(1)}%</span>
            <span>❌ {poorPercentage.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PerformanceDashboard() {
  const [summary, setSummary] = React.useState<any>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [rawMetrics, setRawMetrics] = React.useState<any[]>([])
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    
    const updateData = () => {
      setSummary(getPerformanceSummary())
      setRawMetrics(getStoredMetrics())
    }
    
    updateData()
    
    // 每 5 秒更新一次資料
    const interval = setInterval(updateData, 5000)
    return () => clearInterval(interval)
  }, [])

  // 在客戶端掛載前不渲染任何內容
  if (!isMounted) {
    return null
  }

  const handleClearData = () => {
    if (confirm('確定要清除所有效能資料嗎？')) {
      clearStoredMetrics()
      setSummary(null)
      setRawMetrics([])
    }
  }

  // 只在開發環境顯示
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      {/* 浮動按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="效能儀表板"
      >
        📊
      </button>

      {/* 儀表板面板 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    效能監控儀表板
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Web Vitals 即時效能指標監控
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleClearData}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    清除資料
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    關閉
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {summary ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Object.entries(summary).map(([name, data]: [string, any]) => (
                      <MetricCard key={name} name={name} data={data} />
                    ))}
                  </div>

                  {rawMetrics.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        最近的測量記錄 ({rawMetrics.length})
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                        <div className="space-y-2 text-sm">
                          {rawMetrics.slice(-10).reverse().map((metric, index) => (
                            <div key={index} className="flex items-center justify-between py-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                              <div className="flex items-center space-x-3">
                                <span className="font-mono font-medium">{metric.name}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  metric.rating === 'good' ? 'bg-green-100 text-green-800' :
                                  metric.rating === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {metric.rating}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                <span>{metric.name === 'CLS' ? metric.value.toFixed(3) : `${Math.round(metric.value)}ms`}</span>
                                <span className="text-xs">
                                  {new Date(metric.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    尚無效能資料
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    請瀏覽網站頁面以開始收集 Web Vitals 資料
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    資料會在您使用網站時自動收集
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
