"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Link as LinkIcon, LayoutDashboard, History, Settings, LogOut, Bot, Target, Mail, Zap, MessageCircle, MapPin, Phone } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const currentLangCode = (params?.lang as string) || "ar";
  const isRtl = currentLangCode === 'ar';

  const [user, setUser] = useState<any>(null);
  const [targetUrl, setTargetUrl] = useState("");
  const [targetMarket, setTargetMarket] = useState("Kenya, Africa");
  const [loading, setLoading] = useState(false);
  const [activeAgent, setActiveAgent] = useState(0); 
  const [results, setResults] = useState<any>(null);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push(`/${currentLangCode}/login`);
      else setUser(session.user);
    };
    checkUser();
  }, [router, currentLangCode]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${currentLangCode}/login`);
  };

  const handleStartHunt = async () => {
    if (!targetUrl.includes("http")) return alert(isRtl ? "الرجاء إدخال رابط صحيح" : "Enter a valid URL");
    setLoading(true); setResults(null); setActiveAgent(1);
    const timer1 = setTimeout(() => setActiveAgent(2), 3000);
    const timer2 = setTimeout(() => setActiveAgent(3), 6000);

    try {
      const response = await fetch("/api/generate-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_description: targetUrl,
          target_market: targetMarket, 
          user_email: user?.email || "aha384@gmail.com"
        }),
      });

      const data = await response.json();
      clearTimeout(timer1); clearTimeout(timer2); setActiveAgent(4);

      if (data && data.leads) setResults(data);
      else if (data && data.error) setResults(isRtl ? "خطأ: " + data.error : "Error: " + data.error);
      else setResults(isRtl ? "خطأ غير متوقع." : "Unexpected error.");
    } catch (error: any) {
      setResults(isRtl ? "فشل الاتصال: " + error.message : "Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async (lead: any) => {
    try {
      setSendingEmail(lead.company_name);
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: lead.contact_email || 'info@example.com',
          company_name: lead.company_name,
          email_body: lead.drafted_email
        })
      });
      const data = await res.json();
      if(data.status === 'success') alert(isRtl ? `تم الإرسال لـ ${lead.company_name}!` : `Sent to ${lead.company_name}!`);
      else alert(isRtl ? `خطأ: ${data.message}` : `Error: ${data.message}`);
    } catch (err) {
      alert(isRtl ? 'فشل الاتصال.' : 'Connection failed.');
    } finally {
      setSendingEmail(null);
    }
  };

  const handleWhatsApp = (phone: string, message: string) => {
    if (!phone || phone === "N/A") return alert(isRtl ? "رقم الهاتف غير متوفر" : "Phone number not available");
    const cleanPhone = phone.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!user) return <div className="min-h-screen bg-slate-950 flex justify-center items-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className={`flex h-screen bg-slate-950 text-slate-200 font-sans ${isRtl ? 'dir-rtl' : 'dir-ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-x border-slate-800 flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">T</div>
            <h1 className="text-xl font-bold text-white">TradeHunter</h1>
          </div>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl font-medium border border-blue-500/25">
            <LayoutDashboard className="w-5 h-5" /> {isRtl ? 'الصيد الجديد' : 'New Hunt'}
          </button>
          <button onClick={() => router.push(`/${currentLangCode}/dashboard/campaigns`)} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl font-medium">
            <History className="w-5 h-5" /> {isRtl ? 'سجل الحملات' : 'Campaign History'}
          </button>
          <button onClick={() => router.push(`/${currentLangCode}/pricing`)} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl font-medium">
            <Target className="w-5 h-5" /> {isRtl ? 'الباقات والاشتراك' : 'Pricing & Plans'}
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg">
            <LogOut className="w-4 h-4" /> {isRtl ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto">
        <div className="mb-10">
          <h3 className="text-3xl font-bold text-white mb-2">{isRtl ? 'استكشاف الأسواق العالمية' : 'Global Market Hunter'}</h3>
          <p className="text-slate-400">{isRtl ? 'ابحث عن شركات حقيقية وتواصل معهم عبر الإيميل أو الواتساب فوراً.' : 'Find real companies and contact them via Email or WhatsApp instantly.'}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{isRtl ? 'رابط منتجك' : 'Product URL'}</label>
              <input type="url" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} placeholder="https://..." className="w-full rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-white focus:border-blue-500 outline-none" disabled={loading} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{isRtl ? 'الدولة المستهدفة (مثال: كينيا، إفريقيا)' : 'Target Market'}</label>
              <input type="text" value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-white focus:border-blue-500 outline-none" disabled={loading} />
            </div>
          </div>
          <button onClick={handleStartHunt} disabled={loading || !targetUrl} className={`w-full rounded-xl px-6 py-4 font-bold text-white flex justify-center gap-2 ${loading ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'}`}>
            <Zap className={`w-5 h-5 ${loading ? 'animate-pulse' : ''}`} /> {loading ? (isRtl ? 'جاري الاستكشاف وصياغة الرسائل...' : 'Hunting & Drafting...') : (isRtl ? 'بدء الصيد الشامل' : 'Start Global Hunt')}
          </button>
        </div>

        {results && results.leads && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-emerald-400">{isRtl ? 'العملاء المكتشفون من الخرائط والذكاء الاصطناعي:' : 'Discovered Leads:'}</h4>
            {results.leads.map((lead: any, idx: number) => (
              <div key={idx} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 shadow-lg">
                
                <div className="lg:w-1/3 space-y-3">
                  <h5 className="text-xl font-bold text-white">{lead.company_name}</h5>
                  <div className="flex items-start gap-2 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-red-400" /> <span>{lead.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Phone className="w-4 h-4 text-emerald-400" /> <span dir="ltr">{lead.phone_number}</span>
                  </div>
                  {lead.website_url !== "N/A" && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <LinkIcon className="w-4 h-4 text-blue-400" /> <a href={lead.website_url} target="_blank" className="hover:text-white truncate">{lead.website_url}</a>
                    </div>
                  )}
                  <div className="inline-block bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full mt-2">
                    اللغة: {lead.target_language}
                  </div>
                </div>

                <div className="lg:w-2/3 flex flex-col gap-4">
                  <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-emerald-400 flex items-center gap-2"><MessageCircle className="w-4 h-4"/> مسودة WhatsApp</span>
                      <button onClick={() => handleWhatsApp(lead.phone_number, lead.drafted_whatsapp)} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2">
                        إرسال واتساب <MessageCircle className="w-3 h-3"/>
                      </button>
                    </div>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{lead.drafted_whatsapp}</p>
                  </div>

                  <div className="bg-blue-950/20 border border-blue-900/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-blue-400 flex items-center gap-2"><Mail className="w-4 h-4"/> مسودة البريد (Cold Email)</span>
                      <button onClick={() => handleSendEmail(lead)} disabled={sendingEmail === lead.company_name} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg">
                        {sendingEmail === lead.company_name ? 'جاري الإرسال...' : 'إرسال الإيميل'}
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans">{lead.drafted_email}</pre>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}