# AI 聊天功能設定說明

## 環境變數設定

為了使用 AI 聊天功能，您需要設定 OpenAI API 金鑰：

1. 前往 [OpenAI Platform](https://platform.openai.com/api-keys) 獲取您的 API 金鑰
2. 在專案根目錄創建 `.env.local` 檔案
3. 在 `.env.local` 中添加以下內容：

```env
OPENAI_API_KEY=your_openai_api_key_here
```

請將 `your_openai_api_key_here` 替換為您的實際 API 金鑰。

## 功能特色

- 🤖 支援 10 種不同的 AI 人設（專業、詼諧、憤怒、詩人、政客、哲學家、科學家、藝術家、老師、朋友）
- 💬 即時聊天對話
- 📱 響應式設計，支援手機和桌面
- ⚡ 使用 GPT-3.5-turbo 模型
- 🔄 載入狀態指示
- 🗑️ 清除對話功能

## API 端點

- **POST** `/api/chat` - 處理聊天請求

### 請求格式
```json
{
  "message": "您的問題",
  "personality": "選擇的AI人設"
}
```

### 回應格式
```json
{
  "success": true,
  "message": "AI 回覆內容",
  "personality": "使用的AI人設",
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 456,
    "total_tokens": 579
  }
}
```

## 注意事項

- 確保您有足夠的 OpenAI API 額度
- API 金鑰請妥善保管，不要提交到版本控制系統
- 建議在生產環境中使用更安全的環境變數管理方式 