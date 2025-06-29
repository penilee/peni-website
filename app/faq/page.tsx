'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "這個網站主要展示什麼內容？",
      answer: "本站主要展示各種人工智慧相關的技術項目和應用，包括機器學習、深度學習、自然語言處理、計算機視覺等領域的成果。我們致力於分享最新的 AI 技術趨勢和實用工具，為學習者和開發者提供有價值的資源。"
    },
    {
      id: 2,
      question: "如何開始學習人工智慧技術？",
      answer: "建議從基礎的數學知識開始，包括線性代數、微積分和統計學。然後學習 Python 程式語言，接著深入機器學習基礎概念。推薦從 scikit-learn 開始實作，再逐步學習深度學習框架如 TensorFlow 或 PyTorch。本站會定期分享學習資源和實作案例。"
    },
    {
      id: 3,
      question: "網站上的項目可以免費使用嗎？",
      answer: "大部分展示的項目都是開源或提供免費試用版本。具體的使用條款會在每個項目頁面中詳細說明。我們鼓勵學習和交流，但也請尊重原創作者的智慧財產權。如有商業使用需求，建議直接聯繫項目開發者。"
    },
    {
      id: 4,
      question: "如何與網站團隊取得聯繫？",
      answer: "您可以通過頁面底部的聯絡按鈕與我們聯繫，或發送郵件至我們的客服信箱。我們會盡快回覆您的問題。如果您有技術合作、內容投稿或其他合作需求，也歡迎與我們討論。"
    },
    {
      id: 5,
      question: "網站會定期更新內容嗎？",
      answer: "是的，我們會定期更新網站內容，包括新的技術項目、學習資源、技術趨勢分析等。建議您關注我們的更新通知，或定期瀏覽網站以獲取最新資訊。我們也會在社群媒體上分享相關內容。"
    },
    {
      id: 6,
      question: "可以投稿分享自己的 AI 項目嗎？",
      answer: "非常歡迎！我們鼓勵開發者和研究者分享自己的 AI 項目。請確保項目具有原創性且符合網站的主題方向。投稿時請提供項目的詳細介紹、技術架構、使用說明等資訊。我們會審核後決定是否發布。"
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header Section */}
        <header className="text-center py-16 px-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">常見問題</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            解答您關於本站和 AI 技術的疑問
          </p>
        </header>

        {/* FAQ Content */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition duration-200 flex justify-between items-center"
                  >
                    <span className="text-lg font-semibold text-gray-800">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                        openItems.includes(item.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openItems.includes(item.id) && (
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                還有其他問題？
              </h3>
              <p className="text-gray-600 mb-6">
                如果您沒有找到想要的答案，歡迎直接與我們聯繫
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                  返回首頁
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                  聯絡我們
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
