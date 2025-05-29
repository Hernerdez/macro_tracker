"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showCards, setShowCards] = useState<boolean[]>([false, false, false])
  const [sidebarsVisible, setSidebarsVisible] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [modalMode, setModalMode] = useState<'signup' | 'login'>('signup')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    console.log("Landing page mounted!")
    setTimeout(() => {
      console.log("Showing content...")
      setShowContent(true)
    }, 600)
    setTimeout(() => setShowCards([false, true, false]), 1100)
    setTimeout(() => setShowCards([true, true, false]), 1400)
    setTimeout(() => setShowCards([true, true, true]), 1700)
    setTimeout(() => setSidebarsVisible(true), 100)
  }, [])

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginError('')
    try {
      const formData = new FormData()
      formData.append('username', loginForm.email) // OAuth2 expects 'username' field
      formData.append('password', loginForm.password)
      
      const response = await axios.post('https://macro-tracker-api.onrender.com/login/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      localStorage.setItem('token', response.data.access_token)
      setShowSignupModal(false)
      setModalMode('signup')
      setLoginForm({ email: '', password: '' })
      navigate('/dashboard')
    } catch (err) {
      setLoginError('Invalid email or password')
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
 {/* Curved Side Bars */}
<div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 1,
  }}
>
  {/* Left curved sidebar */}
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      height: "100vh",
      width: "128px",
      transform: sidebarsVisible ? "translateY(0)" : "translateY(100%)",
      transition: "transform 1.4s cubic-bezier(0.4,0,0.2,1)",
    }}
  >
    <svg style={{ height: "100%", width: "100%" }} viewBox="0 0 128 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="
          M0,0
          L0,900
          Q64,450 128,900
          L128,0
          Z
        "
        fill="url(#leftGradient)"
      />
      <defs>
        <linearGradient id="leftGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(156,163,175,0.15)" />
          <stop offset="100%" stopColor="rgba(156,163,175,0)" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  {/* Right curved sidebar */}
  <div
    style={{
      position: "absolute",
      right: 0,
      top: 0,
      height: "100vh",
      width: "128px",
      transform: sidebarsVisible ? "translateY(0)" : "translateY(100%)",
      transition: "transform 1.4s cubic-bezier(0.4,0,0.2,1)",
    }}
  >
    <svg style={{ height: "100%", width: "100%" }} viewBox="0 0 128 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="
          M128,0
          L128,900
          Q64,450 0,900
          L0,0
          Z
        "
        fill="url(#rightGradient)"
      />
      <defs>
        <linearGradient id="rightGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(156,163,175,0.15)" />
          <stop offset="100%" stopColor="rgba(156,163,175,0)" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</div>
      {/* Main Container - This ensures everything is centered */}
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "0 16px",
          paddingLeft: "100px",
          paddingRight: "100px",
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
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
              onClick={() => navigate("/")}
              tabIndex={0}
              role="button"
              aria-label="Go to home page"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/') }}
            >
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
          </div>
          <nav style={{ flex: 1, display: "flex", justifyContent: "center", gap: "32px" }}>
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
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowSignupModal(true)}
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
          </div>
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
              fontSize: "70px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "24px",
              lineHeight: 1.1,
              textAlign: "center",
              whiteSpace: "nowrap",
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
      {/* Signup/Login Modal */}
      {showSignupModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
          onClick={() => { setShowSignupModal(false); setModalMode('signup'); }}
        >
          <div
            style={{
              background: "#f7fafc",
              borderRadius: "32px",
              padding: "40px 32px 24px 32px",
              minWidth: "350px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowSignupModal(false); setModalMode('signup'); }}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#a0aec0",
              }}
              aria-label="Close"
            >
              ×
            </button>
            {/* Logo or icon */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>🔗</span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, textAlign: "center", color: "#2d3748" }}>
              {modalMode === 'signup' ? 'Create your account' : 'Sign in to your account'}
            </h2>
            {modalMode === 'signup' ? (
              <>
                <button
                  style={{
                    width: "100%",
                    background: "#475569",
                    color: "white",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "12px 0",
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                  }}
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20, height: 20 }} />
                  Continue with Google
                </button>
                <div style={{ width: "100%", borderBottom: "1px solid #e2e8f0", margin: "16px 0" }}></div>
                {/* Email signup form (not functional, just UI for now) */}
                <form style={{ width: "100%" }}>
                  <input
                    type="email"
                    placeholder="Your email"
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      marginBottom: 12,
                      borderRadius: "9999px",
                      border: "1px solid #e2e8f0",
                      background: "white",
                      fontSize: 16,
                      outline: "none",
                      marginTop: 0,
                      color: "black",
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Create a password"
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      marginBottom: 16,
                      borderRadius: "9999px",
                      border: "1px solid #e2e8f0",
                      background: "white",
                      fontSize: 16,
                      outline: "none",
                      color: "black",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      background: "#e2e8f0",
                      color: "#475569",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "12px 0",
                      fontSize: 16,
                      fontWeight: 500,
                      marginBottom: 16,
                      cursor: "pointer",
                    }}
                  >
                    Continue with email
                  </button>
                </form>
                <div style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginBottom: 8 }}>
                  <a href="#" style={{ color: "#475569", textDecoration: "underline" }} onClick={e => { e.preventDefault(); setModalMode('login'); }}>
                    Already have an account?
                  </a>
                </div>
                <div style={{ textAlign: "center", fontSize: 12, color: "#a0aec0" }}>
                  By signing up, you agree to the{" "}
                  <a href="#" style={{ color: "#475569", textDecoration: "underline" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" style={{ color: "#475569", textDecoration: "underline" }}>
                    Privacy Policy
                  </a>
                  .
                </div>
              </>
            ) : (
              <>
                <form style={{ width: "100%" }} onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      marginBottom: 12,
                      borderRadius: "9999px",
                      border: "1px solid #e2e8f0",
                      background: "white",
                      fontSize: 16,
                      outline: "none",
                      marginTop: 0,
                      color: "black",
                    }}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      marginBottom: 16,
                      borderRadius: "9999px",
                      border: "1px solid #e2e8f0",
                      background: "white",
                      fontSize: 16,
                      outline: "none",
                      color: "black",
                    }}
                  />
                  {loginError && <div style={{ color: "#dc2626", textAlign: "center", marginBottom: 8 }}>{loginError}</div>}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      background: "#e2e8f0",
                      color: "#475569",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "12px 0",
                      fontSize: 16,
                      fontWeight: 500,
                      marginBottom: 16,
                      cursor: "pointer",
                    }}
                  >
                    Sign in
                  </button>
                </form>
                <div style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginBottom: 8 }}>
                  <a href="#" style={{ color: "#475569", textDecoration: "underline" }} onClick={e => { e.preventDefault(); setModalMode('signup'); }}>
                    Don't have an account? Sign up
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
