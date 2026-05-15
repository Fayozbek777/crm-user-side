import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePurchaseOrderLogic } from "./Logic/PurchaseOrderLogic";
import {
  Plus,
  Search,
  Truck,
  ChevronRight,
  MoreHorizontal,
  FileText,
  Calendar,
  PackageCheck,
  AlertCircle,
} from "lucide-react";

const colorCfg = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-100",
    dot: "bg-orange-500",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
    dot: "bg-red-500",
  },
};

export default function PurchaseOrders() {
  const { search, setSearch, activeTab, setActiveTab, filteredOrders, stats } =
    usePurchaseOrderLogic();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-10">
      {/* ── HEADER ── */}
      <header className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Supply Chain
          </span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-1">
            Purchase <span className="text-blue-500">Orders</span>
          </h1>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-blue-500 text-white px-8 py-4 rounded-3xl flex items-center gap-3 shadow-xl shadow-blue-500/20"
        >
          <Plus size={20} />
          <span className="text-[11px] font-black uppercase tracking-widest">
            New Order
          </span>
        </motion.button>
      </header>

      <main className="px-6 md:px-10">
        {/* ── TOP METRICS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center">
              <Truck size={32} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Outstanding Volume
              </span>
              <div className="text-2xl font-black tracking-tighter">
                {stats.totalOut.toLocaleString()} so'm
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center">
              <AlertCircle size={32} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Active Shipments
              </span>
              <div className="text-2xl font-black tracking-tighter">
                {stats.activeCount}{" "}
                <span className="text-slate-400 text-sm font-bold">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FILTERS & SEARCH ── */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH BY PROVIDER OR ID..."
              className="w-full bg-white border-none rounded-2xl pl-12 pr-6 py-4 text-[11px] font-black tracking-widest shadow-sm focus:ring-2 ring-blue-500/20 transition-all"
            />
          </div>
          <div className="flex gap-2 bg-slate-200/50 p-1.5 rounded-2xl">
            {["all", "pending", "received"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── ORDERS LIST ── */}
        <div className="bg-white/80 backdrop-blur-md rounded-[45px] border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Order ID
                  </th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Provider
                  </th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Total
                  </th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Status
                  </th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="wait">
                  {filteredOrders.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-3 font-black text-sm">
                          <FileText size={16} className="text-slate-300" />
                          {order.id}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-[11px] font-black uppercase tracking-tight">
                          {order.provider}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
                          {order.items} Products
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-black text-slate-900">
                          {order.total.toLocaleString()} so'm
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 mt-0.5">
                          {order.date}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl w-fit ${colorCfg[order.type].bg} ${colorCfg[order.type].text}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${colorCfg[order.type].dot} ${order.status === "pending" ? "animate-pulse" : ""}`}
                          />
                          <span className="text-[9px] font-black uppercase tracking-widest">
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-slate-300 hover:text-slate-900 transition-colors"
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-20 flex flex-col items-center opacity-20 grayscale">
              <PackageCheck size={64} className="mb-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                No matching orders found
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
