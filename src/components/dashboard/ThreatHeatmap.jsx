"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Generate mock 24h data
const generateData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    const time = i < 10 ? `0${i}:00` : `${i}:00`;
    // Simulate higher activity during mid-day
    const base = i > 8 && i < 18 ? 40 : 10;
    const value = Math.floor(Math.random() * 30) + base;
    data.push({ time, threats: value });
  }
  return data;
};

const data = generateData();

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
        <p className="text-sm font-medium text-muted-foreground mb-1">Time: {label}</p>
        <p className="text-sm font-bold text-foreground">
          {payload[0].value} <span className="text-xs text-muted-foreground">scans</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ThreatHeatmap() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  if (!mounted) {
    return (
      <Card className="glass-card border-border/40 h-[300px]">
        <div className="w-full h-full bg-foreground/5 animate-pulse rounded-xl" />
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="h-full"
    >
      <Card className="glass-card border-border/40 h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            24h Activity Heatmap
          </CardTitle>
          <CardDescription>Volume of scans processed by time of day</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: currentTheme === "light" ? "#6b7280" : "#9ca3af", fontSize: 10 }} 
                interval={3}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: currentTheme === "light" ? "#6b7280" : "#9ca3af", fontSize: 10 }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: currentTheme === "light" ? "#f3f4f6" : "#1f2937", opacity: 0.5 }} />
              <Bar dataKey="threats" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => {
                  // Color intensity based on volume
                  let color = currentTheme === "light" ? "#93c5fd" : "#3b82f6"; // Base blue
                  if (entry.threats > 50) color = currentTheme === "light" ? "#3b82f6" : "#2563eb"; // Darker blue
                  if (entry.threats > 65) color = currentTheme === "light" ? "#8b5cf6" : "#7c3aed"; // Purple for very high
                  
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
