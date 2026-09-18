import Link from "next/link";

import { GetHabit as Habit } from "../types/habit.schema";
import { cn } from "@/lib/utils";
import { CATEGORY_STYLES } from "../constants/habitConstants";
import FrequencyType from "./FrequencyType";

interface HabitRowProps {
  habit: Habit;
}

const HabitRow = ({ habit }: HabitRowProps) => {
  const frequencyType = habit?.frequency?.frequencyType;

  return (
    <Link
      href={`/habits/list/${habit._id}`}
      className="flex justify-between gap-3 first:rounded-t-lg last:rounded-b-lg px-5 py-4 border border-gray-200 hover:bg-gray-100"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-sky-300" />
          <div>
            <span className="text-lg font-semibold text-gray-600">
              {habit.title}
            </span>

            <div className="flex flex-wrap gap-3">
              {habit.categories?.map((cat) => (
                <span
                  key={cat}
                  className={cn(
                    "text-xs font-semibold font-mono",
                    CATEGORY_STYLES[cat].text,
                  )}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 items-center font-mono">
        <FrequencyType habit={habit} />

        {habit?.goalType === "binary" && (
          <span className="text-gray-700 border border-neutral-300 rounded-sm px-2">
            Binary
          </span>
        )}
        {habit?.goalType === "quantity" && (
          <p className="border border-neutral-300 rounded-sm px-2">
            <span className="text-gray-700 ">{habit?.targetValue}</span>
            <span className="text-gray-400">{habit?.unit}</span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default HabitRow;
