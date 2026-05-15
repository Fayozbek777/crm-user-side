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
import POS from "../views/POS/POS";
import PurchaseOrders from "../views/PurchaseOrders/PurchaseOrders";
import ExpireManagement from "../views/ExpireManagement/ExpireManagement";
import Reports from "../views/Reports/Reports";
import SalesStats from "../views/SalesStats/SalesStats";
import Suppliers from "../views/Suppliers/Suppliers";

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
          <Route path="/posterminal" element={<POS />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/expire-products" element={<ExpireManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/salestatus" element={<SalesStats />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/pruchase-orders" element={<PurchaseOrders />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Super Admin"]} />}>
        <Route path={`/${SECRET_ROOT_PATH}`} element={<Root />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;
