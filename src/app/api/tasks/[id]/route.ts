import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connectToDB from "@/app/lib/db/connectToDB";
import { Task } from "@/shared/lib/models/task.model";
import { UpdateTaskSchema } from "@/features/task-management/types/task.schema";
import { requireAuth } from "@/features/auth/lib/session";
import { Label } from "@/shared/lib/models/label.model";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await requireAuth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const owner = new Types.ObjectId(userId);

  const { id } = await params;
  if (!Types.ObjectId.isValid(id))
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const body = await request.json();
  const parsedBody = UpdateTaskSchema.safeParse(body);

  if (!parsedBody.success || Object.keys(parsedBody.data).length === 0)
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });

  const { done, ...fields } = parsedBody.data;
  const update: Record<string, unknown> = { ...fields };

  if (done !== undefined || fields.status) {
    const current = await Task.findOne({ _id: id, userId })
      .select("status prevStatus")
      .lean();

    if (!current)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    const wasDone = current.status === "done";

    const target =
      done !== undefined
        ? done
          ? "done"
          : (current.prevStatus ?? "todo")
        : fields.status;

    const willBeDone = target === "done";

    update.status = target;

    if (!wasDone && willBeDone) {
      update.completedAt = new Date();
      update.prevStatus = current.status;
    } else if (wasDone && !willBeDone) {
      update.completedAt = null;
      update.prevStatus = null;
    }
  }

  if (fields.labels) {
    const names = [...new Set(fields.labels)];

    if (names.length) {
      await Label.bulkWrite(
        names.map((name) => ({
          updateOne: {
            filter: { userId: owner, name },
            update: { $setOnInsert: { color: "#64748b" } },
            upsert: true,
          },
        })),
      );
    }

    const docs = await Label.find({ userId: owner, name: { $in: names } })
      .select("_id")
      .lean();

    update.labels = docs.map((d) => d._id);
  }

  try {
    await connectToDB();
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id, userId },
      { $set: update },
      {
        new: true,
        runValidators: true,
        lean: true,
      },
    ).populate("labels", "name color");

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log(error);
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
