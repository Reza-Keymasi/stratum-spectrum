import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import Task from "@/shared/lib/models/task.model";
import { TaskSchema } from "@/features/task-management/types/task.schema";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;

    const tasks = await Task.find({ learningPath: id }).lean();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();
    const payload = TaskSchema.partial().parse(body);
    const updatedTask = await Task.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update task", error },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await connectToDB();
  const deletedTask = await Task.findByIdAndDelete(id);
  if (!deletedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
