import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";

interface CartButtonProps {
  onClick: () => void;
}

export const CartButton = ({ onClick }: CartButtonProps) => {
  const itemCount = useCartStore(state => state.getItemCount());
  
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
    >
      <ShoppingCart className="h-6 w-6 text-primary-foreground" />
      {itemCount > 0 && (
        <Badge 
          className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center bg-destructive text-destructive-foreground border-2 border-background"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};
