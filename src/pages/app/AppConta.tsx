import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AppConta() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [preferences] = useState(['Doce', 'Cítrico', 'Forte']);

  const handleLogout = () => {
    localStorage.removeItem('session');
    toast.success("Até logo!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-card/50 to-background border-b border-border p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-cinzel text-4xl text-primary mb-2">Minha Conta</h1>
          <p className="font-cormorant text-xl text-muted-foreground italic">
            Gerencie suas preferências
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Profile */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-cinzel text-xl text-primary mb-6 flex items-center gap-2">
            <User className="h-5 w-5" />
            Dados Pessoais
          </h2>
          <div className="space-y-4">
            <div>
              <Label className="font-cormorant text-muted-foreground">Nome</Label>
              <p className="font-cinzel text-lg text-foreground mt-1">Navegador</p>
            </div>
            <div>
              <Label className="font-cormorant text-muted-foreground">Email</Label>
              <p className="font-cormorant text-foreground mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                navegador@example.com
              </p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-cinzel text-xl text-primary mb-6">
            Preferências de Sabor
          </h2>
          <div className="flex flex-wrap gap-2">
            {preferences.map((pref) => (
              <Badge 
                key={pref} 
                className="bg-primary/10 text-primary border-primary/20 font-cormorant px-4 py-2"
              >
                {pref}
              </Badge>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <Label className="font-cinzel text-foreground">Notificações</Label>
                <p className="font-cormorant text-sm text-muted-foreground">
                  Receba atualizações dos seus pedidos
                </p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full font-cinzel"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair da Conta
        </Button>
      </div>
    </div>
  );
}
