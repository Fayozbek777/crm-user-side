import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardView from "./DashboardView";

const DashboardLogic = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <DashboardView isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <Outlet />
    </DashboardView>
  );
};

export default DashboardLogic;
