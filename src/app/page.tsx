export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* الشريط العلوي */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">TradeHunter.ai</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500">Broker Mode: Active</span>
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">W</div>
        </div>
      </header>

      {/* محتوى لوحة القيادة */}
      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Enterprise B2B Lead Generation</h2>
          <p className="text-gray-500 mt-1">Autonomous SDR engine powered by Groq & CrewAI.</p>
        </div>

        {/* كروت الإحصائيات الأولية */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {[
            { title: "Total Leads Discovered", value: "0", label: "Awaiting Next Scan" },
            { title: "Active Campaigns", value: "0", label: "Ready to Launch" },
            { title: "Estimated Commission", value: "$0", label: "Broker Mode" }
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* مساحة ربط الذكاء الاصطناعي القادمة */}
        <div className="rounded-xl border bg-white p-8 shadow-sm text-center">
          <h3 className="text-lg font-semibold text-gray-900">AI Command Center</h3>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            The frontend is live. The backend is ready on the German VPS. Next step: Connecting the Hunter Agent to start scraping B2B data.
          </p>
        </div>
      </div>
    </main>
  );
}