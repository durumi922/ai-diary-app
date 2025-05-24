import { useState } from "react";
import DiaryInput from "../components/DiaryInput";
import EmotionResult from "../components/EmotionResult";

export default function HomePage() {
  const [emotionText, setEmotionText] = useState("");
  const [emojis, setEmojis] = useState<string[]>([]);

  const handleDiarySubmit = (emotion: string, emojiList: string[]) => {
    setEmotionText(emotion);
    setEmojis(emojiList);
  };

  const handleEmojiSelect = (emoji: string) => {
    console.log("사용자가 선택한 이모지:", emoji);
    // 여기에 저장 요청도 추가할 예정
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-blue-100 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">🌸 오늘의 감정 일기</h2>
        <DiaryInput onSubmit={handleDiarySubmit} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <EmotionResult
          emotionText={emotionText}
          emojis={emojis}
          onSelect={handleEmojiSelect}
        />
      </div>
    </div>
  );
}
