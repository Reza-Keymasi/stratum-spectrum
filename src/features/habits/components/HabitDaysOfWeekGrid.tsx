import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { HabitEntry } from "../types/habit-entry.types";
import { getDayOfWeek } from "../utils/utils";
import { Button } from "@/components/ui/button";

interface HabitDaysOfWeekProps {
  entries?: HabitEntry[];
  onDayClick: (dayIndex: number, weekNumber: number) => void;
  onAddWeek: () => void;
}

const HabitDaysOfWeekGrid = ({
  entries,
  onAddWeek,
  onDayClick,
}: HabitDaysOfWeekProps) => {
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
                {days.map((day) => (
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
                    onClick={() => onDayClick(day.index, weekNumber)}
                  >
                    {getDayOfWeek(day.date)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        className="w-full border border-dashed border-[#ece9e2] rounded-md text-[#7a7470] bg-transparent hover:bg-gray-100 mt-5 py-5 cursor-pointer"
        onClick={() => onAddWeek()}
        // disabled={
        //   habit?.frequency.frequencyType === "daily" && entries?.length === 4
        // }
      >
        <Plus />
        Add Week
      </Button>
    </div>
  );
};

export default HabitDaysOfWeekGrid;
