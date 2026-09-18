export type DaysOfWeek = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";

type FrequencyType = "daily" | "specific_days";
// | "times_per_week"
// | "custom_interval";

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
  userId: string;
  weekNumber: number;
  frequencyType: FrequencyType;
  // specific_days only
  activeDays?: DaysOfWeek[];
  // times_per_week only
  requiredCount?: number;
  // custom_interval only
  interval?: number;
  // all types
  days: DayEntry[];
  // completed: boolean;
  createdAt: string;
  updatedAt: string;
}
