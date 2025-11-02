import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Map, Scroll, Lock } from "lucide-react";
import logoCais from "@/assets/logo-cais-nobre-vermelho.png";

const Menu = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      title: "Tesouros do Oriente",
      subtitle: "Elixires & Destilados Raros",
      icon: Compass,
      path: "/drinks",
      delay: "200ms",
    },
    {
      title: "Cartas de Navegação",
      subtitle: "Reservas & Coordenadas",
      icon: Map,
      path: "/reservas",
      delay: "400ms",
    },
    {
      title: "Relíquias Perdidas",
      subtitle: "Crônicas & Coleções",
      icon: Scroll,
      path: "/historia",
      delay: "600ms",
    },
    {
      title: "Câmara Secreta",
      subtitle: "Acesso Exclusivo",
      icon: Lock,
      path: "/vip",
      delay: "800ms",
    },
  ];

  const handleSectionClick = (path: string) => {
    // Sound effect placeholder
    navigate(path);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Nautical map background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 169, 74, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 169, 74, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100% 100%, 100% 100%',
        }}
      />

      {/* Decorative compass rose watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
        <Compass className="w-full h-full text-primary animate-[spin_120s_linear_infinite]" />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />

      {/* Header with logo */}
      <header className="relative z-10 pt-8 pb-4 px-4">
        <div 
          className={`flex flex-col items-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <img 
            src={logoCais} 
            alt="Logo Cais Nobre"
            className="w-24 h-24 drop-shadow-[0_0_20px_rgba(239,169,74,0.3)]"
          />
          <h1 
            className="mt-4 font-cinzel text-2xl md:text-3xl font-bold text-primary tracking-[0.3em]"
            style={{ textShadow: "0 0 15px rgba(239, 169, 74, 0.4)" }}
          >
            CAIS NOBRE
          </h1>
          <div className="mt-2 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </header>

      {/* Main content - Navigation sections */}
      <main className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
        <p 
          className={`text-center font-cormorant text-lg md:text-xl text-muted-foreground italic mb-12 transition-all duration-1000 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Escolha vosso destino, navegante...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <button
                key={section.title}
                onClick={() => handleSectionClick(section.path)}
                className={`group relative overflow-hidden rounded-lg border-2 border-primary/30 bg-background/40 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_40px_rgba(239,169,74,0.3)] hover:scale-105 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ 
                  transitionDelay: isLoaded ? section.delay : "0ms",
                }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40 transition-all duration-300 group-hover:border-primary" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/40 transition-all duration-300 group-hover:border-primary" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/40 transition-all duration-300 group-hover:border-primary" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40 transition-all duration-300 group-hover:border-primary" />

                {/* Content */}
                <div className="relative flex flex-col items-center text-center space-y-4">
                  {/* Icon with bronze engraving effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon 
                      className="w-16 h-16 text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" 
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h2 
                    className="font-cinzel text-xl md:text-2xl font-bold text-primary tracking-wider"
                    style={{ textShadow: "0 0 10px rgba(239, 169, 74, 0.3)" }}
                  >
                    {section.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="font-cormorant text-sm md:text-base text-muted-foreground italic">
                    {section.subtitle}
                  </p>

                  {/* Decorative divider */}
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            );
          })}
        </div>

        {/* Bottom quote */}
        <div 
          className={`mt-16 text-center font-cormorant text-sm text-muted-foreground/70 italic transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          "Cada jornada revela segredos que apenas os corajosos merecem conhecer"
        </div>
      </main>

      {/* Decorative anchors in corners */}
      <div className="fixed bottom-4 left-4 text-primary/20 pointer-events-none">
        <Compass className="w-8 h-8" />
      </div>
      <div className="fixed bottom-4 right-4 text-primary/20 pointer-events-none">
        <Compass className="w-8 h-8 rotate-180" />
      </div>
    </div>
  );
};

export default Menu;
