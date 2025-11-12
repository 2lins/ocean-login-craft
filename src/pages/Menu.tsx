import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsSection3D } from "@/components/news";
import { FuturisticHeader } from "@/components/FuturisticHeader";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { LazyCanvas } from "@/components/LazyCanvas";
import { LazySpline } from "@/components/LazySpline";
import { CAROUSEL_CARDS, NEWS_ITEMS, MENU_CATEGORIES } from "@/constants/menuData";
const Menu = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoaded(true);
    // Delay video load for better initial performance
    const timer = setTimeout(() => setVideoLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  console.log('Menu rendering - carousel cards:', CAROUSEL_CARDS.length);

  // Memoized handlers
  const handleNextCard = useCallback(() => {
    setCarouselIndex(prev => (prev + 1) % CAROUSEL_CARDS.length);
  }, []);
  
  const handlePrevCard = useCallback(() => {
    setCarouselIndex(prev => (prev - 1 + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length);
  }, []);

  // Touch/swipe handlers with debounce
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNextCard();
    }
    if (isRightSwipe) {
      handlePrevCard();
    }
  }, [touchStart, touchEnd, handleNextCard, handlePrevCard]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background pb-24">
      {/* Futuristic Header */}
      <FuturisticHeader />

      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Lazy Loaded Video Background */}
        {videoLoaded && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
        )}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-background to-card animate-pulse" />
        )}
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(242, 228, 200, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242, 228, 200, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 drop-shadow-[0_0_30px_rgba(242,228,200,0.5)]">
            CAIS NOBRE
          </h1>
          <p className="font-cormorant text-xl md:text-3xl text-foreground/90 mb-12 italic">
            Experiência Gastronômica do Futuro
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-background font-cinzel text-lg px-8 py-6 shadow-[0_0_20px_rgba(242,228,200,0.4)] hover:shadow-[0_0_30px_rgba(242,228,200,0.6)] transition-all duration-300"
          >
            FAZER RESERVA
          </Button>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Carousel Section - Experiências Exclusivas */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              EXPERIÊNCIAS EXCLUSIVAS
            </h2>
            <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic">
              Momentos únicos que definem nossa essência
            </p>
          </div>

          {/* 3D Carousel Container */}
          <div 
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <LazyCanvas
              cards={CAROUSEL_CARDS}
              activeIndex={carouselIndex}
              onCardClick={setCarouselIndex}
              className="relative h-[500px] sm:h-[550px] md:h-[600px] rounded-xl overflow-hidden border-2 border-primary/30 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-sm shadow-2xl shadow-yellow-900/20"
            />

            {/* Luxury Carousel Navigation */}
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center gap-4 sm:gap-6 z-20 px-2">
              <Button 
                onClick={handlePrevCard} 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 border-none hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </Button>
              
              <div className="flex gap-2 sm:gap-3 items-center">
                {CAROUSEL_CARDS.map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => setCarouselIndex(index)} 
                    className={`w-3 h-3 rotate-45 transition-all duration-300 ${
                      index === carouselIndex 
                        ? "bg-yellow-500 shadow-lg shadow-yellow-500/50" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`} 
                  />
                ))}
              </div>

              <Button 
                onClick={handleNextCard} 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 border-none hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Bar Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background/50 to-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div>
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-primary mb-6">
                O FUTURO DA GASTRONOMIA
              </h2>
              <p className="font-cormorant text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
                No Cais Nobre, combinamos tradição e inovação para criar experiências gastronômicas únicas. 
                Nosso conceito futurístico se harmoniza com a qualidade atemporal dos nossos ingredientes e 
                o cuidado artesanal em cada criação.
              </p>

              {/* Glass morphism cards */}
              <div className="space-y-4">
                {[
                  { title: "Mixologia de Vanguarda", desc: "Coquetéis que desafiam os sentidos" },
                  { title: "Gastronomia Contemporânea", desc: "Pratos que contam histórias" },
                  { title: "Ambiente Imersivo", desc: "Tecnologia e conforto em harmonia" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/50 transition-all duration-300"
                  >
                    <h3 className="font-cinzel text-xl text-primary mb-2">{item.title}</h3>
                    <p className="font-cormorant text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image/Video Column */}
            <div className="relative h-[400px] md:h-[500px] bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-primary/30 font-cinzel text-2xl">
                [Placeholder Imagem/Vídeo]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section with Lazy Loaded Spline Background */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-background overflow-hidden">
        {/* Lazy Loaded Spline 3D Background */}
        <LazySpline 
          src='https://my.spline.design/whiskeyloadinganimation-zXpGMvScRZZV036Iet3lQpQr/'
          className="absolute inset-0 z-0 opacity-40"
        />
        
        {/* Simple dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              ÚLTIMAS NOVIDADES
            </h2>
            <p className="font-cormorant text-xl md:text-2xl text-foreground/90 italic">
              Fique por dentro dos eventos e promoções
            </p>
          </div>
          
          <NewsSection3D news={NEWS_ITEMS} />
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              CARDÁPIO DIGITAL
            </h2>
            <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic">
              Explore nossas categorias exclusivas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {MENU_CATEGORIES.map((category, index) => (
              <MenuCategoryCard 
                key={index}
                title={category.title}
                icon={category.icon}
                description={category.description}
              />
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-background font-cinzel text-lg px-8 py-6 shadow-[0_0_20px_rgba(242,228,200,0.4)] hover:shadow-[0_0_30px_rgba(242,228,200,0.6)] transition-all duration-300"
            >
              VER CARDÁPIO COMPLETO
            </Button>
          </div>
        </div>
      </section>

      {/* Localização/Contato Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-card/20 to-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Info Column */}
            <div className="space-y-8">
              <div>
                <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-primary mb-6">
                  VISITE-NOS
                </h2>
                <p className="font-cormorant text-lg text-foreground/80 mb-8">
                  Estamos localizados no coração da cidade, prontos para proporcionar 
                  uma experiência inesquecível.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-cinzel text-lg text-primary mb-1">Endereço</h3>
                    <p className="font-cormorant text-foreground/80">
                      Rua Exemplo, 123 - Centro<br />
                      São Paulo, SP - 01234-567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-300">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-cinzel text-lg text-primary mb-1">Horário</h3>
                    <p className="font-cormorant text-foreground/80">
                      Terça a Sábado: 18h - 02h<br />
                      Domingo: 18h - 00h<br />
                      Segunda: Fechado
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-cinzel text-lg text-primary mb-1">Telefone</h3>
                    <p className="font-cormorant text-foreground/80">(11) 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-cinzel text-lg text-primary mb-1">E-mail</h3>
                    <p className="font-cormorant text-foreground/80">contato@cairnobre.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Column */}
            <div className="relative h-[400px] lg:h-full min-h-[500px] bg-card/30 backdrop-blur-sm border-2 border-primary/30 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-primary/30 font-cinzel text-2xl">
                [Placeholder Mapa]
              </div>
              
              {/* Neon corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary shadow-[0_0_10px_rgba(242,228,200,0.5)]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary shadow-[0_0_10px_rgba(242,228,200,0.5)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-card/95 backdrop-blur-md border-t border-primary/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            {/* Brand Column */}
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-primary mb-4">CAIS NOBRE</h3>
              <p className="font-cormorant text-foreground/70 mb-6">
                Experiência gastronômica que une tradição e futuro em cada detalhe.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors duration-300">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors duration-300">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="font-cinzel text-lg text-primary mb-4">NAVEGAÇÃO</h4>
              <ul className="space-y-2 font-cormorant">
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                    Cardápio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                    Eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-cinzel text-lg text-primary mb-4">CONTATO</h4>
              <ul className="space-y-3 font-cormorant text-foreground/70">
                <li>Rua Exemplo, 123 - Centro</li>
                <li>São Paulo, SP</li>
                <li>(11) 1234-5678</li>
                <li>contato@cairnobre.com</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-cormorant text-foreground/60">
              <p>&copy; 2025 Cais Nobre. Todos os direitos reservados.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </footer>
    </div>
  );
};
export default Menu;