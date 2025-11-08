import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
}

export const ProgressBar = ({ current, total, label }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-cormorant text-sm text-muted-foreground">{label}</span>
        <span className="font-cinzel text-xs text-primary font-bold">
          {current}/{total}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-muted/20"
      />
    </div>
  );
};
