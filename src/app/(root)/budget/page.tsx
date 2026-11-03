import { Suspense } from "react";

import BudgetTransactionView from "@/features/budget/components/BudgetTransactionView";

const BudgetTrackerPage = () => {
  return (
    <Suspense fallback={null}>
      <BudgetTransactionView />
    </Suspense>
  );
};

export default BudgetTrackerPage;
