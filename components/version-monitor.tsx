/**
 * 版本檢查監控工具
 * 使用快捷鍵 Ctrl+Shift+V 開啟/關閉
 */

"use client"

import { useEffect, useState } from 'react'

interface RequestLog {
  timestamp: number
  url: string
  status: 'success' | 'error'
  details?: string
}

export function VersionMonitor() {
  const [requests, setRequests] = useState<RequestLog[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 攔截 fetch 請求來監控版本檢查
    const originalFetch = window.fetch
    
    window.fetch = async (...args) => {
      const [input] = args
      let url = ''
      
      if (typeof input === 'string') {
        url = input
      } else if (input instanceof URL) {
        url = input.href
      } else if (input instanceof Request) {
        url = input.url
      }
      
      // 只記錄 version.json 請求
      if (url.includes('version.json')) {
        const timestamp = Date.now()
        console.log(`🔍 Version check intercepted: ${url}`)
        
        try {
          const response = await originalFetch(...args)
          setRequests(prev => [...prev, {
            timestamp,
            url,
            status: response.ok ? 'success' as const : 'error' as const,
            details: `HTTP ${response.status}`
          }].slice(-50)) // 保留最近 50 次請求
          
          return response
        } catch (error) {
          setRequests(prev => [...prev, {
            timestamp,
            url,
            status: 'error' as const,
            details: error instanceof Error ? error.message : 'Unknown error'
          }].slice(-50))
          
          throw error
        }
      }
      
      return originalFetch(...args)
    }

    // 鍵盤快捷鍵切換顯示
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.fetch = originalFetch
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 text-xs text-gray-500 bg-black/80 text-white px-2 py-1 rounded opacity-50 hover:opacity-100 transition-opacity">
        Ctrl+Shift+V 顯示版本監控
      </div>
    )
  }

  const now = Date.now()
  const recentRequests = requests.filter(req => now - req.timestamp < 10 * 60 * 1000) // 最近 10 分鐘
  const successCount = recentRequests.filter(req => req.status === 'success').length
  const errorCount = recentRequests.filter(req => req.status === 'error').length

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-black/95 text-white p-4 rounded-lg shadow-xl border border-gray-600 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">🔍 版本檢查監控</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-4 p-2 bg-gray-800/50 rounded">
          <div>
            <p className="text-green-400 font-semibold">✅ 成功: {successCount}</p>
            <p className="text-red-400 font-semibold">❌ 失敗: {errorCount}</p>
          </div>
          <div>
            <p className="text-blue-400">總計: {requests.length}</p>
            <p className="text-yellow-400">最近10分鐘: {recentRequests.length}</p>
          </div>
        </div>
        
        {recentRequests.length > 1 && (
          <div className="p-2 bg-blue-900/30 rounded text-xs">
            <p className="text-blue-300">平均間隔: {
              Math.round((recentRequests[recentRequests.length - 1].timestamp - recentRequests[0].timestamp) / (recentRequests.length - 1) / 1000)
            } 秒</p>
          </div>
        )}
        
        <div className="space-y-1 max-h-48 overflow-y-auto">
          <h4 className="text-gray-300 font-medium border-b border-gray-600 pb-1">請求歷史</h4>
          {requests.slice().reverse().map((req, index) => (
            <div key={index} className={`text-xs p-2 rounded ${
              req.status === 'success' ? 'bg-green-900/20' : 'bg-red-900/20'
            }`}>
              <div className="flex justify-between items-start">
                <span className={req.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                  {new Date(req.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-gray-400 text-xs">{req.details}</span>
              </div>
              <div className="text-gray-300 truncate mt-1">{req.url}</div>
            </div>
          ))}
        </div>
        
        {requests.length === 0 && (
          <p className="text-gray-400 text-center py-4">尚無版本檢查請求</p>
        )}
        
        <div className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-600">
          🎯 預期行為：每 60 秒最多 1 次請求<br/>
          🚀 路由切換：延遲 5 秒後檢查<br/>
          ⏰ 定期檢查：每 10 分鐘一次
        </div>
      </div>
    </div>
  )
}
