import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FuturisticHeader } from "@/components/FuturisticHeader";

const CocktailsSelect = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100dvh] bg-background pb-16 overflow-hidden">
      <FuturisticHeader />
      <div className="flex items-center justify-center px-4 pt-24">
        <div className="w-full max-w-5xl bg-card/70 backdrop-blur-md border border-primary/30 rounded-2xl shadow-xl p-4 md:p-10 transform-gpu origin-top scale-[0.82] sm:scale-100">
          <div className="text-center mb-6 md:mb-10">
            <h1 className="font-cinzel text-2xl md:text-4xl font-bold text-primary">ESCOLHA SUA JORNADA</h1>
            <p className="font-cormorant text-sm md:text-base text-muted-foreground">Que tipo de experiência de cocktails você deseja explorar hoje?</p>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <Card className="p-4 md:p-6 bg-gradient-to-br from-indigo-600/30 to-purple-500/30 border-primary/40">
              <div className="mb-3">
                <h3 className="font-cinzel text-lg md:text-xl text-primary">Nossos Cocktails</h3>
                <p className="font-cormorant text-xs md:text-sm text-foreground/80">Criações exclusivas Cais Nobre</p>
              </div>
              <p className="font-cormorant text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Navegue pela coleção autoral de cocktails únicos.</p>
              <Button onClick={() => navigate("/cocktails-hero")} className="mt-auto h-9 md:h-10 text-sm px-3">Explorar</Button>
            </Card>

            <Card className="p-4 md:p-6 bg-gradient-to-br from-orange-500/30 to-red-500/30 border-primary/40">
              <div className="mb-3">
                <h3 className="font-cinzel text-lg md:text-xl text-primary">Descobertas Mensais</h3>
                <p className="font-cormorant text-xs md:text-sm text-foreground/80">Novidades do mês</p>
              </div>
              <p className="font-cormorant text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Explore criações que destacamos mensalmente.</p>
              <Button onClick={() => navigate("/cocktails-mensais")} className="mt-auto h-9 md:h-10 text-sm px-3">Explorar</Button>
            </Card>

            <Card className="p-4 md:p-6 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 border-primary/40">
              <div className="mb-3">
                <h3 className="font-cinzel text-lg md:text-xl text-primary">Gastronômicos</h3>
                <p className="font-cormorant text-xs md:text-sm text-foreground/80">Perfeitos com pratos</p>
              </div>
              <p className="font-cormorant text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Cocktails pensados para harmonizar com nossa gastronomia.</p>
              <Button onClick={() => navigate("/cocktails-gastronomicos")} className="mt-auto h-9 md:h-10 text-sm px-3">Explorar</Button>
            </Card>
          </div>

          <div className="text-center mt-6 md:mt-8">
            <Button variant="outline" className="h-9 md:h-10 text-sm px-3" onClick={() => navigate("/cocktails-hero")}>Ver Todos os Cocktails</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailsSelect;

