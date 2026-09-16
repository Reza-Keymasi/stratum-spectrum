import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface AppCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const AppCheckbox = ({ checked, onChange, className }: AppCheckboxProps) => {
  return (
    <Checkbox
      className={cn(
        "border border-gray-300 data-[state=checked]:bg-[#22C55E] data-[state=checked]:border-transparent h-10 w-10",
        className,
      )}
      checked={checked}
      onCheckedChange={onChange}
    />
  );
};

export default AppCheckbox;
