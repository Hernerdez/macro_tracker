import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showCards, setShowCards] = useState([false, false, false]);
  const [showSidebars, setShowSidebars] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSidebars(true), 100);
    setTimeout(() => setShowContent(true), 600);
    setTimeout(() => setShowCards([false, true, false]), 1100);
    setTimeout(() => setShowCards([true, true, false]), 1400);
    setTimeout(() => setShowCards([true, true, true]), 1700);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Curved Side Bars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute left-0 top-0 h-full w-32 transition-transform duration-1000 ease-out ${
            showSidebars ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <svg className="h-full w-full" viewBox="0 0 128 800" preserveAspectRatio="none" fill="none">
            <path d="M0,0 L0,800 L64,800 Q128,400 64,0 L0,0 Z" fill="rgba(156, 163, 175, 0.3)" />
            <path d="M0,0 L0,800 L48,800 Q96,400 48,0 L0,0 Z" fill="rgba(156, 163, 175, 0.5)" />
          </svg>
        </div>
        <div
          className={`absolute right-0 top-0 h-full w-32 transition-transform duration-1000 ease-out ${
            showSidebars ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <svg className="h-full w-full" viewBox="0 0 128 800" preserveAspectRatio="none" fill="none">
            <path d="M128,0 L128,800 L64,800 Q0,400 64,0 L128,0 Z" fill="rgba(156, 163, 175, 0.3)" />
            <path d="M128,0 L128,800 L80,800 Q32,400 80,0 L128,0 Z" fill="rgba(156, 163, 175, 0.5)" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">earnwave</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">For business</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Media</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
          >
            Sign up
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`mb-16 transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">Connect. Learn. Earn</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Your data is a profitable asset. With Macro Tracker you control what data to share anonymously and earn from it.
            </p>
            <div className="flex justify-center space-x-2 mb-12">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? "bg-gray-400" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Cards… (use your final Card JSX as above for each) */}
          </div>
        </div>
      </main>
    </div>
  );
}
