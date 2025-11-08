import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserStats } from "@/components/UserStats";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Anchor, Settings, LogOut, Trophy } from "lucide-react";
import logoCais from "@/assets/logo-cais-nobre-principal.png";

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLogout = () => {
    // Implementar logout futuramente
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background pb-24">
      {/* Nautical background */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 169, 74, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 169, 74, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Vignette effect */}
      <div className="fixed inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 pt-6 pb-4 px-4 border-b border-primary/20">
        <div 
          className={`flex items-center justify-between transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3">
            <img 
              src={logoCais} 
              alt="Logo Cais Nobre"
              className="w-12 h-12 drop-shadow-[0_0_20px_rgba(239,169,74,0.3)]"
            />
            <div>
              <h1 className="font-cinzel text-xl font-bold text-primary tracking-wider">
                Minha Conta
              </h1>
              <p className="font-cormorant text-sm text-muted-foreground italic">
                Navegador João Silva
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/menu")}
            className="text-muted-foreground hover:text-primary"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 py-8 max-w-2xl mx-auto">
        <div 
          className={`space-y-8 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* User Stats */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <h2 className="font-cinzel text-lg font-bold text-primary">Estatísticas</h2>
            </div>
            <UserStats />
          </section>

          {/* Progress Section */}
          <section className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Anchor className="w-5 h-5 text-primary" />
              <h2 className="font-cinzel text-lg font-bold text-primary">Sua Jornada</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-cormorant text-base text-foreground mb-3">
                  Progressão de Nível
                </h3>
                <ProgressBar current={1250} total={2000} label="Nível Navegador" />
                <p className="font-cormorant text-xs text-muted-foreground/80 italic mt-2">
                  Próximo nível: Comendador (faltam 750 pontos)
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <div>
                <h3 className="font-cormorant text-base text-foreground mb-3">
                  Missões em Andamento
                </h3>
                <ProgressBar current={3} total={5} label="Missões Ativas" />
                <p className="font-cormorant text-xs text-muted-foreground/80 italic mt-2">
                  Complete mais 2 missões para desbloquear recompensas
                </p>
              </div>
            </div>
          </section>

          {/* Account Info */}
          <section className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
            <h2 className="font-cinzel text-lg font-bold text-primary mb-4">
              Informações da Conta
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="font-cormorant text-sm text-muted-foreground">Email</span>
                <span className="font-cormorant text-sm text-foreground">joao.silva@email.com</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="font-cormorant text-sm text-muted-foreground">Membro desde</span>
                <span className="font-cormorant text-sm text-foreground">Janeiro 2025</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-cormorant text-sm text-muted-foreground">Visitas</span>
                <span className="font-cormorant text-sm text-foreground">12 visitas</span>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => navigate("/menu")}
              className="w-full font-cinzel tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Voltar ao Menu
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full font-cinzel tracking-wider border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair da Conta
            </Button>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 pt-4 opacity-60 justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </main>

      {/* Quote */}
      <div className="fixed bottom-6 left-0 right-0 z-20">
        <p className="font-cormorant text-sm text-muted-foreground/60 italic text-center px-4">
          "Cada visita é uma nova descoberta no mar da nobreza"
        </p>
      </div>
    </div>
  );
};

export default Profile;
