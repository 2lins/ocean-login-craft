import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { items, updateQty, removeItem, getTotal } = useCartStore();
  const navigate = useNavigate();
  const total = getTotal();

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/app/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border">
        <SheetHeader>
          <SheetTitle className="font-cinzel text-2xl text-primary">Seu Pedido</SheetTitle>
          <SheetDescription className="font-cormorant text-muted-foreground">
            {items.length === 0 
              ? "Seu bar particular ainda está vazio — que tal começar pelos nossos autorais?" 
              : `${items.length} ${items.length === 1 ? 'item' : 'itens'} no carrinho`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-12rem)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="font-cormorant text-lg text-muted-foreground">
                Adicione alguns itens para começar
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-4 bg-background/50 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-cinzel text-foreground mb-1">{item.nome}</h3>
                      <p className="font-cormorant text-sm text-muted-foreground mb-2">
                        R$ {item.preco.toFixed(2)}
                      </p>
                      {item.observacoes && (
                        <p className="text-xs text-muted-foreground italic">
                          {item.observacoes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

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
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-cinzel text-lg text-foreground">Total</span>
                  <span className="font-cinzel text-xl text-primary">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel"
                  size="lg"
                >
                  Finalizar Pedido
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
