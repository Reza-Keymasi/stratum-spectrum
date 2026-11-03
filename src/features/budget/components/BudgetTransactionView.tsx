"use client";

import CreateTransactionForm from "./CreateTransactionForm";
import TransactionToggleButton from "./TransactionToggleButton";
import CategoryBudget from "./CategoryBudget";
import ShortStats from "./ShortStats";
import PeriodSwitcher from "./PeriodSwitcher";

const BudgetTransactionView = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm text-gray-400">
            Budget Tracker
          </span>
          <span className="font-bold text-3xl">Budget</span>
        </div>

        <div className="flex justify-end lg:justify-normal items-center gap-2 font-mono">
          <PeriodSwitcher />
          <TransactionToggleButton />
        </div>
      </div>

      <ShortStats />

      <div className="w-full border border-gray-200 h-px my-4" />

      <CreateTransactionForm />

      <div className="flex flex-col gap-2 text-gray-400 text-sm font-mono mt-8">
        <span className="uppercase">
          category budgets · click a limit to edit
        </span>

        <CategoryBudget />
      </div>

      <div>List</div>
    </div>
  );
};

export default BudgetTransactionView;
