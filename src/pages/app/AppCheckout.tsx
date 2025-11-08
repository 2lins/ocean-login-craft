import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, Tag, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { TipSheet } from "@/components/order/TipSheet";
import { toast } from "sonner";

export default function AppCheckout() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, getTotal, clearCart } = useCartStore();
  const createOrder = useOrderStore(state => state.createOrder);
  
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [gorjeta, setGorjeta] = useState(0);
  const [modalidade, setModalidade] = useState<"mesa" | "balcao">("balcao");
  const [mesaId, setMesaId] = useState("");
  const [tipSheetOpen, setTipSheetOpen] = useState(false);

  const subtotal = getTotal();
  const total = subtotal - desconto + gorjeta;

  const handleApplyCupom = () => {
    if (cupom.toUpperCase() === "HAPPYHOUR") {
      setDesconto(15);
      toast.success("Cupom aplicado!", {
        description: "Desconto de R$ 15,00"
      });
    } else {
      toast.error("Cupom inválido");
    }
  };

  const handlePayment = () => {
    if (items.length === 0) {
      toast.error("Carrinho vazio");
      return;
    }

    if (modalidade === "mesa" && !mesaId) {
      toast.error("Informe o número da mesa");
      return;
    }

    const orderId = createOrder({
      itens: items,
      subtotal,
      desconto,
      gorjeta,
      total,
      modalidade,
      mesaId: modalidade === "mesa" ? mesaId : undefined,
      status: "recebido"
    });

    clearCart();
    toast.success("Pedido confirmado!", {
      description: "Aguarde... estamos preparando seu pedido"
    });
    
    navigate(`/app/status/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-cinzel text-2xl text-primary mb-4">Carrinho vazio</h2>
          <Button onClick={() => navigate('/app/cardapio')} className="font-cinzel">
            Ver Cardápio
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
          <h1 className="font-cinzel text-4xl text-primary mb-2">Checkout</h1>
          <p className="font-cormorant text-xl text-muted-foreground italic">
            Finalize seu pedido
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Items */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="font-cinzel text-xl text-primary mb-4">Itens do Pedido</h2>
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
              <div className="flex-1">
                <h3 className="font-cinzel text-foreground">{item.nome}</h3>
                <p className="font-cormorant text-sm text-muted-foreground">
                  R$ {item.preco.toFixed(2)} × {item.qty}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-cinzel">{item.qty}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Cupom */}
        <div className="bg-card border border-border rounded-lg p-6">
          <Label className="font-cinzel text-primary mb-2 flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Cupom de Desconto
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Digite o cupom"
              value={cupom}
              onChange={(e) => setCupom(e.target.value.toUpperCase())}
              className="font-cormorant"
            />
            <Button onClick={handleApplyCupom} variant="outline" className="font-cinzel">
              Aplicar
            </Button>
          </div>
        </div>

        {/* Gorjeta */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center">
            <Label className="font-cinzel text-primary">Gorjeta</Label>
            <Button onClick={() => setTipSheetOpen(true)} variant="outline" size="sm">
              {gorjeta > 0 ? `R$ ${gorjeta.toFixed(2)}` : 'Adicionar'}
            </Button>
          </div>
        </div>

        {/* Modalidade */}
        <div className="bg-card border border-border rounded-lg p-6">
          <Label className="font-cinzel text-primary mb-4 block">Modalidade</Label>
          <RadioGroup value={modalidade} onValueChange={(v) => setModalidade(v as any)}>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="balcao" id="balcao" />
              <Label htmlFor="balcao" className="font-cormorant cursor-pointer">
                Retirar no balcão
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mesa" id="mesa" />
              <Label htmlFor="mesa" className="font-cormorant cursor-pointer">
                Na mesa (QR)
              </Label>
            </div>
          </RadioGroup>

          {modalidade === "mesa" && (
            <Input
              placeholder="Número da mesa"
              value={mesaId}
              onChange={(e) => setMesaId(e.target.value)}
              className="mt-4 font-cormorant"
            />
          )}
        </div>

        {/* Total */}
        <div className="bg-card border border-primary/30 rounded-lg p-6 space-y-3">
          <div className="flex justify-between font-cormorant">
            <span className="text-muted-foreground">Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          {desconto > 0 && (
            <div className="flex justify-between font-cormorant text-green-500">
              <span>Desconto</span>
              <span>- R$ {desconto.toFixed(2)}</span>
            </div>
          )}
          {gorjeta > 0 && (
            <div className="flex justify-between font-cormorant">
              <span className="text-muted-foreground">Gorjeta</span>
              <span>R$ {gorjeta.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="font-cinzel text-xl text-foreground">Total</span>
            <span className="font-cinzel text-2xl text-primary">R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment */}
        <Button
          onClick={handlePayment}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel py-6 text-lg"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Pagar
        </Button>
      </div>

      <TipSheet
        open={tipSheetOpen}
        onOpenChange={setTipSheetOpen}
        subtotal={subtotal}
        onConfirm={setGorjeta}
      />
    </div>
  );
}
