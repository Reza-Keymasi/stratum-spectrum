import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { requireAuth } from "@/features/auth/lib/session";
import { CreateSubTaskSchema } from "@/features/task-management/types/task.schema";
import connectToDB from "@/app/lib/db/connectToDB";
import { Task } from "@/shared/lib/models/task.model";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await requireAuth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!Types.ObjectId.isValid(id))
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const body = await request.json();

  const parsedBody = CreateSubTaskSchema.safeParse(body);
  if (!parsedBody.success)
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });

  const { title } = parsedBody.data;

  try {
    await connectToDB();

    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        userId: new Types.ObjectId(userId),
        "subTasks.99": { $exists: false },
      },
      { $push: { subTasks: { title, done: false } } },
      { new: true },
    )
      .select("subTasks")
      .lean();

    if (!task)
      return NextResponse.json(
        { message: "Task not found or subtask limit reached" },
        { status: 404 },
      );

    return NextResponse.json(task.subTasks, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
