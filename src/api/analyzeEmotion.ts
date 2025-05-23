// src/api/analyzeEmotion.ts

const HF_API_TOKEN = import.meta.env.VITE_HF_TOKEN; // ← .env에 숨김


export async function analyzeEmotion(text: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  const result = await response.json();
  console.log("🔍 감정 분석 결과:", result);
  return result;
}
