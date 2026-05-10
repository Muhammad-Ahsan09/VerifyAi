"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, Activity, ArrowRight, Globe, Lock, ShieldAlert, Clock, GitCommit } from "lucide-react";
import SeverityBadge, { severityConfig } from "./SeverityBadge";
import SuspiciousKeywordList from "./SuspiciousKeywordList";

export default function UrlAnalysisCard({ result, onReset }) {
  if (!result || !result.urlData) return null;

  const config = severityConfig[result.threatLevel] || severityConfig["Safe"];
  const urlData = result.urlData;

  // Invert threat score for "Trust Score" display (100 - threatScore)
  const trustScore = 100 - result.threatScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full relative group"
    >
      {/* Background Glow */}
      <div 
        className="absolute -inset-0.5 rounded-3xl blur-xl opacity-20 transition duration-1000 group-hover:opacity-30"
        style={{ backgroundColor: config.hex }}
      />
      
      <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl overflow-hidden shadow-2xl">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <SeverityBadge level={result.threatLevel} />
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                URL Reputation Analysis
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight break-all">
              {urlData.originalUrl}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base leading-relaxed">
              {result.summary}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-4xl font-black tracking-tighter" style={{ color: config.hex }}>
              {trustScore}<span className="text-xl text-muted-foreground">/100</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">
              Trust Score
            </span>
          </div>
        </div>

        {/* Domain Breakdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5 divide-x divide-y md:divide-y-0 divide-white/5 bg-white/[0.01]">
          <div className="p-4 md:p-6 flex flex-col gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Domain</span>
            <span className="text-sm font-medium text-foreground truncate">{urlData.domain}</span>
          </div>
          <div className="p-4 md:p-6 flex flex-col gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Age
            </span>
            <span className="text-sm font-medium text-foreground">
              {urlData.domainAgeDays} Days 
              {urlData.domainAgeDays < 30 && <span className="ml-2 text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">NEW</span>}
            </span>
          </div>
          <div className="p-4 md:p-6 flex flex-col gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
              <Lock className="h-3.5 w-3.5" /> Security
            </span>
            <span className={`text-sm font-medium ${urlData.isSecure ? "text-green-400" : "text-amber-500"}`}>
              {urlData.isSecure ? "HTTPS (Encrypted)" : "HTTP (Insecure)"}
            </span>
          </div>
          <div className="p-4 md:p-6 flex flex-col gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Registrar</span>
            <span className="text-sm font-medium text-foreground truncate" title={urlData.registrarName}>
              {urlData.registrarName}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Explainability & Indicators */}
          <div className="md:col-span-7 space-y-8">
            <SuspiciousKeywordList 
              explanation={result.explanation} 
              tactics={result.detectedTactics} 
            />
          </div>

          {/* Sidebar Metrics & Routing */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Redirect Chain */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <GitCommit className="h-4 w-4" /> Routing Chain
              </h4>
              <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-white/10">
                {urlData.redirectChain.map((redirectUrl, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * idx }}
                    key={idx} 
                    className="relative flex items-center gap-3 pl-8"
                  >
                    <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx === urlData.redirectChain.length - 1 && urlData.redirectChain.length > 1
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-white/10 text-muted-foreground border border-white/10"
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-xs text-foreground/80 truncate break-all" title={redirectUrl}>
                      {redirectUrl}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Recommended Actions
                </h4>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <motion.li 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      key={idx} 
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/90">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-black/40 p-4 md:px-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> 
            Analyzed by VerifyAI Enterprise Engine
          </p>
          <button 
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-foreground text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Scan Another URL
          </button>
        </div>
      </div>
    </motion.div>
  );
}
