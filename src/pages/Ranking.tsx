import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Trophy, Medal, ArrowLeft, Star, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import logoCais from "@/assets/logo-cais-nobre-principal.png";

interface RankUser {
  id: number;
  name: string;
  level: "Navegador" | "Comendador" | "Almirante";
  points: number;
  badges: number;
  position: number;
}

const levelConfig = {
  Navegador: {
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    borderColor: "border-amber-600/30",
    icon: Anchor,
    minPoints: 0,
    maxPoints: 999
  },
  Comendador: {
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    icon: Medal,
    minPoints: 1000,
    maxPoints: 4999
  },
  Almirante: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    icon: Crown,
    minPoints: 5000,
    maxPoints: Infinity
  }
};

const Ranking = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Mock data - replace with real data from backend
  const currentUser: RankUser = {
    id: 0,
    name: "Você",
    level: "Navegador",
    points: 450,
    badges: 3,
    position: 12
  };


  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getLevelConfig = (level: RankUser["level"]) => levelConfig[level];
  const currentLevelConfig = getLevelConfig(currentUser.level);
  const CurrentLevelIcon = currentLevelConfig.icon;


  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background pb-8">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(239, 169, 74, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(239, 169, 74, 0.1) 1px, transparent 1px),
          radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)
        `,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%'
      }} />
      <div className="fixed inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 pt-6 pb-4 px-4">
        <div className={`flex items-center justify-between transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/menu")}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex flex-col items-center flex-1">
            <img src={logoCais} alt="Logo Cais Nobre" className="w-16 h-16 drop-shadow-[0_0_20px_rgba(239,169,74,0.3)]" />
            <h1 className="mt-2 font-cinzel text-xl md:text-2xl font-bold text-primary tracking-[0.3em]" style={{
              textShadow: "0 0 15px rgba(239, 169, 74, 0.4)"
            }}>
              ORDEM
            </h1>
          </div>

          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 max-w-4xl mx-auto">
        {/* Current User Card */}
        <div className={`mb-6 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Card className={`p-6 border-2 ${currentLevelConfig.borderColor} ${currentLevelConfig.bgColor} backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary font-cinzel text-xl">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-foreground mb-1">{currentUser.name}</h2>
                  <Badge className={`${currentLevelConfig.bgColor} ${currentLevelConfig.color} border ${currentLevelConfig.borderColor}`}>
                    <CurrentLevelIcon className="w-4 h-4 mr-1" />
                    {currentUser.level}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-cinzel font-bold text-primary">{currentUser.position}º</div>
                <div className="text-sm text-muted-foreground">Posição</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <Star className="w-5 h-5" />
                  <span className="text-2xl font-cinzel font-bold">{currentUser.points}</span>
                </div>
                <div className="text-sm text-muted-foreground">Pontos</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <Trophy className="w-5 h-5" />
                  <span className="text-2xl font-cinzel font-bold">{currentUser.badges}</span>
                </div>
                <div className="text-sm text-muted-foreground">Emblemas</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Level System Info */}
        <div className={`mb-6 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="font-cinzel text-lg font-bold text-primary mb-3 text-center">Sistema de Níveis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(levelConfig) as Array<keyof typeof levelConfig>).map((level) => {
              const config = levelConfig[level];
              const LevelIcon = config.icon;
              return (
                <Card key={level} className={`p-4 border ${config.borderColor} ${config.bgColor} backdrop-blur-sm`}>
                  <div className="flex items-center gap-3 mb-2">
                    <LevelIcon className={`w-6 h-6 ${config.color}`} />
                    <span className={`font-cinzel font-bold ${config.color}`}>{level}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {config.minPoints} - {config.maxPoints === Infinity ? "∞" : config.maxPoints} pontos
                  </div>
                </Card>
              );
            })}
          </div>
        </div>


        {/* Decorative quote */}
        <div className={`mt-8 text-center transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <p className="font-cormorant text-sm text-muted-foreground/60 italic">
            "A glória não está em nunca cair, mas em levantar-se sempre"
          </p>
        </div>
      </main>
    </div>
  );
};

export default Ranking;
