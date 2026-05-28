import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { on } from "events";

interface AppToggleGroup {
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
  itemsContainerClassName?: string;
  itemClassName?: string;
  variant?: "outline" | "default";
  spacing?: number;
}

const AppToggleGroup = ({
  value,
  onValueChange,
  items,
  itemsContainerClassName,
  itemClassName,
  variant = "default",
  spacing = 5,
}: AppToggleGroup) => {
  return (
    <ToggleGroup
      type="single"
      // variant="outline"
      value={value}
      onValueChange={onValueChange}
      spacing={spacing}
      className={cn(
        itemsContainerClassName,
        // "border border-sky-500/30 rounded-md px-1",
      )}
    >
      {items.map((item, index) => (
        <ToggleGroupItem
          key={`${item}-${index}`}
          value={item}
          variant={variant}
          className={cn(
            "capitalize rounded-md cursor-pointer data-[state=on]:bg-sky-500/30 hover:bg-sky-500/10",
            itemClassName,
          )}
        >
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default AppToggleGroup;
