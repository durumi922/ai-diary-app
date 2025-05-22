import { useState } from "react";

type EmotionResultProps = {
  emotionText: string;
  emojis: string[];
  onSelect: (emoji: string) => void;
};

export default function EmotionResult({ emotionText, emojis, onSelect }: EmotionResultProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md max-w-xl w-full mx-auto text-center">
      <p className="text-lg font-semibold mb-4">{emotionText}</p>
      <div className="flex justify-center gap-4">
        {emojis.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelected(emoji);
              onSelect(emoji);
            }}
            className={`
              text-3xl transition-transform duration-200
              ${selected === emoji ? "scale-125 border-2 border-pastelPink rounded-full" : "hover:scale-110"}
            `}
          >
            {emoji}
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-4 text-sm text-pastelPink transition-opacity animate-fade-in">
          “{selected}” 이모지를 선택했어요!
        </p>
      )}
    </div>
  );
}
