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
  month: string;
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
    month: { type: String, required: true, match: /^\d{4}-(0[1-9]|1[0-2])$/ },
  },
  { timestamps: true },
);

CategoryBudgetSchema.index(
  { userId: 1, category: 1, month: 1 },
  { unique: true },
);

const CategoryBudget =
  models.CategoryBudget || model("CategoryBudget", CategoryBudgetSchema);

export default CategoryBudget;
