"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Users, Search, ScanFace } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const stats = [
  { label: "Total Analyses", value: 14205, icon: Search, color: "text-blue-500", suffix: "+" },
  { label: "Critical Threats", value: 342, icon: ShieldAlert, color: "text-red-500" },
  { label: "Deepfakes Found", value: 89, icon: ScanFace, color: "text-amber-500" },
  { label: "Community Reports", value: 2055, icon: Users, color: "text-purple-500" },
];

function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalDuration = 1500;
    let incrementTime = (totalDuration / end) * 2;
    if (incrementTime < 10) incrementTime = 10;

    let timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start > end) start = end;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <Card className="glass-card overflow-hidden relative group border-border/40 hover:border-border transition-colors h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`p-2 bg-foreground/5 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
