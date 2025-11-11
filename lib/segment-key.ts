/**
 * Segment Key 產生器
 * 將議程英文標題轉換為 kebab-case 格式的識別碼
 */

/**
 * 從議程英文標題生成 kebab-case 的 segmentKey
 * 用於與投影片資源的 segmentKey 進行匹配
 * 
 * @param enTitle - 議程英文標題
 * @returns kebab-case 格式的 key
 * 
 * @example
 * segmentKeyFromTitle("Documentation as Code (DaC)  X  Document-Driven Development")
 * // returns "documentation-as-code-dac-x-document-driven-development"
 * 
 * @example
 * segmentKeyFromTitle("In the AI and Low-Code Era, Why Does Faster Development Lead to Harder-to-Maintain Architecture?")
 * // returns "in-the-ai-and-low-code-era-why-does-faster-development-lead-to-harder-to-maintain-architecture"
 */
export function segmentKeyFromTitle(enTitle: string): string {
  return enTitle
    .toLowerCase()                    // 轉為小寫
    .replace(/[^a-z0-9]+/g, '-')      // 非英數字符轉為連字符
    .replace(/^-+|-+$/g, '');         // 移除首尾連字符
}
