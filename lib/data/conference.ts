/**
 * 會議資料統一管理
 * 遵循架構師建議：資料層分離，提升可維護性
 */

import { getImagePath } from '../paths'

export interface Speaker {
  name: string
  title: string
  company: string
  topic: string
  content: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
  github?: string
  website?: string
  email?: string
  experience?: string
  expertise: string[]
  education?: string
  achievements?: string[]
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
  title: string
  speaker: string
  description: string
  track: string
  type: 'workshop' | 'talk'
}

export interface SpeakerTopic {
  topic: string
  shortTitle: string
  description: string
  color: 'blue' | 'purple' | 'green' | 'indigo' | 'orange' | 'pink'
  speakers: Speaker[]
}

// 講者資料
export const SPEAKERS_DATA: SpeakerTopic[] = [
  {
    topic: "從敘事到塑模",
    shortTitle: "AI驅動的DDD戰略實務",
    description: "用Domain Storytelling建立跨職能對齊的語意基礎",
    color: "blue",
    speakers: [
      {
        name: "陳勉修(Michael)",
        title: "產品處副總經理",
        company: "樂屋國際資訊股份有限公司",
        topic: "從敘事到塑模",
        content: "用Domain Storytelling建立跨職能對齊的語意基礎",
        bio: "專注於領域驅動設計與Domain Storytelling應用於軟體工程流程中，促進人跡協作與語意對齊，讓AI工具能真正參與需求建模與架構設計，實現貼近業務語境且可持續演進的軟體工程實踐。",
        image: getImagePath("/placeholder-user.jpg"),
        linkedin: "#",
        twitter: "#",
        experience: "長期於矩陣型組織中擔任技術領導、人事主管與敏捷教練等多重腳色",
        expertise: ["領域驅動設計", "Domain Storytelling", "敏捷開發"],
        education: "國立交通大學資訊科學系",
        achievements: ["樂屋國際產品架構師", "DDD Taiwan 核心貢獻者"],
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
    topic: "從警示到行動：打造AI驅動的自動化Incident Response工具",
    shortTitle: "自動化Incident Response工具",
    description: "整合Logs、Code、Docs與Insights，重塑On-Call流程與團隊知識管理",
    color: "purple",
    speakers: [
      {
        name: "劉鳳軒(Fong)",
        title: "資深後端工程師",
        company: "Appier",
        topic: "從警示到行動：打造AI驅動的自動化Incident Response工具",
        content: "整合Logs、Code、Docs與Insights，重塑On-Call流程與團隊知識管理",
        bio: "喜歡團隊一同開發勝過一人默默獨自寫程式。",
        image: getImagePath("/placeholder-user.jpg"),
        linkedin: "#",
        twitter: "#",
        experience: "擔任過多個年會的講者/工作坊講者(JSDC、DDDTW、Agile Summit)",
        expertise: ["領域驅動設計", "ITHome鐵人賽(Think In GraphQL/Think In DDD)"],
        education: "國立清華大學資訊工程學系",
        achievements: ["DDD Taiwan 社群核心志工", "多場年會會議講者", "ITHome獲獎"],
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
    topic: "AI輔助軟體開發",
    shortTitle: "軟體開發3.0世代",
    description: "在軟體3.0時代，掌握AI驅動的開發語言",
    color: "green",
    speakers: [
      {
        name: "張國昭(Arthur)",
        title: "資深經理",
        company: "金融公司",
        topic: "AI輔助軟體開發",
        bio: "致力於軟體開發實務，並推廣領域驅動開發方法。",
        content: "軟體3.0, AI時代下的開發方法",
        image: getImagePath("/placeholder-user.jpg"),
        linkedin: "#",
        twitter: "#",
        experience: "多年軟體開發經驗，曾任職於多家知名科技公司",
        expertise: ["領域驅動設計", "系統架構", "敏捷開發", "團隊管理"],
        education: "國立台灣大學資訊工程學系",
        achievements: ["DDD Taiwan 社群創辦人", "多場年會講者"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/speaker",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/speaker",
          website: "https://speaker-website.com",
        },
      },
      {
        name: "李民偉(Ean)",
        title: "開發團隊領導",
        company: "長照公司",
        topic: "AI輔助軟體開發",
        content: "AI開發工作坊",
        bio: "目前專注於探討雲端資源、容器化與監控的統整，在支撐業務價值的同時，有效降低建置/營運成本、並系統的可靠性。。",
        image: getImagePath("/placeholder-user.jpg"),
        linkedin: "#",
        twitter: "#",
        experience: "多年軟體開發經驗，曾任職於多家知名科技公司",
        expertise: ["領域驅動設計", "系統架構", "團隊管理"],
        education: "國立台灣大學資訊工程學系",
        achievements: ["DDD Taiwan 社群核心志工", "年會講者"],
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
    topic: "文件即程式碼",
    shortTitle: "文件即程式碼，串接版本控制與自動化",
    description: "不只寫文件，也會進行功能開發，體驗真實專案中從「規格 → 文件 → 實作」的完整流程",
    color: "indigo",
    speakers: [
      {
        name: "River",
        title: "Tech Lead",
        company: "新創科技",
        topic: "文件即程式碼",
        content: "文件即程式碼，串接版本控制與自動化",
        bio: "開發過多個電子商務平台，並在帶領團隊與規劃軟體架構方面具有豐富經驗。對領域驅動設計（DDD）充滿熱情，並且在DDD社群中積極貢獻。經常在團隊中引進新的技術工具和開發流程，並且鼓勵團隊學習與進步。",
        image: "https://static.accupass.com/visitant/2305121125141809121796.jpg",
        linkedin: "#",
        twitter: "#",
        experience: "多年軟體開發經驗，曾任職於多家知名科技公司",
        expertise: ["領域驅動設計", "系統架構", "團隊管理"],
        education: "國立台灣大學資訊工程學系",
        achievements: ["DDD Taiwan 社群核心志工", "技術年會講者", "技術領導"],
        socialLinks: {
          linkedin: "https://www.linkedin.com/in/river-lin-hunghao/",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/river0825",
          website: "https://speaker-website.com",
        },
      },
      {
        name: "Tung",
        title: "後端工程師",
        company: "文創公司",
        topic: "文件即程式碼",
        content: "DaC自動化工作坊",
        bio: "將DDD視為人生哲學，並將其應用於生活各個面向。",
        image: getImagePath("/placeholder-user.jpg"),
        linkedin: "#",
        twitter: "#",
        experience: "多年軟體開發經驗，曾任職於多家知名科技公司",
        expertise: ["領域驅動設計", "n8n", "AI自動化"],
        education: "國立台灣大學資訊工程學系",
        achievements: ["DDD Taiwan 社群核心志工", "技術年會講者", "AI自動化實踐者"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/speaker",
          twitter: "https://twitter.com/speaker",
          github: "https://github.com/speaker",
          website: "https://speaker-website.com",
        },
      },
      {
        name: "水球潘",
        title: "軟工革命軍團長",
        company: "軟體設計模式精通之旅創辦人",
        topic: "靠 BDD + DDD 做到 AI 100% 全自動化後端開發",
        content: "我只講一件事，要做到 100% 後端 AI 全自動化開發，該做哪些事？\n\n我講的是 100% 全自動化，不是 80% 也不是 90% 也不是 99.9%，也不是 99.99999%。\n\n我說的是 100%。\n\n所謂的 100% 的意思就是你只要提交完規格之後，就可以完全不 code review，可以去玩遊戲的那種 100%。\n\n從 70% 一路到 100% 全自動化，你知道最重要的是什麼嗎？\n\n是 Prompt?\n\n不，怎麼可能是 Prompt，Prompt 根本無關緊要。其實答案是 BDD 和 DDD 這兩大重要實踐的極致落地。\n\n你各位對 DDD 有關注的人全部都賭對了！\n\n要做到 100% 全自動化開發，如果只會寫規格，寫可執行規格，寫各種 Given When Then，但是卻沒有 DDD 的本事的話，是不可能做到的！\n\n如果有 DDD 的思維卻沒有 BDD 的可執行性的話，那也是無法做到全自動化開發的。\n\n一切都要做好做滿，雖然成本很大，但就能得到 100% AI 全自動化開發的甜美果實。",
        bio: "把架構設計變成可以自動化的 SOP，每天都全職把自己取代的軟工熱血老師。",
        image: getImagePath("/placeholder-user.jpg"),
        linkedin: "#",
        twitter: "#",
        github: "#",
        website: "#",
        experience: "軟體設計模式精通之旅創辦人，專注於架構自動化與軟工教育推廣。",
        expertise: ["軟體設計模式", "架構自動化", "軟工教育"],
        education: "",
        achievements: ["軟工革命軍團長", "軟體設計模式精通之旅創辦人"],
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
    title: "從敘事到塑模",
    speaker: "陳勉修(Michael)",
    description: "用Domain Storytelling建立跨職能對齊的語意基礎。",
    track: "主會場 A",
    type: "workshop",
  },
  {
    time: "09:00 - 12:00",
    title: "AI輔助軟體開發",
    speaker: "張國昭(Arthur)，李民偉(Ean)",
    description: "在軟體3.0時代，掌握AI驅動的開發語言。",
    track: "會議室 B",
    type: "workshop",
  },
  {
    time: "13:00 - 16:00",
    title: "從警示到行動：打造AI驅動的自動化Incident Response工具",
    speaker: "劉鳳軒(Fong)",
    description: "整合Logs、Code、Docs與Insights，重塑On-Call流程與團隊知識管理。",
    track: "主會場 A",
    type: "workshop",
  },
  {
    time: "13:00 - 16:00",
    title: "文件即程式碼",
    speaker: "林鴻皓(River)，Tung",
    description: "文件即程式碼，串接版本控制與自動化。",
    track: "會議室 B",
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
