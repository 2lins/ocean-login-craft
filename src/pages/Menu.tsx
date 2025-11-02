import { useState, useEffect } from "react";
import { Gem, Compass, Crown, ScrollText, Mail } from "lucide-react";
import logoCais from "@/assets/logo-cais-nobre-vermelho.png";

type TabId = "menu" | "reservas" | "ranking" | "historia-conta" | "mensagens";

interface Tab {
  id: TabId;
  name: string;
  icon: typeof Gem;
  description: string;
}

const Menu = () => {
  const [activeTab, setActiveTab] = useState<TabId>("menu");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs: Tab[] = [
    {
      id: "menu",
      name: "Tesouros",
      icon: Gem,
      description: "Galeria dos drinks e pratos, apresentados como relíquias",
    },
    {
      id: "reservas",
      name: "Navegar",
      icon: Compass,
      description: "Reservas de mesa, eventos e mapa da casa",
    },
    {
      id: "ranking",
      name: "Ordem",
      icon: Crown,
      description: "Ranking de clientes (Almirante, Comendador)",
    },
    {
      id: "historia-conta",
      name: "Relíquias",
      icon: ScrollText,
      description: "Perfil do usuário como Diário de Bordo",
    },
    {
      id: "mensagens",
      name: "Mensagem",
      icon: Mail,
      description: "Mensagens do bar, contato e convites sociais",
    },
  ];

  const renderContent = () => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    
    return (
      <div 
        className={`flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          {activeTabData && (
            <activeTabData.icon 
              className="relative w-24 h-24 text-primary drop-shadow-[0_0_20px_rgba(239,169,74,0.4)]" 
              strokeWidth={1.5}
            />
          )}
        </div>
        
        <h2 
          className="font-cinzel text-3xl md:text-4xl font-bold text-primary tracking-wider mb-4"
          style={{ textShadow: "0 0 15px rgba(239, 169, 74, 0.4)" }}
        >
          {activeTabData?.name}
        </h2>
        
        <p className="font-cormorant text-lg md:text-xl text-muted-foreground italic max-w-md">
          {activeTabData?.description}
        </p>

        {/* Decorative divider */}
        <div className="mt-8 flex items-center gap-3 opacity-60">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </div>

        <div className="mt-12 font-cormorant text-sm text-muted-foreground/60 italic">
          "Cada seção é um continente a ser explorado"
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background pb-24">
      {/* Nautical map background */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 169, 74, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 169, 74, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%',
        }}
      />

      {/* Vignette effect */}
      <div className="fixed inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none" />

      {/* Decorative compass rose watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 pointer-events-none">
        <Compass className="w-full h-full text-primary animate-[spin_120s_linear_infinite]" />
      </div>

      {/* Header with logo */}
      <header className="relative z-10 pt-6 pb-4 px-4">
        <div 
          className={`flex flex-col items-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <img 
            src={logoCais} 
            alt="Logo Cais Nobre"
            className="w-20 h-20 drop-shadow-[0_0_20px_rgba(239,169,74,0.3)]"
          />
          <h1 
            className="mt-3 font-cinzel text-xl md:text-2xl font-bold text-primary tracking-[0.3em]"
            style={{ textShadow: "0 0 15px rgba(239, 169, 74, 0.4)" }}
          >
            CAIS NOBRE
          </h1>
          <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </header>

      {/* Main content area */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-280px)]">
        {renderContent()}
      </main>

      {/* Bottom Navigation - Fixed Footer */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t-2 border-primary/30">
        <div className="max-w-screen-xl mx-auto px-2 py-3">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary/70"
                  }`}
                >
                  {/* Decorative corners for active tab */}
                  {isActive && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
                    </>
                  )}
                  
                  {/* Glow effect on active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-lg blur-sm" />
                  )}
                  
                  {/* Icon with animation */}
                  <div className="relative">
                    <Icon 
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive 
                          ? "scale-110 drop-shadow-[0_0_8px_rgba(239,169,74,0.5)]" 
                          : "group-hover:scale-105"
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </div>
                  
                  {/* Label */}
                  <span 
                    className={`font-cinzel text-[10px] tracking-wider transition-all duration-300 ${
                      isActive ? "font-bold" : "font-medium"
                    }`}
                    style={isActive ? { textShadow: "0 0 8px rgba(239, 169, 74, 0.3)" } : {}}
                  >
                    {tab.name}
                  </span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Decorative rope border effect */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </nav>
    </div>
  );
};

export default Menu;
