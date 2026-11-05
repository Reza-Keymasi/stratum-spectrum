import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";

import connectToDB from "@/app/lib/db/connectToDB";
import { requireAuth } from "@/features/auth/lib/session";
import { CreateTransactionSchema } from "@/features/budget/types/budget.schema";
import Budget from "@/shared/lib/models/budget.model";
import { dayToUTCDate, periodFilter } from "@/lib/date";
import CategoryBudget from "@/shared/lib/models/category-budget.model";

export async function GET(req: Request) {
  const { userId } = await requireAuth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const period = periodFilter(searchParams);
  if (period === null) {
    return NextResponse.json({ message: "Invalid query" }, { status: 500 });
  }

  const type = searchParams.get("type");
  const typeFilter = type === "income" || type === "expense" ? { type } : {};

  const owner = new Types.ObjectId(userId);

  try {
    await connectToDB();

    const budgets = await Budget.find({
      userId: owner,
      ...period,
      ...typeFilter,
    }).lean();

    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await requireAuth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateTransactionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        fields: parsed.error,
      },
      { status: 400 },
    );
  }
  const { amount, transactionDate, ...rest } = parsed.data;
  const owner = new Types.ObjectId(userId);

  await connectToDB();
  const session = await mongoose.startSession();

  try {
    let transaction;

    await session.withTransaction(async () => {
      const [created] = await Budget.create(
        [
          {
            ...rest,
            userId: owner,
            amount: Math.round(amount * 100) / 100,
            transactionDate: dayToUTCDate(transactionDate),
          },
        ],
        { session },
      );

      transaction = created;

      if (rest.type === "expense") {
        await CategoryBudget.updateOne(
          {
            userId: owner,
            category: rest.category,
          },
          { $setOnInsert: { limit: 0 } },
          { upsert: true, session },
        );
      }
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
