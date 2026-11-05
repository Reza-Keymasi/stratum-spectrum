import { Skeleton } from "@/components/ui/skeleton";

const CategoryBudgetSkeleton = () => {
  const skeletonRows = Array.from({ length: 7 });

  return (
    <div className="border border-gray-200 rounded-md divide-y divide-gray-100">
      {skeletonRows.map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 gap-4"
        >
          <Skeleton className="h-4 w-28 bg-gray-200" />

          <div className="flex-1 max-w-[45%]">
            <Skeleton className="h-2 w-full bg-gray-200 rounded-full" />
          </div>

          <Skeleton className="h-4 w-16 bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default CategoryBudgetSkeleton;
