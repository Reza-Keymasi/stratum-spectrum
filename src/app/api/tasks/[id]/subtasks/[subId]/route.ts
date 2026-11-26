import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { requireAuth } from "@/features/auth/lib/session";
import { Task } from "@/shared/lib/models/task.model";
import connectToDB from "@/app/lib/db/connectToDB";
import { UpdateSubTaskSchema } from "@/features/task-management/types/task.schema";

export async function PATCH(
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

  const body = await request.json();
  const parsedBody = UpdateSubTaskSchema.safeParse(body);

  if (!parsedBody.success || Object.keys(parsedBody.data).length === 0)
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });

  const { title, done } = parsedBody.data;

  const payload: Record<string, unknown> = {};
  if (title !== undefined) payload["subTasks.$.title"] = title;
  if (done !== undefined) payload["subTasks.$.done"] = done;

  try {
    await connectToDB();

    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        userId: new Types.ObjectId(userId),
        "subTasks._id": subId,
      },
      { $set: payload },
      { new: true },
    )
      .select("subTasks")
      .lean();

    if (!task)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(task.subTasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}

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
