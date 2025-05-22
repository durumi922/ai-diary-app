// App.tsx
import DiaryInput from "./components/DiaryInput";

export default function App() {
  return (
    <main className="min-h-screen bg-pastelBlue flex flex-col items-center px-4">
      <section className="w-full max-w-xl py-10">
        <DiaryInput onSubmit={(text) => console.log("일기:", text)} />
      </section>
    </main>
  );
}
