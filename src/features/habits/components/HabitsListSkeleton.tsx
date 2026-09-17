import { Skeleton } from "@/components/ui/skeleton";

export const HabitsListSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 my-3 w-full">
      {/* Header Section */}
      <div className="px-20 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          {/* Tagline skeleton */}
          <Skeleton className="h-3 w-28" />
          {/* Main title skeleton */}
          <Skeleton className="h-9 w-44" />
        </div>

        {/* Date skeleton */}
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Divider */}
      <div className="w-full border-b border-border" />

      <div>
        {/* Positive Habits Section */}
        <div className="max-w-5xl mx-auto flex flex-col mt-2 mb-8">
          <div className="flex items-center gap-2 w-full py-3">
            <Skeleton className="h-4 w-12" />
            <div className="w-full h-px border-b border-border" />
            <Skeleton className="h-4 w-4" />
          </div>
          {/* Mock Habit Rows */}
          <div className="flex flex-col gap-3 mt-2">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>

        {/* Negative Habits Section */}
        <div className="max-w-5xl mx-auto flex flex-col">
          <div className="flex items-center gap-2 w-full py-3">
            <Skeleton className="h-4 w-12" />
            <div className="w-full h-px border-b border-border" />
            <Skeleton className="h-4 w-4" />
          </div>
          {/* Mock Habit Rows */}
          <div className="flex flex-col gap-3 mt-2">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitsListSkeleton;
