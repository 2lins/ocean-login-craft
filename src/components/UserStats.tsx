import { Trophy, Star, Target } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
    <div className="text-primary">{icon}</div>
    <span className="font-cinzel text-2xl font-bold text-primary">{value}</span>
    <span className="font-cormorant text-xs text-muted-foreground">{label}</span>
  </div>
);

export const UserStats = () => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
      <StatCard 
        icon={<Trophy className="w-6 h-6" />}
        value={1250}
        label="Pontos"
      />
      <StatCard 
        icon={<Star className="w-6 h-6" />}
        value={8}
        label="Emblemas"
      />
      <StatCard 
        icon={<Target className="w-6 h-6" />}
        value={3}
        label="Missões"
      />
    </div>
  );
};
