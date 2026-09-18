import { z } from "zod";

import { DAYS_OF_WEEK, HABIT_CATEGORIES } from "../constants/habitConstants";

export const HabitCategoriesSchema = z.enum(HABIT_CATEGORIES);

export const HabitCategories = z.array(HabitCategoriesSchema);

const DaysOfWeek = z.enum(DAYS_OF_WEEK);

const FrequencyDailySchema = z.object({
  frequencyType: z.literal("daily"),
});

const FrequencySpecificDaysSchema = z.object({
  frequencyType: z.literal("specific_days"),
  daysOfWeek: z.array(DaysOfWeek).min(1, "Select at least one day"),
});

const FrequencyTimesPerWeekSchema = z.object({
  frequencyType: z.literal("times_per_week"),
  timesPerWeek: z.coerce.number().int().min(1).max(7).optional().nullable(),
});

const FrequencyCustomIntervalSchema = z.object({
  frequencyType: z.literal("custom_interval"),
  customInterval: z.coerce
    .number()
    .int()
    .min(2, "Interval must be at least 2 days")
    .optional()
    .nullable(),
});

const FrequencySchema = z.discriminatedUnion("frequencyType", [
  FrequencyDailySchema,
  FrequencySpecificDaysSchema,
  FrequencyTimesPerWeekSchema,
  FrequencyCustomIntervalSchema,
]);

export const GetHabitSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  isNegative: z.boolean(),
  categories: HabitCategories.optional(),

  frequency: FrequencySchema,

  goalType: z.enum(["binary", "quantity"]),
  targetValue: z.number().optional(),
  unit: z.string().optional(),
  completed: z.boolean(),
  completedAt: z.coerce.date().nullable(),
});

export const CreateHabitSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 charachters"),
    categories: HabitCategories.optional(),
    description: z
      .string()
      .max(500, "Description must have maximum of 500 charachters")
      .optional(),
    isNegative: z.boolean(),

    frequency: FrequencySchema,

    goalType: z.enum(["binary", "quantity"]),
    targetValue: z.coerce.number().optional().nullable(),
    unit: z.string().optional(),
  })
  // .refine(
  //   (data) => {
  //     if (data.goalType === "quantity") {
  //       // Must exist, not be empty, and evaluate to a number >= 1
  //       if (!data.targetValue || data.targetValue.trim() === "") return false;
  //       const num = Number(data.targetValue);
  //       return !isNaN(num) && num >= 1;
  //     }
  //     return true;
  //   },
  //   {
  //     message: "Target value must be a valid number equal to or greater than 1",
  //     path: ["targetValue"],
  //   },
  // )
  .refine(
    (data) =>
      data.goalType !== "quantity" || (data.unit && data.unit.trim() !== ""),
    { message: "Unit is required when tracking quantities", path: ["unit"] },
  );

export const ToggleHabitCompletionSchema = z.object({
  // habitId: z.string().min(1, "Habit Id is required"),
  completed: z.boolean(),
});

export type CreateHabitInput = z.infer<typeof CreateHabitSchema>;

export type GetHabit = z.infer<typeof GetHabitSchema>;
export type ToggleHabitCompletion = z.infer<typeof ToggleHabitCompletionSchema>;
