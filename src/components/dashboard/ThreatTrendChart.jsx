"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const data = [
  { name: "Mon", threats: 120 },
  { name: "Tue", threats: 210 },
  { name: "Wed", threats: 180 },
  { name: "Thu", threats: 290 },
  { name: "Fri", threats: 250 },
  { name: "Sat", threats: 320 },
  { name: "Sun", threats: 450 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-xl font-bold text-foreground">
          {payload[0].value} <span className="text-sm font-medium text-muted-foreground">threats</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ThreatTrendChart() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const strokeColor = currentTheme === "light" ? "#3b82f6" : "#60a5fa";
  const stopColor = currentTheme === "light" ? "#3b82f6" : "#60a5fa";

  if (!mounted) {
    return (
      <Card className="glass-card border-border/40 h-[400px]">
        <div className="w-full h-full bg-foreground/5 animate-pulse rounded-xl" />
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="glass-card border-border/40 h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                7-Day Threat Trend
              </CardTitle>
              <CardDescription>Daily volume of detected malicious content</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={stopColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={stopColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={currentTheme === "light" ? "#e5e7eb" : "#374151"} opacity={0.5} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: currentTheme === "light" ? "#6b7280" : "#9ca3af", fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: currentTheme === "light" ? "#6b7280" : "#9ca3af", fontSize: 12 }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: currentTheme === "light" ? "#9ca3af" : "#4b5563", strokeWidth: 1, strokeDasharray: "3 3" }} />
              <Area 
                type="monotone" 
                dataKey="threats" 
                stroke={strokeColor} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorThreats)" 
                activeDot={{ r: 6, fill: strokeColor, stroke: currentTheme === "light" ? "#ffffff" : "#1f2937", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
