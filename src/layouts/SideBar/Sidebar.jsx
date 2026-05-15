import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  const menuGroups = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", path: "/" },
        { name: "POS Terminal", path: "/pos" },
      ],
    },
    {
      title: "Management",
      items: [
        { name: "CRM", path: "/crm" },
        { name: "Products", path: "/products" },
        { name: "Inventory", path: "/inventory" },
        { name: "Suppliers", path: "/suppliers" },
      ],
    },
    {
      title: "Intelligence",
      items: [
        { name: "AI Analytics", path: "/ai-analytics" },
        { name: "Camera Feed", path: "/camera-monitor" },
        { name: "Sales Stats", path: "/sales-stats" },
      ],
    },
    {
      title: "System",
      items: [
        { name: "Reports", path: "/reports" },
        { name: "Settings", path: "/settings" },
      ],
    },
  ];

  return (
    <div className="py-6 flex flex-col h-full bg-[#0d0d0d]">
      <div className="px-6 mb-10">
        <h2 className="text-xl font-bold tracking-tighter text-white">
          {isCollapsed ? "K" : "KALI CORE"}
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-2">
            {!isCollapsed && (
              <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600/10 text-blue-500 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]"
                        : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                    }`
                  }
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${isCollapsed ? "mx-auto" : ""} bg-current`}
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
