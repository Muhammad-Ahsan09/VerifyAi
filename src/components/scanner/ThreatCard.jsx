"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, Activity, ArrowRight } from "lucide-react";
import SeverityBadge, { severityConfig } from "./SeverityBadge";
import ThreatScoreGauge from "./ThreatScoreGauge";
import SuspiciousKeywordList from "./SuspiciousKeywordList";

export default function ThreatCard({ result, onReset }) {
  if (!result) return null;

  const config = severityConfig[result.threatLevel] || severityConfig["Safe"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full relative group"
    >
      {/* Background Glow matching threat level */}
      <div 
        className="absolute -inset-0.5 rounded-3xl blur-xl opacity-20 transition duration-1000 group-hover:opacity-30"
        style={{ backgroundColor: config.hex }}
      />
      
      <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl overflow-hidden shadow-2xl">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <SeverityBadge level={result.threatLevel} />
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" />
                {result.confidence} Confidence
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              {result.category}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm md:text-base leading-relaxed">
              {result.summary}
            </p>
          </div>

          <div className="shrink-0 pl-0 md:pl-8 border-l-0 md:border-l border-white/10 flex flex-col items-center justify-center">
            <ThreatScoreGauge score={result.threatScore} level={result.threatLevel} size={110} />
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Explainability Column */}
          <div className="md:col-span-7 space-y-8">
            <SuspiciousKeywordList 
              explanation={result.explanation} 
              tactics={result.detectedTactics} 
            />
          </div>

          {/* Sidebar Metrics & Recommendations Column */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Emotional Manipulation Score */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Emotional Manipulation
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.emotionalManipulationScore}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: config.hex }}
                  />
                </div>
                <span className="text-sm font-bold text-foreground w-8 text-right">
                  {result.emotionalManipulationScore}%
                </span>
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                  Recommended Actions
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
                      <div className="mt-0.5 bg-primary/20 p-1 rounded-full shrink-0">
                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      </div>
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
            <RefreshCw className="h-4 w-4" /> Scan Another Item
          </button>
        </div>
      </div>
    </motion.div>
  );
}
