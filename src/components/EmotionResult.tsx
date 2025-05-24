import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
  emotionText: string;
  emojis: string[];
  onSelect: (emoji: string) => void;
};

export default function EmotionResult({ emotionText, emojis, onSelect }: Props) {
  const navigate = useNavigate();

  const handleClick = async (emoji: string) => {
    onSelect(emoji);
    try {
      await axios.post("http://localhost:8000/save-icon", { emoji });
    } catch (err) {
      console.error("저장 실패", err);
    }
    navigate("/drop");
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-2">감정 분석 결과: {emotionText}</h3>
      <div className="flex space-x-2 justify-center">
        {emojis.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(emoji)}
            className="text-3xl hover:scale-110 transition"
          >
            {emoji}
          </button>
        ))}
      </div>
    </>
  );
}
