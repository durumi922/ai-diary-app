import DiaryInput from "./components/DiaryInput";

function App() {
  const handleSubmit = (text: string) => {
    console.log("✍️ 사용자 일기:", text);
    // 여기서 감정 분석 시작할 수 있어!
  };

  return (
    <main className="min-h-screen bg-pastelBlue py-10 px-4">
      <DiaryInput onSubmit={handleSubmit} />
    </main>
  );
}

export default App;
