import { useState, useMemo } from "react";

/* ── Product catalog ── */
const catalog = [
  /* Ichimliklar */
  {
    id: 1,
    name: "Coca-Cola 0.5L",
    category: "ichimlik",
    price: 8500,
    stock: 124,
    emoji: "🥤",
    barcode: "5000112637922",
  },
  {
    id: 2,
    name: "Pepsi 0.5L",
    category: "ichimlik",
    price: 7500,
    stock: 98,
    emoji: "🥤",
    barcode: "4006381333634",
  },
  {
    id: 3,
    name: "Fanta Apelsin",
    category: "ichimlik",
    price: 8000,
    stock: 67,
    emoji: "🍊",
    barcode: "5449000054227",
  },
  {
    id: 4,
    name: "Sprite 1L",
    category: "ichimlik",
    price: 12000,
    stock: 44,
    emoji: "💧",
    barcode: "5000112548167",
  },
  {
    id: 5,
    name: "Lipton Choy",
    category: "ichimlik",
    price: 15000,
    stock: 31,
    emoji: "🍵",
    barcode: "8710908926327",
  },
  {
    id: 6,
    name: "Red Bull 0.25L",
    category: "ichimlik",
    price: 22000,
    stock: 18,
    emoji: "⚡",
    barcode: "9002490100070",
  },

  /* Non-Pishiriq */
  {
    id: 7,
    name: "Oq Non (1 dona)",
    category: "non",
    price: 4000,
    stock: 42,
    emoji: "🍞",
    barcode: "4600494002592",
  },
  {
    id: 8,
    name: "Lavash",
    category: "non",
    price: 6000,
    stock: 28,
    emoji: "🫓",
    barcode: "4600494002600",
  },
  {
    id: 9,
    name: "Baranki 200g",
    category: "non",
    price: 9500,
    stock: 55,
    emoji: "🥯",
    barcode: "4607086560012",
  },
  {
    id: 10,
    name: "Печенье Oreo",
    category: "non",
    price: 18000,
    stock: 36,
    emoji: "🍪",
    barcode: "7622210449283",
  },

  /* Sut mahsulotlari */
  {
    id: 11,
    name: "Sut 1L",
    category: "sut",
    price: 14000,
    stock: 22,
    emoji: "🥛",
    barcode: "4604410001234",
  },
  {
    id: 12,
    name: "Kefir 0.5L",
    category: "sut",
    price: 9000,
    stock: 17,
    emoji: "🍶",
    barcode: "4604410005678",
  },
  {
    id: 13,
    name: "Sariyog' 200g",
    category: "sut",
    price: 28000,
    stock: 14,
    emoji: "🧈",
    barcode: "4607086560123",
  },
  {
    id: 14,
    name: "Tvorog 200g",
    category: "sut",
    price: 19000,
    stock: 9,
    emoji: "🧀",
    barcode: "4607086560456",
  },

  /* Shirinliklar */
  {
    id: 15,
    name: "Snickers 50g",
    category: "shirin",
    price: 12000,
    stock: 60,
    emoji: "🍫",
    barcode: "5000159461122",
  },
  {
    id: 16,
    name: "KitKat 45g",
    category: "shirin",
    price: 11000,
    stock: 48,
    emoji: "🍫",
    barcode: "7613034086549",
  },
  {
    id: 17,
    name: "Chupa Chups",
    category: "shirin",
    price: 4500,
    stock: 82,
    emoji: "🍭",
    barcode: "8410031961007",
  },
  {
    id: 18,
    name: "Lay's Kartoshka",
    category: "shirin",
    price: 16000,
    stock: 33,
    emoji: "🥔",
    barcode: "5949000515770",
  },

  /* Zarur */
  {
    id: 19,
    name: "Shampun 400ml",
    category: "zarur",
    price: 45000,
    stock: 12,
    emoji: "🧴",
    barcode: "8001841000534",
  },
  {
    id: 20,
    name: "Sovun (dona)",
    category: "zarur",
    price: 8000,
    stock: 40,
    emoji: "🧼",
    barcode: "8001090749239",
  },
  {
    id: 21,
    name: "Diş pastasi",
    category: "zarur",
    price: 22000,
    stock: 25,
    emoji: "🪥",
    barcode: "8714789963792",
  },
  {
    id: 22,
    name: "Salfetkalar",
    category: "zarur",
    price: 7000,
    stock: 70,
    emoji: "🧻",
    barcode: "4607086560789",
  },
];

const categories = [
  { key: "barchasi", label: "Barchasi", emoji: "⚡" },
  { key: "ichimlik", label: "Ichimlik", emoji: "🥤" },
  { key: "non", label: "Non", emoji: "🍞" },
  { key: "sut", label: "Sut", emoji: "🥛" },
  { key: "shirin", label: "Shirin", emoji: "🍫" },
  { key: "zarur", label: "Zarur", emoji: "🧴" },
];

const payMethods = [
  { key: "naqd", label: "Naqd", icon: "💵" },
  { key: "karta", label: "Karta", icon: "💳" },
  { key: "click", label: "Click", icon: "⚡" },
  { key: "payme", label: "Payme", icon: "📱" },
];

export const usePOSLogic = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("barchasi");
  const [cart, setCart] = useState([]);
  const [payMethod, setPayMethod] = useState("naqd");
  const [cashInput, setCashInput] = useState("");
  const [stage, setStage] = useState("pos"); // pos | pay | receipt
  const [discount, setDiscount] = useState(0); // percent
  const [lastReceipt, setLastReceipt] = useState(null);
  const [barcodeMode, setBarcodeMode] = useState(false);
  const [notification, setNotification] = useState(null);

  /* filtered products */
  const products = useMemo(() => {
    let list = catalog;
    if (activeCategory !== "barchasi")
      list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.barcode.includes(q) ||
          p.emoji.includes(q),
      );
    }
    return list;
  }, [search, activeCategory]);

  /* cart helpers */
  const addToCart = (product) => {
    if (product.stock <= 0) return showNotif("⚠️ Mahsulot tugagan!", "red");
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          showNotif("⚠️ Omborda yetarli emas!", "red");
          return prev;
        }
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      showNotif(`✓ ${product.name} qo'shildi`, "green");
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i,
        )
        .filter((i) => i.qty > 0),
    );

  const clearCart = () => setCart([]);

  /* totals */
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = Math.round(subtotal * (discount / 100));
  const total = subtotal - discountAmt;
  const cashGiven = parseInt(cashInput.replace(/\D/g, "")) || 0;
  const change = Math.max(0, cashGiven - total);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  /* payment */
  const processPayment = () => {
    if (cart.length === 0) return;
    const receipt = {
      id: `CHK-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString("uz-UZ"),
      items: [...cart],
      subtotal,
      discountAmt,
      discount,
      total,
      payMethod,
      cashGiven: payMethod === "naqd" ? cashGiven : total,
      change: payMethod === "naqd" ? change : 0,
      cashier: "Azizbek T.",
    };
    setLastReceipt(receipt);
    setStage("receipt");
  };

  const newSale = () => {
    setCart([]);
    setDiscount(0);
    setCashInput("");
    setPayMethod("naqd");
    setStage("pos");
    setLastReceipt(null);
  };

  /* notification toast */
  const showNotif = (msg, color = "green") => {
    setNotification({ msg, color });
    setTimeout(() => setNotification(null), 1800);
  };

  /* numpad for cash */
  const numpadPress = (val) => {
    if (val === "⌫") {
      setCashInput((p) => p.slice(0, -1));
    } else if (val === "C") {
      setCashInput("");
    } else {
      setCashInput((p) => p + val);
    }
  };

  /* quick cash buttons */
  const quickCash = [10000, 20000, 50000, 100000];

  return {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    products,
    categories,
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    subtotal,
    discountAmt,
    discount,
    setDiscount,
    total,
    cashInput,
    setCashInput,
    cashGiven,
    change,
    payMethod,
    setPayMethod,
    payMethods,
    stage,
    setStage,
    processPayment,
    newSale,
    lastReceipt,
    barcodeMode,
    setBarcodeMode,
    notification,
    numpadPress,
    quickCash,
    itemCount,
  };
};
