import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logoNobre from "@/assets/logo-cais-nobre-principal.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Set mock session
    localStorage.setItem('session', JSON.stringify({ email, loggedIn: true }));
    
    toast.success("Bem-vindo, explorador!", {
      description: "Prepare-se para uma experiência inesquecível",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/menu");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[390px] space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <img 
            src={logoNobre} 
            alt="Cais Nobre Bar & Cocktails" 
            className="w-48 h-48 object-contain animate-fade-in"
          />
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">
              Bem-vindo
            </h1>
            <p className="text-muted-foreground text-sm">
              Entre no mundo dos drinks sofisticados
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Entrar no Cais
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Primeira vez aqui?{" "}
          <button className="text-primary hover:underline font-medium transition-colors">
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
