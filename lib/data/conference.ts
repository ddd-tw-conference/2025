/**
 * 會議資料統一管理
 * 遵循架構師建議：資料層分離，提升可維護性
 */

import { getImagePath } from '../paths'

export interface Speaker {
  name: { 'zh-tw': string; 'en': string }
  title: { 'zh-tw': string; 'en': string }
  company: { 'zh-tw': string; 'en': string }
  topic: { 'zh-tw': string; 'en': string }
  content: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
  image: string
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
  github?: string
  website?: string
  email?: string
  experience?: { 'zh-tw': string; 'en': string }
  expertise: { 'zh-tw': string[]; 'en': string[] }
  education?: { 'zh-tw': string; 'en': string }
  achievements?: { 'zh-tw': string[]; 'en': string[] }
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export interface Session {
  time: string
  title: { 'zh-tw': string; 'en': string }
  speaker: string
  description: { 'zh-tw': string; 'en': string }
  track: { 'zh-tw': string; 'en': string }
  type: 'workshop' | 'talk'
}

export interface SpeakerTopic {
  topic: { 'zh-tw': string; 'en': string }
  shortTitle: { 'zh-tw': string; 'en': string }
  description: { 'zh-tw': string; 'en': string }
  color: 'blue' | 'purple' | 'green' | 'indigo' | 'orange' | 'pink'
  speakers: Speaker[]
}

// 講者資料
export const SPEAKERS_DATA: SpeakerTopic[] = [
  {
    topic: { 'zh-tw': "從敘事到塑模", 'en': "From Storytelling to Modeling" },
    shortTitle: { 'zh-tw': "AI驅動的DDD戰略實務", 'en': "AI-Driven DDD Strategic Practice" },
    description: { 'zh-tw': "用Domain Storytelling建立跨職能對齊的語意基礎", 'en': "Building Cross-functional Semantic Foundation with Domain Storytelling" },
    color: "blue",
    speakers: [
      {
        name: { 'zh-tw': "陳勉修(Michael)", 'en': "Michael" },
        title: { 'zh-tw': "產品處副總經理", 'en': "Deputy General Manager of Product Division" },
        company: { 'zh-tw': "樂屋國際資訊股份有限公司", 'en': "Rakuya International Information Co., Ltd." },
        topic: { 'zh-tw': "從敘事到塑模", 'en': "From Storytelling to Modeling" },
        content: { 'zh-tw': "用Domain Storytelling建立跨職能對齊的語意基礎", 'en': "Building Cross-functional Semantic Foundation with Domain Storytelling" },
        bio: { 'zh-tw': "專注於領域驅動設計與Domain Storytelling應用於軟體工程流程中，促進人跡協作與語意對齊，讓AI工具能真正參與需求建模與架構設計，實現貼近業務語境且可持續演進的軟體工程實踐。", 'en': "Focuses on Domain-Driven Design and Domain Storytelling applications in software engineering processes, promoting human-AI collaboration and semantic alignment, enabling AI tools to truly participate in requirements modeling and architecture design, achieving business-context-oriented and continuously evolving software engineering practices." },
        image: "/images/speakers/michael.jpg",
        linkedin: "#",
        twitter: "#",
        experience: { 'zh-tw': "長期於矩陣型組織中擔任技術領導、人事主管與敏捷教練等多重腳色", 'en': "Long-term experience serving multiple roles as technical leader, personnel manager, and agile coach in matrix organizations" },
        expertise: { 'zh-tw': ["領域驅動設計", "Domain Storytelling", "敏捷開發"], 'en': ["Domain-Driven Design", "Domain Storytelling", "Agile Development"] },
        achievements: { 'zh-tw': ["樂屋國際產品架構師", "DDD Taiwan 核心貢獻者"], 'en': ["Rakuya International Product Architect", "DDD Taiwan Core Contributor"] },
        socialLinks: {
          linkedin: "https://linkedin.com/in/michael-chen",
          twitter: "https://twitter.com/michael_chen",
          github: "https://github.com/michael-chen",
          website: "https://michael-chen.dev/",
        },
      }
    ],
  },
  {
    topic: { 'zh-tw': "從警示到行動：打造AI驅動的自動化Incident Response工具", 'en': "From Alert to Action: Building AI-driven Automated Incident Response Tools" },
    shortTitle: { 'zh-tw': "自動化Incident Response工具", 'en': "Automated Incident Response Tools" },
    description: { 'zh-tw': "整合Logs、Code、Docs與Insights，重塑On-Call流程與團隊知識管理", 'en': "Integrating Logs, Code, Docs and Insights to reshape On-Call processes and team knowledge management" },
    color: "purple",
    speakers: [
      {
        name: { 'zh-tw': "劉鳳軒(Fong)", 'en': "Fong" },
        title: { 'zh-tw': "資深後端工程師", 'en': "Senior Backend Engineer" },
        company: { 'zh-tw': "Appier", 'en': "Appier" },
        topic: { 'zh-tw': "從警示到行動：打造AI驅動的自動化Incident Response工具", 'en': "From Alert to Action: Building AI-driven Automated Incident Response Tools" },
        content: { 'zh-tw': "整合Logs、Code、Docs與Insights，重塑On-Call流程與團隊知識管理", 'en': "Integrating Logs, Code, Docs and Insights to reshape On-Call processes and team knowledge management" },
        bio: { 'zh-tw': "喜歡團隊一同開發勝過一人默默獨自寫程式。", 'en': "Prefers collaborative team development over solitary programming." },
        image: "/images/speakers/fong.jpg",
        linkedin: "#",
        twitter: "#",
        experience: { 'zh-tw': "擔任過多個年會的講者/工作坊講者(JSDC、DDDTW、Agile Summit)", 'en': "Experienced speaker/workshop facilitator at multiple conferences (JSDC, DDDTW, Agile Summit)" },
        expertise: { 'zh-tw': ["領域驅動設計", "ITHome鐵人賽(Think In GraphQL/Think In DDD)"], 'en': ["Domain-Driven Design", "ITHome Iron Man Challenge (Think In GraphQL/Think In DDD)"] },
        achievements: { 'zh-tw': ["DDD Taiwan 社群核心志工", "多場年會會議講者", "ITHome獲獎"], 'en': ["DDD Taiwan Core Community Volunteer", "Multiple Conference Speaker", "ITHome Award Winner"] },
        socialLinks: {
          linkedin: "https://linkedin.com/in/speaker",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/speaker",
          website: "https://speaker-website.com",
        },
      }
    ],
  },
  {
    topic: { 'zh-tw': "AI輔助軟體開發", 'en': "AI-Assisted Software Development" },
    shortTitle: { 'zh-tw': "軟體開發3.0世代", 'en': "Software Development 3.0 Era" },
    description: { 'zh-tw': "在軟體3.0時代，掌握AI驅動的開發語言", 'en': "Mastering AI-driven development languages in the Software 3.0 era" },
    color: "green",
    speakers: [
      {
        name: { 'zh-tw': "Arthur", 'en': "Arthur" },
        title: { 'zh-tw': "資深經理", 'en': "Senior Manager" },
        company: { 'zh-tw': "金融公司", 'en': "Financial Company" },
        topic: { 'zh-tw': "AI輔助軟體開發", 'en': "AI-Assisted Software Development" },
        bio: { 'zh-tw': "致力於軟體開發實務，並推廣領域驅動開發方法。", 'en': "Dedicated to software development practices and promoting domain-driven development methods." },
        content: { 'zh-tw': "軟體3.0, AI時代下的開發方法", 'en': "Software 3.0: Development Methods in the AI Era" },
        image: "/images/speakers/arthur.jpg",
        linkedin: "#",
        twitter: "#",
        experience: { 'zh-tw': "多年軟體開發經驗，曾任職於多家知名科技公司", 'en': "Years of software development experience, worked at multiple renowned tech companies" },
        expertise: { 'zh-tw': ["領域驅動設計", "系統架構", "敏捷開發", "團隊管理"], 'en': ["Domain-Driven Design", "System Architecture", "Agile Development", "Team Management"] },
        achievements: { 'zh-tw': ["DDD Taiwan 社群創辦人", "多場年會講者"], 'en': ["DDD Taiwan Community Founder", "Multiple Conference Speaker"] },
        socialLinks: {
          linkedin: "https://linkedin.com/in/speaker",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/speaker",
          website: "https://speaker-website.com",
        },
      },
      {
        name: { 'zh-tw': "李民偉(Ean)", 'en': "Ean" },
        title: { 'zh-tw': "開發團隊領導", 'en': "Development Team Lead" },
        company: { 'zh-tw': "長照公司", 'en': "Long-term Care Company" },
        topic: { 'zh-tw': "AI輔助軟體開發", 'en': "AI-Assisted Software Development" },
        content: { 'zh-tw': "AI開發工作坊", 'en': "AI Development Workshop" },
        bio: { 'zh-tw': "目前專注於探討雲端資源、容器化與監控的統整，在支撐業務價值的同時，有效降低建置/營運成本、並系統的可靠性。。", 'en': "Currently focused on exploring the integration of cloud resources, containerization, and monitoring to effectively reduce deployment/operational costs while maintaining system reliability and supporting business value." },
        image: "/images/speakers/ean.jpg",
        linkedin: "#",
        twitter: "#",
        experience: { 'zh-tw': "多年軟體開發經驗，曾任職於多家知名科技公司", 'en': "Years of software development experience, worked at multiple renowned tech companies" },
        expertise: { 'zh-tw': ["領域驅動設計", "系統架構", "團隊管理"], 'en': ["Domain-Driven Design", "System Architecture", "Team Management"] },
        achievements: { 'zh-tw': ["DDD Taiwan 社群核心志工", "年會講者"], 'en': ["DDD Taiwan Core Community Volunteer", "Conference Speaker"] },
        socialLinks: {
          linkedin: "https://linkedin.com/in/speaker",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/speaker",
          website: "https://eandev.com/",
        },
      }
    ],
  },
  {
    topic: { 'zh-tw': "文件即程式碼", 'en': "Documentation as Code" },
    shortTitle: { 'zh-tw': "文件即程式碼，串接版本控制與自動化", 'en': "Documentation as Code: Integrating Version Control and Automation" },
    description: { 'zh-tw': "不只寫文件，也會進行功能開發，體驗真實專案中從「規格 → 文件 → 實作」的完整流程", 'en': "Not just writing documentation, but also feature development, experiencing the complete flow from 'Specification → Documentation → Implementation' in real projects" },
    color: "indigo",
    speakers: [
      {
        name: { 'zh-tw': "River", 'en': "River" },
        title: { 'zh-tw': "Tech Lead", 'en': "Tech Lead" },
        company: { 'zh-tw': "新創科技", 'en': "Startup" },
        topic: { 'zh-tw': "文件即程式碼", 'en': "Documentation as Code" },
        content: { 'zh-tw': "文件即程式碼，串接版本控制與自動化", 'en': "Documentation as Code: Integrating Version Control and Automation" },
        bio: { 'zh-tw': "開發過多個電子商務平台，並在帶領團隊與規劃軟體架構方面具有豐富經驗。對領域驅動設計（DDD）充滿熱情，並且在DDD社群中積極貢獻。經常在團隊中引進新的技術工具和開發流程，並且鼓勵團隊學習與進步。", 'en': "Developed multiple e-commerce platforms and has extensive experience in leading teams and planning software architecture. Passionate about Domain-Driven Design (DDD) and actively contributes to the DDD community. Frequently introduces new technical tools and development processes to teams and encourages team learning and improvement." },
        image: "/images/speakers/river.jpg",
        linkedin: "#",
        twitter: "#",
        experience: { 'zh-tw': "多年軟體開發經驗，曾任職於多家知名科技公司", 'en': "Years of software development experience, worked at multiple renowned tech companies" },
        expertise: { 'zh-tw': ["領域驅動設計", "系統架構", "團隊管理"], 'en': ["Domain-Driven Design", "System Architecture", "Team Management"] },
        achievements: { 'zh-tw': ["DDD Taiwan 社群核心志工", "技術年會講者", "技術領導"], 'en': ["DDD Taiwan Core Community Volunteer", "Technical Conference Speaker", "Technical Leader"] },
        socialLinks: {
          linkedin: "https://www.linkedin.com/in/river-lin-hunghao/",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/river0825",
          website: "https://speaker-website.com",
        },
      },
      {
        name: { 'zh-tw': "Tung", 'en': "Tung" },
        title: { 'zh-tw': "後端工程師", 'en': "Backend Engineer" },
        company: { 'zh-tw': "文創公司", 'en': "Cultural Creative Company" },
        topic: { 'zh-tw': "文件即程式碼", 'en': "Documentation as Code" },
        content: { 'zh-tw': "DaC自動化工作坊", 'en': "DaC Automation Workshop" },
        bio: { 'zh-tw': "將DDD視為人生哲學，並將其應用於生活各個面向。", 'en': "Views DDD as a life philosophy and applies it to various aspects of life." },
        image: "/images/speakers/tung.jpg",
        linkedin: "#",
        twitter: "#",
        experience: { 'zh-tw': "多年軟體開發經驗，曾任職於多家知名科技公司", 'en': "Years of software development experience, worked at multiple renowned tech companies" },
        expertise: { 'zh-tw': ["領域驅動設計", "n8n", "AI自動化"], 'en': ["Domain-Driven Design", "n8n", "AI Automation"] },
        achievements: { 'zh-tw': ["DDD Taiwan 社群核心志工", "技術年會講者", "AI自動化實踐者"], 'en': ["DDD Taiwan Core Community Volunteer", "Technical Conference Speaker", "AI Automation Practitioner"] },
        socialLinks: {
          linkedin: "https://linkedin.com/in/speaker",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/speaker",
          website: "https://speaker-website.com",
        },
      },
      {
        name: { 'zh-tw': "水球潘", 'en': "Waterball" },
        title: { 'zh-tw': "軟工革命軍團長", 'en': "Software Engineering Revolution Commander" },
        company: { 'zh-tw': "軟體設計模式精通之旅創辦人", 'en': "Founder of Software Design Pattern Mastery Journey" },
        topic: { 'zh-tw': "靠 BDD + DDD 做到 AI 100% 全自動化後端開發", 'en': "Achieving 100% AI-Automated Backend Development with BDD + DDD" },
        content: { 'zh-tw': "我只講一件事，要做到 100% 後端 AI 全自動化開發，該做哪些事？\n\n我講的是 100% 全自動化，不是 80% 也不是 90% 也不是 99.9%，也不是 99.99999%。\n\n我說的是 100%。\n\n所謂的 100% 的意思就是你只要提交完規格之後，就可以完全不 code review，可以去玩遊戲的那種 100%。\n\n從 70% 一路到 100% 全自動化，你知道最重要的是什麼嗎？\n\n是 Prompt?\n\n不，怎麼可能是 Prompt，Prompt 根本無關緊要。其實答案是 BDD 和 DDD 這兩大重要實踐的極致落地。\n\n你各位對 DDD 有關注的人全部都賭對了！\n\n要做到 100% 全自動化開發，如果只會寫規格，寫可執行規格，寫各種 Given When Then，但是卻沒有 DDD 的本事的話，是不可能做到的！\n\n如果有 DDD 的思維卻沒有 BDD 的可執行性的話，那也是無法做到全自動化開發的。\n\n一切都要做好做滿，雖然成本很大，但就能得到 100% AI 全自動化開發的甜美果實。", 'en': "I'll talk about one thing: what needs to be done to achieve 100% backend AI automation development?\n\nI'm talking about 100% automation, not 80%, not 90%, not 99.9%, not 99.99999%.\n\nI mean 100%.\n\nBy 100%, I mean you can submit specifications and then completely skip code review and go play games - that kind of 100%.\n\nFrom 70% all the way to 100% automation, do you know what's most important?\n\nIs it Prompt?\n\nNo, how could it be Prompt? Prompt is irrelevant. The answer is actually the ultimate implementation of two major practices: BDD and DDD.\n\nAll of you who pay attention to DDD have bet correctly!\n\nTo achieve 100% automated development, if you only know how to write specifications, executable specifications, various Given When Then, but lack DDD skills, it's impossible!\n\nIf you have DDD thinking but lack BDD executability, you can't achieve fully automated development either.\n\nEverything must be done thoroughly. Although the cost is high, you can get the sweet fruit of 100% AI automated development." },
        bio: { 'zh-tw': "把架構設計變成可以自動化的 SOP，每天都全職把自己取代的軟工熱血老師。", 'en': "A passionate software engineering teacher who turns architectural design into automatable SOPs and dedicates himself full-time to replacing himself." },
        image: "/images/speakers/waterball.jpg",
        linkedin: "#",
        twitter: "#",
        github: "#",
        website: "#",
        experience: { 'zh-tw': "軟體設計模式精通之旅創辦人，專注於架構自動化與軟工教育推廣。", 'en': "Founder of Software Design Pattern Mastery Journey, focusing on architectural automation and software engineering education promotion." },
        expertise: { 'zh-tw': ["軟體設計模式", "架構自動化", "軟工教育"], 'en': ["Software Design Patterns", "Architectural Automation", "Software Engineering Education"] },
        achievements: { 'zh-tw': ["軟工革命軍團長", "軟體設計模式精通之旅創辦人"], 'en': ["Software Engineering Revolution Commander", "Founder of Software Design Pattern Mastery Journey"] },
        socialLinks: {
          linkedin: "#",
          twitter: "#",
          github: "#",
          website: "#",
        },
      }
    ],
  }
]

// 議程資料
export const AGENDA_DATA: Session[] = [
  {
    time: "09:00 - 12:00",
    title: { 'zh-tw': "從敘事到塑模", 'en': "From Storytelling to Modeling" },
    speaker: "陳勉修(Michael)",
    description: { 'zh-tw': "用Domain Storytelling建立跨職能對齊的語意基礎。", 'en': "Building Cross-functional Semantic Foundation with Domain Storytelling." },
    track: { 'zh-tw': "主會場 A", 'en': "Main Hall A" },
    type: "workshop",
  },
  {
    time: "09:00 - 12:00",
    title: { 'zh-tw': "AI輔助軟體開發", 'en': "AI-Assisted Software Development" },
    speaker: "Arthur，李民偉(Ean)",
    description: { 'zh-tw': "在軟體3.0時代，掌握AI驅動的開發語言。", 'en': "Mastering AI-driven development languages in the Software 3.0 era." },
    track: { 'zh-tw': "會議室 B", 'en': "Conference Room B" },
    type: "workshop",
  },
  {
    time: "13:00 - 16:00",
    title: { 'zh-tw': "從警示到行動：打造AI驅動的自動化Incident Response工具", 'en': "From Alert to Action: Building AI-driven Automated Incident Response Tools" },
    speaker: "劉鳳軒(Fong)",
    description: { 'zh-tw': "整合Logs、Code、Docs與Insights，重塑On-Call流程與團隊知識管理。", 'en': "Integrating Logs, Code, Docs and Insights to reshape On-Call processes and team knowledge management." },
    track: { 'zh-tw': "主會場 A", 'en': "Main Hall A" },
    type: "workshop",
  },
  {
    time: "13:00 - 16:00",
    title: { 'zh-tw': "文件即程式碼", 'en': "Documentation as Code" },
    speaker: "River，Tung",
    description: { 'zh-tw': "文件即程式碼，串接版本控制與自動化。", 'en': "Documentation as Code: Integrating Version Control and Automation." },
    track: { 'zh-tw': "會議室 B", 'en': "Conference Room B" },
    type: "workshop",
  }
]

// 統計數據
export const CONFERENCE_STATISTICS = {
  PARTICIPANTS: '100+',
  SPEAKERS: '13+',
  HOURS: '8',
  SESSIONS: '4'
} as const

// 多語言工具函式
export const getLocalizedText = (
  textObj: { 'zh-tw': string; 'en': string },
  language: string
): string => {
  return textObj[language as 'zh-tw' | 'en'] || textObj['zh-tw']
}

// 多語言陣列工具函式  
export const getLocalizedArray = (
  arrayObj: { 'zh-tw': string[]; 'en': string[] },
  language: string
): string[] => {
  return arrayObj[language as 'zh-tw' | 'en'] || arrayObj['zh-tw']
}
