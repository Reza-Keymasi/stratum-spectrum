import { z } from "zod";

export const TaskStatusEnum = z.enum(["todo", "in_progress", "done"]);
export const TaskPriorityEnum = z.enum(["low", "medium", "high"]);
export const TaskCategoryEnum = z.enum(["planning", "learning", "personal"]);

export type TaskStatus = z.infer<typeof TaskStatusEnum>;
export type TaskPriority = z.infer<typeof TaskPriorityEnum>;
export type TaskCategory = z.infer<typeof TaskCategoryEnum>;

export const TaskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  category: TaskCategoryEnum,
  dueDate: z.number().int().positive().optional(),
  steps: z.array(
    z.object({
      text: z.string(),
      done: z.boolean(),
    }),
  ),
  learningPathId: z.string().optional().nullable(),
});

export const GetTaskSchema = TaskSchema.omit({ learningPathId: true }).extend({
  learningPath: z
    .object({
      _id: z.string().optional().nullable(),
      title: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type Task = z.infer<typeof GetTaskSchema>;

export const CreateAndEditTaskSchema = TaskSchema.pick({
  title: true,
  description: true,
  category: true,
  priority: true,
  dueDate: true,
}).extend({ learningPathId: z.string().optional().nullable() });

export type CreateAndEditTaskInput = z.infer<typeof CreateAndEditTaskSchema>;
