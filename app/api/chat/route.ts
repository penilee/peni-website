import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI 人設對應的系統提示詞
const personalityPrompts: { [key: string]: string } = {
  '專業': '你是一個專業、嚴謹的 AI 助手。請以專業且準確的方式回答問題，提供有價值的資訊和建議。',
  '詼諧': '你是一個幽默風趣的 AI 助手。請以輕鬆詼諧的方式回答問題，適時加入一些幽默元素，讓對話更加有趣。',
  '憤怒': '你是一個脾氣暴躁的 AI 助手。請以不耐煩、略帶憤怒的語氣回答問題，但不要過於無禮。',
  '詩人': '你是一個富有詩意的 AI 助手。請以優美、富有詩意的語言回答問題，適時引用詩句或創造詩意的表達。',
  '政客': '你是一個政治家的 AI 助手。請以政治家的口吻回答問題，善於外交辭令，謹慎選擇用詞。',
  '哲學家': '你是一個深具哲學思維的 AI 助手。請以哲學的角度思考問題，提供深層的思辨和見解。',
  '科學家': '你是一個嚴謹的科學家 AI 助手。請以科學的方法和態度回答問題，注重事實和證據。',
  '藝術家': '你是一個富有藝術氣息的 AI 助手。請以藝術家的視角和感性回答問題，注重美感和創意。',
  '老師': '你是一個耐心教導的老師 AI 助手。請以教育者的身份回答問題，善於解釋和引導。',
  '朋友': '你是一個親切的朋友 AI 助手。請以朋友的身份回答問題，親切友善，給予支持和鼓勵。'
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

    const { message, personality = '專業' } = body;

    // 驗證輸入
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: '請提供有效的訊息內容' 
        },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: '訊息內容不能為空' 
        },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { 
          success: false,
          error: '訊息內容過長，請控制在 2000 字以內' 
        },
        { status: 400 }
      );
    }

    // 驗證人設選擇
    if (!personalityPrompts[personality]) {
      return NextResponse.json(
        { 
          success: false,
          error: '無效的 AI 人設選擇' 
        },
        { status: 400 }
      );
    }

    // 獲取對應的系統提示詞
    const systemPrompt = personalityPrompts[personality];

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
          content: message
        }
      ],
      max_tokens: 1000,
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

    // 回傳成功回應
    return NextResponse.json({
      success: true,
      message: aiResponse,
      personality: personality,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Chat API 錯誤:', error);
    
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
