import React, { useState, useEffect, useRef, Suspense } from "react";
import Spline from "@splinetool/react-spline";

// Form Section 87
// Form Logic  import "./AuthLogic";

export default function LoginView({
  username = "",
  setUsername = () => {},
  password = "",
  setPassword = () => {},
  handleLogin = (e) => e.preventDefault(),
  error = false,
}) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    //Paralax Effect
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    //Paralax Effect
    const el = panelRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1100px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
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

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#050505] font-sans">
      <div className="right-205 absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
          <Spline scene="https://prod.spline.design/mo40pGz9xiSNMIk3/scene.splinecode" />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-transparent via-[#050505]/50 to-[#050505]" />
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-20 flex justify-end items-center">
        <div
          className={`w-full max-w-[460px] transition-all duration-[950ms] ease-out ${mounted ? "opacity-100 translate-x-0 blur-none" : "opacity-0 translate-x-14 blur-md"}`}
        >
          <div
            ref={panelRef}
            className="relative rounded-[40px] p-12 bg-[#080808]/85 border border-white/[0.06] backdrop-blur-[56px] shadow-[0_80px_160px_rgba(0,0,0,0.92),0_0_120px_rgba(37,99,235,0.07),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-500 ease-out"
          >
            <div className="absolute inset-0 rounded-[40px] overflow-hidden opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_25%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-[18px] left-[18px] w-[18px] h-[18px] border-t border-l border-blue-600/30 rounded-tl-[5px]" />
            <div className="absolute top-[18px] right-[18px] w-[18px] h-[18px] border-t border-r border-blue-600/30 rounded-tr-[5px]" />
            <div className="absolute bottom-[18px] left-[18px] w-[18px] h-[18px] border-b border-l border-blue-600/30 rounded-bl-[5px]" />
            <div className="absolute bottom-[18px] right-[18px] w-[18px] h-[18px] border-b border-r border-blue-600/30 rounded-br-[5px]" />
            <div className="animate-blob pointer-events-none absolute -top-24 -right-16 w-[380px] h-[380px] rounded-full bg-blue-600/10 blur-[70px]" />
            <div className="animate-blob pointer-events-none absolute -bottom-10 left-8 w-[260px] h-[260px] rounded-full bg-sky-400/8 blur-[60px]" />
            <div className="relative z-10 flex flex-col gap-9">
              <header className="flex flex-col gap-3">
                <div
                  className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  <div className="animate-badge-glow inline-flex items-center gap-2 rounded-full px-3 py-1 border border-blue-600/30 w-fit">
                    <div className="animate-pulse w-[5px] h-[5px] rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                    <span className="font-mono text-[15px] tracking-[0.42em] uppercase text-sky-400/85">
                      Authorized Only
                    </span>
                  </div>
                </div>
                <div
                  className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  <h1 className="text-white text-[88px] leading-none tracking-[-0.04em] font-extrabold select-none">
                    CRM
                  </h1>
                </div>
              </header>
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div
                  className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  <label className="block font-mono text-[16px] tracking-[0.38em] uppercase mb-2.5 ml-1 text-white/30">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter identity"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-[18px] px-6 py-[18px] bg-white/[0.025] border border-white/[0.07] text-white text-[20px] font-mono font-light tracking-wide placeholder:text-white/15 focus:border-blue-500/50 focus:bg-white/[0.042] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.09)] focus:outline-none transition-all duration-300 caret-sky-400"
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-[420ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  <label className="block font-mono text-[16px] tracking-[0.38em] uppercase mb-2.5 ml-1 text-white/30">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-[18px] px-6 py-[18px] bg-white/[0.025] border border-white/[0.07] text-white text-[20px] font-mono font-light tracking-wide placeholder:text-white/15 focus:border-blue-500/50 focus:bg-white/[0.042] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.09)] focus:outline-none transition-all duration-300 caret-sky-400"
                  />
                </div>
                {error && (
                  <div className="animate-shake rounded-2xl px-5 py-3.5 text-center bg-red-500/[0.06] border border-red-500/[0.14]">
                    <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-red-500">
                      Verification Failed — Access Denied
                    </span>
                  </div>
                )}
                <div
                  className={`transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-[20px] py-[19px] bg-white text-[#050505] font-extrabold text-[11px] tracking-[0.38em] uppercase transition-all duration-300 hover:text-white hover:shadow-[0_0_60px_rgba(37,99,235,0.32),0_20px_40px_rgba(0,0,0,0.5)] active:scale-[0.97]"
                  >
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-blue-600 to-sky-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10">Initialize Session</span>
                  </button>
                </div>
              </form>
              <div
                className={`transition-all duration-700 delay-[620ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <div className="animate-pulse-line h-px rounded-full bg-gradient-to-r from-transparent via-blue-600/45 to-transparent" />
              </div>
              <div
                className={`transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <div className="flex justify-between">
                  <span className="font-mono text-[15px] tracking-[0.3em] uppercase text-white/50">
                    Secure Layer 4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
