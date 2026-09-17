import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  label?: string;
}

const ProgressBar = ({ value, label }: ProgressBarProps) => {
  return (
    <Progress
      value={value}
      className="**:data-[slot=progress-indicator]:bg-[#22C55E] bg-[#ece9e2] w-full"
    >
      <Label>{label}</Label>
      <p>{value}</p>
    </Progress>
  );
};

export default ProgressBar;
