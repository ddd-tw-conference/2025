/**
 * 議程資料管理
 * 包含議程時段、講者分配和會場資訊
 */

import type { Session } from './types'

export const AGENDA_DATA: Session[] = [
  {
    time: "09:00 - 12:00",
    title: { 'zh-tw': "從敘事到塑模", 'en': "From Storytelling to Modeling" },
  speaker: "陳勉修(Michael)，Sunny Cheng",
    description: { 'zh-tw': "用Domain Storytelling建立跨職能對齊的語意基礎。", 'en': "Building Cross-functional Semantic Foundation with Domain Storytelling." },
    track: { 'zh-tw': "主會場 A", 'en': "Main Hall A" },
    type: "workshop",
  },
  {
    time: "09:00 - 12:00",
    title: { 'zh-tw': "AI輔助軟體開發", 'en': "AI-Assisted Software Development" },
    speaker: "Arthur，李民偉(Ean)，Stephen",
    description: { 'zh-tw': "在軟體3.0時代，掌握AI驅動的開發語言。", 'en': "Mastering AI-driven development languages in the Software 3.0 era." },
    track: { 'zh-tw': "會議室 B", 'en': "Conference Room B" },
    type: "workshop",
  },
  {
    time: "13:00 - 16:00",
    title: { 'zh-tw': "DX with AI", 'en': "DX with AI" },
    speaker: "劉鳳軒(Fong)，李智樺(Ruddy 老師)",
    description: { 'zh-tw': "從事件響應自動化到開發流程重塑，探索AI如何改變開發者的工作體驗與協作模式。", 'en': "From incident response automation to development process transformation, exploring how AI changes developer experience and collaboration patterns." },
    track: { 'zh-tw': "主會場 A", 'en': "Main Hall A" },
    type: "workshop",
  },
  {
    time: "13:00 - 16:00",
    title: { 'zh-tw': "文件即程式碼", 'en': "Documentation as Code" },
    speaker: "River，Tung，水球潘",
    description: { 'zh-tw': "文件即程式碼，串接版本控制與自動化。", 'en': "Documentation as Code: Integrating Version Control and Automation." },
    track: { 'zh-tw': "會議室 B", 'en': "Conference Room B" },
    type: "workshop",
  }
]
