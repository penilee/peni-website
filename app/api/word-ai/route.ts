import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 語言代碼對應的語言名稱
const languageNames: { [key: string]: string } = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'ja': 'Japanese',
  'ko': 'Korean',
  'es': 'Spanish',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'th': 'Thai'
};

export async function POST(request: NextRequest) {
  try {
    // 檢查 API 金鑰
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          success: false,
          error: 'OpenAI API 金鑰未設定，請聯繫管理員' 
        },
        { status: 500 }
      );
    }

    // 解析請求內容
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { 
          success: false,
          error: '請求格式錯誤，請檢查 JSON 格式' 
        },
        { status: 400 }
      );
    }

    const { keyword, selectedLanguage } = body;

    // 驗證輸入
    if (!keyword || typeof keyword !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: '請提供有效的關鍵字' 
        },
        { status: 400 }
      );
    }

    if (!selectedLanguage || typeof selectedLanguage !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: '請選擇有效的語言' 
        },
        { status: 400 }
      );
    }

    if (!languageNames[selectedLanguage]) {
      return NextResponse.json(
        { 
          success: false,
          error: '無效的語言選擇' 
        },
        { status: 400 }
      );
    }

    // 構建提示詞
    const languageName = languageNames[selectedLanguage];
    const systemPrompt = `你是一個專業的${languageName}語言學習助手。請根據提供的關鍵字，生成4個相關的${languageName}單字。

請嚴格按照以下 JSON 格式回傳，不要包含任何其他文字：
{
  "單字清單": ["word1", "word2", "word3", "word4"],
  "單字中文意思": ["中文意思1", "中文意思2", "中文意思3", "中文意思4"]
}

重要要求：
1. 單字清單必須包含4個${languageName}單字，必須是${languageName}的原始單字，不是英文或其他語言
2. 單字中文意思必須對應單字清單中的每個${languageName}單字
3. 所有單字都應該與關鍵字相關
4. 單字難度適中，適合語言學習者
5. 確保生成的單字是${languageName}的標準寫法和發音
6. 如果是日文，請使用平假名或片假名；如果是韓文，請使用韓文字母；如果是阿拉伯文，請使用阿拉伯字母等

範例：
- 如果語言是日本語，單字應該是：["りんご", "みかん", "バナナ", "いちご"]
- 如果語言是한국어，單字應該是：["사과", "오렌지", "바나나", "딸기"]
- 如果語言是العربية，單字應該是：["تفاح", "برتقال", "موز", "فراولة"]`;

    // 調用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `關鍵字：${keyword}`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
      temperature: 0.7,
    });

    // 提取 AI 回覆
    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { 
          success: false,
          error: '無法取得 AI 回覆，請稍後再試' 
        },
        { status: 500 }
      );
    }

    // 解析 JSON 回應
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      return NextResponse.json(
        { 
          success: false,
          error: 'AI 回應格式錯誤，請稍後再試' 
        },
        { status: 500 }
      );
    }

    // 驗證回應格式
    if (!parsedResponse['單字清單'] || !parsedResponse['單字中文意思']) {
      return NextResponse.json(
        { 
          success: false,
          error: 'AI 回應格式不正確，請稍後再試' 
        },
        { status: 500 }
      );
    }

    // 回傳成功回應
    return NextResponse.json({
      success: true,
      data: parsedResponse,
      keyword: keyword,
      language: selectedLanguage,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Word AI API 錯誤:', error);
    
    // 處理 OpenAI API 錯誤
    if (error instanceof OpenAI.APIError) {
      let errorMessage = 'OpenAI API 錯誤';
      
      // 根據錯誤類型提供更具體的訊息
      switch (error.status) {
        case 401:
          errorMessage = 'API 金鑰無效或已過期';
          break;
        case 429:
          errorMessage = 'API 請求次數已達上限，請稍後再試';
          break;
        case 500:
          errorMessage = 'OpenAI 伺服器錯誤，請稍後再試';
          break;
        default:
          errorMessage = error.message || 'OpenAI API 發生錯誤';
      }
      
      return NextResponse.json(
        { 
          success: false,
          error: errorMessage 
        },
        { status: 500 }
      );
    }

    // 處理網路錯誤
    if (error instanceof Error && error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          success: false,
          error: '網路連線錯誤，請檢查網路狀態' 
        },
        { status: 500 }
      );
    }

    // 處理其他錯誤
    return NextResponse.json(
      { 
        success: false,
        error: '伺服器內部錯誤，請稍後再試' 
      },
      { status: 500 }
    );
  }
}

// 處理 OPTIONS 請求（CORS）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
