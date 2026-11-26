"use client";

import { Box, CheckCircle, Sun, TriangleAlert } from "lucide-react";

import ShortStatCard from "../ShortStatCard";
import { useGetTasksStats } from "../../hooks/useTaskManagementQueries";
import OverviewSkeleton from "../skeletons/OverviewSkeleton";
import { Scope } from "../../lib/url";
import AppEmpty from "@/shared/ui/AppEmpty";

interface StatsGridProps {
  scope: Scope;
}

const StatsGrid = ({ scope }: StatsGridProps) => {
  const { data: tasksStats, isPending } = useGetTasksStats(scope);

  if (isPending) return <OverviewSkeleton />;

  if (!tasksStats)
    return (
      <AppEmpty
        emptyTitle="No stats recorded"
        emptyClassName="border border-dashed border-gray-500 text-gray-500"
      />
    );
  return (
    <div className="grid grid-cols-2 gap-5">
      <ShortStatCard
        title="open"
        quantity={tasksStats?.open}
        shortDescription={`${tasksStats?.inProgress} in progress`}
        icon={<Box className="size-4" />}
        iconType="open"
      />
      <ShortStatCard
        title="due today"
        quantity={tasksStats?.dueToday}
        shortDescription="Let's get them done!"
        icon={<Sun className="size-4" />}
        iconType="dueToday"
      />
      <ShortStatCard
        title="overdue"
        quantity={tasksStats?.overdue}
        shortDescription="Needs attention"
        icon={<TriangleAlert className="size-4" />}
        iconType="overdue"
      />
      <ShortStatCard
        title="done this week"
        quantity={tasksStats?.doneThisWeek}
        shortDescription="Last 7 days"
        icon={<CheckCircle className="size-4" />}
        iconType="doneThisWeek"
      />
    </div>
  );
};

export default StatsGrid;
