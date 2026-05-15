import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useSalesStatsLogic } from "./Logic/SalesStatsLogic";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ShoppingBag,
} from "lucide-react";

// Кастомный Тултип в стиле Dashboard
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
          {payload[0].payload.name}
        </p>
        <p className="text-sm font-black text-white">
          {payload[0].value.toLocaleString()} so'm
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesStats() {
  const { timeRange, setTimeRange, stats, mainChartData, categoryData } =
    useSalesStatsLogic();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-10">
      {/* ── HEADER ── */}
      <header className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Financial Hub
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tighter mt-1 italic">
            Sales <span className="text-blue-500">Insights</span>
          </h1>
        </div>

        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          {["24H", "7D", "30D"].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${timeRange === r ? "bg-blue-500 text-white shadow-lg" : "text-slate-400"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 md:px-10 space-y-6">
        {/* ── TOP STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[35px] border border-slate-100 flex justify-between items-center"
            >
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {s.label}
                </span>
                <div className="text-xl font-black tracking-tighter mt-1">
                  {s.value.toLocaleString()}
                </div>
              </div>
              <div
                className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${s.trend.startsWith("+") ? "bg-emerald-50 text-emerald-500" : "bg-orange-50 text-orange-500"}`}
              >
                {s.trend}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── MAIN CHART ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest">
                Revenue Flow
              </h3>
              <Download
                size={16}
                className="text-slate-300 cursor-pointer hover:text-blue-500 transition-colors"
              />
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mainChartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900, fill: "#94a3b8" }}
                    dy={15}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── PIE CHART (CATEGORIES) ── */}
          <div className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 self-start">
              Category Share
            </h3>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RECENT LOGS ── */}
        <div className="bg-slate-900 rounded-[45px] p-8 text-white">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-widest">
                Live Orders
              </h3>
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Updated 1s ago
            </span>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-tight">
                      Order #8829{i}
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">
                      Mobile POS • 14:0{i}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black">128,000 so'm</div>
                  <ArrowUpRight
                    size={14}
                    className="text-emerald-500 ml-auto mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
