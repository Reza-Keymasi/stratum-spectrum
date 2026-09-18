export const HABIT_CATEGORIES = [
  "Health",
  "Fitness",
  "Study",
  "Work",
  "Finance",
  "Social",
  "Profession",
  "Other",
];

export const FREQUENCY_TYPES = [
  { value: "daily", label: "Every Day" },
  { value: "specific_days", label: "Specific Days of Week" },
  { value: "times_per_week", label: "X Times Per Week" },
  { value: "custom_interval", label: "Custom Interval (Every X days)" },
];

export const DAYS_OF_WEEK = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
] as const;

export const DAYS_OF_WEEK_WITH_LABEL = [
  { value: "sun", label: "Sunday" },
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
];

export const CATEGORY_STYLES: Record<string, { text: string; full: string }> = {
  Health: {
    text: "text-emerald-600",
    full: "px-2 py-px rounded-sm font-mono bg-emerald-50 border border-emerald-200 text-emerald-700",
  },
  Fitness: {
    text: "text-orange-600",
    full: "px-2 py-px rounded-sm font-mono bg-orange-50 border border-orange-200 text-orange-700",
  },
  Study: {
    text: "text-indigo-600",
    full: "px-2 py-px rounded-sm font-mono bg-indigo-50 border border-indigo-200 text-indigo-700",
  },
  Work: {
    text: "text-violet-600",
    full: "px-2 py-px rounded-sm font-mono bg-violet-50 border border-violet-200 text-violet-700",
  },
  Finance: {
    text: "text-amber-600",
    full: "px-2 py-px rounded-sm font-mono bg-amber-50 border border-amber-200 text-amber-700",
  },
  Social: {
    text: "text-pink-600",
    full: "px-2 py-px rounded-sm font-mono bg-pink-50 border border-pink-200 text-pink-700",
  },
  Profession: {
    text: "text-sky-600",
    full: "px-2 py-px rounded-sm font-mono bg-sky-50 border border-sky-200 text-sky-700",
  },
  Other: {
    text: "text-slate-600",
    full: "px-2 py-px rounded-sm font-mono bg-slate-50 border border-slate-200 text-slate-700",
  },
};

export const FREQUENCY_STYLES_MAP: Record<string, string> = {
  daily: "text-lime-700 bg-lime-100",
  specific_days: "text-gray-500 bg-gray-100",
  times_per_week: "text-slate-600 bg-slate-100",
  custom_interval: "text-purple-700 bg-purple-50",
};
