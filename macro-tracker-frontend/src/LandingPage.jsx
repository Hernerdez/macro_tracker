// src/LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger any fade-in or load-in animations
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-center text-gray-800 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
        Connect. Learn. Earn.
      </h1>
      <p className="max-w-md text-gray-600 mb-8">
        Your data is a profitable asset. With Macro Tracker, you control what data to share anonymously and earn from it.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 rounded bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          Log In
        </button>
      </div>
      <img src="/path/to/your/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
    </div>
  );
}
