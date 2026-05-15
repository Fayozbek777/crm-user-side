import { useState, useMemo } from "react";

export const useInventoryLogic = () => {
  // Данные для инвентаризации
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Coca-Cola 0.5L",
      systemStock: 124,
      actualStock: 124,
      category: "ichimlik",
      price: 8500,
    },
    {
      id: 2,
      name: "Baxmal Non",
      systemStock: 45,
      actualStock: 42,
      category: "non",
      price: 4000,
    },
    {
      id: 3,
      name: "Sut Kamilka",
      systemStock: 12,
      actualStock: 15,
      category: "sut",
      price: 12000,
    },
    {
      id: 4,
      name: "Snickers XL",
      systemStock: 8,
      actualStock: 8,
      category: "shirin",
      price: 7500,
    },
    {
      id: 5,
      name: "Pepsi 1.5L",
      systemStock: 88,
      actualStock: 80,
      category: "ichimlik",
      price: 13000,
    },
  ]);

  const [filter, setFilter] = useState("all"); // all | discrepancy (raznitsa)

  // Обновление фактического количества
  const updateActualStock = (id, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, actualStock: Number(value) } : item,
      ),
    );
  };

  const filteredItems = useMemo(() => {
    if (filter === "discrepancy") {
      return items.filter((i) => i.systemStock !== i.actualStock);
    }
    return items;
  }, [items, filter]);

  const stats = useMemo(() => {
    const loss = items.reduce((acc, i) => {
      const diff = i.actualStock - i.systemStock;
      return diff < 0 ? acc + Math.abs(diff) * i.price : acc;
    }, 0);

    const surplus = items.reduce((acc, i) => {
      const diff = i.actualStock - i.systemStock;
      return diff > 0 ? acc + diff * i.price : acc;
    }, 0);

    return { loss, surplus, totalItems: items.length };
  }, [items]);

  const submitAudit = () => {
    alert("Inventarizatsiya muvaffaqiyatli yakunlandi va ombor yangilandi!");
  };

  return {
    items: filteredItems,
    updateActualStock,
    filter,
    setFilter,
    stats,
    submitAudit,
  };
};
