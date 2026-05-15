import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductsLogic } from "./Logic/ProductsLogic";
import { X, Save, Image as ImageIcon } from "lucide-react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit3,
  ArrowUpRight,
  Package,
  AlertTriangle,
  DollarSign,
  Barcode,
} from "lucide-react";

const fmt = (n) => Number(n).toLocaleString("uz-UZ") + " so'm";

export default function Products() {
  const {
    products,
    search,
    setSearch,
    filter,
    setFilter,
    deleteProduct,
    totalStock,
    totalValue,
  } = useProductsLogic();
  const { isModalOpen, setIsModalOpen, addProduct } = useProductsLogic();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-700">
      {/* --- Верхняя панель статистики --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Package className="text-blue-600" />}
          label="Jami mahsulotlar"
          value={products.length}
          color="bg-blue-50"
        />
        <StatCard
          icon={<AlertTriangle className="text-orange-500" />}
          label="Kam qolganlar"
          value={products.filter((p) => p.stock < 20).length}
          color="bg-orange-50"
        />
        <StatCard
          icon={<DollarSign className="text-emerald-500" />}
          label="Ombor qiymati"
          value={fmt(totalValue)}
          color="bg-emerald-50"
        />
      </div>

      {/* --- Фильтры и поиск --- */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Nomi yoki shtrix-kodi bo'yicha..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all ${filter === "all" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"}`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter("low_stock")}
            className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all ${filter === "low_stock" ? "bg-white shadow-sm text-orange-600" : "text-slate-500"}`}
          >
            Kam qolganlar
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-slate-800">
            Sklad Boshqaruvi
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            <Plus size={20} /> Yangi mahsulot
          </button>
        </div>
      </div>

      {/* --- Таблица товаров --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[13px] uppercase tracking-wider">
              <th className="px-8 py-5 font-bold">Mahsulot</th>
              <th className="px-6 py-5 font-bold">Shtrix-kod</th>
              <th className="px-6 py-5 font-bold">Narxi</th>
              <th className="px-6 py-5 font-bold">Ombor</th>
              <th className="px-6 py-5 font-bold text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence>
              {products.map((p) => (
                <motion.tr
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={p.id}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {p.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{p.name}</div>
                        <div className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
                          {p.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-sm">
                      <Barcode size={14} className="opacity-40" />
                      {p.barcode}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-700">
                      {fmt(p.price)}
                    </div>
                    <div className="text-[10px] text-slate-400 tracking-wide">
                      Tannarxi: {fmt(p.cost)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${p.stock < 20 ? "bg-orange-500 animate-pulse" : "bg-emerald-500"}`}
                      />
                      <span
                        className={`font-bold ${p.stock < 20 ? "text-orange-600" : "text-slate-600"}`}
                      >
                        {p.stock} dona
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-indigo-600 transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
              <Search size={40} />
            </div>
            <p className="text-slate-400 font-medium">
              Mahsulotlar topilmadi...
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-slate-800">
                    Yangi mahsulot
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.target);
                    addProduct(Object.fromEntries(fd));
                  }}
                  className="space-y-4"
                >
                  {/* Emoji & Name */}
                  <div className="flex gap-4">
                    <div className="w-24">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Emoji
                      </label>
                      <input
                        name="emoji"
                        defaultValue="📦"
                        className="w-full mt-1 bg-slate-50 border-none rounded-2xl py-3 text-center text-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Nomi
                      </label>
                      <input
                        name="name"
                        required
                        placeholder="Masalan: Pepsi 0.5L"
                        className="w-full mt-1 bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Category & Barcode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Kategoriya
                      </label>
                      <select
                        name="category"
                        className="w-full mt-1 bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      >
                        <option value="ichimlik">Ichimlik</option>
                        <option value="non">Non</option>
                        <option value="sut">Sut</option>
                        <option value="shirin">Shirin</option>
                        <option value="zarur">Zarur</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Shtrix-kod
                      </label>
                      <input
                        name="barcode"
                        placeholder="000000"
                        className="w-full mt-1 bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Prices */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Tannarxi
                      </label>
                      <input
                        name="cost"
                        type="number"
                        required
                        placeholder="0"
                        className="w-full mt-1 bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                        Sotish narxi
                      </label>
                      <input
                        name="price"
                        type="number"
                        required
                        placeholder="0"
                        className="w-full mt-1 bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                      Soni (Sklad)
                    </label>
                    <input
                      name="stock"
                      type="number"
                      required
                      placeholder="0"
                      className="w-full mt-1 bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-slate-700"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-[1.5rem] font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Save size={20} /> Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StatCard = ({ icon, label, value, color }) => (
  <div
    className={`p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]`}
  >
    <div
      className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}
    >
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <h3 className="text-xl font-black text-slate-800 tracking-tight">
        {value}
      </h3>
    </div>
  </div>
);
