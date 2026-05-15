import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useNavLogic = (toggleSidebar, isSidebarOpen) => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const getTitle = () => {
    const path = location.pathname;
    if (path === "/crm") return "CRM";
    if (path === "/products") return "Products";
    return "Dashboard";
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      if (isSidebarOpen) {
        toggleSidebar();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return {
    getTitle,
    search,
    setSearch,
    toggleFullScreen,
    handleToggle: toggleSidebar,
  };
};
