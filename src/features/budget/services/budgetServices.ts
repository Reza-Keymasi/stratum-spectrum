import { axiosApiClient } from "@/features/auth/lib/axiosApiClient";
import { fetchHandler } from "@/shared/lib/fetchHandler";
import { CreateTransactionInput } from "../types/budget.schema";

const BASE_URL = "/budget";

export const createTransaction = (input: CreateTransactionInput) => {
  return axiosApiClient.post(BASE_URL, input);
};
