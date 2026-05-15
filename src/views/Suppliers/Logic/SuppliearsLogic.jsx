import { useState, useMemo } from "react";

export const useSuppliersLogic = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Coca-Cola Tashkent",
      contact: "+998 71 123 45 67",
      category: "Ichimliklar",
      balance: -1200000,
      status: "active",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Baxmal Bread Factory",
      contact: "+998 90 998 11 22",
      category: "Non mahsulotlari",
      balance: 450000,
      status: "active",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Kamilka Dairy",
      contact: "+998 93 500 40 30",
      category: "Sut mahsulotlari",
      balance: 0,
      status: "pending",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Korzinka Logistic",
      contact: "+998 78 140 00 00",
      category: "Turli xil",
      balance: -5600000,
      status: "active",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Nestle Uzbekistan",
      contact: "+998 71 200 12 34",
      category: "Shirinliklar",
      balance: 0,
      status: "inactive",
      rating: 4.0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [suppliers, searchTerm]);

  const totals = useMemo(() => {
    const debt = suppliers.reduce(
      (acc, s) => (s.balance < 0 ? acc + s.balance : acc),
      0,
    );
    return {
      totalSuppliers: suppliers.length,
      activePartners: suppliers.filter((s) => s.status === "active").length,
      totalDebt: Math.abs(debt),
    };
  }, [suppliers]);

  const addSupplier = (newS) => {
    setSuppliers([
      { ...newS, id: Date.now(), balance: 0, rating: 5.0, status: "active" },
      ...suppliers,
    ]);
    setIsModalOpen(false);
  };

  return {
    suppliers: filteredSuppliers,
    searchTerm,
    setSearchTerm,
    totals,
    isModalOpen,
    setIsModalOpen,
    addSupplier,
  };
};
