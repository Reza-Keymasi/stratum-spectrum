import { cn } from "@/lib/utils";
import { FREQUENCY_STYLES_MAP } from "../constants/habitConstants";
import { GetHabit } from "../types/habit.schema";

interface Props {
  habit: GetHabit;
}

const FrequencyType = ({ habit }: Props) => {
  const frequencyType = habit?.frequency?.frequencyType;
  return (
    <>
      {frequencyType === "daily" && (
        <span
          className={cn(
            FREQUENCY_STYLES_MAP[frequencyType],
            "px-2 py-1 rounded-md",
          )}
        >
          DAILY
        </span>
      )}

      {frequencyType === "specific_days" && (
        <div>
          {habit.frequency.daysOfWeek.map((day) => (
            <span
              key={day}
              className={cn(
                "last:after:content-[''] after:content-['-'] first:pl-2 last:pr-2 first:rounded-l-md last:rounded-r-md py-1",
                FREQUENCY_STYLES_MAP[frequencyType],
              )}
            >
              {day}
            </span>
          ))}
        </div>
      )}

      {frequencyType === "times_per_week" && (
        <span
          className={cn(
            FREQUENCY_STYLES_MAP[frequencyType],
            "px-2 py-1 rounded-md",
          )}
        >
          {habit.frequency.timesPerWeek} D/Week
        </span>
      )}

      {frequencyType === "custom_interval" && (
        <span
          className={cn(
            FREQUENCY_STYLES_MAP[frequencyType],
            "px-2 py-1 rounded-md",
          )}
        >
          {habit.frequency.customInterval}x/Week
        </span>
      )}
    </>
  );
};

export default FrequencyType;
