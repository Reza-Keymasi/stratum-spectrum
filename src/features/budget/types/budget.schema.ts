import { z } from "zod";

import {
  CATEGORIES_BY_TYPE,
  ExpenseTransactionCategories,
  AllTransactionsCategories,
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

export const GetTransactionsSchema = z.object({
  _id: z.string().min(0),
  title: z.string(),
  amount: z.number().min(0),
  type: z.enum(["income", "expense"]),
  category: z.enum(AllTransactionsCategories),
  transactionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date"),
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
  year: z.number().int().min(2000).max(2100),
  month: z.number().int().min(0).max(12),
});

export const GetBudgetShortStatsSchema = z.object({
  income: z.number(),
  expense: z.number(),
  net: z.number(),
  totalLimit: z.number(),
  budgetUsed: z.number().min(0).max(100),
});

export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type GetTransactions = z.infer<typeof GetTransactionsSchema>;
export type GetCategoryBudgets = z.infer<typeof GetCategoryBudgetsSchema>;
export type UpdateCategoryBudgetLimitInput = z.infer<
  typeof UpdateCategoryBudgetLimitSchema
>;
export type GetBudgetShortStats = z.infer<typeof GetBudgetShortStatsSchema>;
