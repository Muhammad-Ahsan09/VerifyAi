"use client";

import { motion } from "framer-motion";
import { severityConfig } from "./SeverityBadge";

export default function ThreatScoreGauge({ score, level, size = 120, strokeWidth = 10 }) {
  const config = severityConfig[level] || severityConfig["Safe"];
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Score is 0-100, we map it to strokeDashoffset
  // For a threat gauge, 100 means full dial. 
  // Wait, if it's Safe, score is low. If Critical, score is high.
  // The gauge represents the "Threat Score", so higher is more filled.
  const fillPercentage = score / 100;
  const strokeDashoffset = circumference - fillPercentage * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background Track */}
      <svg width={size} height={size} className="transform -rotate-90 absolute inset-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          className="text-white/5"
          strokeWidth={strokeWidth}
        />
      </svg>
      
      {/* Animated Foreground Track */}
      <svg width={size} height={size} className="transform -rotate-90 absolute inset-0 drop-shadow-xl">
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={config.hex}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 6px ${config.hex}40)`
          }}
        />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`text-3xl font-bold tracking-tight ${config.color}`}
        >
          {score}
        </motion.span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">
          Score
        </span>
      </div>
    </div>
  );
}
