import { Box, CheckCircle, Sun, TriangleAlert } from "lucide-react";

import { useGetTasksStats } from "../../hooks/useTaskManagementQueries";
import { Scope } from "../../lib/url";
import ShortStatCard from "../ShortStatCard";
import OverviewSkeleton from "../skeletons/OverviewSkeleton";

interface TaskOverviewProps {
  scope: Scope;
}

const TaskOverview = ({ scope }: TaskOverviewProps) => {
  const { data: tasksStats, isPending } = useGetTasksStats(scope);

  if (isPending) return <OverviewSkeleton />;

  if (!tasksStats) return <>No data</>;

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

export default TaskOverview;
