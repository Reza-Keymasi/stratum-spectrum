"use client";

import { cn } from "@/lib/utils";
import { useGetBudgetShortStats } from "../hooks/useBudgetQueries";
import ShortStatsSkeleton from "./skeletons/ShortStatsSkeleton";
import { formatNumber } from "../utils/utils";

const ShortStats = () => {
  const { data: stats, isPending } = useGetBudgetShortStats();
  if (isPending) return <ShortStatsSkeleton />;

  const statsArr = [
    {
      label: "income",
      value: stats ? formatNumber(stats?.income) : null,
      sign: "$",
    },
    {
      label: "expense",
      value: stats ? formatNumber(stats?.expense) : null,
      sign: "$",
    },
    { label: "net", value: stats ? formatNumber(stats?.net) : null, sign: "$" },
    {
      label: "budget used",
      value: stats ? formatNumber(stats?.budgetUsed) : null,
      sign: "%",
    },
  ];

  return (
    <div className="flex border border-gray-200 rounded-md mt-10">
      {statsArr.map((stat, index) => {
        const first = index === 0;
        return (
          <div
            key={stat.label}
            className={cn(
              "flex flex-1 flex-col gap-1 px-3 py-4 font-mono",
              first ? "" : "border-l",
            )}
          >
            <span className="text-xs text-gray-400 uppercase">
              {stat.label}
            </span>
            <span className="text-green-accent-500 text-lg">
              {stat.sign}
              {stat?.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ShortStats;
