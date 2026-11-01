"use client";

import { useMemo } from "react";

import { useGetCategoryBudgets } from "../hooks/useBudgetQueries";
import { ExpenseTransactionCategories } from "@/shared/constants/budget-transaction";
import CategoryBudgetRow from "./CategoryBudgetRow";

const CategoryBudget = () => {
  const { data } = useGetCategoryBudgets();

  const rows = useMemo(() => {
    const byCategory = new Map(data?.map((row) => [row.category, row]));

    return ExpenseTransactionCategories.map((category) => {
      const row = byCategory.get(category);
      const spent = row?.spent ?? 0;
      const limit = row?.limit ?? 0;

      return {
        category,
        limit,
        spent,
        percent: limit > 0 ? (spent / limit) * 100 : 0,
      };
    });
  }, [data]);

  return (
    <div className="border border-gray-200 rounded-md">
      {rows.map(({ limit, category, spent, percent }) => (
        <CategoryBudgetRow
          key={category}
          category={category}
          limit={limit}
          spent={spent}
          percent={percent}
        />
      ))}
    </div>
  );
};

export default CategoryBudget;
