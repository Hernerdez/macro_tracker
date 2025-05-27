// src/LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger any animations after mount
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
          className="px-6 py-3 rounded bg-primary text-white shadow hover:bg-primary-dark transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded border border-primary text-primary hover:bg-primary hover:text-white transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
