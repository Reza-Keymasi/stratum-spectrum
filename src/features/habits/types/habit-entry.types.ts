export type DaysOfWeek = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";

type FrequencyType = "daily" | "specific_days" | "times_per_week";

export interface DayEntry {
  index: number;
  date: Date;
  done: boolean;
  active: boolean;
  value?: number | null;
}

export interface HabitEntry {
  _id: string;
  habitId: string;
  weekNumber: number;
  frequencyType: FrequencyType;
  weekStartDay?: "sunday" | "saturday";
  // specific_days only
  activeDays?: DaysOfWeek[];
  // times_per_week only
  requiredCount?: number;
  days: DayEntry[];
  createdAt: string;
  updatedAt: string;
}
