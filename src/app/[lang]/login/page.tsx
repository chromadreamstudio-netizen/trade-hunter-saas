"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // استدعاء أداة الاتصال

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const currentLangCode = (params?.lang as string) || "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // للتبديل بين الدخول وإنشاء الحساب

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSignUp) {
        // إنشاء حساب جديد
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("تم إنشاء الحساب بنجاح! جاري تحويلك...");
        router.push(`/${currentLangCode}/dashboard`);
      } else {
        // تسجيل دخول لحساب موجود
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(`/${currentLangCode}/dashboard`); // التوجيه للوحة التحكم
      }
    } catch (error: any) {
      setErrorMsg(error.message || "حدث خطأ أثناء المصادقة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 font-sans px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-8 text-center">
          <Link href={`/${currentLangCode}`} className="text-3xl font-bold tracking-tight text-white hover:text-slate-200 transition-colors flex justify-center items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm">T</div>
            TradeHunter<span className="text-blue-500">.ai</span>
          </Link>
          <h2 className="mt-8 text-2xl font-bold text-white">
            {isSignUp ? "إنشاء حساب جديد" : "تسجيل الدخول لحسابك"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">مرحباً بك في منصة صيد العملاء الذكية</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
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
              minLength={6}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="••••••••" 
            />
          </div>
          
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm text-center">
              {errorMsg}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full rounded-xl px-4 py-3.5 font-bold text-white transition-all ${loading ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]'}`}
          >
            {loading ? "جاري المعالجة..." : (isSignUp ? "إنشاء حساب" : "الدخول للوحة التحكم")}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          {isSignUp ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"}
          <button 
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(""); }}
            className="font-bold text-blue-500 hover:text-blue-400 ml-2 transition-colors"
          >
            {isSignUp ? "تسجيل الدخول" : "ابدأ تجربتك المجانية"}
          </button>
        </div>
      </div>
    </main>
  );
}