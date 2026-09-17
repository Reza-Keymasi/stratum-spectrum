import { Skeleton } from "@/components/ui/skeleton";

export const HabitDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Top Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <Skeleton className="h-8 md:h-9 w-64 rounded-md" />
          {/* Description */}
          <Skeleton className="h-4 w-80 rounded-md" />
          {/* Category Badges */}
          <div className="flex gap-2 mt-1">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* Type Badge (Build/Break habit) */}
        <Skeleton className="h-7 w-28 rounded-sm" />
      </div>

      {/* Short Stats Grid */}
      <div className="flex border border-gray-200 rounded-md mt-10">
        <div className="flex-1 border-r flex flex-col gap-2 px-3 py-4">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex-1 border-r flex flex-col gap-2 px-3 py-4">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex-1 flex flex-col gap-2 px-3 py-4">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Days Of Weeks Section */}
      <div className="mt-10">
        {/* Section Title Divider */}
        <div className="flex items-center gap-2 w-full py-3">
          <Skeleton className="h-4 w-64" />
          <div className="flex-1 h-px border-b border-gray-200" />
        </div>

        {/* Frequency Container */}
        <div className="flex flex-col border border-gray-300 rounded-md overflow-hidden">
          {/* Container Header */}
          <div className="flex justify-between items-center bg-muted border-b border-gray-300 px-4 py-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-8" />
          </div>

          {/* Week Row 7-Day Grid Placeholder */}
          <div className="grid grid-cols-3 lg:grid-cols-7 gap-x-4 gap-y-4 lg:gap-x-2 lg:gap-y-0 px-4 py-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-18 md:h-26 w-full rounded-sm"
              />
            ))}
          </div>
        </div>

        {/* Add Week Button Placeholder */}
        <Skeleton className="w-full h-12 rounded-md mt-5" />
      </div>

      {/* Total Progress Section */}
      <div className="mt-10">
        {/* Section Title Divider */}
        <div className="flex items-center gap-2 w-full py-3">
          <Skeleton className="h-4 w-56" />
          <div className="flex-1 h-px border-b border-gray-200" />
        </div>

        {/* Checkbox Container Placeholder */}
        <div className="border border-gray-300 rounded-md p-4 flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-sm" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
};

export default HabitDetailsSkeleton;
