import { z } from "zod";

export const DifficultySchema = z.enum(["easy", "medium", "hard"]);

export type Difficulty = z.infer<typeof DifficultySchema>;

export const LearningPathSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  summary: z.string().optional(),
  targetDate: z.number().int().positive().optional(),
  difficulty: DifficultySchema,
  progress: z.number().default(0),
});

export const CreateLearningPathSchema = LearningPathSchema.pick({
  title: true,
  topic: true,
  targetDate: true,
  difficulty: true,
});

export type LearningPath = z.infer<typeof LearningPathSchema>;
export type CreateLearningPathInput = z.infer<typeof CreateLearningPathSchema>;
