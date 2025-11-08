import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoCais from "@/assets/logo-cais-nobre-vermelho.png";

export const FuturisticHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cardápio", path: "/menu" },
    { name: "Eventos", path: "/menu" },
    { name: "Sobre", path: "/menu" },
    { name: "Contato", path: "/menu" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img
              src={logoCais}
              alt="Logo"
              className="w-12 h-12 drop-shadow-[0_0_15px_rgba(242,228,200,0.4)]"
            />
            <span className="font-cinzel text-xl font-bold text-primary tracking-wider hidden sm:block">
              CAIS NOBRE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="relative text-foreground/80 hover:text-primary transition-colors duration-300 font-cormorant text-lg group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(242,228,200,0.6)]" />
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="bg-card/95 backdrop-blur-md border-t border-primary/20 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-foreground/80 hover:text-primary transition-colors duration-300 font-cormorant text-lg py-2 border-b border-primary/10 last:border-0"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
