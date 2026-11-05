"use client";

import { Button } from "@/components/ui/button";
import { useGetTransactions } from "../hooks/useBudgetQueries";
import { TYPE_FILTERS } from "../hooks/useSwitchTransactionType";
import { useSwitchTransactionType } from "../hooks/useSwitchTransactionType";
import { cn } from "@/lib/utils";
import { CATEGORY_BORDER } from "@/shared/constants/budget-transaction";
import { formatNumber } from "../utils/utils";
import TransactionsListSkeleton from "./skeletons/TransactionsListSkeleton";
import AppEmpty from "@/shared/ui/AppEmpty";
import { Banknote } from "lucide-react";

const TransactionsList = () => {
  const { data: transactions, isPending } = useGetTransactions();
  const { setType, type } = useSwitchTransactionType();

  if (isPending) return <TransactionsListSkeleton />;

  if (transactions?.length === 0)
    return (
      <AppEmpty
        emptyTitle="You have no transactions in this date"
        emptyClassName="border border-dashed border-gray-300 mt-8 font-mono"
        emptyMedia={<Banknote className="" strokeWidth={1.5} />}
      />
    );

  return (
    <div className="mt-8 font-mono">
      <div className="flex gap-2 mx-2">
        {TYPE_FILTERS.map((t) => {
          const isActive = t === type;
          return (
            <Button
              variant="ghost"
              className={cn(
                "hover:bg-transparent border-b border-b-transparent shadow-none rounded-none uppercase cursor-pointer",
                isActive
                  ? "border-b-2 border-b-green-accent-500 text-green-accent-500"
                  : "",
              )}
              key={t}
              onClick={() => setType(t)}
            >
              {t}
            </Button>
          );
        })}
      </div>

      <ul>
        {transactions?.map(
          ({ _id, amount, category, title, transactionDate, type }) => {
            const categoryBorderColor = CATEGORY_BORDER[category];
            const formattedTransactionDate = new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "short",
              timeZone: "UTC",
            }).format(new Date(transactionDate));
            return (
              <li
                className={cn(
                  "flex justify-between",
                  "py-3 px-5 border-l-3 border-b first:border-t border-r first:rounded-t-md last:rounded-b-md",
                  categoryBorderColor,
                )}
                key={_id}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">
                    {formattedTransactionDate}
                  </span>
                  <span className="capitalize">{title}</span>
                  <span className="border border-gray-400 py-1 px-2 text-xs text-gray-400 rounded-sm">
                    {category}
                  </span>
                </div>

                <div
                  className={cn(
                    type === "income" ? "text-green-500" : "text-rose-500",
                  )}
                >
                  <span>{type === "income" ? "+" : "-"}</span>
                  <span>{formatNumber(amount)}$</span>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
};

export default TransactionsList;
