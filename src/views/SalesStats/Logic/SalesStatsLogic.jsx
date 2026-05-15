import { useState, useMemo } from "react";

export const useSalesStatsLogic = () => {
  const [timeRange, setTimeRange] = useState("7D");

  // Данные для основного графика (AreaChart)
  const mainChartData = [
    { name: "Mon", revenue: 4000, orders: 240 },
    { name: "Tue", revenue: 3000, orders: 198 },
    { name: "Wed", revenue: 2000, orders: 300 },
    { name: "Thu", revenue: 2780, orders: 390 },
    { name: "Fri", revenue: 1890, orders: 480 },
    { name: "Sat", revenue: 2390, orders: 380 },
    { name: "Sun", revenue: 3490, orders: 430 },
  ];

  // Данные для категорий (PieChart)
  const categoryData = [
    { name: "Drinks", value: 400, color: "#3b82f6" }, // blue-500
    { name: "Bakery", value: 300, color: "#f59e0b" }, // amber-500
    { name: "Dairy", value: 300, color: "#10b981" }, // emerald-500
    { name: "Meat", value: 200, color: "#ef4444" }, // red-500
  ];

  const stats = [
    {
      label: "Total Revenue",
      value: 145200000,
      trend: "+12.5%",
      color: "blue",
    },
    { label: "Avg. Check", value: 85400, trend: "+2.1%", color: "green" },
    { label: "Transactions", value: 1240, trend: "-4.3%", color: "orange" },
  ];

  return { timeRange, setTimeRange, stats, mainChartData, categoryData };
};
