import { useMemo } from "react";

export const useReportLogic = () => {
  // Данные для графиков
  const salesData = [
    { name: "Du", tushum: 1200000, foyda: 450000, orders: 42 },
    { name: "Se", tushum: 950000, foyda: 320000, orders: 35 },
    { name: "Cho", tushum: 1500000, foyda: 600000, orders: 51 },
    { name: "Pa", tushum: 1100000, foyda: 400000, orders: 39 },
    { name: "Ju", tushum: 1850000, foyda: 720000, orders: 62 },
    { name: "Sha", tushum: 2100000, foyda: 850000, orders: 75 },
    { name: "Yak", tushum: 850000, foyda: 310000, orders: 28 },
  ];

  const topProducts = [
    { name: "Coca-Cola 0.5L", sold: 450, growth: "+12%", color: "#6366f1" },
    { name: "Baxmal Non", sold: 380, growth: "+5%", color: "#f59e0b" },
    { name: "Snickers XL", sold: 210, growth: "+18%", color: "#10b981" },
    { name: "Sut Kamilka", sold: 195, growth: "-2%", color: "#3b82f6" },
  ];

  const stats = useMemo(() => {
    const totalSales = salesData.reduce((acc, curr) => acc + curr.tushum, 0);
    const totalProfit = salesData.reduce((acc, curr) => acc + curr.foyda, 0);
    const totalOrders = salesData.reduce((acc, curr) => acc + curr.orders, 0);

    return {
      totalSales,
      totalProfit,
      totalOrders,
      averageCheck: totalSales / totalOrders,
      salesData,
      topProducts,
    };
  }, []);

  return { stats };
};
