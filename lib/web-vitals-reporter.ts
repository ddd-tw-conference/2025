import { CLSMetric, FCPMetric, INPMetric, LCPMetric, TTFBMetric } from 'web-vitals';

// Web Vitals 指標類型定義
type WebVitalsMetric = CLSMetric | FCPMetric | INPMetric | LCPMetric | TTFBMetric;

// 效能數據介面
interface PerformanceData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  url: string;
  timestamp: number;
  userAgent: string;
  connectionType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  screenResolution?: string;
  devicePixelRatio?: number;
  viewportSize?: string;
  sessionId?: string;
}

// 會話 ID 生成
let sessionId: string | null = null;
function getSessionId(): string {
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  return sessionId;
}

// 智能採樣策略
function shouldSample(): boolean {
  // 開發環境：100% 採樣
  if (process.env.NODE_ENV === 'development') return true;
  
  // 生產環境：10% 採樣，避免過多數據
  return Math.random() < 0.1;
}

// 效能閾值配置 (2024年最新標準)
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 },      // 新指標，取代 FID
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  FID: { good: 100, poor: 300 }       // 保留相容性
} as const;

// 獲取評級
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// 獲取設備資訊
function getDeviceInfo() {
  const nav = navigator as Navigator & {
    connection?: { 
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
    };
    deviceMemory?: number;
  };
  
  return {
    connectionType: nav.connection?.effectiveType || 'unknown',
    downlink: nav.connection?.downlink || 0,
    rtt: nav.connection?.rtt || 0,
    saveData: nav.connection?.saveData || false,
    deviceMemory: nav.deviceMemory || 0,
    hardwareConcurrency: nav.hardwareConcurrency || 0,
    screenResolution: `${screen.width}x${screen.height}`,
    devicePixelRatio: window.devicePixelRatio || 1,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`
  };
}

// 定義 gtag 函數類型
interface GTagFunction {
  (command: string, eventName: string, parameters: Record<string, unknown>): void
}

// 發送效能資料到 Google Analytics 4 (如果有設置)
function sendToGA4(metric: PerformanceData) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: GTagFunction }).gtag) {
    (window as unknown as { gtag: GTagFunction }).gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      connection_type: metric.connectionType,
      device_memory: metric.deviceMemory,
      viewport_size: metric.viewportSize,
      session_id: metric.sessionId,
      // 自定義維度
      custom_parameter_1: metric.rating,
      custom_parameter_2: metric.connectionType,
      custom_parameter_3: metric.deviceMemory?.toString()
    });
  }
}

// 發送效能資料到控制台（開發環境）
function sendToConsole(metric: PerformanceData) {
  // 在生產環境中不輸出 console logs 以提升效能
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    // 簡化的 console 輸出
    console.info(`${emoji} ${metric.name}: ${metric.value} (${metric.rating})`);
  }
}

// 儲存效能資料到 localStorage
function storeMetric(metric: PerformanceData) {
  if (typeof window === 'undefined') return;
  
  try {
    const storageKey = 'dddtw-web-vitals';
    const existing = localStorage.getItem(storageKey);
    const metrics = existing ? JSON.parse(existing) : [];
    
    // 保留最新的 50 筆記錄
    metrics.push(metric);
    const recentMetrics = metrics.slice(-50);
    
    localStorage.setItem(storageKey, JSON.stringify(recentMetrics));
  } catch {
    // 靜默處理 localStorage 錯誤，避免在生產環境中產生不必要的警告
  }
}

// 主要的效能報告函數
export function reportWebVitals(metric: WebVitalsMetric) {
  // 檢查是否在支援的環境中執行
  if (typeof window === 'undefined') return;
  
  // 智能採樣
  if (!shouldSample()) return;
  
  try {
    const deviceInfo = getDeviceInfo();
    
    const performanceData: PerformanceData = {
      name: metric.name,
      value: metric.value,
      rating: getRating(metric.name, metric.value),
      delta: metric.delta,
      id: metric.id,
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      sessionId: getSessionId(),
      ...deviceInfo
    };

    // 發送到各種目標
    sendToConsole(performanceData);
    sendToGA4(performanceData);
    storeMetric(performanceData);
    
    // 觸發自定義事件，允許其他組件監聽
    window.dispatchEvent(new CustomEvent('webVitalsReported', { 
      detail: performanceData 
    }));
    
  } catch (error) {
    // 靜默處理錯誤，避免影響用戶體驗
    if (process.env.NODE_ENV === 'development') {
      console.warn('Web Vitals reporting failed:', error);
    }
  }
}

// 獲取儲存的效能資料
export function getStoredMetrics(): PerformanceData[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('dddtw-web-vitals');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// 清除儲存的效能資料
export function clearStoredMetrics() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('dddtw-web-vitals');
}

// 獲取效能摘要
export function getPerformanceSummary() {
  const metrics = getStoredMetrics();
  if (metrics.length === 0) return null;
  
  const summary: Record<string, { good: number; needsImprovement: number; poor: number; average: number }> = {};
  
  metrics.forEach(metric => {
    if (!summary[metric.name]) {
      summary[metric.name] = { good: 0, needsImprovement: 0, poor: 0, average: 0 };
    }
    
    summary[metric.name][metric.rating === 'needs-improvement' ? 'needsImprovement' : metric.rating]++;
  });
  
  // 計算平均值
  Object.keys(summary).forEach(name => {
    const nameMetrics = metrics.filter(m => m.name === name);
    const total = nameMetrics.reduce((sum, m) => sum + m.value, 0);
    summary[name].average = total / nameMetrics.length;
  });
  
  return summary;
}

// 新增：性能洞察分析
export function getPerformanceInsights() {
  const metrics = getStoredMetrics();
  if (metrics.length === 0) return null;
  
  const insights = {
    totalSessions: new Set(metrics.map(m => m.sessionId)).size,
    deviceTypes: {} as Record<string, number>,
    connectionTypes: {} as Record<string, number>,
    performanceTrends: {} as Record<string, { improving: boolean; trend: number }>,
    recommendations: [] as string[]
  };
  
  // 統計設備類型
  metrics.forEach(metric => {
    const deviceType = metric.deviceMemory && metric.deviceMemory >= 4 ? 'high-end' : 'mid-range';
    insights.deviceTypes[deviceType] = (insights.deviceTypes[deviceType] || 0) + 1;
    
    if (metric.connectionType) {
      insights.connectionTypes[metric.connectionType] = (insights.connectionTypes[metric.connectionType] || 0) + 1;
    }
  });
  
  // 生成建議
  const lcpMetrics = metrics.filter(m => m.name === 'LCP');
  const avgLCP = lcpMetrics.reduce((sum, m) => sum + m.value, 0) / lcpMetrics.length;
  
  if (avgLCP > 2500) {
    insights.recommendations.push('考慮優化圖片載入和字體載入策略');
  }
  
  const clsMetrics = metrics.filter(m => m.name === 'CLS');
  const avgCLS = clsMetrics.reduce((sum, m) => sum + m.value, 0) / clsMetrics.length;
  
  if (avgCLS > 0.1) {
    insights.recommendations.push('檢查動態內容載入，避免版面位移');
  }
  
  return insights;
}
