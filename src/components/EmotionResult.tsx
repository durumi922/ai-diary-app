// src/components/EmotionResult.tsx
type EmotionResultProps = {
  emotionText: string;
  emojis: string[];
  onSelect: (emoji: string) => void;
};

export default function EmotionResult({ emotionText, emojis, onSelect }: EmotionResultProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md max-w-xl w-full mx-auto text-center">
      <p className="text-lg font-semibold mb-4">{emotionText}</p>
      <div className="flex justify-center gap-4">
        {emojis.map((emoji, idx) => (
          <button
            key={idx}
            className="text-3xl hover:scale-110 transition-transform"
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
