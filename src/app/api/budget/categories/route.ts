import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connectToDB from "@/app/lib/db/connectToDB";
import Budget from "@/shared/lib/models/budget.model";
import CategoryBudget from "@/shared/lib/models/category-budget.model";
import { requireAuth } from "@/features/auth/lib/session";
import { monthKeyFrom, periodFilter } from "@/lib/date";
import { ExpenseTransactionCategories } from "@/shared/constants/budget-transaction";

export async function GET(req: Request) {
  const { userId } = await requireAuth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const period = periodFilter(searchParams);

  if (period === null) {
    return NextResponse.json(
      {
        message: "Invalid query",
      },
      { status: 400 },
    );
  }

  const monthKey = monthKeyFrom(searchParams);
  const owner = new Types.ObjectId(userId);

  try {
    await connectToDB();

    const [spentRows, limitRows] = await Promise.all([
      Budget.aggregate([
        {
          $match: {
            userId: owner,
            type: "expense",
            ...period,
          },
        },
        { $group: { _id: "$category", spent: { $sum: "$amount" } } },
      ]),

      monthKey
        ? CategoryBudget.find({ userId: owner, month: monthKey }).lean()
        : Promise.resolve([]),
    ]);

    const spentMap = new Map<string, number>(
      spentRows.map((r) => [r._id, r.spent]),
    );
    const limitMap = new Map<string, number>(
      limitRows.map((r) => [r.category, r.limit]),
    );

    const data = ExpenseTransactionCategories.map((category) => {
      const spent = Math.round((spentMap.get(category) ?? 0) * 100) / 100;
      const rawLimit = limitMap.get(category);
      const limit = rawLimit && rawLimit > 0 ? rawLimit : null;

      return {
        category,
        limit,
        spent,
        percent: limit ? Math.round((spent / limit) * 100) : null,
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
