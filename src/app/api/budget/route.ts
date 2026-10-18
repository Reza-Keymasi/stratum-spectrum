import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connectToDB from "@/app/lib/db/connectToDB";
import { requireAuth } from "@/features/auth/lib/session";
import { CreateTransactionSchema } from "@/features/budget/types/budget.schema";
import Budget from "@/shared/lib/models/budget.model";
import { dayToUTCDate } from "@/lib/date";

export async function POST(request: Request) {
  const { userId } = await requireAuth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDB();

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

    const payload = {
      ...rest,
      userId: new Types.ObjectId(userId),
      amount: Math.round(amount * 100) / 100,
      transactionDate: dayToUTCDate(transactionDate),
    };

    const transaction = await Budget.create(payload);

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
