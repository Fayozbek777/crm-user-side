import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const DashboardView = ({ isSidebarOpen, toggleSidebar, children }) => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      <aside
        className={`
          h-screen sticky top-0 bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 ease-in-out z-50
          overflow-hidden 
          ${
            isSidebarOpen
              ? "w-64 opacity-100 visible"
              : "w-0 opacity-0 invisible lg:border-none"
          }
          fixed lg:relative
        `}
      >
        <div className="w-64">
          <Sidebar isCollapsed={!isSidebarOpen} />
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Navbar */}
        <header className="h-20 border-b border-white/10 flex items-center px-6 bg-[#0a0a0a]/80 backdrop-blur-md">
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 custom-scrollbar bg-[#050505]">
          <div className="max-w-7xl mx-auto uppercase tracking-wider">
            {children}
          </div>
        </main>
      </div>
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default DashboardView;
