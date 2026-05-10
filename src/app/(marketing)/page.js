"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Search, Image as ImageIcon, FileText, CheckCircle2, ChevronRight, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-20 px-6 min-h-[90vh]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30 blur-[120px] rounded-full bg-primary/20 mix-blend-screen" />
          <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] opacity-20 blur-[100px] rounded-full bg-cyan-400/20 mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            VerifyAI is now in beta
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
          >
            Verify before you trust.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered scam, phishing, and misinformation detection for modern communication. Instantly analyze URLs, texts, and media for hidden threats.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl font-medium transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]">
              Analyze Threat <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/10 px-8 py-3.5 rounded-xl font-medium transition-all">
              Run Live Demo
            </Link>
          </motion.div>
        </div>

        {/* Floating Glass Cards Visualization */}
        <div className="relative z-0 w-full max-w-5xl mx-auto mt-24 h-64 md:h-80 perspective-[1000px] hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-64 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-center justify-center"
          >
            <div className="w-full h-full relative overflow-hidden rounded-2xl flex flex-col p-6 gap-4">
              <div className="w-full h-8 bg-white/5 rounded-md w-1/3" />
              <div className="w-full h-4 bg-white/5 rounded-md w-3/4" />
              <div className="w-full h-4 bg-white/5 rounded-md w-1/2" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            </div>
            
            {/* Soft scan visualization */}
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              className="absolute left-0 top-0 w-full h-12 bg-gradient-to-b from-transparent via-primary/20 to-transparent blur-md"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST METRICS SECTION */}
      <section className="w-full border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold tracking-tight text-foreground">1.2M+</span>
              <span className="text-sm font-medium text-muted-foreground mt-2">Threats Analyzed</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold tracking-tight text-primary">99.8%</span>
              <span className="text-sm font-medium text-muted-foreground mt-2">Detection Accuracy</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold tracking-tight text-foreground">500k</span>
              <span className="text-sm font-medium text-muted-foreground mt-2">Community Reports</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-4xl font-bold tracking-tight text-foreground">Active</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground mt-2">Live Scanning Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE GRID */}
      <section id="features" className="w-full py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Complete threat detection suite</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI models are trained on millions of data points to instantly identify sophisticated scams that bypass traditional security filters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Scam Detection", desc: "Instantly analyze texts and emails for common fraud patterns and urgency triggers.", icon: ShieldAlert, color: "text-red-400" },
              { title: "Phishing Detection", desc: "Detect malicious domains masquerading as legitimate services.", icon: Search, color: "text-primary" },
              { title: "URL Analysis", desc: "Deep scan links for malware, redirects, and low-reputation hosts.", icon: Activity, color: "text-cyan-400" },
              { title: "Screenshot OCR", desc: "Extract text from images to analyze suspicious screenshots and receipts.", icon: FileText, color: "text-foreground" },
              { title: "Fake News Detection", desc: "Cross-reference claims against trusted databases to spot misinformation.", icon: Zap, color: "text-amber-400" },
              { title: "AI Explainability", desc: "Don't just get a score. Understand exactly why a message was flagged.", icon: ImageIcon, color: "text-purple-400" },
            ].map((feature, idx) => (
              <Card key={idx} className="glass-card p-6 border-white/5 hover:border-white/10 transition-all group hover:-translate-y-1 duration-300">
                <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="w-full py-24 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Verify any content in seconds without complicated setups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Paste Content", desc: "Input suspicious text, URLs, or upload an image." },
              { step: "02", title: "AI Analysis", desc: "Our models process the context and structure." },
              { step: "03", title: "View Results", desc: "Get an instant trust score and clear explanation." },
              { step: "04", title: "Stay Safe", desc: "Block threats before they compromise your data." },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold mb-6 text-foreground shadow-lg relative z-10">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                {/* Connecting Line */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEMO PREVIEW SECTION */}
      <section id="demo" className="w-full py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">See VerifyAI in action</h2>
          
          <div className="relative mx-auto max-w-2xl text-left">
            <Card className="glass-card overflow-hidden border-white/10 relative">
              <div className="border-b border-white/10 bg-white/5 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 text-xs font-mono text-muted-foreground">demo-scan.json</span>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm font-mono text-muted-foreground">
                  "URGENT: Your package is delayed due to unpaid customs fee. Click here to pay $2.99 or your package will be returned: http://usps-tracking-auth.com/pay"
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="p-5 rounded-xl border border-destructive/50 bg-destructive/10 relative overflow-hidden"
                >
                  <div className="flex items-start gap-4 relative z-10">
                    <ShieldAlert className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-destructive mb-1">Critical Phishing Threat Detected</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        This message mimics a postal service but links to a low-reputation domain registered 2 days ago. The urgency tactic is a common hallmark of credential harvesting scams.
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-foreground">
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-destructive" /> Domain age: 2 days</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-destructive" /> Blacklisted Host</span>
                      </div>
                    </div>
                  </div>
                  {/* Danger pulse effect */}
                  <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-destructive/5 pointer-events-none"
                  />
                </motion.div>
              </div>
            </Card>
            
            {/* Decorative background element */}
            <div className="absolute -inset-4 z-[-1] bg-gradient-to-r from-primary/20 via-cyan-400/20 to-primary/20 opacity-30 blur-2xl rounded-3xl" />
          </div>
        </div>
      </section>

    </div>
  );
}
