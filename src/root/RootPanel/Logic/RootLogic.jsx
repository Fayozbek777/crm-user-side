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
    if (saved) setUsers(JSON.parse(saved));
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
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("crm_users", JSON.stringify(updated));
  };

  return { users, newUser, setNewUser, addUser, deleteUser };
};
