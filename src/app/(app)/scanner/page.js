"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Link as LinkIcon, 
  Newspaper, 
  Image as ImageIcon, 
  UploadCloud, 
  ShieldCheck, 
  AlertTriangle,
  ChevronDown,
  RefreshCw,
  Search,
  CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ThreatCard from "@/components/scanner/ThreatCard";

// --- Sample Scams Data ---
const sampleScams = [
  {
    id: "jazzcash",
    label: "Fake JazzCash Reward",
    type: "message",
    content: "Congratulations! Your JazzCash account has received a cash reward of Rs. 50,000. Reply with your 4-digit MPIN to claim immediately. Do not share this message with anyone."
  },
  {
    id: "paypal",
    label: "Fake PayPal Warning",
    type: "message",
    content: "SECURITY ALERT: We noticed unauthorized login attempts to your PayPal account. Your account has been temporarily restricted. Please verify your identity at http://paypal-secure-auth-login.com to restore access."
  },
  {
    id: "gov",
    label: "Fake Government Aid",
    type: "message",
    content: "Govt Relief Fund 2026: You are eligible to receive a $2,500 subsidy grant. Fill out the application form here to receive direct deposit within 24 hours: https://gov-relief-apply.net/form"
  },
  {
    id: "otp",
    label: "Fake OTP Scam",
    type: "message",
    content: "Your bank account has been locked due to suspicious activity. To unlock, please provide the 6-digit OTP sent to your registered mobile number."
  },
  {
    id: "crypto",
    label: "Crypto Investment",
    type: "url",
    content: "https://binance-double-yield-promo.io/invest"
  }
];

const tabs = [
  { id: "message", label: "Message Scan", icon: MessageSquare },
  { id: "url", label: "URL Scan", icon: LinkIcon },
  { id: "news", label: "News Verification", icon: Newspaper },
  { id: "screenshot", label: "Screenshot Analysis", icon: ImageIcon },
];

export default function ThreatScanner() {
  const [activeTab, setActiveTab] = useState("message");
  const [inputValue, setInputValue] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setInputValue("");
    setScanResult(null);
  };

  const loadSample = (scam) => {
    setActiveTab(scam.type === "url" ? "url" : "message");
    setInputValue(scam.content);
    setDropdownOpen(false);
    setScanResult(null);
    toast.success(`Loaded sample: ${scam.label}`);
  };

  const handleClear = () => {
    setInputValue("");
    setScanResult(null);
    toast.info("Cleared input");
  };

  const handleAnalyze = async () => {
    if (!inputValue.trim() && activeTab !== "screenshot") {
      toast.error("Please provide some content to analyze.");
      return;
    }
    
    setIsScanning(true);
    setScanResult(null);
    
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputValue, type: activeTab })
      });
      
      if (!res.ok) {
        throw new Error("Failed to analyze content");
      }
      
      const data = await res.json();
      setScanResult(data);
      
      if (data.threatLevel === "Critical" || data.threatLevel === "High Risk") {
        toast.error(`${data.threatLevel} threat detected!`);
      } else if (data.threatLevel === "Suspicious") {
        toast.warning("Suspicious content detected.");
      } else {
        toast.success("Content appears safe.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during analysis.");
    } finally {
      setIsScanning(false);
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setInputValue(`File loaded: ${e.dataTransfer.files[0].name}`);
      toast.success("Image loaded for analysis");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Threat Scanner</h1>
          <p className="text-muted-foreground mt-1">
            Instantly analyze messages, links, and media for hidden scams using advanced AI.
          </p>
        </div>
        
        {/* Sample Scams Dropdown */}
        <div className="relative z-10">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Load Sample Scam <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-card border border-border shadow-xl rounded-xl overflow-hidden py-1"
              >
                {sampleScams.map((scam) => (
                  <button
                    key={scam.id}
                    onClick={() => loadSample(scam)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-foreground"
                  >
                    {scam.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Card className="glass-card overflow-hidden border-white/10 bg-white/[0.01]">
        {/* Custom Tabs */}
        <div className="flex overflow-x-auto border-b border-border hide-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isScanning && !scanResult ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {activeTab === "message" || activeTab === "news" ? (
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Paste the suspicious ${activeTab === "news" ? "article or claim" : "SMS, email, or message"} here...`}
                    className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
                  />
                ) : activeTab === "url" ? (
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="url"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="https://example-suspicious-link.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                ) : (
                  <div 
                    className={`relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${
                      dragActive ? "border-primary bg-primary/5" : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setInputValue(`File loaded: ${e.target.files[0].name}`);
                          toast.success("Image loaded");
                        }
                      }} 
                    />
                    <UploadCloud className={`h-10 w-10 mb-4 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-sm font-medium text-foreground">
                      {inputValue ? inputValue : "Drag and drop your screenshot here"}
                    </p>
                    {!inputValue && (
                      <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button 
                    onClick={handleClear}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Clear Input
                  </button>
                  <button 
                    onClick={handleAnalyze}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" /> Analyze Threat
                  </button>
                </div>
              </motion.div>
            ) : isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 space-y-6"
              >
                <div className="relative w-24 h-24">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-t-2 border-primary"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                  {/* Subtle pulsing glow */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">Analyzing content...</h3>
                  <div className="flex gap-1 justify-center items-center h-4 overflow-hidden text-sm text-muted-foreground">
                    <motion.div
                      animate={{ y: ["0%", "-100%", "-200%", "-300%"] }}
                      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                      className="flex flex-col"
                    >
                      <span>Cross-referencing databases</span>
                      <span>Running natural language analysis</span>
                      <span>Checking domain reputation</span>
                      <span>Synthesizing report</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <ThreatCard 
                key="result" 
                result={scanResult} 
                onReset={() => setScanResult(null)} 
              />
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
