import { axiosApiClient } from "@/features/auth/lib/axiosApiClient";
import {
  CreateTransactionInput,
  GetBudgetShortStats,
  GetCategoryBudgets,
  UpdateCategoryBudgetLimitInput,
} from "../types/budget.schema";

const BASE_URL = "/budget";

export const createTransaction = (input: CreateTransactionInput) => {
  return axiosApiClient.post(BASE_URL, input);
};

export const getCategoryBudgets = (
  year?: number,
  month?: number,
): Promise<GetCategoryBudgets[]> => {
  const response = axiosApiClient
    .get<
      GetCategoryBudgets[]
    >(`${BASE_URL}/categories?year=${year}&month=${month}`)
    .then((data) => data.data);

  return response;
};

export const updateCategoryBudgetLimit = (
  category: string,
  input: UpdateCategoryBudgetLimitInput,
) => {
  return axiosApiClient.patch(`${BASE_URL}/categories/${category}`, input);
};

export const getBudgetShortStats = (
  queryString: string,
): Promise<GetBudgetShortStats> => {
  const response = axiosApiClient
    .get(`${BASE_URL}/short-stats${queryString ? `?${queryString}` : ""}`)
    .then((data) => data.data);

  return response;
};
