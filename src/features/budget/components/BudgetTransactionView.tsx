import { ArrowLeft, ArrowRight } from "lucide-react";

import CreateTransactionForm from "./CreateTransactionForm";
import TransactionToggleButton from "./TransactionToggleButton";
import CategoryBudget from "./CategoryBudget";

const BudgetTransactionView = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm text-gray-400">
            Budget Tracker
          </span>
          <span className="font-bold text-3xl">Budget</span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2">
            <ArrowLeft className="text-gray-400 size-3" />
            <span className="text-sm">October 2026</span>
            <ArrowRight className="text-gray-400 size-3" />
          </div>
          <TransactionToggleButton />
        </div>
      </div>

      <div className="flex border border-gray-200 rounded-md mt-10">
        <div className="flex flex-1 flex-col gap-1 px-3 py-4 font-mono">
          <span className="text-xs text-gray-400 uppercase">income</span>
          <span className="text-green-accent-500">$4,500</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-3 py-4 border-l font-mono">
          <span className="text-xs text-gray-400 uppercase">spent</span>
          <span className="text-green-accent-500">$1,200</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-3 py-4 border-l font-mono">
          <span className="text-xs text-gray-400 uppercase">net</span>
          <span className="text-green-accent-500">$3,300</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-3 py-4 border-l font-mono">
          <span className="text-xs text-gray-400 uppercase">budget used</span>
          <span className="text-green-accent-500">26%</span>
        </div>
      </div>

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
