import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { sentence, language } = await request.json();

    if (!sentence || !language) {
      return NextResponse.json(
        { success: false, error: '缺少必要參數：sentence 或 language' },
        { status: 400 }
      );
    }

    // 根據語言選擇合適的語音
    const voiceMap: { [key: string]: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' } = {
      'en': 'alloy',
      'fr': 'echo',
      'de': 'fable',
      'ja': 'onyx',
      'ko': 'nova',
      'es': 'shimmer',
      'it': 'echo',
      'pt': 'echo',
      'ru': 'onyx',
      'ar': 'nova',
      'hi': 'alloy',
      'th': 'nova'
    };

    const selectedVoice = voiceMap[language] || 'alloy';

    // 生成語音
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: selectedVoice,
      input: sentence,
    });

    // 將音頻轉換為base64
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');

    return NextResponse.json({
      success: true,
      audio: base64Audio,
      format: 'mp3'
    });

  } catch (error) {
    console.error('TTS API 錯誤:', error);
    return NextResponse.json(
      { success: false, error: '語音生成失敗' },
      { status: 500 }
    );
  }
}
