import { z } from "zod";

import {
  CATEGORIES_BY_TYPE,
  ExpenseTransactionCategories,
} from "@/shared/constants/budget-transaction";

export const CreateTransactionSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be less than 100 characters"),
    type: z.enum(["income", "expense"]),
    amount: z
      .number()
      .positive("Amount must be more than 0")
      .max(1_000_000_000_000, "Amount is too large"),
    category: z.string().min(1, "Choose a category"),
    transactionDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date"),
  })
  .superRefine((data, ctx) => {
    const allowed = CATEGORIES_BY_TYPE[data.type] as readonly string[];

    if (!allowed.includes(data.category)) {
      ctx.addIssue({
        code: "custom",
        path: ["category"],
        message: `Invalid category for ${data.type}`,
      });
    }
  });

export const GetCategoryBudgetsSchema = z.object({
  category: z.enum(ExpenseTransactionCategories),
  limit: z.number().nullable(),
  spent: z.number(),
  percent: z.number().nullable(),
});

export const UpdateCategoryBudgetLimitSchema = z.object({
  limit: z
    .number()
    .min(0, "Budget limit at least must be 0")
    .max(1_000_000_000),
});

export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type GetCategoryBudgets = z.infer<typeof GetCategoryBudgetsSchema>;
export type UpdateCategoryBudgetLimitInput = z.infer<
  typeof UpdateCategoryBudgetLimitSchema
>;
