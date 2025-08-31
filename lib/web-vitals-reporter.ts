import { CLSMetric, FCPMetric, INPMetric, LCPMetric, TTFBMetric, Metric } from 'web-vitals';

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
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

// 效能閾值配置
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 }
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
  const nav = navigator as any;
  return {
    connectionType: nav.connection?.effectiveType || 'unknown',
    deviceMemory: nav.deviceMemory || 0,
    hardwareConcurrency: nav.hardwareConcurrency || 0
  };
}

// 發送效能資料到 Google Analytics 4 (如果有設置)
function sendToGA4(metric: PerformanceData) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
      custom_map: {
        custom_parameter_1: metric.rating
      }
    });
  }
}

// 發送效能資料到控制台（開發環境）
function sendToConsole(metric: PerformanceData) {
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.group(`${emoji} Web Vitals: ${metric.name}`);
    console.log(`Value: ${metric.value}`);
    console.log(`Rating: ${metric.rating}`);
    console.log(`URL: ${metric.url}`);
    console.log(`Device Info:`, {
      connectionType: metric.connectionType,
      deviceMemory: metric.deviceMemory,
      hardwareConcurrency: metric.hardwareConcurrency
    });
    console.groupEnd();
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
  } catch (error) {
    console.warn('無法儲存 Web Vitals 資料到 localStorage:', error);
  }
}

// 主要的效能報告函數
export function reportWebVitals(metric: WebVitalsMetric) {
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
    ...deviceInfo
  };

  // 發送到各種目標
  sendToConsole(performanceData);
  sendToGA4(performanceData);
  storeMetric(performanceData);
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
