"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Globe, Bot, Target, Mail, Zap, ChevronDown, CheckCircle2, ArrowRight, ShieldCheck, BarChart3, Users } from "lucide-react";

// استدعاء القواميس الخاصة بمنطقة الهيرو
import ar from "../../../dictionaries/ar.json";
import en from "../../../dictionaries/en.json";
import tr from "../../../dictionaries/tr.json";

const dictionaries = { ar, en, tr };

export default function LandingPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentLangCode = (params?.lang as keyof typeof dictionaries) || "ar";
  const dict = dictionaries[currentLangCode] || dictionaries.ar;
  const isRtl = currentLangCode === 'ar';

  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  const currentLangName = languages.find(l => l.code === currentLangCode)?.name || "العربية";

  const switchLanguage = (newLangCode: string) => {
    setLangOpen(false);
    if (currentLangCode === newLangCode) return;
    const newPath = pathname.replace(`/${currentLangCode}`, `/${newLangCode}`);
    router.push(newPath);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white font-sans selection:bg-blue-500/30" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. Header */}
      <header className="flex h-20 items-center justify-between px-6 md:px-12 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-bold">T</div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            TradeHunter<span className="text-blue-500">.ai</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            {isRtl ? 'المميزات' : (currentLangCode === 'en' ? 'Features' : 'Özellikler')}
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            {isRtl ? 'العملاء' : (currentLangCode === 'en' ? 'Testimonials' : 'Müşteriler')}
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              {currentLangName}
              <ChevronDown className="w-4 h-4" />
            </button>
            {langOpen && (
              <div className="absolute top-full mt-2 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col py-1 z-50">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-blue-600/10 hover:text-blue-400 transition-colors"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href={`/${currentLangCode}/login`} className="text-sm font-bold bg-white text-slate-900 hover:bg-slate-200 px-6 py-2.5 rounded-full transition-all shadow-lg">
            {isRtl ? 'تسجيل الدخول' : (currentLangCode === 'en' ? 'Login' : 'Giriş Yap')}
          </Link>
        </nav>
      </header>

      {/* 2. Stunning Hero Section (No Video) */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-bold text-blue-300 mb-8 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] relative z-10">
          <Zap className="w-4 h-4 mr-2 ml-2 text-yellow-400" /> 
          {isRtl ? 'منصة الوكلاء المتعددين الأولى في الشرق الأوسط وأوروبا' : (currentLangCode === 'en' ? 'The #1 Multi-Agent B2B Platform' : 'Ortadoğu ve Avrupa\'nın 1 Numaralı B2B Platformu')}
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 max-w-6xl leading-[1.1] relative z-10">
          {dict.hero.title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 drop-shadow-lg">
            {dict.hero.subtitle}
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl leading-relaxed font-medium relative z-10">
          {dict.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto z-10">
          <Link href={`/${currentLangCode}/login`} className="group bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl px-10 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.7)] transition-all flex items-center justify-center gap-3">
            {dict.hero.startBtn}
            <ArrowRight className={`w-6 h-6 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-slate-500 text-sm font-medium z-10">
          <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> {isRtl ? 'متوافق مع GDPR' : 'GDPR Compliant'}</div>
          <div className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-500" /> {isRtl ? 'بيانات محدثة 2026' : 'Updated 2026 Data'}</div>
          <div className="flex items-center gap-2"><Users className="w-5 h-5 text-purple-500" /> {isRtl ? '+10,000 عملية صيد' : '+10,000 Hunts'}</div>
        </div>
      </section>

      {/* 3. Services / AI Agents Section */}
      <section id="features" className="py-24 px-6 md:px-12 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              {isRtl ? 'فريق مبيعات ذكي يعمل من أجلك 24/7' : 'An Intelligent Sales Team Working 24/7'}
            </h3>
            <p className="text-xl text-slate-400">
              {isRtl ? 'أربعة وكلاء ذكاء اصطناعي يتولون دورة المبيعات بالكامل' : 'Four AI agents handling the entire sales cycle'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Globe className="w-10 h-10 text-blue-400" />, 
                title: isRtl ? "وكيل القراءة" : "Scraper Agent", 
                desc: isRtl ? "يمسح موقعك الإلكتروني لفهم طبيعة منتجاتك وميزتك التنافسية بدقة متناهية." : "Scans your website to deeply understand your products and competitive edge." 
              },
              { 
                icon: <Target className="w-10 h-10 text-cyan-400" />, 
                title: isRtl ? "وكيل التحليل" : "Profiler Agent", 
                desc: isRtl ? "يبني ملف العميل المثالي (ICP) ويحدد نوعية الشركات والمصانع التي تحتاج منتجك." : "Builds the Ideal Customer Profile (ICP) to target the exact companies needing your product." 
              },
              { 
                icon: <Bot className="w-10 h-10 text-emerald-400" />, 
                title: isRtl ? "وكيل الصيد" : "Hunter Agent", 
                desc: isRtl ? "يبحث في الإنترنت والشبكات العالمية لجلب بيانات وروابط الشركات الحقيقية المستهدفة." : "Hunts across the web to extract real data and links of targeted companies." 
              },
              { 
                icon: <Mail className="w-10 h-10 text-purple-400" />, 
                title: isRtl ? "وكيل المراسلة" : "Outreach Agent", 
                desc: isRtl ? "يصيغ رسائل مقنعة ومخصصة لكل شركة ويرسلها لفتح باب التفاوض وجلب الردود إليك." : "Drafts and sends highly personalized emails to open negotiations and bring replies to your inbox." 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl hover:bg-slate-800/60 hover:-translate-y-2 transition-all duration-300 group shadow-lg hover:shadow-blue-900/20">
                <div className="mb-6 p-4 bg-slate-950 rounded-2xl inline-block border border-slate-700/50 group-hover:border-blue-500/50 transition-colors">{feature.icon}</div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-slate-400 text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-[#020617] relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-20 text-center">
            {isRtl ? 'نتائج حقيقية حققها شركاؤنا' : 'Real Results from Our Partners'}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="flex text-yellow-500 mb-6 gap-1">★★★★★</div>
              <p className="text-slate-300 mb-8 text-lg italic leading-relaxed">
                {isRtl ? '"كنا نعاني في الوصول للموزعين. المنصة حللت منتجاتنا وجلبت لنا 40 موزعاً مهتماً خلال أسبوع واحد فقط. العمولات التي حققناها غطت قيمة الاشتراك لسنوات."' : '"We struggled to reach distributors. The platform found us 40 interested distributors in a week. Outstanding ROI."'}
              </p>
              <div className="font-bold text-white text-lg">{isRtl ? 'مدير مبيعات' : 'Sales Director'}</div>
              <div className="text-sm text-slate-500 mt-1">{isRtl ? 'مصنع مستلزمات حيوانات أليفة' : 'Pet Supplies Manufacturer'}</div>
            </div>
            <div className="p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-600/50 relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
              <div className="absolute -top-5 right-10 bg-blue-600 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                {isRtl ? 'الأعلى تقييماً' : 'Top Rated'}
              </div>
              <div className="flex text-yellow-500 mb-6 gap-1">★★★★★</div>
              <p className="text-slate-200 mb-8 text-lg italic leading-relaxed">
                {isRtl ? '"أفضل استثمار تقني قمنا به. وكيل المراسلة يتحدث بلغة احترافية جداً، والردود تأتي مباشرة إلى بريدنا. قفزة نوعية في مبيعاتنا الطبية."' : '"The best tech investment we made. The outreach agent speaks professionally, and replies come straight to us."'}
              </p>
              <div className="font-bold text-white text-lg">{isRtl ? 'المدير التنفيذي' : 'CEO'}</div>
              <div className="text-sm text-blue-400 mt-1">{isRtl ? 'شركة توريد معدات طبية' : 'Medical Equipment Supplier'}</div>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="flex text-yellow-500 mb-6 gap-1">★★★★★</div>
              <p className="text-slate-300 mb-8 text-lg italic leading-relaxed">
                {isRtl ? '"النظام سلس جداً. فقط أضع رابط خدماتي البرمجية، والذكاء الاصطناعي يبحث عن الشركات التي تحتاج لتحديث بنيتها التحتية."' : '"Seamless system. I just drop my software agency link, and the AI finds companies needing infrastructure updates."'}
              </p>
              <div className="font-bold text-white text-lg">{isRtl ? 'مؤسس وكالة رقمية' : 'Digital Agency Founder'}</div>
              <div className="text-sm text-slate-500 mt-1">{isRtl ? 'خدمات B2B Tech' : 'B2B Tech Services'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 px-6 md:px-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-16 text-center">
            {isRtl ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h3>
          <div className="space-y-6">
            {[
              { 
                q: isRtl ? "هل أحتاج لخبرة تقنية لاستخدام المنصة؟" : "Do I need technical expertise?", 
                a: isRtl ? "إطلاقاً. المنصة مصممة لتعمل ذاتياً؛ كل ما عليك فعله هو إدخال رابط موقعك الإلكتروني، وسيتكفل الوكلاء بالباقي." : "Not at all. Just input your website URL and our agents handle the rest." 
              },
              { 
                q: isRtl ? "هل الرسائل المرسلة للشركات تبدو آلية؟" : "Do the outreach emails sound robotic?", 
                a: isRtl ? "لا، نستخدم أحدث نماذج اللغة لتوليد رسائل مخصصة لكل شركة بناءً على تحليل نشاطهم، مما يرفع نسبة الردود بشكل كبير." : "No, we use advanced LLMs to craft hyper-personalized emails based on the target company's profile." 
              },
              { 
                q: isRtl ? "أين أستلم ردود العملاء المحتملين؟" : "Where do I receive the replies?", 
                a: isRtl ? "إذا كنت على خطة Premium، ستصلك الردود وطلبات عروض الأسعار مباشرة إلى بريدك الإلكتروني المسجل لدينا لتستكمل أنت التفاوض." : "On the Premium plan, replies and RFQs are forwarded directly to your registered inbox." 
              }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-colors">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" /> {faq.q}
                </h4>
                <p className={`text-slate-400 text-lg leading-relaxed ${isRtl ? 'pr-9' : 'pl-9'}`}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-slate-800 bg-[#020617] pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm">T</div>
              TradeHunter<span className="text-blue-500">.ai</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md mb-8 leading-relaxed">
              {isRtl ? 'نحن نبني الجيل القادم من أدوات المبيعات الذكية لتمكين الشركات من التوسع الإقليمي والعالمي بكفاءة غير مسبوقة.' : 'Building the next generation of intelligent sales tools to empower companies for global expansion.'}
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-500 bg-slate-900/50 w-fit px-4 py-2 rounded-full border border-slate-800">
              <Globe className="w-4 h-4 text-emerald-500" /> 
              {isRtl ? 'مدعوم في الشرق الأوسط، أوروبا، وأمريكا' : 'Supported in MENA, Europe, and USA'}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{isRtl ? 'المنصة' : 'Platform'}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{isRtl ? 'المميزات' : 'Features'}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{isRtl ? 'الأسعار' : 'Pricing'}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{isRtl ? 'لوحة التحكم' : 'Dashboard'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{isRtl ? 'قانوني' : 'Legal'}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{isRtl ? 'شروط الاستخدام' : 'Terms of Service'}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{isRtl ? 'اتصل بنا' : 'Contact Us'}</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800/80 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 TradeHunter.ai. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex gap-4 items-center bg-emerald-950/30 px-4 py-2 rounded-full border border-emerald-900/50">
            <span className="flex items-center gap-2 text-emerald-400 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}