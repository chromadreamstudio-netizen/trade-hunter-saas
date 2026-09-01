'use client';
import { useEffect, useState } from 'react';

export default function CampaignsHistory() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        // استبدل الرابط برابط سيرفرك الألماني الفعلي أو رابط الـ API
        const res = await fetch('http://178.105.30.59:8000/api/campaigns/aha384@gmail.com');
        const data = await res.json();
        if (data.status === 'success') {
          setCampaigns(data.campaigns);
        }
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">سجل الحملات السابقة</h1>
      {loading ? (
        <p className="text-gray-400">جاري تحميل السجل...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-400">لا توجد حملات مسجلة حتى الآن. ابدأ حملتك الأولى من لوحة التحكم!</p>
      ) : (
        <div className="grid gap-6">
          {campaigns.map((camp: any) => (
            <div key={camp.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-emerald-400 font-semibold">{new Date(camp.created_at).toLocaleString()}</span>
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-gray-300">السوق المستهدف: {camp.target_market}</span>
              </div>
              <p className="text-gray-300 mb-4 text-sm"><strong>الموقع المحلل:</strong> {camp.product_description}</p>
              <div className="border-t border-slate-800 pt-4">
                <h4 className="font-bold mb-3 text-sm text-indigo-400">العملاء المكتشفون ({camp.leads_data?.leads?.length || 0}):</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {camp.leads_data?.leads?.map((lead: any, idx: number) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-white text-sm mb-1">{lead.company_name}</p>
                        <p className="text-gray-400 mb-2">{lead.location}</p>
                        <p className="text-gray-300 mb-3 line-clamp-2">{lead.description}</p>
                      </div>
                      <a href={lead.website_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline mt-2 inline-block">زيارة الموقع &larr;</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}