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
