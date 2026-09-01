"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { History, ArrowUpRight, Search } from "lucide-react";

export default function CampaignHistory() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // في الإنتاج، سنجلب فقط حملات المستخدم الحالي باستخدام الايميل
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setCampaigns(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <History className="w-8 h-8 text-blue-500" />
              سجل الحملات
            </h1>
            <p className="text-slate-400">راجع نتائج عمليات الصيد السابقة وقم بإدارة عملائك المحتملين.</p>
          </div>
        </header>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <div className="relative w-64">
              <input type="text" placeholder="ابحث في الروابط..." className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none" />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>
          
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">الرابط المستهدف</th>
                <th className="px-6 py-4 font-medium">عدد العملاء (Leads)</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((camp) => (
                <tr key={camp.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">{camp.target_url}</td>
                  <td className="px-6 py-4 font-bold text-white">{camp.leads_count}</td>
                  <td className="px-6 py-4 text-slate-400">{new Date(camp.created_at).toLocaleDateString('ar-EG')}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors text-xs font-bold">
                      عرض النتائج <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">لا توجد حملات سابقة.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}