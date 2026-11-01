import {
  CATEGORIES_BY_TYPE,
  ExpenseTransactionCategories,
} from "@/shared/constants/budget-transaction";

import { Schema, model, models, Types } from "mongoose";

type TransactionType = keyof typeof CATEGORIES_BY_TYPE;

interface CategoryBudget {
  userId: Types.ObjectId;
  category: TransactionType;
  limit: number;
}

const CategoryBudgetSchema = new Schema<CategoryBudget>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    category: {
      type: String,
      enum: ExpenseTransactionCategories,
      required: true,
    },
    limit: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

const CategoryBudget =
  models.CategoryBudget || model("CategoryBudget", CategoryBudgetSchema);

export default CategoryBudget;
