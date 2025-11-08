import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gem, Compass, Crown, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoCais from "@/assets/logo-cais-nobre-vermelho.png";
import { Canvas } from "@react-three/fiber";
import { AnimatedSphere } from "@/components/AnimatedSphere";
import { Carousel3D } from "@/components/Carousel3D";
type TabId = "menu" | "reservas" | "ranking";
interface Tab {
  id: TabId;
  name: string;
  icon: typeof Gem;
  description: string;
  position: number;
  scale: number;
}
const Menu = () => {
  const [activeTab, setActiveTab] = useState<TabId>("menu");
  const [isLoaded, setIsLoaded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Carousel cards data
  const carouselCards = [{
    id: 1,
    title: "Happy Hour Especial",
    description: "Drinks exclusivos com 30% de desconto",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop"
  }, {
    id: 2,
    title: "Noite dos Navegadores",
    description: "Evento exclusivo para membros",
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop"
  }, {
    id: 3,
    title: "Nova Carta de Drinks",
    description: "Descubra nossos coquetéis artesanais",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
  }, {
    id: 4,
    title: "Missão Semanal",
    description: "Complete e ganhe pontos em dobro",
    imageUrl: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&h=300&fit=crop"
  }];
  const handleNextCard = () => {
    setCarouselIndex(prev => (prev + 1) % carouselCards.length);
  };
  const handlePrevCard = () => {
    setCarouselIndex(prev => (prev - 1 + carouselCards.length) % carouselCards.length);
  };
  const tabs: Tab[] = [{
    id: "reservas",
    name: "Navegar",
    icon: Compass,
    description: "Reservas de mesa, eventos e mapa da casa",
    position: -2.5,
    scale: 0.8
  }, {
    id: "menu",
    name: "Tesouros",
    icon: Gem,
    description: "Galeria dos drinks e pratos, apresentados como relíquias",
    position: 0,
    scale: 1.0
  }, {
    id: "ranking",
    name: "Ordem",
    icon: Crown,
    description: "Ranking de clientes (Almirante, Comendador)",
    position: 2.5,
    scale: 0.8
  }];
  const renderContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return <div className={`flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          {activeTabData && <activeTabData.icon className="relative w-24 h-24 text-primary drop-shadow-[0_0_20px_rgba(239,169,74,0.4)]" strokeWidth={1.5} />}
        </div>
        
        <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-primary tracking-wider mb-4" style={{
        textShadow: "0 0 15px rgba(239, 169, 74, 0.4)"
      }}>
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
      </div>;
  };
  return <div className="relative min-h-screen w-full overflow-hidden bg-background pb-24">
      {/* Nautical map background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
      backgroundImage: `
            linear-gradient(rgba(239, 169, 74, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 169, 74, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)
          `,
      backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%'
    }} />

      {/* Vignette effect */}
      <div className="fixed inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none" />

      {/* Decorative compass rose watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 pointer-events-none">
        <Compass className="w-full h-full text-primary animate-[spin_120s_linear_infinite]" />
      </div>

      {/* Header with logo */}
      <header className="relative z-10 pt-6 pb-4 px-4">
        <div className={`flex items-center justify-between transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
          <div className="flex flex-col items-center flex-1">
            <img src={logoCais} alt="Logo Cais Nobre" className="w-20 h-20 drop-shadow-[0_0_20px_rgba(239,169,74,0.3)]" />
            <h1 className="mt-3 font-cinzel text-xl md:text-2xl font-bold text-primary tracking-[0.3em]" style={{
            textShadow: "0 0 15px rgba(239, 169, 74, 0.4)"
          }}>
              CAIS NOBRE
            </h1>
            <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} className="absolute right-4 top-6 text-muted-foreground hover:text-primary">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* 3D Carousel Section */}
      <section className="relative z-10 w-full px-4 mb-8">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="relative h-[380px] rounded-xl overflow-hidden border border-primary/20 bg-card/30 backdrop-blur-sm">
            <Canvas camera={{
              position: [0, 0, 8],
              fov: 50
            }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B0000" />
              <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
              
              <Carousel3D cards={carouselCards} activeIndex={carouselIndex} onCardClick={setCarouselIndex} />
            </Canvas>
          </div>
        </div>

        {/* Carousel navigation buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20">
          <Button onClick={handlePrevCard} variant="outline" size="icon" className="rounded-full bg-card/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2 items-center">
            {carouselCards.map((_, index) => <button key={index} onClick={() => setCarouselIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === carouselIndex ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50"}`} />)}
          </div>

          <Button onClick={handleNextCard} variant="outline" size="icon" className="rounded-full bg-card/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Main content area */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-280px)]">
        {renderContent()}
      </main>

      {/* Bottom Navigation - Fixed Footer with 3D Spheres */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t-2 border-primary/30">
        {/* 3D Canvas for spheres with icons inside */}
        <div className="h-40 w-full">
          <Canvas camera={{
          position: [0, 0, 8],
          fov: 50
        }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B0000" />
            
            {tabs.map(tab => <AnimatedSphere key={tab.id} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} position={[tab.position, 0, 0]} scale={tab.scale} color={activeTab === tab.id ? "#EFA94A" : "#8B4513"} icon={tab.icon} name={tab.name} />)}
          </Canvas>
        </div>
        
        {/* Decorative rope border effect */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </nav>
    </div>;
};
export default Menu;