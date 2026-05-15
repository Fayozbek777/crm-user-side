import React from "react";
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
  ChevronDown,
  Sparkles,
  Camera,
  X,
  AlertCircle,
  Zap,
  Info,
} from "lucide-react";

const Dashboard = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 text-white bg-[#050505] min-h-screen"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-blue-600">
            Status
          </h1>
        </div>
      </div>

      {/* КАРТОЧКИ */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.concat(alerts).map((s) => (
          <div
            key={s.id}
            className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem]"
          >
            <div
              className={`mb-4 ${s.color === "red" ? "text-red-500" : "text-blue-500"}`}
            >
              {s.icon}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase">
              {s.title}
            </p>
            <h3
              className={`text-xl font-black ${s.color === "red" ? "text-red-500" : ""}`}
            >
              {s.value}
            </h3>
            <p className="text-[9px] text-slate-600 mt-2 font-bold uppercase">
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ГРАФИК (RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 bg-white/[0.01] border border-white/5 rounded-[3rem] min-h-[450px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black italic uppercase tracking-tighter">
              Sotuv statistikasi
            </h3>
            <select
              value={salesRange}
              onChange={(e) => setSalesRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[18px] font-black outline-none cursor-pointer"
            >
              <option value="7 KUNLIK">7 KUNLIK</option>
              <option value="1 OY">1 OY</option>
              <option value="1 YIL">1 YIL</option>
              <option value="BARCHASI">BARCHASI</option>
            </select>
          </div>

          {/* ФИКС: У контейнера должна быть высота в пикселях */}
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentChartData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff05"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#475569", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid #333",
                    borderRadius: "15px",
                  }}
                  itemStyle={{ color: "#2563eb", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorAmt)"
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[3rem]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black italic uppercase text-blue-500">
              Top {productRange}
            </h3>
            <select
              value={productRange}
              onChange={(e) => setProductRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[18px] font-black outline-none"
            >
              <option value="Bugun">Bugun</option>
              <option value="Kecha">Kecha</option>
              <option value="Otgan hafta">O'tgan hafta</option>
              <option value="Otgan oy">O'tgan oy</option>
            </select>
          </div>
          <div className="space-y-4">
            {currentProducts.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 hover:bg-white/5 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center font-black text-blue-500 italic">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[18] font-black uppercase italic">
                      {p.name}
                    </p>
                    <p className="text-[17px] text-slate-500 font-bold">
                      {p.qty} • {p.price}
                    </p>
                  </div>
                </div>
                <Zap size={14} className="text-yellow-500 fill-yellow-500/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI И КАМЕРЫ */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 p-8 border border-blue-500/20 bg-blue-600/[0.02] rounded-[3rem]">
          <div className="flex items-center gap-2 mb-6 text-blue-500 font-black text-xs tracking-widest uppercase">
            <Sparkles size={18} className="animate-pulse" /> AI Intellect
          </div>
          <div className="space-y-3 font-bold text-[17px]">
            <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-xl text-emerald-200">
              Cola mahsuloti juda tez sotilvotti. 50 ta buyurtma berish tavsiya
              etiladi.
            </div>
            <div className="p-4 bg-orange-500/10 border-l-4 border-orange-500 rounded-xl text-orange-200">
              Non mahsuloti soni kam qoldi. Buyurtma berish unumang!
            </div>
            <div className="p-4 bg-red-500/10 border-l-4 border-red-500 rounded-xl text-red-200 italic">
              Qurt mahsulotlar zarar keltirvotti, kamroq olish tavsiya etiladi.
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[3rem]">
          <h3 className="text-xs font-black uppercase mb-6 text-slate-500">
            Inventory Alert
          </h3>
          <div className="space-y-4 font-black text-[12px] uppercase">
            {inventory.map((inv, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-400">{inv.name}</span>
                <span className="text-red-500 px-2 py-1 bg-red-500/10 rounded-lg">
                  {inv.stock} {inv.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/[0.01] border border-white/5 rounded-[3rem]">
          <div className="flex justify-between items-center mb-15 uppercase font-black text-[18px]">
            AI Kamera{" "}
            <span className="text-red-500 animate-pulse ">● LIVE</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                onClick={() => setSelectedCamera(id)}
                className="aspect-video bg-black rounded-xl border border-white/10 cursor-pointer hover:border-blue-500 transition-all flex items-center justify-center"
              >
                <Camera size={22} className="text-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-10"
          >
            <button
              onClick={() => setSelectedCamera(null)}
              className="absolute top-10 right-10 text-white"
            >
              <X size={40} />
            </button>
            <div className="w-full max-w-5xl aspect-video bg-slate-900 rounded-[3rem] border border-white/10 flex items-center justify-center relative">
              <Camera size={100} className="text-white/5 animate-pulse" />
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <span className="bg-red-600 px-3 py-1 rounded text-xs font-black">
                  REC
                </span>
                <span className="uppercase font-black tracking-widest">
                  CAM 0{selectedCamera}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
