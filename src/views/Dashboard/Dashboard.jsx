import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardLogic } from "./Logic/DashboardLogic";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Sparkles,
  Camera,
  X,
  Zap,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ShoppingBag,
  Users,
  Package,
  AlertCircle,
  Clock,
  Activity,
  RefreshCw,
} from "lucide-react";

/* ── colour config per card ── */
const colorCfg = {
  blue: {
    card: "bg-blue-50 border-blue-100",
    icon: "bg-blue-600 shadow-blue-200",
    val: "text-blue-700",
    badge: "bg-blue-100 text-blue-600",
  },
  green: {
    card: "bg-emerald-50 border-emerald-100",
    icon: "bg-emerald-500 shadow-emerald-200",
    val: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-600",
  },
  yellow: {
    card: "bg-amber-50 border-amber-100",
    icon: "bg-amber-500 shadow-amber-200",
    val: "text-amber-700",
    badge: "bg-amber-100 text-amber-600",
  },
  red: {
    card: "bg-red-50 border-red-100",
    icon: "bg-red-500 shadow-red-200",
    val: "text-red-700",
    badge: "bg-red-100 text-red-600",
  },
  orange: {
    card: "bg-orange-50 border-orange-100",
    icon: "bg-orange-500 shadow-orange-200",
    val: "text-orange-700",
    badge: "bg-orange-100 text-orange-600",
  },
};

/* ── stagger fade-up wrapper ── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
    >
      {children}
    </div>
  );
};

/* ── custom recharts tooltip ── */
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-blue-100 rounded-2xl px-4 py-3 shadow-xl shadow-blue-100/50">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-blue-600 font-black text-sm">
        {Number(payload[0].value).toLocaleString()} so'm
      </p>
    </div>
  );
};

/* ── mini sparkline bar ── */
const MiniBar = ({ pct, color }) => (
  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${pct}%` }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      className={`h-full rounded-full ${color}`}
    />
  </div>
);

export default function Dashboard() {
  const {
    salesRange,
    setSalesRange,
    productRange,
    setProductRange,
    currentProducts,
    currentChartData,
    selectedCamera,
    setSelectedCamera,
    stats,
    alerts,
    inventory,
  } = useDashboardLogic();

  const allCards = [...stats, ...alerts];

  /* fake progress per stat */
  const progresses = [72, 58, 45, 23, 12];
  const progColors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-orange-500",
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 p-6 lg:p-8 space-y-6">
      {/* ── Page header ── */}
      <FadeUp delay={0}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              Dashboard
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">
              Bugun ·{" "}
              {new Date().toLocaleDateString("uz-UZ", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                Jonli
              </span>
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
              <RefreshCw size={15} />
            </button>
          </div>
        </div>
      </FadeUp>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {allCards.map((card, i) => {
          const c = colorCfg[card.color] || colorCfg.blue;
          return (
            <FadeUp key={card.id} delay={80 + i * 55}>
              <div
                className={`rounded-3xl p-5 border ${c.card} group hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-300 cursor-default`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl ${c.icon} shadow-md flex items-center justify-center mb-4 text-white group-hover:scale-105 transition-transform duration-300`}
                >
                  {card.icon}
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                  {card.title}
                </p>
                <p className={`text-2xl font-black tracking-tight ${c.val}`}>
                  {card.value}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <MiniBar pct={progresses[i]} color={progColors[i]} />
                  <span className={`text-[8px] font-black ${c.val}`}>
                    {progresses[i]}%
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 font-semibold mt-1.5 leading-tight">
                  {card.sub}
                </p>
              </div>
            </FadeUp>
          );
        })}
      </div>

      {/* ── Chart + Products ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area chart */}
        <FadeUp delay={380} className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <div className="flex justify-between items-start mb-7">
              <div>
                <h2 className="text-base font-black uppercase tracking-tight text-slate-900">
                  Sotuv Statistikasi
                </h2>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                  <Activity size={10} className="text-blue-500" /> Real vaqt ·
                  so'mda
                </p>
              </div>
              <select
                value={salesRange}
                onChange={(e) => setSalesRange(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-[10px] font-black outline-none cursor-pointer text-slate-700 hover:border-blue-300 focus:border-blue-400 transition-colors"
              >
                <option value="7 KUNLIK">7 KUNLIK</option>
                <option value="1 OY">1 OY</option>
                <option value="1 YIL">1 YIL</option>
                <option value="BARCHASI">BARCHASI</option>
              </select>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-3 gap-4 mb-7">
              {[
                { label: "Jami", val: "12.4M", color: "text-blue-600" },
                { label: "O'rtacha", val: "1.77M", color: "text-emerald-600" },
                { label: "Maksimal", val: "14.2M", color: "text-amber-600" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <p className={`text-base font-black ${s.color}`}>{s.val}</p>
                  <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={currentChartData}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    content={<ChartTip />}
                    cursor={{
                      stroke: "#3b82f6",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#gBlue)"
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#3b82f6",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeUp>

        {/* Top products */}
        <FadeUp delay={440}>
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-black uppercase tracking-tight text-slate-900">
                Top Mahsulot
              </h2>
              <select
                value={productRange}
                onChange={(e) => setProductRange(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-[10px] font-black outline-none cursor-pointer text-slate-700 hover:border-blue-300 transition-colors"
              >
                <option value="Bugun">Bugun</option>
                <option value="Kecha">Kecha</option>
                <option value="Otgan hafta">O'tgan hafta</option>
                <option value="Otgan oy">O'tgan oy</option>
              </select>
            </div>

            <div className="space-y-1">
              {currentProducts.map((p, i) => {
                const barW = Math.max(20, 100 - i * 16);
                return (
                  <div
                    key={i}
                    className="group p-3 rounded-2xl hover:bg-slate-50 transition-colors duration-200 cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black uppercase text-slate-800 truncate">
                          {p.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-semibold">
                          {p.qty}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black text-slate-700">
                          {p.price}
                        </span>
                        <Zap
                          size={10}
                          className="text-amber-500 fill-amber-400"
                        />
                      </div>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden ml-10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barW}%` }}
                        transition={{
                          delay: 0.5 + i * 0.08,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* AI Intellect */}
        <FadeUp delay={500} className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-200">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                    AI Intellect
                  </p>
                  <p className="text-[9px] text-blue-500 font-semibold">
                    3 tavsiya tayyor
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 rounded-full px-3 py-1">
                LIVE
              </span>
            </div>

            <div className="space-y-3">
              {/* Green */}
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl group hover:shadow-sm transition-all duration-200">
                <div className="w-7 h-7 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp size={13} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black text-emerald-800 leading-relaxed">
                    Cola mahsuloti juda tez sotilmoqda
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                    <span className="font-black">50 ta buyurtma</span> berish
                    tavsiya etiladi
                  </p>
                </div>
                <span className="text-[8px] font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg uppercase whitespace-nowrap">
                  +18%
                </span>
              </div>

              {/* Orange */}
              <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-2xl group hover:shadow-sm transition-all duration-200">
                <div className="w-7 h-7 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowUpRight size={13} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black text-orange-800 leading-relaxed">
                    Non mahsuloti soni kam qoldi
                  </p>
                  <p className="text-[10px] font-semibold text-orange-600 mt-0.5">
                    <span className="font-black">Buyurtma berish</span> unumang!
                  </p>
                </div>
                <span className="text-[8px] font-black text-orange-600 bg-orange-100 px-2 py-1 rounded-lg uppercase whitespace-nowrap">
                  Kam
                </span>
              </div>

              {/* Red */}
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl group hover:shadow-sm transition-all duration-200">
                <div className="w-7 h-7 rounded-xl bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingDown size={13} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black text-red-800 leading-relaxed">
                    Qurt mahsulotlar zarar keltirmoqda
                  </p>
                  <p className="text-[10px] font-semibold text-red-600 mt-0.5">
                    <span className="font-black">Kamroq olish</span> tavsiya
                    etiladi
                  </p>
                </div>
                <span className="text-[8px] font-black text-red-600 bg-red-100 px-2 py-1 rounded-lg uppercase whitespace-nowrap">
                  Xatar
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Inventory */}
        <FadeUp delay={560}>
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                Inventory Alert
              </h3>
              <span className="text-[8px] font-black text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                5 muammo
              </span>
            </div>
            <div className="space-y-3">
              {useDashboardLogic().inventory.map((inv, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${inv.status === "tugagan" ? "bg-red-500" : "bg-orange-400"}`}
                    />
                    <span className="text-[11px] font-black text-slate-700 uppercase">
                      {inv.name}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider
                    ${
                      inv.status === "tugagan"
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-orange-50 text-orange-600 border border-orange-100"
                    }`}
                  >
                    {inv.stock}
                  </span>
                </div>
              ))}
            </div>

            {/* Total alert bar */}
            <div className="mt-5 p-3 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
              <AlertCircle size={14} className="text-red-500 shrink-0" />
              <p className="text-[10px] font-semibold text-red-700">
                <span className="font-black">1 ta</span> mahsulot tugagan —
                darhol buyurtma bering
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Cameras */}
        <FadeUp delay={620}>
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <div className="flex justify-between items-center mb-5">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                  AI Kamera
                </p>
                <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                  4 ta kamera ulangan
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                  Live
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[1, 2, 3, 4].map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedCamera(id)}
                  className="aspect-video bg-slate-100 border border-slate-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 hover:shadow-md hover:shadow-blue-100 transition-all duration-200 flex flex-col items-center justify-center gap-1.5 group"
                >
                  <Camera
                    size={14}
                    className="text-slate-400 group-hover:text-blue-500 transition-colors"
                  />
                  <span className="text-[8px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-wider transition-colors">
                    CAM 0{id}
                  </span>
                </button>
              ))}
            </div>

            {/* Status row */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                <p className="text-[10px] font-black text-emerald-700">4/4</p>
                <p className="text-[8px] text-emerald-500 font-semibold uppercase">
                  Online
                </p>
              </div>
              <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-center">
                <p className="text-[10px] font-black text-blue-700">1080p</p>
                <p className="text-[8px] text-blue-500 font-semibold uppercase">
                  Sifat
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── Camera modal ── */}
      <AnimatePresence>
        {selectedCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setSelectedCamera(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-4xl bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    REC
                  </span>
                  <span className="text-[13px] font-black text-slate-900 uppercase tracking-widest">
                    CAM 0{selectedCamera}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCamera(null)}
                  className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-500 border border-slate-200 flex items-center justify-center text-slate-500 transition-all duration-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Video area */}
              <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                <Camera size={72} className="text-white/10 animate-pulse" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {[1, 2, 3, 4].map((id) => (
                    <button
                      key={id}
                      onClick={() => setSelectedCamera(id)}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-200
                        ${
                          selectedCamera === id
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                            : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                        }`}
                    >
                      CAM 0{id}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
