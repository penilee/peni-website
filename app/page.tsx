import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header Section */}
        <header className="text-center py-16 px-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">未來智匯實驗室</h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            探索人工智慧的無限可能，創造未來的技術解決方案
          </p>
        </header>

        {/* Introduction Section */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">關於我們的實驗室</h2>
                <p className="text-lg text-gray-600 mb-6">
                  我們致力於研究和開發最先進的人工智慧技術，從機器學習到深度學習，
                  從自然語言處理到計算機視覺，我們不斷探索AI的邊界。
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  我們的團隊由經驗豐富的研究人員和工程師組成，
                  專注於將理論轉化為實際應用，為社會創造真正的價值。
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                  了解更多
                </button>
              </div>
              <div className="flex justify-center">
                <Image 
                  src="https://picsum.photos/500/400?random=1" 
                  alt="AI Lab" 
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">精選作品集</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src="https://picsum.photos/400/250?random=2" 
                  alt="AI Chatbot" 
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">智能聊天機器人</h3>
                  <p className="text-gray-600 mb-4">
                    基於自然語言處理技術開發的智能對話系統，
                    能夠理解用戶意圖並提供準確回應。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">NLP</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Python</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">TensorFlow</span>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src="https://picsum.photos/400/250?random=3" 
                  alt="Computer Vision" 
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">計算機視覺系統</h3>
                  <p className="text-gray-600 mb-4">
                    利用深度學習技術實現的圖像識別和物體檢測系統，
                    應用於自動化品質控制。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">CV</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">PyTorch</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">OpenCV</span>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src="https://picsum.photos/400/250?random=4" 
                  alt="Data Analytics" 
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">大數據分析平台</h3>
                  <p className="text-gray-600 mb-4">
                    整合機器學習算法的數據分析平台，
                    提供預測性分析和商業智能洞察。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">ML</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Spark</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">Pandas</span>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src="https://picsum.photos/400/250?random=5" 
                  alt="Recommendation System" 
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">推薦系統</h3>
                  <p className="text-gray-600 mb-4">
                    基於協同過濾和內容過濾的智能推薦算法，
                    為用戶提供個性化內容推薦。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">RS</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Scikit-learn</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">Redis</span>
                  </div>
                </div>
              </div>

              {/* Project Card 5 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src="https://picsum.photos/400/250?random=6" 
                  alt="Autonomous Vehicle" 
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">自動駕駛系統</h3>
                  <p className="text-gray-600 mb-4">
                    結合感知、決策和控制的自動駕駛技術，
                    實現安全可靠的無人駕駛功能。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">AD</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">ROS</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">C++</span>
                  </div>
                </div>
              </div>

              {/* Project Card 6 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src="https://picsum.photos/400/250?random=7" 
                  alt="Voice Assistant" 
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">語音助手</h3>
                  <p className="text-gray-600 mb-4">
                    整合語音識別和語音合成的智能助手系統，
                    支持多語言交互和自然對話。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">ASR</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">TTS</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">Kaldi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
