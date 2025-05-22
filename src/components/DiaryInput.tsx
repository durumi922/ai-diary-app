// src/components/DiaryInput.tsx
import { useState } from "react";

export default function DiaryInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text] = useState("");

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-10">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        🌸 오늘의 감정 일기
        </h2>

        <textarea
        className="w-full h-40 sm:h-48 p-4 rounded-2xl border border-gray-300 shadow-sm resize-none text-base sm:text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-pastelPink transition"
        placeholder="오늘의 기분이나 있었던 일을 적어보세요 😊"
        />


        
      <div className="flex justify-center sm:justify-end mt-4">
        <button
          disabled={!text.trim()}
          onClick={() => onSubmit(text)}
          className="bg-pastelPink hover:bg-pastelMint text-white text-sm sm:text-base font-semibold py-2 px-6 rounded-2xl shadow-md transition-all disabled:opacity-50"
        >
          감정 분석하기 ✨
        </button>
      </div>
    </div>
  );
}
