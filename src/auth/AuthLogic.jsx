import React, { useEffect, useState } from "react";
import LoginView from "./LoginView";
import { useNavigate } from "react-router-dom";

const AuthLogic = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "Super Admin") {
        const secretPath = import.meta.env.VITE_SUPER_ADMIN_PATH;
        navigate(`/${secretPath}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);
  const handleLogin = (e) => {
    e.preventDefault();
    setError(false);
    if (
      username === import.meta.env.VITE_SUPER_ADMIN_USER &&
      password === import.meta.env.VITE_SUPER_ADMIN_PASS
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Super Admin",
          role: "Super Admin",
        }),
      );

      const secretPath = import.meta.env.VITE_SUPER_ADMIN_PATH;
      window.location.replace(`/${secretPath}`);
      return;
    }
    if (username === "admin" && password === "admin") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Main Admin",
          role: "Admin",
        }),
      );
      window.location.href = "/";
      return;
    }
    const savedUsers = JSON.parse(localStorage.getItem("crm_users") || "[]");
    const foundUser = savedUsers.find(
      (u) => u.username === username && u.password === password,
    );

    if (foundUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: foundUser.fullName,
          role: "Worker",
        }),
      );
      window.location.replace("/");
    } else {
      setError(true);
    }
  };

  return (
    <LoginView
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      error={error}
    />
  );
};

export default AuthLogic;
