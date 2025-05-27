// src/LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showBars, setShowBars] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showCards, setShowCards] = useState([false, false, false]);
  const [showLoginFade, setShowLoginFade] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBars(true), 100);
    setTimeout(() => setShowHeadline(true), 700);
    setTimeout(() => setShowSub(true), 1200);
    setTimeout(() => setShowCards([false, true, false]), 1700); // middle
    setTimeout(() => setShowCards([true, true, false]), 2000); // left
    setTimeout(() => setShowCards([true, true, true]), 2300); // right
  }, []);

  const handleLogin = () => {
    setShowLoginFade(true);
    setTimeout(() => navigate('/login'), 600);
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      {/* Log In button pinned to top right */}
      <div className="fixed top-4 right-8 z-50">
        <button
          onClick={handleLogin}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow transition duration-300 hover:bg-blue-700"
        >
          Log In
        </button>
      </div>
      {/* Side Bars */}
     {/* Left Bar */}
<div
  className={`
    fixed left-0 bottom-0 w-32 h-3/4 bg-gray-400 rounded-t-3xl z-50
    transform transition-all duration-700 ease-out
    ${showBars ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
  `}
/>

{/* Right Bar */}
<div
  className={`
    fixed right-0 bottom-0 w-32 h-3/4 bg-gray-400 rounded-t-3xl z-50
    transform transition-all duration-700 ease-out
    ${showBars ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
  `}
/>
      {/* Main Content */}
      <div className="relative z-40 flex flex-col items-center">
        <h1 className={`text-5xl font-bold mb-4 transition-opacity duration-700 !text-black ${showHeadline ? 'opacity-100' : 'opacity-0'}`}>
          Connect. Learn. Earn.
        </h1>
        <p className={`mb-8 transition-opacity duration-700 !text-black ${showSub ? 'opacity-100' : 'opacity-0'}`}>
          Your data is a profitable asset. With Macro Tracker, you control what data to share anonymously and earn from it.
        </p>
        {/* Logos */}
        <div className={`flex space-x-4 mb-8 transition-opacity duration-700 ${showSub ? 'opacity-100' : 'opacity-0'}`}>
          {/* Replace with your own logos */}
          <span className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">U</span>
          <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">S</span>
          <span className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">A</span>
          <span className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">N</span>
        </div>
        {/* Cards */}
        <div className="flex space-x-6">
          {/* Left Card */}
          <div
            className={`w-64 h-64 bg-white rounded-2xl shadow-lg transition-all duration-700
              ${showCards[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              hover:rotate-[-6deg] hover:scale-105`}
            style={{ transitionDelay: `200ms` }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-gray-400 mb-2">Your earnings</div>
              <div className="text-3xl font-bold">$30.00</div>
              <div className="text-xs text-gray-500 mt-2">Next payout in: 10,550 pts</div>
            </div>
          </div>
          {/* Middle Card */}
          <div
            className={`w-64 h-64 bg-white rounded-2xl shadow-lg transition-all duration-700
              ${showCards[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              hover:rotate-[-3deg] hover:scale-105`}
            style={{ transitionDelay: `0ms` }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-lg font-semibold mb-2">Connect sources</div>
              <div className="flex space-x-2">
                <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">U</span>
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">S</span>
                <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">A</span>
                <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">N</span>
              </div>
            </div>
          </div>
          {/* Right Card */}
          <div
            className={`w-64 h-64 bg-white rounded-2xl shadow-lg transition-all duration-700
              ${showCards[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              hover:rotate-[6deg] hover:scale-105`}
            style={{ transitionDelay: `400ms` }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-gray-400 mb-2">Learn more from your data</div>
              <div className="text-sm text-gray-600">Make better decisions</div>
            </div>
          </div>
        </div>
      </div>
      {/* Fade overlay for login */}
      {showLoginFade && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center animate-fade-in z-50">
          <span className="text-2xl font-bold text-blue-600">Loading...</span>
        </div>
      )}
    </div>
  );
}
