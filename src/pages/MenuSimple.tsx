import { FuturisticHeader } from "@/components/FuturisticHeader";

const MenuSimple = () => {
  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      {/* Futuristic Header */}
      <FuturisticHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="relative z-10 text-center px-4">
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-6">
            CAIS NOBRE
          </h1>
          <p className="font-cormorant text-xl md:text-3xl text-foreground/90 mb-12 italic">
            Experiência Gastronômica do Futuro
          </p>
        </div>
      </section>

      {/* Test Section 2 */}
      <section className="relative py-16 md:py-20 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-cinzel text-4xl md:text-5xl text-center text-primary mb-8">
            SEÇÃO DE TESTE 2
          </h2>
          <p className="text-center text-foreground text-xl">
            Se você vê isto, o scroll está funcionando!
          </p>
        </div>
      </section>

      {/* Test Section 3 */}
      <section className="relative py-16 md:py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-cinzel text-4xl md:text-5xl text-center text-primary mb-8">
            SEÇÃO DE TESTE 3
          </h2>
          <p className="text-center text-foreground text-xl">
            Scroll funcionando perfeitamente!
          </p>
        </div>
      </section>
    </div>
  );
};

export default MenuSimple;
