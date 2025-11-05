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
    segments: [
      {
        duration: 30,
        title: { 'zh-tw': "領域故事基礎", 'en': "Domain Story Fundamentals" },
        description: { 
          'zh-tw': "介紹Domain Storytelling的核心概念與實務應用，建立跨職能對齊的語意基礎。", 
          'en': "Introducing core concepts and practical applications of Domain Storytelling, establishing a common language foundation." 
        },
        speakerIds: ["michael-chen"],
        keywords: { 
          'zh-tw': ["領域故事", "通用語言", "圖形語言"], 
          'en': ["Domain Story", "Ubiquitous Language", "Graphical Language"] 
        },
        type: "knowledge"
      },
      {
        duration: 10,
        title: { 'zh-tw': "休息時間", 'en': "Break Time" },
        description: { 
          'zh-tw': "短暫休息，準備進入工作坊環節。", 
          'en': "Short break to prepare for the workshop session." 
        },
        speakerIds: [],
        keywords: { 
          'zh-tw': ["休息", "準備"], 
          'en': ["Break", "Preparation"] 
        },
        type: "break"
      },
      {
        duration: 90,
        title: { 'zh-tw': "從敘事到塑模實作工作坊", 'en': "From Storytelling to Modeling Workshop" },
        description: { 
          'zh-tw': "透過實際案例練習Domain Storytelling技法，從故事到模型的轉換過程。", 
          'en': "Practice Domain Storytelling techniques through real cases, from stories to model transformation." 
        },
        speakerIds: ["michael-chen"],
        keywords: { 
          'zh-tw': ["AI輔助", "案例分析", "領域建模"], 
          'en': ["AI Assistance", "Case Study", "Domain Modeling"] 
        },
        type: "workshop"
      },
      {
        duration: 20,
        title: { 'zh-tw': "休息時間 — 專家面對面", 'en': "Break Time — Face-to-Face with Experts" },
        description: { 
          'zh-tw': "20 分鐘專家諮詢，現場與專家面對面交流。", 
          'en': "20-minute expert consultation, on-site face-to-face with experts." 
        },
        speakerIds: ["expert-morning-kao"],
        keywords: { 
          'zh-tw': ["專家面對面", "諮詢"], 
          'en': ["Face-to-Face", "Consultation"] 
        },
        type: "break"
      },
      {
        duration: 30,
        title: { 'zh-tw': "喜劇公司的DDD導入歷程", 'en': "DDD Implementation Journey in a Comedy Company" },
        description: { 
          'zh-tw': "分享薩泰爾娛樂如何導入DDD，探討娛樂產業中的領域建模挑戰與解決方案。", 
          'en': "Sharing how Satire Entertainment implemented DDD, exploring domain modeling challenges and solutions in the entertainment industry." 
        },
        speakerIds: ["sunny-cheng"],
        keywords: { 
          'zh-tw': ["DDD導入", "領域建模", "組織轉型"], 
          'en': ["DDD Implementation", "Domain Modeling", "Organizational Transformation"] 
        },
        type: "practice"
      }
    ]
  },
  {
    time: "09:00 - 12:00",
    title: { 'zh-tw': "文件即程式碼", 'en': "Documentation as Code" },
    speaker: "River，Tung，水球潘",
    description: { 'zh-tw': "文件即程式碼，串接版本控制與自動化。", 'en': "Documentation as Code: Integrating Version Control and Automation." },
    track: { 'zh-tw': "會議室 B", 'en': "Conference Room B" },
    type: "workshop",
    segments: [
      {
        duration: 30,
        title: { 'zh-tw': "文件即程式碼 (DaC) 自動化核心概念", 'en': "Documentation as Code (DaC) Automation Core Concepts" },
        description: { 
          'zh-tw': "探討DaC的核心理念與自動化實作策略，從手動轉向完全自動化的關鍵步驟與最佳實踐。", 
          'en': "Exploring DaC core concepts and automation implementation strategies, key steps and best practices for transitioning from manual to fully automated processes." 
        },
        speakerIds: ["tung"],
        keywords: { 
          'zh-tw': ["Documentation as Code", "自動化策略", "最佳實踐"], 
          'en': ["Documentation as Code", "Automation Strategy", "Best Practices"] 
        },
        type: "knowledge"
      },
      {
        duration: 10,
        title: { 'zh-tw': "休息時間", 'en': "Break Time" },
        description: { 
          'zh-tw': "短暫休息，準備進入文件自動化實作。", 
          'en': "Short break to prepare for documentation automation practice." 
        },
        speakerIds: [],
        keywords: { 
          'zh-tw': ["休息", "準備"], 
          'en': ["Break", "Preparation"] 
        },
        type: "break"
      },
      {
        duration: 90,
        title: { 'zh-tw': "DaC實作工作坊：從工具到流程", 'en': "DaC Implementation Workshop: From Tools to Processes" },
        description: { 
          'zh-tw': "實際操作DaC工具鏈，包含自動化文件生成、版本控制整合與持續部署的完整實作體驗。", 
          'en': "Hands-on experience with DaC tool chains, including automated documentation generation, version control integration, and continuous deployment implementation." 
        },
        speakerIds: ["river", "tung"],
        keywords: { 
          'zh-tw': ["DaC工具鏈", "自動化生成", "持續部署"], 
          'en': ["DaC Tool Chain", "Automated Generation", "Continuous Deployment"] 
        },
        type: "workshop"
      },
      {
        duration: 20,
        title: { 'zh-tw': "休息時間 — 專家面對面", 'en': "Break Time — Face-to-Face with Experts" },
        description: { 
          'zh-tw': "20 分鐘專家諮詢，現場與專家面對面交流。", 
          'en': "20-minute expert consultation, on-site face-to-face with experts." 
        },
        speakerIds: ["expert-morning-kao"],
        keywords: { 
          'zh-tw': ["專家面對面", "諮詢"], 
          'en': ["Face-to-Face", "Consultation"] 
        },
        type: "break"
      },
      {
        duration: 30,
        title: { 'zh-tw': "BDD+DDD自動化實踐經驗", 'en': "BDD+DDD Automation Practice Experience" },
        description: { 
          'zh-tw': "分享BDD與DDD結合的自動化實踐，從需求分析到程式碼實作的完整自動化流程與經驗總結。", 
          'en': "Sharing BDD and DDD combined automation practices, complete automated processes and experience summary from requirement analysis to code implementation." 
        },
        speakerIds: ["waterball"],
        keywords: { 
          'zh-tw': ["BDD+DDD", "自動化實踐", "完整流程"], 
          'en': ["BDD+DDD", "Automation Practice", "Complete Process"] 
        },
        type: "practice"
      }
    ]
  },
  {
  time: "13:30 - 16:30",
    title: { 'zh-tw': "DX with AI", 'en': "DX with AI" },
    speaker: "劉鳳軒(Fong)，李智樺(Ruddy 老師)",
    description: { 'zh-tw': "從事件響應自動化到開發流程重塑，探索AI如何改變開發者的工作體驗與協作模式。", 'en': "From incident response automation to development process transformation, exploring how AI changes developer experience and collaboration patterns." },
    track: { 'zh-tw': "主會場 A", 'en': "Main Hall A" },
    type: "workshop",
    segments: [
      {
        duration: 30,
        title: { 'zh-tw': "開發者體驗重新定義", 'en': "Redefining Developer Experience" },
        description: { 
          'zh-tw': "探討AI時代下開發者體驗的新定義與核心要素，從警示到行動的自動化思維。", 
          'en': "Exploring new definitions and core elements of developer experience in the AI era, from alert to action automation mindset." 
        },
        speakerIds: ["fong-liu"],
        keywords: { 
          'zh-tw': ["開發者體驗", "AI時代", "自動化思維"], 
          'en': ["Developer Experience", "AI Era", "Automation Mindset"] 
        },
        type: "knowledge"
      },
      {
        duration: 10,
        title: { 'zh-tw': "休息時間", 'en': "Break Time" },
        description: { 
          'zh-tw': "短暫休息，準備進入DX實作環節。", 
          'en': "Short break to prepare for DX implementation session." 
        },
        speakerIds: [],
        keywords: { 
          'zh-tw': ["休息", "準備"], 
          'en': ["Break", "Preparation"] 
        },
        type: "break"
      },
      {
        duration: 90,
        title: { 'zh-tw': "AI驅動的Incident Response工作坊", 'en': "AI-Driven Incident Response Workshop" },
        description: { 
          'zh-tw': "整合Logs、Code、Docs與Insights，重塑On-Call流程與團隊知識管理的實作工作坊。", 
          'en': "Hands-on workshop integrating Logs, Code, Docs and Insights to reshape On-Call processes and team knowledge management." 
        },
        speakerIds: ["fong-liu"],
        keywords: { 
          'zh-tw': ["Incident Response", "知識管理", "On-Call流程"], 
          'en': ["Incident Response", "Knowledge Management", "On-Call Process"] 
        },
        type: "workshop"
      },
      {
        duration: 30,
        title: { 'zh-tw': "AI未來與DDD演進", 'en': "AI Future and DDD Evolution" },
        description: { 
          'zh-tw': "從Henrik Kniberg五階段預言看DDD的演進，探討開發者在AI時代的角色轉變與未來機會。", 
          'en': "DDD Evolution from Henrik Kniberg's Five-Stage Prophecy, exploring developers' role transformation and future opportunities in the AI era." 
        },
        speakerIds: ["ruddy-lee"],
        keywords: { 
          'zh-tw': ["AI未來", "DDD演進", "未來機會"], 
          'en': ["AI Future", "DDD Evolution", "Future Opportunities"] 
        },
        type: "practice"
      }
    ]
  },
  {
  time: "13:30 - 16:30",
    title: { 'zh-tw': "AI輔助軟體開發", 'en': "AI-Assisted Software Development" },
    speaker: "Arthur，李民偉(Ean)，Stephen",
    description: { 'zh-tw': "在軟體3.0時代，掌握AI驅動的開發語言。", 'en': "Mastering AI-driven development languages in the Software 3.0 era." },
    track: { 'zh-tw': "會議室 B", 'en': "Conference Room B" },
    type: "workshop",
    segments: [
      {
        duration: 30,
        title: { 'zh-tw': "軟體3.0時代概覽", 'en': "Software 3.0 Era Overview" },
        description: { 
          'zh-tw': "探討軟體3.0時代的特徵，介紹AI時代下的開發方法與工具趨勢。", 
          'en': "Exploring characteristics of Software 3.0 era, introducing development methods and tool trends in the AI age." 
        },
        speakerIds: ["arthur"],
        keywords: { 
          'zh-tw': ["軟體3.0", "AI開發", "工具趨勢"], 
          'en': ["Software 3.0", "AI Development", "Tool Trends"] 
        },
        type: "knowledge"
      },
      {
        duration: 10,
        title: { 'zh-tw': "休息時間", 'en': "Break Time" },
        description: { 
          'zh-tw': "短暫休息，準備進入AI開發實戰。", 
          'en': "Short break to prepare for AI development practice." 
        },
        speakerIds: [],
        keywords: { 
          'zh-tw': ["休息", "準備"], 
          'en': ["Break", "Preparation"] 
        },
        type: "break"
      },
      {
        duration: 90,
        title: { 'zh-tw': "AI輔助開發核心技能工作坊", 'en': "AI-Assisted Development Core Skills Workshop" },
        description: { 
          'zh-tw': "深度探索AI時代開發者必備的三大核心技能：上下文工程掌握AI互動精髓、架構思維建構可維護系統、BDD確保需求與實作一致。", 
          'en': "Deep exploration of three essential core skills for developers in the AI era: Context Engineering for mastering AI interaction, Architectural Thinking for building maintainable systems, and BDD for ensuring requirement-implementation alignment." 
        },
        speakerIds: ["arthur", "ean-lee"],
        keywords: { 
          'zh-tw': ["上下文工程", "架構思維", "BDD"], 
          'en': ["Context Engineering", "Architectural Thinking", "BDD"] 
        },
        type: "workshop"
      },
      {
        duration: 30,
        title: { 'zh-tw': "事件溯源與AI的現代資料儲存", 'en': "Event Sourcing and Modern Data Storage for AI" },
        description: { 
          'zh-tw': "探討事件溯源如何為AI提供值得信賴且具情境的資料儲存模式，展示KurrentDB的實務應用。", 
          'en': "Exploring how Event Sourcing provides trustworthy and contextual data storage patterns for AI, demonstrating practical applications of KurrentDB." 
        },
        speakerIds: ["stephen-tung"],
        keywords: { 
          'zh-tw': ["事件溯源", "AI資料儲存", "KurrentDB"], 
          'en': ["Event Sourcing", "AI Data Storage", "KurrentDB"] 
        },
        type: "practice"
      }
    ]
  }
]
