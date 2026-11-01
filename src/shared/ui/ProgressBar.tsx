import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label?: string;
  indicatorClassName?: string;
}

const ProgressBar = ({
  value,
  label,
  indicatorClassName = "",
}: ProgressBarProps) => {
  return (
    <Progress
      value={value}
      className={cn(
        indicatorClassName ??
          "**:data-[slot=progress-indicator]:bg-green-accent-500 bg-[#ece9e2] w-full",
      )}
    >
      <Label>{label}</Label>
      <p>{value}</p>
    </Progress>
  );
};

export default ProgressBar;
