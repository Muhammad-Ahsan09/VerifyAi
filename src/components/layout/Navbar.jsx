import Link from "next/link";
import { ShieldCheck, Bell, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
          >
            <ShieldCheck className="h-5 w-5" />
          </motion.div>
          <span className="font-semibold tracking-tight text-lg">VerifyAI</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5">
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
