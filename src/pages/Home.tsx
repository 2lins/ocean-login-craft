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
  const carouselCards = [{
    id: 1,
    title: "Happy Hour Especial",
    description: "Drinks com 30% de desconto",
    category: 'promo' as const
  }, {
    id: 2,
    title: "Música ao Vivo",
    description: "Todas as sextas-feiras",
    category: 'event' as const
  }, {
    id: 3,
    title: "Novo Menu",
    description: "Coquetéis exclusivos",
    category: 'menu' as const
  }];
  return <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 bg-cover bg-center animate-[pulse_8s_ease-in-out_infinite]" style={{
      backgroundImage: `url(${marRevolto})`,
      filter: "brightness(0.4) contrast(1.1)"
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Hero Section */}
        <div className={`flex flex-col items-center w-full max-w-md transition-all duration-1000 mb-16 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Logo */}
          <img src={logoCais} alt="Logo Cais Nobre" className="w-32 h-32 mb-6 drop-shadow-[0_0_30px_rgba(239,169,74,0.5)] animate-[float_6s_ease-in-out_infinite]" />
          
          {/* Title */}
          
          
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
          <Button onClick={handleZarpar} size="lg" className="w-full font-cinzel tracking-wider text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(239,169,74,0.4)] hover:shadow-[0_0_40px_rgba(239,169,74,0.6)] transition-all duration-300">
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
                <h3 className="font-cinzel text-xl text-primary">Ranking</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-primary/30 hover:border-primary transition-all duration-300">
              <img src={luxuryBar2} alt="Mixologia Premium" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="font-cinzel text-xl text-primary">Noble experience   </h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-primary/30 hover:border-primary transition-all duration-300">
              <img src={luxuryBar3} alt="Lounge Premium" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="font-cinzel text-xl text-primary">happy hour     </h3>
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

          {/* Missões do Navegador - Gamificação */}
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="font-cinzel text-4xl font-bold text-center mb-8 text-primary">
              Missões do Navegador
            </h2>
            
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {/* Tarefa 1: Completar Registro */}
              <div className="bg-card/30 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-8 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-cinzel text-2xl text-primary mb-2">Completar Perfil</h3>
                    <p className="font-cormorant text-foreground/80">
                      Finalize seu cadastro e ganhe <span className="text-primary font-bold">10 pontos</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-foreground/70">Nome completo</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-foreground/70">Número de telefone</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-foreground/70">Data de nascimento</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 font-cinzel" onClick={() => navigate('/profile')}>
                  Completar Agora
                </Button>
              </div>

              {/* Tarefa 2: Compartilhar WhatsApp */}
              <div className="bg-card/30 backdrop-blur-sm border-2 border-green-500/30 rounded-lg p-8 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-cinzel text-2xl text-green-500 mb-2">Compartilhar no WhatsApp</h3>
                    <p className="font-cormorant text-foreground/80">
                      Indique o Cais Nobre e ganhe <span className="text-green-500 font-bold">10 pontos</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/60 mb-6 font-cormorant">
                  Compartilhe nossa experiência com seus amigos e acumule pontos para recompensas exclusivas!
                </p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-cinzel"
                  onClick={() => {
                    const text = encodeURIComponent("Descubra a experiência única do Cais Nobre! 🍸✨");
                    const url = encodeURIComponent(window.location.origin);
                    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Compartilhar Agora
                </Button>
              </div>
            </div>

            {/* Mobile Layout com 3D Gamificado Simples */}
            <div className="md:hidden w-full max-w-md mx-auto space-y-6">
              {/* Tarefa 1 Mobile */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur-sm border-2 border-primary/40 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-cinzel text-lg text-primary mb-1">Completar Perfil</h3>
                      <p className="font-cormorant text-sm text-foreground/80">
                        Ganhe <span className="text-primary font-bold">10 pontos</span>
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 font-cinzel text-sm" onClick={() => navigate('/profile')}>
                    Completar Agora
                  </Button>
                </div>
              </div>

              {/* Tarefa 2 Mobile */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-card/95 backdrop-blur-sm border-2 border-green-500/40 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-cinzel text-lg text-green-500 mb-1">Compartilhar</h3>
                      <p className="font-cormorant text-sm text-foreground/80">
                        Ganhe <span className="text-green-500 font-bold">10 pontos</span>
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-cinzel text-sm"
                    onClick={() => {
                      const text = encodeURIComponent("Descubra a experiência única do Cais Nobre! 🍸✨");
                      const url = encodeURIComponent(window.location.origin);
                      window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quote */}
      <div className={`fixed bottom-6 left-0 right-0 z-20 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <p className="font-cormorant text-sm text-muted-foreground/60 italic text-center px-4">
          "Navegue nas águas da nobreza e descubra tesouros além do horizonte"
        </p>
      </div>
    </div>;
};
export default Home;