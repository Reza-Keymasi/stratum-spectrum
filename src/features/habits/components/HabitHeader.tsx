import { cn } from "@/lib/utils";
import { CATEGORY_STYLES } from "../constants/habitConstants";

type CategoryKey = keyof typeof CATEGORY_STYLES;

interface HabitHeaderProps {
  title?: string;
  description?: string;
  categories?: CategoryKey[];
  isNegative?: boolean;
}

const HabitHeader = ({
  title,
  description,
  categories,
  isNegative,
}: HabitHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-3">
        <span className="text-2xl md:text-3xl font-bold text-black capitalize">
          {title}
        </span>
        <span className="text-sm text-gray-400">{description}</span>
        <div className="flex gap-2">
          {categories?.map((cat) => (
            <span className={cn(CATEGORY_STYLES[cat].full)} key={cat}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      <span
        className={cn(
          "border h-fit px-3 py-1 rounded-sm font-mono font-light",
          isNegative
            ? "border-[#d43030] text-[#d43030]"
            : "border-[#5a8f00] text-[#5a8f00]",
        )}
      >
        {isNegative ? "break" : "build"} habit
      </span>
    </div>
  );
};

export default HabitHeader;
