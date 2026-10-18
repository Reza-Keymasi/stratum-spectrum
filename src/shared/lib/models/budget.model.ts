import { Schema, model, models, Types } from "mongoose";

const SHARED_CATEGORIES = ["Financial Markets", "Other"] as const;

const IncomeTransactionCategories = [
  "Salary",
  "Freelance",
  "Reward",
  ...SHARED_CATEGORIES,
] as const;

const ExpenseTransactionCategories = [
  "Food",
  "Rent",
  "Transport",
  "Bills",
  "Entertainment",
  ...SHARED_CATEGORIES,
] as const;

export const CATEGORIES_BY_TYPE = {
  income: IncomeTransactionCategories,
  expense: ExpenseTransactionCategories,
} as const;

type TransactionType = keyof typeof CATEGORIES_BY_TYPE;

// const CURRENCIES = {
//   USD: { label: "Dollar", decimals: 2 },
//   EUR: { label: "Euro", decimals: 2 },
//   IRT: { label: "Toman", decimals: 0 },
// } as const;

// type Currency = keyof typeof CURRENCIES;
// const CURRENCY_CODES = Object.keys(CURRENCIES) as Currency[];

interface BudgetTransaction {
  userId: Types.ObjectId;
  title: string;
  type: TransactionType;
  amount: number;
  // currency: Currency;
  category: string;
  transactionDate: Date;
}

const BudgetTransactionSchema = new Schema<BudgetTransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["expense", "income"], required: true },
    category: {
      type: String,
      required: true,
      validate: {
        validator(this: BudgetTransaction, value: string) {
          const allowed = CATEGORIES_BY_TYPE[this.type] as
            | readonly string[]
            | undefined;
          return !!allowed?.includes(value);
        },
        message: (p: { value: string }) =>
          `${p.value} is not valid for this transaction type`,
      },
    },
    transactionDate: {
      type: Date,
      required: true,
      validate: {
        validator: (v: Date) => v.getTime() % 86_400_00 === 0,
        message: "Tranaction date must be a calendar day at UTC midnight",
      },
    },
  },
  { timestamps: true },
);

BudgetTransactionSchema.index({ userId: 1, transactionDate: -1 });

const Budget = models.Budget || model("Budget", BudgetTransactionSchema);

export default Budget;
