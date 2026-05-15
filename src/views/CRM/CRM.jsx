import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Star,
  MoreHorizontal,
  Search,
  Filter,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const pipelineStages = [
  {
    label: "Yangi",
    count: 12,
    color: "bg-blue-500",
    light: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
  },
  {
    label: "Aloqa",
    count: 8,
    color: "bg-sky-500",
    light: "bg-sky-50 border-sky-200",
    text: "text-sky-700",
  },
  {
    label: "Taklif",
    count: 5,
    color: "bg-amber-500",
    light: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
  },
  {
    label: "Muzokara",
    count: 3,
    color: "bg-orange-500",
    light: "bg-orange-50 border-orange-200",
    text: "text-orange-700",
  },
  {
    label: "Yopildi",
    count: 9,
    color: "bg-emerald-500",
    light: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
  },
];

const contacts = [
  {
    id: 1,
    name: "Alisher Umarov",
    role: "Direktor",
    company: "Mega Market",
    phone: "+998 90 123 45 67",
    email: "ali@mega.uz",
    status: "active",
    value: "12,500,000",
    stars: 5,
  },
  {
    id: 2,
    name: "Nilufar Rashidova",
    role: "Sotib oluvchi",
    company: "Fresh Store",
    phone: "+998 91 234 56 78",
    email: "nil@fresh.uz",
    status: "active",
    value: "8,200,000",
    stars: 4,
  },
  {
    id: 3,
    name: "Bobur Karimov",
    role: "Menejer",
    company: "City Bazar",
    phone: "+998 93 345 67 89",
    email: "bob@city.uz",
    status: "pending",
    value: "5,600,000",
    stars: 3,
  },
  {
    id: 4,
    name: "Zulfiya Tosheva",
    role: "Direktor o'rinbosari",
    company: "Smart Trade",
    phone: "+998 94 456 78 90",
    email: "zul@smart.uz",
    status: "inactive",
    value: "3,100,000",
    stars: 4,
  },
  {
    id: 5,
    name: "Jasur Nazarov",
    role: "Logistika boshlig'i",
    company: "Rapid Supply",
    phone: "+998 97 567 89 01",
    email: "jas@rapid.uz",
    status: "active",
    value: "9,800,000",
    stars: 5,
  },
];

const statusMap = {
  active: {
    label: "Faol",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending: {
    label: "Kutmoqda",
    cls: "bg-amber-50   text-amber-700   border-amber-200",
  },
  inactive: {
    label: "Nofaol",
    cls: "bg-slate-100  text-slate-500   border-slate-200",
  },
};

export default function CRM() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("contacts");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 min-h-screen bg-slate-50">
      {/* Header */}
      <FadeUp delay={0}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              CRM
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">
              Ishchilar munosabatlari boshqaruvi
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300/50 hover:-translate-y-0.5">
            <UserPlus size={14} />
            Yangi Ischi
          </button>
        </div>
      </FadeUp>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Jami Ishchilar",
            value: "247",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50 border-blue-100",
            iconBg: "bg-blue-600",
          },
          {
            label: "Faol bitimlar",
            value: "37",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
            iconBg: "bg-emerald-500",
          },
          {
            label: "Bu oy yopildi",
            value: "9",
            icon: CheckCircle,
            color: "text-sky-600",
            bg: "bg-sky-50 border-sky-100",
            iconBg: "bg-sky-500",
          },
          {
            label: "Bekor qilindi",
            value: "3",
            icon: XCircle,
            color: "text-red-600",
            bg: "bg-red-50 border-red-100",
            iconBg: "bg-red-500",
          },
        ].map((s, i) => (
          <FadeUp key={i} delay={0.06 + i * 0.05}>
            <div
              className={`rounded-3xl p-5 border ${s.bg} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default`}
            >
              <div
                className={`w-9 h-9 rounded-2xl ${s.iconBg} flex items-center justify-center text-white mb-3 shadow-sm`}
              >
                <s.icon size={16} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                {s.label}
              </p>
              <p
                className={`text-2xl font-black tracking-tight mt-1 ${s.color}`}
              >
                {s.value}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Contacts table */}
      <FadeUp delay={0.36}>
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          {/* toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 p-5 border-b border-slate-100">
            <div className="relative flex-1 max-w-xs">
              <Search
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Mijoz qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2 pl-9 pr-4
                  text-[12px] font-medium text-slate-700 placeholder:text-slate-400
                  focus:border-blue-300 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]
                  outline-none transition-all duration-200"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-slate-50 rounded-2xl text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
              <Filter size={13} />
              Filtr
            </button>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {[
                    "Ishchilar",
                    "Kompaniya",
                    "Kontakt",
                    "Holat",
                    "Qiymat",
                    "Reyting",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 text-[9px] font-black uppercase tracking-widest text-slate-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors group cursor-default"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[12px] font-black text-slate-800">
                            {c.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {c.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-slate-400" />
                        <span className="text-[11px] font-semibold text-slate-700">
                          {c.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Phone size={10} className="text-blue-500" />
                          <span className="text-[10px] text-slate-600">
                            {c.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail size={10} className="text-emerald-500" />
                          <span className="text-[10px] text-slate-500">
                            {c.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider border ${statusMap[c.status].cls}`}
                      >
                        {statusMap[c.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[12px] font-black text-slate-800">
                        {c.value}
                      </span>
                      <span className="text-[9px] text-slate-400 ml-1">
                        so'm
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, si) => (
                          <Star
                            key={si}
                            size={11}
                            className={
                              si < c.stars
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200 fill-slate-200"
                            }
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[10px] text-slate-400 font-semibold">
              {filtered.length} ta mijoz topildi
            </p>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded-xl text-[10px] font-black transition-all duration-150
                  ${p === 1 ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
