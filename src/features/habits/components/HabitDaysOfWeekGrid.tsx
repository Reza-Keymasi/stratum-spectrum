import { CheckIcon, Plus, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { HabitEntry } from "../types/habit-entry.types";
import { getDayDisplay, getDayOfWeek } from "../utils/utils";
import { Button } from "@/components/ui/button";
import { GetHabit } from "../types/habit.schema";

interface HabitDaysOfWeekProps {
  entries?: HabitEntry[];
  onDayClick: (dayIndex: number, weekNumber: number) => void;
  onBoxClick?: (
    dayindex: number,
    weekNumber: number,
    action: "increment" | "decrement",
  ) => void;
  onAddWeek: () => void;
  habit?: GetHabit;
}

const HabitDaysOfWeekGrid = ({
  entries,
  onAddWeek,
  onDayClick,
  onBoxClick,
  habit,
}: HabitDaysOfWeekProps) => {
  const handleClickOnDay = (dayIndex: number, weekNumber: number): void => {
    if (habit?.frequency.frequencyType === "times_per_week") return;

    onDayClick(dayIndex, weekNumber);
  };

  const handleClickOnBoxes = (
    dayIndex: number,
    weekNumber: number,
    action: "increment" | "decrement",
  ) => {
    if (!action) return;

    onBoxClick?.(dayIndex, weekNumber, action);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 w-full py-3 text-sm text-gray-400 font-mono">
        <span className="uppercase font-mono text-sm">
          frequency - click a day to mark done
        </span>
        <div className="flex-1 w-full h-px border" />
      </div>

      <div className="flex flex-col border border-gray-300 rounded-md overflow-hidden">
        <div className="flex justify-between text-sm font-mono text-gray-400 bg-muted border-b border-gray-300 px-4 py-3">
          <span>WEEKS</span>
        </div>

        <div>
          {entries?.map((entry) => {
            const days = entry.days;
            const weekNumber = entry.weekNumber;
            return (
              <div
                className="grid grid-cols-3 lg:grid-cols-7 gap-x-4 gap-y-4 lg:gap-x-2 lg:gap-y-0 px-4 py-3"
                key={entry?._id}
              >
                {days.map((day) => {
                  const display =
                    entry.frequencyType === "times_per_week"
                      ? getDayDisplay(day.value ?? 0)
                      : null;

                  return (
                    <div
                      className="flex flex-col gap-1"
                      key={`${entry._id}_${entry.weekNumber}_${day.index}`}
                    >
                      <div
                        className={cn(
                          "p-6 md:p-10 font-mono text-md text-center rounded-sm transition-colors capitalize",
                          day.active
                            ? day.done
                              ? "bg-green-400 text-white cursor-pointer"
                              : "bg-[#ece9e2] text-[#7a7470] cursor-pointer"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed",

                          !day.active &&
                            day.done &&
                            "bg-green-400/50 text-white cursor-not-allowed",
                        )}
                        key={getDayOfWeek(day.date)}
                        onClick={() => handleClickOnDay(day.index, weekNumber)}
                      >
                        {getDayOfWeek(day.date)}
                      </div>

                      {display && (
                        <div className="flex justify-center gap-2">
                          {display.boxes.map((box) => {
                            return (
                              <span
                                key={`${box.index}_${Math.random()}`}
                                className={cn(
                                  "border flex items-center rounded-xs px-0.5",
                                  box.checked && "bg-green-400 text-white",
                                  !day.active &&
                                    "opacity-40 cursor-not-allowed",
                                  day.active &&
                                    box.clickable &&
                                    "cursor-pointer",
                                  day.active &&
                                    !box.clickable &&
                                    "cursor-default opacity-60",
                                )}
                                onClick={() => {
                                  day.active &&
                                    handleClickOnBoxes(
                                      day.index,
                                      weekNumber,
                                      box.action!,
                                    );
                                }}
                              >
                                <CheckIcon className="size-3" />
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        className="w-full border border-dashed border-[#ece9e2] rounded-md text-[#7a7470] bg-transparent hover:bg-gray-100 mt-5 py-5 cursor-pointer"
        onClick={() => onAddWeek()}
      >
        <Plus />
        Add Week
      </Button>
    </div>
  );
};

export default HabitDaysOfWeekGrid;
