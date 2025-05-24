import { useState } from "react";
import axios from "axios";

type Props = {
  onSubmit: (emotion: string, emojis: string[]) => void;
};

export default function DiaryInput({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleAnalyze = async () => {
    try {
      const res = await axios.post("http://localhost:8000/analyze", { text });
      const { emotion, emojis } = res.data;
      onSubmit(emotion, emojis);
    } catch (err) {
      console.error("분석 실패", err);
      onSubmit("분석 실패", []);
    }
  };

  return (
    <>
      <textarea
        className="w-full h-32 p-2 border rounded mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="오늘 하루를 일기로 작성해보세요..."
      />
      <button
        onClick={handleAnalyze}
        className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500"
      >
        분석하기
      </button>
    </>
  );
}
