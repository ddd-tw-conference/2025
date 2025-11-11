/**
 * 投影片工具函式
 * 提供投影片資源的查詢與 URL 轉換功能
 */

import { SLIDE_ASSETS_CONFIG } from '@/config/slide-assets';
import type { SlideAsset } from '@/config/slide-assets';

/**
 * 判斷投影片的存取模式與生成對應 URL
 * 
 * @param asset - 投影片資源物件
 * @returns 包含 url 與 mode 的物件
 * 
 * mode 說明：
 * - download: 可直接下載 (Google Drive)
 * - view: 僅供線上檢視 (Canva/Gamma/SlideShare)
 * - none: 無效連結
 * 
 * @example
 * // Google Drive 連結
 * getSlideAction({
 *   provider: 'gdrive',
 *   rawUrl: 'https://docs.google.com/presentation/d/1LbmLMj.../edit?...'
 * })
 * // returns { url: 'https://drive.google.com/uc?export=download&id=1LbmLMj...', mode: 'download' }
 * 
 * @example
 * // Canva 連結
 * getSlideAction({
 *   provider: 'canva',
 *   rawUrl: 'https://www.canva.com/design/DAG4BxINGI0/...'
 * })
 * // returns { url: 'https://www.canva.com/design/DAG4BxINGI0/...', mode: 'view' }
 */
export function getSlideAction(asset: {
  provider: 'gdrive' | 'canva' | 'gamma' | 'slideshare';
  rawUrl: string;
}) {
  // Google Drive: 轉換為直接下載連結
  if (asset.provider === 'gdrive') {
    const match = asset.rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return {
        url: `https://drive.google.com/uc?export=download&id=${match[1]}`,
        mode: 'download' as const
      };
    }
  }
  
  // Canva / Gamma / SlideShare: 使用原連結，僅供檢視
  if (asset.provider === 'canva' || asset.provider === 'gamma' || asset.provider === 'slideshare') {
    return { url: asset.rawUrl, mode: 'view' as const };
  }
  
  return { url: '', mode: 'none' as const };
}

/**
 * 根據 segmentKey 與 speakerIds 篩選對應的投影片資源
 * 
 * @param segmentKey - 議程識別 key
 * @param speakerIds - 講者 ID 陣列
 * @returns 符合條件的投影片資源陣列
 * 
 * @example
 * getSegmentAssets('documentation-as-code-dac-x-document-driven-development', ['tung'])
 * // returns [{ segmentKey: '...', speakerId: 'tung', provider: 'gdrive', ... }]
 */
export function getSegmentAssets(segmentKey: string, speakerIds: string[]): SlideAsset[] {
  return SLIDE_ASSETS_CONFIG.filter(
    a => a.segmentKey === segmentKey && speakerIds.includes(a.speakerId)
  );
}
