import { useState } from "react";

export const useSettingsLogic = () => {
  /* ── Active section ── */
  const [activeSection, setActiveSection] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Admin",
    role: "Administrator",
    email: "azizbek@biznes.uz",
    phone: "+998 90 123 45 67",
    avatar: "AT",
    store: "MegaMart Toshkent",
    language: "O'zbek",
    timezone: "Asia/Tashkent (UTC+5)",
  });

  /* ── Notifications ── */
  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    dailyReport: false,
    salesAlert: true,
    cameraAlert: true,
    systemUpdate: false,
    aiInsights: true,
    weeklyDigest: false,
  });

  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ── Security ── */
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30 daqiqa");
  const [loginHistory] = useState([
    {
      device: "Chrome / Windows",
      ip: "95.128.45.12",
      time: "Bugun, 09:14",
      status: "ok",
    },
    {
      device: "Safari / iPhone",
      ip: "95.128.45.12",
      time: "Kecha, 21:38",
      status: "ok",
    },
    {
      device: "Noma'lum qurilma",
      ip: "188.72.11.99",
      time: "3 kun oldin",
      status: "warn",
    },
  ]);

  /* ── Appearance ── */
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("blue");
  const [density, setDensity] = useState("normal");
  const [animations, setAnimations] = useState(true);

  const accentColors = [
    { key: "blue", cls: "bg-blue-500" },
    { key: "emerald", cls: "bg-emerald-500" },
    { key: "violet", cls: "bg-violet-500" },
    { key: "rose", cls: "bg-rose-500" },
    { key: "amber", cls: "bg-amber-500" },
    { key: "cyan", cls: "bg-cyan-500" },
  ];

  /* ── Integrations ── */
  const [integrations, setIntegrations] = useState([
    {
      id: "telegram",
      name: "Telegram Bot",
      desc: "Bildirishnomalar uchun",
      connected: true,
      icon: "✈️",
    },
    {
      id: "payme",
      name: "Payme",
      desc: "To'lov tizimi",
      connected: true,
      icon: "💳",
    },
    {
      id: "click",
      name: "Click",
      desc: "To'lov tizimi",
      connected: false,
      icon: "⚡",
    },
    {
      id: "1c",
      name: "1C Buxgalteriya",
      desc: "Hisobot sinxronizatsiya",
      connected: false,
      icon: "📊",
    },
    {
      id: "uzum",
      name: "Uzum Market",
      desc: "Marketplace integratsiya",
      connected: true,
      icon: "🛒",
    },
  ]);

  const toggleIntegration = (id) =>
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i)),
    );

  /* ── Camera / AI ── */
  const [cameraSettings, setCameraSettings] = useState({
    motionDetect: true,
    faceRecognition: false,
    autoRecord: true,
    resolution: "1080p",
    retention: "7 kun",
  });

  const toggleCamera = (key) =>
    setCameraSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ── Sections nav ── */
  const sections = [
    { id: "profile", label: "Profil", emoji: "👤" },
    { id: "notifications", label: "Bildirishnomalar", emoji: "🔔" },
    { id: "security", label: "Xavfsizlik", emoji: "🔒" },
    { id: "appearance", label: "Ko'rinish", emoji: "🎨" },
    { id: "integrations", label: "Integratsiyalar", emoji: "🔗" },
    { id: "cameras", label: "Kamera / AI", emoji: "📷" },
  ];

  /* ── Save toast ── */
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return {
    activeSection,
    setActiveSection,
    profile,
    setProfile,
    notifications,
    toggleNotification,
    twoFactor,
    setTwoFactor,
    sessionTimeout,
    setSessionTimeout,
    loginHistory,
    theme,
    setTheme,
    accent,
    setAccent,
    accentColors,
    density,
    setDensity,
    animations,
    setAnimations,
    integrations,
    toggleIntegration,
    cameraSettings,
    toggleCamera,
    sections,
    saved,
    handleSave,
  };
};
