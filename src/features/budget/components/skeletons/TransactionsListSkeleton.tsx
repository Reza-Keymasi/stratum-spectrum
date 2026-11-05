"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TYPE_FILTERS,
  useSwitchTransactionType,
} from "../../hooks/useSwitchTransactionType";
import { cn } from "@/lib/utils";

const TransactionsListSkeleton = () => {
  const { setType, type } = useSwitchTransactionType();
  const skeletonRows = Array.from({ length: 6 });

  return (
    <div className="mt-8 font-mono">
      <div className="flex gap-2 mx-2">
        {TYPE_FILTERS.map((t) => {
          const isActive = t === type;
          return (
            <Button
              key={t}
              variant="ghost"
              className={cn(
                "hover:bg-transparent border-b border-b-transparent shadow-none rounded-none uppercase cursor-pointer",
                isActive
                  ? "border-b-2 border-b-green-accent-500 text-green-accent-500"
                  : "text-gray-400",
              )}
              onClick={() => setType(t)}
            >
              {t}
            </Button>
          );
        })}
      </div>

      <ul className="mt-4">
        {skeletonRows.map((_, index) => (
          <li
            key={index}
            className={cn(
              "flex justify-between items-center",
              "py-3 px-5 border-l-3 border-l-gray-200 border-b first:border-t border-r first:rounded-t-md last:rounded-b-md border-gray-200 bg-white",
            )}
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-12 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-5 w-16 rounded-sm bg-gray-200" />
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-20 bg-gray-200" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsListSkeleton;
