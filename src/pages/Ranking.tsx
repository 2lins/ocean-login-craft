import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, ArrowLeft, Anchor, MapPin, Navigation, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import logoCais from "@/assets/logo-cais-nobre-principal.png";

interface RankUser {
  id: number;
  name: string;
  points: number;
  badges: number;
  position: number;
}

const levelConfig = {
  Grumete: {
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: Anchor,
    minPoints: 0,
    maxPoints: 199
  },
  Marinheiro: {
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: MapPin,
    minPoints: 200,
    maxPoints: 399
  },
  Contramestre: {
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: Navigation,
    minPoints: 400,
    maxPoints: 699
  },
  Capitão: {
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: Flag,
    minPoints: 700,
    maxPoints: 1199
  },
  Almirante: {
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: Crown,
    minPoints: 1200,
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
    points: 450,
    badges: 3,
    position: 12
  };


  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const levelsOrder = ["Grumete", "Marinheiro", "Contramestre", "Capitão", "Almirante"] as const;
  type LevelKey = typeof levelsOrder[number];
  const getVariantFromPoints = (p: number): LevelKey => {
    if (p <= levelConfig.Grumete.maxPoints) return "Grumete";
    if (p <= levelConfig.Marinheiro.maxPoints) return "Marinheiro";
    if (p <= levelConfig.Contramestre.maxPoints) return "Contramestre";
    if (p <= levelConfig.Capitão.maxPoints) return "Capitão";
    return "Almirante";
  };
  const currentVariant: LevelKey = getVariantFromPoints(currentUser.points);
  const currentLevelConfig = levelConfig[currentVariant];
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
                  <h2 className="font-cinzel text-2xl font-bold text-foreground mb-1">{currentVariant} {currentUser.name}</h2>
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

            <div className="pt-6 border-t border-primary/20">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-8 right-8 top-1/2 h-px bg-amber-500/30" />
                {levelsOrder.map((lvl) => {
                  const Icon = levelConfig[lvl].icon;
                  const isCurrent = lvl === currentVariant;
                  return (
                    <div key={lvl} className="relative flex flex-col items-center text-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border ${isCurrent ? 'border-amber-400 bg-amber-400/20' : 'border-amber-500/30 bg-amber-500/10'} shadow`}>
                        <Icon className={`${isCurrent ? 'text-amber-300' : 'text-amber-500'} w-6 h-6`} />
                      </div>
                      <span className="mt-2 font-cinzel text-sm text-amber-400">{lvl}</span>
                    </div>
                  );
                })}
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
