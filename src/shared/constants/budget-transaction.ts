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

export const AllTransactionsCategories = [
  ...new Set([...IncomeTransactionCategories, ...ExpenseTransactionCategories]),
] as const;

export type ExpenseCategory = (typeof ExpenseTransactionCategories)[number];
export type IncomeCategory = (typeof IncomeTransactionCategories)[number];
export type AllCategoryTypes = (typeof AllTransactionsCategories)[number];

export const CATEGORY_UI: Record<
  ExpenseCategory,
  { border: string; bar: string }
> = {
  Food: {
    border: "border-l-3 border-orange-500",
    bar: "**:data-[slot=progress-indicator]:bg-orange-500",
  },
  Rent: {
    border: "border-l-3 border-blue-500",
    bar: "**:data-[slot=progress-indicator]:bg-blue-500",
  },
  Transport: {
    border: "border-l-3 border-green-accent-500",
    bar: "**:data-[slot=progress-indicator]:bg-green-accent-500",
  },
  Bills: {
    border: "border-l-3 border-yellow-500",
    bar: "**:data-[slot=progress-indicator]:bg-yellow-500",
  },
  Entertainment: {
    border: "border-l-3 border-pink-500",
    bar: "**:data-[slot=progress-indicator]:bg-pink-500",
  },
  "Financial Markets": {
    border: "border-l-3 border-emerald-500",
    bar: "**:data-[slot=progress-indicator]:bg-emerald-500",
  },
  Other: {
    border: "border-l-3 border-gray-500",
    bar: "**:data-[slot=progress-indicator]:bg-gray-500",
  },
};

export const CATEGORY_BORDER: Record<AllCategoryTypes, string> = {
  Food: "border-l-orange-500",
  Rent: "border-l-blue-500",
  Transport: "border-l-green-accent-500",
  Bills: "border-l-yellow-500",
  Entertainment: "border-l-pink-500",
  "Financial Markets": "border-l-emerald-500",
  Salary: "border-l-sky-500",
  Reward: "border-l-rose-500",
  Freelance: "border-l-lime-500",
  Other: "border-l-gray-500",
};
