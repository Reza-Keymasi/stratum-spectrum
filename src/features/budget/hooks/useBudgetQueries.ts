import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CreateTransactionInput,
  UpdateCategoryBudgetLimitInput,
} from "../types/budget.schema";
import {
  createTransaction,
  getCategoryBudgets,
  updateCategoryBudgetLimit,
} from "../services/budgetServices";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTransactionInput) => createTransaction(input),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["category-budget"] }),
  });
};

export const useGetCategoryBudgets = (year?: number, month?: number) => {
  return useQuery({
    queryKey: ["category-budget"],
    queryFn: () => getCategoryBudgets(year, month),
  });
};

export const useUpdateCategoryBudgetLimit = (category: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateCategoryBudgetLimitInput) =>
      updateCategoryBudgetLimit(category, input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["category-budget"] }),
  });
};
