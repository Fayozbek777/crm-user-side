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
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useReportLogic } from "./Logic/ReportLogic";
import {
  TrendingUp,
  ShoppingBag,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Activity,
  Zap,
} from "lucide-react";

const fmt = (n) => Number(n).toLocaleString("uz-UZ") + " so'm";

export default function Reports() {
  const { stats } = useReportLogic();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Analitika Markazi
          </h1>
          <p className="text-slate-400 mt-1 flex items-center gap-2 font-medium">
            <Calendar size={16} className="text-indigo-500" /> 10 May — 16 May,
            2026
          </p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
          <Download size={20} /> Hisobotni yuklash
        </button>
      </div>

      {/* --- Stat Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Haftalik Tushum"
          value={fmt(stats.totalSales)}
          change="+14%"
          icon={<Activity />}
          color="indigo"
        />
        <StatCard
          label="Sof Foyda"
          value={fmt(stats.totalProfit)}
          change="+8%"
          icon={<Zap />}
          color="emerald"
        />
        <StatCard
          label="Cheklar Soni"
          value={stats.totalOrders}
          change="+22"
          icon={<ShoppingBag />}
          color="blue"
        />
        <StatCard
          label="O'rtacha Chek"
          value={fmt(Math.round(stats.averageCheck))}
          change="-3%"
          icon={<CreditCard />}
          color="orange"
          isDown
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Area Chart (Sales Dynamics) --- */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800">
              Savdo dinamikasi
            </h3>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none">
              <option>Oxirgi 7 kun</option>
              <option>Oxirgi 30 kun</option>
            </select>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesData}>
                <defs>
                  <linearGradient id="colorTushum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    padding: "12px",
                  }}
                  formatter={(val) => [fmt(val), "Summa"]}
                />
                <Area
                  type="monotone"
                  dataKey="tushum"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorTushum)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Bar Chart (Top Categories/Products) --- */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-xl font-black text-slate-800 mb-2">
            Top Sotuvlar
          </h3>
          <p className="text-sm text-slate-400 mb-8 font-medium">
            Mahsulotlar kesimida
          </p>

          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.topProducts} layout="vertical" barGap={10}>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{ fill: "#475569", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="sold" radius={[0, 10, 10, 0]} barSize={24}>
                  {stats.topProducts.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-4">
            {stats.topProducts.slice(0, 3).map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl"
              >
                <span className="text-xs font-bold text-slate-600">
                  {p.name}
                </span>
                <span className="text-xs font-black text-indigo-600">
                  {p.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, change, icon, color, isDown }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
    >
      <div
        className={`w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300`}
      >
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">
        {label}
      </p>
      <h3 className="text-2xl font-black text-slate-800 tracking-tight">
        {value}
      </h3>
      <div
        className={`mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black ${isDown ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"}`}
      >
        {isDown ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
        {change}
      </div>
    </motion.div>
  );
};
