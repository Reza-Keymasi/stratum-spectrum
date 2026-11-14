import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type IconType = "open" | "dueToday" | "overdue" | "doneThisWeek";

interface ShortStatCardProps {
  title: string;
  icon: ReactNode;
  quantity: number;
  shortDescription: string;
  iconType: IconType;
}

const IconStylesMap: Record<IconType, string> = {
  open: "bg-sky-100 text-sky-500",
  dueToday: "bg-rose-50 text-rose-500",
  overdue: "bg-orange-100 text-orange-500",
  doneThisWeek: "bg-emerald-100 text-emerald-500",
};

const ShortStatCard = ({
  title,
  icon,
  quantity,
  shortDescription,
  iconType,
}: ShortStatCardProps) => {
  const iconStyles = IconStylesMap[iconType];

  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-300 px-3 py-2 rounded-md">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400 uppercase">{title}</span>
        <div className={cn("rounded-sm p-2", iconStyles)}>
          <span>{icon}</span>
        </div>
      </div>
      <span className="text-xl font-bold font-inter">{quantity}</span>
      <span className="text-sm text-gray-400">{shortDescription}</span>
    </div>
  );
};

export default ShortStatCard;
