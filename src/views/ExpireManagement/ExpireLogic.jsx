import { useMemo, useState } from "react";

export const useExpireLogic = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const inventory = [
    {
      id: 1,
      name: "Milk 'Sutchi' 1L",
      category: "Dairy",
      expireDate: "2024-05-20",
      stock: 24,
      price: 12000,
      emoji: "🥛",
    },
    {
      id: 2,
      name: "Coca-Cola 0.5L",
      category: "Drinks",
      expireDate: "2024-12-10",
      stock: 142,
      price: 8500,
      emoji: "🥤",
    },
    {
      id: 3,
      name: "Yogurt Bio",
      category: "Dairy",
      expireDate: "2024-05-16",
      stock: 12,
      price: 5500,
      emoji: "🍦",
    },
    {
      id: 4,
      name: "Chicken Breast",
      category: "Meat",
      expireDate: "2024-05-15",
      stock: 8,
      price: 45000,
      emoji: "🍗",
    },
    {
      id: 5,
      name: "Bread 'Baton'",
      category: "Bakery",
      expireDate: "2024-05-17",
      stock: 15,
      price: 4000,
      emoji: "🍞",
    },
  ];

  const getStatus = (date) => {
    const today = new Date();
    const exp = new Date(date);
    const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

    if (diff <= 1)
      return { label: "CRITICAL", color: "red", icon: "🚨", days: diff };
    if (diff <= 3)
      return { label: "WARNING", color: "orange", icon: "⚠️", days: diff };
    if (diff <= 7)
      return { label: "CAUTION", color: "amber", icon: "⏳", days: diff };
    return { label: "SAFE", color: "green", icon: "✅", days: diff };
  };

  const filteredItems = useMemo(() => {
    return inventory
      .map((item) => ({ ...item, status: getStatus(item.expireDate) }))
      .filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(search.toLowerCase());
        if (filter === "all") return matchesSearch;
        return matchesSearch && item.status.color === filter;
      })
      .sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate));
  }, [search, filter]);

  const stats = {
    critical: inventory.filter((i) => getStatus(i.expireDate).color === "red")
      .length,
    warning: inventory.filter((i) => getStatus(i.expireDate).color === "orange")
      .length,
    totalLoss: inventory.reduce(
      (acc, i) =>
        getStatus(i.expireDate).days < 0 ? acc + i.price * i.stock : acc,
      0,
    ),
  };

  return { search, setSearch, filter, setFilter, filteredItems, stats };
};
