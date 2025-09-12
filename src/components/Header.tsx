import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📄</span>
          <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            README Generator
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-lg hover:bg-muted transition-colors"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;