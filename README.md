# 沛沛的 AI 世界

這是一個使用 Next.js 15 + React 19 + TypeScript 建立的 AI 實驗室展示網站，展示各種人工智慧技術和應用。

## 🚀 快速開始

### 1. 安裝依賴套件
```bash
npm install
```

### 2. 環境變數設定
在專案根目錄創建 `.env.local` 檔案：
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**如何獲取 OpenAI API 金鑰：**
- 前往 [OpenAI Platform](https://platform.openai.com/api-keys)
- 註冊或登入帳號
- 創建新的 API 金鑰
- 將金鑰複製到 `.env.local` 檔案中

### 3. 啟動開發伺服器
```bash
npm run dev
```

### 4. 開啟瀏覽器
```
http://localhost:3000
```

## ✨ 功能特色

### 🏠 首頁展示
- **實驗室介紹**：展示 AI 實驗室的使命和願景
- **作品集展示**：6 個精選 AI 專案展示
  - 智能聊天機器人 (NLP)
  - 計算機視覺系統 (CV)
  - 大數據分析平台 (ML)
  - 推薦系統 (RS)
  - 自動駕駛系統 (AD)
  - 語音助手 (ASR/TTS)

### 🤖 AI 單字聯想器 (`/ai-lang`)
- **多語言支援**：支援 12 種語言（英文、法文、德文、日文、韓文、西班牙文、義大利文、葡萄牙文、俄文、阿拉伯文、印地文、泰文）
- **智能聯想**：根據關鍵字生成相關單字
- **例句生成**：為每個單字生成實用例句
- **學習記錄**：保存學習歷史，方便複習

### 💬 AI 聊天助手 (`/ai-chat`)
- **多種人設**：10 種不同的 AI 人設（專業、詼諧、憤怒、詩人、政客、哲學家、科學家、藝術家、老師、朋友）
- **即時對話**：支援即時聊天互動
- **對話歷史**：保存聊天記錄

### 🍕 其他功能
- **食物推薦** (`/api/food`)：AI 食物推薦系統
- **汽車資訊** (`/api/car`)：汽車相關資訊查詢

## 🏗️ 專案結構

```
專案目錄/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # 首頁 (Andy的AI Lab)
│   ├── layout.tsx         # 全域版面配置
│   ├── globals.css        # 全域樣式
│   ├── ai-lang/           # AI 語言學習頁面
│   │   └── page.tsx
│   ├── ai-chat/           # AI 聊天頁面
│   │   └── page.tsx
│   ├── about/             # 關於頁面
│   │   └── page.tsx
│   ├── faq/               # 常見問題頁面
│   │   └── page.tsx
│   └── api/               # API 路由
│       ├── word-ai/       # 單字 AI API
│       ├── sentence-ai/   # 例句 AI API
│       ├── chat/          # 聊天 AI API
│       ├── food/          # 食物推薦 API
│       └── car/           # 汽車資訊 API
├── components/            # React 元件
│   ├── Navbar.tsx         # 導航欄
│   └── MobileMenu.tsx     # 手機選單
├── services/              # 服務層（第三方服務整合）
├── public/                # 靜態資源
├── SETUP.md               # AI 聊天功能設定說明
└── .env.local             # 環境變數（需要自行創建）
```

## 🔌 API 端點

### 單字 AI API (`/api/word-ai`)
**POST** 請求格式：
```json
{
  "keyword": "水果",
  "selectedLanguage": "ja"
}
```

**回應格式：**
```json
{
  "success": true,
  "data": {
    "單字清單": ["りんご", "みかん", "バナナ", "いちご"],
    "單字中文意思": ["蘋果", "橘子", "香蕉", "草莓"]
  },
  "keyword": "水果",
  "language": "ja"
}
```

### 例句 AI API (`/api/sentence-ai`)
**POST** 請求格式：
```json
{
  "word": "りんご",
  "language": "ja"
}
```

**回應格式：**
```json
{
  "success": true,
  "data": {
    "例句": "私は毎日りんごを食べます。",
    "例句中文意思": "我每天吃蘋果。"
  }
}
```

### 聊天 AI API (`/api/chat`)
**POST** 請求格式：
```json
{
  "message": "你好",
  "personality": "friendly"
}
```

**回應格式：**
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

## 🛠️ 技術棧

- **前端框架**：Next.js 15 (App Router)
- **UI 框架**：React 19
- **程式語言**：TypeScript
- **樣式框架**：Tailwind CSS 4
- **AI 服務**：OpenAI GPT-3.5-turbo
- **HTTP 客戶端**：Axios
- **資料庫**：Firebase
- **開發工具**：ESLint, PostCSS

## 🐛 常見問題

### 1. "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"
**原因**：缺少 OpenAI API 金鑰
**解決方案**：
- 確認已創建 `.env.local` 檔案
- 確認 API 金鑰格式正確
- 重新啟動開發伺服器

### 2. "OpenAI API 金鑰未設定"
**原因**：環境變數未正確載入
**解決方案**：
- 檢查 `.env.local` 檔案位置（應在專案根目錄）
- 確認檔案名稱正確（包含點號）
- 重新啟動開發伺服器

### 3. API 請求失敗
**可能原因**：
- 網路連線問題
- OpenAI API 額度不足
- API 金鑰無效或過期

## 📝 開發指令

```bash
# 開發模式
npm run dev

# 建置專案
npm run build

# 啟動生產伺服器
npm run start

# 程式碼檢查
npm run lint
```

## 📚 相關文件

- [SETUP.md](./SETUP.md) - AI 聊天功能詳細設定說明

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

本專案採用 MIT 授權條款。

---

**注意事項：**
- 請妥善保管您的 OpenAI API 金鑰
- 建議在生產環境中使用更安全的環境變數管理方式
- 定期檢查 API 使用額度
- 本專案展示各種 AI 技術應用，適合學習和研究使用

## 將專案推上 github

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/penilee/peni-website.git
git push -u origin main
