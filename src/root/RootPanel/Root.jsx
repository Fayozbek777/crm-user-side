import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRootLogic } from "./Logic/RootLogic";
import {
  ShieldCheck,
  UserPlus,
  Users,
  Trash2,
  Key,
  Wallet,
  Briefcase,
  UserCircle,
  Lock,
  Settings,
  ShieldAlert,
} from "lucide-react";

const fmt = (n) => Number(n).toLocaleString("uz-UZ") + " so'm";

export default function Root() {
  const { users, newUser, setNewUser, addUser, deleteUser, totalSalaryFund } =
    useRootLogic();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-700">
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Root Control
            </h1>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <Lock size={14} className="text-indigo-500" /> Tizim boshqaruvi va
              xavfsizlik
            </p>
          </div>
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Oylik jamg'arma
          </p>
          <p className="text-xl font-black text-indigo-600">
            {fmt(totalSalaryFund)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- Create User Form --- */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-8"
          >
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <UserPlus className="text-indigo-600" size={24} /> Yangi xodim
            </h2>

            <form onSubmit={addUser} className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">
                  F.I.SH
                </label>
                <div className="relative">
                  <UserCircle
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-medium"
                    placeholder="Azizbek Temirov"
                    value={newUser.fullName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Login
                  </label>
                  <input
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold"
                    placeholder="username"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Parol
                  </label>
                  <div className="relative">
                    <Key
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                      size={16}
                    />
                    <input
                      type="password"
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold"
                      placeholder="••••"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Rol
                  </label>
                  <select
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="Worker">Sotuvchi</option>
                    <option value="Manager">Menejer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Oylik
                  </label>
                  <input
                    type="number"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-emerald-600"
                    placeholder="0.00"
                    value={newUser.salary}
                    onChange={(e) =>
                      setNewUser({ ...newUser, salary: e.target.value })
                    }
                  />
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black mt-4 shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Settings size={20} /> Ro'yxatdan o'tkazish
              </button>
            </form>
          </motion.div>
        </div>

        {/* --- Users List --- */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Users className="text-indigo-600" size={24} /> Tizim
                foydalanuvchilari
              </h2>
              <span className="bg-slate-100 px-4 py-1 rounded-full text-xs font-black text-slate-500">
                Jami: {users.length} ta
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Foydalanuvchi</th>
                    <th className="px-6 py-4">Rol</th>
                    <th className="px-6 py-4">Maosh</th>
                    <th className="px-8 py-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {users.map((u) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${u.role === "Admin" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
                            >
                              {u.fullName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800">
                                {u.fullName}
                              </div>
                              <div className="text-xs text-slate-400">
                                @{u.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <RoleBadge role={u.role} />
                        </td>
                        <td className="px-6 py-5 font-bold text-slate-600">
                          {fmt(u.salary)}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RoleBadge = ({ role }) => {
  const cfg = {
    Admin: "bg-indigo-50 text-indigo-600 border-indigo-100",
    Manager: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Worker: "bg-slate-50 text-slate-500 border-slate-100",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${cfg[role]}`}
    >
      {role === "Worker" ? "Sotuvchi" : role}
    </span>
  );
};
