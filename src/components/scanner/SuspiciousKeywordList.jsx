"use client";

import { motion } from "framer-motion";
import { Info, Sparkles } from "lucide-react";

const dangerousPhrases = [
  "urgency manipulation",
  "urgency tactic",
  "fake financial reward",
  "financial reward",
  "credential request",
  "unregistered domain",
  "fear-based manipulation",
  "manipulation tactics",
  "suspicious URLs",
  "phishing scams",
  "fraudulent activity"
];

// Helper to highlight phrases within text
function highlightText(text) {
  if (!text) return text;
  
  // A simple approach: split the text by words and check if they form dangerous phrases.
  // For safety and simplicity, we can do a regex replace.
  let highlightedText = text;
  
  dangerousPhrases.forEach(phrase => {
    // Case insensitive replace, wrapping in a styled span
    const regex = new RegExp(`(${phrase})`, 'gi');
    // We use a specific token to avoid replacing already replaced HTML
    highlightedText = highlightedText.replace(regex, `|HIGHLIGHT|$1|ENDHIGHLIGHT|`);
  });

  // Now split by the tokens to render React nodes
  const parts = highlightedText.split(/(\|HIGHLIGHT\||\|ENDHIGHLIGHT\|)/);
  
  let isHighlight = false;
  return parts.map((part, index) => {
    if (part === "|HIGHLIGHT|") {
      isHighlight = true;
      return null;
    }
    if (part === "|ENDHIGHLIGHT|") {
      isHighlight = false;
      return null;
    }
    if (isHighlight && part.trim()) {
      return (
        <span 
          key={index} 
          className="bg-destructive/20 text-destructive-foreground px-1.5 py-0.5 rounded-md font-medium border border-destructive/30 shadow-[0_0_10px_rgba(248,113,113,0.15)] inline-block mx-0.5 transition-all hover:bg-destructive/30"
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function SuspiciousKeywordList({ explanation, tactics = [] }) {
  return (
    <div className="space-y-4">
      {/* Explainability Panel */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors" />
        
        <div className="flex items-start gap-3 relative z-10">
          <div className="mt-1 bg-primary/20 p-1.5 rounded-lg">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
              AI Explainability
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {highlightText(explanation)}
            </p>
          </div>
        </div>
      </div>

      {/* Detected Tactics Tags */}
      {tactics.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tactics.map((tactic, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx, duration: 0.3 }}
              key={idx}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-foreground transition-colors cursor-default"
            >
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
              {tactic}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
