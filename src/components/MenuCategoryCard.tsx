import { LucideIcon } from "lucide-react";

interface MenuCategoryCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const MenuCategoryCard = ({ title, icon: Icon, description }: MenuCategoryCardProps) => {
  return (
    <div className="group relative">
      {/* Hexagonal shape effect */}
      <div className="relative h-64 bg-card/30 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden clip-hexagon">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon className="relative w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
          
          <h3 className="font-cinzel text-2xl font-bold text-primary mb-2 group-hover:drop-shadow-[0_0_10px_rgba(242,228,200,0.5)] transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm font-cormorant">
            {description}
          </p>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};
