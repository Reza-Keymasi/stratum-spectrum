import { z } from "zod";

export const TaskStatuses = ["todo", "in_progress", "review", "done"] as const;

export const TaskPriorities = ["low", "medium", "high"] as const;

export const TaskStatusEnum = z.enum(TaskStatuses);
export const TaskPriorityEnum = z.enum(TaskPriorities);
export const TaskCategoryEnum = z.enum(["planning", "learning", "personal"]);

export const StatsKeys = [
  "open",
  "todo",
  "inProgress",
  "done",
  "overdue",
  "dueToday",
  "doneThisWeek",
  "byPriority",
  "preProject",
] as const;

export type TaskStatus = z.infer<typeof TaskStatusEnum>;
export type TaskPriority = z.infer<typeof TaskPriorityEnum>;
export type TaskCategory = z.infer<typeof TaskCategoryEnum>;

export const CreateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(0, "Title is required to create a task")
      .max(300),
    project: z.string().optional(),
    priority: TaskPriorityEnum.optional(),
    status: TaskStatusEnum.optional(),
    notes: z.string().optional(),
    starred: z.boolean().default(false).optional(),
    boardPosition: z.number().default(0).optional(),
    dueDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    labels: z.array(z.string().trim().toLowerCase().min(1).max(30)).default([]),
  })
  .extend({ learningPathId: z.string().optional().nullable() });

export const ProjectSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  color: z.string(),
  position: z.number(),
  archived: z.boolean(),
});

export const LabelSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  color: z.string(),
});

export const SubTaskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  done: z.boolean(),
});

export const CreateSubTaskSchema = z.object({
  title: z.string().trim().min(1).max(300),
});

export const UpdateSubTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(300),
    done: z.boolean(),
  })
  .partial()
  .strict();

export const TaskSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  project: z.string(),
  title: z.string(),
  notes: z.string(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  PrevStatus: TaskStatusEnum,
  estimateMinutes: z.number().optional().nullable(),
  starred: z.boolean(),
  labels: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      color: z.string(),
    }),
  ),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
  boardPosition: z.number(),
  subTasks: z.array(SubTaskSchema),
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

export const GetTasksStatsSchema = z.object({
  open: z.number(),
  todo: z.number(),
  inProgress: z.number(),
  done: z.number(),
  overdue: z.number(),
  dueToday: z.number(),
  doneThisWeek: z.number(),

  byPriority: z.record(z.string(), z.number()),

  perProject: z.array(
    z.object({
      done: z.number(),
      progress: z.number(),
      total: z.number(),
      projectId: z.string(),
    }),
  ),
});

export const UpdateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(300),
    notes: z.string().max(10000),
    status: TaskStatusEnum,
    priority: TaskPriorityEnum,
    estimateMinutes: z.number().int().min(1).max(1440).nullable(),
    project: z.string(),
    done: z.boolean(),
    prevStatus: TaskStatusEnum,
    dueDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    // labels: z.array(z.string()),
    labels: z.array(z.string().trim().toLowerCase().min(1).max(30)).max(20),
    starred: z.boolean(),
  })
  .partial()
  .strict();

export type Task = z.infer<typeof GetTaskSchema>;

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

export type GetTasksStats = z.infer<typeof GetTasksStatsSchema>;

export type GetProjects = z.infer<typeof ProjectSchema>;

export type GetLabel = z.infer<typeof LabelSchema>;

export type CreateSubTaskInput = z.infer<typeof CreateSubTaskSchema>;
export type GetSubTask = z.infer<typeof SubTaskSchema>;
export type UpdateSubTaskInput = z.infer<typeof UpdateSubTaskSchema>;
