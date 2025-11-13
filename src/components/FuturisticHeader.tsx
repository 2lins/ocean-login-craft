import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoCais from "@/assets/logo-cais-nobre-principal.png";
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
  const navLinks = [{
    name: "Eventos",
    path: "/happy-hours"
  }, {
    name: "Cocktails",
    path: "/cocktails"
  }, {
    name: "Tesouro",
    path: "/ranking"
  }, {
    name: "Experiência",
    path: "/menu"
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Left spacer */}
          <div></div>
          
          {/* Logo - Centered */}
          <div className="flex items-center gap-3 cursor-pointer justify-center" onClick={() => navigate("/")}>
            <img src={logoCais} alt="Logo" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(242,228,200,0.4)]" />
            <span className="font-cinzel text-xl font-bold text-primary tracking-wider hidden sm:block">
              CAIS NOBRE
            </span>
          </div>

          <div className="hidden md:flex justify-end">
            <nav className="flex items-center gap-6">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-cinzel text-sm tracking-wide"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96" : "max-h-0"}`}>
        <nav className="bg-card/95 backdrop-blur-md border-t border-primary/20 px-4 py-6 space-y-4">
          {navLinks.map(link => <button key={link.name} onClick={() => {
          navigate(link.path);
          setIsMobileMenuOpen(false);
        }} className="block w-full text-left text-foreground/80 hover:text-primary transition-colors duration-300 font-cormorant text-lg py-2 border-b border-primary/10 last:border-0">
              {link.name}
            </button>)}
        </nav>
      </div>
    </header>;
};
