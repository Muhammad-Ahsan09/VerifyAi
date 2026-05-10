"use client";

import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import ThreatTrendChart from "@/components/dashboard/ThreatTrendChart";
import ThreatCategoryChart from "@/components/dashboard/ThreatCategoryChart";
import ThreatHeatmap from "@/components/dashboard/ThreatHeatmap";

export default function Dashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          Overview <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">Live</span>
        </h1>
        <p className="text-muted-foreground">
          Monitor your platform's security metrics and active threat vectors.
        </p>
      </div>

      {/* Top Metrics Cards */}
      <AnalyticsCards />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart (Takes up 2 cols on lg screens) */}
        <div className="lg:col-span-2 h-[400px]">
          <ThreatTrendChart />
        </div>
        
        {/* Category Chart (Takes up 1 col) */}
        <div className="lg:col-span-1 h-[400px]">
          <ThreatCategoryChart />
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <div className="h-[350px]">
          <ThreatHeatmap />
        </div>

        {/* Quick Actions / Recent Scan stub */}
        <div className="h-[350px] flex flex-col gap-4">
          <div className="bg-white/[0.02] border border-border/40 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold mb-2">Automate Your Security</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Connect our API directly to your email server or internal tools to scan threats automatically.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
