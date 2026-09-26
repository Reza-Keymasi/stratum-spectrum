import { z } from "zod";

const ActionsEnum = ["increment", "decrement"] as const;
const DayIndexSchema = z.number().int().min(0).max(6);

const ToggleDayUpdateSchema = z
  .object({
    dayIndex: DayIndexSchema,
  })
  .strict();

const SteppedDaySchema = z
  .object({
    dayIndex: DayIndexSchema,
    action: z.enum(ActionsEnum),
  })
  .strict();

export const UpdateDaySchema = z.union([
  ToggleDayUpdateSchema,
  SteppedDaySchema,
]);

export type UpdateDay = z.infer<typeof UpdateDaySchema>;
