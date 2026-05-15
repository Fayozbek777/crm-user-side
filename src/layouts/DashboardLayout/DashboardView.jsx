import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const DashboardView = ({ isSidebarOpen, toggleSidebar, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      />

      {/* ── Sidebar ── */}
      <aside
        className={`
          h-screen sticky top-0 z-50 shrink-0
          bg-white border-r border-slate-100 shadow-sm
          transition-all duration-300 ease-in-out overflow-hidden
          fixed lg:relative
          ${isSidebarOpen ? "w-64 opacity-100 visible" : "w-0 opacity-0 invisible lg:border-none"}
        `}
      >
        <div className="w-64 h-full">
          <Sidebar isCollapsed={!isSidebarOpen} />
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navbar */}
        <header className="h-[68px] shrink-0 border-b border-slate-100 bg-white/90 backdrop-blur-md flex items-center px-6 shadow-sm z-30">
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardView;
