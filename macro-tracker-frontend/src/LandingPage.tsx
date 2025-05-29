"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { useEffect, useState, Suspense } from "react"
import ErrorBoundary from "./components/error-boundary"
import { LoadingFallback, CardLoadingSkeleton } from "./components/loading-fallback"

function LandingPageContent() {
  const navigate = useNavigate()
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showCards, setShowCards] = useState<boolean[]>([false, false, false])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [navigationError, setNavigationError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const timeouts: NodeJS.Timeout[] = []

      // Simulate initial loading
      timeouts.push(setTimeout(() => setIsLoading(false), 300))
      timeouts.push(setTimeout(() => setShowContent(true), 600))
      timeouts.push(setTimeout(() => setShowCards([false, true, false]), 1100))
      timeouts.push(setTimeout(() => setShowCards([true, true, false]), 1400))
      timeouts.push(setTimeout(() => setShowCards([true, true, true]), 1700))

      // Cleanup function
      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout))
      }
    } catch (error) {
      console.error("Error in useEffect:", error)
      setIsLoading(false)
    }
  }, [])

  const handleNavigation = (path: string) => {
    try {
      setNavigationError(null)
      navigate(path)
    } catch (error) {
      console.error("Navigation error:", error)
      setNavigationError("Failed to navigate. Please try again.")

      // Fallback navigation
      setTimeout(() => {
        try {
          window.location.href = path
        } catch (fallbackError) {
          console.error("Fallback navigation failed:", fallbackError)
        }
      }, 1000)
    }
  }

  if (isLoading) {
    return <LoadingFallback />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      {/* Navigation Error Toast */}
      {navigationError && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{navigationError}</span>
            <button onClick={() => setNavigationError(null)} className="ml-2 text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Curved Side Bars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Left curved sidebar */}
        <div className="absolute left-0 top-0 h-screen w-32">
          <svg className="h-full w-full" viewBox="0 0 128 900" fill="none">
            <path d="M0,0 L0,900 L64,900 Q128,450 64,0 L0,0 Z" fill="rgba(156,163,175,0.15)" />
            <path d="M0,0 L0,900 L48,900 Q96,450 48,0 L0,0 Z" fill="rgba(156,163,175,0.25)" />
          </svg>
        </div>
        {/* Right curved sidebar */}
        <div className="absolute right-0 top-0 h-screen w-32">
          <svg className="h-full w-full" viewBox="0 0 128 900" fill="none">
            <path d="M128,0 L128,900 L64,900 Q0,450 64,0 L128,0 Z" fill="rgba(156,163,175,0.15)" />
            <path d="M128,0 L128,900 L80,900 Q32,450 80,0 L128,0 Z" fill="rgba(156,163,175,0.25)" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 w-full px-4 py-4 border-b border-gray-200">
        <nav className="max-w-4xl mx-auto flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">macro tracker</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleNavigation("/about")}
            >
              About
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleNavigation("/features")}
            >
              Features
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleNavigation("/pricing")}
            >
              Pricing
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleNavigation("/blog")}
            >
              Blog
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleNavigation("/signup")}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
            disabled={!!navigationError}
          >
            Sign up
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-32">
        <div className="max-w-6xl w-full mx-auto text-center px-4">
          {/* Hero Text */}
          <div
            className={`mb-16 transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6 leading-tight whitespace-nowrap">
              Track. Analyze. Improve.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Take control of your nutrition journey with Macro Tracker. Log meals, track macros, and achieve your
              health goals.
            </p>
            {/* Indicator dots */}
            <div className="flex justify-center space-x-2 mb-12">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? "bg-gray-400" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            <Suspense fallback={<CardLoadingSkeleton />}>
              {/* Track Card */}
              <div
                className={`w-80 h-80 p-8 bg-white rounded-2xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-rotate-2 hover:scale-105 ${
                  showCards[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <p className="text-gray-500 text-sm mb-4">Track your meals</p>
                  <div className="text-5xl font-bold text-gray-900 mb-6">2,500</div>
                  <div className="w-full h-16 mb-4">
                    <svg viewBox="0 0 200 60" className="w-full h-full">
                      <path d="M10,40 Q50,20 100,30 T190,25" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-400">
                    Daily calorie goal: <span className="font-medium">2,500 kcal</span>
                  </p>
                </div>
              </div>
            </Suspense>

            <Suspense fallback={<CardLoadingSkeleton />}>
              {/* Connect Sources Card */}
              <div
                className={`w-80 h-80 p-8 bg-white rounded-2xl shadow-lg transition-all duration-700 hover:shadow-xl hover:rotate-1 hover:scale-105 ${
                  showCards[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-8">Connect sources</h3>
                  <div className="w-16 h-8 bg-gray-900 rounded-full mb-8 relative">
                    <div className="w-6 h-6 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">MT</span>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">N</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full text-sm transition-colors"
                  >
                    📱 Download on the App Store
                  </button>
                </div>
              </div>
            </Suspense>

            <Suspense fallback={<CardLoadingSkeleton />}>
              {/* Learn More Card */}
              <div
                className={`w-80 h-80 p-8 bg-white rounded-2xl shadow-lg transition-all duration-700 hover:shadow-xl hover:rotate-2 hover:scale-105 ${
                  showCards[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="text-sm text-gray-600">{"What's my protein intake?"}</div>
                    <div className="text-sm text-gray-600">Am I meeting my macro goals?</div>
                    <div className="text-sm text-gray-600">How can I improve my diet?</div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Learn more from your data</p>
                      <p className="text-sm text-gray-600">and make better decisions</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

const LandingPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <LandingPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default LandingPage
