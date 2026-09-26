import { CreateHabitInput } from "../types/habit.schema";
import { DayEntry, DaysOfWeek, HabitEntry } from "../types/habit-entry.types";
import { DAYS_OF_WEEK } from "../constants/habitConstants";

// -----------------------------------------------
// Build month days array
// -----------------------------------------------

const getStartOfWeek = (weekStartDay: 0 | 6): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  const diff = (currentDay - weekStartDay + 7) % 7;
  startOfWeek.setDate(today.getDate() - diff);
  return startOfWeek;
};

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getDayOfWeek = (date: Date) => {
  return DAYS_OF_WEEK[new Date(date).getDay()];
};

const buildWeekDays = (
  getActive: (date: Date) => boolean,
  weekStartDay: 0 | 6 = 0,
  startDate?: Date,
): DayEntry[] => {
  const today = getToday();
  const startOfWeek = startDate ?? getStartOfWeek(weekStartDay);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return {
      index,
      date,
      done: false,
      active: date < today ? false : getActive(date),
    };
  });
};

// -----------------------------------------------
// Build initial entry data from habit's frequency
// -----------------------------------------------

export const buildInitialEntryData = (
  habit: CreateHabitInput,
  weekStartDay: 0 | 6 = 0,
): Omit<
  HabitEntry,
  "_id" | "habitId" | "userId" | "createdAt" | "updatedAt"
> => {
  const { frequency } = habit;

  const base = {
    weekNumber: 1,
    completed: false,
    completionRate: 0,
  };

  switch (frequency.frequencyType) {
    case "daily":
      return {
        ...base,
        frequencyType: frequency.frequencyType,
        days: buildWeekDays(() => true, weekStartDay),
      };

    case "specific_days":
      return {
        ...base,
        frequencyType: frequency.frequencyType,
        activeDays: frequency.daysOfWeek as DaysOfWeek[],
        days: buildWeekDays(
          (date) => frequency.daysOfWeek.includes(DAYS_OF_WEEK[date.getDay()]),
          weekStartDay,
        ),
      };

    case "times_per_week": {
      const days = buildWeekDays(() => true, weekStartDay);
      const availableDays = days.filter((day) => day.active).length;

      return {
        ...base,
        frequencyType: frequency.frequencyType,
        requiredCount: Math.min(
          frequency?.timesPerWeek as number,
          availableDays,
        ),
        days: days,
      };
    }
  }
};

export const buildNextWeekEntryData = (
  currentEntry: HabitEntry,
  weekStartDay: 0 | 6 = 0,
  originalRequiredCount?: number,
): Omit<
  HabitEntry,
  "_id" | "habitId" | "userId" | "createdAt" | "updatedAt"
> => {
  const currentWeekStart = new Date(currentEntry.days[0].date);
  const nextWeekStart = new Date(currentWeekStart);
  nextWeekStart.setDate(currentWeekStart.getDate() + 7);

  const base = {
    weekNumber: currentEntry.weekNumber + 1,
    frequencyType: currentEntry.frequencyType,
    completionRate: 0,
  };

  switch (currentEntry?.frequencyType) {
    case "daily":
      return {
        ...base,
        days: buildWeekDays(() => true, weekStartDay, nextWeekStart),
      };

    case "specific_days":
      return {
        ...base,
        activeDays: currentEntry.activeDays as DaysOfWeek[],
        days: buildWeekDays(
          (date) => {
            const sameDayInCurrentWeek = currentEntry.days.find(
              (d) => new Date(d.date).getDay() === date.getDay(),
            );
            return sameDayInCurrentWeek?.active ?? false;
          },
          weekStartDay,
          nextWeekStart,
        ),
      };

    case "times_per_week": {
      const days = buildWeekDays(() => true, weekStartDay, nextWeekStart);
      const availableDays = days.filter((day) => day.active).length;
      const targetCount =
        originalRequiredCount ?? currentEntry.requiredCount ?? 1;

      return {
        ...base,
        requiredCount: Math.min(targetCount, availableDays),
        days,
      };
    }
  }
};

// -----------------------------------------------
// Times Per Week Habit Day Interactions
// -----------------------------------------------

interface BoxStats {
  index: number;
  checked: boolean;
  clickable: boolean;
  action: "increment" | "decrement" | null;
}

const MAX_VISIBLE_SLOTS = 3;

const getBoxStates = (value: number, totalSlots: number): BoxStats[] => {
  return Array.from({ length: totalSlots }, (_, i) => {
    const boxNumber = i + 1;
    const checked = boxNumber <= value;
    const isNextEmpty = !checked && boxNumber === value + 1;
    const isLastChecked = checked && boxNumber === value;

    return {
      index: 1,
      checked,
      clickable: isNextEmpty || isLastChecked,
      action: isNextEmpty ? "increment" : isLastChecked ? "decrement" : null,
    };
  });
};

export const getDayDisplay = (value: number) => {
  const overflow = Math.max(value - MAX_VISIBLE_SLOTS, 0);
  return {
    boxes: getBoxStates(Math.min(value, MAX_VISIBLE_SLOTS), MAX_VISIBLE_SLOTS),
    badge: overflow > 0 ? overflow : null,
    plusClickable: value >= MAX_VISIBLE_SLOTS,
    badgeClickable: overflow > 0,
  };
};

export const daysBetweenCalendarDates = (dateA: Date, dateB: Date): number => {
  const startOfDateA = new Date(
    dateA.getFullYear(),
    dateA.getMonth(),
    dateA.getDate(),
  );
  const startOfDateB = new Date(
    dateB.getFullYear(),
    dateB.getMonth(),
    dateB.getDate(),
  );
  const msPerDay = 1000 * 60 * 60 * 24;

  return Math.round(
    (startOfDateB.getTime() - startOfDateA.getTime()) / msPerDay,
  );
};

export const formatCompletionLabel = (
  completedAt: Date | null,
): string | null => {
  if (!completedAt) return null;

  const diff = daysBetweenCalendarDates(completedAt, new Date());

  if (diff === 0) return "Completed today";
  if (diff === 1) return "Completed yesterday";

  return `Completed ${diff} days ago`;
};
