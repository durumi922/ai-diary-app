// src/components/DiaryInput.tsx
import { useState } from "react";

export default function DiaryInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-8 mt-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">🌼 오늘의 감정 일기</h2>
      <textarea
        className="w-full h-40 sm:h-48 p-4 rounded-2xl border border-gray-300 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-pastelPink transition"
        placeholder="오늘의 기분이나 있었던 일을 적어보세요 😊"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <button
          disabled={!text.trim()}
          onClick={() => onSubmit(text)}
          className="bg-pastelPink hover:bg-pastelMint text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition-all disabled:opacity-50"
        >
          감정 분석하기 ✨
        </button>
      </div>
    </div>
  );
}
