import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Anchor } from "lucide-react";
import { Carousel3D } from "@/components/carousel";
import logoCais from "@/assets/logo-cais-nobre-principal.png";
import marRevolto from "@/assets/mar-revolto-bg.jpg";
import luxuryBar1 from "@/assets/highlights/luxury-bar-1.jpg";
import luxuryBar2 from "@/assets/highlights/luxury-bar-2.jpg";
import luxuryBar3 from "@/assets/highlights/luxury-bar-3.jpg";
import halloweenBar from "@/assets/highlights/halloween-bar.jpg";
import sunsetCocktail from "@/assets/highlights/sunset-cocktail.jpg";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
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

  // Carousel cards data
  const carouselCards = [
    {
      id: 1,
      title: "Happy Hour Especial",
      description: "Drinks com 30% de desconto",
      category: 'promo' as const
    },
    {
      id: 2,
      title: "Música ao Vivo",
      description: "Todas as sextas-feiras",
      category: 'event' as const
    },
    {
      id: 3,
      title: "Novo Menu",
      description: "Coquetéis exclusivos",
      category: 'menu' as const
    }
  ];


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
        {/* Hero Section */}
        <div 
          className={`flex flex-col items-center w-full max-w-md transition-all duration-1000 mb-16 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Logo */}
          <img 
            src={logoCais} 
            alt="Logo Cais Nobre"
            className="w-32 h-32 mb-6 drop-shadow-[0_0_30px_rgba(239,169,74,0.5)] animate-[float_6s_ease-in-out_infinite]"
          />
          
          {/* Title */}
          <h1 
            className="font-cinzel text-5xl md:text-6xl font-bold text-primary tracking-[0.25em] mb-4"
            style={{ textShadow: "0 0 20px rgba(239, 169, 74, 0.5)" }}
          >
            CAIS NOBRE
          </h1>
          
          <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic text-center mb-12">
            Mixologia Moderna & Experiências Exclusivas
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 mb-12 opacity-60">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <Anchor className="w-6 h-6 text-primary animate-[pulse_3s_ease-in-out_infinite]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleZarpar}
            size="lg"
            className="w-full font-cinzel tracking-wider text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(239,169,74,0.4)] hover:shadow-[0_0_40px_rgba(239,169,74,0.6)] transition-all duration-300"
          >
            Explorar Happy Hours
          </Button>
        </div>

        {/* Highlights Section */}
        <div className="w-full max-w-7xl mx-auto mb-16">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-8 text-primary">
            Destaques
          </h2>
          
          {/* Luxury Bar Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="relative group overflow-hidden rounded-lg border border-primary/30 hover:border-primary transition-all duration-300">
              <img src={luxuryBar1} alt="Bar Luxuoso" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="font-cinzel text-xl text-primary">Ambiente Exclusivo</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-primary/30 hover:border-primary transition-all duration-300">
              <img src={luxuryBar2} alt="Mixologia Premium" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="font-cinzel text-xl text-primary">Mixologia de Autor</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-primary/30 hover:border-primary transition-all duration-300">
              <img src={luxuryBar3} alt="Lounge Premium" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="font-cinzel text-xl text-primary">Lounge VIP</h3>
              </div>
            </div>
          </div>

          {/* Halloween Event */}
          <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <img src={halloweenBar} alt="Halloween no Cais Nobre" className="w-full h-full object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <h3 className="font-cinzel text-3xl text-primary mb-4">Halloween 2024</h3>
                <p className="font-cormorant text-lg text-foreground/80 mb-6">
                  Uma noite inesquecível de drinks temáticos, decoração assustadoramente elegante e música envolvente. 
                  Nossos convidados aproveitaram coquetéis exclusivos criados especialmente para a data, 
                  em um ambiente que uniu sofisticação e diversão.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel w-fit">
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>

          {/* Sunset & Ranking Carousels */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sunset Cocktail */}
            <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden">
              <img src={sunsetCocktail} alt="Sunset Cocktail" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-cinzel text-2xl text-primary mb-3">Sunset Edition</h3>
                <p className="font-cormorant text-foreground/80 mb-4">
                  Drinks inspirados no pôr do sol, com cores vibrantes e sabores tropicais que capturam a magia do entardecer.
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-cinzel">
                  Ver Coleção
                </Button>
              </div>
            </div>

            {/* Ranking */}
            <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6 flex flex-col justify-center">
              <h3 className="font-cinzel text-2xl text-primary mb-3">Ranking Exclusivo</h3>
              <p className="font-cormorant text-foreground/80 mb-4">
                Acompanhe os navegadores mais ativos e ganhe recompensas exclusivas. Cada visita, cada drink é um passo rumo ao topo.
              </p>
              <Button 
                onClick={() => navigate("/ranking")}
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-cinzel w-fit"
              >
                Saiba Mais
              </Button>
            </div>
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
