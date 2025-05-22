// App.tsx
import EmotionResult from "./components/EmotionResult";
export default App;


function App() {
  const handleSelectEmoji = (emoji: string) => {
    console.log("사용자가 고른 이모지:", emoji);
  };

  return (
      <main className="min-h-screen bg-pastelBlue flex flex-col justify-center items-center px-4 py-10">      <EmotionResult
        emotionText="당신은 오늘 여유롭고 편안한 하루를 보냈어요 🌼"
        emojis={["😊", "🧘‍♀️", "🌷"]}
        onSelect={handleSelectEmoji}
      />
    </main>
  );
}
