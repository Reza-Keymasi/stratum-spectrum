import { NextResponse } from "next/server";

import { ExpenseTransactionCategories } from "@/shared/constants/budget-transaction";
import connectToDB from "@/app/lib/db/connectToDB";
import { requireAuth } from "@/features/auth/lib/session";
import CategoryBudget from "@/shared/lib/models/category-budget.model";

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
  const { limit } = body;

  try {
    await connectToDB();

    await CategoryBudget.findOneAndUpdate(
      { userId, category },
      { $set: { limit } },
      { upsert: true, new: true, runValidators: true },
    );

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
