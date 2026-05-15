import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSuppliersLogic } from "./Logic/SuppliearsLogic";
import {
  UserPlus,
  Phone,
  Globe,
  Star,
  Search,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Clock,
  Wallet,
  Truck,
  X,
  Save,
} from "lucide-react";

const fmt = (n) => Number(n).toLocaleString("uz-UZ") + " so'm";

export default function Suppliers() {
  const {
    suppliers,
    searchTerm,
    setSearchTerm,
    totals,
    isModalOpen,
    setIsModalOpen,
    addSupplier,
  } = useSuppliersLogic();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-700">
      {/* --- Top Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <HeaderCard
          icon={<Truck className="text-indigo-600" />}
          label="Yetkazib beruvchilar"
          value={totals.totalSuppliers}
          color="bg-indigo-50"
        />
        <HeaderCard
          icon={<CheckCircle2 className="text-emerald-500" />}
          label="Faol hamkorlar"
          value={totals.activePartners}
          color="bg-emerald-50"
        />
        <HeaderCard
          icon={<Wallet className="text-red-500" />}
          label="Umumiy qarz"
          value={fmt(totals.totalDebt)}
          color="bg-red-50"
        />
      </div>

      {/* --- Controls --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Hamkor nomi yoki kategoriya..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
        >
          <UserPlus size={20} /> Hamkor qo'shish
        </button>
      </div>

      {/* --- Suppliers List --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {suppliers.map((s) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={s.id}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center text-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">
                      {s.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-tighter">
                      {s.category}
                    </p>
                  </div>
                </div>
                <StatusBadge status={s.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Aloqa
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <Phone size={14} className="text-indigo-500" /> {s.contact}
                  </div>
                </div>
                <div
                  className={`p-4 rounded-2xl ${s.balance < 0 ? "bg-red-50" : "bg-emerald-50"}`}
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Balans
                  </p>
                  <div
                    className={`text-sm font-black ${s.balance < 0 ? "text-red-600" : "text-emerald-600"}`}
                  >
                    {s.balance === 0 ? "Hisob-kitob qilingan" : fmt(s.balance)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-black text-slate-700">
                    {s.rating}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">
                    (24 sharh)
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                    Tarix
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                    <MoreHorizontal size={18} className="text-slate-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- Add Supplier Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">Yangi hamkor</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  addSupplier(Object.fromEntries(fd));
                }}
                className="space-y-4"
              >
                <InputGroup label="Kompaniya nomi" name="name" required />
                <InputGroup
                  label="Kategoriya"
                  name="category"
                  placeholder="Masalan: Ichimliklar"
                  required
                />
                <InputGroup
                  label="Telefon raqami"
                  name="contact"
                  placeholder="+998"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  Saqlash
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const HeaderCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
    <div
      className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}
    >
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <h3 className="text-xl font-black text-slate-800 tracking-tight">
        {value}
      </h3>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const cfg = {
    active: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      icon: <CheckCircle2 size={12} />,
      label: "Faol",
    },
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      icon: <Clock size={12} />,
      label: "Kutilmoqda",
    },
    inactive: {
      bg: "bg-slate-100",
      text: "text-slate-500",
      icon: <AlertCircle size={12} />,
      label: "Nofaol",
    },
  };
  const current = cfg[status];
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase ${current.bg} ${current.text}`}
    >
      {current.icon} {current.label}
    </div>
  );
};

const InputGroup = ({ label, ...props }) => (
  <div>
    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-medium"
    />
  </div>
);
