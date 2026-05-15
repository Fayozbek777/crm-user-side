import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Warehouse,
  Truck,
  BrainCircuit,
  Cctv,
  BarChart3,
  FileText,
  Settings,
  Zap,
} from "lucide-react";

const menuGroups = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", path: "/", icon: LayoutDashboard },
      { name: "POS Terminal", path: "/pos", icon: ShoppingCart },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "CRM", path: "/crm", icon: Users },
      { name: "Products", path: "/products", icon: Package },
      { name: "Inventory", path: "/inventory", icon: Warehouse },
      { name: "Suppliers", path: "/suppliers", icon: Truck },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { name: "AI Analytics", path: "/ai-analytics", icon: BrainCircuit },
      { name: "Camera Feed", path: "/camera-monitor", icon: Cctv },
      { name: "Sales Stats", path: "/sales-stats", icon: BarChart3 },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Reports", path: "/reports", icon: FileText },
      { name: "Settings", path: "/settings", icon: Settings },
    ],
  },
];

export default function Sidebar({ isCollapsed }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100 relative overflow-hidden shadow-sm">
      {/* Decorative top gradient stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-600" />

      {/* Soft background blobs */}
      <div className="absolute top-16 -left-8 w-40 h-40 bg-blue-50 rounded-full blur-3xl pointer-events-none opacity-70" />
      <div className="absolute bottom-20 -right-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl pointer-events-none opacity-70" />

      {/* ── Logo ── */}
      <div className="relative z-10 px-5 pt-7 pb-5 border-b border-slate-100">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-slate-900 font-black tracking-tighter text-[15px] uppercase">
                  KALI
                </span>
                <span className="text-blue-600 font-black tracking-tighter text-[15px] uppercase">
                  {" "}
                  CORE
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-5">
        {menuGroups.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: gi * 0.08 + 0.1,
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <AnimatePresence>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 mb-1.5 text-[9px] uppercase tracking-[0.28em] text-slate-400 font-black"
                >
                  {group.title}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => setHovered(item.path)}
                    onMouseLeave={() => setHovered(null)}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors duration-200 overflow-hidden
                      ${isActive ? "text-blue-700" : "text-slate-400 hover:text-slate-700"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-blue-50 border border-blue-100 rounded-2xl"
                            transition={{
                              type: "spring",
                              bounce: 0.18,
                              duration: 0.38,
                            }}
                          />
                        )}
                        {hovered === item.path && !isActive && (
                          <motion.div
                            layoutId="hoverNav"
                            className="absolute inset-0 bg-slate-50 rounded-2xl"
                            transition={{
                              type: "spring",
                              bounce: 0.18,
                              duration: 0.28,
                            }}
                          />
                        )}

                        {/* Icon */}
                        <div
                          className={`relative z-10 shrink-0 transition-colors duration-200
                          ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}
                        >
                          <Icon size={16} strokeWidth={isActive ? 2.2 : 1.6} />
                        </div>

                        {/* Label */}
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className={`relative z-10 text-[12px] font-semibold whitespace-nowrap overflow-hidden
                                ${isActive ? "text-blue-700" : "text-slate-500"}`}
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Active dot */}
                        {isActive && !isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        ))}
      </nav>

      {/* ── Bottom status card ── */}
      <div className="relative z-10 p-3 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.7)] animate-pulse shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                  System Online
                </p>
                <p className="text-[9px] text-emerald-500 font-semibold">
                  All services running
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
