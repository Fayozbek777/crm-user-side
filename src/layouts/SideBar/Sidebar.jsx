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
  ChevronRight,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const groups = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", path: "/", icon: LayoutDashboard, badge: null },
      {
        name: "POS Terminal",
        path: "/posterminal",
        icon: ShoppingCart,
        badge: "Live",
      },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "CRM", path: "/crm", icon: Users, badge: null },
      { name: "Products", path: "/products", icon: Package, badge: null },
      { name: "Inventory", path: "/inventory", icon: Warehouse, badge: "23" },
      { name: "Suppliers", path: "/suppliers", icon: Truck, badge: null },
      {
        name: "Purchase Orders",
        path: "/pruchase-orders",
        icon: TrendingUp,
        badge: null,
      },
      {
        name: "Expire Mgmt",
        path: "/expire-products",
        icon: AlertTriangle,
        badge: "5",
      },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        name: "AI Analytics",
        path: "/ai-analytics",
        icon: BrainCircuit,
        badge: null,
      },
      { name: "Camera Feed", path: "/camera-monitor", icon: Cctv, badge: "●" },
      {
        name: "Sales Stats",
        path: "/salestatus",
        icon: BarChart3,
        badge: null,
      },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Reports", path: "/reports", icon: FileText, badge: null },
      { name: "Settings", path: "/settings", icon: Settings, badge: null },
    ],
  },
];

export default function Sidebar({ isCollapsed }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col h-full bg-slate-900 relative overflow-hidden select-none">
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />

      {/* background texture blobs */}
      <div className="absolute top-10 -left-10 w-48 h-48 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-8 w-36 h-36 bg-sky-500/8 rounded-full blur-2xl pointer-events-none" />

      {/* ── Logo ── */}
      <div className="relative z-10 flex items-center gap-3 px-4 pt-6 pb-5 border-b border-slate-700/50">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/40 shrink-0">
          <Zap size={16} className="text-white fill-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-white font-black text-[15px] tracking-tighter uppercase">
                CRM
              </span>
              <p className="text-slate-500 text-[9px] font-semibold tracking-widest uppercase mt-0.5">
                v4.0 System
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav groups ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
        {groups.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: gi * 0.06 + 0.08,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <AnimatePresence>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-3 mb-1.5 text-[9px] uppercase tracking-[0.28em] text-slate-500 font-black"
                >
                  {group.label}
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
                      `relative flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors duration-150 overflow-hidden group
                      ${isActive ? "text-white" : "text-slate-500 hover:text-slate-300"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* active bg */}
                        {isActive && (
                          <motion.div
                            layoutId="sidebarActive"
                            className="absolute inset-0 bg-blue-600/20 border border-blue-500/30 rounded-2xl"
                            transition={{
                              type: "spring",
                              bounce: 0.15,
                              duration: 0.35,
                            }}
                          />
                        )}
                        {/* hover bg */}
                        {hovered === item.path && !isActive && (
                          <motion.div
                            layoutId="sidebarHover"
                            className="absolute inset-0 bg-slate-700/40 rounded-2xl"
                            transition={{
                              type: "spring",
                              bounce: 0.15,
                              duration: 0.25,
                            }}
                          />
                        )}

                        {/* left accent bar */}
                        {isActive && (
                          <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
                        )}

                        {/* icon */}
                        <div
                          className={`relative z-10 shrink-0 transition-colors duration-150
                          ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}
                        >
                          <Icon size={15} strokeWidth={isActive ? 2.2 : 1.6} />
                        </div>

                        {/* label */}
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.18 }}
                              className={`relative z-10 text-[12px] font-semibold whitespace-nowrap flex-1
                                ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* badge */}
                        {!isCollapsed && item.badge && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`relative z-10 text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider
                              ${
                                item.badge === "Live" || item.badge === "●"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                          >
                            {item.badge === "●" ? (
                              <span className="flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                              </span>
                            ) : (
                              item.badge
                            )}
                          </motion.span>
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
      <div className="relative z-10 p-3 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-slate-800/70 border border-slate-700/50">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] animate-pulse shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  System Online
                </p>
                <p className="text-[9px] text-slate-500 font-semibold">
                  All 4 cameras active
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
