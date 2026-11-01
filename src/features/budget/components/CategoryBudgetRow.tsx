import LimitInput from "./LimitInput";
import ProgressBar from "@/shared/ui/ProgressBar";
import { GetCategoryBudgets } from "../types/budget.schema";
import { CATEGORY_UI } from "@/shared/constants/budget-transaction";

const CategoryBudgetRow = ({
  limit,
  percent,
  category,
  spent,
}: GetCategoryBudgets) => {
  const categoryUi = CATEGORY_UI[category];
  const isOver = percent && percent > 100;
  return (
    <div
      className="flex justify-between items-center py-3 px-5 gap-5"
      key={category}
    >
      <span className="w-1/4">{category}</span>
      <div className="w-1/2">
        <ProgressBar
          value={Math.min(100, percent as number)}
          indicatorClassName={
            isOver
              ? "**:data-[slot=progress-indicator]:bg-red-500"
              : categoryUi.bar
          }
        />
      </div>
      <div className="flex items-center w-1/4">
        <span className={isOver ? "text-red-500 scale-110" : ""}>
          ${spent} /
        </span>
        <LimitInput category={category} limit={limit ?? 0} />{" "}
      </div>
    </div>
  );
};

export default CategoryBudgetRow;
