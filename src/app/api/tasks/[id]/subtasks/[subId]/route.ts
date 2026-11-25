import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { requireAuth } from "@/features/auth/lib/session";
import { Task } from "@/shared/lib/models/task.model";
import connectToDB from "@/app/lib/db/connectToDB";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; subId: string }> },
) {
  const { userId } = await requireAuth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, subId } = await params;
  if (!Types.ObjectId.isValid(id))
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  if (!Types.ObjectId.isValid(subId))
    return NextResponse.json(
      { message: "Invalid subtask ID" },
      { status: 400 },
    );

  try {
    await connectToDB();

    const task = await Task.findByIdAndUpdate(
      {
        _id: id,
        userId: new Types.ObjectId(userId),
      },
      { $pull: { subTasks: { _id: subId } } },
      { new: true },
    ).lean();

    if (!task)
      return NextResponse.json(
        { message: "Task not found or subtask limit reached" },
        { status: 404 },
      );

    return NextResponse.json(task.subTasks);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
