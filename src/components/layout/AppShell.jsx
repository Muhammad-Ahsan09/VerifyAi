"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-[calc(100vh-4rem)]">
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 p-6 md:p-10"
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
}
