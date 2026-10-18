import { useMutation } from "@tanstack/react-query";
import { CreateTransactionInput } from "../types/budget.schema";
import { createTransaction } from "../services/budgetServices";

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: (input: CreateTransactionInput) => createTransaction(input),
  });
};
