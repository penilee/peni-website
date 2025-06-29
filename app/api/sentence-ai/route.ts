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

    const { word, language } = body;

    // 驗證輸入
    if (!word || typeof word !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: '請提供有效的單字' 
        },
        { status: 400 }
      );
    }

    if (!language || typeof language !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: '請提供有效的語言' 
        },
        { status: 400 }
      );
    }

    if (!languageNames[language]) {
      return NextResponse.json(
        { 
          success: false,
          error: '無效的語言選擇' 
        },
        { status: 400 }
      );
    }

    // 構建提示詞
    const languageName = languageNames[language];
    const systemPrompt = `你是一個專業的${languageName}語言學習助手。請為提供的${languageName}單字生成一個${languageName}例句。

請嚴格按照以下 JSON 格式回傳，不要包含任何其他文字：
{
  "例句": "包含該單字的${languageName}例句",
  "例句中文意思": "例句的中文翻譯"
}

重要要求：
1. 例句必須是${languageName}的原始句子，不是英文或其他語言
2. 例句必須包含提供的${languageName}單字
3. 例句應該簡單易懂，適合語言學習者
4. 例句中文意思要準確翻譯
5. 例句應該有實際意義，能幫助理解單字用法
6. 確保例句使用${languageName}的標準語法和表達方式
7. 如果是日文，請使用適當的敬語或普通語；如果是韓文，請使用適當的語尾；如果是阿拉伯文，請使用正確的語法結構

範例：
- 如果語言是日本語，例句應該是：{"例句": "りんごを食べます", "例句中文意思": "我吃蘋果"}
- 如果語言是한국어，例句應該是：{"例句": "사과를 먹어요", "例句中文意思": "我吃蘋果"}
- 如果語言是العربية，例句應該是：{"例句": "أنا آكل التفاح", "例句中文意思": "我吃蘋果"}`;

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
          content: `單字：${word}`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 300,
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
    if (!parsedResponse['例句'] || !parsedResponse['例句中文意思']) {
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
      word: word,
      language: language,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Sentence AI API 錯誤:', error);
    
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
          error: '網路連線錯誤，請檢查網路連線' 
        },
        { status: 500 }
      );
    }

    // 其他未知錯誤
    return NextResponse.json(
      { 
        success: false,
        error: '伺服器內部錯誤，請稍後再試' 
      },
      { status: 500 }
    );
  }
}

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
