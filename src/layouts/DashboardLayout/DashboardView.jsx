import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

/*
  Layout colour scheme:
  ┌─ Sidebar  ─ deep navy  #0f172a  (slate-900)
  ├─ Navbar   ─ pure white  #ffffff  with bottom border
  └─ Content  ─ soft grey  #f8fafc  (slate-50)
*/

const DashboardView = ({ isSidebarOpen, toggleSidebar, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* ── Mobile overlay ── */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 lg:hidden
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:relative z-50 h-screen shrink-0
          bg-slate-900 transition-all duration-300 ease-in-out overflow-hidden
          ${isSidebarOpen ? "w-[240px]" : "w-0 lg:w-[72px]"}`}
      >
        {/* inner always 240px wide so content doesn't reflow */}
        <div className="w-[240px] h-full">
          <Sidebar isCollapsed={!isSidebarOpen} />
        </div>
      </aside>

      {/* ── Right column ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navbar — white */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-100 shadow-sm flex items-center px-5 z-30">
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </header>

        {/* Page content — slate-50 */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardView;
