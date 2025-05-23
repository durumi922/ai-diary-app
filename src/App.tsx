import { useState } from "react";
import "./index.css";

// ✅ 임시: 이모지 후보 리스트
const emojiLabels = [
  "😊", "😢", "😡", "😨", "🎉", "☕", "🌷", "📖", "🎮", "🍕", "🚶‍♀️", "🧘‍♀️"
];

const HF_API_TOKEN = import.meta.env.VITE_HF_TOKEN; // ← .env에 숨김

async function getEmojiFromAI(text: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          candidate_labels: emojiLabels,
        },
      }),
    }
  );
  const result = await response.json();
  console.log("🔍 이모지 예측 결과:", result);
  return result?.labels?.slice(0, 3) ?? []; // 상위 3개 추천
}

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string[]>([]);

  const handleAnalyze = async () => {
    setLoading(true);
    const emojis = await getEmojiFromAI(input);
    setResult(emojis);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-pastelBlue flex flex-col justify-center items-center px-4 py-10">
      <div className="bg-white rounded-2xl p-6 shadow-md max-w-xl w-full text-center">
        <h2 className="text-2xl font-bold mb-4">🌸 오늘의 감정 일기</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="오늘 기분이나 있었던 일을 적어보세요 😊"
          className="w-full h-40 p-4 rounded-xl border resize-none"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !input.trim()}
          className="mt-4 bg-pastelPink text-white py-2 px-6 rounded-full shadow hover:bg-pastelMint transition disabled:opacity-50"
        >
          {loading ? "분석 중..." : "감정 분석하기 ✨"}
        </button>
      </div>

      {result.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-md max-w-xl w-full mt-6 text-center">
          <p className="text-lg font-semibold mb-4">
            AI가 추천한 오늘의 아이콘 ✨
          </p>
          <div className="flex justify-center gap-4 text-3xl">
            {result.map((emoji, idx) => (
              <span key={idx}>{emoji}</span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
