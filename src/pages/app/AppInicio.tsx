import { UtensilsCrossed, QrCode, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AppInicio() {
  const navigate = useNavigate();
  const userName = "Navegador"; // Mock - later from auth

  const quickActions = [
    {
      title: "Explorar Cardápio",
      description: "Descubra nossos drinks exclusivos",
      icon: UtensilsCrossed,
      action: () => navigate('/app/cardapio'),
      color: "from-primary/20 to-primary/5"
    },
    {
      title: "Scan QR da Mesa",
      description: "Ative o serviço de mesa",
      icon: QrCode,
      action: () => navigate('/app/scan'),
      color: "from-accent/20 to-accent/5"
    },
    {
      title: "Meus Pedidos",
      description: "Acompanhe seu histórico",
      icon: History,
      action: () => navigate('/app/pedidos'),
      color: "from-secondary/20 to-secondary/5"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="font-cinzel text-4xl text-primary mb-2">
          Bem-vindo, {userName}
        </h1>
        <p className="font-cormorant text-xl text-muted-foreground italic">
          Seu bar particular te aguarda
        </p>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`
              p-6 rounded-lg border border-border bg-gradient-to-br ${action.color}
              hover:border-primary/50 transition-all duration-300 text-left
              hover:shadow-lg hover:shadow-primary/10
            `}
          >
            <action.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-cinzel text-xl text-foreground mb-2">{action.title}</h3>
            <p className="font-cormorant text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Top Ranking Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="font-cinzel text-2xl text-primary mb-6">Top do Ranking</h2>
        <div className="bg-card/30 border border-border rounded-lg p-8">
          <p className="font-cormorant text-center text-muted-foreground italic">
            Ranking em breve — comece a acumular pontos!
          </p>
        </div>
      </div>
    </div>
  );
}
