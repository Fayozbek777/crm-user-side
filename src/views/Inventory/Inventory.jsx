import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInventoryLogic } from "./Logic/InvertoryLogic";
import {
  ClipboardCheck,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Search,
  RefreshCcw,
  Save,
  ArrowRightLeft,
  Layers,
} from "lucide-react";

const fmt = (n) => Number(n).toLocaleString("uz-UZ") + " so'm";

export default function Inventory() {
  const { items, updateActualStock, filter, setFilter, stats, submitAudit } =
    useInventoryLogic();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-700">
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ClipboardCheck size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Inventarizatsiya
            </h1>
            <p className="text-slate-400 font-medium">
              Ombor qoldiqlarini tekshirish
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <RefreshCcw size={18} /> Yangilash
          </button>
          <button
            onClick={submitAudit}
            className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
          >
            <Save size={18} /> Yakunlash
          </button>
        </div>
      </div>

      {/* --- Quick Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">
            Kamomad (Loss)
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-red-500">
              {fmt(stats.loss)}
            </h3>
            <TrendingDown className="text-red-200" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">
            Ortiqcha (Surplus)
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-emerald-500">
              {fmt(stats.surplus)}
            </h3>
            <TrendingUp className="text-emerald-200" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">
            Tekshirilayotgan pozitsiyalar
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-indigo-600">
              {stats.totalItems} ta
            </h3>
            <Layers className="text-indigo-100" size={32} />
          </div>
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="flex gap-2 mb-6 bg-slate-200/50 p-1 rounded-2xl w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${filter === "all" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
        >
          Barchasi
        </button>
        <button
          onClick={() => setFilter("discrepancy")}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${filter === "discrepancy" ? "bg-white text-red-500 shadow-sm" : "text-slate-500"}`}
        >
          Farq borlar
        </button>
      </div>

      {/* --- Inventory Table --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-[11px] uppercase font-black text-slate-400 tracking-widest">
              <th className="px-8 py-5">Mahsulot nomi</th>
              <th className="px-6 py-5">Tizimda (Stock)</th>
              <th className="px-6 py-5">Haqiqatda (Actual)</th>
              <th className="px-6 py-5">Farq (Diff)</th>
              <th className="px-6 py-5 text-right">Holat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                const diff = item.actualStock - item.systemStock;
                return (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={item.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-800">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-medium">
                        {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono font-bold text-slate-500">
                      {item.systemStock}
                    </td>
                    <td className="px-6 py-5">
                      <input
                        type="number"
                        value={item.actualStock}
                        onChange={(e) =>
                          updateActualStock(item.id, e.target.value)
                        }
                        className="w-20 bg-slate-100 border-none rounded-xl px-3 py-2 font-black text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div
                        className={`flex items-center gap-1 font-black ${diff === 0 ? "text-slate-300" : diff < 0 ? "text-red-500" : "text-emerald-500"}`}
                      >
                        {diff > 0 ? `+${diff}` : diff}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      {diff === 0 ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase">
                          <ClipboardCheck size={12} /> To'g'ri
                        </div>
                      ) : (
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${diff < 0 ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"}`}
                        >
                          <AlertCircle size={12} />{" "}
                          {diff < 0 ? "Kamomad" : "Ortiqcha"}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
