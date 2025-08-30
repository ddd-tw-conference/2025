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
                領域驅動設計台灣 2025 年會（DDDesign Taiwan Conference 2025）致力於為每位與會者提供安全、友善的環境。無論您的性別、性傾向、身心狀況、外貌、身材、種族或宗教信仰為何，我們都歡迎您的參與。我們絕不容忍任何形式的騷擾行為，包括性騷擾的言論及圖像。違反規定者，大會將視情況給予警告或要求離場，且不予退費。
              </p>

              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 my-8">
                <h3 className="text-xl font-semibold text-red-300 mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  重要公告：禁止攝影錄影
                </h3>
                <p className="text-red-200 leading-relaxed">
                  <strong>為保護所有與會者的隱私權，本次大會全面禁止任何形式的錄影或錄音。</strong>
                  這包括但不限於使用手機、相機、攝影機等任何錄製設備。違反此規定者將被立即要求離場，且不予退費。
                </p>
              </div>

              <p>
                以下行為被視為違規行為：涉及性別、性傾向、身心狀況、外貌、身材、種族、宗教等歧視性言論；在公共場合展示不當性暗示圖像；蓄意恐嚇、跟蹤、尾隨他人；騷擾攝影與錄音人員；持續干擾演講或其他活動進行；不當的肢體接觸；任何形式的性騷擾行為。
              </p>

              <p>
                所有與會者在發現自己有不當行為時，必須立即停止。此外，大會工作人員（包含志工）不得穿著具有性暗示的服裝或採取任何可能營造不當氛圍的行為。
              </p>

              <p>對於違規行為，大會有權採取適當措施，包括警告或要求違規者離開會場，且不予退費。</p>

              <p>
                如果您遭受騷擾，或注意到他人被騷擾，或有任何疑慮，請立即聯繫工作人員。您可以透過識別證辨識大會工作人員。我們的工作人員將協助您聯繫會場保安或相關部門，提供護送或其他必要協助，確保您在會議期間的安全。我們重視您的參與。
              </p>

              <p>我們期望所有與會者在大會現場及相關社交活動中都能遵守這些行為準則。</p>
            </div>
          </section>

          {/* Information Sharing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">資訊分享與隱私保護</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                在大會活動期間，我們非常歡迎與會者、講者、贊助商之間進行互動交流。然而，<strong className="text-red-300">為了保護所有參與者的隱私，本次大會嚴格禁止任何拍攝、錄影或錄音行為</strong>。請務必尊重每個人的隱私權與個人空間。
              </p>

              <p>我們期望所有參與者都能共同維護每個人的權益，並尊重講者的智慧財產權。如有任何疑問，請洽詢現場工作人員。</p>
            </div>
          </section>

          {/* Additional Guidelines */}
          <section className="bg-slate-800/30 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">重要提醒</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-2 text-lg">🚫</span>
                <strong className="text-red-300">嚴禁任何形式的錄影或錄音</strong>
              </li>
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
