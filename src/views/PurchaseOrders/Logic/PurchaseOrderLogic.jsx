import { useState, useMemo } from "react";

export const usePurchaseOrderLogic = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all | pending | received

  const orders = useMemo(
    () => [
      {
        id: "PO-9901",
        provider: "Agro-Food LLC",
        date: "2024-05-14",
        total: 4200000,
        items: 12,
        status: "pending",
        type: "orange",
      },
      {
        id: "PO-9902",
        provider: "Milk House",
        date: "2024-05-12",
        total: 1250000,
        items: 5,
        status: "received",
        type: "green",
      },
      {
        id: "PO-9903",
        provider: "Global Drinks",
        date: "2024-05-10",
        total: 8900000,
        items: 45,
        status: "pending",
        type: "blue",
      },
      {
        id: "PO-9904",
        provider: "Eco-Farm",
        date: "2024-05-08",
        total: 3100000,
        items: 8,
        status: "canceled",
        type: "red",
      },
    ],
    [],
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.provider.toLowerCase().includes(search.toLowerCase()) ||
        o.id.includes(search);
      const matchesTab = activeTab === "all" || o.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, orders]);

  const stats = {
    totalOut: orders.reduce((acc, curr) => acc + curr.total, 0),
    activeCount: orders.filter((o) => o.status === "pending").length,
  };

  return { search, setSearch, activeTab, setActiveTab, filteredOrders, stats };
};
