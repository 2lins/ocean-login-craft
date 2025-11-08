import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bell, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/orderStore";
import { useCartStore } from "@/store/cartStore";
import { OrderTimeline } from "@/components/order/OrderTimeline";
import { toast } from "sonner";

export default function AppStatus() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, updateOrderStatus } = useOrderStore();
  const addItem = useCartStore(state => state.addItem);
  const [order, setOrder] = useState(getOrder(orderId!));

  // Simulate status progression for demo
  useEffect(() => {
    if (!order) return;

    const statusFlow = ['recebido', 'preparo', 'pronto', 'entregue'];
    const currentIndex = statusFlow.indexOf(order.status);
    
    if (currentIndex < statusFlow.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = statusFlow[currentIndex + 1] as any;
        updateOrderStatus(orderId!, nextStatus);
        setOrder(getOrder(orderId!));
        
        if (nextStatus === 'pronto') {
          toast.success("Pedido pronto!", {
            description: "Seu coquetel está te esperando no balcão."
          });
        }
      }, 10000); // 10 seconds per status for demo

      return () => clearTimeout(timer);
    }
  }, [order, orderId, updateOrderStatus, getOrder]);

  const handleCallWaiter = () => {
    toast.success("Garçom chamado!", {
      description: "Alguém da equipe estará com você em instantes"
    });
  };

  const handleRepeatOrder = () => {
    order?.itens.forEach(item => addItem(item));
    toast.success("Itens adicionados ao carrinho");
    navigate('/app/checkout');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-cinzel text-2xl text-primary mb-4">Pedido não encontrado</h2>
          <Button onClick={() => navigate('/app/pedidos')} className="font-cinzel">
            Ver Pedidos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-card/50 to-background border-b border-border p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-cinzel text-4xl text-primary mb-2">Status do Pedido</h1>
          <p className="font-cormorant text-xl text-muted-foreground italic">
            Acompanhe em tempo real
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {/* Timeline */}
        <div className="bg-card border border-border rounded-lg p-8">
          <OrderTimeline currentStatus={order.status} />
        </div>

        {/* Order Details */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-cinzel text-xl text-primary mb-4">Detalhes do Pedido</h2>
          <div className="space-y-3">
            <div className="flex justify-between font-cormorant">
              <span className="text-muted-foreground">Pedido</span>
              <span className="text-foreground">#{order.id.slice(-8)}</span>
            </div>
            <div className="flex justify-between font-cormorant">
              <span className="text-muted-foreground">Modalidade</span>
              <span className="text-foreground">
                {order.modalidade === 'mesa' 
                  ? `Mesa ${order.mesaId}` 
                  : 'Balcão'}
              </span>
            </div>
            <div className="flex justify-between font-cormorant">
              <span className="text-muted-foreground">Total</span>
              <span className="font-cinzel text-lg text-primary">
                R$ {order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-cinzel text-primary mb-3">Itens</h3>
            {order.itens.map((item) => (
              <div key={item.id} className="flex justify-between font-cormorant mb-2">
                <span className="text-muted-foreground">
                  {item.qty}x {item.nome}
                </span>
                <span className="text-foreground">
                  R$ {(item.preco * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleCallWaiter}
            variant="outline"
            className="font-cinzel"
          >
            <Bell className="h-4 w-4 mr-2" />
            Chamar Garçom
          </Button>
          <Button
            onClick={handleRepeatOrder}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Repetir Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}
