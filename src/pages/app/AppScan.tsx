import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AppScan() {
  const navigate = useNavigate();
  const [manualMesa, setManualMesa] = useState("");
  const [cameraRequested, setCameraRequested] = useState(false);

  const handleRequestCamera = () => {
    setCameraRequested(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        toast.success("Câmera ativada!", {
          description: "Aponte para o QR code da mesa"
        });
        // In a real app, would start QR scanner here
      })
      .catch(() => {
        toast.error("Não foi possível acessar a câmera", {
          description: "Use a opção de entrada manual"
        });
      });
  };

  const handleManualInput = () => {
    if (!manualMesa.trim()) {
      toast.error("Digite o número da mesa");
      return;
    }

    localStorage.setItem('mesa-id', manualMesa);
    toast.success(`Mesa ${manualMesa} ativada!`);
    navigate('/app/cardapio');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-card/50 to-background border-b border-border p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-cinzel text-4xl text-primary mb-2">Scan QR da Mesa</h1>
          <p className="font-cormorant text-xl text-muted-foreground italic">
            Ative o serviço de mesa
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {/* QR Scanner */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <QrCode className="h-24 w-24 text-primary mx-auto mb-6" />
          <h2 className="font-cinzel text-2xl text-foreground mb-3">
            Escanear QR Code
          </h2>
          <p className="font-cormorant text-muted-foreground mb-6">
            Aponte a câmera para o QR code disponível na sua mesa
          </p>
          
          {!cameraRequested && (
            <Button
              onClick={handleRequestCamera}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel"
            >
              Ativar Câmera
            </Button>
          )}

          {cameraRequested && (
            <div className="bg-muted/30 border-2 border-dashed border-primary/30 rounded-lg h-64 flex items-center justify-center">
              <p className="font-cormorant text-muted-foreground">
                [Visualização da câmera]
              </p>
            </div>
          )}
        </div>

        {/* Manual Input */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-5 w-5 text-primary" />
            <h3 className="font-cinzel text-xl text-primary">Entrada Manual</h3>
          </div>
          <p className="font-cormorant text-sm text-muted-foreground mb-4">
            Digite o número da mesa caso não consiga escanear o QR code
          </p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="mesa" className="font-cormorant">Número da Mesa</Label>
              <Input
                id="mesa"
                type="text"
                placeholder="Ex: 12"
                value={manualMesa}
                onChange={(e) => setManualMesa(e.target.value)}
                className="font-cormorant mt-2"
              />
            </div>
            <Button
              onClick={handleManualInput}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel"
            >
              Confirmar Mesa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
