import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Anchor } from "lucide-react";
import brasao from "@/assets/brasao-cais-nobre.png";
import marRevolto from "@/assets/mar-revolto-bg.jpg";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Subtle nautical ambient sound effect
    if (playAudio) {
      const audio = new Audio();
      audio.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltrzxnMpBSp+zPLaizsIGGS56+mgUA8MUKXh8bllHAU2j9Xxx3szBSF0xPDcjj0JE1qu6OyrWBUIQ5zd8sFuJAYuhM/z1YU1Bxttt+zjlkoODlOo5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVMQC0yh4fG9ayEGMIjR8teDNQYebsPv45pJDRBYr+fws2AaBkCY3PLEcSgEKnzL8tyOPQgZaLvt5Z1PDAxPpOLxt2IdBTiP1vPKdywFI3fH8N2RQAoVYLXp66hVFApFnt/yvmwhBjCFz/PUhDQGHW3A7eSaRw0QVqzn77BeGQc9ltnzw3ElBCp+yPPaizsIF2W56+mjTw8LUKXh8bllHAU2jtXxx3szBSF0xPDcjj0JE1qu6OyrWRQJQ53c8sFuJAYug8/y1YU2Bxtu9+rjlkoODlOo5O+zYRsGPJPZ88p3KgUme8rx3I8+CRVht+rqpVIRDEyh4PG+aiEGMIjQ8teDNQYfbsPv45lJDRBXr+fwtGAZBj+Y2/PEcSgEKn3K8tyOPQgZZ7zs5Z1PDAFLpOHxt2IdBTmP1vPKdiwFI3fH8N+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm/A7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU2jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teDNQYfb8Pv4plJDRBYr+fwtGAZBj+Y2/PEcSgEKn3K89yOPQgZZ7zs5Z5PDAFLpOHxt2IdBTmP1vPKdiwFI3fH79+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm+/7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU1jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teDNQYfb8Pv4plJDRBYr+fwtGAZBj+Y2/PEcSgEKn3K89yOPQgZZ7zs5Z5PDAFLpOHxt2IdBTmP1vPKdiwFI3fH79+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm+/7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU1jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teDNQYfb8Pv4plJDRBYr+fwtGAZBj+Y2/PEcSgEKn3K89yOPQgZZ7zs5Z5PDAFLpOHxt2IdBTmP1vPKdiwFI3fH79+RQQkUX7Xp66hWFApFnt/yv2wgBjCFz/PUhDMHHm+/7uSaSA0PVqzn77BeGQc9ltrywHElBCp9yPPbjDsIF2W56+mjUA8MUKXh8bllHAU1jtXxx3syBSF1w/HbjD4JE1mt6OyrWRUIRJzc88FwJAUug8/y1YU2Bhxtu+zjmUoPDlOn5PCzYRsGOpPY88p3KgUle8rx3I8+CRVhturqpVIRDEyh4PG+aiEGMIjQ8teD";
      audio.loop = true;
      audio.volume = 0.1;
      audio.play().catch(() => {
        // Auto-play blocked, user interaction needed
      });
      
      return () => {
        audio.pause();
      };
    }
  }, [playAudio]);

  const handleZarpar = () => {
    setPlayAudio(true);
    // Future navigation logic here
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated background with moving sea */}
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
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Animated coat of arms */}
        <div 
          className={`transition-all duration-1000 ${
            isLoaded 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <img 
              src={brasao} 
              alt="Brasão Cais Nobre" 
              className="w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_30px_rgba(239,169,74,0.3)] animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* Title */}
        <h1 
          className={`mt-8 font-cinzel text-4xl md:text-6xl font-bold text-primary tracking-wider transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ textShadow: "0 0 20px rgba(239, 169, 74, 0.5)" }}
        >
          CAIS NOBRE
        </h1>

        {/* Subtitle */}
        <p 
          className={`mt-4 font-cormorant text-lg md:text-xl text-muted-foreground italic transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Navegue no Escuro. Brinde com Sangue e Glória.
        </p>

        {/* Decorative divider */}
        <div 
          className={`mt-6 flex items-center gap-4 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <Anchor className="w-6 h-6 text-primary animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>

      {/* "Zarpar" button - bottom right */}
      <Button
        onClick={handleZarpar}
        variant="outline"
        className={`fixed bottom-8 right-8 font-cinzel text-sm tracking-widest border-primary/50 bg-background/40 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,169,74,0.5)] ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
        style={{ transitionDelay: "1s" }}
      >
        ZARPAR →
      </Button>

      {/* Mysterious quote */}
      <div 
        className={`fixed bottom-8 left-8 max-w-xs font-cormorant text-sm text-muted-foreground/70 italic transition-all duration-1000 delay-1000 ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        "Navigare necesse est, vivere non est necesse"
      </div>
    </div>
  );
};

export default Home;
