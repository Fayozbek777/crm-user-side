import { useState, useEffect } from "react";

export const useRootLogic = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    fullName: "",
    role: "Worker",
    salary: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("crm_users");
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const defaultAdmin = [
        {
          id: 1,
          username: "admin",
          password: "123",
          fullName: "Asosiy Admin",
          role: "Admin",
          salary: "0",
        },
      ];
      setUsers(defaultAdmin);
      localStorage.setItem("crm_users", JSON.stringify(defaultAdmin));
    }
  }, []);

  const addUser = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;

    const updatedUsers = [...users, { ...newUser, id: Date.now() }];
    setUsers(updatedUsers);
    localStorage.setItem("crm_users", JSON.stringify(updatedUsers));

    setNewUser({
      username: "",
      password: "",
      fullName: "",
      role: "Worker",
      salary: "",
    });
  };

  const deleteUser = (id) => {
    if (window.confirm("Ushbu xodimni o'chirishni xohlaysizmi?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      localStorage.setItem("crm_users", JSON.stringify(updated));
    }
  };

  const totalSalaryFund = users.reduce(
    (acc, curr) => acc + (Number(curr.salary) || 0),
    0,
  );

  return { users, newUser, setNewUser, addUser, deleteUser, totalSalaryFund };
};
