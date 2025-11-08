import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserStats } from "@/components/UserStats";
import { ProgressBar } from "@/components/ProgressBar";
import { Anchor } from "lucide-react";
import logoCais from "@/assets/logo-cais-nobre-vermelho.png";
import marRevolto from "@/assets/mar-revolto-bg.jpg";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    
    if (playAudio) {
      const audio = new Audio();
      audio.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltrzxnMpBSp+zPLaizsIGGS56+mgUA8MUKXh8bllHAU2j9Xxx3szBSF0xPDcjj0JE1qu6OyrWBUIQ5zd8sFuJAYuhM/z1YU1Bxttt+zjlkoODlOo5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVMQC0yh4fG9ayEGMIjR8teDNQYebsPv45pJDRBYr+fws2AaBkCY3PLEcSgEKnzL8tyOPQgZaLvt5Z1PDAxPpOLxt2IdBTiP1vPKdywFI3fH8N2RQAoVYLXp66hVFApFnt/yvmwhBjCFz/PUhDQGHW3A7eSaRw0QVqzn77BeGQc9ltnzw3ElBCp+yPPaizsIF2W56+mjTw8LUKXh8bllHAU2jtXxx3szBSF0xPDcjj0JE1qu6OyrWRQJQ53c8sFuJAYug8/y1YU2Bxtu9+rjlkoODlOo5O+zYRsGPJPZ88p3KgUme8rx3I8+CRVht+rqpVIRDEyh4PG+aiEGMIjQ8teDNQYfbsPv45lJDRBXr+fwtGAZBj+Y2/PEcSgEKn3K8tyOPQgZZ7zs5Z1PDAFLpOHxt2IdBTmP1vPKdiwFI3fH8N+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm/A7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU2jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teDNQYfb8Pv4plJDRBYr+fwtGAZBj+Y2/PEcSgEKn3K89yOPQgZZ7zs5Z5PDAFLpOHxt2IdBTmP1vPKdiwFI3fH79+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm+/7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU1jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teDNQYfb8Pv4plJDRBYr+fwtGAZBj+Y2/PEcSgEKn3K89yOPQgZZ7zs5Z5PDAFLpOHxt2IdBTmP1vPKdiwFI3fH79+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm+/7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU1jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teDNQYfb8Pv4plJDRBYr+fwtGAZBj+Y2/PEcSgEKn3K89yOPQgZZ7zs5Z5PDAFLpOHxt2IdBTmP1vPKdiwFI3fH79+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm+/7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU1jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teD";
      audio.loop = true;
      audio.volume = 0.1;
      audio.play().catch(() => {
        // Auto-play blocked
      });
      
      return () => {
        audio.pause();
      };
    }
  }, [playAudio]);

  const handleZarpar = () => {
    setPlayAudio(true);
    navigate("/menu");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-[pulse_8s_ease-in-out_infinite]"
        style={{
          backgroundImage: `url(${marRevolto})`,
          filter: "brightness(0.4) contrast(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div 
          className={`flex flex-col items-center w-full max-w-md transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Logo */}
          <img 
            src={logoCais} 
            alt="Logo Cais Nobre"
            className="w-24 h-24 mb-4 drop-shadow-[0_0_30px_rgba(239,169,74,0.5)]"
          />
          
          {/* Title */}
          <h1 
            className="font-cinzel text-4xl md:text-5xl font-bold text-primary tracking-[0.2em] mb-2"
            style={{ textShadow: "0 0 20px rgba(239, 169, 74, 0.5)" }}
          >
            CAIS NOBRE
          </h1>
          
          <p className="font-cormorant text-lg text-muted-foreground italic text-center mb-8">
            Mixologia Moderna & Experiências Exclusivas
          </p>

          {/* User Stats */}
          <div className="w-full mb-6">
            <UserStats />
          </div>

          {/* Progress Section */}
          <div className="w-full bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-5 h-5 text-primary" />
              <h2 className="font-cinzel text-lg font-bold text-primary">Sua Jornada</h2>
            </div>
            <div className="space-y-4">
              <ProgressBar current={1250} total={2000} label="Nível Navegador" />
              <ProgressBar current={3} total={5} label="Missões Ativas" />
            </div>
            <p className="font-cormorant text-xs text-muted-foreground/80 italic mt-4 text-center">
              Próximo nível: Comendador
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleZarpar}
            size="lg"
            className="w-full font-cinzel tracking-wider text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(239,169,74,0.4)] hover:shadow-[0_0_40px_rgba(239,169,74,0.6)] transition-all duration-300"
          >
            Explorar Happy Hours
          </Button>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 mt-8 opacity-60">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>

      {/* Quote */}
      <div 
        className={`fixed bottom-6 left-0 right-0 z-20 transition-all duration-700 delay-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-cormorant text-sm text-muted-foreground/60 italic text-center px-4">
          "Navegue nas águas da nobreza e descubra tesouros além do horizonte"
        </p>
      </div>
    </div>
  );
};

export default Home;
