import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "VerifyAI | Verify before you trust",
  description: "A premium AI-powered scam, phishing, and misinformation detection platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
