import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import DashboardLogic from "../layouts/DashboardLayout/DashboardLogic";
import AuthLogic from "../auth/AuthLogic";
import Root from "../root/RootPanel/Root";
import Dashboard from "../views/Dashboard/Dashboard";
import CRM from "../views/CRM/CRM";
import Products from "../views/Products/Products";
import Inventory from "../views/Inventory/Inventory";
import Settings from "../views/Settings/Settings";

// src/routes/Router.jsx
const ProtectedRoute = ({ allowedRoles }) => {
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function Router() {
  const SECRET_ROOT_PATH =
    import.meta.env.VITE_SUPER_ADMIN_PATH || "root-panel";

  return (
    <Routes>
      <Route path="/login" element={<AuthLogic />} />

      <Route
        element={
          <ProtectedRoute allowedRoles={["Super Admin", "Admin", "Worker"]} />
        }
      >
        <Route element={<DashboardLogic drop-shadow-xl />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/settings" element={<Settings />} />
          {/* Здесь можно добавить остальные маршруты CRM */}
        </Route>
      </Route>

      {/* 3. ТОЛЬКО ДЛЯ SUPER ADMIN (Секретная панель) */}
      <Route element={<ProtectedRoute allowedRoles={["Super Admin"]} />}>
        {/* Путь формируется динамически из .env */}
        <Route path={`/${SECRET_ROOT_PATH}`} element={<Root />} />
      </Route>

      {/* 4. РЕДИРЕКТ ПРИ ОШИБКЕ ПУТИ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;
