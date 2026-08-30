import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white font-sans">
      {/* الشريط العلوي (Header) */}
      <header className="flex h-20 items-center justify-between px-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tight text-blue-500">
          TradeHunter<span className="text-white">.ai</span>
        </h1>
        <nav className="flex gap-6 items-center">
          <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">المميزات</Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">الأسعار</Link>
          <Link href="/login" className="text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
            تسجيل الدخول
          </Link>
        </nav>
      </header>

      {/* قسم البطل (Hero Section) */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 mb-8">
          🚀 الجيل الجديد من استخراج عملاء B2B
        </div>
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
          لا تبحث عن عملائك.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            دع الذكاء الاصطناعي يصطادهم لك.
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
          منصة متكاملة تعمل بنظام الوكلاء المتعددين (Multi-Agent System) لتحليل السوق، استخراج الشركات المستهدفة، ومراسلتهم تلقائياً لزيادة مبيعاتك.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] transition-all flex items-center justify-center">
            ابدأ تجربتك المجانية
          </Link>
          <button className="px-8 py-4 rounded-xl font-bold text-lg text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all">
            احجز عرضاً توضيحياً
          </button>
        </div>
      </section>

      {/* شريط الإحصائيات (Social Proof) */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">+10k</div>
            <div className="text-sm text-slate-400">عملية صيد ناجحة</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-sm text-slate-400">دقة استهداف ICP</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-slate-400">وكلاء يعملون تلقائياً</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">3x</div>
            <div className="text-sm text-slate-400">مضاعفة المبيعات</div>
          </div>
        </div>
      </section>
    </main>
  );
}