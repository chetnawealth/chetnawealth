import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";
import chetnaLogo from "@/assets/chetna-logo.png";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 p-2 -m-2 rounded-lg hover:bg-accent/5" 
            onClick={scrollToTop}
          >
            <img
              src={chetnaLogo}
              alt="Chetna Wealth logo"
              className="h-8 w-auto mr-2 select-none"
              loading="eager"
              decoding="async"
            />
            <span className="text-2xl font-bold text-primary">Chetna Wealth</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#services" 
              className="text-foreground hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-accent/10 hover:scale-105"
            >
              Services
            </a>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-accent/10 hover:scale-105"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-foreground hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-accent/10 hover:scale-105"
            >
              Contact
            </a>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="h-9 w-9 animate-theme-toggle hover:bg-accent/10 hover:scale-110 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <a href="#contact">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-all duration-200 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <a
              href="#services"
              className="block py-3 px-4 text-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-accent/10 hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="block py-3 px-4 text-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-accent/10 hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block py-3 px-4 text-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-accent/10 hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent/5 transition-all duration-200">
              <span className="text-sm text-muted-foreground">Theme</span>
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className="h-9 w-9 animate-theme-toggle hover:bg-accent/10 hover:scale-110 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <a href="#contact">Get Started</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
