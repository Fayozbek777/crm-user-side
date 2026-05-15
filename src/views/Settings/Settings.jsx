import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettingsLogic } from "./Logic/SettingsLogic";
import {
  User,
  Bell,
  Lock,
  Palette,
  Link2,
  Camera,
  Save,
  CheckCircle2,
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  AlertTriangle,
  RefreshCw,
  Zap,
  Wifi,
  WifiOff,
  Sun,
  Moon,
  Layers,
  Activity,
  Key,
  LogOut,
  Trash2,
  Upload,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Video,
  Cpu,
  Database,
  Mail,
  Phone,
  Building2,
  Languages,
  Timer,
} from "lucide-react";

/* ── FadeUp stagger ── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* ── SlideIn from left ── */
const SlideIn = ({ children, delay = 0, className = "" }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* ── Toggle Switch ── */
const Toggle = ({ on, onToggle, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-500",
    red: "bg-red-500",
    amber: "bg-amber-500",
  };
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        on ? colors[color] : "bg-slate-200"
      }`}
    >
      <motion.div
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );
};

/* ── Section card ── */
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
  >
    {children}
  </div>
);

/* ── Row item ── */
const Row = ({ icon, label, sub, right, border = true }) => (
  <div
    className={`flex items-center justify-between py-4 ${
      border ? "border-b border-slate-50" : ""
    } group`}
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-200">
        {icon}
      </div>
      <div>
        <p className="text-[12px] font-black uppercase tracking-wide text-slate-800">
          {label}
        </p>
        {sub && (
          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
            {sub}
          </p>
        )}
      </div>
    </div>
    <div>{right}</div>
  </div>
);

/* ── Section icons map ── */
const sectionIcons = {
  profile: <User size={14} />,
  notifications: <Bell size={14} />,
  security: <Lock size={14} />,
  appearance: <Palette size={14} />,
  integrations: <Link2 size={14} />,
  cameras: <Camera size={14} />,
};

export default function Settings() {
  const {
    activeSection,
    setActiveSection,
    profile,
    setProfile,
    notifications,
    toggleNotification,
    twoFactor,
    setTwoFactor,
    sessionTimeout,
    setSessionTimeout,
    loginHistory,
    theme,
    setTheme,
    accent,
    setAccent,
    accentColors,
    density,
    setDensity,
    animations,
    setAnimations,
    integrations,
    toggleIntegration,
    cameraSettings,
    toggleCamera,
    sections,
    saved,
    handleSave,
  } = useSettingsLogic();

  const notifItems = [
    {
      key: "newOrder",
      label: "Yangi buyurtma",
      sub: "Har bir yangi buyurtmada xabar",
      icon: <Zap size={14} />,
    },
    {
      key: "lowStock",
      label: "Kam qoldiq",
      sub: "Mahsulot 10 tadan kam bo'lganda",
      icon: <AlertTriangle size={14} />,
    },
    {
      key: "dailyReport",
      label: "Kunlik hisobot",
      sub: "Har kuni soat 20:00 da",
      icon: <Activity size={14} />,
    },
    {
      key: "salesAlert",
      label: "Sotuv ogohlantirish",
      sub: "Maqsad 80% ga yetganda",
      icon: <Sparkles size={14} />,
    },
    {
      key: "cameraAlert",
      label: "Kamera harakati",
      sub: "Harakatlanish aniqlanganda",
      icon: <Camera size={14} />,
    },
    {
      key: "systemUpdate",
      label: "Tizim yangilanishi",
      sub: "Avtomatik yangilanishlar",
      icon: <RefreshCw size={14} />,
    },
    {
      key: "aiInsights",
      label: "AI Tavsiyalar",
      sub: "Intellekt tahlillar",
      icon: <Cpu size={14} />,
    },
    {
      key: "weeklyDigest",
      label: "Haftalik xulosa",
      sub: "Dushanba kuni yuboriladii",
      icon: <Database size={14} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 p-6 lg:p-8">
      {/* ── Header ── */}
      <FadeUp delay={0}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              Sozlamalar
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">
              Tizim konfiguratsiyasi · v2.4.1
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, x: 16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl"
                >
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                    Saqlandi!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors duration-200"
            >
              <Save size={13} />
              Saqlash
            </motion.button>
          </div>
        </div>
      </FadeUp>

      <div className="flex gap-6">
        {/* ── Sidebar Nav ── */}
        <FadeUp delay={60} className="shrink-0 w-56">
          <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm sticky top-6">
            <div className="space-y-1">
              {sections.map((sec, i) => (
                <SlideIn key={sec.id} delay={80 + i * 45}>
                  <button
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 group ${
                      activeSection === sec.id
                        ? "bg-blue-600 shadow-md shadow-blue-200"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all duration-200 ${
                        activeSection === sec.id
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }`}
                    >
                      {sectionIcons[sec.id]}
                    </div>
                    <span
                      className={`text-[11px] font-black uppercase tracking-wide transition-colors ${
                        activeSection === sec.id
                          ? "text-white"
                          : "text-slate-600 group-hover:text-blue-700"
                      }`}
                    >
                      {sec.label}
                    </span>
                    {activeSection === sec.id && (
                      <motion.div layoutId="nav-arrow" className="ml-auto">
                        <ChevronRight size={12} className="text-white/60" />
                      </motion.div>
                    )}
                  </button>
                </SlideIn>
              ))}
            </div>

            {/* Logout */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left hover:bg-red-50 transition-colors duration-200 group">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-400 group-hover:bg-red-100 transition-colors">
                  <LogOut size={14} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wide text-red-400 group-hover:text-red-600 transition-colors">
                  Chiqish
                </span>
              </button>
            </div>
          </div>
        </FadeUp>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {/* ════ PROFILE ════ */}
              {activeSection === "profile" && (
                <div className="space-y-6">
                  {/* Avatar card */}
                  <FadeUp delay={0}>
                    <Card>
                      <div className="flex items-center gap-6">
                        <div className="relative shrink-0">
                          <motion.div
                            whileHover={{ scale: 1.04 }}
                            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200"
                          >
                            {profile.avatar}
                          </motion.div>
                          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                            <Upload size={12} />
                          </button>
                        </div>
                        <div className="flex-1">
                          <p className="text-xl font-black text-slate-900">
                            {profile.name}
                          </p>
                          <span className="inline-block mt-1 px-3 py-1 bg-blue-50 border border-blue-100 rounded-xl text-[9px] font-black text-blue-600 uppercase tracking-widest">
                            {profile.role}
                          </span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
                          <Edit3 size={11} />
                          Tahrirlash
                        </button>
                      </div>
                    </Card>
                  </FadeUp>

                  {/* Profile fields */}
                  <FadeUp delay={80}>
                    <Card>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-5">
                        Shaxsiy Ma'lumotlar
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            label: "To'liq ism",
                            value: profile.name,
                            icon: <User size={13} />,
                            key: "name",
                          },
                          {
                            label: "Email",
                            value: profile.email,
                            icon: <Mail size={13} />,
                            key: "email",
                          },
                          {
                            label: "Telefon",
                            value: profile.phone,
                            icon: <Phone size={13} />,
                            key: "phone",
                          },
                          {
                            label: "Do'kon nomi",
                            value: profile.store,
                            icon: <Building2 size={13} />,
                            key: "store",
                          },
                          {
                            label: "Til",
                            value: profile.language,
                            icon: <Languages size={13} />,
                            key: "language",
                          },
                          {
                            label: "Vaqt zonasi",
                            value: profile.timezone,
                            icon: <Globe size={13} />,
                            key: "timezone",
                          },
                        ].map((field, i) => (
                          <motion.div
                            key={field.key}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                              <span className="text-slate-400">
                                {field.icon}
                              </span>
                              {field.label}
                            </label>
                            <input
                              defaultValue={field.value}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[12px] font-bold text-slate-800 outline-none hover:border-slate-300 focus:border-blue-400 focus:bg-white transition-all duration-200"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </FadeUp>

                  {/* Danger zone */}
                  <FadeUp delay={160}>
                    <Card className="border-red-100 bg-red-50/30">
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-red-700 mb-4 flex items-center gap-2">
                        <AlertTriangle size={13} />
                        Xavfli Zona
                      </h3>
                      <div className="flex items-center justify-between p-4 bg-white border border-red-100 rounded-2xl">
                        <div>
                          <p className="text-[12px] font-black text-slate-800">
                            Hisobni o'chirish
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                            Bu amalni qaytarib bo'lmaydi
                          </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-red-100 transition-colors">
                          <Trash2 size={12} />
                          O'chirish
                        </button>
                      </div>
                    </Card>
                  </FadeUp>
                </div>
              )}

              {/* ════ NOTIFICATIONS ════ */}
              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <FadeUp delay={0}>
                    <Card>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                            Bildirishnoma Kanallari
                          </h3>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                            Qaysi kanallar orqali xabar olasiz
                          </p>
                        </div>
                        <span className="text-[9px] font-black bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                          {Object.values(notifications).filter(Boolean).length}{" "}
                          aktiv
                        </span>
                      </div>
                      <div className="space-y-1">
                        {notifItems.map((item, i) => (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 * i }}
                          >
                            <Row
                              icon={item.icon}
                              label={item.label}
                              sub={item.sub}
                              border={i < notifItems.length - 1}
                              right={
                                <Toggle
                                  on={notifications[item.key]}
                                  onToggle={() => toggleNotification(item.key)}
                                />
                              }
                            />
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </FadeUp>

                  {/* Delivery times */}
                  <FadeUp delay={100}>
                    <Card>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-5">
                        Yetkazish Vaqti
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            label: "Sokin soatlar",
                            value: "22:00 – 08:00",
                            icon: <Moon size={13} />,
                          },
                          {
                            label: "Faol vaqt",
                            value: "08:00 – 22:00",
                            icon: <Sun size={13} />,
                          },
                          {
                            label: "Tanaffus",
                            value: "13:00 – 14:00",
                            icon: <Clock size={13} />,
                          },
                          {
                            label: "Hafta kuni",
                            value: "Du – Shan",
                            icon: <Timer size={13} />,
                          },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.06 * i }}
                            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-slate-400">
                                {item.icon}
                              </span>
                              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                {item.label}
                              </p>
                            </div>
                            <p className="text-[13px] font-black text-slate-800">
                              {item.value}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </FadeUp>
                </div>
              )}

              {/* ════ SECURITY ════ */}
              {activeSection === "security" && (
                <div className="space-y-6">
                  <FadeUp delay={0}>
                    <Card>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-5">
                        Xavfsizlik Sozlamalari
                      </h3>
                      <Row
                        icon={<Shield size={14} />}
                        label="Ikki Faktorli Autentifikatsiya"
                        sub="SMS va email orqali tasdiqlash"
                        right={
                          <Toggle
                            on={twoFactor}
                            onToggle={() => setTwoFactor(!twoFactor)}
                            color="emerald"
                          />
                        }
                      />
                      <Row
                        icon={<Key size={14} />}
                        label="Parolni o'zgartirish"
                        sub="Oxirgi o'zgarish 14 kun oldin"
                        right={
                          <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
                            O'zgartirish
                          </button>
                        }
                      />
                      <Row
                        icon={<Timer size={14} />}
                        label="Sessiya Muddati"
                        sub="Faolsizlikdan keyin chiqish"
                        border={false}
                        right={
                          <select
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-black text-slate-700 outline-none hover:border-blue-300 focus:border-blue-400 transition-colors"
                          >
                            {[
                              "15 daqiqa",
                              "30 daqiqa",
                              "1 soat",
                              "4 soat",
                              "Hech qachon",
                            ].map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        }
                      />
                    </Card>
                  </FadeUp>

                  {/* Login history */}
                  <FadeUp delay={100}>
                    <Card>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-5">
                        Kirish Tarixi
                      </h3>
                      <div className="space-y-3">
                        {loginHistory.map((entry, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.07 * i }}
                            className={`flex items-center gap-4 p-4 rounded-2xl border ${
                              entry.status === "warn"
                                ? "bg-amber-50 border-amber-100"
                                : "bg-slate-50 border-slate-100"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                                entry.status === "warn"
                                  ? "bg-amber-200 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {entry.device.includes("iPhone") ? (
                                <Smartphone size={14} />
                              ) : entry.status === "warn" ? (
                                <AlertTriangle size={14} />
                              ) : (
                                <Monitor size={14} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-black text-slate-800 truncate">
                                {entry.device}
                              </p>
                              <p className="text-[9px] font-semibold text-slate-400 mt-0.5">
                                IP: {entry.ip} · {entry.time}
                              </p>
                            </div>
                            {entry.status === "warn" ? (
                              <span className="text-[8px] font-black bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-xl uppercase tracking-wider whitespace-nowrap">
                                Shubhali
                              </span>
                            ) : (
                              <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                                OK
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-3 rounded-2xl border border-dashed border-red-200 text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2">
                        <LogOut size={12} />
                        Barcha qurilmalardan chiqish
                      </button>
                    </Card>
                  </FadeUp>
                </div>
              )}

              {/* ════ APPEARANCE ════ */}
              {activeSection === "appearance" && (
                <div className="space-y-6">
                  {/* Theme */}
                  <FadeUp delay={0}>
                    <Card>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-5">
                        Mavzu
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            key: "light",
                            label: "Yorug'",
                            icon: <Sun size={18} />,
                            bg: "bg-white border-slate-200",
                          },
                          {
                            key: "dark",
                            label: "Qorang'i",
                            icon: <Moon size={18} />,
                            bg: "bg-slate-900 border-slate-700",
                          },
                          {
                            key: "auto",
                            label: "Avtomatik",
                            icon: <Layers size={18} />,
                            bg: "bg-gradient-to-br from-white to-slate-900 border-slate-300",
                          },
                        ].map((t) => (
                          <motion.button
                            key={t.key}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setTheme(t.key)}
                            className={`relative p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                              t.bg
                            } ${
                              theme === t.key
                                ? "border-blue-500 shadow-md shadow-blue-100"
                                : "border-transparent hover:border-slate-300"
                            }`}
                          >
                            <span
                              className={
                                t.key === "dark"
                                  ? "text-white"
                                  : "text-slate-700"
                              }
                            >
                              {t.icon}
                            </span>
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider ${t.key === "dark" ? "text-white" : "text-slate-700"}`}
                            >
                              {t.label}
                            </span>
                            {theme === t.key && (
                              <motion.div
                                layoutId="theme-check"
                                className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                              >
                                <CheckCircle2
                                  size={10}
                                  className="text-white"
                                />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </Card>
                  </FadeUp>

                  {/* Accent colors */}
                  <FadeUp delay={80}>
                    <Card>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-5">
                        Asosiy Rang
                      </h3>
                      <div className="flex gap-3 flex-wrap">
                        {accentColors.map((c) => (
                          <motion.button
                            key={c.key}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setAccent(c.key)}
                            className={`w-10 h-10 rounded-2xl ${c.cls} transition-all duration-200 ${
                              accent === c.key
                                ? "ring-2 ring-offset-2 ring-slate-400 shadow-lg"
                                : ""
                            }`}
                          >
                            {accent === c.key && (
                              <CheckCircle2
                                size={16}
                                className="text-white m-auto"
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </Card>
                  </FadeUp>

                  {/* More options */}
                  <FadeUp delay={160}>
                    <Card>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-5">
                        Qo'shimcha
                      </h3>
                      <Row
                        icon={<Zap size={14} />}
                        label="Animatsiyalar"
                        sub="Interfeys o'tish efektlari"
                        right={
                          <Toggle
                            on={animations}
                            onToggle={() => setAnimations(!animations)}
                          />
                        }
                      />
                      <Row
                        icon={<Layers size={14} />}
                        label="Zichlik"
                        sub="Elementlar orasidagi bo'shliq"
                        border={false}
                        right={
                          <div className="flex gap-1.5">
                            {["normal", "compact", "spacious"].map((d) => (
                              <button
                                key={d}
                                onClick={() => setDensity(d)}
                                className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-200 ${
                                  density === d
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-slate-50 text-slate-500 border border-slate-200 hover:border-blue-300"
                                }`}
                              >
                                {d === "normal"
                                  ? "Normal"
                                  : d === "compact"
                                    ? "Ixcham"
                                    : "Keng"}
                              </button>
                            ))}
                          </div>
                        }
                      />
                    </Card>
                  </FadeUp>
                </div>
              )}

              {/* ════ INTEGRATIONS ════ */}
              {activeSection === "integrations" && (
                <div className="space-y-6">
                  <FadeUp delay={0}>
                    <Card>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                            Ulangan Xizmatlar
                          </h3>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                            Tashqi tizimlar bilan integratsiya
                          </p>
                        </div>
                        <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                          {integrations.filter((i) => i.connected).length} /{" "}
                          {integrations.length} ulangan
                        </span>
                      </div>
                      <div className="space-y-3">
                        {integrations.map((intg, i) => (
                          <motion.div
                            key={intg.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 * i }}
                            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 ${
                              intg.connected
                                ? "bg-emerald-50/50 border-emerald-100"
                                : "bg-slate-50 border-slate-100 hover:border-slate-200"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm shrink-0">
                              {intg.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-black text-slate-900">
                                {intg.name}
                              </p>
                              <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                                {intg.desc}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                                  intg.connected
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {intg.connected ? (
                                  <Wifi size={10} />
                                ) : (
                                  <WifiOff size={10} />
                                )}
                                {intg.connected ? "Ulangan" : "Ulanmagan"}
                              </div>
                              <Toggle
                                on={intg.connected}
                                onToggle={() => toggleIntegration(intg.id)}
                                color={intg.connected ? "emerald" : "blue"}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </FadeUp>

                  {/* Add new */}
                  <FadeUp delay={100}>
                    <button className="w-full py-5 rounded-3xl border-2 border-dashed border-blue-200 text-[11px] font-black text-blue-500 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 flex items-center justify-center gap-2 group">
                      <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Link2 size={13} />
                      </div>
                      Yangi integratsiya qo'shish
                    </button>
                  </FadeUp>
                </div>
              )}

              {/* ════ CAMERAS / AI ════ */}
              {activeSection === "cameras" && (
                <div className="space-y-6">
                  <FadeUp delay={0}>
                    <Card>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-md">
                          <Video size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                            Kamera Sozlamalari
                          </h3>
                          <p className="text-[9px] text-slate-400 font-semibold">
                            4 ta kamera ulangan
                          </p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-100 rounded-xl">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">
                            Live
                          </span>
                        </div>
                      </div>
                      <Row
                        icon={<Activity size={14} />}
                        label="Harakat Aniqlash"
                        sub="Kamerada harakat bo'lganda ogohlantirish"
                        right={
                          <Toggle
                            on={cameraSettings.motionDetect}
                            onToggle={() => toggleCamera("motionDetect")}
                          />
                        }
                      />
                      <Row
                        icon={<Eye size={14} />}
                        label="Yuz Tanish"
                        sub="AI yordamida mijozlarni aniqlash"
                        right={
                          <Toggle
                            on={cameraSettings.faceRecognition}
                            onToggle={() => toggleCamera("faceRecognition")}
                            color="emerald"
                          />
                        }
                      />
                      <Row
                        icon={<Video size={14} />}
                        label="Avtomatik Yozish"
                        sub="Harakatda avtomatik video saqlash"
                        right={
                          <Toggle
                            on={cameraSettings.autoRecord}
                            onToggle={() => toggleCamera("autoRecord")}
                          />
                        }
                      />
                      <Row
                        icon={<Monitor size={14} />}
                        label="Video Sifati"
                        sub="Kamera yozuv sifati"
                        right={
                          <select
                            value={cameraSettings.resolution}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-black text-slate-700 outline-none hover:border-blue-300 focus:border-blue-400 transition-colors"
                          >
                            {["480p", "720p", "1080p", "4K"].map((r) => (
                              <option key={r}>{r}</option>
                            ))}
                          </select>
                        }
                      />
                      <Row
                        icon={<Database size={14} />}
                        label="Video Saqlash"
                        sub="Yozuvlar qancha muddatga saqlanadi"
                        border={false}
                        right={
                          <select
                            value={cameraSettings.retention}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-black text-slate-700 outline-none hover:border-blue-300 focus:border-blue-400 transition-colors"
                          >
                            {[
                              "3 kun",
                              "7 kun",
                              "14 kun",
                              "30 kun",
                              "90 kun",
                            ].map((r) => (
                              <option key={r}>{r}</option>
                            ))}
                          </select>
                        }
                      />
                    </Card>
                  </FadeUp>

                  {/* AI block */}
                  <FadeUp delay={100}>
                    <Card className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-blue-100">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-200">
                          <Sparkles size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                            AI Intellect Sozlamalari
                          </h3>
                          <p className="text-[9px] text-blue-500 font-semibold">
                            Aqlli tahlil tizimi
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            label: "Tahlil Tezligi",
                            value: "Yuqori",
                            color: "text-blue-700",
                            bg: "bg-blue-50 border-blue-100",
                          },
                          {
                            label: "Model",
                            value: "GPT-4o",
                            color: "text-violet-700",
                            bg: "bg-violet-50 border-violet-100",
                          },
                          {
                            label: "Aniqlik",
                            value: "96.4%",
                            color: "text-emerald-700",
                            bg: "bg-emerald-50 border-emerald-100",
                          },
                        ].map((stat, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.08 * i }}
                            className={`p-4 rounded-2xl border ${stat.bg} text-center`}
                          >
                            <p className={`text-base font-black ${stat.color}`}>
                              {stat.value}
                            </p>
                            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                              {stat.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </FadeUp>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
