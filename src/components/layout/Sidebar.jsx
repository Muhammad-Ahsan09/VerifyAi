import Link from "next/link";
import { LayoutDashboard, ShieldAlert, Image as ImageIcon, Search, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: ShieldAlert, label: "Threat Scanner", href: "/scanner" },
  { icon: Search, label: "Phishing Checker", href: "/phishing" },
  { icon: ImageIcon, label: "Deepfake Analysis", href: "/deepfake" },
  { icon: FileText, label: "Reports", href: "/reports" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border/40 bg-background/50 backdrop-blur-xl transition-transform -translate-x-full md:translate-x-0 hidden md:block">
      <div className="flex h-full flex-col py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Platform
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all group"
              >
                <item.icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto px-4 py-4 border-t border-border/40">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
