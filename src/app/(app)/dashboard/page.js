"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Search, Image as ImageIcon, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const stats = [
    { label: "Scams Blocked", value: "1,204", icon: ShieldCheck, color: "text-primary" },
    { label: "Phishing URLs", value: "342", icon: Search, color: "text-cyan-400" },
    { label: "Deepfakes Found", value: "89", icon: ImageIcon, color: "text-amber-400" },
    { label: "Reports Generated", value: "2,055", icon: FileText, color: "text-blue-400" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Platform Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome to VerifyAI. Monitor and analyze potential threats across different vectors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className="glass-card overflow-hidden relative group border-white/10 hover:border-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="glass-card min-h-[400px] border-white/10 flex flex-col items-center justify-center text-center p-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">Recent Scans</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your recent verification checks will appear here. Start by analyzing a URL, text, or image.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-medium transition-colors">
              New Scan
            </button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="glass-card min-h-[400px] border-white/10 flex flex-col items-center justify-center text-center p-8">
            <div className="h-16 w-16 rounded-full bg-amber-400/10 flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-amber-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Deepfake Analysis</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Upload images or video frames to our AI engine to detect subtle manipulation and deepfakes.
            </p>
            <button className="bg-white/10 hover:bg-white/20 text-foreground border border-white/10 px-6 py-2 rounded-xl font-medium transition-colors">
              Analyze Media
            </button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
