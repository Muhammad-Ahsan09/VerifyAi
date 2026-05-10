export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl py-6 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} VerifyAI. "Truth deserves verification."
        </p>
      </div>
    </footer>
  );
}
