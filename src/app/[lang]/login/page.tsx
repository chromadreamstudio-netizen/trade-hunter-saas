"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // سيتم ربط هذا الجزء بـ Supabase لاحقاً
    setTimeout(() => {
      setLoading(false);
      alert("سيتم تفعيل الربط مع قاعدة البيانات قريباً!");
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 font-sans px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight text-blue-500 hover:text-blue-400 transition-colors">
            TradeHunter<span className="text-white">.ai</span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-white">تسجيل الدخول لحسابك</h2>
          <p className="mt-2 text-sm text-slate-400">مرحباً بك مجدداً في منصة صيد العملاء</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="name@company.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full rounded-xl px-4 py-3 font-bold text-white transition-all ${loading ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]'}`}
          >
            {loading ? "جاري تسجيل الدخول..." : "الدخول للوحة التحكم"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          ليس لديك حساب؟ <Link href="#" className="font-bold text-blue-500 hover:text-blue-400">ابدأ تجربتك المجانية</Link>
        </div>
      </div>
    </main>
  );
}