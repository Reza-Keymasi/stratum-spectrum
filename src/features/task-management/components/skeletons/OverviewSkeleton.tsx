import { Skeleton } from "@/components/ui/skeleton";

const OverviewSkeleton = () => {
  const statCards = Array.from({ length: 4 });
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        {statCards.map((_, index) => (
          <div
            className="flex flex-col gap-2 bg-white border border-gray-200 px-3 py-2 rounded-md"
            key={index}
          >
            {/* Title & Icon box */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-8 rounded-sm" />
            </div>
            {/* Quantity number */}
            <Skeleton className="h-7 w-8 my-0.5" />
            {/* Short description */}
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </>
  );
};

export default OverviewSkeleton;
