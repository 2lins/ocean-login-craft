import { ChevronDown } from "lucide-react";

export const ScrollIndicator = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/60 hover:text-primary transition-colors duration-300 group"
      aria-label="Scroll para baixo"
    >
      <span className="text-sm font-cormorant uppercase tracking-wider">Scroll</span>
      <ChevronDown className="w-6 h-6 animate-bounce" />
    </button>
  );
};
