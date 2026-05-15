import { useState } from "react";
import { ShoppingBag, Users, Package, AlertCircle, Clock } from "lucide-react";
import React from "react";

// COSTUM DINAMIC DATA

export const useDashboardLogic = () => {
  const [salesRange, setSalesRange] = useState("7 KUNLIK");
  const [productRange, setProductRange] = useState("Bugun");
  const [selectedCamera, setSelectedCamera] = useState(null);

  const chartDataMap = {
    "7 KUNLIK": [
      { date: "12 May", amount: 8200000 },
      { date: "13 May", amount: 9500000 },
      { date: "14 May", amount: 7800000 },
      { date: "15 May", amount: 11000000 },
      { date: "16 May", amount: 10500000 },
      { date: "17 May", amount: 14200000 },
      { date: "18 May", amount: 12450000 },
    ],
    "1 OY": [
      { date: "1-hafta", amount: 35000000 },
      { date: "2-hafta", amount: 42000000 },
      { date: "3-hafta", amount: 38000000 },
      { date: "4-hafta", amount: 55000000 },
    ],
    "1 YIL": [
      { date: "Jan", amount: 120000000 },
      { date: "Feb", amount: 150000000 },
      { date: "Mar", amount: 110000000 },
      { date: "Apr", amount: 180000000 },
    ],
    BARCHASI: [
      { date: "2024", amount: 1200000000 },
      { date: "2025", amount: 1500000000 },
      { date: "2026", amount: 800000000 },
    ],
  };

  const productsDataMap = {
    Bugun: [
      { name: "Cola 1L", qty: "125 ta", price: "1,250,000" },
      { name: "Non (Tandir)", qty: "98 ta", price: "980,000" },
      { name: "Pepsi 1L", qty: "76 ta", price: "760,000" },
      { name: "Lays Chips", qty: "65 ta", price: "650,000" },
      { name: "Snickers 50g", qty: "54 ta", price: "540,000" },
    ],
    Kech: [
      { name: "Orbit", qty: "200 ta", price: "1,000,000" },
      { name: "Snikers", qty: "150 ta", price: "750,000" },
      { name: "Pepsi 0.5L", qty: "120 ta", price: "600,000" },
    ],
    "Otgan hafta": [
      { name: "Cola 2L", qty: "540 ta", price: "5,400,000" },
      { name: "Non", qty: "420 ta", price: "4,200,000" },
      { name: "Yog 1L", qty: "310 ta", price: "3,100,000" },
    ],
    "Otgan oy": [
      { name: "Shakar 1kg", qty: "1200 ta", price: "12,000,000" },
      { name: "Un 2kg", qty: "980 ta", price: "9,800,000" },
      { name: "Cola 1L", qty: "870 ta", price: "8,700,000" },
    ],
  };

  const stats = [
    {
      id: 1,
      title: "Bugungi Sotuv",
      value: "12,450,000",
      icon: React.createElement(ShoppingBag, { size: 20 }),
      color: "blue",
      sub: "Kecha bilan solishtirganda",
    },
    {
      id: 2,
      title: "Umumiy Foyda",
      value: "3,250,000",
      icon: React.createElement(Users, { size: 20 }),
      color: "green",
      sub: "+22.1% o'sish",
    },
    {
      id: 3,
      title: "Jami Mahsulot",
      value: "1,234",
      icon: React.createElement(Package, { size: 20 }),
      color: "yellow",
      sub: "Yangi qo'shildi +6",
    },
  ];

  const alerts = [
    {
      id: 4,
      title: "Kam qolgan",
      value: "23",
      icon: React.createElement(AlertCircle, { size: 20 }),
      color: "red",
      sub: "Zaxira to'ldirish shart",
    },
    {
      id: 5,
      title: "Muddati o'tgan",
      value: "7",
      icon: React.createElement(Clock, { size: 20 }),
      color: "orange",
      sub: "Sotuvdan olish kerak",
    },
  ];

  return {
    salesRange,
    setSalesRange,
    productRange,
    setProductRange,
    currentChartData: chartDataMap[salesRange] || chartDataMap["7 KUNLIK"],
    currentProducts: productsDataMap[productRange] || productsDataMap["Bugun"],
    selectedCamera,
    setSelectedCamera,
    stats,
    alerts,
    inventory: [
      { name: "Cola 1L", stock: "2 ta", status: "kam" },
      { name: "Yog' 1L", stock: "1 ta", status: "kam" },
      { name: "Shakar 1kg", stock: "3 ta", status: "kam" },
      { name: "Tuz 1kg", stock: "0 ta", status: "tugagan" },
      { name: "Pepsi 1L", stock: "2 ta", status: "kam" },
    ],
  };
};
