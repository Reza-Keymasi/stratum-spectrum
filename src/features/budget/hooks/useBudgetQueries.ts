import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CreateTransactionInput,
  UpdateCategoryBudgetLimitInput,
} from "../types/budget.schema";
import {
  createTransaction,
  getBudgetShortStats,
  getCategoryBudgets,
  updateCategoryBudgetLimit,
} from "../services/budgetServices";
import { usePeriod } from "./usePeriod";

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

export const useGetBudgetShortStats = () => {
  const { apiParams } = usePeriod();
  return useQuery({
    queryKey: ["short-stats", apiParams.year, apiParams.month],
    queryFn: () => {
      const queryString = new URLSearchParams(
        Object.entries(apiParams).map(([key, value]) => [key, String(value)]),
      ).toString();

      return getBudgetShortStats(queryString);
    },
  });
};
