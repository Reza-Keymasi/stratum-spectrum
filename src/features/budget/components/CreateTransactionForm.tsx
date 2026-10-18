"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  CATEGORIES_BY_TYPE,
  CreateTransactionInput,
  CreateTransactionSchema,
} from "../types/budget.schema";
import FormInput from "@/shared/forms/FormInput";
import FormToggleGroup from "@/shared/forms/FormToggleGroup";
import FormCombobox from "@/shared/forms/FormCombobox";
import FormDatePicker from "@/shared/forms/FormDatePicker";
import { Button } from "@/components/ui/button";
import { useCreateTransaction } from "../hooks/useBudgetQueries";
import { today } from "@/lib/date";
import { useTransactionFormPanelStore } from "../store/useTransactionFormPanelStore";
import { cn } from "@/lib/utils";

const CreateTransactionForm = () => {
  const isOpen = useTransactionFormPanelStore((s) => s.isOpen);
  const close = useTransactionFormPanelStore((s) => s.close);

  const methods = useForm<CreateTransactionInput>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      title: "",
      category: "",
      type: "expense",
      amount: 0,
      transactionDate: today(),
    },
  });

  const { mutate, isPending } = useCreateTransaction();

  const type = methods.watch("type");
  const categories = CATEGORIES_BY_TYPE[type];

  const handleCreateTransaction = (data: CreateTransactionInput) => {
    mutate(data, {
      onSuccess: () => {
        methods.reset();
      },
    });
  };

  const handleCancelTransaction = () => {
    methods.reset();
    close();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={cn(
          "bg-green-100/30 border rounded-md font-mono transition-all duration-300 ease-in",
          isOpen ? "block" : "hidden",
        )}
        onSubmit={methods.handleSubmit(handleCreateTransaction)}
      >
        <p className="p-4 text-green-600 text-sm font-medium uppercase">
          new transaction
        </p>

        <div className="w-full border border-gray-200 h-px" />

        <div className="flex flex-col gap-5 p-4">
          <div className="flex gap-3">
            <FormInput
              name="title"
              placeholder="What was it for?"
              className="flex-1 py-3! bg-transparent! focus-visible:bg-transparent!"
            />

            <FormInput
              name="amount"
              type="number"
              className="bg-transparent! focus-visible:bg-transparent!"
              placeholder="0"
            />
          </div>
          <div className="flex gap-3">
            <FormToggleGroup
              items={["expense", "income"]}
              name="type"
              type="single"
            />

            <FormCombobox
              itemsArray={categories.map((cat) => ({
                value: cat,
                label: cat,
              }))}
              className="py-3! bg-transparent! focus-within:bg-transparent!"
              name="category"
              placeholder="Choose a category"
            />

            <FormDatePicker
              name="transactionDate"
              placeholder="When transaction happened?"
              className="py-3 bg-transparent focus-visible:bg-transparent hover:bg-transparent"
              valueType="date-string"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              type="submit"
              className="bg-green-500 text-white hover:bg-green-400 hover:text-white"
            >
              {isPending ? "Saving..." : "Add"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancelTransaction}
              className="border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateTransactionForm;
