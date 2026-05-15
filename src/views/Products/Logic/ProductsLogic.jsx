import { useState, useMemo } from "react";

export const useProductsLogic = () => {
  const initialCatalog = [
    {
      id: 1,
      name: "Coca-Cola 0.5L",
      category: "ichimlik",
      price: 8500,
      cost: 5000,
      stock: 124,
      emoji: "🥤",
      barcode: "5000112637922",
    },
    {
      id: 2,
      name: "Baxmal Non",
      category: "non",
      price: 4000,
      cost: 2500,
      stock: 45,
      emoji: "🍞",
      barcode: "non-001",
    },
    {
      id: 3,
      name: "Sut (Kamilka)",
      category: "sut",
      price: 12000,
      cost: 9000,
      stock: 12,
      emoji: "🥛",
      barcode: "sut-122",
    },
    {
      id: 4,
      name: "Snickers XL",
      category: "shirin",
      price: 7500,
      cost: 5000,
      stock: 8,
      emoji: "🍫",
      barcode: "882193",
    },
    {
      id: 5,
      name: "Shampun",
      category: "zarur",
      price: 35000,
      cost: 24000,
      stock: 56,
      emoji: "🧴",
      barcode: "442211",
    },
    {
      id: 6,
      name: "Pepsi 1.5L",
      category: "ichimlik",
      price: 13000,
      cost: 9000,
      stock: 88,
      emoji: "🥤",
      barcode: "5000112637000",
    },
    {
      id: 7,
      name: "Choy Greenfield",
      category: "ichimlik",
      price: 28000,
      cost: 18000,
      stock: 34,
      emoji: "🍵",
      barcode: "665544",
    },
    {
      id: 8,
      name: "Yog' (O'simlik)",
      category: "zarur",
      price: 18000,
      cost: 14000,
      stock: 110,
      emoji: "🌻",
      barcode: "778899",
    },
    {
      id: 9,
      name: "Tuxum (10 dona)",
      category: "sut",
      price: 15000,
      cost: 11000,
      stock: 25,
      emoji: "🥚",
      barcode: "112233",
    },
    {
      id: 10,
      name: "Lavash (Tayyor)",
      category: "non",
      price: 22000,
      cost: 15000,
      stock: 15,
      emoji: "🌯",
      barcode: "990011",
    },
    {
      id: 11,
      name: "Olma (Qizil)",
      category: "zarur",
      price: 12000,
      cost: 8000,
      stock: 65,
      emoji: "🍎",
      barcode: "554433",
    },
    {
      id: 12,
      name: "Banan",
      category: "zarur",
      price: 24000,
      cost: 19000,
      stock: 40,
      emoji: "🍌",
      barcode: "223344",
    },
    {
      id: 13,
      name: "Pishloq (Cheese)",
      category: "sut",
      price: 45000,
      cost: 32000,
      stock: 18,
      emoji: "🧀",
      barcode: "776655",
    },
    {
      id: 14,
      name: "Shokolad Milka",
      category: "shirin",
      price: 18000,
      cost: 12000,
      stock: 50,
      emoji: "🍫",
      barcode: "111222",
    },
    {
      id: 15,
      name: "Qahva (Nescafe)",
      category: "ichimlik",
      price: 55000,
      cost: 42000,
      stock: 22,
      emoji: "☕",
      barcode: "333444",
    },
    {
      id: 16,
      name: "Sariyog'",
      category: "sut",
      price: 22000,
      cost: 17000,
      stock: 30,
      emoji: "🧈",
      barcode: "555666",
    },
    {
      id: 17,
      name: "Makaron",
      category: "zarur",
      price: 9000,
      cost: 6500,
      stock: 140,
      emoji: "🍝",
      barcode: "777888",
    },
    {
      id: 18,
      name: "Tuz",
      category: "zarur",
      price: 2500,
      cost: 1000,
      stock: 200,
      emoji: "🧂",
      barcode: "999000",
    },
    {
      id: 19,
      name: "Muzqaymoq",
      category: "shirin",
      price: 6000,
      cost: 3500,
      stock: 45,
      emoji: "🍦",
      barcode: "121212",
    },
    {
      id: 20,
      name: "Bulochka",
      category: "non",
      price: 3500,
      cost: 2000,
      stock: 60,
      emoji: "🥯",
      barcode: "343434",
    },
    {
      id: 21,
      name: "Mineral Suv",
      category: "ichimlik",
      price: 3000,
      cost: 1500,
      stock: 180,
      emoji: "💧",
      barcode: "565656",
    },
    {
      id: 22,
      name: "Keks",
      category: "shirin",
      price: 12000,
      cost: 8000,
      stock: 20,
      emoji: "🧁",
      barcode: "787878",
    },
  ];

  const [products, setProducts] = useState(initialCatalog);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProduct = (newProd) => {
    const productWithId = {
      ...newProd,
      id: Date.now(), // Генерируем ID
      stock: Number(newProd.stock),
      price: Number(newProd.price),
      cost: Number(newProd.cost),
    };
    setProducts((prev) => [productWithId, ...prev]);
    setIsModalOpen(false);
  };
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search);
      const matchesStock = filter === "low_stock" ? p.stock < 20 : true;
      return matchesSearch && matchesStock;
    });
  }, [products, search, filter]);

  const deleteProduct = (id) => {
    if (window.confirm("O'chirilsinmi?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return {
    products: filteredProducts,
    search,
    setSearch,
    filter,
    setFilter,
    isModalOpen,
    setIsModalOpen,
    addProduct,
    deleteProduct,
    totalStock: products.reduce((acc, p) => acc + p.stock, 0),
    totalValue: products.reduce((acc, p) => acc + p.price * p.stock, 0),
  };
};
