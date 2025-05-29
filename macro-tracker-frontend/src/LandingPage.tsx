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
    // Staggered animations
    setTimeout(() => {
      console.log("Showing content...")
      setShowContent(true)
    }, 600)
    setTimeout(() => setShowCards([false, true, false]), 1100)
    setTimeout(() => setShowCards([true, true, false]), 1400)
    setTimeout(() => setShowCards([true, true, true]), 1700)
  }, [])

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
    overflow: "hidden",
    position: "relative",
  }

  const headerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    width: "100%",
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  }

  const navStyle: React.CSSProperties = {
    maxWidth: "64rem",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "32px",
  }

  const mainContentStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "128px",
  }

  const heroStyle: React.CSSProperties = {
    opacity: showContent ? 1 : 0,
    transform: showContent ? "translateY(0)" : "translateY(32px)",
    transition: "all 1s ease-out",
    marginBottom: "64px",
    textAlign: "center" as const,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "24px",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  }

  return (
    <div style={containerStyle}>
      {/* Debug indicator */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "red",
          color: "white",
          padding: "5px 10px",
          zIndex: 9999,
          fontSize: "12px",
        }}
      >
        LANDING PAGE LOADED
      </div>

      {/* Curved Side Bars */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
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

      {/* Header */}
      <header style={headerStyle}>
        <nav style={navStyle}>
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
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: "16px",
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
              }}
              onClick={() => navigate("/blog")}
            >
              Blog
            </button>
          </div>
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
        </nav>
      </header>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <div style={{ maxWidth: "96rem", width: "100%", margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
          {/* Hero Text */}
          <div style={heroStyle}>
            <h1 style={titleStyle}>Track. Analyze. Improve.</h1>
            <p
              style={{
                fontSize: "20px",
                color: "#6b7280",
                maxWidth: "32rem",
                margin: "0 auto 32px auto",
              }}
            >
              Take control of your nutrition journey with Macro Tracker. Log meals, track macros, and achieve your
              health goals.
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

          {/* Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            {/* Track Card */}
            <div
              style={{
                width: "320px",
                height: "320px",
                padding: "32px",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                opacity: showCards[0] ? 1 : 0,
                transform: showCards[0] ? "translateY(0)" : "translateY(32px)",
                transition: "all 0.7s ease-out",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
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
                width: "320px",
                height: "320px",
                padding: "32px",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                opacity: showCards[1] ? 1 : 0,
                transform: showCards[1] ? "translateY(0)" : "translateY(32px)",
                transition: "all 0.7s ease-out",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
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
                width: "320px",
                height: "320px",
                padding: "32px",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                opacity: showCards[2] ? 1 : 0,
                transform: showCards[2] ? "translateY(0)" : "translateY(32px)",
                transition: "all 0.7s ease-out",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
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
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>
                  What's my protein intake?
                </div>
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
    </div>
  )
}

export default LandingPage
