import { useNavigate } from "react-router-dom";
import { RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrderStore } from "@/store/orderStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const statusLabels = {
  recebido: "Recebido",
  preparo: "Em Preparo",
  pronto: "Pronto",
  entregue: "Entregue"
};

const statusColors = {
  recebido: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  preparo: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  pronto: "bg-green-500/10 text-green-500 border-green-500/20",
  entregue: "bg-gray-500/10 text-gray-500 border-gray-500/20"
};

export default function AppPedidos() {
  const navigate = useNavigate();
  const orders = useOrderStore(state => state.getUserOrders());
  const addItem = useCartStore(state => state.addItem);

  const handleRepeatOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    order.itens.forEach(item => addItem(item));
    toast.success("Itens adicionados ao carrinho");
    navigate('/app/checkout');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-card/50 to-background border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-cinzel text-4xl text-primary mb-2">Meus Pedidos</h1>
          <p className="font-cormorant text-xl text-muted-foreground italic">
            Histórico completo
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="font-cormorant text-lg text-muted-foreground mb-4">
              Nenhum pedido realizado ainda
            </p>
            <Button onClick={() => navigate('/app/cardapio')} className="font-cinzel">
              Explorar Cardápio
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-cinzel text-lg text-foreground mb-1">
                      Pedido #{order.id.slice(-8)}
                    </h3>
                    <p className="font-cormorant text-sm text-muted-foreground">
                      {new Date(order.criadoEm).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Badge className={`${statusColors[order.status]} font-cinzel`}>
                    {statusLabels[order.status]}
                  </Badge>
                </div>

                <div className="mb-4 space-y-1">
                  {order.itens.slice(0, 3).map((item, idx) => (
                    <p key={idx} className="font-cormorant text-sm text-muted-foreground">
                      {item.qty}x {item.nome}
                    </p>
                  ))}
                  {order.itens.length > 3 && (
                    <p className="font-cormorant text-sm text-muted-foreground italic">
                      +{order.itens.length - 3} mais...
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="font-cinzel text-primary">
                    R$ {order.total.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/app/status/${order.id}`)}
                      className="font-cinzel"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRepeatOrder(order.id)}
                      className="font-cinzel"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Repetir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
