import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface TipSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subtotal: number;
  onConfirm: (tipAmount: number) => void;
}

export const TipSheet = ({ open, onOpenChange, subtotal, onConfirm }: TipSheetProps) => {
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState("");

  const tipOptions = [
    { label: "5%", value: 0.05 },
    { label: "10%", value: 0.10 },
    { label: "15%", value: 0.15 },
  ];

  const handleConfirm = () => {
    const tipAmount = selectedTip !== null 
      ? subtotal * selectedTip 
      : parseFloat(customTip) || 0;
    onConfirm(tipAmount);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border">
        <SheetHeader>
          <SheetTitle className="font-cinzel text-2xl text-primary">Gorjeta</SheetTitle>
          <SheetDescription className="font-cormorant text-muted-foreground">
            Seu reconhecimento faz toda a diferença
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {tipOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedTip === option.value ? "default" : "outline"}
                className="font-cinzel"
                onClick={() => {
                  setSelectedTip(option.value);
                  setCustomTip("");
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="font-cormorant">Outro valor (R$)</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={customTip}
              onChange={(e) => {
                setCustomTip(e.target.value);
                setSelectedTip(null);
              }}
              className="font-cormorant"
            />
          </div>

          <Button
            variant="outline"
            className="w-full font-cinzel"
            onClick={() => {
              setSelectedTip(0);
              setCustomTip("");
            }}
          >
            Sem Gorjeta
          </Button>

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between mb-4">
              <span className="font-cormorant text-muted-foreground">Valor da gorjeta:</span>
              <span className="font-cinzel text-primary">
                R$ {(selectedTip !== null 
                  ? (subtotal * selectedTip).toFixed(2) 
                  : (parseFloat(customTip) || 0).toFixed(2)
                )}
              </span>
            </div>

            <Button
              onClick={handleConfirm}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel"
            >
              Confirmar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
