import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavLogic } from "./Logic/NavLogic";
import { LogOut, Bell, Maximize2, Search, ChevronDown } from "lucide-react";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { getTitle, search, setSearch, toggleFullScreen, handleToggle } =
    useNavLogic(toggleSidebar, isSidebarOpen);

  const [user, setUser] = useState({ name: "Admin", role: "Superuser" });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const notifications = [
    {
      id: 1,
      text: "Cola zaxirasi kam qoldi",
      time: "2 min",
      dot: "bg-red-500",
    },
    { id: 2, text: "Yangi buyurtma: #1042", time: "8 min", dot: "bg-blue-500" },
    {
      id: 3,
      text: "AI: Sotuv o'sdi +18%",
      time: "15 min",
      dot: "bg-emerald-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`flex items-center justify-between w-full px-1 transition-all duration-300 ${
        scrolled ? "drop-shadow-sm" : ""
      }`}
    >
      {/* ── Left: burger + title ── */}
      <div className="flex items-center gap-4">
        {/* Burger */}
        <button
          onClick={handleToggle}
          className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group"
        >
          <div className="w-5 h-3.5 flex flex-col justify-between">
            <span
              className={`h-[2px] bg-blue-600 rounded-full transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-[7px]" : "w-5"}`}
            />
            <span
              className={`h-[2px] bg-blue-600 rounded-full transition-all duration-200 ${isSidebarOpen ? "opacity-0 w-0" : "w-3"}`}
            />
            <span
              className={`h-[2px] bg-blue-600 rounded-full transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-[7px]" : "w-5"}`}
            />
          </div>
        </button>

        {/* Page title */}
        <div className="hidden sm:block">
          <motion.h1
            key={getTitle()}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[15px] font-black tracking-tight text-slate-900 uppercase"
          >
            {getTitle()}
          </motion.h1>
          <p className="text-[9px] font-semibold text-slate-400 tracking-widest uppercase">
            Kali Core System
          </p>
        </div>
      </div>

      {/* ── Centre: Search ── */}
      <div className="flex-1 max-w-sm mx-6 hidden md:block">
        <div className="relative group">
          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-[12px] font-medium text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-2">
        {/* Fullscreen */}
        <button
          onClick={toggleFullScreen}
          className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
        >
          <Maximize2 size={15} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
          >
            <Bell size={15} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-3 w-72 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/60 p-4 z-[200]"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                    Bildirishnomalar
                  </p>
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {notifications.length} yangi
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${n.dot} mt-1 shrink-0 shadow-sm`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                          {n.text}
                        </p>
                        <p className="text-[9px] text-slate-400 mt-0.5">
                          {n.time} oldin
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <button className="w-full text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">
                    Barchasini ko'rish →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 mx-1" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-3 pl-1 group"
          >
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[9px] text-blue-600 font-black uppercase tracking-widest leading-none">
                {user.role}
              </span>
              <span className="text-[12px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                {user.name}
              </span>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-200 border-2 border-white">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
                <ChevronDown
                  size={10}
                  className={`text-slate-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-3 w-52 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/60 p-3 z-[200]"
              >
                {/* User info */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 border border-blue-100 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12px] font-black text-slate-900">
                      {user.name}
                    </p>
                    <p className="text-[9px] text-blue-600 font-black uppercase tracking-wider">
                      {user.role}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 hover:border-red-100 border border-transparent transition-all duration-200 group"
                >
                  <LogOut size={14} className="text-red-500" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-red-500">
                    Log Out
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
