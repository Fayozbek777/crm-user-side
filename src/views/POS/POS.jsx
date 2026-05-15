import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePOSLogic } from "./Logic/PosLogic";
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  CreditCard,
  Banknote,
  Smartphone,
  Zap,
  CheckCircle2,
  Receipt,
  Package,
  Scan,
  ChevronRight,
  Clock,
  User,
  Printer,
  ArrowLeft,
  BadgePercent,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

/* ── Вспомогательные функции оформления ── */
const fmt = (n) => Number(n).toLocaleString("uz-UZ") + " so'm";

const payIcons = {
  naqd: <Banknote size={20} />,
  karta: <CreditCard size={20} />,
  click: <Zap size={20} />,
  payme: <Smartphone size={20} />,
};

const colorCfg = {
  blue: {
    card: "bg-blue-50 border-blue-100",
    icon: "bg-blue-600",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  green: {
    card: "bg-emerald-50 border-emerald-100",
    icon: "bg-emerald-500",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    card: "bg-amber-50 border-amber-100",
    icon: "bg-amber-500",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
  },
  red: {
    card: "bg-red-50 border-red-100",
    icon: "bg-red-500",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700",
  },
  orange: {
    card: "bg-orange-50 border-orange-100",
    icon: "bg-orange-500",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-700",
  },
};

const categoryColors = {
  barchasi: "blue",
  ichimlik: "blue",
  non: "amber",
  sut: "green",
  shirin: "orange",
  zarur: "red",
};

export default function POS() {
  const logic = usePOSLogic();
  const {
    stage,
    setStage,
    notification,
    cart,
    products,
    activeCategory,
    setActiveCategory,
    categories,
    addToCart,
  } = logic;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 flex flex-col overflow-hidden">
      {/* --- Notification Toast --- */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border ${colorCfg[notification.color]?.card} ${colorCfg[notification.color]?.text} font-medium`}
          >
            <CheckCircle2 size={20} />
            {notification.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Header --- */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Package size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              SmartPOS
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} /> {new Date().toLocaleDateString("uz-UZ")} •
              Azizbek T.
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-12 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Mahsulot qidirish yoki shtrix-kod..."
            className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
            value={logic.search}
            onChange={(e) => logic.setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`p-2.5 rounded-xl transition-colors ${logic.barcodeMode ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
            onClick={() => logic.setBarcodeMode(!logic.barcodeMode)}
          >
            <Scan size={20} />
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-100 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
              <User size={18} />
            </div>
            <span className="text-sm font-semibold">Kassa #01</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* --- Catalog Section --- */}
        <section className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Categories */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-300 border ${
                  activeCategory === cat.key
                    ? "bg-white border-indigo-200 shadow-md text-indigo-600"
                    : "bg-transparent border-transparent text-slate-500 hover:bg-slate-200/50"
                }`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className="font-semibold text-sm">{cat.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-start">
            <AnimatePresence mode="popLayout">
              {products.map((p) => (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  onClick={() => addToCart(p)}
                  className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-full ${colorCfg[categoryColors[p.category]]?.icon}`}
                  />
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {p.emoji}
                  </div>
                  <h3 className="font-bold text-slate-800 line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-medium">
                    {p.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-bold">
                      {fmt(p.price)}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg text-slate-500">
                      Ombor: {p.stock}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* --- Cart Sidebar --- */}
        <aside className="w-[400px] bg-white border-l border-slate-200 flex flex-col shadow-2xl z-10">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-indigo-600" size={22} />
              <h2 className="font-bold text-lg">Savat</h2>
              <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {logic.itemCount}
              </span>
            </div>
            <button
              onClick={logic.clearCart}
              className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-300 italic"
                >
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p>Savat bo'sh</p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm border border-slate-100">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-indigo-600 font-medium">
                        {fmt(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
                      <button
                        onClick={() => logic.updateQty(item.id, -1)}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => logic.updateQty(item.id, 1)}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Totals & Actions */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Summa</span>
                <span>{fmt(logic.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-slate-500 text-sm">
                  <BadgePercent size={14} className="text-orange-500" />{" "}
                  Chegirma
                </span>
                <input
                  type="number"
                  value={logic.discount}
                  onChange={(e) => logic.setDiscount(e.target.value)}
                  className="w-16 bg-transparent text-right font-bold text-orange-600 outline-none"
                />
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-end">
                <span className="font-bold text-slate-800">Jami</span>
                <span className="text-2xl font-black text-indigo-600">
                  {fmt(logic.total)}
                </span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={() => setStage("pay")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              To'lovga o'tish <ChevronRight size={20} />
            </button>
          </div>
        </aside>
      </main>

      {/* --- Checkout Modal --- */}
      <AnimatePresence>
        {stage !== "pos" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex h-[600px]"
            >
              {stage === "pay" ? (
                <>
                  <div className="w-1/2 p-10 border-r border-slate-100 flex flex-col">
                    <button
                      onClick={() => setStage("pos")}
                      className="flex items-center gap-2 text-slate-400 hover:text-slate-800 mb-8 transition-colors"
                    >
                      <ArrowLeft size={20} /> Orqaga
                    </button>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">
                      To'lov
                    </h2>
                    <p className="text-slate-400 mb-8">
                      To'lov usulini tanlang va summani kiriting
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {logic.payMethods.map((m) => (
                        <button
                          key={m.key}
                          onClick={() => logic.setPayMethod(m.key)}
                          className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                            logic.payMethod === m.key
                              ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                              : "border-slate-100 hover:border-slate-200 text-slate-500"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${logic.payMethod === m.key ? "bg-indigo-600 text-white" : "bg-slate-100"}`}
                          >
                            {payIcons[m.key]}
                          </div>
                          <span className="font-bold">{m.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-auto bg-slate-50 p-6 rounded-3xl space-y-2">
                      <div className="flex justify-between text-slate-500">
                        <span>To'lanishi kerak:</span>
                        <span className="font-bold">{fmt(logic.total)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-black text-slate-800">
                        <span>Qaytim:</span>
                        <span className="text-emerald-500">
                          {fmt(logic.change)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2 bg-slate-50 p-10 flex flex-col">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
                      <div className="text-xs text-slate-400 uppercase font-bold mb-1">
                        Kiritilgan summa
                      </div>
                      <div className="text-4xl font-black text-slate-800 truncate">
                        {logic.cashInput || "0"}{" "}
                        <span className="text-lg text-slate-400 font-medium">
                          so'm
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 flex-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((btn) => (
                        <button
                          key={btn}
                          onClick={() => logic.numpadPress(btn)}
                          className="bg-white hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 transition-all rounded-2xl font-bold text-xl shadow-sm border border-slate-100 text-slate-600"
                        >
                          {btn}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={logic.processPayment}
                      className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-3"
                    >
                      Xaridni yakunlash <CheckCircle2 />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-black mb-2">
                    To'lov muvaffaqiyatli!
                  </h2>
                  <p className="text-slate-400 mb-8">
                    Xarid uchun rahmat. Chek tayyor.
                  </p>

                  <div className="w-full max-w-sm bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 mb-8 text-left">
                    <div className="flex justify-between mb-4">
                      <span className="font-bold">
                        # {logic.lastReceipt?.id}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {logic.lastReceipt?.date}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {logic.lastReceipt?.items.map((i) => (
                        <div
                          key={i.id}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {i.name} x{i.qty}
                          </span>
                          <span className="font-medium">
                            {fmt(i.price * i.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-200 pt-4 flex justify-between font-black text-lg">
                      <span>Jami:</span>
                      <span className="text-indigo-600">
                        {fmt(logic.lastReceipt?.total)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 w-full max-w-sm">
                    <button className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                      <Printer size={20} /> Chek
                    </button>
                    <button
                      onClick={logic.newSale}
                      className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold transition-transform hover:scale-105"
                    >
                      Yangi savdo
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
