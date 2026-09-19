import AppCheckbox from "@/shared/ui/AppCheckbox";
import ProgressBar from "@/shared/ui/ProgressBar";

interface HabitProgressProps {
  completed?: boolean;
  goalType?: "quantity" | "binary";
  completionRate: number;
  unit: string;
  targetValue: number;
  weeksCount: number;
  trackedValue: number;
  totalTargetValue: number;
  onToggleCompletion: () => void;
}

const HabitProgress = ({
  completionRate,
  completed = false,
  goalType,
  unit,
  targetValue,
  weeksCount,
  trackedValue,
  totalTargetValue,
  onToggleCompletion,
}: HabitProgressProps) => {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 w-full py-3 text-sm text-gray-400 font-mono">
        <span className="uppercase font-mono text-sm">
          progress - click to mark as done
        </span>
        <div className="flex-1 w-full h-px border" />
      </div>

      <div className="border border-gray-300 rounded-md">
        {goalType === "binary" ? (
          <div className="flex items-center gap-1 border-b px-3 py-1">
            <AppCheckbox onChange={onToggleCompletion} checked={completed} />
            <div className="flex flex-col px-3 py-4">
              <p className="text-black font-semibold">
                {completed ? `Completed` : "Mark as Done"}
              </p>
              <p className="capitalize font-mono text-sm">
                {goalType} - Tap to toggle
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-3 py-1">
            <div>
              <span className="text-[#22C55E] font-bold font-mono text-4xl">
                {trackedValue}
              </span>
              <span className="font-mono text-xl">
                {" "}
                / {totalTargetValue} {unit}
              </span>
            </div>

            <span className="font-mono text-xs font-light">
              {targetValue} {unit} • {weeksCount}{" "}
              {weeksCount > 1 ? "weeks" : "week"} tracked
            </span>
          </div>
        )}

        <div className="flex flex-col px-3 pt-6 pb-3">
          <div className="flex justify-between font-mono text-sm text-[#7a7470]">
            <p>Days completed</p>
            <p>{completionRate}%</p>
          </div>
          <ProgressBar value={completionRate} />
        </div>
      </div>
    </div>
  );
};

export default HabitProgress;
