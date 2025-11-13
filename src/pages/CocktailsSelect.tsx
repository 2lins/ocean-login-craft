import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FuturisticHeader } from "@/components/FuturisticHeader";

const CocktailsSelect = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <FuturisticHeader />
      <div className="flex items-center justify-center px-4 pt-28">
        <div className="w-full max-w-5xl bg-card/70 backdrop-blur-md border border-primary/30 rounded-2xl shadow-xl p-6 md:p-10">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-primary">ESCOLHA SUA JORNADA</h1>
            <p className="font-cormorant text-muted-foreground">Que tipo de experiência de cocktails você deseja explorar hoje?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-indigo-600/30 to-purple-500/30 border-primary/40">
              <div className="mb-3">
                <h3 className="font-cinzel text-xl text-primary">Nossos Cocktails</h3>
                <p className="font-cormorant text-sm text-foreground/80">Criações exclusivas Cais Nobre</p>
              </div>
              <p className="font-cormorant text-sm text-muted-foreground mb-4">Navegue pela coleção autoral de cocktails únicos.</p>
              <Button onClick={() => navigate("/cocktails-hero")} className="mt-auto">Explorar</Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500/30 to-red-500/30 border-primary/40">
              <div className="mb-3">
                <h3 className="font-cinzel text-xl text-primary">Descobertas Mensais</h3>
                <p className="font-cormorant text-sm text-foreground/80">Novidades do mês</p>
              </div>
              <p className="font-cormorant text-sm text-muted-foreground mb-4">Explore criações que destacamos mensalmente.</p>
              <Button onClick={() => navigate("/cocktails-mensais")} className="mt-auto">Explorar</Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 border-primary/40">
              <div className="mb-3">
                <h3 className="font-cinzel text-xl text-primary">Gastronômicos</h3>
                <p className="font-cormorant text-sm text-foreground/80">Perfeitos com pratos</p>
              </div>
              <p className="font-cormorant text-sm text-muted-foreground mb-4">Cocktails pensados para harmonizar com nossa gastronomia.</p>
              <Button onClick={() => navigate("/cocktails-gastronomicos")} className="mt-auto">Explorar</Button>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate("/cocktails-hero")}>Ver Todos os Cocktails</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailsSelect;

