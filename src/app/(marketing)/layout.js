import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <MarketingNavbar />
      <main className="flex-1 flex flex-col mt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
