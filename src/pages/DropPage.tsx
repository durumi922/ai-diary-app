import { useEffect, useState } from "react";
import axios from "axios";
import EmojiPhysics from "../components/EmojiPhysics";

export default function DropPage() {
  const [emojis, setEmojis] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await axios.get("http://localhost:8000/saved-icons");
        setEmojis(res.data.emojis);
      } catch (err) {
        console.error("저장된 이모지 불러오기 실패", err);
      }
    };

    fetchEmojis();
  }, []);

  return (
    <div className="pt-20 px-4 min-h-screen bg-yellow-50 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">🎁 수집한 감정 아이콘</h2>
      {emojis.length > 0 ? (
        <EmojiPhysics emojis={emojis} />
      ) : (
        <p className="text-gray-500">아직 수집된 이모지가 없어요.</p>
      )}
    </div>
  );
}
