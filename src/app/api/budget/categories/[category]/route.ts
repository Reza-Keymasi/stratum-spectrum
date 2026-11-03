import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { ExpenseTransactionCategories } from "@/shared/constants/budget-transaction";
import connectToDB from "@/app/lib/db/connectToDB";
import { requireAuth } from "@/features/auth/lib/session";
import CategoryBudget from "@/shared/lib/models/category-budget.model";
import { UpdateCategoryBudgetLimitSchema } from "@/features/budget/types/budget.schema";
import { toMonthKey } from "@/lib/date";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  const { userId } = await requireAuth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { category } = await params;

  if (!(ExpenseTransactionCategories as readonly string[]).includes(category)) {
    return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  }

  const body = await req.json();
  const parsedBody = UpdateCategoryBudgetLimitSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        fields: parsedBody.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { limit, year, month } = parsedBody.data;

  try {
    await connectToDB();

    const updatedDoc = await CategoryBudget.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        category,
        month: toMonthKey(year, month),
      },
      { $set: { limit } },
      { upsert: true, new: true, runValidators: true },
    );

    return NextResponse.json(updatedDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
