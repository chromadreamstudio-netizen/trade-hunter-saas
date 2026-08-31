"use client";

import Link from "next/link";
import { useState } from "react";
import { Globe, Play, Bot, Target, Mail, Zap, ChevronDown, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("العربية");

  const languages = [
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white font-sans selection:bg-blue-500/30">
      
      {/* 1. Header & Navigation */}
      <header className="flex h-20 items-center justify-between px-6 md:px-12 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">T</div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            TradeHunter<span className="text-blue-500">.ai</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">المميزات</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">آلية العمل</Link>
          <Link href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">العملاء</Link>
          
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              {currentLang}
              <ChevronDown className="w-4 h-4" />
            </button>
            {langOpen && (
              <div className="absolute top-full mt-2 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col py-1">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => { setCurrentLang(lang.name); setLangOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-blue-600/10 hover:text-blue-400 text-right transition-colors"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/login" className="text-sm font-bold bg-white text-slate-900 hover:bg-slate-200 px-6 py-2.5 rounded-full transition-all shadow-lg">
            تسجيل الدخول
          </Link>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 mb-8 backdrop-blur-sm">
          🚀 أحدث تقنيات الوكلاء المتعددين (Multi-Agent) لعام 2026
        </div>
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl leading-[1.1]">
          أدخل رابط موقعك.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300">
            واترك وكلاء الذكاء الاصطناعي يجلبون لك الصفقات.
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl leading-relaxed">
          منصة B2B متكاملة تحلل منتجاتك، تبحث عن الشركات المستهدفة في أي سوق عالمي، وتراسلهم نيابة عنك لجدولة اجتماعات المبيعات تلقائياً.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
          <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] transition-all">
            ابدأ تجربتك المجانية
          </Link>
          <button className="px-8 py-4 rounded-full font-bold text-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2">
            <Play className="w-5 h-5 text-blue-400" />
            شاهد العرض التوضيحي
          </button>
        </div>

        {/* Video Mockup */}
        <div className="mt-20 w-full max-w-5xl aspect-video rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-600/80 flex items-center justify-center backdrop-blur-md cursor-pointer group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
          {/* شريط علوي وهمي للمتصفح */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
      </section>

      {/* 3. Services / AI Agents Section */}
      <section id="features" className="py-24 px-6 md:px-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">فريق مبيعات كامل يعمل من أجلك</h3>
            <p className="text-slate-400">نظام وكلاء متعددين يتولى كل مراحل المبيعات B2B</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe className="w-8 h-8 text-blue-400" />, title: "وكيل القراءة", desc: "يمسح موقعك الإلكتروني لفهم منتجاتك وخدماتك بدقة متناهية." },
              { icon: <Target className="w-8 h-8 text-cyan-400" />, title: "وكيل التحليل", desc: "يبني ملف العميل المثالي (ICP) ويحدد نوعية الشركات التي تحتاج منتجك." },
              { icon: <Bot className="w-8 h-8 text-emerald-400" />, title: "وكيل الصيد", desc: "يبحث في الإنترنت والشبكات لجلب بيانات وروابط الشركات الحقيقية." },
              { icon: <Mail className="w-8 h-8 text-purple-400" />, title: "وكيل المراسلة", desc: "يصيغ رسائل مقنعة ومخصصة لكل شركة ويرسلها لفتح باب التفاوض." }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 transition-colors">
                <div className="mb-6 p-4 bg-slate-950 rounded-xl inline-block border border-slate-800">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-[#020617] relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-16 text-center">نتائج حقيقية لشركات حقيقية</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="flex text-yellow-500 mb-4">★★★★★</div>
              <p className="text-slate-300 mb-6 italic">"كنا نعاني في الوصول للموزعين. المنصة حللت منتجاتنا وجلبت لنا 40 موزعاً مهتماً خلال أسبوع واحد فقط. العمولات التي حققناها غطت قيمة الاشتراك لسنوات."</p>
              <div className="font-bold text-white">مدير مبيعات</div>
              <div className="text-sm text-slate-500">مصنع مستلزمات حيوانات أليفة</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 border-blue-500/30 relative">
              <div className="absolute -top-4 right-8 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full">الأكثر نجاحاً</div>
              <div className="flex text-yellow-500 mb-4">★★★★★</div>
              <p className="text-slate-300 mb-6 italic">"أفضل استثمار تقني قمنا به. وكيل المراسلة يتحدث بلغة احترافية جداً، والردود تأتي مباشرة إلى بريدنا. قفزة نوعية في المبيعات الطبية."</p>
              <div className="font-bold text-white">المدير التنفيذي</div>
              <div className="text-sm text-slate-500">شركة توريد معدات طبية</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="flex text-yellow-500 mb-4">★★★★★</div>
              <p className="text-slate-300 mb-6 italic">"النظام سلس جداً. فقط أضع رابط خدماتي البرمجية، والذكاء الاصطناعي يبحث عن الشركات التقنية التي تحتاج للتوسع."</p>
              <div className="font-bold text-white">مؤسس وكالة رقمية</div>
              <div className="text-sm text-slate-500">خدمات B2B Tech</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 px-6 md:px-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">الأسئلة الشائعة</h3>
          <div className="space-y-4">
            {[
              { q: "هل أحتاج لخبرة تقنية لاستخدام المنصة؟", a: "إطلاقاً. المنصة مصممة لتعمل ذاتياً؛ كل ما عليك فعله هو إدخال رابط موقعك الإلكتروني، وسيتكفل الوكلاء بالباقي." },
              { q: "هل الرسائل المرسلة للشركات تبدو آلية؟", a: "لا، نستخدم أحدث نماذج اللغة لتوليد رسائل مخصصة لكل شركة بناءً على تحليل نشاطهم، مما يرفع نسبة الردود بشكل كبير." },
              { q: "أين أستلم ردود العملاء المحتملين؟", a: "إذا كنت على خطة Premium، ستصلك الردود وطلبات عروض الأسعار مباشرة إلى بريدك الإلكتروني المسجل لدينا." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" /> {faq.q}
                </h4>
                <p className="text-slate-400 text-sm pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-slate-800 bg-[#020617] pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
              TradeHunter<span className="text-blue-500">.ai</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-sm mb-6">
              نحن نبني الجيل القادم من أدوات المبيعات الذكية لتمكين الشركات من التوسع الإقليمي والعالمي بكفاءة غير مسبوقة.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Globe className="w-4 h-4" /> مدعوم في الشرق الأوسط، أوروبا، وأمريكا
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">المنتج</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-blue-400">المميزات</Link></li>
              <li><Link href="#" className="hover:text-blue-400">الأسعار</Link></li>
              <li><Link href="#" className="hover:text-blue-400">حالات الاستخدام</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">قانوني</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-blue-400">شروط الاستخدام</Link></li>
              <li><Link href="#" className="hover:text-blue-400">سياسة الخصوصية</Link></li>
              <li><Link href="#" className="hover:text-blue-400">اتصل بنا</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 TradeHunter.ai. جميع الحقوق محفوظة.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-blue-500" /> Systems Operational</span>
          </div>
        </div>
      </footer>
    </main>
  );
}