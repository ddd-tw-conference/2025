/**
 * 投影片資源配置
 * 管理所有議程的投影片下載連結與檢視連結
 */

export interface SlideAsset {
  segmentKey: string;                                    // 議程識別 (kebab-case from title['en'])
  speakerId: string;                                     // 講者識別 (對應 speakers.ts)
  provider: 'gdrive' | 'canva' | 'gamma' | 'slideshare'; // 投影片平台
  rawUrl: string;                                        // 原始連結 URL
  titleKey: string;                                      // i18n key for slide title
}

export const SLIDE_ASSETS_CONFIG: SlideAsset[] = [
  {
    // 文件即程式碼 (DaC) X 文件驅動開發
    segmentKey: 'documentation-as-code-dac-x-document-driven-development',
    speakerId: 'tung',
    provider: 'gdrive',
    rawUrl: 'https://docs.google.com/presentation/d/1LbmLMjrBwmkOwCGienFCMrAs44ditN2r/edit?usp=sharing&ouid=115245165085242440651&rtpof=true&sd=true',
    titleKey: 'slides.tung.dac-x-document-driven-development'
  },
  {
    // BDD+DDD 自動化實踐經驗
    segmentKey: 'bdd-ddd-automation-practice-experience',
    speakerId: 'waterball',
    provider: 'canva',
    rawUrl: 'https://www.canva.com/design/DAG4BxINGI0/C-NV8ojc2v5PfcY2TpTi6g/view?utm_content=DAG4BxINGI0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd140bac3db',
    titleKey: 'slides.waterball.bdd-ddd-automation'
  },
  {
    // 開發者體驗重新定義
    segmentKey: 'redefining-developer-experience',
    speakerId: 'fong-liu',
    provider: 'gamma',
    rawUrl: 'https://gamma.app/docs/20251108-DDDTW-Developer-Experience-DevEx-34o4kt7y7aqxdan?mode=doc',
    titleKey: 'slides.fong-liu.redefining-dx'
  },
  {
    // AI 未來與 DDD 演進
    segmentKey: 'ai-future-and-ddd-evolution',
    speakerId: 'ruddy-lee',
    provider: 'gdrive',
    rawUrl: 'https://docs.google.com/presentation/d/1Pz751obne9ZRZsjrhPCG4LqHPEsYE0QR/edit?usp=sharing&ouid=115245165085242440651&rtpof=true&sd=true',
    titleKey: 'slides.ruddy-lee.ai-future-ddd-evolution'
  },
  {
    // 軟體 3.0 時代概覽
    segmentKey: 'software-3-0-era-overview',
    speakerId: 'arthur',
    provider: 'gdrive',
    rawUrl: 'https://docs.google.com/presentation/d/1itefM2s1KaPB-h1gFK1wnwyDt3Keo7Af/edit?usp=sharing&ouid=115245165085242440651&rtpof=true&sd=true',
    titleKey: 'slides.arthur.software-3-0-overview'
  },
  {
    // 事件溯源與 AI 的現代資料儲存
    segmentKey: 'event-sourcing-and-modern-data-storage-for-ai',
    speakerId: 'stephen-tung',
    provider: 'gdrive',
    rawUrl: 'https://docs.google.com/presentation/d/1PJrRb5-c6c6y0qHwea0fVbJ6gLeaEKT9/edit?usp=sharing&ouid=115245165085242440651&rtpof=true&sd=true',
    titleKey: 'slides.stephen-tung.event-sourcing-ai-storage'
  },
  {
    // 在 AI 與低碼時代，為什麼系統越快開發、架構卻越難維護？
    segmentKey: 'in-the-ai-and-low-code-era-why-does-faster-development-lead-to-harder-to-maintain-architecture',
    speakerId: 'michael-chen',
    provider: 'slideshare',
    rawUrl: 'https://www.slideshare.net/secret/1EddXbzYkD1n2P',
    titleKey: 'slides.michael-chen.ai-low-code-architecture'
  },
  {
    // 喜劇公司的 DDD 導入歷程
    segmentKey: 'ddd-implementation-journey-in-a-comedy-company',
    speakerId: 'sunny-cheng',
    provider: 'canva',
    rawUrl: 'https://www.canva.com/design/DAG4ENI4n5A/x5rJN1dx798udw8NexiMxg/view?utm_content=DAG4ENI4n5A&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h284306fda7',
    titleKey: 'slides.sunny-cheng.ddd-comedy-company'
  }
];
