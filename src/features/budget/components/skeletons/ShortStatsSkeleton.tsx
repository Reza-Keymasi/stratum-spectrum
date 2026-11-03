"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ShortStatsSkeleton = () => {
  return (
    <div className="flex border border-gray-200 rounded-md mt-10">
      {[1, 2, 3, 4].map((_, index) => {
        const first = index === 0;
        return (
          <div
            key={index}
            className={cn(
              "flex flex-1 flex-col gap-2 px-3 py-4 font-mono",
              first ? "" : "border-l border-gray-200",
            )}
          >
            <Skeleton className="h-3 w-16 bg-gray-200" />
            <Skeleton className="h-6 w-24 bg-gray-200" />
          </div>
        );
      })}
    </div>
  );
};

export default ShortStatsSkeleton;
