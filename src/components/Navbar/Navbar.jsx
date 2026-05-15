import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavLogic } from "./Logic/NavLogic";
import {
  Bell,
  Maximize2,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Moon,
  Sun,
  CheckCircle,
} from "lucide-react";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { getTitle, search, setSearch, toggleFullScreen, handleToggle } =
    useNavLogic(toggleSidebar, isSidebarOpen);

  const [user, setUser] = useState({ name: "Admin", role: "Superuser" });
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unread, setUnread] = useState(3);

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const close = () => {
    setProfileOpen(false);
    setNotifOpen(false);
  };

  const notifs = [
    {
      id: 1,
      title: "Cola zaxirasi tugayapti",
      sub: "23 ta mahsulot kam qoldi",
      time: "2 daq",
      color: "bg-red-500",
      read: false,
    },
    {
      id: 2,
      title: "Yangi buyurtma #1042",
      sub: "POS terminaldan kiritildi",
      time: "8 daq",
      color: "bg-blue-500",
      read: false,
    },
    {
      id: 3,
      title: "AI tavsiya tayyor",
      sub: "Sotuv +18% o'sdi bu hafta",
      time: "15 daq",
      color: "bg-emerald-500",
      read: false,
    },
    {
      id: 4,
      title: "Muddati o'tgan: Non 200g",
      sub: "Sotuvdan olib tashlash kerak",
      time: "1 soat",
      color: "bg-orange-500",
      read: true,
    },
  ];

  const unreadNotifs = notifs.filter((n) => !n.read);

  return (
    <div className="flex items-center justify-between w-full gap-4">
      {/* ── Left: burger + breadcrumb ── */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={handleToggle}
          className="p-2.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group"
        >
          <div className="w-5 h-[14px] flex flex-col justify-between">
            <span
              className={`h-[2px] bg-slate-700 rounded-full transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-[6px]" : "w-5"}`}
            />
            <span
              className={`h-[2px] bg-slate-700 rounded-full transition-all duration-200 ${isSidebarOpen ? "opacity-0 w-0" : "w-3"}`}
            />
            <span
              className={`h-[2px] bg-slate-700 rounded-full transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-[6px]" : "w-5"}`}
            />
          </div>
        </button>

        <div className="hidden sm:block">
          <motion.h1
            key={getTitle()}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[14px] font-black tracking-tight text-slate-900 uppercase leading-none"
          >
            {getTitle()}
          </motion.h1>
          <p className="text-[9px] font-semibold text-slate-400 tracking-widest uppercase mt-0.5">
            Kali Core · {new Date().toLocaleDateString("uz-UZ")}
          </p>
        </div>
      </div>

      {/* ── Centre: Search ── */}
      <div className="flex-1 max-w-xs hidden md:block">
        <div className="relative group">
          <Search
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2 pl-9 pr-4
              text-[12px] font-medium text-slate-700 placeholder:text-slate-400
              focus:border-blue-300 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]
              outline-none transition-all duration-200"
          />
          {search && (
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md">
              ESC
            </kbd>
          )}
        </div>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Fullscreen */}
        <button
          onClick={toggleFullScreen}
          className="p-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-500
            hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
          title="Fullscreen"
        >
          <Maximize2 size={14} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative p-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-500
              hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
          >
            <Bell size={14} />
            {unread > 0 && (
              <span
                className="absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-red-500
                text-white text-[8px] font-black flex items-center justify-center
                shadow-[0_0_8px_rgba(239,68,68,0.5)] border-2 border-white"
              >
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2.5 w-80 bg-white border border-slate-100
                  rounded-3xl shadow-2xl shadow-slate-200/80 z-[500] overflow-hidden"
              >
                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <div>
                    <p className="text-[12px] font-black text-slate-900 uppercase tracking-wide">
                      Bildirishnomalar
                    </p>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                      {unreadNotifs.length} o'qilmagan
                    </p>
                  </div>
                  <button
                    onClick={() => setUnread(0)}
                    className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1.5 rounded-xl transition-colors"
                  >
                    Barchasini o'qi
                  </button>
                </div>

                {/* list */}
                <div className="max-h-72 overflow-y-auto py-2">
                  {notifs.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer
                      ${n.read ? "opacity-50" : ""}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${n.color} mt-1.5 shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black text-slate-800 leading-snug">
                          {n.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">
                          {n.sub}
                        </p>
                      </div>
                      <span className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* footer */}
                <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
                  <button className="w-full text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors text-center">
                    Barcha bildirishnomalar →
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
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200 group"
          >
            {/* avatar */}
            <div
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700
              flex items-center justify-center text-white font-black text-sm
              shadow-md shadow-blue-200 border-2 border-white shrink-0"
            >
              {user.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[11px] font-black text-slate-800 leading-none">
                {user.name}
              </p>
              <p className="text-[9px] text-blue-600 font-black uppercase tracking-wider mt-0.5">
                {user.role}
              </p>
            </div>
            <ChevronDown
              size={12}
              className={`hidden lg:block text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2.5 w-56 bg-white border border-slate-100
                  rounded-3xl shadow-2xl shadow-slate-200/80 p-3 z-[500]"
              >
                {/* user card */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700
                    flex items-center justify-center text-white font-black shadow-sm"
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12px] font-black text-slate-900 leading-none">
                      {user.name}
                    </p>
                    <p className="text-[9px] text-blue-600 font-black uppercase tracking-wider mt-0.5">
                      {user.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[8px] text-emerald-600 font-semibold">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                {[
                  {
                    icon: Settings,
                    label: "Sozlamalar",
                    sub: "Tizim konfiguratsiyasi",
                    href: "/settings",
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-150 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                      <item.icon
                        size={13}
                        className="text-slate-500 group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-700">
                        {item.label}
                      </p>
                      <p className="text-[9px] text-slate-400">{item.sub}</p>
                    </div>
                  </a>
                ))}

                <div className="h-px bg-slate-100 my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl
                    hover:bg-red-50 border border-transparent hover:border-red-100
                    transition-all duration-150 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                    <LogOut size={13} className="text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-red-500 uppercase tracking-wide">
                      Chiqish
                    </p>
                    <p className="text-[9px] text-red-400">Sessiyani yopish</p>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
