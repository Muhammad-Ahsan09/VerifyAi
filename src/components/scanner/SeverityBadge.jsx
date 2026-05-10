import { ShieldCheck, AlertTriangle, ShieldAlert, XOctagon } from "lucide-react";

export const severityConfig = {
  "Safe": {
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
    icon: ShieldCheck,
    glow: "shadow-[0_0_15px_rgba(161,161,170,0.15)]",
    hex: "#a1a1aa" // zinc-400
  },
  "Suspicious": { // Mapped to Medium/Blue
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: AlertTriangle,
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    hex: "#60a5fa" // blue-400
  },
  "High Risk": { // Mapped to High/Amber
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: ShieldAlert,
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    hex: "#f59e0b" // amber-500
  },
  "Critical": { // Mapped to Critical/Muted Red
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: XOctagon,
    glow: "shadow-[0_0_15px_rgba(248,113,113,0.15)]",
    hex: "#f87171" // red-400
  }
};

export default function SeverityBadge({ level }) {
  const config = severityConfig[level] || severityConfig["Safe"];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.border} ${config.glow}`}>
      <Icon className={`h-4 w-4 ${config.color}`} />
      <span className={`text-sm font-semibold ${config.color}`}>
        {level}
      </span>
    </div>
  );
}
