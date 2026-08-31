"use client";

import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  const [market, setMarket] = useState("السعودية والإمارات");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState("");

  const handleSearch = async () => {
    if (!product) return alert("الرجاء إدخال وصف المنتج أولاً");
    
    setLoading(true);
    setResults("");

    try {
      // الاتصال عبر الجسر الداخلي (Proxy) لتخطي قيود الـ HTTPS
      const response = await fetch("/api/generate-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_description: product,
          target_market: market,
        }),
      });

      const data = await response.json();
      
      if (data.status === "success") {
        setResults(data.data);
      } else {
        setResults("حدث خطأ أثناء البحث: " + data.message);
      }
    } catch (error) {
      setResults("فشل الاتصال بالسيرفر. تأكد من تشغيل FastAPI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 font-sans">
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">TradeHunter.ai</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">System Online</span>
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">W</div>
        </div>
      </header>

      <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Autonomous B2B Lead Generator</h2>
          <p className="text-gray-500 mt-2">Enter your product. Our AI agents will analyze the ICP and hunt real companies for you.</p>
        </div>

        {/* لوحة التحكم والبحث */}
        <div className="rounded-xl border bg-white p-6 shadow-sm mb-8">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
              <input 
                type="text" 
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g., أسرّة فاخرة للقطط وخداشات خشبية" 
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
              <select 
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="السعودية والإمارات">Saudi & UAE</option>
                <option value="دول الخليج">All GCC</option>
                <option value="الولايات المتحدة الأمريكية">USA</option>
                <option value="أوروبا">Europe</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleSearch}
                disabled={loading}
                className={`w-full rounded-md px-4 py-2 font-medium text-white transition-colors ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? "Hunting Leads..." : "Start AI Hunt"}
              </button>
            </div>
          </div>
        </div>

        {/* شاشة عرض النتائج */}
        <div className="rounded-xl border bg-gray-900 p-6 shadow-sm min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">AI Terminal Output</h3>
          {loading && (
            <div className="flex items-center text-green-400 font-mono text-sm animate-pulse">
              <span className="mr-2">&gt;</span> AI Agents (Profiler & Hunter) are working... Please wait 10-20 seconds.
            </div>
          )}
          {results && (
            <div className="text-gray-100 font-mono text-sm whitespace-pre-wrap mt-2">
              {results}
            </div>
          )}
          {!loading && !results && (
            <div className="text-gray-500 font-mono text-sm">
              <span className="mr-2">&gt;</span> Waiting for command...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}