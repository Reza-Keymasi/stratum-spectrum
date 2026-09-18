import { z } from "zod";

export const UpdateDaySchema = z.object({
  dayIndex: z.number().int().min(0),
  value: z.number().min(0).optional().nullable(),
});

export type UpdateDay = z.infer<typeof UpdateDaySchema>;
