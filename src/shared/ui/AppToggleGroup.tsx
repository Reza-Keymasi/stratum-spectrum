import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type GroupType = "single" | "multiple";

interface BaseToggleGroupProps {
  items: string[];
  itemsContainerClassName?: string;
  itemClassName?: string;
  spacing?: number;
  variant: "default" | "outline";
}

interface SingleToggleGroupProps<
  T extends GroupType,
> extends BaseToggleGroupProps {
  type: T;
  value: string;
  onValueChange: (value: string) => void;
}

interface MultipleToggleGroupProps<
  T extends GroupType,
> extends BaseToggleGroupProps {
  type: T;
  value: string[];
  onValueChange: (value: string[]) => void;
}

type AppToggleGroupProps =
  | SingleToggleGroupProps<"single">
  | MultipleToggleGroupProps<"multiple">;

const AppToggleGroup = ({
  type,
  value,
  onValueChange,
  items,
  itemsContainerClassName,
  itemClassName,
  variant = "default",
  spacing = 5,
  ...props
}: AppToggleGroupProps) => {
  return (
    <ToggleGroup
      {...({
        type,
        value: value ?? (type === "multiple" ? [] : ""),
        onValueChange,
      } as any)}
      // variant="outline"
      value={value}
      onValueChange={onValueChange}
      spacing={spacing}
      className={cn(
        itemsContainerClassName,
        // "border border-sky-500/30 rounded-md px-1",
      )}
      {...props}
    >
      {items.map((item, index) => (
        <ToggleGroupItem
          key={`${item}-${index}`}
          value={item}
          variant={variant}
          className={cn(
            "capitalize rounded-md cursor-pointer data-[state=on]:bg-green-500 data-[state=on]:text-white hover:bg-green-500/70 hover:text-white",
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
