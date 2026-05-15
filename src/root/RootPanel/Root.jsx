import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRootLogic } from "./Logic/RootLogic";
import { UserPlus, Trash2, ShieldAlert, Lock, User } from "lucide-react";

const Root = () => {
  const { users, newUser, setNewUser, addUser, deleteUser } = useRootLogic();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "Super Admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                Root <span className="text-red-500">Access</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                System Controller / Level 0
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent" />
            <h2 className="flex items-center gap-2 text-sm font-black uppercase mb-8 tracking-[0.2em] text-blue-500">
              <UserPlus size={18} /> Регистрация сотрудника
            </h2>

            <form onSubmit={addUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Имя Фамилия"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 outline-none transition-all"
                    value={newUser.fullName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fullName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500 ml-2">
                    Login Credentials
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={16}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 outline-none transition-all"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-2">
                  Salary (Monthly)
                </label>
                <input
                  type="number"
                  placeholder="Maosh summasi"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all"
                  value={newUser.salary}
                  onChange={(e) =>
                    setNewUser({ ...newUser, salary: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] mt-4"
              >
                Grant Access
              </button>
            </form>
          </div>

          {/* СПИСОК СОТРУДНИКОВ */}
          <div className="lg:col-span-2 bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                Active Staff{" "}
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded text-[10px]">
                  {users.length}
                </span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/[0.01]">
                  <tr className="text-[10px] uppercase text-slate-500 tracking-widest">
                    <th className="p-6">Employee</th>
                    <th className="p-6">Credentials</th>
                    <th className="p-6">Salary</th>
                    <th className="p-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-white/5 hover:bg-white/[0.01] transition-all"
                    >
                      <td className="p-6 uppercase italic tracking-tighter">
                        {user.fullName}
                      </td>
                      <td className="p-6">
                        <span className="text-blue-500 font-mono text-xs">
                          {user.username}
                        </span>
                      </td>
                      <td className="p-6 text-emerald-500 font-mono italic">
                        {Number(user.salary).toLocaleString()} UZS
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-3 text-slate-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
