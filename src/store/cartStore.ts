import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  nome: string;
  preco: number;
  qty: number;
  variacoes?: string[];
  observacoes?: string;
  imageUrl?: string;
  categoria?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  updateObservacoes: (id: string, observacoes: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map(i =>
              i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
            )
          });
        } else {
          set({ items: [...get().items, { ...item, qty: item.qty || 1 }] });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      
      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, qty } : i
          )
        });
      },
      
      updateObservacoes: (id, observacoes) => {
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, observacoes } : i
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.preco * item.qty), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.qty, 0);
      }
    }),
    {
      name: 'cais-nobre-cart'
    }
  )
);
