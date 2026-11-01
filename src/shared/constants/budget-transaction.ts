export const SHARED_CATEGORIES = ["Financial Markets", "Other"] as const;

export const IncomeTransactionCategories = [
  "Salary",
  "Freelance",
  "Reward",
  ...SHARED_CATEGORIES,
] as const;

export const ExpenseTransactionCategories = [
  "Food",
  "Rent",
  "Transport",
  "Bills",
  "Entertainment",
  ...SHARED_CATEGORIES,
] as const;

export const CATEGORIES_BY_TYPE = {
  income: IncomeTransactionCategories,
  expense: ExpenseTransactionCategories,
} as const;

export type ExpenseCategory = (typeof ExpenseTransactionCategories)[number];

export const CATEGORY_UI: Record<ExpenseCategory, { bar: string }> = {
  Food: { bar: "**:data-[slot=progress-indicator]:bg-orange-500" },
  Rent: { bar: "**:data-[slot=progress-indicator]:bg-blue-500" },
  Transport: { bar: "**:data-[slot=progress-indicator]:bg-green-accent-500" },
  Bills: { bar: "**:data-[slot=progress-indicator]:bg-yellow-500" },
  Entertainment: { bar: "**:data-[slot=progress-indicator]:bg-pink-500" },
  "Financial Markets": {
    bar: "**:data-[slot=progress-indicator]:bg-emerald-500",
  },
  Other: { bar: "**:data-[slot=progress-indicator]:bg-gray-500" },
};
