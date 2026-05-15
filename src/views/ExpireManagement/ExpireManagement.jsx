import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExpireLogic } from "./ExpireLogic";
import {
  Search,
  AlertCircle,
  Calendar,
  Trash2,
  Tag,
  ChevronRight,
  Filter,
  ArrowLeft,
  MoreVertical,
} from "lucide-react";

const colorCfg = {
  red: {
    bg: "bg-red-50",
    border: "border-red-100",
    text: "text-red-600",
    accent: "bg-red-500",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-600",
    accent: "bg-orange-500",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-600",
    accent: "bg-amber-500",
  },
  green: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
    accent: "bg-emerald-500",
  },
};

export default function ExpireManagement() {
  const { search, setSearch, filter, setFilter, filteredItems, stats } =
    useExpireLogic();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-10">
      {/* ── TOP NAV / HEADER ── */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              Inventory Control
            </span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              Expiration <span className="text-blue-500">Tracker</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="FIND SKU..."
                className="w-full bg-slate-100 border-none rounded-2xl pl-12 pr-4 py-3 text-[10px] font-black tracking-widest focus:ring-2 ring-blue-500/20 transition-all"
              />
            </div>
            <button className="md:hidden p-3 bg-slate-100 rounded-2xl">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* ── QUICK STATS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Critical",
              val: stats.critical,
              color: "red",
              icon: <AlertCircle size={14} />,
            },
            {
              label: "Warning",
              val: stats.warning,
              color: "orange",
              icon: <Calendar size={14} />,
            },
            {
              label: "Loss Risk",
              val: stats.totalLoss.toLocaleString() + " s.",
              color: "amber",
              icon: <Tag size={14} />,
            },
            {
              label: "Checked SKU",
              val: "100%",
              color: "green",
              icon: <ArrowLeft className="rotate-90" size={14} />,
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 md:p-6 rounded-[32px] border ${colorCfg[s.color].bg} ${colorCfg[s.color].border}`}
            >
              <div
                className={`w-8 h-8 rounded-xl ${colorCfg[s.color].accent} text-white flex items-center justify-center mb-3 shadow-lg shadow-current/10`}
              >
                {s.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                {s.label}
              </span>
              <div className="text-xl font-black tracking-tighter">{s.val}</div>
            </motion.div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {["all", "red", "orange", "green"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-slate-900 text-white shadow-xl"
                  : "bg-white text-slate-400 border border-slate-100"
              }`}
            >
              {f === "all" ? "All Items" : `${f} priority`}
            </button>
          ))}
        </div>

        {/* ── DATA LIST ── */}
        <div className="bg-white md:bg-white/80 md:backdrop-blur-sm rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
          {/* DESKTOP TABLE HEADER */}
          <div className="hidden md:grid grid-cols-6 gap-4 p-8 border-b border-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <div className="col-span-2">Product Information</div>
            <div>Expiry Date</div>
            <div>Remaining</div>
            <div>Stock / Value</div>
            <div className="text-right">Action</div>
          </div>

          <div className="divide-y divide-slate-50">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* MOBILE & DESKTOP WRAPPER */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-6 md:p-8 items-center">
                    {/* INFO */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-3xl flex items-center justify-center text-3xl shadow-sm ${colorCfg[item.status.color].bg}`}
                      >
                        {item.emoji}
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-tight">
                          {item.name}
                        </h3>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    {/* EXP DATE */}
                    <div className="flex md:block items-center justify-between">
                      <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Expire Date
                      </span>
                      <div className="text-xs font-black font-mono bg-slate-100 px-3 py-1 rounded-lg md:inline-block">
                        {item.expireDate}
                      </div>
                    </div>

                    {/* STATUS BADGE */}
                    <div className="flex md:block items-center justify-between">
                      <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Status
                      </span>
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl w-fit ${colorCfg[item.status.color].bg} ${colorCfg[item.status.color].text}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${colorCfg[item.status.color].accent} ${item.status.color === "red" ? "animate-pulse" : ""}`}
                        />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          {item.status.label}
                        </span>
                      </div>
                    </div>

                    {/* STOCK */}
                    <div className="flex md:block items-center justify-between">
                      <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Inventory
                      </span>
                      <div className="text-sm font-black text-slate-900">
                        {item.stock}{" "}
                        <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">
                          Units
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-end gap-2 pt-4 md:pt-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 md:flex-none bg-slate-900 text-white px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                        <Tag size={12} /> Discount
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                      <button className="md:hidden p-3 bg-slate-100 rounded-2xl">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ── MOBILE ADD BUTTON ── */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-500 text-white rounded-[24px] shadow-2xl flex items-center justify-center z-40 md:hidden"
      >
        <Calendar size={24} />
      </motion.button>
    </div>
  );
}
