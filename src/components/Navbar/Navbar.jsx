import React, { useState, useEffect } from "react";
import { useNavLogic } from "./Logic/NavLogic";
import { ChevronDown, LogOut, User } from "lucide-react";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { getTitle, search, setSearch, toggleFullScreen, handleToggle } =
    useNavLogic(toggleSidebar, isSidebarOpen);

  const [user, setUser] = useState({ name: "Guest", role: "User" });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          className="p-3 bg-white/[0.03] hover:bg-white/10 border border-white/10 rounded-2xl transition-all group"
        >
          <div className="w-5 h-4 flex flex-col justify-between items-center">
            <span
              className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${isSidebarOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`}
            />
            <span
              className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${isSidebarOpen ? "opacity-0" : "w-3"}`}
            />
            <span
              className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${isSidebarOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`}
            />
          </div>
        </button>

        <h1 className="text-xl font-black tracking-tighter hidden sm:block uppercase italic">
          {getTitle()}
        </h1>
      </div>
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <input
          type="text"
          placeholder="Search core..."
          className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-2.5 px-5 text-sm focus:border-blue-500/50 outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button
          onClick={toggleFullScreen}
          className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 15v6h-6M3 9V3h6" />
          </svg>
        </button>
        <div className="relative">
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-4 border-l border-white/5 cursor-pointer group"
          >
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest leading-none">
                {user.role}
              </span>
              <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                {user.name}
              </span>
            </div>

            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-white/10 text-white font-black text-lg shadow-lg shadow-blue-900/20">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#050505] rounded-full p-0.5">
                <ChevronDown
                  size={12}
                  className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          </div>
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-4 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-2 z-[100] backdrop-blur-xl">
              <div className="h-px bg-white/5 my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-xl transition-all text-red-500"
              >
                <LogOut size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Log Out
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
