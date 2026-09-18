interface HabitShortStatsProps {
  activeDaysCount: number;
  completionRate: number;
  weeksCount?: number;
  goalType?: "binary" | "quantity";
}

const HabitShortStats = ({
  activeDaysCount,
  completionRate,
  weeksCount,
  goalType,
}: HabitShortStatsProps) => {
  return (
    <div className="flex border border-gray-200 rounded-md mt-10 font-mono">
      <div className="flex-1 border-r flex flex-col gap-1 px-3 py-4">
        <p>
          <span className="px-px text-2xl text-green-400">
            {activeDaysCount}
          </span>
          <span className="text-xs text-gray-400">Days</span>
        </p>
        <span className="text-xs text-gray-400">Streak</span>
      </div>
      <div className="flex-1 border-r flex flex-col gap-1 px-3 py-4">
        <span className="text-2xl">{completionRate ?? 0}%</span>
        <span className="text-xs text-gray-400">
          {weeksCount} {weeksCount && weeksCount > 1 ? "WEEKS" : "WEEK"}
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-1 px-3 py-4">
        <span className="text-2xl">{goalType}</span>
        <span className="text-xs text-gray-400">Goal Type</span>
      </div>
    </div>
  );
};

export default HabitShortStats;
