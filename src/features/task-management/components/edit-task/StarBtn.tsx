import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StarBtnProps {
  starred: boolean;
  onStar: (starred: boolean) => void;
}

const StarBtn = ({ starred, onStar }: StarBtnProps) => {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => onStar(!starred)}
      className="cursor-pointer"
    >
      <Star
        className={cn(
          "size-4",
          starred ? "fill-amber-400 text-amber-400" : "text-gray-400",
        )}
      />
    </Button>
  );
};

export default StarBtn;
