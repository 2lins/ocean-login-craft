import { useState } from "react";
import { Wine, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { CartButton } from "@/components/cart/CartButton";
import { CartSheet } from "@/components/cart/CartSheet";

// Mock menu data
const menuItems = [
  {
    id: "drink-1",
    nome: "Cais Negroni",
    preco: 35.00,
    categoria: "Drinks Autorais",
    descricao: "Nossa releitura do clássico italiano com gin artesanal",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400"
  },
  {
    id: "drink-2",
    nome: "Sunset Maritime",
    preco: 42.00,
    categoria: "Drinks Autorais",
    descricao: "Coquetel tropical com rum envelhecido e especiarias",
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400"
  },
  {
    id: "drink-3",
    nome: "Gin Tônica Premium",
    preco: 28.00,
    categoria: "Clássicos",
    descricao: "Gin importado com tônica artesanal e botânicos",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"
  },
  {
    id: "prato-1",
    nome: "Tábua de Frios Especial",
    preco: 68.00,
    categoria: "Petiscos",
    descricao: "Seleção de queijos e frios premium",
    imageUrl: "https://images.unsplash.com/photo-1541745537-c2fc895b2e26?w=400"
  }
];

export default function AppCardapio() {
  const [cartOpen, setCartOpen] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      nome: item.nome,
      preco: item.preco,
      categoria: item.categoria,
      imageUrl: item.imageUrl
    });
    toast.success("Adicionado ao carrinho", {
      description: item.nome
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-card/50 to-background border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-cinzel text-4xl text-primary mb-2">Cardápio Digital</h1>
          <p className="font-cormorant text-xl text-muted-foreground italic">
            Explore nossas criações
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {Object.entries(
          menuItems.reduce((acc, item) => {
            if (!acc[item.categoria]) acc[item.categoria] = [];
            acc[item.categoria].push(item);
            return acc;
          }, {} as Record<string, typeof menuItems>)
        ).map(([categoria, items]) => (
          <div key={categoria}>
            <h2 className="font-cinzel text-2xl text-primary mb-4 flex items-center gap-2">
              <Wine className="h-6 w-6" />
              {categoria}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300"
                >
                  <div className="h-40 bg-muted overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-cinzel text-lg text-foreground">{item.nome}</h3>
                      <span className="font-cinzel text-primary">R$ {item.preco.toFixed(2)}</span>
                    </div>
                    <p className="font-cormorant text-sm text-muted-foreground mb-4">
                      {item.descricao}
                    </p>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CartButton onClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
