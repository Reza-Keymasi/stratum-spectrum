import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { requireAuth } from "@/features/auth/lib/session";
import { monthKeyFrom, periodFilter } from "@/lib/date";
import connectToDB from "@/app/lib/db/connectToDB";
import Budget from "@/shared/lib/models/budget.model";
import CategoryBudget from "@/shared/lib/models/category-budget.model";

const round2 = (num: number) => Math.round(num * 100) / 100;

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

    const [totals, limits] = await Promise.all([
      Budget.aggregate([
        {
          $match: {
            userId: owner,
            ...period,
          },
        },
        { $group: { _id: "$type", total: { $sum: "$amount" } } },
      ]),
      CategoryBudget.aggregate([
        { $match: { userId: owner, month: monthKey } },
        { $group: { _id: null, total: { $sum: "$limit" } } },
      ]),
    ]);

    const income = round2(totals.find((t) => t._id === "income")?.total ?? 0);
    const expense = round2(totals.find((t) => t._id === "expense")?.total ?? 0);
    const totalLimit = limits[0]?.total ?? 0;

    const data = {
      income,
      expense,
      net: round2(income - expense),
      totalLimit,
      budgetUsed: totalLimit > 0 ? Math.round((expense / income) * 100) : null,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
