// src/components/NavBar.tsx
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full bg-pink-100 shadow-md py-3 px-6 flex justify-between items-center fixed top-0 z-50">
      <h1 className="text-xl font-bold text-pink-600">🌸 감정 다이어리</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-pink-500 font-medium">일기 작성</Link>
        <Link to="/drop" className="text-gray-700 hover:text-pink-500 font-medium">수집함</Link>
      </div>
    </nav>
  );
}
