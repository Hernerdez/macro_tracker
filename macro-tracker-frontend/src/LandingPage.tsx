"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showCards, setShowCards] = useState<boolean[]>([false, false, false])

  useEffect(() => {
    console.log("Landing page mounted!")
    setTimeout(() => {
      console.log("Showing content...")
      setShowContent(true)
    }, 600)
    setTimeout(() => setShowCards([false, true, false]), 1100)
    setTimeout(() => setShowCards([true, true, false]), 1400)
    setTimeout(() => setShowCards([true, true, true]), 1700)
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Curved Side Bars */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 1 }}>
        {/* Left curved sidebar */}
        <div style={{ position: "absolute", left: 0, top: 0, height: "100vh", width: "128px" }}>
          <svg style={{ height: "100%", width: "100%" }} viewBox="0 0 128 900" fill="none">
            <path d="M0,0 L0,900 L64,900 Q128,450 64,0 L0,0 Z" fill="rgba(156,163,175,0.15)" />
            <path d="M0,0 L0,900 L48,900 Q96,450 48,0 L0,0 Z" fill="rgba(156,163,175,0.25)" />
          </svg>
        </div>
        {/* Right curved sidebar */}
        <div style={{ position: "absolute", right: 0, top: 0, height: "100vh", width: "128px" }}>
          <svg style={{ height: "100%", width: "100%" }} viewBox="0 0 128 900" fill="none">
            <path d="M128,0 L128,900 L64,900 Q0,450 64,0 L128,0 Z" fill="rgba(156,163,175,0.15)" />
            <path d="M128,0 L128,900 L80,900 Q32,450 80,0 L128,0 Z" fill="rgba(156,163,175,0.25)" />
          </svg>
        </div>
      </div>

      {/* Main Container - This ensures everything is centered */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header */}
        <header
          style={{
            width: "100%",
            padding: "16px 0",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "black",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                }}
              ></div>
            </div>
            <span style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>macro tracker</span>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: "16px",
                padding: "8px",
              }}
              onClick={() => navigate("/about")}
            >
              About
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: "16px",
                padding: "8px",
              }}
              onClick={() => navigate("/features")}
            >
              Features
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: "16px",
                padding: "8px",
              }}
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: "16px",
                padding: "8px",
              }}
              onClick={() => navigate("/blog")}
            >
              Blog
            </button>
          </nav>

          <button
            onClick={() => navigate("/signup")}
            style={{
              border: "1px solid #d1d5db",
              color: "#374151",
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Sign up
          </button>
        </header>

        {/* Hero Section */}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto 80px auto",
            textAlign: "center",
            opacity: showContent ? 1 : 0,
            transform: showContent ? "translateY(0)" : "translateY(32px)",
            transition: "all 1s ease-out",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "24px",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Track. Analyze. Improve.
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 32px auto",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Take control of your nutrition journey with Macro Tracker. Log meals, track macros, and achieve your health
            goals.
          </p>
          {/* Indicator dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "48px" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: i === 2 ? "#9ca3af" : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>

        {/* Cards Container */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "32px",
            margin: "0 auto",
          }}
        >
          {/* Track Card */}
          <div
            style={{
              width: "300px",
              height: "300px",
              padding: "32px",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              opacity: showCards[0] ? 1 : 0,
              transform: showCards[0] ? "translateY(0) rotate(-2deg)" : "translateY(32px)",
              transition: "all 0.7s ease-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (showCards[0]) {
                e.currentTarget.style.transform = "translateY(-8px) rotate(-2deg) scale(1.05)"
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)"
              }
            }}
            onMouseLeave={(e) => {
              if (showCards[0]) {
                e.currentTarget.style.transform = "translateY(0) rotate(-2deg)"
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }
            }}
          >
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>Track your meals</p>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>2,500</div>
            <div style={{ width: "100%", height: "64px", marginBottom: "16px" }}>
              <svg viewBox="0 0 200 60" style={{ width: "100%", height: "100%" }}>
                <path d="M10,40 Q50,20 100,30 T190,25" stroke="#e5e7eb" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              Daily calorie goal: <span style={{ fontWeight: "500" }}>2,500 kcal</span>
            </p>
          </div>

          {/* Connect Sources Card */}
          <div
            style={{
              width: "300px",
              height: "300px",
              padding: "32px",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              opacity: showCards[1] ? 1 : 0,
              transform: showCards[1] ? "translateY(0) rotate(1deg)" : "translateY(32px)",
              transition: "all 0.7s ease-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (showCards[1]) {
                e.currentTarget.style.transform = "translateY(-8px) rotate(1deg) scale(1.05)"
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)"
              }
            }}
            onMouseLeave={(e) => {
              if (showCards[1]) {
                e.currentTarget.style.transform = "translateY(0) rotate(1deg)"
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "32px" }}>
              Connect sources
            </h3>
            <div
              style={{
                width: "64px",
                height: "32px",
                backgroundColor: "#111827",
                borderRadius: "16px",
                marginBottom: "32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "black",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>MT</span>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#f97316",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>F</span>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#22c55e",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#dc2626",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>N</span>
              </div>
            </div>
            <button
              style={{
                backgroundColor: "#1f2937",
                color: "white",
                padding: "8px 24px",
                borderRadius: "24px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              📱 Download on the App Store
            </button>
          </div>

          {/* Learn More Card */}
          <div
            style={{
              width: "300px",
              height: "300px",
              padding: "32px",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              opacity: showCards[2] ? 1 : 0,
              transform: showCards[2] ? "translateY(0) rotate(2deg)" : "translateY(32px)",
              transition: "all 0.7s ease-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (showCards[2]) {
                e.currentTarget.style.transform = "translateY(-8px) rotate(2deg) scale(1.05)"
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)"
              }
            }}
            onMouseLeave={(e) => {
              if (showCards[2]) {
                e.currentTarget.style.transform = "translateY(0) rotate(2deg)"
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#f3f4f6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#d1d5db",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>What's my protein intake?</div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>
                Am I meeting my macro goals?
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>How can I improve my diet?</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <div>
                <p style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: 0 }}>
                  Learn more from your data
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>and make better decisions</p>
              </div>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#6b7280" }}>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
