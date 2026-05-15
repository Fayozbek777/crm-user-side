import React, { useState, useEffect, useRef, Suspense } from "react";
import Spline from "@splinetool/react-spline";

export default function LoginView({
  username = "",
  setUsername = () => {},
  password = "",
  setPassword = () => {},
  handleLogin = (e) => e.preventDefault(),
  error = false,
}) {
  const [mounted, setMounted] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const [focusedField, setFocused] = useState(null);
  const panelRef = useRef(null);

  /* mount trigger */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* parallax tilt */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1100px) rotateY(${dx * 5}deg) rotateX(${-dy * 3.5}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* reusable stagger class */
  const reveal = (delay) =>
    `transition-all duration-700 ease-out ${delay} ${mounted ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-6 blur-sm"}`;

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-white font-sans">
      {/* ── Colour wash blobs ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-100 blur-[100px] opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-emerald-100 blur-[90px] opacity-50" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-50 blur-[120px] opacity-70" />

      {/* ── Dot grid ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(99,102,241,0.15)_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* ── Spline (left side) ── */}
      <div className="absolute right-205 inset-0 z-0 pointer-events-none hidden lg:block">
        <Suspense fallback={null}>
          <Spline scene="https://prod.spline.design/mo40pGz9xiSNMIk3/scene.splinecode" />
        </Suspense>
      </div>

      {/* ── Light gradient veil so panel reads cleanly ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/10 via-white/30 to-white/95" />

      {/* ── Layout ── */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-24 flex justify-end items-center min-h-screen py-12">
        {/* Panel slide-in */}
        <div
          className={`w-full max-w-[460px] transition-all duration-[1000ms] ease-out
            ${mounted ? "opacity-100 translate-x-0 blur-none" : "opacity-0 translate-x-16 blur-md"}`}
        >
          {/* Glass card */}
          <div
            ref={panelRef}
            className="relative rounded-[44px] p-12 bg-white/80 border border-slate-200/80
              shadow-[0_40px_80px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.9)_inset]
              backdrop-blur-2xl transition-[transform,box-shadow] duration-500 ease-out
              hover:shadow-[0_60px_120px_rgba(37,99,235,0.12),0_0_0_1px_rgba(255,255,255,0.9)_inset]"
          >
            {/* Corner brackets */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-blue-400/40 rounded-tl-[8px]" />
            <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-blue-400/40 rounded-tr-[8px]" />
            <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-blue-400/40 rounded-bl-[8px]" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-blue-400/40 rounded-br-[8px]" />

            {/* Soft inner glow blobs */}
            <div className="pointer-events-none absolute -top-20 -right-12 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 w-52 h-52 rounded-full bg-emerald-200/25 blur-2xl" />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col gap-8">
              {/* Badge */}
              <div className={reveal("delay-100")}>
                <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 bg-blue-50 border border-blue-200 w-fit shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-blue-600 font-semibold">
                    Authorized Only
                  </span>
                </div>
              </div>

              {/* Wordmark */}
              <div className={reveal("delay-200")}>
                <h1
                  className="text-slate-900 font-black leading-none tracking-[-0.04em] select-none"
                  style={{ fontSize: "clamp(64px,10vw,88px)" }}
                >
                  CRM
                </h1>
                <p className="text-slate-400 text-[11px] font-semibold tracking-widest uppercase mt-2">
                  Kali Core System · v4.0
                </p>
              </div>

              {/* Divider */}
              <div className={reveal("delay-300")}>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                {/* Username */}
                <div className={reveal("delay-[340ms]")}>
                  <label className="block font-mono text-[9px] tracking-[0.4em] uppercase mb-2.5 ml-1 text-slate-400 font-semibold">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter identity"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocused("user")}
                      onBlur={() => setFocused(null)}
                      className="w-full rounded-[18px] px-5 py-[16px] bg-slate-50 border border-slate-200
                        text-slate-900 text-[13px] font-mono font-medium tracking-wide
                        placeholder:text-slate-300
                        focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]
                        focus:outline-none transition-all duration-300 caret-blue-500"
                    />
                    {/* Animated bottom line */}
                    <div
                      className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-sky-400
                      transition-all duration-500 ease-out origin-left
                      ${focusedField === "user" ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className={reveal("delay-[430ms]")}>
                  <label className="block font-mono text-[9px] tracking-[0.4em] uppercase mb-2.5 ml-1 text-slate-400 font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={pwVisible ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("pass")}
                      onBlur={() => setFocused(null)}
                      className="w-full rounded-[18px] px-5 py-[16px] pr-14 bg-slate-50 border border-slate-200
                        text-slate-900 text-[13px] font-mono font-medium tracking-wide
                        placeholder:text-slate-300
                        focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]
                        focus:outline-none transition-all duration-300 caret-blue-500"
                    />
                    {/* Show/hide toggle */}
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setPwVisible(!pwVisible)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors duration-200 p-1"
                    >
                      {pwVisible ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                    {/* Animated bottom line */}
                    <div
                      className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-sky-400
                      transition-all duration-500 ease-out origin-left
                      ${focusedField === "pass" ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-2xl px-5 py-3.5 text-center bg-red-50 border border-red-200 shadow-sm">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-red-500 font-semibold">
                        Verification Failed — Access Denied
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className={reveal("delay-[540ms]")}>
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-[20px] py-[18px]
                      bg-gradient-to-br from-blue-600 to-blue-700
                      text-white font-black text-[11px] tracking-[0.35em] uppercase
                      shadow-lg shadow-blue-200
                      hover:shadow-xl hover:shadow-blue-300/60 hover:from-blue-500 hover:to-blue-600
                      active:scale-[0.98] transition-all duration-300"
                  >
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    <span className="relative z-10">Initialize Session</span>
                  </button>
                </div>
              </form>

              {/* Bottom divider + footer */}
              <div className={reveal("delay-700")}>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5" />
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-400">
                    Secure Layer 4
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.7)]" />
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-emerald-600">
                      System Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
