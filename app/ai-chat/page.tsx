'use client';

import { useState } from 'react';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  personality?: string;
  timestamp: Date;
}

export default function AIChatPage() {
  const [inputText, setInputText] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('專業');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const aiPersonalities = [
    '專業',
    '詼諧',
    '憤怒',
    '詩人',
    '政客',
    '哲學家',
    '科學家',
    '藝術家',
    '老師',
    '朋友'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 基本驗證 - 只檢查是否有內容
    if (!inputText.trim()) {
      alert('請輸入您的問題！');
      return;
    }

    // 如果正在載入中，允許重複提交（但會顯示提示）
    if (isLoading) {
      alert('正在處理您的請求，請稍候...');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [userMessage, ...prev]); // 新訊息放在最前面
    const currentInput = inputText; // 保存當前輸入
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          personality: selectedPersonality
        }),
      });

      // 檢查 HTTP 狀態碼
      if (!response.ok) {
        throw new Error(`HTTP 錯誤！狀態碼: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          isUser: false,
          personality: selectedPersonality,
          timestamp: new Date()
        };
        setMessages(prev => [aiMessage, ...prev]); // 新訊息放在最前面
      } else {
        // 處理 API 錯誤
        const errorMessage = data.error || '無法取得回應';
        alert(`錯誤：${errorMessage}`);
        
        const errorMessageObj: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `❌ ${errorMessage}`,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [errorMessageObj, ...prev]); // 新訊息放在最前面
      }
    } catch (error) {
      console.error('API 請求錯誤:', error);
      
      let errorMsg = '網路錯誤，請稍後再試';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMsg = '無法連接到伺服器，請檢查網路連線';
        } else if (error.message.includes('HTTP 錯誤')) {
          errorMsg = '伺服器錯誤，請稍後再試';
        } else {
          errorMsg = error.message;
        }
      }
      
      alert(`錯誤：${errorMsg}`);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `❌ ${errorMsg}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [errorMessage, ...prev]); // 新訊息放在最前面
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (messages.length === 0) {
      alert('目前沒有對話記錄可以清除');
      return;
    }
    
    const confirmClear = confirm('確定要清除所有對話記錄嗎？此操作無法復原。');
    if (confirmClear) {
      setMessages([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // 直接調用提交邏輯，避免類型轉換問題
      if (!inputText.trim()) {
        alert('請輸入您的問題！');
        return;
      }
      if (isLoading) {
        alert('正在處理您的請求，請稍候...');
        return;
      }
      
      // 手動觸發表單提交
      const form = e.currentTarget.closest('form');
      if (form) {
        form.requestSubmit();
      }
    }
  };

  // 格式化時間為 HH:mm:ss
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 表單區 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="請輸入您的問題... (按 Enter 發送)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={selectedPersonality}
              onChange={(e) => setSelectedPersonality(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {aiPersonalities.map((personality) => (
                <option key={personality} value={personality}>
                  {personality}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isLoading ? '處理中...' : '送出'}
            </button>
          </form>
        </div>

        {/* 聊天內容區域 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">AI 聊天助手</h1>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                清除對話 ({messages.length})
              </button>
            )}
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                歡迎使用 AI 聊天助手！請在上方輸入框中輸入您的問題，選擇 AI 個性，我們將為您提供智能回答。
              </p>
              <div className="text-sm text-gray-500">
                <p>💡 小提示：您可以選擇不同的 AI 個性來獲得不同風格的回答</p>
                <p>⌨️ 按 Enter 鍵可以快速發送訊息</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-r-lg rounded-bl-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <span>AI 正在思考中...</span>
                    </div>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 ${
                      message.isUser
                        ? 'bg-blue-500 text-white rounded-l-lg rounded-br-lg' // 使用者訊息：去除右上角圓角
                        : message.content.startsWith('❌') 
                          ? 'bg-red-100 text-red-800 border border-red-200 rounded-r-lg rounded-bl-lg' // 錯誤訊息：去除左上角圓角
                          : 'bg-gray-100 text-gray-800 rounded-r-lg rounded-bl-lg' // AI訊息：去除左上角圓角
                    }`}
                  >
                    {!message.isUser && message.personality && !message.content.startsWith('❌') && (
                      <div className="text-xs text-gray-500 mb-1">
                        {message.personality} 模式
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
