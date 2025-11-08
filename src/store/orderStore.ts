import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './cartStore';

export type OrderStatus = 'recebido' | 'preparo' | 'pronto' | 'entregue';
export type OrderModalidade = 'mesa' | 'balcao';

export interface Order {
  id: string;
  itens: CartItem[];
  subtotal: number;
  desconto: number;
  gorjeta: number;
  total: number;
  modalidade: OrderModalidade;
  mesaId?: string;
  status: OrderStatus;
  criadoEm: string;
}

interface OrderStore {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'criadoEm'>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
  getUserOrders: () => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      createOrder: (orderData) => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          criadoEm: new Date().toISOString()
        };
        set({ orders: [...get().orders, newOrder] });
        return orderId;
      },
      
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        });
      },
      
      getOrder: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },
      
      getUserOrders: () => {
        return get().orders.sort((a, b) => 
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
        );
      }
    }),
    {
      name: 'cais-nobre-orders'
    }
  )
);
