"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Link as LinkIcon, LayoutDashboard, History, Settings, LogOut, Bot, Target, Mail, Globe, Zap, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const currentLangCode = (params?.lang as string) || "ar";
  const isRtl = currentLangCode === 'ar';

  const [user, setUser] = useState<any>(null);
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAgent, setActiveAgent] = useState(0); // 0: none, 1: scraper, 2: profiler, 3: hunter
  const [results, setResults] = useState("");

  // التحقق من الجلسة (Session) لمنع دخول غير المشتركين
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push(`/${currentLangCode}/login`);
      } else {
        setUser(session.user);
      }
    };
    checkUser();
  }, [router, currentLangCode]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${currentLangCode}/login`);
  };

  const handleStartHunt = async () => {
    if (!targetUrl.includes("http")) return alert(isRtl ? "الرجاء إدخال رابط صحيح يبدأ بـ http" : "Please enter a valid URL starting with http");
    
    setLoading(true);
    setResults("");
    setActiveAgent(1);

    // محاكاة بصرية لانتقال الوكلاء أثناء انتظار معالجة السيرفر
    const timer1 = setTimeout(() => setActiveAgent(2), 3000);
    const timer2 = setTimeout(() => setActiveAgent(3), 6000);

    try {
      const response = await fetch("/api/generate-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_description: targetUrl, // نرسل الرابط للسيرفر الألماني ليقوم الوكيل بقراءته
          target_market: "السعودية والإمارات", // ثابتة مؤقتاً للتجربة
        }),
      });

      const data = await response.json();
      
      clearTimeout(timer1);
      clearTimeout(timer2);
      setActiveAgent(4); // وكيل المراسلة

      if (data.status === "success") {
        setResults(data.data);
      } else {
        setResults(isRtl ? "حدث خطأ في محرك الصيد: " + data.message : "Hunting error: " + data.message);
      }
    } catch (error) {
      setResults(isRtl ? "فشل الاتصال بالسيرفر المركزي." : "Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className={`flex h-screen bg-slate-950 text-slate-200 font-sans ${isRtl ? 'dir-rtl' : 'dir-ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-x border-slate-800 flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">T</div>
            <h1 className="text-xl font-bold tracking-tight text-white">TradeHunter</h1>
          </div>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl font-medium border border-blue-500/20 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            {isRtl ? 'الصيد الجديد' : 'New Hunt'}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl font-medium transition-colors">
            <History className="w-5 h-5" />
            {isRtl ? 'سجل الحملات' : 'Campaign History'}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            {isRtl ? 'الإعدادات' : 'Settings'}
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs uppercase">
              {user.email?.charAt(0)}
            </div>
            <div className="text-xs truncate text-slate-300 w-32">{user.email}</div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            {isRtl ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white">{isRtl ? 'لوحة التحكم' : 'Dashboard'}</h2>
          <div className="flex gap-4 items-center bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-emerald-400 font-medium">Premium Plan Active</span>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-2">{isRtl ? 'أطلق وكلاء الذكاء الاصطناعي' : 'Deploy AI Agents'}</h3>
            <p className="text-slate-400">{isRtl ? 'أدخل رابط موقعك وسنتولى تحليل منتجاتك وجلب العملاء لك.' : 'Enter your URL, and we will analyze your products and hunt leads for you.'}</p>
          </div>

          {/* URL Input Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <label className="block text-sm font-medium text-slate-300 mb-3 ml-1">
              {isRtl ? 'رابط الموقع الإلكتروني (Website URL)' : 'Website URL'}
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <LinkIcon className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="url" 
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://www.yourcompany.com" 
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 pl-12 pr-4 py-4 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-lg placeholder:text-slate-600"
                  disabled={loading}
                />
              </div>
              <button 
                onClick={handleStartHunt}
                disabled={loading || !targetUrl}
                className={`md:w-48 rounded-2xl px-6 py-4 font-bold text-white transition-all flex items-center justify-center gap-2 ${loading || !targetUrl ? 'bg-slate-700 cursor-not-allowed text-slate-400' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]'}`}
              >
                <Zap className={`w-5 h-5 ${loading ? 'animate-pulse' : ''}`} />
                {loading ? (isRtl ? 'جاري المعالجة...' : 'Processing...') : (isRtl ? 'بدء الصيد' : 'Start Hunt')}
              </button>
            </div>
          </div>

          {/* Agents Status / UI Feedback */}
          {activeAgent > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-lg">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-400" /> 
                {isRtl ? 'نشاط الوكلاء (Live Activity)' : 'Agents Live Activity'}
              </h4>
              
              <div className="grid md:grid-cols-4 gap-4">
                {/* Agent 1 */}
                <div className={`p-4 rounded-xl border transition-all duration-500 ${activeAgent >= 1 ? 'bg-blue-900/20 border-blue-500/50' : 'bg-slate-800/30 border-slate-800'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <Globe className={`w-6 h-6 ${activeAgent >= 1 ? 'text-blue-400' : 'text-slate-600'}`} />
                    {activeAgent > 1 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {activeAgent === 1 && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>}
                  </div>
                  <div className={`font-bold ${activeAgent >= 1 ? 'text-white' : 'text-slate-500'}`}>{isRtl ? 'وكيل القراءة' : 'Scraper'}</div>
                  <div className="text-xs text-slate-500 mt-1">{isRtl ? 'تحليل الموقع' : 'Scanning site'}</div>
                </div>

                {/* Agent 2 */}
                <div className={`p-4 rounded-xl border transition-all duration-500 ${activeAgent >= 2 ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-800/30 border-slate-800'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <Target className={`w-6 h-6 ${activeAgent >= 2 ? 'text-cyan-400' : 'text-slate-600'}`} />
                    {activeAgent > 2 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {activeAgent === 2 && <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>}
                  </div>
                  <div className={`font-bold ${activeAgent >= 2 ? 'text-white' : 'text-slate-500'}`}>{isRtl ? 'وكيل التحليل' : 'Profiler'}</div>
                  <div className="text-xs text-slate-500 mt-1">{isRtl ? 'تحديد الشريحة' : 'Building ICP'}</div>
                </div>

                {/* Agent 3 */}
                <div className={`p-4 rounded-xl border transition-all duration-500 ${activeAgent >= 3 ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-800/30 border-slate-800'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <Search className={`w-6 h-6 ${activeAgent >= 3 ? 'text-emerald-400' : 'text-slate-600'}`} />
                    {activeAgent > 3 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {activeAgent === 3 && <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>}
                  </div>
                  <div className={`font-bold ${activeAgent >= 3 ? 'text-white' : 'text-slate-500'}`}>{isRtl ? 'وكيل الصيد' : 'Hunter'}</div>
                  <div className="text-xs text-slate-500 mt-1">{isRtl ? 'استخراج البيانات' : 'Extracting data'}</div>
                </div>

                {/* Agent 4 */}
                <div className={`p-4 rounded-xl border transition-all duration-500 ${activeAgent >= 4 ? 'bg-purple-900/20 border-purple-500/50' : 'bg-slate-800/30 border-slate-800'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <Mail className={`w-6 h-6 ${activeAgent >= 4 ? 'text-purple-400' : 'text-slate-600'}`} />
                    {activeAgent === 4 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div className={`font-bold ${activeAgent >= 4 ? 'text-white' : 'text-slate-500'}`}>{isRtl ? 'وكيل المراسلة' : 'Outreach'}</div>
                  <div className="text-xs text-slate-500 mt-1">{isRtl ? 'تجهيز الرسائل' : 'Drafting emails'}</div>
                </div>
              </div>

              {activeAgent === 4 && (
                <div className="mt-6 p-4 rounded-xl bg-green-900/20 border border-green-500/30 text-green-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{isRtl ? 'اكتملت المهمة! جاري تجهيز النتائج...' : 'Mission complete! Preparing results...'}</span>
                  </div>
                  <span className="text-sm font-mono bg-green-900/50 px-2 py-1 rounded">24 Leads Found</span>
                </div>
              )}
            </div>
          )}

          {/* شاشة عرض النتائج الفعلية */}
          {results && (
            <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-lg">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" /> 
                {isRtl ? 'النتائج الحية من الخادم الألماني' : 'Live Results from Server'}
              </h4>
              <div className="text-slate-300 font-mono text-sm whitespace-pre-wrap bg-slate-950 p-6 rounded-xl border border-slate-800 max-h-96 overflow-y-auto shadow-inner">
                {results}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// أيقونة مفقودة من الاستيراد الأساسي، نضيفها هنا للتبسيط
function Search(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  )
}