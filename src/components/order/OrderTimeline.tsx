import { Check } from "lucide-react";
import { OrderStatus } from "@/store/orderStore";

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

const statusSteps: { key: OrderStatus; label: string }[] = [
  { key: 'recebido', label: 'Pedido Recebido' },
  { key: 'preparo', label: 'Em Preparo' },
  { key: 'pronto', label: 'Pronto' },
  { key: 'entregue', label: 'Entregue' }
];

export const OrderTimeline = ({ currentStatus }: OrderTimelineProps) => {
  const currentIndex = statusSteps.findIndex(step => step.key === currentStatus);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className="relative">
                <div 
                  className={`
                    h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-primary border-primary' 
                      : 'bg-background border-border'}
                  `}
                >
                  {isCompleted && (
                    <Check className={`h-6 w-6 ${isCurrent ? 'text-primary-foreground' : 'text-primary-foreground'}`} />
                  )}
                </div>
                
                {index < statusSteps.length - 1 && (
                  <div 
                    className={`
                      absolute top-6 left-12 h-0.5 transition-all duration-300
                      ${isCompleted ? 'bg-primary' : 'bg-border'}
                    `}
                    style={{ width: 'calc(100vw / 4 - 3rem)' }}
                  />
                )}
              </div>
              
              <p 
                className={`
                  mt-3 text-xs sm:text-sm font-cormorant text-center transition-all duration-300
                  ${isCompleted ? 'text-primary font-semibold' : 'text-muted-foreground'}
                `}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
