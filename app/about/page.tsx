import Link from 'next/link';

export default function About() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header Section */}
        <header className="text-center py-16 px-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">關於本站</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            一個專注於人工智慧技術展示與學習的平台
          </p>
        </header>

        {/* About Content */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">網站簡介</h2>
              
              <p className="text-lg mb-6">
                歡迎來到我們的 AI 技術展示平台！這是一個致力於展示和分享人工智慧技術的網站。
                我們希望通過這個平台，讓更多人了解 AI 技術的發展現狀和未來潛力。
              </p>

              <p className="text-lg mb-6">
                本站主要展示各種 AI 相關的項目和應用，包括機器學習、深度學習、自然語言處理、
                計算機視覺等領域的技術成果。我們相信 AI 技術將為人類社會帶來巨大的變革和進步。
              </p>

              <p className="text-lg mb-8">
                無論您是 AI 技術的愛好者、學習者，還是專業的開發者，都歡迎在這裡探索和學習。
                我們會持續更新內容，分享最新的技術趨勢和實用工具。
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">網站特色</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 展示最新的 AI 技術項目</li>
                  <li>• 提供技術學習資源</li>
                  <li>• 分享實用的開發工具</li>
                  <li>• 定期更新技術內容</li>
                </ul>
              </div>

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
