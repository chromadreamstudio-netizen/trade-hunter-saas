"use client";

import { useRouter, useParams } from "next/navigation";
import { Check, Target, Zap, Globe, ArrowLeft } from "lucide-react";

export default function PricingPage() {
  const router = useRouter();
  const params = useParams();
  const currentLangCode = (params?.lang as string) || "ar";
  const isRtl = currentLangCode === 'ar';

  // هذه الدالة سيتم ربطها بـ Stripe Checkout لاحقاً
  const handleSubscribe = (planId: string) => {
    alert(isRtl ? "سيتم توجيهك قريباً إلى بوابة الدفع (Stripe) بعد إطلاق الشركة رسمياً." : "Stripe checkout will be available soon.");
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isRtl ? 'dir-rtl' : 'dir-ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        <button onClick={() => router.push(`/${currentLangCode}/dashboard`)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} /> {isRtl ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
        </button>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">{isRtl ? 'استثمر في نمو مبيعاتك العالمية' : 'Invest in Your Global Sales Growth'}</h1>
          <p className="text-lg text-slate-400">
            {isRtl ? 'اختر الباقة المناسبة لمصنعك وانطلق نحو أسواق إفريقيا، الخليج، وأوروبا بقوة الذكاء الاصطناعي.' : 'Choose the right plan and scale your B2B sales globally with AI.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-300 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-2">$0 <span className="text-lg text-slate-500 font-normal">/month</span></div>
              <p className="text-sm text-slate-400">{isRtl ? 'لاختبار قوة محرك الصيد.' : 'To test the hunting engine.'}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> {isRtl ? 'صيد 50 عميل شهرياً' : '50 leads/month'}</li>
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> {isRtl ? 'البحث الجغرافي الأساسي' : 'Basic geo-search'}</li>
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500 shrink-0"/> {isRtl ? 'مسودات إيميل فقط' : 'Email drafts only'}</li>
            </ul>
            <button onClick={() => router.push(`/${currentLangCode}/dashboard`)} className="w-full py-4 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-700 transition">
              {isRtl ? 'البدء مجاناً' : 'Start Free'}
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-blue-900/20 border-2 border-blue-500 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {isRtl ? 'الأكثر طلباً' : 'Most Popular'}
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-400 mb-2">Pro Sales</h3>
              <div className="text-4xl font-bold text-white mb-2">$79 <span className="text-lg text-slate-400 font-normal">/month</span></div>
              <p className="text-sm text-slate-300">{isRtl ? 'للمصانع والشركات الناشئة.' : 'For growing factories.'}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white"><Check className="w-5 h-5 text-blue-400 shrink-0"/> {isRtl ? 'صيد 500 عميل شهرياً' : '500 leads/month'}</li>
              <li className="flex items-start gap-3 text-sm text-white"><Check className="w-5 h-5 text-blue-400 shrink-0"/> {isRtl ? 'مراسلة الإيميل المباشرة (Resend)' : 'Direct Email Sending'}</li>
              <li className="flex items-start gap-3 text-sm text-white"><Check className="w-5 h-5 text-blue-400 shrink-0"/> {isRtl ? 'مسودات WhatsApp مخصصة' : 'Custom WhatsApp Drafts'}</li>
              <li className="flex items-start gap-3 text-sm text-white"><Check className="w-5 h-5 text-blue-400 shrink-0"/> {isRtl ? 'ترجمة محلية لـ 5 لغات' : 'Localization in 5 languages'}</li>
            </ul>
            <button onClick={() => handleSubscribe('price_pro_xxx')} className="w-full py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 transition shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]">
              {isRtl ? 'الاشتراك في Pro' : 'Subscribe to Pro'}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-purple-400 mb-2">Omnichannel</h3>
              <div className="text-4xl font-bold text-white mb-2">$299 <span className="text-lg text-slate-500 font-normal">/month</span></div>
              <p className="text-sm text-slate-400">{isRtl ? 'للمؤسسات وقوة المبيعات الكاملة.' : 'For enterprise sales dominance.'}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-purple-400 shrink-0"/> {isRtl ? 'صيد غير محدود' : 'Unlimited hunting'}</li>
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-purple-400 shrink-0"/> {isRtl ? 'بحث الخرائط (Serper) المتقدم' : 'Advanced Map Hunting'}</li>
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-purple-400 shrink-0"/> {isRtl ? 'أتمتة WhatsApp بالكامل' : 'Full WhatsApp Automation'}</li>
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-purple-400 shrink-0"/> {isRtl ? 'دعم كافة لغات العالم' : 'All global languages'}</li>
            </ul>
            <button onClick={() => handleSubscribe('price_premium_xxx')} className="w-full py-4 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-700 transition">
              {isRtl ? 'الاشتراك في Omnichannel' : 'Subscribe to Omnichannel'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}