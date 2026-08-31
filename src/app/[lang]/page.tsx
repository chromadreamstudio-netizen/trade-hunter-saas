"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Globe, Play, Bot, Target, Mail, Zap, ChevronDown, CheckCircle2 } from "lucide-react";

// استدعاء القواميس مباشرة
import ar from "../../../dictionaries/ar.json";
import en from "../../../dictionaries/en.json";
import tr from "../../../dictionaries/tr.json";

const dictionaries = { ar, en, tr };

export default function LandingPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // تحديد اللغة الحالية والقاموس المناسب
  const currentLangCode = (params?.lang as keyof typeof dictionaries) || "ar";
  const dict = dictionaries[currentLangCode] || dictionaries.ar;

  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  const currentLangName = languages.find(l => l.code === currentLangCode)?.name || "العربية";

  // محرك تغيير اللغة
  const switchLanguage = (newLangCode: string) => {
    setLangOpen(false);
    if (currentLangCode === newLangCode) return;
    
    // استبدال كود اللغة في الرابط الحالي لتوجيه المستخدم
    const newPath = pathname.replace(`/${currentLangCode}`, `/${newLangCode}`);
    router.push(newPath);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white font-sans selection:bg-blue-500/30" dir={currentLangCode === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 1. Header */}
      <header className="flex h-20 items-center justify-between px-6 md:px-12 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-bold">T</div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            TradeHunter<span className="text-blue-500">.ai</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          {/* مبدل اللغات الفعلي */}
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
            {currentLangCode === 'ar' ? 'تسجيل الدخول' : (currentLangCode === 'en' ? 'Login' : 'Giriş Yap')}
          </Link>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl leading-[1.1]">
          {dict.hero.title}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300">
            {dict.hero.subtitle}
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl leading-relaxed">
          {dict.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
          <Link href={`/${currentLangCode}/login`} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] transition-all">
            {dict.hero.startBtn}
          </Link>
        </div>

        {/* مشغل فيديو حقيقي (YouTube iFrame) بدلاً من الهيكل الوهمي */}
        <div className="mt-20 w-full max-w-4xl aspect-video rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl relative z-10">
           <iframe 
             width="100%" 
             height="100%" 
             src="https://www.youtube.com/embed/ScMzIvxBSi4?si=1T-jE6d6P1816z5F&autoplay=0&controls=1&rel=0" 
             title="TradeHunter Platform Demo" 
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen
             className="absolute top-0 left-0 w-full h-full"
           ></iframe>
        </div>
      </section>
    </main>
  );
}