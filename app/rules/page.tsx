import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '大會守則',
  description: 'DDDTW 2025 大會活動行為準則 - 營造友善、包容且專業的學習環境。',
}

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-12">大會活動行為準則</h1>

          {/* Basic Rules Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">基本規範</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                領域驅動設計台灣 2025 年會 - DDDesign Taiwan Conference 2025
                致力於提供每個與會者一個自在的環境，不論性別、性傾向、殘疾、外貌、身材、種族或宗教。我們絕不容忍任何人對與會者、無論任何形式，在任何會場區域內所有性騷擾的言論及圖像都是不恰當的行為，包括在會議進行時，與會者若有違反規定，大會將視情況予以嚴重的警告或驅逐出不退還費用。
              </p>

              <p>
                我們包含了涉及性別、性傾向、殘疾、外貌、身材、種族、宗教等帶有歧視性的言論；在公共場合展示不恰當性意圖的圖像；蓄意恐嚇、跟蹤、尾隨、騷擾攝影與錄音人員；持續干擾演講或其他活動進行；不適當的肢體接觸，不恰當也包括性騷擾。
              </p>

              <p>
                參與者如，實物的或威脅在會場或線上任何形式必須立即停止違規行為，特別是參與者也不得使用性意圖的圖像、活動或其他的方式。徵位工作人員（包含志工）不得使用性意圖的服裝/制服/裝扮，或其他方式來營造性氛圍。
              </p>

              <p>如果與會者發生違規行為，大會可採取任何適合的行動，包含警告或驅逐違規者離開會場，並且不退還費用。</p>

              <p>
                如果您被騷擾，或者注意到有其他人被騷擾，或是有任何其他疑慮，請立即與會知會工作人員。您可以透過工作人員識別證找到大會工作人員。工作人員將很樂意協助的與會者聯絡會場保安或執法部門，提供護送或其他協助，讓受到騷擾的人們在會議期間感到安全。我們重視您的參與。
              </p>

              <p>我們期望與會者在大會場合以及相關社交活動中遵守行為守則。</p>
            </div>
          </section>

          {/* Information Sharing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">資訊的分享與尊重</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                大會活動期間，我們非常歡迎與會者彼此間的與會者、講者、贊助的互動，可能涉及進行各種的交流活動，但針對隱私權者的分享面，最美是直接詢問的情況。本年度的活動有安排了線上直播或錄影呈現，如果您不希望自己法前來參與，可以以在
                2025/08/26 起，於 Accupass
                填寫意見調查上傳表，表明的回答當日的所有內容、是此，我們會與會者會進行拍攝分享的內容，輸出任何相關影響。
              </p>

              <p>我們期望能夠配合此舉者每個所有人的權益與講者的知識資產。</p>
            </div>
          </section>

          {/* Additional Guidelines */}
          <section className="bg-slate-800/30 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">重要提醒</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                請尊重所有與會者、講者及工作人員
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                禁止任何形式的騷擾或歧視行為
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                拍照或錄影前請先徵得當事人同意
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                保持會場整潔，共同維護良好環境
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                如有任何問題或需要協助，請立即聯繫工作人員
              </li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="mt-12 text-center">
            <div className="bg-blue-900/30 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">需要協助？</h3>
              <p className="text-gray-300 mb-4">如果您在大會期間遇到任何問題或需要協助，請立即聯繫我們的工作人員。</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <span className="text-gray-300">緊急聯絡：</span>
                <a href="mailto:dddtw2018@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  dddtw2018@gmail.com
                </a>
                <span className="text-gray-300">|</span>
                <span className="text-blue-400">現場工作人員</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
