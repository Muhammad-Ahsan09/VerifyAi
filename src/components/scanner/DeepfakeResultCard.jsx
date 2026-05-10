"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, Activity, ArrowRight, Video, Mic, Clock, ScanFace, FileAudio } from "lucide-react";
import SeverityBadge, { severityConfig } from "./SeverityBadge";

export default function DeepfakeResultCard({ result, onReset }) {
  if (!result) return null;

  const config = severityConfig[result.threatLevel] || severityConfig["Safe"];
  
  // Custom Authenticity Gauge styling (invert color logic since 100% Authentic = Safe/Green, 0% Authentic = Critical/Red)
  const isAuthentic = result.authenticityScore > 70;
  const isSuspicious = result.authenticityScore <= 70 && result.authenticityScore > 30;
  const gaugeColor = isAuthentic ? "#34d399" : isSuspicious ? "#f59e0b" : "#f87171";

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
                <ScanFace className="h-3.5 w-3.5" />
                Deepfake Biometric Analysis
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Analysis Complete
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base leading-relaxed">
              {result.summary}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: gaugeColor }} />
            <div className="text-4xl font-black tracking-tighter relative z-10" style={{ color: gaugeColor }}>
              {result.authenticityScore}<span className="text-xl text-muted-foreground">/100</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1 relative z-10">
              Authenticity
            </span>
          </div>
        </div>

        {/* Biometric Breakdown Grid */}
        <div className={`grid grid-cols-1 ${result.imageScore !== undefined ? '' : 'md:grid-cols-2'} border-b border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-white/[0.01]`}>
          {result.imageScore !== undefined ? (
            <div className="p-4 md:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <ScanFace className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Image Integrity</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Generative AI visual analysis</div>
                </div>
              </div>
              <div className="text-xl font-bold text-foreground">
                {result.imageScore === 100 ? "N/A" : `${result.imageScore}%`}
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 md:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Video className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Video Integrity</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Visual artifact analysis</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {result.videoScore === 100 ? "N/A" : `${result.videoScore}%`}
                </div>
              </div>
              
              <div className="p-4 md:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Mic className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Audio Integrity</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Voice cloning detection</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {result.audioScore === 100 ? "N/A" : `${result.audioScore}%`}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Anomaly Timeline */}
          <div className="md:col-span-7 space-y-6">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Detected Anomalies
            </h4>
            
            {result.anomalies && result.anomalies.length > 0 ? (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[15px] before:w-0.5 before:bg-white/10">
                {result.anomalies.map((anomaly, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * idx }}
                    key={idx} 
                    className="relative flex items-start gap-4 pl-10"
                  >
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-muted-foreground z-10 backdrop-blur-sm">
                      {anomaly.time}
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 w-full group-hover:border-white/20 transition-colors">
                      <p className="text-sm text-foreground/90">{anomaly.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-70">
                <ShieldCheck className="h-8 w-8 text-green-400 mb-2" />
                <p className="text-sm text-muted-foreground">No suspicious anomalies detected in this media file.</p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="md:col-span-5 space-y-6">
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
            <ScanFace className="h-3.5 w-3.5" /> 
            Analyzed by VerifyAI Deepfake Engine
          </p>
          <button 
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-foreground text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Scan Another File
          </button>
        </div>
      </div>
    </motion.div>
  );
}
